// Copyright 2016-2019 Johannes Köster, David Lähnemann.
// Licensed under the GNU GPLv3 license (https://opensource.org/licenses/GPL-3.0)
// This file may not be copied, modified, or distributed
// except according to those terms.

use std::f64;
use std::hash::Hash;
use std::path::Path;
use std::rc::Rc;
use std::str;

use anyhow::Result;
use bio_types::{genome, genome::AbstractInterval};
use derive_builder::Builder;
use rand::distributions;
use rand::distributions::Distribution;
use rand::{rngs::StdRng, SeedableRng};
use rust_htslib::bam;

use crate::estimation::alignment_properties;
use crate::variants::evidence::observation::{self, Observable, Observation};
use crate::variants::model::VariantType;
use crate::variants::{self, types::Variant};

#[derive(new, Getters, Debug)]
pub(crate) struct RecordBuffer {
    inner: bam::RecordBuffer,
    #[getset(get = "pub")]
    single_read_window: u64,
    #[getset(get = "pub")]
    read_pair_window: u64,
}

impl RecordBuffer {
    pub(crate) fn window(&self, read_pair_mode: bool) -> u64 {
        if read_pair_mode {
            self.read_pair_window
        } else {
            self.single_read_window
        }
    }

    pub(crate) fn fetch(
        &mut self,
        interval: &genome::Interval,
        read_pair_mode: bool,
    ) -> Result<()> {
        self.inner.fetch(
            interval.contig().as_bytes(),
            interval
                .range()
                .start
                .saturating_sub(self.window(read_pair_mode)),
            interval.range().end + self.window(read_pair_mode),
        )?;

        Ok(())
    }

    pub(crate) fn build_fetches(&self, read_pair_mode: bool) -> Fetches {
        Fetches {
            fetches: Vec::new(),
            window: self.window(read_pair_mode),
        }
    }

    pub(crate) fn iter<'a>(&'a self) -> impl Iterator<Item = Rc<bam::Record>> + 'a {
        self.inner
            .iter()
            .filter(|record| is_valid_record(record.as_ref()))
            .map(|record| Rc::clone(record))
    }
}

#[derive(Default, Derefable)]
pub(crate) struct Fetches {
    #[deref]
    fetches: Vec<genome::Interval>,
    window: u64,
}

impl Fetches {
    pub(crate) fn push(&mut self, interval: &genome::Interval) {
        if let Some(last) = self.fetches.last_mut() {
            if last.contig() == interval.contig()
                && interval.range().start.saturating_sub(self.window)
                    <= last.range().end + self.window
            {
                // merge the two intervals
                last.range_mut().end = interval.range().end;
                return;
            }
        }

        self.fetches.push(interval.to_owned());
    }
}

/// Strand combination for read pairs as given by the sequencing protocol.
#[derive(
    Display,
    Debug,
    Clone,
    Copy,
    Serialize,
    Deserialize,
    EnumString,
    EnumIter,
    IntoStaticStr,
    EnumVariantNames,
)]
pub enum ProtocolStrandedness {
    #[strum(serialize = "opposite")]
    Opposite,
    #[strum(serialize = "same")]
    Same,
}

impl Default for ProtocolStrandedness {
    fn default() -> Self {
        ProtocolStrandedness::Opposite
    }
}

pub(crate) type Pileup = Vec<Observation>;

pub(crate) enum SubsampleCandidates {
    Necessary {
        rng: StdRng,
        prob: f64,
        prob_range: distributions::Uniform<f64>,
    },
    None,
}

impl SubsampleCandidates {
    pub(crate) fn new(max_depth: usize, depth: usize) -> Self {
        if depth > max_depth {
            SubsampleCandidates::Necessary {
                rng: StdRng::seed_from_u64(48074578),
                prob: max_depth as f64 / depth as f64,
                prob_range: distributions::Uniform::new(0.0, 1.0),
            }
        } else {
            SubsampleCandidates::None
        }
    }

    pub(crate) fn keep(&mut self) -> bool {
        match self {
            SubsampleCandidates::Necessary {
                rng,
                prob,
                prob_range,
            } => prob_range.sample(rng) <= *prob,
            SubsampleCandidates::None => true,
        }
    }
}

pub(crate) fn estimate_alignment_properties<P: AsRef<Path>>(
    path: P,
    omit_insert_size: bool,
) -> Result<alignment_properties::AlignmentProperties> {
    let mut bam = bam::Reader::from_path(path)?;
    Ok(alignment_properties::AlignmentProperties::estimate(
        &mut bam,
        omit_insert_size,
    )?)
}

/// A sequenced sample, e.g., a tumor or a normal sample.
#[derive(Builder, Debug)]
#[builder(pattern = "owned")]
pub(crate) struct Sample {
    #[builder(private)]
    record_buffer: RecordBuffer,
    #[builder(default = "true")]
    use_fragment_evidence: bool,
    #[builder(private)]
    alignment_properties: alignment_properties::AlignmentProperties,
    #[builder(default = "200")]
    max_depth: usize,
    #[builder(default = "Vec::new()")]
    omit_repeat_regions: Vec<VariantType>,
    protocol_strandedness: ProtocolStrandedness,
}

impl SampleBuilder {
    /// Register alignment information.
    ///
    /// # Arguments
    /// * `bam` - BAM file with the aligned and deduplicated sequence reads.
    pub(crate) fn alignments(
        self,
        bam: bam::IndexedReader,
        alignment_properties: alignment_properties::AlignmentProperties,
    ) -> Self {
        let read_pair_window = (alignment_properties.insert_size().mean
            + alignment_properties.insert_size().sd * 6.0) as u64;
        let single_read_window = alignment_properties.max_read_len as u64;
        self.alignment_properties(alignment_properties)
            .record_buffer(RecordBuffer::new(
                bam::RecordBuffer::new(bam, true),
                single_read_window,
                read_pair_window,
            ))
    }
}

fn is_valid_record(record: &bam::Record) -> bool {
    !(record.is_secondary()
        || record.is_duplicate()
        || record.is_unmapped()
        || record.is_quality_check_failed())
}

impl Sample {
    /// Extract observations for the given variant.
    pub(crate) fn extract_observations<V, E, L>(&mut self, variant: &V) -> Result<Pileup>
    where
        E: observation::Evidence + Eq + Hash,
        L: variants::types::Loci,
        V: Variant<Loci = L, Evidence = E> + Observable<E>,
    {
        variant.extract_observations(
            &mut self.record_buffer,
            &mut self.alignment_properties,
            self.max_depth,
        )
    }
}

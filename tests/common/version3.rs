use std::path::{Path, PathBuf};

use anyhow::Result;
use yaml_rust::Yaml;

use crate::common::Testcase;

#[derive(Debug)]
pub(crate) struct TestcaseVersion3 {
    pub(crate) inner: Vec<Yaml>,
    pub(crate) path: PathBuf,
}

impl Testcase for TestcaseVersion3 {
    fn inner(&self) -> &[Yaml] {
        &self.inner
    }

    fn path(&self) -> &PathBuf {
        &self.path
    }

    fn reference(&self) -> Result<Box<dyn AsRef<Path>>> {
        let reference_path = self.path.join(self.reference_path());
        self.index_reference(&reference_path);

        Ok(Box::new(reference_path.to_owned()))
    }
}

impl TestcaseVersion3 {
    fn reference_path(&self) -> &Path {
        self.yaml()["reference"]["path"].as_str().unwrap().as_ref()
    }
}

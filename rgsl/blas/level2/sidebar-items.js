initSidebarItems({"fn":[["cgemv","This function computes the matrix-vector product and sum y = \\alpha op(A) x + \\beta y, where op(A) = A, A^T, A^H for TransA = CblasNoTrans, CblasTrans, CblasConjTrans."],["cgerc","This function computes the conjugate rank-1 update A = \\alpha x y^H + A of the matrix A."],["cgeru","This function computes the rank-1 update A = \\alpha x y^T + A of the matrix A."],["chemv","These functions compute the matrix-vector product and sum y = \\alpha A x + \\beta y for the hermitian matrix A. Since the matrix A is hermitian only its upper half or lower half need to be stored. When Uplo is CblasUpper then the upper triangle and diagonal of A are used, and when Uplo is CblasLower then the lower triangle and diagonal of A are used. The imaginary elements of the diagonal are automatically assumed to be zero and are not referenced."],["cher","These functions compute the hermitian rank-1 update A = \\alpha x x^H + A of the hermitian matrix A. Since the matrix A is hermitian only its upper half or lower half need to be stored. When Uplo is CblasUpper then the upper triangle and diagonal of A are used, and when Uplo is CblasLower then the lower triangle and diagonal of A are used. The imaginary elements of the diagonal are automatically set to zero."],["cher2","These functions compute the hermitian rank-2 update A = \\alpha x y^H + \\alpha^* y x^H + A of the hermitian matrix A. Since the matrix A is hermitian only its upper half or lower half need to be stored. When Uplo is CblasUpper then the upper triangle and diagonal of A are used, and when Uplo is CblasLower then the lower triangle and diagonal of A are used. The imaginary elements of the diagonal are automatically set to zero."],["ctrmv","This function computes the matrix-vector product x = op(A) x for the triangular matrix A, where op(A) = A, A^T, A^H for TransA = CblasNoTrans, CblasTrans, CblasConjTrans. When Uplo is CblasUpper then the upper triangle of A is used, and when Uplo is CblasLower then the lower triangle of A is used. If Diag is CblasNonUnit then the diagonal of the matrix is used, but if Diag is CblasUnit then the diagonal elements of the matrix A are taken as unity and are not referenced."],["ctrsv","This function computes inv(op(A)) x for x, where op(A) = A, A^T, A^H for TransA = CblasNoTrans, CblasTrans, CblasConjTrans. When Uplo is CblasUpper then the upper triangle of A is used, and when Uplo is CblasLower then the lower triangle of A is used. If Diag is CblasNonUnit then the diagonal of the matrix is used, but if Diag is CblasUnit then the diagonal elements of the matrix A are taken as unity and are not referenced."],["dgemv","This function computes the matrix-vector product and sum y = \\alpha op(A) x + \\beta y, where op(A) = A, A^T, A^H for TransA = CblasNoTrans, CblasTrans, CblasConjTrans."],["dger","This function computes the rank-1 update A = \\alpha x y^T + A of the matrix A."],["dsymv","These functions compute the matrix-vector product and sum y = \\alpha A x + \\beta y for the symmetric matrix A. Since the matrix A is symmetric only its upper half or lower half need to be stored. When Uplo is CblasUpper then the upper triangle and diagonal of A are used, and when Uplo is CblasLower then the lower triangle and diagonal of A are used."],["dsyr","This function computes the symmetric rank-1 update A = \\alpha x x^T + A of the symmetric matrix A. Since the matrix A is symmetric only its upper half or lower half need to be stored. When Uplo is CblasUpper then the upper triangle and diagonal of A are used, and when Uplo is CblasLower then the lower triangle and diagonal of A are used."],["dsyr2","These functions compute the symmetric rank-2 update A = \\alpha x y^T + \\alpha y x^T + A of the symmetric matrix A. Since the matrix A is symmetric only its upper half or lower half need to be stored. When Uplo is CblasUpper then the upper triangle and diagonal of A are used, and when Uplo is CblasLower then the lower triangle and diagonal of A are used."],["dtrmv","This function computes the matrix-vector product x = op(A) x for the triangular matrix A, where op(A) = A, A^T, A^H for TransA = CblasNoTrans, CblasTrans, CblasConjTrans. When Uplo is CblasUpper then the upper triangle of A is used, and when Uplo is CblasLower then the lower triangle of A is used. If Diag is CblasNonUnit then the diagonal of the matrix is used, but if Diag is CblasUnit then the diagonal elements of the matrix A are taken as unity and are not referenced."],["dtrsv","This function computes inv(op(A)) x for x, where op(A) = A, A^T, A^H for TransA = CblasNoTrans, CblasTrans, CblasConjTrans. When Uplo is CblasUpper then the upper triangle of A is used, and when Uplo is CblasLower then the lower triangle of A is used. If Diag is CblasNonUnit then the diagonal of the matrix is used, but if Diag is CblasUnit then the diagonal elements of the matrix A are taken as unity and are not referenced."],["sgemv","This function computes the matrix-vector product and sum y = \\alpha op(A) x + \\beta y, where op(A) = A, A^T, A^H for TransA = CblasNoTrans, CblasTrans, CblasConjTrans."],["sger","This function computes the rank-1 update A = \\alpha x y^T + A of the matrix A."],["ssymv","These functions compute the matrix-vector product and sum y = \\alpha A x + \\beta y for the symmetric matrix A. Since the matrix A is symmetric only its upper half or lower half need to be stored. When Uplo is CblasUpper then the upper triangle and diagonal of A are used, and when Uplo is CblasLower then the lower triangle and diagonal of A are used."],["ssyr","This function computes the symmetric rank-1 update A = \\alpha x x^T + A of the symmetric matrix A. Since the matrix A is symmetric only its upper half or lower half need to be stored. When Uplo is CblasUpper then the upper triangle and diagonal of A are used, and when Uplo is CblasLower then the lower triangle and diagonal of A are used."],["ssyr2","These functions compute the symmetric rank-2 update A = \\alpha x y^T + \\alpha y x^T + A of the symmetric matrix A. Since the matrix A is symmetric only its upper half or lower half need to be stored. When Uplo is CblasUpper then the upper triangle and diagonal of A are used, and when Uplo is CblasLower then the lower triangle and diagonal of A are used."],["strmv","This function computes the matrix-vector product x = op(A) x for the triangular matrix A, where op(A) = A, A^T, A^H for TransA = CblasNoTrans, CblasTrans, CblasConjTrans. When Uplo is CblasUpper then the upper triangle of A is used, and when Uplo is CblasLower then the lower triangle of A is used. If Diag is CblasNonUnit then the diagonal of the matrix is used, but if Diag is CblasUnit then the diagonal elements of the matrix A are taken as unity and are not referenced."],["strsv","This function computes inv(op(A)) x for x, where op(A) = A, A^T, A^H for TransA = CblasNoTrans, CblasTrans, CblasConjTrans. When Uplo is CblasUpper then the upper triangle of A is used, and when Uplo is CblasLower then the lower triangle of A is used. If Diag is CblasNonUnit then the diagonal of the matrix is used, but if Diag is CblasUnit then the diagonal elements of the matrix A are taken as unity and are not referenced."],["zgemv","This function computes the matrix-vector product and sum y = \\alpha op(A) x + \\beta y, where op(A) = A, A^T, A^H for TransA = CblasNoTrans, CblasTrans, CblasConjTrans."],["zgerc","This function computes the conjugate rank-1 update A = \\alpha x y^H + A of the matrix A."],["zgeru","This function computes the rank-1 update A = \\alpha x y^T + A of the matrix A."],["zhemv","These functions compute the matrix-vector product and sum y = \\alpha A x + \\beta y for the hermitian matrix A. Since the matrix A is hermitian only its upper half or lower half need to be stored. When Uplo is CblasUpper then the upper triangle and diagonal of A are used, and when Uplo is CblasLower then the lower triangle and diagonal of A are used. The imaginary elements of the diagonal are automatically assumed to be zero and are not referenced."],["zher","These functions compute the hermitian rank-1 update A = \\alpha x x^H + A of the hermitian matrix A. Since the matrix A is hermitian only its upper half or lower half need to be stored. When Uplo is CblasUpper then the upper triangle and diagonal of A are used, and when Uplo is CblasLower then the lower triangle and diagonal of A are used. The imaginary elements of the diagonal are automatically set to zero."],["zher2","These functions compute the hermitian rank-2 update A = \\alpha x y^H + \\alpha^* y x^H + A of the hermitian matrix A. Since the matrix A is hermitian only its upper half or lower half need to be stored. When Uplo is CblasUpper then the upper triangle and diagonal of A are used, and when Uplo is CblasLower then the lower triangle and diagonal of A are used. The imaginary elements of the diagonal are automatically set to zero."],["ztrmv","This function computes the matrix-vector product x = op(A) x for the triangular matrix A, where op(A) = A, A^T, A^H for TransA = CblasNoTrans, CblasTrans, CblasConjTrans. When Uplo is CblasUpper then the upper triangle of A is used, and when Uplo is CblasLower then the lower triangle of A is used. If Diag is CblasNonUnit then the diagonal of the matrix is used, but if Diag is CblasUnit then the diagonal elements of the matrix A are taken as unity and are not referenced."],["ztrsv","This function computes inv(op(A)) x for x, where op(A) = A, A^T, A^H for TransA = CblasNoTrans, CblasTrans, CblasConjTrans. When Uplo is CblasUpper then the upper triangle of A is used, and when Uplo is CblasLower then the lower triangle of A is used. If Diag is CblasNonUnit then the diagonal of the matrix is used, but if Diag is CblasUnit then the diagonal elements of the matrix A are taken as unity and are not referenced."]]});
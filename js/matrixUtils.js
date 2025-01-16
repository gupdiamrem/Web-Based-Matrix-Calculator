function calculateDeterminant(matrix) {
    if (matrix.length === 1) {
        return matrix[0][0];
    }

    if (matrix.length === 2) {
        return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    }

    let determinant = 0;
    for (let i = 0; i < matrix[0].length; i++) {
        const subMatrix = matrix.slice(1).map(row => row.filter((_, index) => index !== i));
        const cofactor = ((i % 2 === 0 ? 1 : -1) * matrix[0][i] * calculateDeterminant(subMatrix));
        determinant += cofactor;
    }

    return determinant;
}

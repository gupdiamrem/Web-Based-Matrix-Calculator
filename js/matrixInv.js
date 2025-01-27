// Function to generate matrix input tables
function generateMatrixTable(matrixId, rows, columns) {
    const table = document.getElementById(matrixId);
    table.innerHTML = ''; // Clear any existing table

    // Create rows and columns dynamically
    for (let i = 0; i < rows; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < columns; j++) {
            const cell = document.createElement('td');
            const input = document.createElement('input');
            input.type = 'number';
            input.classList.add('matrix-cell');
            cell.appendChild(input);
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
}

// Handle the matrix size inputs dynamically
document.getElementById('rowsColumns').addEventListener('input', function() {
    const rows = Number(document.getElementById('rowsColumns').value);
    const columns = Number(document.getElementById('rowsColumns').value);

    // Generate the matrix input tables for Matrix A and Matrix B
    generateMatrixTable('matrixA', rows, columns);
});


// Handle the matrix inverse form submission
document.getElementById('matrixInverseForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevents the page from refreshing on form submission

    // Get the input matrix from the table
    const rows = Number(document.getElementById('rowsColumns').value);
    const columns = Number(document.getElementById('rowsColumns').value);
    const matrixA = getMatrixValues('matrixA', rows, columns);

    try {
        // Perform the inverse calculation
        const result = calculateInverse(matrixA);

        // Display the result in the same format
        displayResult(result, rows, columns);
    } catch (error) {
        alert(error.message);  // Show an error if matrix cannot be inverted
    }
});

// Function to retrieve matrix values from the table
function getMatrixValues(matrixId, rows, columns) {
    const table = document.getElementById(matrixId);
    const matrix = [];
    const rowElements = table.rows;
    for (let i = 0; i < rows; i++) {
        const row = [];
        const cells = rowElements[i].cells;
        for (let j = 0; j < columns; j++) {
            const input = cells[j].querySelector('input');
            row.push(Number(input.value) || 0);  // Push the input value (default to 0 if empty)
        }
        matrix.push(row);
    }
    return matrix;
}

// Function to calculate the inverse of a matrix
function calculateInverse(matrix) {
    const rows = matrix.length;
    const columns = matrix[0].length;

    // Matrix must be square (rows = columns) for it to be invertible
    if (rows !== columns) {
        throw new Error("Matrix must be square to calculate the inverse.");
    }

    // Handle 2x2 matrix inverse
    if (rows === 2 && columns === 2) {
        const det = matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
        if (det === 0) {
            throw new Error("Matrix is singular and cannot be inverted.");
        }

        // 2x2 inverse formula
        const inverse = [
            [matrix[1][1] / det, -matrix[0][1] / det],
            [-matrix[1][0] / det, matrix[0][0] / det]
        ];
        return inverse;
    }

    // For larger matrices, implement adjugate method (or other methods like Gaussian elimination)
    // Placeholder for larger matrix inversion (not implemented here)
    throw new Error("Inverse calculation for matrices larger than 2x2 is not implemented.");
}

function displayResult(matrix, rows, columns) {
    const resultContainer = document.getElementById('result');
    resultContainer.innerHTML = ''; // Clear previous results

    // Create the result matrix in the same format as input
    const table = document.createElement('table');
    table.classList.add('matrix-table');

    for (let i = 0; i < rows; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < columns; j++) {
            const cell = document.createElement('td');
            const input = document.createElement('input');
            input.type = 'number';
            input.classList.add('matrix-cell');
            input.value = matrix[i][j]; // Set the value of the input to the result
            input.readOnly = true; // Make the input read-only
            cell.appendChild(input);
            row.appendChild(cell);
        }
        table.appendChild(row);
    }

    resultContainer.appendChild(table);
}

document.getElementById('clearButton').addEventListener('click', function() {
    // Clear matrix input fields
    const inputs = document.querySelectorAll('.matrix-cell');
    inputs.forEach(input => {
        input.value = '';
    });

    // Clear result section
    document.getElementById('result').innerHTML = '';
}); 
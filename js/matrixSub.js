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
document.getElementById('rows').addEventListener('input', function() {
    const rows = Number(document.getElementById('rows').value);
    const columns = Number(document.getElementById('columns').value);

    // Generate the matrix input tables for Matrix A and Matrix B
    generateMatrixTable('matrixA', rows, columns);
    generateMatrixTable('matrixB', rows, columns);
});

document.getElementById('columns').addEventListener('input', function() {
    const rows = Number(document.getElementById('rows').value);
    const columns = Number(document.getElementById('columns').value);

    // Generate the matrix input tables for Matrix A and Matrix B
    generateMatrixTable('matrixA', rows, columns);
    generateMatrixTable('matrixB', rows, columns);
});

// Handle the matrix addition form submission
document.getElementById('matrixSubtractionForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevents the page from refreshing on form submission

    // Get the input matrices from the table
    const rows = Number(document.getElementById('rows').value);
    const columns = Number(document.getElementById('columns').value);
    const matrixA = getMatrixValues('matrixA', rows, columns);
    const matrixB = getMatrixValues('matrixB', rows, columns);

    try {
        // Perform the addition
        const result = calculateSubtraction(matrixA, matrixB);

        // Display the result in the same format
        displayResult(result, rows, columns);
    } catch (error) {
        alert(error.message);  // Show an error if matrices are not compatible
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

function calculateSubtraction(mat1, mat2) {
    const rows = mat1.length;
    const columns = mat1[0].length;

    if (rows !== mat2.length || columns !== mat2[0].length) {
        throw new Error("Matrix dimensions do not match for subtraction");
    }

    const difference = Array.from({ length: rows }, () => Array(columns).fill(0));

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            difference[i][j] = mat1[i][j] - mat2[i][j];
        }
    }

    return difference;
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

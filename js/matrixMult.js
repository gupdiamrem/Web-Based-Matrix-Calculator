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
document.getElementById('rowsA').addEventListener('input', function() {
    const rows = Number(document.getElementById('rowsA').value);
    const columnsRows = Number(document.getElementById('columnsRows').value);
    const columns = Number(document.getElementById('columnsB').value);

    // Generate the matrix input tables for Matrix A and Matrix B
    generateMatrixTable('matrixA', rows, columnsRows);
    generateMatrixTable('matrixB', columnsRows, columns);
});

document.getElementById('columnsRows').addEventListener('input', function() {
    const rows = Number(document.getElementById('rowsA').value);
    const columnsRows = Number(document.getElementById('columnsRows').value);
    const columns = Number(document.getElementById('columnsB').value);

    // Generate the matrix input tables for Matrix A and Matrix B
    generateMatrixTable('matrixA', rows, columnsRows);
    generateMatrixTable('matrixB', columnsRows, columns);
});


document.getElementById('columnsB').addEventListener('input', function() {
    const rows = Number(document.getElementById('rowsA').value);
    const columnsRows = Number(document.getElementById('columnsRows').value);
    const columns = Number(document.getElementById('columnsB').value);

    // Generate the matrix input tables for Matrix A and Matrix B
    generateMatrixTable('matrixA', rows, columnsRows);
    generateMatrixTable('matrixB', columnsRows, columns);
});

// Handle the matrix multiplication form submission
document.getElementById('matrixMultiplicationForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevents the page from refreshing on form submission

    // Get the input matrices from the table
    const rows = Number(document.getElementById('rowsA').value);
    const columnsRows = Number(document.getElementById('columnsRows').value);
    const columns = Number(document.getElementById('columnsB').value);

    const matrixA = getMatrixValues('matrixA', rows, columnsRows);
    const matrixB = getMatrixValues('matrixB', columnsRows, columns);

    try {
        // Perform the multiplication
        const result = calculateMultiplication(matrixA, matrixB);

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

function calculateMultiplication(matA, matB) {
    const rowsA = matA.length;
    const columnsA = matA[0].length;
    const rowsB = matB.length;
    const columnsB = matB[0].length;

    if (columnsA !== rowsB) {
        throw new Error("Matrix dimensions are not compatible for multiplication.");
    }

    const result = Array.from({ length: rowsA }, () => Array(columnsB).fill(0));

    for (let i = 0; i < rowsA; i++) {
        for (let j = 0; j < columnsB; j++) {
            for (let k = 0; k < columnsA; k++) {
                result[i][j] += matA[i][k] * matB[k][j];
            }
        }
    }

    return result;
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
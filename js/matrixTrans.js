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
});

document.getElementById('columns').addEventListener('input', function() {
    const rows = Number(document.getElementById('rows').value);
    const columns = Number(document.getElementById('columns').value);

    // Generate the matrix input tables for Matrix A and Matrix B
    generateMatrixTable('matrixA', rows, columns);
});


// Handle the matrix transpose form submission
document.getElementById('matrixTransposeForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevents the page from refreshing on form submission

    // Get the matrix size from the form
    const rows = Number(document.getElementById('rows').value);
    const columns = Number(document.getElementById('columns').value);

    // Retrieve the matrix values from the table
    const matrix = getMatrixValues('matrixA', rows, columns);

    // Perform the transpose
    const transposedMatrix = transposeMatrix(matrix);

    // Display the result
    displayResult(transposedMatrix, columns, rows); // Transposed matrix will have switched rows and columns
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

// Function to transpose the matrix
function transposeMatrix(matrix) {
    const rows = matrix.length;
    const columns = matrix[0].length;
    const transposed = [];

    for (let j = 0; j < columns; j++) {
        const newRow = [];
        for (let i = 0; i < rows; i++) {
            newRow.push(matrix[i][j]);
        }
        transposed.push(newRow);
    }

    return transposed;
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
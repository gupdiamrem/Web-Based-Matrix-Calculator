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

// Handle LU Factorization form submission
document.getElementById('luFactorizationForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevents the page from refreshing on form submission

    const rows = Number(document.getElementById('rowsColumns').value);
    const columns = Number(document.getElementById('rowsColumns').value);

    // Ensure square matrix
    if (rows !== columns) {
        alert("Matrix must be square for LU Factorization.");
        return;
    }

    const matrix = getMatrixValues('matrixA', rows, columns);

    try {
        const { L, U } = calculateLU(matrix);
        displayLU(L, U, rows);
    } catch (error) {
        console.error("Error during LU factorization:", error);
        alert("An error occurred. Check the console for details.");
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
            row.push(Number(input.value) || 0); // Push the input value (default to 0 if empty)
        }
        matrix.push(row);
    }
    return matrix;
}

// Calculate LU Factorization
function calculateLU(matrix) {
    const n = matrix.length;
    const L = Array.from({ length: n }, () => Array(n).fill(0));
    const U = Array.from({ length: n }, () => Array(n).fill(0));

    for (let i = 0; i < n; i++) {
        // Upper triangular matrix U
        for (let k = i; k < n; k++) {
            let sum = 0;
            for (let j = 0; j < i; j++) {
                sum += L[i][j] * U[j][k];
            }
            U[i][k] = matrix[i][k] - sum;
        }

        // Lower triangular matrix L
        for (let k = i; k < n; k++) {
            if (i === k) {
                L[i][i] = 1; // Diagonal elements of L are 1
            } else {
                let sum = 0;
                for (let j = 0; j < i; j++) {
                    sum += L[k][j] * U[j][i];
                }
                L[k][i] = (matrix[k][i] - sum) / U[i][i];
            }
        }
    }

    return { L, U };
}

// Display L and U matrices
function displayLU(L, U, rows) {

    displayResult(L, rows, 'LMatrix'); // Display L matrix
    displayResult(U, rows, 'UMatrix'); // Display U matrix
}

function displayResult(matrix, rows, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear previous content

    const table = document.createElement('table');
    table.classList.add('matrix-table');

    for (let i = 0; i < rows; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < rows; j++) {
            const cell = document.createElement('td');
            const input = document.createElement('input');
            input.type = 'number';
            input.classList.add('matrix-cell');
            input.value = matrix[i][j]; // Set the value
            input.readOnly = true; // Make it read-only
            cell.appendChild(input);
            row.appendChild(cell);
        }
        table.appendChild(row);
    }

    container.appendChild(table);
}



// Clear button functionality
document.getElementById('clearButton').addEventListener('click', function () {
    // Clear matrix input fields
    const inputs = document.querySelectorAll('.matrix-cell');
    inputs.forEach(input => {
        input.value = '';
    });

    // Clear result sections
    document.getElementById('LMatrix').innerHTML = '';
    document.getElementById('UMatrix').innerHTML = '';
});

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

    // Generate the matrix input tables for Matrix A
    generateMatrixTable('matrixA', rows, columns);
});

document.getElementById("matrixCofactorForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const rowsColumns = Number(document.getElementById('rowsColumns').value);
    const matrix = getMatrixValues('matrixA', rowsColumns, rowsColumns);
    if (matrix.length !== matrix[0].length) {
        alert("Please ensure the matrix is square (same number of rows and columns).");
        return;
    }

    try {
        // Perform the multiplication
        const cofactors = calculateCofactors(matrix);

        // Display the result in the same format
        displayResult(cofactors, rowsColumns, rowsColumns);
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

// Function to calculate the cofactor matrix
function calculateCofactors(matrix) {
    const size = matrix.length;
    const cofactors = [];
    
    for (let i = 0; i < size; i++) {
        const cofactorRow = [];
        for (let j = 0; j < size; j++) {
            const subMatrix = matrix
                .filter((_, rowIndex) => rowIndex !== i)
                .map(row => row.filter((_, colIndex) => colIndex !== j));

            const cofactor = Math.pow(-1, i + j) * calculateDeterminant(subMatrix);
            cofactorRow.push(cofactor);
        }
        cofactors.push(cofactorRow);
    }

    return cofactors;
}


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

document.getElementById("matrixMinorForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const rowsColumns = Number(document.getElementById('rowsColumns').value);
    const matrix = getMatrixValues('matrixA', rowsColumns, rowsColumns);
    if (matrix.length !== matrix[0].length) {
        alert("Please ensure the matrix is square (same number of rows and columns).");
        return;
    }

    try {
        // Perform the multiplication
        const minors = calculateMatrixOfMinors(matrix);

        // Display the result in the same format
        displayResult(minors, rowsColumns, rowsColumns);
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

    // Function to calculate the matrix of minors
    function calculateMatrixOfMinors(matrix) {
        const dimension = matrix.length;
        const minors = [];

        for (let i = 0; i < dimension; i++) {
            const row = [];
            for (let j = 0; j < dimension; j++) {
                const subMatrix = getSubMatrix(matrix, i, j);
                const minor = calculateDeterminant(subMatrix); // Call pre-existing determinant function
                row.push(minor);
            }
            minors.push(row);
        }

        return minors;
    }

    // Function to get a submatrix by excluding a specific row and column
    function getSubMatrix(matrix, rowIndex, colIndex) {
        const subMatrix = [];

        for (let i = 0; i < matrix.length; i++) {
            if (i === rowIndex) continue; // Skip the specified row
            const subRow = [];
            for (let j = 0; j < matrix[i].length; j++) {
                if (j === colIndex) continue; // Skip the specified column
                subRow.push(matrix[i][j]);
            }
            subMatrix.push(subRow);
        }

        return subMatrix;
    }


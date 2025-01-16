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
document.getElementById('matrixRankForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevents the page from refreshing on form submission

    // Get the matrix size from the form
    const rows = Number(document.getElementById('rows').value);
    const columns = Number(document.getElementById('columns').value);

    // Retrieve the matrix values from the table
    const matrix = getMatrixValues('matrixA', rows, columns);

    // Perform the transpose
    const matrixRank = calculateRank(matrix);

    // Display the result
    displayResult(matrixRank); // Transposed matrix will have switched rows and columns
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


// Function to calculate the rank of a matrix using Gaussian elimination
function calculateRank(matrix) {
    const rows = matrix.length;
    const columns = matrix[0].length;
    let rank = columns;

    for (let row = 0; row < rows; row++) {
        // If the pivot element is zero, try to swap with a row below
        if (matrix[row][row] === 0) {
            let swapRow = -1;
            for (let i = row + 1; i < rows; i++) {
                if (matrix[i][row] !== 0) {
                    swapRow = i;
                    break;
                }
            }

            if (swapRow === -1) {
                rank--; // Decrease rank if no valid row is found
                continue;
            }

            // Swap rows
            const temp = matrix[row];
            matrix[row] = matrix[swapRow];
            matrix[swapRow] = temp;
        }

        // Eliminate rows below the current row
        for (let i = row + 1; i < rows; i++) {
            const factor = matrix[i][row] / matrix[row][row];
            for (let j = row; j < columns; j++) {
                matrix[i][j] -= factor * matrix[row][j];
            }
        }
    }

    // After elimination, count the number of non-zero rows
    let nonZeroRows = 0;
    for (let i = 0; i < rows; i++) {
        let isZeroRow = true;
        for (let j = 0; j < columns; j++) {
            if (matrix[i][j] !== 0) {
                isZeroRow = false;
                break;
            }
        }
        if (!isZeroRow) {
            nonZeroRows++;
        }
    }

    return nonZeroRows; // The number of non-zero rows is the rank
}


// Function to display the rank result
function displayResult(rank) {
    const resultContainer = document.getElementById('result');

    resultContainer.innerHTML = ''; // Clear previous results

    const resultText = document.createElement('p');
    resultText.textContent = `The rank of the matrix is: ${rank}`;
    resultContainer.appendChild(resultText);
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

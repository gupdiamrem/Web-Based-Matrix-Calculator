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


document.getElementById('eigenValueForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevents the page from refreshing on form submission

    const rows = Number(document.getElementById('rowsColumns').value);
    const columns = Number(document.getElementById('rowsColumns').value);
    
    // Ensure square matrix
    if (rows !== columns) {
        alert("Matrix must be square to calculate eigenvalues and eigenvectors.");
        return;
    }

    const matrix = getMatrixValues('matrixA', rows, columns);

    try {
        const { eigenvalues, eigenvectors } = calculateEigen(matrix);
        displayEigenValuesAndVectors(eigenvalues, eigenvectors);
    } catch (error) {
        console.error("Error during eigenvalue calculation:", error);
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

// Calculate eigenvalues and eigenvectors
function calculateEigen(matrix) {
    try {
        const eig = math.eigs(matrix);

        // Format eigenvalues (handle complex values)
        const eigenvalues = eig.values.map(value => {
            if (typeof value === 'number') {
                return value.toFixed(3); // Format real numbers
            } else {
                // Format complex numbers (real and imaginary parts)
                return `(${value.re.toFixed(3)} + ${value.im.toFixed(3)}i)`;
            }
        });

        // Format eigenvectors (also handle complex numbers)
        const eigenvectors = eig.vectors.map(vector => {
            return vector.map(value => {
                if (typeof value === 'number') {
                    return value.toFixed(3); // Format real numbers
                } else {
                    // Format complex numbers in eigenvectors
                    return `(${value.re.toFixed(3)} + ${value.im.toFixed(3)}i)`;
                }
            });
        });

        return { eigenvalues, eigenvectors };
    } catch (error) {
        throw new Error("Error calculating eigenvalues and eigenvectors: " + error.message);
    }
}


// Display eigenvalues and eigenvectors
function displayEigenValuesAndVectors(eigenvalues, eigenvectors) {
    const eigenvaluesContainer = document.getElementById('eigenvalues');
    eigenvaluesContainer.innerHTML = eigenvalues.join(', ');

    const eigenvectorsContainer = document.getElementById('eigenvectors');
    eigenvectorsContainer.innerHTML = eigenvectors.map((vector, index) => {
        return `<strong>Eigenvector ${index + 1}:</strong><br>` + formatMatrix([vector]);
    }).join('<br>');
}

// Function to format matrix display for eigenvectors
function formatMatrix(matrix) {
    let formatted = '<table class="matrix-table">';
    matrix.forEach(row => {
        formatted += '<tr>';
        row.forEach(cell => {
            formatted += `<td>${cell}</td>`;
        });
        formatted += '</tr>';
    });
    formatted += '</table>';
    return formatted;
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
    const resultContainer = document.getElementById('result');
    if (resultContainer) {
        resultContainer.innerHTML = '';
    }

    // Clear eigenvalues and eigenvectors display
    const eigenvaluesContainer = document.getElementById('eigenvalues');
    const eigenvectorsContainer = document.getElementById('eigenvectors');
    if (eigenvaluesContainer) {
        eigenvaluesContainer.innerHTML = '';
    }
    if (eigenvectorsContainer) {
        eigenvectorsContainer.innerHTML = '';
    }
});


// Add
function add(a, b) {
    let sum = a + b;
    return sum;
}

// Subtract
function subtract(a, b) {
    let difference = a - b;
    return difference;
}

// Multiply
function multiply(a, b) {
    let product = a * b;
    return product;

}

// Divide 
function divide(a, b) {
    let quotient = a / b;
    return quotient;
}

// Logic for performing math equations
function operate(firstNum, secondNum, operator) {
    switch (operator) {
        case '+':
            return add(firstNum, secondNum);
        case '-':
            return subtract(firstNum, secondNum);
        case '×':
            return multiply(firstNum, secondNum);
        case '÷':
            return divide(firstNum, secondNum);
        default:
            return 'Invalid selection. Please try again.';
    }
}


// Listen for button clicks
document.addEventListener('DOMContentLoaded', function () {

    let firstNum = undefined; // First number in math equation
    let operator = undefined; // Operator in math equation
    let userInput = ''; // Empty string to store user selections 
    let numberSelection = document.querySelector('.numbers'); // Reference to the HTML calculator display div

    // Listen for button clicks
    const allButtons = document.querySelectorAll('button');
    allButtons.forEach(button => {
        button.addEventListener('click', () => {
            // User selection is linked to id of button pressed
            const selection = button.id;

            // If input is a number and less than 9 digits long, add selected numbers to userInput string
            if (!isNaN(selection) && userInput.length < 9) {
                userInput += selection;
                numberSelection.textContent = userInput; // Push userInput onto the display

            } else if (selection === '+' || selection === '-' || selection === '×' || selection === '÷') {
                // If selection is an operator sign and userInput is present, set userInput to secondNum variable
                if (userInput) {
                    const secondNum = parseFloat(userInput); // Second number in math equation
                    // if firstNum and operator are present, set firstNum to call the operate function on the variables
                    if (firstNum !== undefined && operator !== undefined) {
                        firstNum = operate(firstNum, secondNum, operator);
                        // If no firstNum and operator, set firstNum to secondNum variable
                    } else {
                        firstNum = secondNum;
                    }
                    // Push firstNum onto the display
                    numberSelection.textContent = firstNum;
                }
                // If user selects an operator sign, set their selection to the operator variable
                operator = selection;
                // Clear userInput to prepare for the next user selection
                userInput = '';
                // If equal sign is selected when firstNum, operator, and userInput are present, set userInput to secondNum variable
            } else if (selection === '=' && firstNum !== undefined && operator && userInput) {
                const secondNum = parseFloat(userInput);
                // Call the operate function on all variables
                let answer = operate(firstNum, secondNum, operator);
                // Push answer to the display
                numberSelection.textContent = answer;

                // Return decimal answers rounded to two places
                if (Number.isInteger(answer) === false) {
                    answer = answer.toFixed(2);
                    numberSelection.textContent = answer;
                } else {
                    // Return non-decimal input as integers
                    secondNum = parseFloat(userInput);
                    let answer = operate(firstNum, secondNum, operator);
                    numberSelection.textContent = answer;
                }

                // Do not allow the user to divide any number by zero
                if (operator === '÷' && secondNum === 0) {

                    numberSelection.textContent = 'You cannot divide by zero.' // Text warning
                    numberSelection.style.color = '#CC0000'; // Set text color
                    numberSelection.style.fontSize = '16px'; // Set text size
                    numberSelection.style.position = 'absolute'; // Set text position
                    numberSelection.style.left = '44%'; // Center text horizontally
                    numberSelection.style.top = '29%'; // Center text vertically

                    // Set a timer for text warning so it disappears after two seconds
                    setTimeout(() => {
                        // Reset all text styles/colors and content back to default after text warning 
                        numberSelection.textContent = '';
                        userInput = '';
                        numberSelection.style.color = '';
                        numberSelection.style.fontSize = '';
                        numberSelection.style.position = '';
                        numberSelection.style.left = '';
                        numberSelection.style.top = '';

                    }, 2000);

                    return; // Exit function
                }

                // Reset variables after performing calculations
                firstNum = answer;
                operator = undefined;
                userInput = '';
                // If clear button is selected, reset all variables
            } else if (selection === 'C') {
                firstNum = undefined;
                operator = undefined;
                userInput = '';
                numberSelection.textContent = '';
                // Display decimal when selected but don't allow more than one per integer
            } else if (selection === '.' && !userInput.includes('.')) {
                userInput += selection;
                numberSelection.textContent += selection;

                // Return decimal answers rounded to two places
                if (Number.isInteger(answer) === false) {
                    answer = answer.toFixed(2);
                    numberSelection.textContent = answer;
                } else {
                    // Return non-decimal input as integers
                    secondNum = parseFloat(userInput);
                    let answer = operate(firstNum, secondNum, operator);
                    numberSelection.textContent = answer;
                }

                // If backspace (arrow) button is selected, remove most recently added selection
            } else if (selection === 'arrow') {
                userInput = userInput.substring(0, userInput.length - 1);
                numberSelection.textContent = userInput;
                // If '+/-' key is selected, userInput switches from positive to negative
            } else if (selection === 'negative' && userInput !== '') {
                userInput = (-parseFloat(userInput)).toString();
                numberSelection.textContent = userInput;
                // If '+/-' key is selected, firstNum switches from positive to negative
            } else if (selection === 'negative' && firstNum !== undefined) {
                firstNum = -firstNum;
                numberSelection.textContent = firstNum;
            }
        });
    });
});




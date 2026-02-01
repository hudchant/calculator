
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
            "Invalid selection. Please try again."
    }
}


// Listen for button clicks
document.addEventListener('DOMContentLoaded', function () {

    let firstNum = undefined; // First number in math equation
    let secondNum = undefined; // Second number in math equation
    let operator = undefined; // Operator in math equation
    let userInput = ''; // Empty input to store user selections when buttons are pressed
    let numberSelection = document.querySelector('.numbers'); // Reference to the HTML number display div

    const allButtons = document.querySelectorAll('button');
    allButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selection = button.id; // User selection is linked to the id of the button pressed

            // If user selects number(s), store them in the userInput variable and push them onto the display
            // Set a limit to userInput length
            if (!isNaN(selection) && userInput.length < 9) {
                userInput += selection;
                numberSelection.textContent = userInput;

                // If user selects an operator, store previous number(s) in firstNum variable,
                // set operator as the current selection, and clear userInput in preparation to receive secondNum
            } else if ((selection === '+' || selection === '-' || selection === '×' || selection === '÷') && userInput) {
                firstNum = parseFloat(userInput);
                operator = selection;
                userInput = '';

                // If equal sign is pressed and firstNum and operator are already set, store next number(s)
                // in secondNum variable and call operate() function on the operation
            } else if (selection === '=' && firstNum && operator && userInput) {
                secondNum = parseFloat(userInput);
                let answer = operate(firstNum, secondNum, operator);
                numberSelection.textContent = answer; // Display answer on screen

                // Reset all fields except firstNum, which will hold the previous answer until next operation called on it
                firstNum = answer;
                secondNum = undefined;
                operator = undefined;
                userInput = '';

                // If 'C' (clear) button is pressed, reset all fields including the display
            } else if (selection === 'C') {
                firstNum = undefined;
                secondNum = undefined;
                operator = undefined;
                userInput = '';
                numberSelection.textContent = '';
                // If '.' is entered, add a decimal, but don't allow more than one decimal per number
            } else if (selection === '.' && !userInput.includes('.')) {
                userInput += selection;
                numberSelection.textContent += '.';
                // If arrow (backspace) key is selected, remove one digit from the end of the currently displayed number
            } else if (selection === 'arrow') {
                userInput = userInput.substring(0, userInput.length - 1);
                numberSelection.textContent = userInput;
            } else if (firstNum !== null && secondNum !== null && (selection === '+' || selection === '-' || selection === '×' || selection === '÷')) {
                operator = selection;
                let answer = operate(firstNum, secondNum, operator);
                numberSelection.textContent = answer; // Display answer on screen
            }
        });
    });
});




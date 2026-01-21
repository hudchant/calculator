
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

let firstNum; // First number in math equation
let secondNum; // Second number in math equation
let operator; // Operator in math equation

// Logic for performing math equations
function operate(firstNum, secondNum, operator) {
    switch (operator) {
        case "+":
            return add(firstNum, secondNum);
        case "-":
            return subtract(firstNum, secondNum);
        case "*":
            return multiply(firstNum, secondNum);
        case "/":
            return divide(firstNum, secondNum);
        default:
            "Invalid selection. Please try again."
    }
}





function add(addend, summand) {
    return Number(addend) + Number(summand);
}

function subtract(minuend, subtrahend) {
    return Number(minuend) - Number(subtrahend);
}

function divide(dividend, divisor) {
    return Number(dividend) / Number(divisor);
 
}

function multiply(multiplicand, multiplier) {
    return Number(multiplicand) * Number(multiplier);
}

function percent(percentage, value) {
    return (Number(percentage)/100) * Number(value);
  
}
let [multiplierIndex, divisionIndex, additionIndex, subtractionIndex, percentIndex] = [[],[],[],[],[]];


////// Operation Logic - checks string and runs order of operations according to PEDMAS
function operate(string) {
    
    let result;
    let index;
    let equation = checkEquation(string.match(/^([-+]?)(\d+(.?)(\d+)?)(?:\s*([-+\*\/%])((?:\s[-+\*\/%])?\d+)(.?)(\d+)?)+$/g));
    //checkEquation(string.match(/^\s*([-+\*\/]?)(\d+)(?:\s*([-+\*\/])\s*((?:\s[-+\*\/])?\d+)\s*)+$/g));

    buildOperatorIndices(equation);

    while(percentIndex > 0) {
        index = Number(percentIndex.splice(0,1));
        result = percent(equation[index-1], equation[index+1]);
        equation.splice(index-1, 3, result);
        buildOperatorIndices(equation);
    }
    while (multiplierIndex.length > 0 || divisionIndex > 0) {
        index = Number(comparePosition(multiplierIndex, divisionIndex));
        result = chooseOperation(equation, index);
        equation.splice(index-1, 3, result);
        buildOperatorIndices(equation);
    }
    while (additionIndex.length > 0 || subtractionIndex.length > 0) {
        index = Number(comparePosition(additionIndex, subtractionIndex));
        result = chooseOperation(equation, index);
        equation.splice(index-1, 3, result);
        buildOperatorIndices(equation);
    }
    return equation[0].toString();
}

function checkEquation(equation) {
    if (equation !== undefined || equation !== null) {
        let newEquation = equation.toString().split(/([-|+|\*|\/%])+/g);
        return newEquation;
    }
    return 0;
}

function buildOperatorIndices(equation) {
    resetIndex();
    for (let i = 0; i <= equation.length-1; i++) {
        if (equation[i] == '*') {multiplierIndex.push(i)}
        else if (equation[i] == '/') {divisionIndex.push(i)}
        else if (equation[i] == '+') {additionIndex.push(i)}
        else if (equation[i] == '-') {subtractionIndex.push(i)}
        else if (equation[i] == '%') {percentIndex.push(i)}
    }
}

function resetIndex() {
    [multiplierIndex, divisionIndex, additionIndex, subtractionIndex] = [[],[],[],[],[]];
}

// Compare index positions of operators to apply pedmas logic
function comparePosition(array1, array2) {
    return (array1[0] < array2[0] || array2.length == 0) ? array1.splice(0,1) : array2.splice(0,1);
}

function chooseOperation(equation, index) {
    if (equation[index] == '*') {
        return multiply(equation[index-1], equation[index+1]);}
    else if (equation[index] == '/') {
        return divide(equation[index-1], equation[index+1]);}
    else if (equation[index] == '+') {
        return add(equation[index-1], equation[index+1]);}
    else if (equation[index] == '-') {
        return subtract(equation[index-1], equation[index+1]);}
}


export { operate };

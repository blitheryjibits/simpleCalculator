import { operate } from './operations.js';

const input = document.querySelector("div.input-container input[type='text']");
const equals = document.querySelector('.equal');
const clearInput = document.querySelector('.clearInput');
const remove = document.querySelector('.remove');
const numbersBox = document.querySelector('.numbers').querySelectorAll('button');
const operandsBox = document.querySelector('.operands').querySelectorAll('button');
const decimal = document.querySelector('div.numbers button.decimal');

let addNumber = function getContent(event) {
    input.value += event.currentTarget.textContent;
};

let addOperand = function getOperand(event) {
    input.value += event.currentTarget.textContent;
    if(input.value.includes('.')) {
        decimal.addEventListener('click', addDecimal, true);
    }
}

let addDecimal = function getValue(event) {
    input.value += event.currentTarget.textContent;
    if (input.value.includes('.')){
        decimal.removeEventListener('click', addDecimal, true);
    }
}

numbersBox.forEach(box => {
    box.addEventListener('click', addNumber, true)
});

operandsBox.forEach(box => {
    box.addEventListener('click', addOperand, true)
});

decimal.removeEventListener('click', addNumber, true);
decimal.addEventListener('click', addDecimal, true);

let timer;
remove.addEventListener('mousedown', () => {
    timer = setInterval(() => {
        let string = input.value.slice(0,-1);
        input.value = string
    }, 100);
});
remove.addEventListener('mouseup', () => {
    if (timer) clearInterval(timer);
});
remove.addEventListener('click', () => {
    let string = input.value.slice(0,-1);
    input.value = string
});

clearInput.addEventListener('click', () => {
    input.value = '';
    decimal.removeEventListener('click', addDecimal, true);
    decimal.addEventListener('click', addDecimal, true);
});

equals.addEventListener('click', () => {
    let string = input.value;
    let returnedValue = operate(string);
    input.value = returnedValue;
    decimal.addEventListener('click', addDecimal, true);
    
});

document.addEventListener('keydown', (e) => {
    //console.log(e.key);
    let back = /(backspace)/i;
    let regex = /([(\d)(+)(\-)(*)(/)])/;
    if (regex.test(e.key)) { input.value += e.key}
    else if (back.test(e.key)) {
        console.log(e.key);
        let string = input.value.slice(0,-1);
        input.value = string;
    }
});

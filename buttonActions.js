import { operate } from './operations.js';

const input = document.querySelector("#mainInput");
const secondaryInput = document.querySelector('#secondaryInput');
const equals = document.querySelector('.equal');
const clearInput = document.querySelector('.clearInput');
const remove = document.querySelector('.remove');
const numbersBox = document.querySelector('.numbers').querySelectorAll('button');
const operandsBox = document.querySelector('.operands').querySelectorAll('button');
const decimal = document.querySelector('div.numbers button.decimal');
let equated = false;

let addNumber = function getContent(event) {
    if (equated) { 
        clearInput.click();
        equated = false; 
    }
    input.textContent += event.currentTarget.textContent;
};

let addOperand = function getOperand(event) {
    let string = input.textContent;
    secondaryInput.textContent += `${string}${event.currentTarget.textContent}`;
    input.textContent = ''
    if(!input.textContent.includes('.')) {
         decimal.addEventListener('click', addDecimal, true);
    }

}

let addDecimal = function getValue(event) {
    input.textContent += event.currentTarget.textContent;
    if (input.textContent.includes('.')){
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
        let string = input.textContent.slice(0,-1);
        input.textContent = string
    }, 100);
});
remove.addEventListener('mouseup', () => {
    if (timer) clearInterval(timer);
});
remove.addEventListener('click', () => {
    let string = input.textContent.slice(0,-1);
    input.textContent = string
});

clearInput.addEventListener('click', () => {
    input.textContent = '';
    secondaryInput.textContent = '';
    decimal.removeEventListener('click', addDecimal, true);
    decimal.addEventListener('click', addDecimal, true);
});

equals.addEventListener('click', () => {
    let string = secondaryInput.textContent + input.textContent;
    secondaryInput.textContent = string;
    let returnedValue = operate(string);
    input.textContent = returnedValue;
    decimal.addEventListener('click', addDecimal, true);
    equated = true;
});

//////////// Keyboard support ////////////
document.addEventListener('keydown', (e) => {
    let back = /(backspace)/i;
    let operator = /([(+)(\-)(*)(/)])/;
    let number = /([(\d)(.)])/;
    let enter = /(enter)/i;
    if (number.test(e.key)) { 
        if (equated) { clearInput.click(); equated = false; input.textContent += e.key; }
        else if (e.key === '.') { decimal.click(); }
        else { input.textContent += e.key; }
    }
    else if (operator.test(e.key)) {
        if (equated) { clearInput.click(); equated = false; input.textContent = e.key;}
            let string = input.textContent;
            secondaryInput.textContent += `${string}${e.key}`;
            input.textContent = ''
            if(!input.textContent.includes('.')) {
                decimal.addEventListener('click', addDecimal, true);
            }
        }
    else if (back.test(e.key)) {
        let string = input.textContent.slice(0,-1);
        input.textContent = string;
    } 
    else if (enter.test(e.key)) equals.click();
});

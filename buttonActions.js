import { operate } from './operations.js';

const input = document.querySelector("div.input-container input[type='text']");
const equals = document.querySelector('.equal');
const clearInput = document.querySelector('.clearInput');
const numbersBox = document.querySelector('.numbers').querySelectorAll('button');
const operandsBox = document.querySelector('.operands').querySelectorAll('button');

// adds button values to the input field
 numbersBox.forEach(box => {
    box.addEventListener('click', (e) => {
        input.value += e.currentTarget.textContent; 
    });
});

operandsBox.forEach(box => {
    box.addEventListener('click', (e) => {
        input.value += e.currentTarget.textContent; 
    });
});

let timer;
clearInput.addEventListener('mousedown', () => {
    timer = setInterval(() => {
        let string = input.value.slice(0,-1);
        input.value = string
    }, 100);
});
clearInput.addEventListener('mouseup', () => {
    if (timer) clearInterval(timer);
});

equals.addEventListener('click', () => {
    let string = input.value;
    let returnedValue = operate(string);
    input.value = returnedValue;
    
});
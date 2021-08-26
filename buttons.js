const equalsBox = document.querySelector('.equalsBox');
const numbersBox = document.querySelector('.numbers');
const operandsBox = document.querySelector('.operands');


for (let i = 9; i >= 0; i--) {
    let button = document.createElement('button');
    button.classList.add('number');
    button.textContent = `${i}`;
    numbersBox.append(button);
}

    const decimal = document.createElement('button');
    decimal.classList.add('decimal');
    decimal.textContent = '.';

    const percent = document.createElement('button');
    percent.classList.add('percent');
    percent.textContent = '%';

    const equals = document.createElement('button');
    equals.classList.add('equal');
    equals.textContent = '=';


    const add = document.createElement('button');
    add.classList.add('add');
    add.textContent = '+';

    const subtract = document.createElement('button');
    subtract.classList.add('subtract');
    subtract.textContent = '-';

    const multiplier = document.createElement('button');
    multiplier.classList.add('multiply');
    multiplier.textContent = '*';

    const divide = document.createElement('button');
    divide.classList.add('divide');
    divide.textContent = '/';

    const clear = document.createElement('button');
    clear.classList.add('clearInput');
    clear.textContent = 'c';

numbersBox.append(decimal, percent);
operandsBox.append(add, subtract, multiplier, divide);
equalsBox.append(clear, equals);


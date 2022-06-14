import './style.scss';

const calcScreen = document.querySelector('.calc_screen');
const calcButtonContainer = document.querySelector('.calc__buttons__container');
const numKeys = document.querySelectorAll('[data-number]');
const operatorKeys = document.querySelectorAll('[data-operator]');

const model = {
  prevNum: '',
  curNum: '',
  operator: '',
  sum: '',
};

// evaluate a string as a mathematical express i.e. '1+1' becomes 1+1
function parse(str) {
  return Function(`'use strict'; return (${str})`)();
}

const init = function () {
  model.prevNum = '';
  model.curNum = '';
  model.operator = '';
  model.sum = '';

  calcScreen.innerText = '0';

  removeOperatorActiveClass();
};

// Number buttons
calcButtonContainer.addEventListener('click', function (e) {
  e.preventDefault();

  const operatorKey = e.target.dataset.operator;
  const numKey = e.target.dataset.number === '';

  if (numKey) {
    const target = e.target;
    const clicked = target.closest('button');
    const numValue = clicked.innerText;
    model.curNum += numValue;
    console.table(model);
  }

  // if an operator key is pressed and the operator property is NOT empty,
  if (operatorKey && !model.operator) {
    const target = e.target;
    const clicked = target.closest('.calc__button');
    const operatorValue = clicked.getAttribute('data-operator');
    clicked.classList.add('__active');
    model.operator = operatorValue;
    console.log(model.operator);
  }

  if (operatorKey && model.operator) {
    model.prevNum = model.curNum;
    model.curNum = '';
  }

  // C button reset state of calculator
  if (e.target.dataset.clear === '') {
    init();
  }

  updateScreen();
});

const updateScreen = function () {
  if (model.curNum && model.prevNum) {
    let sum = `${model.curNum}${model.operator}${model.prevNum}`;
    console.log(sum);
    model.curNum = parse(sum);
    // model.curNum = parse(sum);
  }
  calcScreen.innerText = model.curNum;
};

const removeOperatorActiveClass = function () {
  operatorKeys.forEach((el) => el.classList.remove('__active'));
};

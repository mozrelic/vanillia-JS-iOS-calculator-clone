import { evaluate } from 'mathjs';

const calcScreen = document.querySelector('.calc_screen');
// const calcButtonContainer = document.querySelector('.calc__buttons__container');
const operatorKeys = document.querySelectorAll('[data-operator]');

const isOperatorActive = function () {
  if (operatorKeys.forEach((el) => el.classList.contains('__active'))) {
    return true;
  }
};
const removeOperatorActiveClass = function () {
  operatorKeys.forEach((el) => el.classList.remove('__active'));
};

const calcSum = function (data) {
  const sum = `${data.curNum}${data.operator}${data.prevNum}`;
  console.log(sum);
  data.curNum = evaluate(sum);
};

const updateScreen = function (data) {
  calcScreen.innerText = data.curNum;
};

const init = function (data) {
  data.prevNum = '';
  data.curNum = '';
  data.operator = '';
  data.sum = '';

  calcScreen.innerText = '0';

  removeOperatorActiveClass();
};

const numPress = function (e, data) {
  const { target } = e;
  const clicked = target.closest('button');
  const numValue = clicked.innerText;
  data.curNum += numValue;
  //   console.table(model);
};

const firstOperatorPress = function (e, data) {
  const { target } = e;
  const clicked = target.closest('.calc__button');
  const operatorValue = clicked.getAttribute('data-operator');
  clicked.classList.add('__active');
  data.operator = operatorValue;
  console.log(data.operator);
};

export {
  updateScreen,
  init,
  numPress,
  firstOperatorPress,
  calcSum,
  isOperatorActive,
};

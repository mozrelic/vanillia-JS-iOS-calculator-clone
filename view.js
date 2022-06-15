import { evaluate } from 'mathjs';

const calcScreen = document.querySelector('.calc_screen');
const operatorKeys = document.querySelectorAll('[data-operator]');

const removeOperatorActiveClass = function () {
  operatorKeys.forEach((el) => el.classList.remove('__active'));
};

const calcSum = function (data) {
  function compute() {
    const sum = `${data.prevNum} ${data.operator} ${
      data.curNum ? data.curNum : data.prevNum
    }`;

    data.curNum = String(evaluate(sum));
  }

  compute();
  removeOperatorActiveClass();
};

const updateScreen = function (data) {
  calcScreen.innerText = data.curNum;
};

const init = function (data) {
  data.prevNum = '';
  data.curNum = '';
  data.tempNum = '';
  data.operator = '';
  data.state = false;
  data.sum = '';

  calcScreen.innerText = '0';
  removeOperatorActiveClass();
};

const numPress = function (e, data) {
  const { target } = e;
  const clicked = target.closest('button');
  const numValue = clicked.innerText;
  data.curNum += numValue;

  console.log(data.state);

  if (data.state) {
    removeOperatorActiveClass();
  }
};

const operatorPress = function (e, data) {
  const { target } = e;
  const clicked = target.closest('button');
  const operatorValue = clicked.getAttribute('data-operator');

  if (!data.state) {
    clicked.classList.add('__active');
    data.operator = operatorValue;
    data.state = true;
    return;
  }

  if (data.state) {
    calcSum(data);
    removeOperatorActiveClass();
    clicked.classList.add('__active');
    data.operator = operatorValue;
  }
};

const decimalPress = function (e, data) {
  if (data.curNum.includes('.')) return;

  const { target } = e;
  const clicked = target.closest('button');
  const decimal = clicked.innerText;
  data.curNum += decimal;
};

const invertPress = function (data) {
  if (!data.curNum.includes('-')) {
    data.curNum = `-${data.curNum}`;
    return;
  }

  data.curNum = data.curNum.replace(/-/, '');
};

export {
  updateScreen,
  init,
  numPress,
  operatorPress,
  decimalPress,
  invertPress,
  calcSum,
};

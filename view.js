import { evaluate } from 'mathjs';

const calcScreen = document.querySelector('.calc_screen');
const operatorKeys = document.querySelectorAll('[data-operator]');

const removeOperatorActiveClass = function () {
  operatorKeys.forEach((el) => el.classList.remove('__active'));
};

const calcSum = function (data) {
  // prevent calc if the necessary operands do not exist
  if ((!data.prevNum && !data.curNum) || (data.prevNum && !data.curNum)) return;

  function compute() {
    const sum = `${data.prevNum} ${data.operator} ${
      data.curNum ? data.curNum : data.prevNum
    }`;

    data.prevNum = String(evaluate(sum));
    data.curNum = '';
  }

  compute();
  removeOperatorActiveClass();
  data.operator = '';
  data.state = false;
};

const updateScreen = function (data) {
  calcScreen.innerText = data.curNum;

  // the next two if statements check to see which number should be displayed
  if (data.curNum && data.prevNum) {
    calcScreen.innerText = data.curNum;
  }

  if (!data.curNum && data.prevNum) {
    calcScreen.innerText = data.prevNum;
  }
};

const init = function (data) {
  data.prevNum = '';
  data.curNum = '';
  data.operator = '';
  data.state = false;

  calcScreen.innerText = '0';
  removeOperatorActiveClass();
};

const numPress = function (e, data) {
  const { target } = e;
  const clicked = target.closest('button');
  const numValue = clicked.innerText;
  data.curNum += numValue;

  // if a number is entered immediately after equals has been pressed and a sum has been produced, and before a new operator has been selected, then start an entirely new equation
  if (data.prevNum && !data.operator) {
    data.prevNum = '';
  }

  if (data.state) {
    removeOperatorActiveClass();

    // setting this to false when a number is entered is critical for keeping the state accurate
    data.state = false;
  }
};

const operatorPress = function (e, data) {
  const { target } = e;
  const clicked = target.closest('button');
  const operatorValue = clicked.getAttribute('data-operator');

  // handle situations AFTER an operator has been pressed and a second operand is being entered.
  // data.state gets set to false as soon as a number button is pressed.
  if (!data.state) {
    if (data.curNum && data.prevNum) {
      calcSum(data);
      clicked.classList.add('__active');
      data.operator = operatorValue;
      data.state = true;
      return;
    }
    if (!data.curNum && data.prevNum) {
      data.operator = operatorValue;
      data.state = true;
      return;
    }
    data.state = true;
    clicked.classList.add('__active');
    data.operator = operatorValue;
    data.prevNum = data.curNum;
    data.curNum = '';
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
  if (!data.curNum) {
    data.curNum = '-0';
    return;
  }

  if (!data.curNum.includes('-')) {
    data.curNum = `-${data.curNum}`;
    return;
  }

  if (data.curNum) {
    data.curNum = data.curNum.replace(/-/, '');
  }
};

const percentPress = function (data) {
  // if (data.curNum.length >= 2 && data.prevNum) {
  // }
};

export {
  updateScreen,
  init,
  numPress,
  operatorPress,
  decimalPress,
  invertPress,
  percentPress,
  calcSum,
};

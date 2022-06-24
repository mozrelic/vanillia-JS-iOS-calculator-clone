import { evaluate } from 'mathjs';

const calcScreen = document.querySelector('.calc_screen');
const operatorKeys = document.querySelectorAll('[data-operator]');
const clearKey = document.querySelector('[data-clear]');

const removeOperatorActiveClass = function () {
  operatorKeys.forEach((el) => el.classList.remove('__active'));
};

const ClearScreenOrClearMemoryLabel = function (data) {
  if (data.curNum.matchAll(/[1-9]/g) || data.state) {
    clearKey.innerText = 'C';
  }

  if (data.curNum === '') {
    clearKey.innerText = 'AC';
  }
};

const calcSum = function (data) {
  // prevent calc if the necessary operands do not exist
  if (!data.prevNum && !data.curNum) return;
  // if (!data.curNum) return;

  // we can pass the boolean true into the compute function to change what it is doing
  function compute(onlyLeftOperand = false) {
    const sum = `${data.prevNum} ${data.operator} ${
      data.curNum ? data.curNum : data.prevNum
    }`;

    // if true is given to compute as an argument, only left hand operand exists. keep most of the state intact. i.e. don't reset operator, state, or curNum
    // FIXME: curNum should not be removed in the case in which only the left operand exists.
    if (onlyLeftOperand) {
      data.prevNum = String(evaluate(sum));
      // data.curNum = '';
      removeOperatorActiveClass();
      return;
    }
    // if both sides of an equation exist, evaluate it normally
    data.prevNum = String(evaluate(sum));
    data.curNum = '';
    removeOperatorActiveClass();
    data.operator = '';
    data.state = false;
  }

  if (data.prevNum && !data.curNum) {
    compute(true);
    return;
  }

  compute();
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
  // handles the memory clear (i.e. AC)
  if (data.curNum === '0' || data.curNum === '') {
    data.prevNum = '';
    data.curNum = '';
    data.operator = '';
    data.state = false;

    calcScreen.innerText = '0';
    removeOperatorActiveClass();
    return;
  }

  // handles the screen clear (i.e. C)
  if (data.curNum.matchAll(/[1-9]/g)) {
    data.curNum = '';
    calcScreen.innerText = '0';
  }
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

  // FIXME: not sure if this is doing anything,
  if (data.curNum === '0') {
    data.curNum = numValue;
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
    clicked.classList.add('__active');
    data.operator = operatorValue;
    data.prevNum = data.curNum;
    data.curNum = '';
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

// TODO: complete this feature
const percentPress = function (data) {
  // if (data.curNum.length >= 2 && data.prevNum) {
  // }
};

export {
  ClearScreenOrClearMemoryLabel,
  updateScreen,
  init,
  numPress,
  operatorPress,
  decimalPress,
  invertPress,
  percentPress,
  calcSum,
};

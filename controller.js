import './style.scss';
import model from './model';
import {
  updateScreen,
  init,
  numPress,
  firstOperatorPress,
  calcSum,
} from './view';

const calcButtonContainer = document.querySelector('.calc__buttons__container');

// Number buttons
calcButtonContainer.addEventListener('click', (e) => {
  e.preventDefault();

  const operatorKey = e.target.dataset.operator;
  const numKey = e.target.dataset.number === '';

  if (numKey) {
    numPress(e, model);
  }

  // if an operator key is pressed and the operator property is NOT empty,
  if (operatorKey && !model.operator) {
    firstOperatorPress(e, model);
  }

  // if (operatorKey && isOperatorActive) {
  //   model.prevNum = model.curNum;
  //   model.curNum = '';
  // }

  // C button reset state of calculator
  if (e.target.dataset.clear === '') {
    init(model);
  }
  if (e.target.dataset.operator === '=') {
    calcSum(model);
  }

  if (model.curNum && model.prevNum) {
    updateScreen(model);
  }

  updateScreen(model);
});

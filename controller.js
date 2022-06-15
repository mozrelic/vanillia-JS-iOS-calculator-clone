import './style.scss';
import model from './model';
import {
  updateScreen,
  init,
  numPress,
  operatorPress,
  decimalPress,
  invertPress,
  calcSum,
} from './view';

const calcButtonContainer = document.querySelector('.calc__buttons__container');

// Number buttons
calcButtonContainer.addEventListener('click', (e) => {
  e.preventDefault();

  const operatorKey = e.target.dataset.operator;
  const equalsKey = e.target.dataset.equals;
  const clearKey = e.target.dataset.clear === '';
  const numKey = e.target.dataset.number === '';
  const decimalKey = e.target.dataset.dot === '';
  const invertKey = e.target.dataset.invert === '';

  if (numKey) {
    numPress(e, model);
  }

  // if an operator key is pressed and the operator property is NOT empty,
  // if (operatorKey && !model.operator) {
  //   firstOperatorPress(e, model);
  // }
  if (operatorKey && model.curNum) {
    operatorPress(e, model);
  }

  if (operatorKey && model.operator) {
    model.prevNum = model.curNum;
    model.curNum = '';
  }

  // C button reset state of calculator
  if (clearKey) {
    init(model);
  }
  // calculate sum
  if (equalsKey) {
    calcSum(model);
  }

  if (decimalKey) {
    decimalPress(e, model);
  }

  if (invertKey) {
    invertPress(model);
  }

  // if (model.curNum && model.prevNum) {
  //   updateScreen(model);
  // }

  console.table(model);

  updateScreen(model);
});

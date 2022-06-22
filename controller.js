import './style.scss';
import model from './model';
import {
  updateScreen,
  init,
  numPress,
  operatorPress,
  decimalPress,
  invertPress,
  percentPress,
  calcSum,
} from './view';

const calcButtonContainer = document.querySelector('.calc__buttons__container');

calcButtonContainer.addEventListener('click', (e) => {
  e.preventDefault();

  // create our target the moment the correction button is clicked inside the calculator button container
  const operatorKey = e.target.dataset.operator;
  const equalsKey = e.target.dataset.equals;
  const clearKey = e.target.dataset.clear === '';
  const numKey = e.target.dataset.number === '';
  const decimalKey = e.target.dataset.dot === '';
  const invertKey = e.target.dataset.invert === '';
  const percentKey = e.target.dataset.percent === '';

  //
  // check to see which button was clicked and execute the appropriate function based on that
  //
  if (numKey) {
    numPress(e, model);
  }

  if (operatorKey) {
    operatorPress(e, model);
  }

  if (equalsKey) {
    calcSum(model);
  }

  if (decimalKey) {
    decimalPress(e, model);
  }

  if (invertKey) {
    invertPress(model);
  }

  if (percentKey) {
    percentPress(e, model);
  }

  console.table(model);

  // update the calculator screen after our action has been performed
  updateScreen(model);

  // clearKey must be called at the end in order to reset the entire state of the calculator
  if (clearKey) {
    init(model);
  }
});

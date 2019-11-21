import constants from './constants.js';

const ENTER_ARROW_LEFT = 'ArrowLeft';
const ENTER_ARROW_UP = 'ArrowUp';
const ENTER_ARROW_RIGHT = 'ArrowRight';
const ENTER_ARROW_DOWN = 'ArrowDown';

const toggleClassName = (currentElem, nextElem, className) => {
  currentElem.classList.remove(className);
  nextElem.classList.add(className);
};

const changeActive = (currentActive, nextActive, className) => {
  toggleClassName(currentActive, nextActive, className);
  currentActive.blur();
  nextActive.focus();
};

const moveToLeft = (datesArr, currentElemIndex, currentElem) => {
  if (currentElemIndex === 0) {
    return;
  }
  const nextSelected = datesArr[currentElemIndex - 1];
  changeActive(currentElem, nextSelected, constants.DATE_SELECTED);
};

const moveToRight = (datesArr, currentElemIndex, currentElem) => {
  if (currentElemIndex === datesArr.length - 1) {
    return;
  }
  const nextSelected = datesArr[currentElemIndex + 1];
  changeActive(currentElem, nextSelected, constants.DATE_SELECTED);
};

const moveToUp = (datesArr, currentElemIndex, currentElem) => {
  if (currentElemIndex < 7) {
    return;
  }
  const nextSelected = datesArr[currentElemIndex - 7];
  changeActive(currentElem, nextSelected, constants.DATE_SELECTED);
};

const moveToDown = (datesArr, currentElemIndex, currentElem) => {
  if (currentElemIndex > datesArr.length - 8) {
    return;
  }
  const nextSelected = datesArr[currentElemIndex + 7];
  changeActive(currentElem, nextSelected, constants.DATE_SELECTED);
};

const moveSelected = (event) => {
  const codes = [ENTER_ARROW_LEFT, ENTER_ARROW_UP, ENTER_ARROW_RIGHT, ENTER_ARROW_DOWN];
  const isKeyTarget = codes.includes(event.code);
  const isActiveTarget = document.activeElement.matches(`.${constants.DATE}`);

  if (!(isKeyTarget && isActiveTarget)) {
    return;
  }

  event.preventDefault();

  const dates = [...document.querySelectorAll(`.${constants.DATE}`)];
  const currentSelectedIndex = dates.findIndex((elem) => {
    return elem.classList.contains(constants.DATE_SELECTED);
  });
  const currentSelected = dates[currentSelectedIndex];

  if (event.code === ENTER_ARROW_RIGHT) {
    moveToRight(dates, currentSelectedIndex, currentSelected);
  }

  if (event.code === ENTER_ARROW_LEFT) {
    moveToLeft(dates, currentSelectedIndex, currentSelected);
  }

  if (event.code === ENTER_ARROW_UP) {
    moveToUp(dates, currentSelectedIndex, currentSelected);
  }

  if (event.code === ENTER_ARROW_DOWN) {
    moveToDown(dates, currentSelectedIndex, currentSelected);
  }
};

const init = () => window.addEventListener('keydown', moveSelected);

export default {
  init,
};

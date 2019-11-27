import constants from './constants.js';

const ENTER_ARROW_LEFT = 'ArrowLeft';
const ENTER_ARROW_UP = 'ArrowUp';
const ENTER_ARROW_RIGHT = 'ArrowRight';
const ENTER_ARROW_DOWN = 'ArrowDown';
const WEEK_LENGTH = 7;

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

  const getNextSelected = (currentIndex, arr) => {
    return arr
      .slice(0, currentIndex)
      .reverse()
      .find((elem) => !elem.disabled);
  };

  const nextSelected = getNextSelected(currentElemIndex, datesArr);
  if (nextSelected) {
    changeActive(currentElem, nextSelected, constants.DATE_SELECTED);
  }
};

const moveToRight = (datesArr, currentElemIndex, currentElem) => {
  if (currentElemIndex === datesArr.length - 1) {
    return;
  }

  const getNextSelected = (currentIndex, arr) => {
    return arr.slice(currentIndex + 1).find((elem) => !elem.disabled);
  };

  const nextSelected = getNextSelected(currentElemIndex, datesArr);
  if (nextSelected) {
    changeActive(currentElem, nextSelected, constants.DATE_SELECTED);
  }
};

const moveToUp = (datesArr, currentElemIndex, currentElem) => {
  if (currentElemIndex < 7) {
    return;
  }

  const getNextSelected = (currentIndex, arr) => {
    for (let i = currentIndex - WEEK_LENGTH; i >= 0; i -= WEEK_LENGTH) {
      if (!arr[i].disabled) {
        return arr[i];
      }
    }
    return null;
  };

  const nextSelected = getNextSelected(currentElemIndex, datesArr);
  if (nextSelected) {
    changeActive(currentElem, nextSelected, constants.DATE_SELECTED);
  }
};

const moveToDown = (datesArr, currentElemIndex, currentElem) => {
  if (currentElemIndex > datesArr.length - 8) {
    return;
  }

  const getNextSelected = (currentIndex, arr) => {
    for (let i = currentIndex + WEEK_LENGTH; i < arr.length; i += WEEK_LENGTH) {
      if (!arr[i].disabled) {
        return arr[i];
      }
    }
    return null;
  };

  const nextSelected = getNextSelected(currentElemIndex, datesArr);
  if (nextSelected) {
    changeActive(currentElem, nextSelected, constants.DATE_SELECTED);
  }
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

  const methods = {
    [ENTER_ARROW_LEFT]: moveToLeft,
    [ENTER_ARROW_UP]: moveToUp,
    [ENTER_ARROW_RIGHT]: moveToRight,
    [ENTER_ARROW_DOWN]: moveToDown,
  };

  methods[event.code](dates, currentSelectedIndex, currentSelected);
};

const init = () => window.addEventListener('keydown', moveSelected);

export default {
  init,
};

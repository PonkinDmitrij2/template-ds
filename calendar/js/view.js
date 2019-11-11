import constants from './constants.js';

const chunkArr = (chunkLength, arr) => {
  const result = [];

  for (let i = 0; i < arr.length; i += chunkLength) {
    const chunk = arr.slice(i, chunkLength + i);
    result.push(chunk);
  }

  return result;
};

const render = (data) => {
  const buttonStrings = data.map(({ value, isToday, isMainMonth, iso }) => {
    if (!isMainMonth) {
      return `<button class="${constants.DATE} ${constants.DATE_OTHER}" data-iso="${iso}">${value}</button>`;
    }

    if (isToday) {
      return `<button class="${constants.DATE} ${constants.DATE_TODAY} ${constants.DATE_SELECTED}" data-iso="${iso}">${value}</button>`;
    }

    return `<button class="${constants.DATE}" data-iso="${iso}">${value}</button>`;
  });

  const chunks = chunkArr(7, buttonStrings);
  const result = chunks.map((chunk) => {
    const template = chunk.join('');
    return `<div class="${constants.WEEK_ROW}">${template}</div>`;
  });

  return result.join('');
};

export default {
  render,
};

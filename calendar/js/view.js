import constants from './constants.js';

const chunkArr = (chunkLength, arr) => {
  const result = [];

  for (let i = 0; i < arr.length; i += chunkLength) {
    const chunk = arr.slice(i, chunkLength + i);
    result.push(chunk);
  }

  return result;
};

const generateButton = (value, classNames, iso) => {
  return `<button class="${classNames.join(' ')}" data-iso="${iso}">${value}</button>`;
};

const render = (data) => {
  const buttonStrings = data.map(({ value, isToday, isMainMonth, iso }) => {
    if (!isMainMonth) {
      return generateButton(value, [constants.DATE, constants.DATE_OTHER], iso);
    }

    if (isToday) {
      return generateButton(
        value,
        [constants.DATE, constants.DATE_TODAY, constants.DATE_SELECTED],
        iso,
      );
    }

    return generateButton(value, [constants.DATE], iso);
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

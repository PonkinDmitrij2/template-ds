import constants from './constants.js';

const render = () => {
  constants.date.setDate(1);

  const weekDayNum = constants.date.getDay();
  const today = new Date();

  const currentMonthEndDate = new Date(
    constants.date.getFullYear(),
    constants.date.getMonth() + 1,
    0,
  ).getDate();

  const currentMonthEndDayNum = new Date(
    constants.date.getFullYear(),
    constants.date.getMonth(),
    currentMonthEndDate,
  ).getDay();

  const prevMonthEndDate = new Date(
    constants.date.getFullYear(),
    constants.date.getMonth(),
    0,
  ).getDate();

  const titleString = `${
    constants.monthNames[constants.date.getMonth()]
  } ${constants.date.getFullYear()}`;
  constants.title.textContent = titleString;

  let templateDates = '';
  const SHIFT_DAY = 1;

  for (let i = weekDayNum; i > 0; i--) {
    templateDates += `<button class='calendar__date  calendar__date--other-month' type='button'>${prevMonthEndDate -
      i +
      SHIFT_DAY}</button>`;
  }

  for (let j = 1; j <= currentMonthEndDate; j++) {
    const isToday =
      j === today.getDate() && constants.date.getMonth() === today.getMonth();

    if (isToday) {
      templateDates += `<button class='calendar__date  calendar__date--today' type='button'>${j}</button>`;
    } else {
      templateDates += `<button class='calendar__date' type='button'>${j}</button>`;
    }
  }

  for (let k = currentMonthEndDayNum + SHIFT_DAY; k <= 6; k++) {
    let number = 1;
    templateDates += `<button class='calendar__date  calendar__date--other-month' type='button'>${number}</button>`;
    number += 1;
  }

  constants.datesBlock.innerHTML = templateDates;
};

export default render;

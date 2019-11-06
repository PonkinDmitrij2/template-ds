const date = new Date();
const TITLE = 'calendar-title';
const DATES = 'calendar__dates';
const title = document.querySelector(`.${TITLE}`);
const dates = document.querySelector(`.${DATES}`);

const render = () => {
  date.setDate(1);

  const weekDayNum = date.getDay();
  const today = new Date();

  const currentMonthEndDate = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0,
  ).getDate();

  const currentMonthEndDayNum = new Date(
    date.getFullYear(),
    date.getMonth(),
    currentMonthEndDate,
  ).getDay();

  const prevMonthEndDate = new Date(date.getFullYear(), date.getMonth(), 0).getDate();

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const titleString = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
  title.textContent = titleString;

  let templateDates = '';
  const SHIFT_DAY = 1;

  for (let i = weekDayNum; i > 0; i--) {
    templateDates += `<button class='calendar__date  calendar__date--other-month' type='button'>${prevMonthEndDate -
      i +
      SHIFT_DAY}</button>`;
  }

  for (let j = 1; j <= currentMonthEndDate; j++) {
    const isToday = j === today.getDate() && date.getMonth() === today.getMonth();

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

  dates.innerHTML = templateDates;
};

export default render;

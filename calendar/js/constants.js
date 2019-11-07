const date = new Date();
const TITLE = 'calendar-title';
const DATES = 'calendar__dates';
const title = document.querySelector(`.${TITLE}`);
const datesBlock = document.querySelector(`.${DATES}`);
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

export default {
  date,
  title,
  datesBlock,
  monthNames,
};

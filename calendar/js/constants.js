const TITLE = 'calendar-title';
const DATES = 'calendar__dates';
const WEEK_ROW = 'calendar__week';
const DATE = 'calendar__date';
const DATE_TODAY = 'calendar__date--today';
const DATE_OTHER = 'calendar__date--other-month';
const DATE_SELECTED = 'calendar__date--selected';
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
  title,
  datesBlock,
  monthNames,
  WEEK_ROW,
  DATE,
  DATE_TODAY,
  DATE_OTHER,
  DATE_SELECTED,
};

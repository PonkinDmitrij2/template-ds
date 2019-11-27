const selectedDate = new Date();
const today = new Date();
const SHIFT_DAY = 1;
const ISO_PART_TIME = 'T00:00:00.000Z';

const daysInMonth = (month, year) => {
  switch (month) {
    case 1:
      return (year % 4 === 0 && year % 100) || year % 400 === 0 ? 29 : 28;
    case 8:
    case 3:
    case 5:
    case 10:
      return 30;
    default:
      return 31;
  }
};

const getLastDaysInPrevMonth = (blocked) => {
  const numberOfDays = selectedDate.getDay();
  const targetDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1);
  const endDayOfPrevMonth = daysInMonth(targetDate.getMonth(), targetDate.getFullYear());
  const days = [];

  for (let i = numberOfDays; i > 0; i--) {
    const day = {};
    const date = endDayOfPrevMonth - i + SHIFT_DAY;

    day.value = date;
    day.isToday = false;
    day.isMainMonth = false;
    day.iso = `${targetDate.getFullYear()}-${targetDate.getMonth() +
      1}-${date}${ISO_PART_TIME}`;
    day.isBlocked = blocked.includes(day.iso);

    days.push(day);
  }

  return days;
};

const getDaysInCurrentMonth = (blocked) => {
  const endDayOfCurrentMonth = daysInMonth(
    selectedDate.getMonth(),
    selectedDate.getFullYear(),
  );
  const days = [];

  for (let i = 1; i <= endDayOfCurrentMonth; i++) {
    const isToday =
      i === today.getDate() && selectedDate.getMonth() === today.getMonth();
    const day = {};

    day.value = i;
    day.isToday = isToday;
    day.isMainMonth = true;
    day.iso = `${selectedDate.getFullYear()}-${selectedDate.getMonth() +
      1}-${i}${ISO_PART_TIME}`;
    day.isBlocked = blocked.includes(day.iso);

    days.push(day);
  }

  return days;
};

const getFirstDaysInNextMonth = (blocked) => {
  const targetDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1);
  const weekDayToStart = targetDate.getDay();
  const LAST_DAY_OF_WEEK = 6;
  const days = [];

  if (weekDayToStart === 0) return days;

  for (let i = weekDayToStart, num = 1; i <= LAST_DAY_OF_WEEK; i += 1, num += 1) {
    const day = {};

    day.value = num;
    day.isToday = false;
    day.isMainMonth = false;
    day.iso = `${targetDate.getFullYear()}-${targetDate.getMonth() +
      1}-${num}${ISO_PART_TIME}`;
    day.isBlocked = blocked.includes(day.iso);

    days.push(day);
  }

  return days;
};

const getData = (blocked, ...args) => {
  if (args.length === 2) {
    const [month, year] = args;
    selectedDate.setMonth(month);
    selectedDate.setFullYear(year);
  }

  if (args.length === 1) {
    const [month] = args;
    selectedDate.setMonth(month);
  }

  // Sets the date count of the selected month from the 1st day
  selectedDate.setDate(1);

  const days = [
    ...getLastDaysInPrevMonth(blocked),
    ...getDaysInCurrentMonth(blocked),
    ...getFirstDaysInNextMonth(blocked),
  ];

  return {
    days,
    month: selectedDate.getMonth(),
    year: selectedDate.getFullYear(),
  };
};

export default {
  getData,
};

import constants from './constants.js';
import data from './data.js';
import view from './view.js';
import navigation from './navigation.js';

const blockedDays = [
  '2019-10-28T00:00:00.000Z',
  '2019-11-6T00:00:00.000Z',
  '2019-11-15T00:00:00.000Z',
  '2019-11-20T00:00:00.000Z',
  // '2019-11-27T00:00:00.000Z',
];
const { days, month, year } = data.getData(blockedDays);
if (constants.title) {
  constants.title.textContent = `${constants.monthNames[month]} ${year}`;
}
if (constants.datesBlock) {
  constants.datesBlock.innerHTML = view.render(days);
}

navigation.init();

const handleDate = (event) => {
  if (event.target.matches(`.${constants.DATE}`)) {
    const targetSelector = constants.DATE_SELECTED;

    constants.datesBlock
      .querySelector(`.${targetSelector}`)
      .classList.remove(targetSelector);
    event.target.classList.add(targetSelector);

    console.log(event.target.dataset.iso);
  }
};

if (constants.datesBlock) {
  constants.datesBlock.addEventListener('click', handleDate);
}

import constants from './constants.js';
import data from './data.js';
import view from './view.js';
import navigation from './navigation.js';

const { days, month, year } = data.getData();
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

import constants from './constants.js';
import data from './data.js';
import view from './view.js';

const { days, month, year } = data.getData();
constants.title.textContent = `${constants.monthNames[month]} ${year}`;
constants.datesBlock.innerHTML = view.render(days);

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

constants.datesBlock.addEventListener('click', handleDate);

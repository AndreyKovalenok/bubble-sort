import { SortData } from './sortData.js';

/**
 * Количество соритруемых элементов
 */
const SORTED_ELEMENTS_COUNT = 9;

const sortListNode = document.querySelector('.sort__list');
const nextButton = document.querySelector('.controls__btn--next');
const refreshButton = document.querySelector('.controls__btn--refresh');
const infoField = document.querySelector('.info');
const target = document.querySelector('.sort__target');

/**
 * Сущность, хранязая состояние алгоритма
 */
const sortData = new SortData({
  sortedElementsCount: SORTED_ELEMENTS_COUNT,
  nextButton: nextButton,
  target,
  infoField
});
sortListNode.appendChild(sortData.render());
sortData.init();

/**
 * Обнуление состояния
 */
refreshButton.addEventListener('click', () => {
  sortListNode.innerHTML = '';
  sortData.refresh();
  sortListNode.appendChild(sortData.render());
});
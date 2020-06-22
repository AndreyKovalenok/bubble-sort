import { SortData } from './sortData.js';

/**
 * Количество соритруемых элементов
 */
const SORTED_ELEMENTS_COUNT = 9;

const sortListNode = document.querySelector('.sort__list');
const nextButton = document.querySelector('.controls__btn--main');
const refreshButton = document.querySelector('.controls__btn--secondary');
const infoField = document.querySelector('.info');
const target = document.querySelector('.sort__target');

/**
 * Сущность, хранящая состояние алгоритма
 */
const sortData = new SortData({
   sortedElementsCount: SORTED_ELEMENTS_COUNT,
   nextButton: nextButton,
   refreshButton: refreshButton,
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

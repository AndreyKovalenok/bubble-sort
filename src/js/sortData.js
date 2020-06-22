import { SortItem } from './sortItem.js';

/**
 * Класс, описывающий алгоритм, отрисовку элементов и их перемещение
 */
export class SortData {
   constructor({sortedElementsCount, nextButton, target, infoField}) {
      this.sortIndex = 1;
      this.targetLeftValue = 145;
      this.sortedElementsCount = sortedElementsCount;
      this.sortArray = [];
      this.target = target;
      this.infoField = infoField;
      this.nextButton = nextButton;
   }

   getRandomNumber = (min, max) => Math.floor(Math.random() * max + min);

   /**
    * Создание фрагмента с сортируемыми элементами
    */
   render() {
      const fragment = document.createDocumentFragment();

      for (let j = 0; j < this.sortedElementsCount; j++) {
         const sortItem = j === 0
            ? new SortItem({value: this.getRandomNumber(1, 99), current: true})
            : new SortItem({value: this.getRandomNumber(1, 99)});
         this.sortArray.push(sortItem);
         fragment.appendChild(sortItem.render());
      }

      return fragment;
   }

   /**
    * Установка элемента таргета на нужную позицию, добавления обработчика
    * клика по кнопке итерации, установка индекса, определяющего до какого
    * момента необходимо делать очередной обход элементов
    */
   init = () => {
      this.target.style.left = `${this.targetLeftValue}px`;
      this.nextButton.addEventListener('click', this.buttonClickHandler);
      this.lastSortIndex = this.sortedElementsCount;
   }

   /**
    * Метод, обновляющий состояние приложения
    */
   refresh = () => {
      this.nextButton.removeEventListener('click', this.buttonClickHandler);
      this.nextButton.addEventListener('click', this.buttonClickHandler);
      this.sortIndex = 1;
      this.targetLeftValue = 145;
      this.sortArray = [];
      this.lastSortIndex = this.sortedElementsCount;
      this.target.style.left = `${this.targetLeftValue}px`;
      this.infoField.textContent = 'Для движения по элементам нажимайте кнопку "Следующая интерация"';
   }

   /**
    * Обработчик события клика по кнопке итерации
    */
   buttonClickHandler = () => {
      if (this.sortArray[this.sortIndex].value < this.sortArray[this.sortIndex - 1].value) {
         this.infoField.innerHTML = `Меняем местами элементы <span class="info__current">${this.sortArray[this.sortIndex - 1].value}</span> и <span>${this.sortArray[this.sortIndex].value}</span>`;
         this.sortArray[this.sortIndex].setTransform(-80);
         this.sortArray[this.sortIndex - 1].setTransform(80);
         this.sortArray[this.sortIndex].removeClass('sort__item--current');
         this.sortArray[this.sortIndex - 1].addClass('sort__item--current');

         let temp = this.sortArray[this.sortIndex];
         this.sortArray[this.sortIndex] = this.sortArray[this.sortIndex - 1];
         this.sortArray[this.sortIndex - 1] = temp;

      } else {
         this.sortArray[this.sortIndex - 1].removeClass('sort__item--current');
         this.sortArray[this.sortIndex].addClass('sort__item--current');
         this.infoField.innerHTML = (this.sortArray[this.sortIndex - 1].value === this.sortArray[this.sortIndex].value)
            ? `Элементы <span class="info__current">${this.sortArray[this.sortIndex - 1].value}</span> и <span>${this.sortArray[this.sortIndex].value}</span> равны`
            : `Элемент <span>${this.sortArray[this.sortIndex - 1].value}</span> меньше элемента <span class="info__current">${this.sortArray[this.sortIndex].value}</span>. Действия не требуются`;
      }

      // Перемещение таргета на следующий элемент
      this.targetLeftValue += 80;
      this.target.style.left = `${this.targetLeftValue}px`;
      // Увеличение текущего индекса сортировки
      this.sortIndex++;

      // Конец сортировки
      if (this.lastSortIndex === 2) {
         this.sortArray[0].addClass('sort__item--stated');
         this.infoField.textContent = 'Соритровка завершена!';
         this.nextButton.removeEventListener('click', this.buttonClickHandler);
      }

      if (this.sortIndex === this.lastSortIndex) {
         // Сборс текущего индекса соритровки
         this.sortIndex = 1;
         // Уменьшение конечного индекса сортировки
         this.lastSortIndex--;
         // Перемещение таргета на первы элемент
         this.targetLeftValue = 145;
         this.target.style.left = `${this.targetLeftValue}px`;
         this.sortArray[this.sortIndex - 1].addClass('sort__item--current');
         this.sortArray[this.lastSortIndex].removeClass('sort__item--current');
         this.sortArray[this.lastSortIndex].addClass('sort__item--stated');
      }
   }
}

/**
 * Класс, описывающий сортируемые элементы
 */
export class SortItem {
   constructor({value, translate, current}) {
         this.value = value;
         this.translate = translate || 0;
         this.current = current;
   }

   addClass = (className) => {
      this.div.classList.add(className);
   }

   removeClass = (className) => {
      this.div.classList.remove(className);
   }

   /**
    * Метод, перемещающий сортируемые элементы
    * @param {number} value - значение, на которое необходимо переместить сортируемый элемент
    */
   setTransform = (value) => {
      this.translate += value;
      this.div.setAttribute('style', `transform: translateX(${this.translate}px);`);
   }

   /**
    * Создание сортируемого элемента
    */
   render() {
      this.div = document.createElement('div');
      this.div.classList.add('sort__item');
      this.div.textContent = this.value;

      if (this.current) {
         this.div.classList.add('sort__item--current');
      }

      if (this.translate) {
         this.div.setAttribute('style', `transform: translateX(${this.translate}px);`);
      }

      return this.div;
   }
}

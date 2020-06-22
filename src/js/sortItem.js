/**
 * Класс, описывающий сортируемые элементы
 */
export class SortItem {
  constructor({value, translate}) {
      this.value = value;
      this.translate = translate || 0;
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
    
    if (this.translate) {
      this.div.setAttribute('style', `transform: translateX(${this.translate}px);`);
    }

    return this.div;
  }
}
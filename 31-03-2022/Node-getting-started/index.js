class SortedList {
  constructor() {
    this.items = [];
    this.length = 0;

  }
  add(item) {
    this.items.push(item);
    this.length++;
    this.items.sort();
  }
  get(i) {
    if(i > this.items.length - 1) throw new Error("index out of bound");
    return this.items[i];
  }
  max() {
    return Math.max(...this,items);
  }
  min() {
    return Math.min(...this,items);
  }
  avg() {
    return Math.avg(...this,items);
  }

  sum() {
    return Math.sum(...this,items);
  }
  
};

module.exports = SortedList;

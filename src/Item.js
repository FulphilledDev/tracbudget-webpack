class Income {
  constructor(name, amount) {
    this.id = Math.random().toString(16).slice(2);
    this.name = name;
    this.amount = amount;
  }
}

class Expense {
  constructor(name, amount) {
    this.id = Math.random().toString(16).slice(2);
    this.name = name;
    this.amount = amount;
  }
}

export { Expense, Income };

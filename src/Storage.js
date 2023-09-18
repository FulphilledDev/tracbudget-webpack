class Storage {
  static getBudgetLimit(defaultLimit = 4500) {
    let budgetLimit;
    if (localStorage.getItem('budgetLimit') === null) {
      budgetLimit = defaultLimit;
    } else {
      budgetLimit = +localStorage.getItem('budgetLimit');
    }

    return budgetLimit;
  }

  static setBudgetLimit(budgetLimit) {
    localStorage.setItem('budgetLimit', budgetLimit);
  }

  static getTotalAmount(defaultAmount = 0) {
    let totalAmount;
    if (localStorage.getItem('totalAmount') === null) {
      totalAmount = defaultAmount;
    } else {
      totalAmount = +localStorage.getItem('totalAmount');
    }

    return totalAmount;
  }

  static updateTotalAmount(amount) {
    localStorage.setItem('totalAmount', amount);
  }

  static getIncome() {
    let income;
    if (localStorage.getItem('income') === null) {
      income = [];
    } else {
      income = JSON.parse(localStorage.getItem('income'));
    }

    return income;
  }

  static saveIncome(newIncome) {
    const income = Storage.getIncome();
    income.push(newIncome);
    localStorage.setItem('income', JSON.stringify(income));
  }

  static removeIncome(id) {
    const incomes = Storage.getIncome();
    incomes.forEach((income, index) => {
      if (income.id === id) {
        incomes.splice(index, 1);
      }
    });

    localStorage.setItem('income', JSON.stringify(incomes));
  }

  static getExpenses() {
    let expenses;
    if (localStorage.getItem('expenses') === null) {
      expenses = [];
    } else {
      expenses = JSON.parse(localStorage.getItem('expenses'));
    }

    return expenses;
  }

  static saveExpense(newExpense) {
    const expenses = Storage.getExpenses();
    expenses.push(newExpense);
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }

  static removeExpense(id) {
    const expenses = Storage.getExpenses();
    expenses.forEach((expense, index) => {
      if (expense.id === id) {
        expenses.splice(index, 1);
      }
    });

    localStorage.setItem('expenses', JSON.stringify(expenses));
  }

  static clearAll() {
    // Keeping budgetLimit
    localStorage.removeItem('totalAmount');
    localStorage.removeItem('expenses');
    localStorage.removeItem('income');

    // To clear everything including budgetLimit
    // localStorage.clear();
  }
}

export default Storage;

import Storage from './Storage';

class BudgetTracker {
  constructor() {
    this._budgetLimit = Storage.getBudgetLimit();
    this._totalAmount = Storage.getTotalAmount(0);
    this._income = Storage.getIncome();
    this._expenses = Storage.getExpenses();

    this._displayBudgetLimit();
    this._displayBudgetTotal();
    this._displayBudgetIncome();
    this._displayBudgetExpenses();
    this._displayBudgetRemaining();
    this._displayBudgetProgress();

    document.getElementById('limit').value = this._budgetLimit;
  }

  // Publice Methods/API
  addIncome(income) {
    this._income.push(income);
    this._totalAmount += income.amount;
    Storage.updateTotalAmount(this._totalAmount);
    Storage.saveIncome(income);
    this._displayNewIncome(income);
    this._render();
  }

  addExpense(expense) {
    this._expenses.push(expense);
    this._totalAmount -= expense.amount;
    Storage.updateTotalAmount(this._totalAmount);
    Storage.saveExpense(expense);
    this._displayNewExpense(expense);
    this._render();
  }

  removeIncome(id) {
    const index = this._income.findIndex((income) => income.id === id);

    if (index != -1) {
      const income = this._income[index];
      this._totalAmount -= income.amount;
      Storage.updateTotalAmount(this._totalAmount);
      this._income.splice(index, 1);
      Storage.removeIncome(id);
      this._render();
    }
  }

  removeExpense(id) {
    const index = this._expenses.findIndex((expense) => expense.id === id);

    if (index != -1) {
      const expense = this._expenses[index];
      this._totalAmount += expense.amount;
      Storage.updateTotalAmount(this._totalAmount);
      this._expenses.splice(index, 1);
      Storage.removeExpense(id);
      this._render();
    }
  }

  reset() {
    this._totalAmount = 0;
    this._income = [];
    this._expenses = [];
    Storage.clearAll();
    this._render();
  }

  setLimit(budgetLimit) {
    this._budgetLimit = budgetLimit;
    Storage.setBudgetLimit(budgetLimit);
    this._displayBudgetLimit();
    this._render();
  }

  loadItems() {
    this._income.forEach((item) => this._displayNewIncome(item));
    this._expenses.forEach((item) => this._displayNewExpense(item));
  }

  // Private Methods/API
  _displayBudgetTotal() {
    const total = this._totalAmount;
    const totalBudgetEl = document.getElementById('budget-total');
    totalBudgetEl.innerHTML = this._totalAmount;

    if (total < 0) {
      totalBudgetEl.parentElement.parentElement.classList.remove('bg-primary');
      totalBudgetEl.parentElement.parentElement.classList.add('bg-danger');
    } else {
      totalBudgetEl.parentElement.parentElement.classList.remove('bg-danger');
      totalBudgetEl.parentElement.parentElement.classList.add('bg-primary');
    }
  }

  _displayBudgetLimit() {
    const budgetLimitEl = document.getElementById('budget-limit');
    budgetLimitEl.innerHTML = this._budgetLimit;
  }

  _displayBudgetIncome() {
    const budgetIncomeEl = document.getElementById('budget-income');

    const incomeItems = this._income.reduce(
      (total, income) => total + income.amount,
      0
    );

    budgetIncomeEl.innerHTML = incomeItems;
  }

  _displayBudgetExpenses() {
    const budgetExpensesEl = document.getElementById('budget-expenses');

    const expenseItems = this._expenses.reduce(
      (total, expense) => total + expense.amount,
      0
    );

    budgetExpensesEl.innerHTML = expenseItems;
  }

  _displayBudgetRemaining() {
    const budgetRemainingEl = document.getElementById('budget-remaining');
    const progressEl = document.getElementById('budget-progress');
    const expenses = this._expenses.reduce(
      (total, expense) => total + expense.amount,
      0
    );

    const remaining = this._budgetLimit - expenses;

    budgetRemainingEl.innerHTML = remaining;

    if (remaining < 0) {
      budgetRemainingEl.parentElement.parentElement.classList.remove(
        'bg-light'
      );
      budgetRemainingEl.parentElement.parentElement.classList.add('bg-danger');

      progressEl.classList.remove('bg-success');
      progressEl.classList.add('bg-danger');
    } else {
      budgetRemainingEl.parentElement.parentElement.classList.remove(
        'bg-danger'
      );
      budgetRemainingEl.parentElement.parentElement.classList.add('bg-light');

      progressEl.classList.remove('bg-danger');
      progressEl.classList.add('bg-success');
    }
  }

  _displayBudgetProgress() {
    const progressEl = document.getElementById('budget-progress');
    const percentage = (this._totalAmount / this._budgetLimit) * 100;

    const width = Math.min(percentage, 100);

    progressEl.style.width = `${width}%`;
  }

  _displayNewIncome(income) {
    const incomesEl = document.getElementById('income-items');
    const incomeEl = document.createElement('div');
    incomeEl.classList.add('card', 'my-2');
    incomeEl.setAttribute('data-id', income.id);
    incomeEl.innerHTML = `
        <div class="card-body">
        <div class="d-flex align-items-center justify-content-between">
          <h4 class="mx-1">${income.name}</h4>
          <div
            class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5"
          >
            ${income.amount}
          </div>
          <button class="delete btn btn-danger btn-sm mx-2">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>
        `;

    incomesEl.appendChild(incomeEl);
  }

  _displayNewExpense(expense) {
    const expensesEl = document.getElementById('expense-items');
    const expenseEl = document.createElement('div');
    expenseEl.classList.add('card', 'my-2');
    expenseEl.setAttribute('data-id', expense.id);
    expenseEl.innerHTML = `
        <div class="card-body">
        <div class="d-flex align-items-center justify-content-between">
          <h4 class="mx-1">${expense.name}</h4>
          <div
            class="fs-1 bg-secondary text-white text-center rounded-2 px-2 px-sm-5"
          >
            ${expense.amount}
          </div>
          <button class="delete btn btn-danger btn-sm mx-2">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>
        `;

    expensesEl.appendChild(expenseEl);
  }

  _render() {
    this._displayBudgetTotal();
    this._displayBudgetIncome();
    this._displayBudgetExpenses();
    this._displayBudgetRemaining();
    this._displayBudgetProgress();
  }
}

export default BudgetTracker;

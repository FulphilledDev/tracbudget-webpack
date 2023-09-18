import '@fortawesome/fontawesome-free/js/all';
import BudgetTracker from './Tracker';
import { Income, Expense } from './Item';
import { Modal, Collapse } from 'bootstrap';
import './css/bootstrap.css';
import './css/style.css';

class App {
  constructor() {
    this._tracker = new BudgetTracker();
    this._loadEventListeners();
    this._tracker.loadItems();
  }

  _loadEventListeners() {
    document
      .getElementById('income-form')
      .addEventListener('submit', this._newItem.bind(this, 'income'));
    document
      .getElementById('expense-form')
      .addEventListener('submit', this._newItem.bind(this, 'expense'));

    document
      .getElementById('income-items')
      .addEventListener('click', this._removeItem.bind(this, 'income'));

    document
      .getElementById('expense-items')
      .addEventListener('click', this._removeItem.bind(this, 'expense'));

    document
      .getElementById('filter-income')
      .addEventListener('keyup', this._filterItems.bind(this, 'income'));

    document
      .getElementById('filter-expenses')
      .addEventListener('keyup', this._filterItems.bind(this, 'expense'));

    document
      .getElementById('reset')
      .addEventListener('click', this._reset.bind(this));

    document
      .getElementById('limit-form')
      .addEventListener('click', this._setLimit.bind(this));
  }

  _newItem(type, e) {
    e.preventDefault();

    const name = document.getElementById(`${type}-name`);
    const amount = document.getElementById(`${type}-amount`);

    // Validate inputs
    if (name.value === '' || amount.value === '') {
      alert('Please fill in all fields');
      return;
    }

    if (type === 'income') {
      const income = new Income(name.value, +amount.value);
      this._tracker.addIncome(income);
    } else {
      const expense = new Expense(name.value, +amount.value);
      this._tracker.addExpense(expense);
    }

    name.value = '';
    amount.value = '';

    const collapseItem = document.getElementById(`collapse-${type}`);
    const bsCollapse = Collapse(collapseItem, {
      toggle: true,
    });
  }

  _removeItem(type, e) {
    if (
      e.target.classList.contains('delete') ||
      e.target.classList.contains('fa-xmark')
    ) {
      if (confirm('Are you sure?')) {
        const id = e.target.closest('.card').getAttribute('data-id');
        console.log(id);

        type === 'income'
          ? this._tracker.removeIncome(id)
          : this._tracker.removeExpense(id);

        e.target.closest('.card').remove();
      }
    }
  }

  _filterItems(type, e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll(`#${type}-items .card`).forEach((item) => {
      const name = item.firstElementChild.firstElementChild.textContent;

      if (name.toLowerCase().indexOf(text) !== -1) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  }

  _reset() {
    this._tracker.reset();

    document.getElementById('income-items').innerHTML = '';
    document.getElementById('expense-items').innerHTML = '';
    document.getElementById('filter-income').value = '';
    document.getElementById('filter-expenses').value = '';
  }

  _setLimit(e) {
    e.preventDefault();

    const limit = document.getElementById('limit');

    if (limit.value === '') {
      alert('Please add a limit!');
      return;
    }

    this._tracker.setLimit(+limit.value);
    limit.value = '';

    const modalEl = document.getElementById('limit-modal');
    const modal = Modal.getInstance(modalEl);
    modal.hide();
  }
}

const app = new App();

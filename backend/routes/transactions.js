const router = require('express').Router();
const { addIncome, getIncomes, deleteIncome, updateIncome } = require('../controllers/income.js');
const { addExpense, getExpense, deleteExpense, updateExpense } = require('../controllers/expense.js');
const { setBudget, getBudgets, deleteBudget } = require('../controllers/budget.js');
const { processRecurring } = require('../controllers/recurring.js');
const { protect } = require('../middleware/authMiddleware');

// All transaction routes require authentication
router.use(protect);

router.post('/add-income', addIncome)
    .get('/get-incomes', getIncomes)
    .delete('/delete-income/:id', deleteIncome)
    .put('/update-income/:id', updateIncome)
    .post('/add-expense', addExpense)
    .get('/get-expenses', getExpense)
    .delete('/delete-expense/:id', deleteExpense)
    .put('/update-expense/:id', updateExpense)
    .post('/set-budget', setBudget)
    .get('/get-budgets', getBudgets)
    .delete('/delete-budget/:id', deleteBudget)
    .post('/process-recurring', processRecurring);

module.exports = router;
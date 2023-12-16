const router=require('express').Router()
const {addIncome,getIncomes,deleteIncome}=require('../controllers/income.js')
const {addExpense,getExpense,deleteExpense}=require('../controllers/expense.js')

router.post('/add-income',addIncome)
    .get('/get-incomes', getIncomes)
    .delete('/delete-income/:id', deleteIncome)
    .post('/add-expense', addExpense)
    .get('/get-expenses', getExpense)
    .delete('/delete-expense/:id', deleteExpense)


module.exports=router
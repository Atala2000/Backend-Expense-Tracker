import { createExpense, findExpense, deleteExpense, updateExpense } from '../controllers/ExpenseController';
import { createLoan, findLoan, deleteLoan, updateLoan } from '../controllers/LoansController';

const express = require('express');
const router = express.Router();

// Routes for expenses
router.post("/expense", createExpense)
router.get("/expense/:expenseId", findExpense);
router.post("/expense/:expenseId", updateExpense);
router.post("/expense/:expenseId/delete", deleteExpense);

// Routes for loans
router.post("/loan", createLoan)
router.get("/loan/:expenseId", findLoan);
router.post("/loan/:loanId", updateLoan);
router.post("/loan/:loanId/delete", deleteLoan);
import {
  createExpense,
  findExpense,
  deleteExpense,
  updateExpense,
} from "../controllers/ExpenseController";
import {
  createLoan,
  findLoan,
  deleteLoan,
  updateLoan,
} from "../controllers/LoansController";

const express = require("express");
const router = express.Router();

// Routes for expenses
router.post("/expense", createExpense);
router.get("/expense/:expenseId", findExpense);
router.put("/expense/:expenseId", updateExpense);
router.put("/expense/:expenseId/delete", deleteExpense);

// Routes for loans
router.post("/loan", createLoan);
router.get("/loan/:expenseId", findLoan);
router.put("/loan/:loanId", updateLoan);
router.put("/loan/:loanId/delete", deleteLoan);

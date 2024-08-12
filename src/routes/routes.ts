// routes.ts

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

import { Register, Login, Logout} from "../controllers/AuthController";

import express from "express";

const router = express.Router();

// Routes for user
router.post("/account/user", Register);
router.post("/account/login", Login);
router.post("/account/logout", Logout);

// Routes for expenses
router.post("/expense", createExpense);
router.get("/expense/:expenseId", findExpense);
router.put("/expense/:expenseId", updateExpense);
router.put("/expense/:expenseId/delete", deleteExpense);

// Routes for loans
router.post("/loan", createLoan);
router.get("/loan/:loanId", findLoan);
router.put("/loan/:loanId", updateLoan);
router.put("/loan/:loanId/delete", deleteLoan);

router.get("/test", (req, res) => {
  res.send("Test route is working!");
});

export default router;

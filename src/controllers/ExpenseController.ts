import { Request, Response } from "express";
import { Expenses, ModelInterface } from "../models/models";
import { saveModelData } from "../services/db.service";

Expenses.findOne();

export const createExpense = (req: Request, res: Response) => {
  const { userId, category, amount, description, recurring, paymentMethod } =
    req.body;

  // Basic validation
  if (!userId || !category || typeof amount !== "number") {
    return res.status(400).send("Invalid input data");
  }

  const expense = new Expenses({
    userId,
    category,
    amount,
    description,
    recurring,
    paymentMethod,
  });

  saveModelData(expense)
    .then(() => {
      res.status(201).send("Expense created successfully");
    })
    .catch((error) => {
      res.status(500).send(`Error creating expense: ${error.message}`);
    });
};

const findExpense = async (req: Request, res: Response) => {
  const { expenseId } = req.params;

  if (!expenseId) {
    return res.status(400).send("Expense ID is required");
  }
    try {
        const result = await Expenses.findById(expenseId);

        if (!result) {
            return res.send(404).send("Expense not found");
        }

        return res.send(200).send({result})
    } catch (err) {
        return res.status(500).send("Internal server error")
    }
};

const deleteExpense = (req: Request, res: Response) => {
  const { expenseId } = req.params;

  if (!expenseId) {
    return res.status(400).send("Expense ID is required");
  }

  Expenses.findByIdAndDelete(expenseId);
};

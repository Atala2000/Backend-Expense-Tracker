import { Request, Response } from "express";
import { Expenses, ModelInterface } from "../models/models";
import { saveModelData } from "../services/db.service";
import { Types } from "mongoose";

/**
 * Creates a new expense.
 *
 * @param req - The request object containing the expense data.
 * @param res - The response object used to send the HTTP response.
 */
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

/**
 * Find an expense by ID.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns A response indicating the result of the operation.
 */
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

/**
 * Deletes an expense by its ID.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
const deleteExpense = (req: Request, res: Response) => {
  const { expenseId } = req.params;

  if (!expenseId) {
    return res.status(400).send("Expense ID is required");
  }

  try {
    Expenses.findByIdAndDelete(expenseId);
    return res.status(200).send("Expense successfully deleted")
  } catch (err) {
    console.log(err)
      return res.status(500).send("Internal server error")
  }
};



/**
 * Updates an expense in the database.
 * 
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the expense is updated.
 */
const updateExpense = async (req: Request, res: Response): Promise<Response> => {
  const { expenseId } = req.params;
  const updateData = req.body;

  if (!expenseId) {
    return res.status(400).send("Expense ID is required");
  }

  if (!Types.ObjectId.isValid(expenseId)) {
    return res.status(400).send("Invalid Expense ID format");
  }

  try {
    const result = await Expenses.findByIdAndUpdate(expenseId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!result) {
      return res.status(400).send("Expense not found")
    }

    return res.status(200).send({result})
  } catch (err) {
    console.error(`Error updating expense: ${err}`)
    return res.status(500).send("Internal server error")
  }
}
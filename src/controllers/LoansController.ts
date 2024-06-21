import { Request, Response } from "express";
import { Loans, ModelInterface } from "../models/models";
import { saveModelData } from "../services/db.service";
import { Types } from "mongoose";

/**
 * Creates a new loan.
 *
 * @param req - The request object containing the loan data.
 * @param res - The response object used to send the HTTP response.
 */
export const createLoan = (req: Request, res: Response) => {
  const { userId, dateTaken, expectedDateOfPayment, datePaid, paymentMethod, interest, expectedAmount, actualAmountPaid, status, lender, notes } =
    req.body;

  const loan = new Loans({
    userId,
    dateTaken,
    expectedDateOfPayment,
    datePaid,
    paymentMethod,
    interest,
    expectedAmount,
    actualAmountPaid,
    status,
    lender,
    notes
  });

  saveModelData(loan)
    .then(() => {
      res.status(201).send("Loan created successfully");
    })
    .catch((error) => {
      res.status(500).send(`Error creating Loan: ${error.message}`);
    });
};

/**
 * Find an expense by ID.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns A response indicating the result of the operation.
 */
const findLoan = async (req: Request, res: Response) => {
  const { loanID } = req.params;

  if (!loanID) {
    return res.status(400).send("Loan ID is required");
  }
    try {
        const result = await Loans.findById(loanID);

        if (!result) {
            return res.send(404).send("Loan not found");
        }

        return res.send(200).send({result})
    } catch (err) {
        return res.status(500).send("Internal server error")
    }
};

/**
 * Deletes an Loan by its ID.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
const deleteLoan = (req: Request, res: Response) => {
  const { loanID } = req.params;

  if (!loanID) {
    return res.status(400).send("Expense ID is required");
  }

  try {
    Loans.findByIdAndDelete(loanID);
    return res.status(200).send("Loan successfully deleted")
  } catch (err) {
    console.log(err)
      return res.status(500).send("Internal server error")
  }
};



/**
 * Updates an laon in the database.
 * 
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the loan is updated.
 */
const updateLoan = async (req: Request, res: Response): Promise<Response> => {
  const { loanID } = req.params;
  const updateData = req.body;

  if (!loanID) {
    return res.status(400).send("Loan ID is required");
  }

  if (!Types.ObjectId.isValid(loanID)) {
    return res.status(400).send("Invalid Loan ID format");
  }

  try {
    const result = await Loans.findByIdAndUpdate(loanID, updateData, {
      new: true,
      runValidators: true,
    });

    if (!result) {
      return res.status(400).send("Loan not found")
    }

    return res.status(200).send({result})
  } catch (err) {
    console.error(`Error updating loan: ${err}`)
    return res.status(500).send("Internal server error")
  }
}
import mongoose from "mongoose";
import {User, Expenses, Loans, ModelInterface} from '../models/models';
import {connectToDatabase, saveModelData } from './db.service'

const createNewExpense = async (expense: ModelInterface): Promise<void> => {
    try {
        await saveModelData(expense);
        console.log("Successfuly saved model");
    } catch(error) {
        console.log(`Error saving data: ${error}`);
    }
}
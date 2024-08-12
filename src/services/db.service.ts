// db.ts

import mongoose from "mongoose";
import {ModelInterface } from '../models/models';
import dotenv from "dotenv"
import process from "process";

dotenv.config();

const connectToDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(`${process.env.DATABASE_URL}`);
    console.log("Successfully connected to the database");
  } catch (error) {
    console.error("Error connecting to the database", error);
    throw error;
  }
};

/**
 * Saves the model data to the database.
 * 
 * @param modelData - The model data to be saved.
 * @returns A Promise that resolves to void.
 * @throws If there is an error saving the data.
 */
const saveModelData = async (modelData: ModelInterface): Promise<void> => {
  try {
    await modelData.save();
    console.log("Data saved successfully");
  } catch (error) {
    console.error("Error saving data", error);
    throw error;
  }
};


export {connectToDatabase, saveModelData}


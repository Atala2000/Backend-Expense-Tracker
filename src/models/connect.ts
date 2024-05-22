import mongoose from "mongoose";

async function connectToDatabase(): Promise<void> {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/test");
    console.log("Successfully connected to the database");
  } catch (error) {
    console.error("Error connecting to the database", error);
  }
}

connectToDatabase();

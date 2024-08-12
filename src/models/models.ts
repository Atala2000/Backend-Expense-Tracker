import { Schema, model, Types, Document, ObjectId } from "mongoose";

interface IUser extends Document{
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  // Optional fields for user profile enhancement
  phoneNumber?: string;
  address?: string;
  role?: "user" | "admin"; // User role for permissions
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  phoneNumber: { type: String },
  address: { type: String },
  role: { type: String, default: "user" },
});

const User = model<IUser>("User", userSchema);

interface IExpenses extends Document{
  userId: Types.ObjectId;
  dateCreated: Date;
  category: string;
  amount: number;
  description?: string; // Description of the expense
  recurring?: boolean; // Is this a recurring expense
  paymentMethod?: string; // Payment method used
}

const expensesSchema = new Schema<IExpenses>({
  userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  dateCreated: { type: Date, required: true, default: Date.now },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  description: { type: String },
  recurring: { type: Boolean, default: false },
  paymentMethod: { type: String },
});

const Expenses = model<IExpenses>("Expenses", expensesSchema);

interface ILoans extends Document{
  userId: Types.ObjectId;
  dateTaken: Date;
  expectedDateOfPayment: Date;
  datePaid?: Date;
  interest: number;
  expectedAmount: number;
  actualAmountPaid?: number; // Amount actually paid
  status?: "pending" | "paid" | "defaulted"; // Status of the loan
  lender?: string; // Lender details
  notes?: string; // Additional notes
}

const loansSchema = new Schema<ILoans>({
  userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  dateTaken: { type: Date, required: true, default: Date.now },
  expectedDateOfPayment: { type: Date, required: true },
  datePaid: { type: Date },
  interest: { type: Number, required: true },
  expectedAmount: { type: Number, required: true },
  actualAmountPaid: { type: Number },
  status: { type: String, default: "pending" },
  lender: { type: String },
  notes: { type: String },
});

const Loans = model<ILoans>("Loans", loansSchema);

interface IPaymentMethod extends Document{
  userId: Types.ObjectId;
  type: string; // e.g., Credit Card, Bank Transfer
  details: string; // e.g., Card number (masked), Bank account
  createdAt: Date;
}

const paymentMethodSchema = new Schema<IPaymentMethod>({
  userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  type: { type: String, required: true },
  details: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const PaymentMethod = model<IPaymentMethod>(
  "PaymentMethod",
  paymentMethodSchema
);

interface IRecurringPayment extends Document{
  userId: Types.ObjectId;
  expenseId: Types.ObjectId;
  frequency: string; // e.g., Monthly, Yearly
  nextPaymentDate: Date;
}

const recurringPaymentSchema = new Schema<IRecurringPayment>({
  userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  expenseId: { type: Schema.Types.ObjectId, required: true, ref: "Expenses" },
  frequency: { type: String, required: true },
  nextPaymentDate: { type: Date, required: true },
});

const RecurringPayment = model<IRecurringPayment>(
  "RecurringPayment",
  recurringPaymentSchema
);

type ModelInterface = ILoans | IUser | IExpenses

export { User, Expenses, Loans, PaymentMethod, RecurringPayment, ModelInterface};
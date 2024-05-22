# Expense and Loan Tracker

This is a web application that allows users to track their expenses and loans. It is built using Express.js and MongooseDB, and it also utilizes JWT tokens for authentication.

## Features

- User Registration: Users can create an account by providing their email and password.
- User Login: Registered users can log in to access their expense and loan tracking features.
- Expense Tracking: Users can add, view, update, and delete their expenses.
- Loan Tracking: Users can add, view, update, and delete their loans.
- Authentication: JWT tokens are used to authenticate users and protect sensitive routes.
- User Dashboard: Users have a personalized dashboard where they can view their expense and loan summaries.

## Prerequisites

Before running the application, make sure you have the following installed:

- Node.js: [Download and install Node.js](https://nodejs.org/en/download/)
- MongoDB: [Download and install MongoDB](https://www.mongodb.com/try/download/community)

## Getting Started

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/expense-tracker.git
    ```

2. Install the dependencies:

    ```bash
    cd expense-tracker
    npm install
    ```

3. Set up the environment variables:

    Create a `.env` file in the root
    PORT=3000
    MONGODB_URI=mongodb://localhost:27017/expense-tracker
    JWT_SECRET=your-secret-key*
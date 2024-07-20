# Account Transfer API

## Introduction
This is a simple RESTful API to perform transfers between accounts using Node.js, Express, and MongoDB.

## Installation
1. Clone the repository
2. Install dependencies
   ```sh
   npm install

## Database Information

- **Database Name:** `accountTransfer`
- **Collections:**
  - `accounts`: Stores user account details.
  - `transactions`: Records details of each money transfer transaction.

## Running the Application

 ```sh
  node app.js

## Create an Account

- URL: http://localhost:3000/accounts
- Method: POST
  ```sh
  {
    "accountNumber": "1001",
    "balance": 1500
  }

## Create Another Account

- URL: http://localhost:3000/accounts
- Method: POST
 ```sh
 {
   "accountNumber": "1002",
   "balance": 500
 }

## Create a Transaction

- URL: http://localhost:3000/transactions
- Method: POST
 ```sh
 {
   "sourceAccountNumber": "1001",
   "destinationAccountNumber": "1002",
   "amount": 200
 }
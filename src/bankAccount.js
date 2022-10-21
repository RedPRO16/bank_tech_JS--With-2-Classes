const moment = require("moment");
const Statement = require("./statement");

class BankAccount {
  constructor(statement = new Statement()) {
    this.balance = 0;
    this.transactions = [];
    this.statement = statement;
  }

  getBalance() {
    return this.balance;
  }

  depositAmount(amount) {
    this.errorMessage(amount);
    this.balance += amount;
    this.transactions.push({
      amount: amount,
      date: this.getCurrentDate(),
      type: "credit",
      balance: this.balance,
    });
  }

  withdrawAmount(amount) {
    this.balance -= amount;
    this.transactions.push({
      amount: amount,
      date: this.getCurrentDate(),
      type: "debit",
      balance: this.balance,
    });
  }

  bankStatement() {
    return this.statement.printStatement(this.transactions);
  }

  errorMessage(amount) {
    const message =
      "Invalid amount to deposit! Please try again with a valid amount.";
    if (amount <= 0 || typeof amount === "string") throw new Error(message);
  }

  getCurrentDate() {
    return moment().format("DD/MM/YYYY");
  }
}

module.exports = BankAccount;

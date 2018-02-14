class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    let balance = 0;
    for (let i of this.transactions) {
      balance += i.value;
    }
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    if (!this.isAllowed()) return false;
    // Keep track of the time of the transaction
    this.time = new Date();
    // Add the transaction to the account
    this.account.addTransaction(this);
    return true;
  }
}

class Deposit extends Transaction {

  get value() {
    return this.amount;
  }

  isAllowed() {
    return true;
  }
}

class Withdrawal extends Transaction {

  get value() {
    return - this.amount;
  }

  isAllowed() {
    return (this.account.balance - this.amount >= 0);
  }
}


// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account("whoodle");

console.log("Begining Balance:", myAccount.balance);

t0 = new Deposit(1000, myAccount);
t0.commit();
console.log("transaction 0:", t0);

t1 = new Withdrawal(50.25, myAccount);
t1.commit();
console.log("Transaction 1:", t1);

// t2 = new Withdrawal(9.99, myAccount);
// t2.commit();
// console.log("Transaction 2:", t2);

// t3 = new Deposit(120.00, myAccount);
// t3.commit();
// console.log("transaction 3:", t3);

console.log("Ending Balance:", myAccount.balance);

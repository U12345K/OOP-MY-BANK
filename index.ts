#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

//Bank account interface
interface BankAccount {
  accountNumber: number;
  balance: number;
  withdraw(amount: number): void;
  deposit(amount: number): void;
  checkBalance(): void;
  fundsTransfer(amount: number): void;
}

//creating bank account class
class BankAccount implements BankAccount {
  accountNumber: number;
  balance: number;

  constructor(accountNumber: number, balance: number) {
    this.accountNumber = accountNumber;
    this.balance = balance;
  }

  //withdraw money
  withdraw(amount: number): void {
    if (this.balance >= amount) {
      this.balance -= amount;
      console.log(
        chalk.greenBright(
          "----------------------------------------------------------------"
        )
      );
      console.log(
        chalk.yellowBright.italic(
          `You withdrawal $ ${chalk.green.bold(
            amount
          )} succesfuly. Your remaining balance is $ ${chalk.redBright.bold(
            this.balance
          )}`
        )
      );
      console.log(
        chalk.greenBright(
          "----------------------------------------------------------------"
        )
      );
    } else {
      console.log(
        chalk.greenBright("--------------------------------------------------")
      );
      console.log(chalk.redBright.bold("        ===Insufficient Balance==="));
      console.log(
        chalk.greenBright("--------------------------------------------------")
      );
    }
  }

  //deposit money
  deposit(amount: number): void {
    if (amount > 100) {
      amount -= 1;
      console.log(
        chalk.greenBright(
          "--------------------------------------------------------------------------------------"
        )
      );
      console.log(
        chalk.cyanBright.bold(
          "            $ 1 fee charges has been detected from your account"
        )
      );
      console.log(
        chalk.greenBright(
          "--------------------------------------------------------------------------------------"
        )
      );
    }
    this.balance += amount;
    console.log(
      chalk.greenBright(
        "--------------------------------------------------------------------------------------"
      )
    );
    console.log(
      chalk.yellowBright.italic(
        `          Your amount $ ${chalk.green.bold(
          amount
        )} Deposited succesfuly. Your balance is $ ${chalk.redBright.bold(
          this.balance
        )}`
      )
    );
    console.log(
      chalk.greenBright(
        "--------------------------------------------------------------------------------------"
      )
    );
  }

  //check balance
  checkBalance(): void {
    console.log(
      chalk.greenBright(
        "--------------------------------------------------------------------------------------"
      )
    );
    console.log(
      chalk.yellowBright.italic(
        `                       Your Total Balance is $ ${chalk.whiteBright.bold(
          this.balance
        )}`
      )
    );
    console.log(
      chalk.greenBright(
        "--------------------------------------------------------------------------------------"
      )
    );
  }
}

//creating customers class
class Customer {
  firstName: string;
  lastName: string;
  gender: string;
  age: number;
  mobileNumber: number;
  account: BankAccount;

  constructor(
    firstName: string,
    lastName: string,
    gender: string,
    age: number,
    mobileNumber: number,
    account: BankAccount
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.age = age;
    this.mobileNumber = mobileNumber;
    this.account = account;
  }
}

//creating bank acount

const accounts: BankAccount[] = [
  new BankAccount(151711, 500),
  new BankAccount(151712, 1100),
  new BankAccount(151713, 5000),
  new BankAccount(151714, 200),
  new BankAccount(151715, 2500),
];

//creating customers
const customers: Customer[] = [
  new Customer("Umar", "khan", "Male", 20, 3162030865, accounts[0]),
  new Customer("Alia", "khan", "Female", 23, 3231203086, accounts[1]),
  new Customer("Hamza", "khan", "Male", 26, 3452030665, accounts[2]),
  new Customer("Ismail", "khan", "Male", 36, 3163040670, accounts[3]),
  new Customer("Faiza", "khan", "Female", 43, 3452030804, accounts[4]),
];

//creting function to interact bank account

async function service() {
  do {
    const accountNumber = await inquirer.prompt({
      name: "accountNumber",
      type: "number",
      message: chalk.yellow.bold("ENTER YOUR 6 DIGIT BANK ACCOUNT NUMBER: "),
    });

    const customer = customers.find(
      (customer) =>
        customer.account.accountNumber === accountNumber.accountNumber
    );
    if (customer) {
      console.log(
        chalk.greenBright("----------------------------------------------")
      );
      console.log(
        chalk.greenBright.italic(
          `            WELCOME  ${chalk.yellowBright.bold(
            customer.firstName
          )} ${chalk.yellowBright.bold(customer.lastName)}`
        )
      );
      console.log(
        chalk.greenBright("----------------------------------------------")
      );
      const ans = await inquirer.prompt([
        {
          name: "select",
          type: "list",
          message: chalk.yellow.bold("SELECT AN OPERATION:"),
          choices: ["Deposit", "Withdraw", "Check Balance", "Exit"],
        },
      ]);

      switch (ans.select) {
        case "Deposit":
          const depositAmount = await inquirer.prompt({
            name: "amount",
            type: "number",
            message: chalk.yellow.italic(
              "Enter the amount you want to deposit:"
            ),
          });
          customer.account.deposit(depositAmount.amount);
          break;

        case "Withdraw":
          const withdrawAmount = await inquirer.prompt({
            name: "amount",
            type: "number",
            message: chalk.yellow.italic(
              "Enter the amount you want to Withraw:"
            ),
          });
          customer.account.withdraw(withdrawAmount.amount);
          break;

        case "Check Balance":
          customer.account.checkBalance();
          break;

        case "Exit":
          console.log(
            chalk.green("------------------------------------------")
          );
          console.log(chalk.green.bold("       EXITING BANK ACCOUNT "));
          console.log(
            chalk.green("------------------------------------------")
          );
          console.log(
            chalk.redBright.bold(
              "   \n     ===THANK'S FOR USING OUR BANK SERVICES=== "
            )
          );
          console.log(
            chalk.greenBright(
              "_____________________________________________________"
            )
          );
          return;
      }
    } else {
      console.log(chalk.green("------------------------------------------"));
      console.log(
        chalk.redBright.italic("       Enter correct account number")
      );
      console.log(chalk.green("------------------------------------------"));
    }
  } while (true);
}

service();

import Banking from "./Banking.js";

export default class Client {
  constructor(name) {
    console.log(`Bienvenue ${name} !`);
    this.name = name;

    this.banking = new Banking();
  }

  deposit(amount) {
    this.banking.depositMoney(amount);
  }

  withdraw(amount) {
    this.banking.withdrawMoney(amount);
  }
}

export default class Banking {
  constructor() {
    this.balance = 0;
    this.interestRates = 0.03;
    this.operations = [];
  }

  depositMoney(amount) {
    this.balance += amount;
    console.log(
      `Vous avez déposé ${amount}€. Nouveau solde : ${this.balance}€`
    );
    this.saveOperation("deposit", amount);
  }

  withdrawMoney(amount) {
    if (this.balance >= amount) {
      this.balance -= amount;
      console.log(
        `Vous avez retiré ${amount}€. Nouveau solde : ${this.balance}€`
      );
      this.saveOperation("withdrawal", amount);
    } else console.log("Solde insuffisant pour effectuer le retrait.");
  }

  calculateInterest() {
    this.balance += this.balance * this.interestRates;
    console.log(
      `Intérêts annuels de ${
        this.interestRates * 100
      }% ajoutés. Nouveau solde : ${this.balance}€`
    );
  }

  saveOperation(type, amount) {
    this.operations.push({
      type: type,
      amount: amount,
      date: new Date(),
    });
  }

  displayHistory() {
    this.operations.map((operation) =>
      console.log(
        operation.type === "deposit"
          ? `Dépôt de ${operation.amount}€ effectué le ${operation.date}`
          : `Retrait de ${operation.amount}€ effectué le ${operation.date}`
      )
    );
  }
}

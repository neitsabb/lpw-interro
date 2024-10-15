const interestRates = 0.03;
let balance = 1000;
let deposit = 200;
let withdrawal = 150;
const operations = [];

const depositMoney = (amount) => {
  balance += amount;
  console.log(`Vous avez déposé ${amount}€. Nouveau solde : ${balance}€`);
  operations.push({
    type: "deposit",
    amount: amount,
    date: new Date(),
  });
};

const withdrawMoney = (amount) => {
  if (balance >= amount) {
    balance -= amount;
    console.log(`Vous avez retiré ${amount}€. Nouveau solde : ${balance}€`);
    operations.push({
      type: "withdrawal",
      amount: amount,
      date: new Date(),
    });
  } else console.log("Solde insuffisant pour effectuer le retrait.");
};

const calculateInterest = () => {
  balance += balance * interestRates;
  console.log(
    `Intérêts annuels de ${
      interestRates * 100
    }% ajoutés. Nouveau solde : ${balance}€`
  );
};

// Money deposit
depositMoney(deposit);

// Money withdrawal
withdrawMoney(withdrawal);

// Interest calculation
calculateInterest();

// Simulation of several operations
let newDeposit = 500;
depositMoney(newDeposit);

let newWithDrawal = 800;
withdrawMoney(newWithDrawal);

calculateInterest();

// Operation history management
operations.map((operation) =>
  console.log(
    operation.type === "deposit"
      ? `Dépôt de ${operation.amount}€ effectué le ${operation.date}`
      : `Retrait de ${operation.amount}€ effectué le ${operation.date}`
  )
);

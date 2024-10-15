import Client from "./Client.js";

const customer = new Client("Bastien");

const solde = document.querySelector("#balance");

const links = document.querySelectorAll("[data-nav]");

const histories = document.querySelector("[data-history]");

links.forEach((link) => {
  link.addEventListener("click", () => {
    const target = link.getAttribute("data-nav");

    document.querySelectorAll("section").forEach((section) => {
      if (section.id !== "history") section.classList.add("hidden");
    });

    document.querySelector(`section#${target}`).classList.remove("hidden");

    document.querySelectorAll("input#amount").forEach((input) => {
      input.value = "";
    });
  });
});

const forms = document.querySelectorAll("form");

const classLists = {
  history: ["flex", "divide-x", "w-full", "[&>*]:w-full"],
  operation: ["py-2", "px-4", "block"],
};

forms.forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = form.querySelector("input");

    if (input.value === "")
      return displayError("Veuillez renseigner un montant.");

    const amount = parseInt(input.value);
    const action = form.id;

    try {
      switch (action) {
        case "deposit":
          customer.deposit(amount);
          break;
        case "withdrawal":
          customer.withdraw(amount);
          break;
        case "interest":
          customer.banking.calculateInterest();
          break;
      }
    } catch (error) {
      displayError(error.message);
    }

    input.value = "";

    solde.textContent = customer.banking.balance;

    histories.innerHTML = "";

    customer.banking.operations.map((operation) => {
      let history =
        operation.type === "deposit"
          ? document.querySelector("[data-history=deposit]")
          : document.querySelector("[data-history=withdrawal]");

      const div = document.createElement("div");
      div.classList.add(...classLists.history);

      const amountSpan = document.createElement("span");

      amountSpan.classList.add(...classLists.operation);
      amountSpan.textContent = `${operation.amount}€`;

      const dateSpan = document.createElement("span");
      dateSpan.classList.add(...classLists.operation);
      dateSpan.textContent = new Date(operation.date).toLocaleString();

      div.appendChild(amountSpan);
      div.appendChild(dateSpan);

      history.appendChild(div);
    });
  });
});

document
  .querySelector("#toggle-history")
  .addEventListener("click", () =>
    document.querySelector("#history").classList.toggle("hidden")
  );

const displayError = (message) => {
  console.error(message);
  const error = document.querySelector("#error");
  error.textContent = message;
  error.classList.remove("hidden");
  setTimeout(() => error.classList.add("hidden"), 3000);
};
// // Money deposit
// customer.deposit(200);

// // Money withdrawal
// customer.withdraw(150);

// // Interest calculation
// customer.banking.calculateInterest();

// const banking = new Banking();

// // Money deposit
// banking.depositMoney(200);

// // Money withdrawal
// banking.withdrawMoney(150);

// // Interest calculation
// banking.calculateInterest();

// // Display history
// banking.displayHistory();

// const interestRates = 0.03;
// let balance = 1000;
// let deposit = 200;
// let withdrawal = 150;
// const operations = [];

// const depositMoney = (amount) => {
//   balance += amount;
//   console.log(`Vous avez déposé ${amount}€. Nouveau solde : ${balance}€`);
//   operations.push({
//     type: "deposit",
//     amount: amount,
//     date: new Date(),
//   });
// };

// const withdrawMoney = (amount) => {
//   if (balance >= amount) {
//     balance -= amount;
//     console.log(`Vous avez retiré ${amount}€. Nouveau solde : ${balance}€`);
//     operations.push({
//       type: "withdrawal",
//       amount: amount,
//       date: new Date(),
//     });
//   } else console.log("Solde insuffisant pour effectuer le retrait.");
// };

// const calculateInterest = () => {
//   balance += balance * interestRates;
//   console.log(
//     `Intérêts annuels de ${
//       interestRates * 100
//     }% ajoutés. Nouveau solde : ${balance}€`
//   );
// };

// // Money deposit
// depositMoney(deposit);

// // Money withdrawal
// withdrawMoney(withdrawal);

// // Interest calculation
// calculateInterest();

// // Simulation of several operations
// let newDeposit = 500;
// depositMoney(newDeposit);

// let newWithDrawal = 800;
// withdrawMoney(newWithDrawal);

// calculateInterest();

// // Operation history management
// operations.map((operation) =>
//   console.log(
//     operation.type === "deposit"
//       ? `Dépôt de ${operation.amount}€ effectué le ${operation.date}`
//       : `Retrait de ${operation.amount}€ effectué le ${operation.date}`
//   )
// );

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

forms.forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const amount = parseInt(form.querySelector("input").value);
    const action = form.id;

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

    solde.textContent = customer.banking.balance;

    history.innerHTML = "";
    customer.banking.operations.map((operation) => {
      const li = document.createElement("li");
      li.textContent =
        operation.type === "deposit"
          ? `Dépôt de ${operation.amount}€ effectué le ${operation.date}`
          : `Retrait de ${operation.amount}€ effectué le ${operation.date}`;
      history.appendChild(li);
    });

    customer.banking.operations.map((operation) => {
      let history =
        operation.type === "withdrawal"
          ? document.querySelector("[data-history=withdrawal]")
          : document.querySelector("[data-history=deposit]");

      const div = document.createElement("div");
      div.classList.add("flex divide-x w-full [&>*]:w-full");

      const amountSpan = document.createElement("span");
      amountSpan.classList.add("py-2 px-4 block");
      amountSpan.textContent = operation.amount;

      const dateSpan = document.createElement("span");
      dateSpan.classList.add("py-2 px-4 block");
      dateSpan.textContent = operation.date;

      div.appendChild(amountSpan);
      div.appendChild(dateSpan);

      history.appendChild(div);
    });
  });
});

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

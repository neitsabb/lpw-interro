import Client from "./Client.js";

const customer = new Client("Bastien");

const solde = document.querySelector("#balance");

const links = document.querySelectorAll("[data-nav]");

const histories = document.querySelector("[data-history]");

let notificationTimeout;

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
  error: "bg-red-400",
  success: "bg-green-400",
};

const formatDate = (date) => {
  const daysOfWeek = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ];

  const dayOfWeek = daysOfWeek[date.getDay()];
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${dayOfWeek} ${day}/${month}/${year} à ${hours}:${minutes}`;
};

forms.forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = form.querySelector("input");

    if (input.value === "")
      return displayNotification("Veuillez renseigner un montant.", true);

    const amount = parseInt(input.value);
    const action = form.id;

    try {
      switch (action) {
        case "deposit":
          customer.deposit(amount);
          displayNotification("Dépôt effectué avec succès.");
          break;
        case "withdrawal":
          customer.withdraw(amount);
          displayNotification("Retrait effectué avec succès.");
          break;
        case "interest":
          customer.banking.calculateInterest();
          break;
      }
    } catch (error) {
      displayNotification(error.message, true);
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
      dateSpan.textContent = formatDate(operation.date);

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

const displayNotification = (message, isError = false) => {
  const notification = document.querySelector("#notification");

  if (notificationTimeout) {
    clearTimeout(notificationTimeout);
  }

  if (isError) {
    notification.classList.remove(classLists.success);
    notification.classList.add(classLists.error);
  } else {
    notification.classList.remove(classLists.error);
    notification.classList.add(classLists.success);
  }

  notification.textContent = message;
  notification.classList.remove("hidden");

  notificationTimeout = setTimeout(() => {
    notification.classList.add("hidden");
  }, 3000);
};

const getExchangeRate = async () => {
  try {
    const response = await fetch("https://happyapi.fr/api/devises");
    const {
      result: {
        result: { devises },
      },
    } = await response.json();
    console.log(devises);
  } catch (error) {
    console.error("Erreur lors de la récupération du taux de change :", error);
  }
};

getExchangeRate();
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

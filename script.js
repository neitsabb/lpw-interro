import Client from "./Client.js";

const customer = new Client("Bastien");
const solde = document.querySelector("#balance");
const links = document.querySelectorAll("[data-nav]");
const histories = document.querySelector("[data-history]");
let notificationTimeout;

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

const displayNotification = (message, isError = false) => {
  const notification = document.querySelector("#notification");

  if (notificationTimeout) clearTimeout(notificationTimeout);

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

links.forEach((link) => {
  link.addEventListener("click", () => {
    const target = link.getAttribute("data-nav");

    document.querySelectorAll("section").forEach((section) => {
      if (section.id !== "history") section.classList.add("hidden");
    });

    document.querySelector(`section#${target}`).classList.remove("hidden");
    document
      .querySelectorAll("input#amount")
      .forEach((input) => (input.value = ""));
  });
});

const updateHistory = () => {
  histories.innerHTML = "";
  customer.banking.operations.forEach((operation) => {
    const history = document.querySelector(`[data-history=${operation.type}]`);
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
};

const forms = document.querySelectorAll("form");

forms.forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = form.querySelector("input");

    if (!input.value) {
      return displayNotification("Veuillez renseigner un montant.", true);
    }

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
    updateHistory();
  });
});

document.querySelector("#toggle-history").addEventListener("click", () => {
  document.querySelector("#history").classList.toggle("hidden");
});

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

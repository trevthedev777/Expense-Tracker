// DOM elements 
const balance = document.getElementById("balance");
const moneyPlus = document.getElementById("money-plus");
const moneyMinus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

const dummyTransactions = [
    { id: 1, text: "flower", amount: -20 },
    { id: 2, text: "salary", amount: 300 },
    { id: 3, text: "book", amount: -10 },
    { id: 4, text: "camera", amount: 150 }
];

let transactions = dummyTransactions;


// Add Transaction
function addTransaction(e) {
    e.preventDefault();

    if (text.value.trim() === "" || amount.value.trim() === "") {
        alert("Please enter a text and/or amount value")
    } else {
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value
        }

        transactions.push(transaction);

        addTransactionDOM(transaction);

        updateValues();

        text.value = "";
        amount.value = "";
    }
};

// Generate Random ID
function generateID() {
    return Math.floor(Math.random() *  100000000 );
}

// Add transactions to DOM list
function addTransactionDOM(transaction) {
    // Get The Sign
    const sign = transaction.amount < 0 ? "-" : "+";

    const item = document.createElement("li");

    // Add class based on value
    item.classList.add(transaction.amount < 0 ? "minus" : "plus");

    item.innerHTML = `
    ${transaction.text} 
        <span>
            ${sign}${Math.abs(transaction.amount)}
        </span>
        <button class="delete-btn" onClick="removeTransaction(${transaction.id})">x</button>
    `

    list.appendChild(item);
};

// Updates the balance income and expense
function updateValues() {
    const amounts = transactions
                    .map(transaction => transaction.amount);
                    
    const total = amounts
                  .reduce((acc, item) => (acc += item), 0)
                  .toFixed(2);

    const income = amounts
                   .filter(item => item > 0)
                   .reduce((acc, item) => (acc += item), 0)
                   .toFixed(2);

    const expense = (amounts
                   .filter(item => item < 0)
                   .reduce((acc, item) => (acc += item), 0)
                   * -1)
                   .toFixed(2);

    
    balance.innerText = `$${total}`;
    moneyPlus.innerText = `$${income}`;
    moneyMinus.innerText = `$${expense}`;
};

// Remove transaction By ID
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);

    init();
}

// Init App
function init() {
    list.innerHTML = "";
    transactions.forEach(addTransactionDOM);
    updateValues();
}

init();


// Event Listeners
form.addEventListener("submit", addTransaction);
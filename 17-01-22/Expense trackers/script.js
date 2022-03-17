// Event Listeners
document.querySelector("#add-transaction").addEventListener('click',handleAddTransaction);


// Event handlers

function handleAddTransaction(event){
    event.preventDefault();
    const text = document.querySelector("#text");
    const amount = document.querySelector("#amount");
    
    if(amount == 0) return;

    if(Number(amount.value) >= 0) calculateIncome(amount.value);
    else calculateExpense(amount.value);

    localStorage.setItem(text.value,`${amount.value}`);
    text.value = "";
    amount.value = "";
    renderAll();
}


// Helpers
function calculateIncome(amount){
    const income = localStorage.getItem("income");
    const newIncome = Number(amount) + Number(income);
    localStorage.setItem("income",`${newIncome}`);
    const incomeDisplay = document.querySelector("#money-plus");
    incomeDisplay.textContent = `+$${newIncome}`;
    calculateBalance();
}

function calculateExpense(amount){
    const expense = localStorage.getItem("expense");
    const newExpense = Number(amount) + Number(expense);
    localStorage.setItem("expense",`${newExpense}`);
    const expenseDisplay = document.querySelector("#money-minus");
    expenseDisplay.textContent = `-$${Math.abs(newExpense)}`;
    calculateBalance()
}

function calculateBalance(){
    const balanceDisplay = document.querySelector("#balance");
    const income = localStorage.getItem("income");
    const expense = localStorage.getItem("expense");
    if(Math.abs(Number(income)) >= Math.abs(Number(expense))) balanceDisplay.textContent = `+$${Number(income) + Number(expense)}`;
    else balanceDisplay.textContent = `-$${Math.abs(Number(expense) + Number(income))}`;
    renderCards();
}


// Renderers
function renderCards(){
    const list = document.querySelector("#list");
    list.innerHTML = "";
    for(let i = 0;i<localStorage.length;i++){
        const key = localStorage.key(i);
        const amount = localStorage.getItem(key);
        if(key == 'income' || key == 'expense')continue;
        const li = document.createElement("li");
        li.textContent = `${key} - $${Math.abs(Number(amount))}`
        if(Number(amount) >= 0)li.setAttribute("class",'plus');
        else li.setAttribute("class",'minus');
        list.appendChild(li);
    }
}

function renderAll(){
    calculateIncome(0);
    calculateExpense(0);
    calculateBalance();
    renderCards();
}

renderAll();
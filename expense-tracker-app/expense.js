document.addEventListener("DOMContentLoaded", () => {

  const expenseName = document.getElementById("expense-name");
  const expenseAmount = document.getElementById("expense-amount");
  const addButton = document.getElementById("add-btn");
  const expenseList = document.getElementById("expense-items");
  const totalAmount = document.getElementById("total-amount");

  let expenses = localStorage.getItem("expenses") ? JSON.parse(localStorage.getItem("expenses")) : [];

  renderExpenses();

  // doesn't works when the dom loads again
  // function outer(){
  //   let counter = 0;
  //   return function inner() {
  //     return counter++;
  //   };
  // }
  // const getNewId = outer();

  addButton.addEventListener("click", () => {
    console.log("clicked");
    const id = Date.now();
    console.log(id);
    const task = expenseName.value.trim();
    const amount = parseInt(expenseAmount.value);
    if (task === "" || isNaN(amount) || amount <= 0) return;

    expenses.push({id: id, task : task, amount : amount});
    localStorage.setItem("expenses",JSON.stringify(expenses));

    expenseName.value = "";
    expenseAmount.value = "";
    renderExpenses();
  })

  function renderExpenses(){
    // if(expenses.length === 0) return;
    let total = 0;
    expenseList.innerHTML = "";
    expenses.forEach(element => {
      const item = document.createElement('div');
      item.innerHTML = `
      <div class="flex justify-between items-center bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg p-2">
        <span class="p-2">${element.task} - $${element.amount}</span>
        <button data-id="${element.id}" type="submit" class="bg-red-500 hover:bg-red-700 text-white p-2 rounded">Delete</button>
      </div>
      `
      expenseList.appendChild(item);
      total += element.amount;
    });
    totalAmount.innerText = total;
  }

  expenseList.addEventListener("click", (e) => {
    if(e.target.tagName === 'BUTTON'){
      const id = parseInt(e.target.getAttribute('data-id'));
      console.log(typeof id)
      console.log(typeof expenses[0].id)
      expenses = expenses.filter( expense => expense.id !== id)
      localStorage.setItem("expenses", JSON.stringify(expenses));
      renderExpenses();
    }
  })
});
class Gastos {
  constructor (id, nombre, valor){
    this.id = id;
    this.nombre = nombre;
    this.valor = valor;
  }     
}

// traigo los elementos del documento html
let budgetForm = document.getElementById("budget-form");
let budgetInput = document.getElementById("budget-input");
let budgetFeedback = document.querySelector(".budget-feedback");
let expenseFeedback = document.querySelector(".expense-feedback");

let budgetAmount = document.getElementById("budget-amount");
let expenseAmount = document.getElementById("expense-amount");
let balanceAmount = document.getElementById("balance-amount");

let expenseForm = document.getElementById("expense-form");
let expenseInput = document.getElementById("expense-input");
let amountInput = document.getElementById("amount-input");

let expenseList = document.getElementById("expense-list");
let balance = document.getElementById("balance");

//defino variables
let itemID = 0;
let listaGastos = JSON.parse(localStorage.getItem('listaGastos'));
if(!listaGastos) {
    listaGastos = []
};

let init = () => {
  if(listaGastos){
    for(const gasto of listaGastos){
      addExpense(gasto);
      itemID ++;
      const totalGastos = getTotalGastos(listaGastos);
      showBalance();
    }
  }  
}
// función para obtener el total de gastos del localStorage
let getTotalGastos = (listaGastos) => {
  let totalGastos = 0;
  if(listaGastos){ 
    for(let i = 0; i < listaGastos.length; i++){
      totalGastos = listaGastos.reduce(function(acc, curr){
        acc += curr.valor;
        return acc;
      }, 0)
    }
  }
  expenseAmount.textContent = totalGastos;
  return totalGastos;
}

// función para mostrar el balance
let showBalance = () => {
  const totalGastos = getTotalGastos(listaGastos);
  const total = parseInt(budgetAmount.textContent) - totalGastos;
  balanceAmount.textContent = total;
  if (total < 0 ){
    balance.classList.remove("showGreen", "showBlack");
    balance.classList.add("showRed");
  }
  else if (total > 0 ){
    balance.classList.remove("showRed", "showBlack");
    balance.classList.add("showGreen");
  }
  else if (total === 0 ){
    balance.classList.remove("showRed", "showGreen");
    balance.classList.add("showBlack");
  }
}

// función para agregar la lista de gastos en pantalla
let addExpense = (gasto) => {
  const div = document.createElement('div');
  div.classList.add('expense');
  div.innerHTML = `
  <div class="expense-item d-flex justify-content-between align-items-baseline">
         <h6 class="expense-title mb-0 text-uppercase list-item">- ${gasto .nombre}</h6>
         <h5 class="expense-amount mb-0 list-item">${gasto .valor}</h5>
         <div class="expense-icons list-item">
          <a href="#" class="edit-icon mx-2" data-id="${gasto .id}">
           <i class="fas fa-edit"></i>
          </a>
          <a href="#" class="delete-icon" data-id="${gasto .id}">
           <i class="fas fa-trash"></i>
          </a>
         </div>
        </div>
  `
  expenseList.appendChild(div);
}

// función para editar elemento de la lista de gastos
let editExpense = (element) => {

}

// función para eliminar un elemento de la lista de gastos
let deleteExpense = (element) => {
  
}

//event listener del Form de presupuesto
budgetForm.addEventListener('submit', ( event ) => {
  event.preventDefault();

  //corroboro que el valor no esté vacío o sea menor que 0
  const valor = parseInt(budgetInput.value);
  if(valor === '' || valor < 0 || !valor){
    budgetFeedback.classList.add("showItem");
    budgetFeedback.innerHTML = `<p>El valor no puede estar vacío o ser negativo</p>`;
    setTimeout(function(){
      budgetFeedback.classList.remove("showItem");
    }, 4000)
  } else {

  let totalGastos = getTotalGastos(listaGastos);
  if(!totalGastos){totalGastos = 0};
  
  budgetAmount.innerHTML = valor;
  // balanceAmount.innerHTML = valor - totalGastos;
  budgetInput.value = '';
  showBalance();

  }
})

// event listener del Form de Gastos
expenseForm.addEventListener('submit', ( event ) => {
  event.preventDefault();

  //Corroboro que los valores no estén vacíos
  const nombre = expenseInput.value;
  const valor = parseInt(amountInput.value);
  if(nombre === "" || !nombre || valor === "" || valor < 0 || !valor){
    expenseFeedback.classList.add("showItem");
    expenseFeedback.innerHTML = `<p>Los valores no pueden estar vacíos o ser negativos</p>`;
    setTimeout(function(){
      expenseFeedback.classList.remove("showItem");
    }, 4000)
  } else {

  // creo el gasto, lo incluyo en el array y lo meto en el localStorage
  let gasto = new Gastos(itemID, nombre, valor);
  itemID++;
  listaGastos.push(gasto);
  localStorage.setItem("listaGastos", JSON.stringify(listaGastos));

  // let totalGastos = getTotalGastos(listaGastos);
  // expenseAmount.innerHTML = totalGastos;

  getTotalGastos(listaGastos);
  
  // balanceAmount.innerHTML = parseInt(budgetAmount.innerHTML) - totalGastos;
  addExpense(gasto);
  showBalance();

  expenseInput.value = '';
  amountInput.value = '';

}
}
)

// event listener de la lista de gastos
expenseList.addEventListener('click', function(event){
    if(event.target.parentElement.classList.contains('edit-icon')){
      editExpense(event.target.parentElement);
    }
    else if(event.target.parentElement.classList.contains('delete-icon')){
      deleteExpense(event.target.parentElement);
    }
})


init();

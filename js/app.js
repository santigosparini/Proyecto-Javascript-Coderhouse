class Gastos {
  constructor (nombre, valor){
    this.nombre = nombre;
    this.valor = valor;
  }     
}

/*
class Presupuestos {
  constructor (nombre, valor){
    this.nombre = nombre;
    this.valor = valor;
  }     
}
*/

/*
function cuantosPresupuestos(){
  cantidadPresupuestos = parseInt(prompt('Cuántos presupuestos desea calcular?'))
}
function solicitarDatos (i){
  let presupuesto = new Presupuestos ('Presupuesto '+ (i),0)
  presupuesto.valor = parseInt(prompt('Ingrese su presupuesto ' + (i+1)))
  listaPresupuestos.push(presupuesto)
  cantidadGastos = parseInt(prompt('Indique la cantidad de gastos que sumará'))
  
  for(let i=0; i<cantidadGastos; i++){
    let gasto = new Gastos (prompt('Ingrese el nombre de su gasto ' + (i+1)), parseInt(prompt('Ingrese el valor de su gasto ' + (i+1))))
    listaGastos.push(gasto)
}
}
function calcularPresupuesto(listaGastos, listaPresupuestos, i){
    let totalGastos = 0
    for(let i=0; i<listaGastos.length; i++){
      totalGastos += listaGastos[i].valor
    }
    if (totalGastos > listaPresupuestos[i].valor){
      alert ('El gasto total no puede ser mayor que el presupuesto')
    }else{
      let balance = listaPresupuestos[i].valor - totalGastos
      alert ('Su balance es de ' + balance)
    }
}
*/

// let listaPresupuestos = []
// let totalGastos = 0

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


//defino variables
let listaGastos = JSON.parse(localStorage.getItem('listaGastos'));
if(!listaGastos) {
    listaGastos = []
};

// función para obtener el total de gastos del localStorage
let getTotalGastos = (listaGastos) => {
  let totalGastos = 0;
  if(listaGastos){ 
    for(let i = 0; i < listaGastos.length; i++){
      totalGastos += parseInt(listaGastos[i].valor);
    }
  }
  return totalGastos;
}

//agrego los eventListeners
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
  balanceAmount.innerHTML = valor - totalGastos;
  budgetInput.value = '';
  }
})

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
  let gasto = new Gastos(nombre, valor);
  listaGastos.push(gasto);
  localStorage.setItem("listaGastos", JSON.stringify(listaGastos))

  let totalGastos = getTotalGastos(listaGastos);

  expenseAmount.innerHTML = totalGastos;
  
  balanceAmount.innerHTML = parseInt(budgetAmount.innerHTML) - totalGastos;

  expenseInput.value = '';
  amountInput.value = '';

}
}
)

/*
cuantosPresupuestos();
for(let i=0; i<cantidadPresupuestos;i++){
  solicitarDatos(i);
  calcularPresupuesto(listaGastos, listaPresupuestos, i);
  listaGastos.splice(0, listaGastos.length)
}

*/


let totalGastos = 0
let presupuesto = 0
let cantidadGastos = 0

function solicitarDatos (){
  presupuesto = parseInt(prompt('Ingrese su presupuesto'))
  cantidadGastos = parseInt(prompt('Indique la cantidad de gastos que sumará'))
  
  for(let i=0; i<cantidadGastos; i++){
    let gasto = parseInt(prompt('Ingrese el valor de su gasto ' + parseInt(i+1)))
    totalGastos = totalGastos + gasto
}
}
function calcularPresupuesto(totalGastos, presupuesto){
    if (totalGastos > presupuesto){
      alert ('El gasto total no puede ser mayor que el presupuesto')
    } else{
      let balance = presupuesto - totalGastos
      alert ('Su balance es de ' + balance)
    }
}

solicitarDatos();
calcularPresupuesto(totalGastos, presupuesto);

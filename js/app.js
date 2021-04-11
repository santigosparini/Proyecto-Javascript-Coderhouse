class Gastos {
  constructor (nombre, valor){
    this.nombre = nombre;
    this.valor = valor;
  }     
}

let listaGastos = []
let presupuesto = 0
let cantidadGastos = 0

function solicitarDatos (){
  presupuesto = parseInt(prompt('Ingrese su presupuesto'))
  cantidadGastos = parseInt(prompt('Indique la cantidad de gastos que sumará'))
  
  for(let i=0; i<cantidadGastos; i++){
    let gasto = new Gastos (prompt('Ingrese el nombre de su gasto ' + (i+1)), parseInt(prompt('Ingrese el valor de su gasto ' + (i+1))))
    listaGastos.push(gasto)
}
}
function calcularPresupuesto(listaGastos, presupuesto){
    let totalGastos = 0
    for(let i=0; i<listaGastos.length; i++){
      totalGastos += listaGastos[i].valor
    }
    if (totalGastos > presupuesto){
      alert ('El gasto total no puede ser mayor que el presupuesto')
    } else{
      let balance = presupuesto - totalGastos
      alert ('Su balance es de ' + balance)
    }
}

solicitarDatos();
calcularPresupuesto(listaGastos, presupuesto);

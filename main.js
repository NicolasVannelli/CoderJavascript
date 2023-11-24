// Que tengo que hacer
//Agregar Pacientes  *
//Mostrar Pacientes  *
//Eliminar Pacientes *
//Agregar un cambio de datos de pacientes por algun error con el metodo splice



const Paciente = function (nombre, edad, sangre) {
    this.nombre = nombre
    this.edad = edad
    this.sangre = sangre
}

let pacientes = []


function inicilizar() {
    let ejecutar = confirm("¿Quiere utilizar esta aplicación?")
    while (ejecutar) {
        let options = prompt("A para agregar paciente, B para buscar paciente, Q para quitar paciente, M para mostrar pacientes y S para salir").toUpperCase()
        //Esto seria el menú de opciones, a medida que se agregen mas puedo poner otro case 
        switch (options) {
            case "A":
                AgregarPaciente()
                ejecutar=confirm("¿Desea seguir utilizando la aplicación?")
                if(ejecutar===false){
                    alert("Saliendo, gracias por utilizar nuestra aplicación")
                }
                break
            case "B":
                Filtrar()
                ejecutar=confirm("¿Desea seguir utilizando la aplicación?")
                if(ejecutar===false){
                    alert("Saliendo, gracias por utilizar nuestra aplicación")
                }
                break
            case "Q":
                EliminarPaciente()
                ejecutar=confirm("¿Desea seguir utilizando la aplicación?")
                if(ejecutar===false){
                    alert("Saliendo, gracias por utilizar nuestra aplicación")
                }
                break
            case "S":
                alert("Saliendo, gracias por utilizar nuestra aplicación")
                ejecutar = false
                break
            case "M":
                console.table(pacientes)
                ejecutar=confirm("¿Desea seguir utilizando la aplicación?")
                if(ejecutar===false){
                    alert("Saliendo, gracias por utilizar nuestra aplicación")
                }
                break
            default:
                alert("Opción invalida")

        }
    }
}
function AgregarPaciente() {
    let nombre = prompt("Ingrese el nombre de la persona").toUpperCase()
    let edad = prompt("¿Cuál es su edad?")
    let sangre = prompt("¿Cuál es el tipo de sangre?").toUpperCase()
    let add = new Paciente(nombre, edad, sangre)
    pacientes.push(add)
    alert("¡Los datos han sido ingresados con éxito!")
    console.table(pacientes)
}
function Filtrar(){
    let filtrado = prompt("¿Que datos estás buscando?").toLowerCase()
    switch (filtrado){
        case "sangre":
            let resultadosangre = pacientes.filter((x) => x.sangre.toLowerCase().includes(filtrado))
            console.table(resultadosangre)
            break
        case "nombre":
            let resultadonombre = pacientes.filter((x) => x.nombre.toLowerCase().includes(filtrado))
            console.table(resultadonombre)
            break
        case "edad":
            let resultadoedad = pacientes.filter((x) => x.edad.toLowerCase().includes(filtrado))
            console.table(resultadoedad)
            break
        default:
            alert("Opción invalida")
    }

}
function EliminarPaciente(){
    let buscar = prompt("¿A quién quiere eliminar?").toUpperCase()
    let resultado= pacientes.filter((x) => x.nombre.toUpperCase().includes(buscar))
    if (resultado.length > 0) {
                    //Esto es para obtener el primer indice que coincida con la busqueda
        let pacienteAEliminar = pacientes.indexOf(resultado[0])

        if (pacienteAEliminar !== -1) {
            //Aca utilizo el splice para eliminar el indice anteriormente obtenido,el 1 significa la cantidad de elementos a eliminar
            pacientes.splice(pacienteAEliminar, 1)
            console.table(pacientes)
        } else {
            console.log("Paciente no encontrado en la lista.")
        }
    }
}

inicilizar()

// Que tengo que hacer
//Agregar Tareas
//Mostrar Tareas
//Eliminar Tareas
//Mostrar tareas como completadas


const Paciente = function (nombre, edad, sangre) {
    this.nombre = nombre
    this.edad = edad
    this.sangre = sangre
}

let pacientes = []


function inicilizar() {
    let ejecutar = confirm("¿Quiere utilizar esta aplicación?")
    while (ejecutar) {
        let options = prompt("A para agregar paciente,B para buscar paciente,Q para quitar paciente y S para salir").toUpperCase()
        switch (options) {
            case "A":
                AgregarPaciente()
                break
            case "B":
                Filtrar()
                break
            case "Q":
                alert("Funcion en desarrollo")
                break
            case "S":
                alert("Saliendo, gracias por utilizar nuestra aplicación")
                ejecutar = false
                break
            default:
                alert("Opción invalida")

        }
    }
}
function AgregarPaciente() {
    let nombre = prompt("Ingrese el nombre de la persona")
    let edad = prompt("¿Cuál es su edad?")
    let sangre = prompt("¿Cuál es el tipo de sangre?")
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

inicilizar()

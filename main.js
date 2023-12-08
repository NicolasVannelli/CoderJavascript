const Paciente = function(Nombre,Apellido,DNI){
    this.nombre = Nombre
    this.apellido = Apellido
    this.dni = DNI
}
let boludo1 = new Paciente("Nicolas","Vannelli",123)
let pacientes = [boludo1]

if (localStorage.getItem("paciente")){
    pacientes = JSON.parse(localStorage.getItem("paciente"))
}else{
    pacientes = pacientes
}

function FiltrarPaciente(){
    const body = document.querySelector("body")
    const input = document.getElementById("ValorDNI").value
    const palabraClave = input
    const filtrado = pacientes.filter((paciente)=>paciente.nombre.includes(palabraClave))
    if (filtrado.length > 0){
        const container = document.getElementById("fila")
        filtrado.forEach((paciente)=>{
            const card = document.createElement("tr")
        
            const nombre = document.createElement("td")
        nombre.textContent = paciente.nombre
        card.appendChild(nombre)
        
        const apellido = document.createElement("td")
        apellido.textContent = paciente.apellido
        card.appendChild(apellido)

        const dni = document.createElement("td")
        dni.textContent = paciente.dni
        card.appendChild(dni)

        container.appendChild(card)
        })

    }else{
        alert("No hay")
    }
}

const BotonFiltrar = document.getElementById("FiltrarPaciente")
BotonFiltrar.addEventListener("click",FiltrarPaciente)

const Paciente = function(Nombre,Apellido,DNI,Fecha){
    this.nombre = Nombre
    this.apellido = Apellido
    this.dni = DNI
    this.fecha=Fecha
}

let pacientes = []

if (localStorage.getItem("pacientes")){
    pacientes = JSON.parse(localStorage.getItem("pacientes"))
}else{
    pacientes = pacientes
}

let pagina = document.body.innerHTML

function MostrarPaciente(){
    const container = document.getElementById("fila")
    pacientes.forEach((paciente)=>{
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

    const fecha = document.createElement("td")
    fecha.textContent = paciente.fecha
    card.appendChild(fecha)

    container.appendChild(card)
})
}


function FiltrarPaciente(){
    const input = document.getElementById("ValorDNI").value
    const palabraClave = input
    const filtrado = pacientes.filter((paciente)=>paciente.dni.includes(palabraClave))
    if (filtrado.length > 0){
        const container = document.getElementById("fila")
        container.innerHTML=""
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

        const fecha = document.createElement("td")
        fecha.textContent = paciente.fecha
        card.appendChild(fecha)

        container.appendChild(card)
        })

    }else{
        alert("El paciente no existe")
    }
}

function AgregarPaciente(){
    const body = document.getElementById("body")
    while (document.body.firstChild){
        document.body.removeChild(document.body.firstChild)
    }
    const form = document.createElement("form")
    form.innerHTML=`<div class="datos">
    <input id= "nombre-input" type="text" placeholder="Ingrese el nombre" required>
    
    <input id= "apellido-input" type="text" placeholder="Ingrese el apellido" required>
    
    <input id= "dni-input" type="text" placeholder="Ingrese el DNI" required>
    
    <input id= "fecha-input" type="date" required><br>
    </div>
    <div class="botones"><button type="submit">Agregar</button></div>
    `
    
    form.addEventListener("submit", function(e){
        e.preventDefault();
        const nombreInput = document.getElementById("nombre-input").value.trim()
        const apellidoInput = document.getElementById("apellido-input").value.trim()
        const dniInput = document.getElementById("dni-input").value.trim()
        const fechaInput =document.getElementById("fecha-input").value
      
        const paciente = new Paciente(nombreInput, apellidoInput, dniInput, fechaInput)

        if (pacientes.some( (x)=> x.dni===paciente.dni)){
        alert("El paciente ya existe")
        return
        }

        pacientes.push(paciente)

        localStorage.setItem("pacientes", JSON.stringify(pacientes))

        alert(`se agregó el paciente ${paciente.nombre} a la lista`)
        document.body.innerHTML=pagina 
        
        Eventos()
    })

    body.appendChild(form)

}

function EliminarPaciente() {
    const form = document.createElement("form");
    form.innerHTML = `
    <input id= "nombre-entrada" type="text" placeholder="Ingrese el nombre" required>
    
    <input id= "apellido-entrada" type="text" placeholder="Ingrese el apellido" required>
    
    <input id= "dni-entrada" type="text" placeholder="Ingrese el DNI" required><br>
    
    <div class="botones"><button type="submit">Eliminar</button></div>`

    form.addEventListener("submit", function (e) {
        e.preventDefault()
        const nombreEntrada = document.getElementById("nombre-entrada").value.trim()
        const apellidoEntrada = document.getElementById("apellido-entrada").value.trim()
        const dniEntrada = document.getElementById("dni-entrada").value.trim()

        if (nombreEntrada === "" || apellidoEntrada === "" || isNaN(dniEntrada)) {
            alert("Ingrese los datos")
            return;
        }

        const PacienteEliminado = new Paciente(nombreEntrada, apellidoEntrada, dniEntrada)
        
        let resultado = pacientes.find((x) => x.dni === PacienteEliminado.dni)

        if (resultado) {
            
            let indiceAEliminar = pacientes.indexOf(resultado)
            pacientes.splice(indiceAEliminar, 1)
            alert("Paciente eliminado")
        } else {
            alert("Paciente no encontrado")
        }
    })

    const body = document.querySelector("body");
    body.appendChild(form);
}

function Eventos(){
    const BotonFiltrar = document.getElementById("FiltrarPaciente")
    BotonFiltrar.addEventListener("click",()=>{FiltrarPaciente()})

    const BotonAgregar = document.getElementById("AgregarPaciente")
    BotonAgregar.addEventListener("click",()=>{AgregarPaciente()})

    const BotonEliminar = document.getElementById("EliminarPaciente")
    BotonEliminar.addEventListener("click",()=>{EliminarPaciente()})

    const BotonMostrar = document.getElementById("MostrarPaciente")
    BotonMostrar.addEventListener("click",()=>{MostrarPaciente()})
}


Eventos()
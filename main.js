const Paciente = function(Nombre,Apellido,DNI,Fecha){
    this.nombre = Nombre
    this.apellido = Apellido
    this.dni = DNI
    this.fecha=Fecha
}
let boludo1 = new Paciente("Nicolas","Vannelli","321","13/01/2001")
let boludo3 = new Paciente("Mercedes","Rodriguez","456","5/11/1997")
let boludo2 = new Paciente("Gino","Vannelli","789","21/11/2012")
let boludo4 = new Paciente("Celina","Vannelli","123","01/01/1999")

let pacientes = [boludo1,boludo2,boludo3,boludo4]

if (localStorage.getItem("paciente")){
    pacientes = JSON.parse(localStorage.getItem("paciente"))
}else{
    pacientes = pacientes
}

function FiltrarPaciente(){
    const input = document.getElementById("ValorDNI").value
    const palabraClave = input
    const filtrado = pacientes.filter((paciente)=>paciente.dni.includes(palabraClave))
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

    const form = document.createElement("form")
    form.innerHTML=`
    <label for ="nombre-input">Nombre:</label>
    <input id= "nombre-input" type="text" required>
    
    <label for ="apellido-input">Apellido:</label>
    <input id= "apellido-input" type="text" required>
    
    <label for ="dni-input">DNI:</label>
    <input id= "dni-input" type="text" required>
    
    <label for ="fecha-input">Fecha de nacimiento:</label>
    <input id= "fecha-input" type="date" required>
    
    <button type="submit">Agregar</button>`
    
    form.addEventListener("submit", function(e){
        e.preventDefault();
        const nombreInput = document.getElementById("nombre-input").value.trim()
        const apellidoInput = document.getElementById("apellido-input").value.trim()
        const dniInput = document.getElementById("dni-input").value.trim()
        const fechaInput = parseInt(document.getElementById("fecha-input").value)

        if(nombreInput === "" || apellidoInput === "" || isNaN(dniInput) || isNaN(fechaInput) ){
            alert("Ingrese los datos")
            return
        }

        const paciente = new Paciente(nombreInput, apellidoInput, dniInput, fechaInput)

        if (pacientes.some( (x)=> x.nombre===paciente.nombre)){
        alert("El paciente ya existe")
        return
        }

        pacientes.push(paciente)

        localStorage.setItem("pacientes", JSON.stringify(pacientes))

        alert(`se agregó el paciente ${paciente.nombre} a la lista`)

        const container = document.createElement("div")
        
       pacientes.forEach((x)=>{
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
        const body = document.querySelector("body")
        body.appendChild(container)
        
        form.reset()
    })
    const body = document.querySelector("body")
    body.appendChild(form)
}

const BotonFiltrar = document.getElementById("FiltrarPaciente")
BotonFiltrar.addEventListener("click",()=>{FiltrarPaciente()})

const BotonAgregar = document.getElementById("AgregarPaciente")
BotonAgregar.addEventListener("click",()=>{AgregarPaciente()})

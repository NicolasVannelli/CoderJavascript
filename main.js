const Paciente = function(Nombre,Apellido,DNI,Fecha){
    this.nombre = Nombre
    this.apellido = Apellido
    this.dni = DNI
    this.fecha=Fecha
    }
const pacientes = []
const pacienteLocalStorage = localStorage.getItem("pacientes") ? JSON.parse(localStorage.getItem("pacientes")) : []
const pagina = document.body.innerHTML
const BotonFiltrar = document.getElementById("FiltrarPaciente")
const BotonAgregar = document.getElementById("AgregarPaciente")
const BotonEliminar = document.getElementById("EliminarPaciente")
const BotonMostrar = document.getElementById("MostrarPaciente")
let lat
let lon
if (pacienteLocalStorage) pacientes.push(...pacienteLocalStorage)

function mostrarPaciente() {
    const container = document.getElementById("fila")

    container.innerHTML = ""
    pacientes.forEach((paciente) => {
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

        console.log(card)
        container.appendChild(card)
    })
}


function filtrarPaciente() {

    const input = document.getElementById("ValorDNI").value
    const palabraClave = input
    const filtrado = pacientes.filter((paciente) => paciente.dni.toString().includes(palabraClave))
    if (filtrado.length > 0) {
        const container = document.getElementById("fila")
        container.innerHTML = ""
        filtrado.forEach((paciente) => {
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

    } else {
        Toastify({
            text: "Error, paciente no encontrado",
            duration: 2000,
            close: false,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
                background: "linear-gradient(to right, #b30000, #ff4d4f)",
            },
            onClick: function () { }
        }).showToast();
    }
}

function agregarPaciente() {
    const body = document.getElementById("body")
    while (document.body.firstChild) {
        document.body.removeChild(document.body.firstChild)
    }
    const form = document.createElement("form")
    form.innerHTML = `<div class="datos">
    <input id= "nombre-input" type="text" placeholder="Ingrese el nombre" required>
    
    <input id= "apellido-input" type="text" placeholder="Ingrese el apellido" required>
    
    <input id= "dni-input" type="text" placeholder="Ingrese el DNI" required>
    
    <input id= "fecha-input" type="date" required><br>
    </div>
    <div class="botones"><button type="submit">Agregar</button></div>
    `

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const nombreInput = document.getElementById("nombre-input").value.trim()
        const apellidoInput = document.getElementById("apellido-input").value.trim()
        const dniInput = document.getElementById("dni-input").value.trim()
        const fechaInput = document.getElementById("fecha-input").value

        const paciente = new Paciente(nombreInput, apellidoInput, dniInput, fechaInput)
        if(nombreInput=="" || apellidoInput=="" || isNaN(dniInput)){
            Toastify({
                text: "Ingrese los datos",
                duration: 2000,
                close: false,
                gravity: "top",
                position: "right",
                stopOnFocus: true,
                style: {
                    background: "linear-gradient(to right, #b30000, #ff4d4f)",
                },
                onClick: function () { }
            }).showToast();
            return
        }
        if (pacientes.some((x) => x.dni === paciente.dni)) {
            Toastify({
                text: "El paciente ya existe",
                duration: 2000,
                close: false,
                gravity: "top",
                position: "right",
                stopOnFocus: true,
                style: {
                    background: "linear-gradient(to right, #b30000, #ff4d4f)",
                },
                onClick: function () { }
            }).showToast();
            return
        }

        pacientes.push(paciente)

        localStorage.setItem("pacientes", JSON.stringify(pacientes))

        Toastify({
            text: "El paciente fue agregado",
            duration: 2000,
            close: false,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
                background: "linear-gradient(to right, #b30000, #ff4d4f)",
            },
            onClick: function () { }
        }).showToast();
        document.body.innerHTML = pagina

    })

    body.appendChild(form)
    mostrarPaciente()

}

function eliminarPaciente() {
    const recursos = document.getElementById("recursos")

    recursos.innerHTML = ""
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
            Toastify({
                text: "Ingrese los datos",
                duration: 2000,
                close: false,
                gravity: "top",
                position: "right",
                stopOnFocus: true,
                style: {
                    background: "linear-gradient(to right, #b30000, #ff4d4f)",
                },
                onClick: function () { }
            }).showToast();
            return;
        }
        const PacienteEliminado = new Paciente(nombreEntrada, apellidoEntrada, dniEntrada)

        let resultado = pacientes.find((x) => x.dni === PacienteEliminado.dni)

        if (resultado) {
            let indiceAEliminar = pacientes.indexOf(resultado)
            pacientes.splice(indiceAEliminar, 1)
            localStorage.setItem("pacientes", JSON.stringify(pacientes))
            mostrarPaciente()
        } else {
            Toastify({
                text: "Error, paciente no encontrado",
                duration: 2000,
                close: false,
                gravity: "top",
                position: "right",
                stopOnFocus: true,
                style: {
                    background: "linear-gradient(to right, #b30000, #ff4d4f)",
                },
                onClick: function () { }
            }).showToast();
        }
    })

    recursos.appendChild(form);
}


document.addEventListener('click', (e) => {
    console.dir(e.target)
    if (e.target.matches('#FiltrarPaciente')) {
        filtrarPaciente()
    }
    if (e.target.matches('#AgregarPaciente')) {
        agregarPaciente()
    }
    if (e.target.matches('#EliminarPaciente')) {
        eliminarPaciente()
    }
    if (e.target.matches('#MostrarPaciente')) {
        mostrarPaciente()
    }
})

function obtenerUbicacion() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    });
}

async function obtenerDatosClima() {
    try {
        // Obtener la posición del usuario
        const posicion = await obtenerUbicacion()

        // Extraer latitud y longitud
        const lat = posicion.coords.latitude
        const lon = posicion.coords.longitude

        const apiKey = '024c07d37ba53dbc2723469c16f2d169'

        // Construir la URL de la API del clima
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`

        // Hacer la solicitud a la API con fetch
        const respuesta = await fetch(url)

        // Verificar si la solicitud fue exitosa
        if (!respuesta.ok) {
            throw new Error('Error al obtener datos del clima')
        }
        // Convertir la respuesta a formato JSON
         const data = await respuesta.json()
        //Para redondear la temperatura y no nos de un numero con coma
        let temp = Math.round(data.main.temp)
        //Obtener los datos e imprimirlos en pantalla
        temperatura.textContent = `${temp} ° C`
        ciudad.textContent = data.name
        viento.textContent = `Viento:${data.wind.speed} m/s`


        //Aqui para cambiar el icono dependiendo del clima
        switch (data.weather[0].main) {
            case 'Thunderstorm':
                icono.src = './assets/iconos/thunder.svg'
                break;
            case 'Drizzle':
                iconoAnimado.src = './assets/iconos/rainy-2.svg'
                break;
            case 'Rain':
                icono.src = './assets/iconos/rainy-7.svg'
                break;
            case 'Snow':
                icono.src = './assets/iconos/snowy-6.svg'
                break;
            case 'Clear':
                icono.src = './assets/iconos/day.svg'
                break;
            case 'Atmosphere':
                icono.src = './assets/iconos/weather.svg'
                break;
            case 'Clouds':
                icono.src = './assets/iconos/cloudy-day-1.svg'
                break;
            default:
                icono.src = './assets/iconos/cloudy-day-1.svg'
        }
    } catch (error) {
        console.error('Error:', error.message)
    }
}



async function traerData() {
    const response = await fetch('./pacientes.json')
    const data = await response.json()
    pacientes.push(...data)
}

traerData()
obtenerDatosClima()
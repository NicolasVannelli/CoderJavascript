let respuesta = document.getElementById("ValorPacientes")

let boton = document.getElementById("AgregarPaciente")

let resultado = document.getElementById("resultado")

window.onload = function(){
    let ValorGuardado = localStorage.getItem("PacienteGuardado")

    if (ValorGuardado) {
        ListaPacientes = JSON.parse(ValorGuardado);
        MostrarPacientes();
    }
}

boton.addEventListener("click",function(){
    let valorinput = respuesta.value;
    
    // Verificamos si la tarea ya existe en la lista
    if (!existeTareaEnLista(valorinput)) {
        // Si no existe, creamos un objeto tarea
        let pacientes = {
            tarea: valorinput,
            fecha: new Date().toLocaleString()
        };

        // Agregamos la tarea al array ListaTareas
        ListaPacientes.push(pacientes);

        // Mostramos y almacenamos las tareas
        MostrarPacientes();
        guardarEnLocalStorage();
    } else {
        alert("La tarea ya existe en la lista.");
    }

    resultado.innerHTML = `Paciente: ${IngresoPaciente.Paciente},<br>Fecha de ingreso: ${IngresoPaciente.Fecha}`;

    localStorage.setItem("PacienteGuardado",valorinput)
    
    
    respuesta.value = ""


})

function MostrarPacientes() {
    resultado.innerHTML = "";
    if (pacientes.length > 0) {
        resultado.innerHTML += "<ul>";
        ListaPacientes.forEach(function (tarea) {
            resultado.innerHTML += `<li>Tarea: ${tarea.tarea}, Fecha: ${tarea.fecha}</li>`;
        });
        resultado.innerHTML += "</ul>";
    }
}
function MostrarPacientesFiltrados(pacientes) {
    resultado2.innerHTML = "";
    if (pacientes.length > 0) {
        resultado2.innerHTML += "<ul>";
        tareas.forEach(function (pacientes) {
            resultado2.innerHTML += `<li>Paciente: ${tarea.tarea},<br>Fecha de ingreso: ${tarea.fecha}</li>`;
        });
        resultado2.innerHTML += "</ul>";
    } else {
        resultado2.innerHTML = "No se encontraron pacientes que coincidan con la búsqueda.";
    }
}
function guardarEnLocalStorage() {
    localStorage.setItem("Pacienteguardado", JSON.stringify(ListaTareas));
}
// Función para verificar si la tarea ya existe en la lista
function existeTareaEnLista(valorTarea) {
    return ListaPacientes.some(function (tarea) {
        return tarea.tarea.toLowerCase() === valorTarea.toLowerCase();
    });
}
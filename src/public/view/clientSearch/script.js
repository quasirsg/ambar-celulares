const rowForDni = document.getElementById("row-dni");
const rowForName = document.getElementById("row-name");
const inputSearch = document.getElementById("search-input");
const form = document.getElementById("search-form");

let dni;

async function uploadAllClientsInfo() {
    const clientData = await getAllClients();
    agregarFilasATabla(clientData);
}

function verifyIsValidDni(e) {
    if (e.length >= 5 && e.length <= 15 && !isNaN(e)) return true;
}

function agregarFilasATabla(datos) {
    const tabla = document.querySelector('table');
    const tbody = tabla.querySelector('tbody');

    datos.forEach((dato) => {
        const fila = document.createElement('tr');
        const dni = document.createElement('td');
        const nombreCompleto = document.createElement('td');
        const editarDatos = document.createElement('td');
        const botonVisualizar = document.createElement('button');

        dni.textContent = dato.dni;
        nombreCompleto.textContent = `${dato.name}` + ` ` + `${dato.surname}`;

        botonVisualizar.type = 'button';
        botonVisualizar.className = 'btn btn-primary btn-lg';
        botonVisualizar.textContent = 'Visualizar';

        botonVisualizar.addEventListener('click', () => {
            const modal = document.getElementById('modalVisualizar');

            $(modal).modal('show');
        });

        editarDatos.appendChild(botonVisualizar);

        fila.appendChild(dni);
        fila.appendChild(nombreCompleto);
        fila.appendChild(editarDatos);

        tbody.appendChild(fila);
    });
}

/**
 * Submit form
 */
form.addEventListener("submit", async function (e) {
    try {
        e.preventDefault();
        dni = inputSearch.value
        clientInfo(dni);
    } catch (error) {
        console.log(error);
    }
});

$(document).ready(uploadAllClientsInfo());
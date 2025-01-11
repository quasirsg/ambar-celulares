const rowForDni = document.getElementById("row-dni");
const rowForName = document.getElementById("row-name");
const inputSearch = document.getElementById("search-input");
const form = document.getElementById("search-form");

let dni;

async function clientInfo(dni) {
    if (verifyIsValidDni(dni)) {
        const clientData = await getClient(dni);
        uploadClientTable(clientData[0]);
        /* return clientData; */
    }
}

function verifyIsValidDni(e) {
    if (e.length >= 7 && e.length <= 9 && !isNaN(e)) return true;
    else {
        /* invalidToaster({ code: "dni_incomplete" }); */
        return false
    }
}

function uploadClientTable(client) {
    rowForDni.innerHTML = client.dni;
    rowForName.innerHTML = `${client.name}` + ` ` + `${client.surname}`
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
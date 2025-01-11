const rowForDni = document.getElementById("row-dni");
const rowForName = document.getElementById("row-name");
const inputSearch = document.getElementById("search-input");
const form = document.getElementById("search-form");

let dni;
const paginationState = {
    currentPage: 1,
    rowsPerPage: 5,
};

async function uploadAllClientsInfo(state) {
    const clientData = await getAllClients(state.currentPage, state.rowsPerPage);
    agregarFilasATabla(clientData);
    paginationSettingsToButtons(dni, paginationState);
}

function verifyIsValidDni(e) {
    if (e.length >= 5 && e.length <= 15 && !isNaN(e)) return true;
}

function agregarFilasATabla(clients) {
    const tabla = document.querySelector('table');
    const tbody = tabla.querySelector('tbody');
    tbody.innerHTML = '';
    clients.forEach((data) => {
        const createRow = document.createElement('tr');
        const dniElementRow = document.createElement('td');
        const nameElementRow = document.createElement('td');
        const buttonElementRow = document.createElement('td');
        const buttonEditUser = document.createElement('button');

        dniElementRow.textContent = data.dni;
        nameElementRow.textContent = `${data.name}` + ` ` + `${data.surname}`;

        buttonEditUser.type = 'button';
        buttonEditUser.className = 'btn btn-primary btn-lg';
        buttonEditUser.textContent = 'Visualizar';

        buttonEditUser.addEventListener('click', () => {
            const modal = document.getElementById('modalVisualizar');
            const nameInput = modal.querySelector('#name');
            const surnameInput = modal.querySelector('#surname');
            const phoneInput = modal.querySelector('#phone');
            const addressInput = modal.querySelector('#address');

            nameInput.value = data.name;
            surnameInput.value = data.surname;
            phoneInput.value = data.phone_number;
            addressInput.value = data.address;

            $(modal).modal('show');
        });

        buttonElementRow.appendChild(buttonEditUser);

        createRow.appendChild(dniElementRow);
        createRow.appendChild(nameElementRow);
        createRow.appendChild(buttonElementRow);

        tbody.appendChild(createRow);
    });
}

/**
 * PAGINATION LOGIC
 */
async function paginationSettingsToButtons(dni, state, filter = {}) {
    const countClients = await getTotalClients();
    const countTotalClients = countClients[0].total;
    const totalPages = Math.ceil(countTotalClients / state.rowsPerPage);
    $(".page-link-current").text(state.currentPage);
    updateButtonStates(state, totalPages);
    await eventListenerPaginationButtons(dni, state, totalPages, filter);
}
/**
 *  Handles the state of pagination buttons based on the current page and pagination
 */
function updateButtonStates(state, pagination) {
    if (state.currentPage <= 1) {
        $(".page-item-prev").addClass("disabled").removeClass("enabled");
    } else {
        $(".page-item-prev").addClass("enabled").removeClass("disabled");
    }

    if (state.currentPage >= pagination) {
        $(".page-item-next").addClass("disabled").removeClass("enabled");
    } else {
        $(".page-item-next").addClass("enabled").removeClass("disabled");
    }
}

/**
 * Add logic to the dataTables pagination buttons and controll the events of the current page
 */
async function eventListenerPaginationButtons(dni, state, pagination, filter) {
    $(".page-item-prev").off("click").on("click", async function (e) {
        e.preventDefault();
        if ($(this).hasClass("disabled")) {
            console.log("El botón 'Previous' está deshabilitado, no se realizará la acción.");
            return;
        }
        if (state.currentPage > 1) {
            state.currentPage--;
            await uploadAllClientsInfo(state);
            updateButtonStates(state, pagination);
        }
    });

    $(".page-item-next").off("click").on("click", async function (e) {
        e.preventDefault();
        if ($(this).hasClass("disabled")) {
            console.log("El botón 'Next' está deshabilitado, no se realizará la acción.");
            return;
        }
        if (state.currentPage < pagination) {
            state.currentPage++;
            await uploadAllClientsInfo(state);
            updateButtonStates(state, pagination);
        }
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

$(document).ready(uploadAllClientsInfo(paginationState));
const rowForDni = document.getElementById("row-dni");
const rowForName = document.getElementById("row-name");
const inputSearch = document.getElementById("search-input");
const form = document.getElementById("search-form");

let dni;
let confirmButtonsModal
let editButtonsEventListeners = [];
const paginationState = {
    currentPage: 1,
    rowsPerPage: 5,
};

function validate(input) {
    input.CustomValidation.invalidities = [];
    input.CustomValidation.checkValidity(input);

    if (input.CustomValidation.invalidities.length === 0 && input.value !== "") {
        input.setCustomValidity("");
        return true;
    } else {
        var message = input.CustomValidation.getInvalidities();
        input.setCustomValidity(message);
        invalidToaster({
            code: `${input.name}_incomplete`,
        });
        return false;
    }
}


const errorsMap = new Map();

errorsMap.set(
    "name_incomplete",
    "Porfavor ingrese el nombre correctamente para poder avanzar"
);
errorsMap.set(
    "surname_incomplete",
    "Porfavor ingrese el apellido correctamente para poder avanzar"
);
errorsMap.set(
    "phone_number_incomplete",
    "Porfavor ingrese el telefono correctamente para poder avanzar"
);
errorsMap.set(
    "address_incomplete",
    "Porfavor ingrese la direccion correctamente para poder avanzar"
);

/**
 * Function to get data client from db
 */
async function uploadAllClientsInfo(state) {
    const clientData = await getAllClients(state.currentPage, state.rowsPerPage);
    renderClientTableRows(clientData);
    await paginationSettingsToButtons(dni, state);
    /* closeButtonsEvents(); */
}

/**
 * Auxiliary Functions
*/
function verifyIsValidDni(e) {
    if (e.length >= 5 && e.length <= 15 && !isNaN(e)) return true;
}

function removeEditButtonsEvents() {
    editButtonsEventListeners.forEach(({ button, clickListener }) => {
        button.removeEventListener('click', clickListener);
    });
    editButtonsEventListeners = [];
}

function toggleInputAndConfirmButton(inputElement, confirmButton) {
    const isInputDisabled = inputElement.disabled;

    inputElement.disabled = !isInputDisabled;
    confirmButton.disabled = !isInputDisabled;

    if (isInputDisabled) {
        inputElement.classList.remove('disabled');
        confirmButton.classList.remove('disabled');
    } else {
        inputElement.classList.add('disabled');
        confirmButton.classList.add('disabled');
    }
}

function resetModalFields() {
    const modal = document.getElementById('modalVisualizar');
    const dniInput = modal.querySelector('#dni-input');
    const nameInput = modal.querySelector('#name-input');
    const surnameInput = modal.querySelector('#surname-input');
    const phoneInput = modal.querySelector('#phone-input');
    const addressInput = modal.querySelector('#address-input');

    dniInput.disabled = true;
    dniInput.classList.add('disabled');
    nameInput.disabled = true;
    nameInput.classList.add('disabled');
    surnameInput.disabled = true;
    surnameInput.classList.add('disabled');
    phoneInput.disabled = true;
    phoneInput.classList.add('disabled');
    addressInput.disabled = true;
    addressInput.classList.add('disabled');
    confirmButtonsModal.forEach(button => {
        button.disabled = true;
        button.classList.add('disabled');
    });
}


/**
 * Create the table with the clients of the database
 */
function renderClientTableRows(clients) {
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
            modalViewChargeData(data);
        });

        buttonElementRow.appendChild(buttonEditUser);

        createRow.appendChild(dniElementRow);
        createRow.appendChild(nameElementRow);
        createRow.appendChild(buttonElementRow);

        tbody.appendChild(createRow);
    });
}

/**
 * Charge the inputs of the modal with the data of the client selected
 */
function modalViewChargeData(data) {
    const modal = document.getElementById('modalVisualizar');
    const dniInput = modal.querySelector('#dni-input');
    const nameInput = modal.querySelector('#name-input');
    const surnameInput = modal.querySelector('#surname-input');
    const phoneInput = modal.querySelector('#phone-input');
    const addressInput = modal.querySelector('#address-input');

    dni = data.dni
    dniInput.value = data.dni;
    nameInput.value = data.name;
    surnameInput.value = data.surname;
    phoneInput.value = data.phone_number;
    addressInput.value = data.address;

    $(modal).modal('show');
    addEditButtonsEvents(modal);
    /* closeButtonsEvents(); */
}

/**
 * Events to the edit and confirm buttons of modal
 */
function addEditButtonsEvents(modal) {
    const editButtonsModal = modal.querySelectorAll('#btn-editar');
    confirmButtonsModal = modal.querySelectorAll('#btn-confirm-edit');
    const confirmModalButtonEdit = document.getElementById('btn-edit-confirm');


    editButtonsModal.forEach((button) => {
        const clickListener = () => {
            const inputToValidate = button.closest('tr').querySelector('input');
            const confirmButton = button.closest('tr').querySelector('#btn-confirm-edit');

            toggleInputAndConfirmButton(inputToValidate, confirmButton);

            if (!inputToValidate.disabled) {
                validateParams(inputToValidate);
            }
        };

        button.addEventListener('click', clickListener);
        editButtonsEventListeners.push({ button, clickListener });
    });

    confirmButtonsModal.forEach((button) => {
        const clickListener = async (e) => {
            e.preventDefault();
            const confirmModal = document.getElementById("modalEdit");
            const inputValue = button.closest('tr').querySelector('input');
            if (validate(inputValue)) {
                $(confirmModal).modal('show');
                handleConfirmButtonEditEvent(dni, inputValue.name, inputValue.value);
            }
        };

        button.addEventListener('click', clickListener);
        editButtonsEventListeners.push({ button, clickListener });
    });

    const handleConfirmButtonEditEvent = (dni, field, newValue) => {
        confirmModalButtonEdit.addEventListener('click', async () => {
            await updateClientField(dni, field, newValue);
            validToaster();
            resetModalFields();
        })
    };
}

/**
 * Events of close and delete buttons of modal
 */
(function closeButtonsEvents() {
    const deleteButtonsModal = document.getElementById('btn-delete-confirm');
    const closeButtonsModal = document.querySelectorAll('#btn-close-modal');

    deleteButtonsModal.addEventListener('click', async function (e) {
        e.preventDefault();
        /* await deleteClientByDni(dni); */
        resetModalFields()
        removeEditButtonsEvents();
        uploadAllClientsInfo(paginationState);
        $('#modalAlert').modal('hide');
        $('#modalVisualizar').modal('hide');
    });

    closeButtonsModal.forEach((button) => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            console.log("close");
            resetModalFields()
            removeEditButtonsEvents();
            uploadAllClientsInfo(paginationState);
        })
    });
})();

/**
 * Inputs validations
 */
function validateParams(inputValidate) {
    let validityChecks;

    const nameValidityChecks = [
        {
            isInvalid: function (input) {
                const regex = /^[A-zÀ-ÿñÑ\s'.-]+$/;
                const caracters = input.value;
                const test = regex.test(caracters);
                return test ? false : true;
            },
            invalidityMessage: "Un nombre solo contiene letras",
            element: document.querySelector(
                'td[id="td-name"] ul.input-requirements li:nth-child(1)'
            ),
        },
    ];

    const surnameValidityChecks = [
        {
            isInvalid: function (input) {
                const regex = /^[A-zÀ-ÿñÑ\s'.-]+$/;
                const caracters = input.value;
                const test = regex.test(caracters);
                return test ? false : true;
            },
            invalidityMessage: "Un apellido solo contiene letras",
            element: document.querySelector(
                'td[id="td-surname"] ul.input-requirements li:nth-child(1)'
            ),
        },
    ];

    const phoneNumberValidtyChecks = [
        {
            isInvalid: function (input) {
                const regex = /^[0-9]{10,10}$/;
                const caracters = input.value;
                const test = regex.test(caracters);
                return test ? false : true;
            },
            invalidityMessage: "Un numero de telefono solo contiene numeros",
            element: document.querySelector(
                'td[id="td-phoneNumber"] ul.input-requirements li:nth-child(1)'
            ),
        },
    ];

    const addressValidityChecks = [
        {
            isInvalid: function (input) {
                const regex = /^[A-zÀ-ÿñÑ0-9\s,.-]{5,70}$/;
                const caracters = input.value;
                const test = regex.test(caracters);
                return test ? false : true;
            },
            invalidityMessage: "La dirección debe tener entre 5 y 70 caracteres y solo contener letras, números y los siguientes caracteres: , . -",
            element: document.querySelector(
                'td[id="td-address"] ul.input-requirements li:nth-child(1)'
            ),
        },
    ];

    switch (inputValidate.name) {
        case "name":
            validityChecks = nameValidityChecks;
            break;
        case "surname":
            validityChecks = surnameValidityChecks;
            break;
        case "phone_number":
            validityChecks = phoneNumberValidtyChecks;
            break;
        case "address":
            validityChecks = addressValidityChecks;
            break;
        default:
            validityChecks = [];
            break;
    }

    inputValidate.CustomValidation = new CustomValidation(inputValidate);
    inputValidate.CustomValidation.validityChecks = validityChecks;
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
function updateButtonStates(state, totalPages) {
    if (state.currentPage <= 1) {
        $(".page-item-prev").addClass("disabled").removeClass("enabled");
    } else {
        $(".page-item-prev").addClass("enabled").removeClass("disabled");
    }

    if (state.currentPage >= totalPages) {
        $(".page-item-next").addClass("disabled").removeClass("enabled");
    } else {
        $(".page-item-next").addClass("enabled").removeClass("disabled");
    }
}

/**
 * Add logic to the dataTables pagination buttons and controll the events of the current page
 */
async function eventListenerPaginationButtons(dni, state, totalPages, filter) {
    $(".page-item-prev").off("click").on("click", async function (e) {
        e.preventDefault();
        if ($(this).hasClass("disabled")) {
            console.log("El botón 'Previous' está deshabilitado, no se realizará la acción.");
            return;
        }
        if (state.currentPage > 1) {
            state.currentPage--;
            updateButtonStates(state, totalPages);
            await uploadAllClientsInfo(state);
        }
    });

    $(".page-item-next").off("click").on("click", async function (e) {
        e.preventDefault();
        if ($(this).hasClass("disabled")) {
            console.log("El botón 'Next' está deshabilitado, no se realizará la acción.");
            return;
        }
        if (state.currentPage < totalPages) {
            state.currentPage++;
            updateButtonStates(state, totalPages);
            await uploadAllClientsInfo(state);
        }
    });
}

/**
 * Alert Toasters 
 */
const invalidToaster = function (error) {
    const errorText = errorsMap.get(error.code);
    var alerta = document.getElementById("alert");
    alerta.style.cssText =
        "display: block; background-color: #f2dede; color: #a94442;";
    alerta.innerHTML =
        "<strong>¡Algo salió mal! </strong>" + `${errorText}` + ".";
    setTimeout(function () {
        alerta.style.display = "none";
    }, 1600);
};

const validToaster = function () {
    var alerta = document.getElementById("alert");
    alerta.style.cssText =
        "display: block; background-color: #dff0d8; color: #3c763d;";
    alerta.innerHTML =
        "<strong>¡Bien hecho!</strong> Editaste el usuario con exito.";
    setTimeout(function () {
        alerta.style.display = "none";
    }, 1600);
};

/**
 * Submit form
 */
form.addEventListener("submit", async function (e) {
    try {
        e.preventDefault();
        dni = inputSearch.value
        /* uploadAllClientsInfo(paginationState); */
    } catch (error) {
        console.log(error);
    }
});

$(document).ready(uploadAllClientsInfo(paginationState));
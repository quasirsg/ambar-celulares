/* ----------------------------
  
---------------------------- */
const form = document.getElementById("search-form");
const searchInput = document.getElementById("search");
const checksOfRetired = document.getElementsByClassName("checks_of_retired");
const checksOfDepositedOut = document.getElementsByClassName("checks_of_deposited_out");
const checksOfFixed = document.getElementsByClassName("checks_of_fixed");
const depositedButtons = document.getElementsByClassName("deposited-button");
const totalAmountButtons = document.getElementsByClassName("totalAmount-button");
const problemButtons = document.getElementsByClassName("problem-button");
const fixedButtons = document.getElementsByClassName("fixed-button");
const inputDataClient = document.getElementsByClassName("reset-client");

let dni;
let checks = [];
let client;
let timeoutId = null;
let modalToShow;
let idClient;
const paginationState = {
  currentPage: 1,
  rowsPerPage: 5,
};
let filter = {};
let isSearching = false;
let currentInputValue = '';
/* ----------------------------
  Control errors
---------------------------- */

const errorsMap = new Map();

errorsMap.set("dni_incomplete", "Porfavor ingrese el dni correctamente para poder avanzar");
errorsMap.set("client_inexistent", "El cliente seleccionado no cuenta con dispositivos asociados");
errorsMap.set("invalide_user", "Los datos proporcionados son incorrectos");
errorsMap.set("invalid_number", "Debe ingresar unicamente numeros");

/* ----------------------------
  Async Functions 
---------------------------- */

async function clientExist(dni) {
  let exists = await getClient(dni);
  updateClientData(exists[0]);
  return exists[0].dni.length !== 0 ? 1 : invalidToaster({ code: "client_inexistent" });
}

async function getBenefitArr(dni, state, filter) {
  const benefits = await getBenefits(dni, state.currentPage, state.rowsPerPage, filter);
  const benefitsArr = benefits.map((value) => Object.values(value));
  return benefitsArr;
}

async function reloadData(dni, state, filter = {}) {
  if (await clientExist(dni)) {
    const benefitsArr = await getBenefitArr(dni, state, filter);
    if (benefitsArr.length) {
      $("#example").dataTable().fnClearTable();
      $("#example").dataTable().fnAddData(benefitsArr);
      $("#example").DataTable().draw();
      $('#example_filter label input').val(currentInputValue);
      paginationSettingsToButtons(dni, paginationState, filter);
      toggleModals();
    } else {
      invalidToaster({ code: "client_inexistent" });
    }
  }
}

/* ----------------------------
  Function to add client data in the new table of client view
---------------------------- */
async function updateClientData(client) {
  document.getElementById('client-dni').textContent = client.dni;
  document.getElementById('client-name').textContent = `${client.name}` + ` ` + `${client.surname}`;
  document.getElementById('client-contact').textContent = client.phone_number;
  document.getElementById('client-address').textContent = client.address;
}

async function editTotalAmount(id, amountInput, change, buttonToDisable) {
  try {
    buttonToDisable.disabled = "disabled";
    if (change === "change-totalAmount") {
      validToaster("el Importe");
      await updateTotalAmount(id, amountInput.value);
    } else {
      validToaster("el Deposito");
      await updateDepositedMoney(id, amountInput.value);
    }
  } catch (error) {
    console.log(error);
  }
}



/* ----------------------------
  Básic Validations
---------------------------- */
function isNumber(toValidate) {
  return typeof toValidate === "number";
}

function verifyIsValidDni(e) {
  if (!e) return false;
  if (e.length >= 7 && e.length <= 9 && !isNaN(e)) return true;
  else {
    invalidToaster({ code: "dni_incomplete" });
    return false
  }
}

function isValidTokenAnd2faUser(token, get2faUser) {
  return typeof isNumber(token) && get2faUser;
}

/* ----------------------------
Add events to fields of dataTables
---------------------------- */

async function validateTokenAndToggleEditTotalAmountModal(codeInput, modalId, dt) {
  const get2faUser = get2faUserInLocalStorage();
  const token = parseInt(codeInput.value);
  try {
    const isUser = await validateToken(get2faUser, token);
    if (isUser === true) {
      $(`#${dt}`).modal("hide");
      $(`#${modalId}`).modal("show");
    } else if (dt === "tokenModalForDeposited") {
      invalidToaster({ code: "invalide_user" }, "second_alert");
    } else {
      invalidToaster({ code: "invalide_user" }, "first_alert");
    }
  } catch (error) {
    console.log(error); // TODO: Tirar un toast de error // pendiente a posibles errores
  }
}

function verifyCodesModalAddEventToShowDepositedOrTotalAmountModal(modalId, dt) {
  const verifyCodesModal = document.getElementById(
    `verify-code-for-edit-${modalId}`
  );
  const codeInput = document.getElementById(`code-${modalId}`);

  async function name(e) {
    e.preventDefault();
    await validateTokenAndToggleEditTotalAmountModal(codeInput, modalId, dt);
    codeInput.value = "";
  }

  verifyCodesModal.addEventListener("submit", name);
}

function toggleModalsOfTotalAmountAndDeposited(buttons, modalId, dt) {
  const editMountHidden = document.getElementById("edit-amount-hidden");

  verifyCodesModalAddEventToShowDepositedOrTotalAmountModal(modalId, dt);
  Array.from(buttons).forEach((button) => {
    button.addEventListener("click", async function (e) {
      e.preventDefault();
      let valueToSplit = button.value.split(" ");
      idClient = valueToSplit[1];
      $(`#${modalId}-input`).val(`${valueToSplit[0].replace(/[$]/gi, "")}`);
    });
  });
}

function validateIfChecksComeTrue(checks, action, columnName) { /* el action pasa la funcion: addUpdateStateToEventClick */
  Array.from(checks).forEach((check) => {
    let valuesArr = check.value.split("|");
    if (valuesArr[0] == true) check.checked = true;
    if (check.checked == true) check.disabled = "disabled";
    action(check, columnName);
  });
}

function addUpdateStateToEventClick(check, columnName) {
  check.addEventListener("click", async () => {
    if (columnName === "retired") check.disabled = "disabled";
    let valuesArr = check.value.split("|");
    idClient = valuesArr[1];
    if (columnName === "retired") await updateChecks(idClient, columnName);
  });
}

/**
 * Funcion que controla el submit del formulario de la observacion para cargar en la bd, disablea el boton de submit
 */
async function updateObsAndDateFixed(id, observationInput, submitButton) {
  try {
    validToaster("la observacion");
    let fechaActual = Number(moment.utc().format('YYYYMMDD'));
    await updateChecks(id, "fixed");
    await updateObservationsAndDateFixed(observationInput.value, fechaActual, id);
    submitButton.disabled = "disabled";
  } catch (error) {
    console.log(error);
  }
}

function toggleModalOfProblem(buttons) {
  Array.from(buttons).forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      $(`#problem-input`).text(`${button.value}`);
    });
  });
}

function toggleModalOfObservation(buttons) {
  Array.from(buttons).forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      let valueToSplit = button.value.split("|");
      const isoDateObservation = moment(valueToSplit[0], 'YYYYMMDD').format('YYYY/MM/DD');
      $(`#date-fixed-input`).text(`Fecha arreglado: ${isoDateObservation}`);
      $(`#fixed-input`).text(`${valueToSplit[1]}`);
    });
  });
}

/**
 *  Configures pagination buttons based on provided parameters, including calculating total pages, updating button states, and adding event listeners
 */
async function paginationSettingsToButtons(dni, state, filter = {}) {
  const countBenefits = await getTotalBenefits(dni, filter);
  const countTotalBenefits = countBenefits[0].total;
  const totalPages = Math.ceil(countTotalBenefits / state.rowsPerPage);
  $(".paginate_button.current").text(state.currentPage);
  updateButtonStates(state, totalPages);
  await eventListenerPaginationButtons(dni, state, totalPages, filter);
}

/**
 *  Handles the state of pagination buttons based on the current page and pagination
 */
function updateButtonStates(state, pagination) {
  if (state.currentPage <= 1) {
    $("#example_previous").addClass("disabled").removeClass("enabled");
  } else {
    $("#example_previous").addClass("enabled").removeClass("disabled");
  }

  if (state.currentPage >= pagination) {
    $("#example_next").addClass("disabled").removeClass("enabled");
  } else {
    $("#example_next").addClass("enabled").removeClass("disabled");
  }
}

/**
 * Add logic to the dataTables pagination buttons and controll the events of the current page
 */
async function eventListenerPaginationButtons(dni, state, pagination, filter) {
  $("#example_previous").off("click").on("click", async function (e) {
    e.preventDefault();
    if ($(this).hasClass("disabled")) {
      console.log("El botón 'Previous' está deshabilitado, no se realizará la acción.");
      return;
    }
    if (state.currentPage > 1) {
      state.currentPage--;
      await reloadData(dni, state, filter);
      updateButtonStates(state, pagination);
      toggleModals();
    }
  });

  $("#example_next").off("click").on("click", async function (e) {
    e.preventDefault();
    if ($(this).hasClass("disabled")) {
      console.log("El botón 'Next' está deshabilitado, no se realizará la acción.");
      return;
    }
    if (state.currentPage < pagination) {
      state.currentPage++;
      await reloadData(dni, state, filter);
      updateButtonStates(state, pagination);
      toggleModals();
    }
  });
}

const searchStrategies = {
  date: (inputValue) => {
    if (inputValue.length === 10) {
      filter.date_received_phone = Number(moment(inputValue).format('YYYYMMDD'));
      delete filter.imei;
    }
  },
  imei: (inputValue) => {
    if (inputValue.length === 15) {
      filter.imei = inputValue;
      delete filter.date_received_phone;
    }
  }
};

const applySearchStrategy = (inputValue) => {
  Object.values(searchStrategies).forEach(strategy => {

    return strategy(inputValue)
  });
};

async function settingsSearchInput1(inputValue, state, dni) {
  if (isSearching) return;
  isSearching = true;

  applySearchStrategy(inputValue);

  state.currentPage = 1;
  await reloadAndUpdatePagination(dni, state, filter);
  isSearching = false;
}

async function reloadAndUpdatePagination(dni, state, filter) {
  await reloadData(dni, state, filter);
  await paginationSettingsToButtons(dni, state, filter);
}

function toggleModals() {
  const editTotalAmountModal = document.getElementById("edit-total-amount-form");
  const editDepositedMoneyModal = document.getElementById("edit-deposited-money-form");
  const updateObservation = document.getElementById("submit-observation-form");
  const totalAmountInput = document.getElementById("totalAmountModal-input");
  const depositedMoneyInput = document.getElementById("depositedMoneyModal-input");
  const observationInput = document.getElementById("updateObservation-input");
  const submitButtonTotalAmount = document.getElementById("submit_button_total_amount");
  const submitButtonDepositedMoney = document.getElementById("submit_button_deposited_money");
  const submitButtonObservation = document.getElementById("submit_button_observation");
  const closeButtons = document.getElementsByClassName("close_modal");

  editTotalAmountModal.addEventListener("submit", async function (e) {
    e.preventDefault();
    await editTotalAmount(idClient, totalAmountInput, "change-totalAmount", submitButtonTotalAmount);
    totalAmountInput.value = "";
  });
  editDepositedMoneyModal.addEventListener("submit", async function (e) {
    e.preventDefault();
    await editTotalAmount(idClient, depositedMoneyInput, "change-deposited", submitButtonDepositedMoney);
    depositedMoneyInput.value = "";
  });

  if (updateObservation) {
    updateObservation.addEventListener("submit", async function (e) {
      e.preventDefault();
      await updateObsAndDateFixed(idClient, observationInput, submitButtonObservation);
      observationInput.value = "";
    });
  }

  Array.from(closeButtons).forEach((button) => {
    button.addEventListener("click", async function (e) {
      e.preventDefault();
      submitButtonTotalAmount.removeAttribute("disabled");
      submitButtonDepositedMoney.removeAttribute("disabled");
      await reloadData(dni, paginationState, filter);
    });
  });

  toggleModalsOfTotalAmountAndDeposited(totalAmountButtons, "totalAmountModal", "tokenModal");
  toggleModalsOfTotalAmountAndDeposited(depositedButtons, "depositedModal", "tokenModalForDeposited");
  validateIfChecksComeTrue(checksOfFixed, addUpdateStateToEventClick, "fixed");
  validateIfChecksComeTrue(checksOfRetired, addUpdateStateToEventClick, "retired");
  toggleModalOfObservation(fixedButtons);
  toggleModalOfProblem(problemButtons);
}

/* ----------------------------
  Search Benefits by imei or date_received_phone for the input of dataTable
---------------------------- */


function assignInputEvent() {
  $('#example_filter label input')
    .attr('maxlength', 15)
    .attr('placeholder', 'Ingrese fecha o IMEI');
  const searchInputDataTable = $('#example_filter label input');

  searchInputDataTable.off();

  searchInputDataTable.on('input', function (e) {
    e.preventDefault();
    clearTimeout(timeoutId);

    currentInputValue = $(this).val();
    timeoutId = setTimeout(async function () {
      if (currentInputValue.length === 10 || currentInputValue.length === 15) {
        settingsSearchInput1(currentInputValue, paginationState, dni);
      } else if (currentInputValue.length === 0) {
        // Llamar a la función que recarga la data
        reloadData(dni, paginationState);
      }
    }, 1300);
  });
}

/* ----------------------------
  Search Benefits by DNI
---------------------------- */

searchInput.addEventListener("input", function (e) {
  const dniValue = e.target.value;

  clearTimeout(timeoutId);

  timeoutId = setTimeout(async () => {
    const isDniEmpty = dniValue.length === 0;
    const isDniValid = verifyIsValidDni(dniValue);

    console.log("el empty:", isDniEmpty, "el valid:", isDniValid);

    dni = isDniEmpty ? null : dniValue;
    isDniValid ? await reloadData(dni, paginationState) : clearDataTable(), clearInputsView(isDniEmpty);
  }, 1000);

  function clearInputsView(isDniEmpty) {
    if (isDniEmpty) {
      Array.from(inputDataClient).forEach(element => {
        element.innerHTML = "";
      });
    }
  }

  function clearDataTable() {
    $("#example").dataTable().fnClearTable();
  }
});

/* ----------------------------
  Toasters
---------------------------- */

const invalidToaster = function (error, diferent) {
  if (diferent === "first_alert") {
    var alerta = document.getElementById("first_alert");
  } else if (diferent === "second_alert") {
    var alerta = document.getElementById("second_alert");
  } else {
    var alerta = document.getElementById("alert")
  }
  const errorText = errorsMap.get(error.code);
  alerta.style.cssText =
    "display: block; background-color: #f2dede; color: #a94442;";
  alerta.innerHTML =
    "<strong>¡Algo salió mal! </strong>" + `${errorText}` + ".";
  setTimeout(function () {
    alerta.style.display = "none";
  }, 1200);
};

const validToaster = function (diferent) {
  if (diferent === "el Importe") {
    var alerta = document.getElementById("amount_alert");
  } else if (diferent === "el Deposito") {
    var alerta = document.getElementById("deposited_alert");
  } else {
    var alerta = document.getElementById("observation_alert");
  }
  alerta.style.cssText =
    "display: block; background-color: #dff0d8; color: #3c763d;";
  alerta.innerHTML =
    "<strong>¡Bien hecho!</strong> Modificaste " +
    `${diferent}` +
    " con exito.";
  setTimeout(function () {
    alerta.style.display = "none";
  }, 1200);
};

/* ----------------------------
  Add submit logic to dataTable fields
---------------------------- */

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  if (verifyIsValidDni(dni)) {
    await reloadData(dni, paginationState);
  } else {
    invalidToaster({ code: "dni_incomplete" });
  }
});
$(document).ready(assignInputEvent);
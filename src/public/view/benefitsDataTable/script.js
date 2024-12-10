
/* ----------------------------
  
---------------------------- */
const form = document.getElementById("search-form");
const searchInput = document.getElementById("search");
const checksOfRetired = document.getElementsByClassName("checks_of_retired");
const checksOfDepositedOut = document.getElementsByClassName("checks_of_deposited_out");
const checksOfFixed = document.getElementsByClassName("checks_of_fixed");
const depositedButtons = document.getElementsByClassName("deposited-button");
const totalAmountButtons = document.getElementsByClassName("totalAmount-button");
const problemButtons = document.getElementsByClassName("problem-button")
/* const fixedButtons = document.getElementsByClassName("fixed-button")
const closeButtonFixed = document.getElementById("close_modal_fixed"); */

let dni;
let checks = [];
let client;
let modalToShow;
let idClient;
const paginationState = {
  currentPage: 1,
  rowsPerPage: 5,
};
/* ----------------------------
  Control errors
---------------------------- */

const errorsMap = new Map();

errorsMap.set(
  "dni_incomplete",
  "Porfavor ingrese el dni correctamente para poder avanzar"
);
errorsMap.set(
  "client_inexistent",
  "El cliente seleccionado no cuenta con dispositivos asociados"
);
errorsMap.set("invalide_user", "Los datos proporcionados son incorrectos");
errorsMap.set("invalid_number", "Debe ingresar unicamente numeros");

/* ----------------------------
  Async Functions 
---------------------------- */

async function clientExist(dni) {
  let exists = await getClient(dni);
  return exists.length !== 0 ? 1 : invalidToaster({ code: "client_inexistent" });
}

async function getBenefitArr(dni, state) {
  const benefits = await getBenefits(dni, state.currentPage, state.rowsPerPage);
  const benefitsArr = benefits.map((value) => Object.values(value));
  return benefitsArr;
}

async function reloadData(dni, state) {
  if (await clientExist(dni)) {
    const benefitsArr = await getBenefitArr(dni, state);
    if (benefitsArr.length) {
      $("#example").dataTable().fnClearTable();
      $("#example").dataTable().fnAddData(benefitsArr);
      $("#example").DataTable().draw();
    } else {
      invalidToaster({ code: "client_inexistent" });
    }
  }
}

function getCurrentDate() {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0'); // Asegura que tenga 2 dígitos
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Meses comienzan en 0
  const year = today.getFullYear();
  return `${day}/${month}/${year}`;
}

async function editTotalAmount(id, amountInput, change, buttonToDisable) {
  try {
    buttonToDisable.disabled = "disabled";
    if (change === "change-totalAmount") {
      validToaster("el Importe");
      await updateTotalAmount(id, amountInput.value);
    } else {
      validToaster("la Seña");
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
  if (e.length >= 7 && e.length <= 9 && !isNaN(e)) return true;
  else {
    invalidToaster({ code: "dni_incomplete" });
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

function validateIfChecksComeTrue(checks, action, columnName, buttonDisable) {
  Array.from(checks).forEach((check) => {
    if (columnName === "fixed") {
      /* console.log(check.value); */
    } // PROBAMOS LOS BOTONES Y SUS VALORES

    let valuesArr = check.value.split(",");
    idClient = valuesArr[1];
    console.log(idClient); //SETEAMOS EL ID AL CARGAR LOS BOTONES DE FIXED PARA PASARLO A LOS MODALES

    /*    if (valuesArr[0] == true) check.checked = true;
       if (check.checked == true) check.disabled = "disabled";
       action(check, id, columnName); */
  });
}

function addUpdateStateToEventClick(check, id, columnName) {
  check.addEventListener("click", async () => {
    check.disabled = "disabled";
    await updateChecks(id, columnName);
  });
}

async function updateObsAndDateFixed(id, observationInput, buttonToDisable) {
  try {
    buttonToDisable.disabled = "disabled";
    let fechaActual = getCurrentDate();
    /* console.log(observationInput.value, fechaActual, id); */
    await updateObservationsAndDateFixed(observationInput.value, fechaActual, id);
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
    button.addEventListener("check", function (e) {
      e.preventDefault();
      let valueToSplit = button.value.split(" ");
      idClient = valueToSplit[1]; // SETEAMOS EL IDCLIENT CADA VEZ QUE SE APRIETA EL BOTON DE FIXED

      $(`#fixed-input`).text(`${button.value[0]}`);
    });
  });
}

async function paginationSettingsToButtons(dni, state) {
  const countBenefits = await getAllBenefitsByDni(dni);
  const countTotalBenefits = countBenefits[0].total;
  const totalPages = Math.ceil(countTotalBenefits / state.rowsPerPage);
  $(".paginate_button.current").text(state.currentPage);

  updateButtonStates(state, totalPages);
  await eventListenerPaginationButtons(dni, state, totalPages);
}

/**
 *  Handles the state op pagination buttons based on the current page and pagination
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
async function eventListenerPaginationButtons(dni, state, pagination) {
  $("#example_previous").off("click").on("click", async function (e) {
    e.preventDefault();
    if ($(this).hasClass("disabled")) {
      console.log("El botón 'Previous' está deshabilitado, no se realizará la acción.");
      return;
    }
    if (state.currentPage > 1) {
      state.currentPage--;
      await reloadData(dni, state);
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
      await reloadData(dni, state);
      updateButtonStates(state, pagination);
      toggleModals();
    }
  });
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


  updateObservation.addEventListener("submit", async function (e) {
    e.preventDefault();
    await updateObsAndDateFixed(idClient, observationInput, submitButtonObservation);
    observationInput.value = "";
  });


  Array.from(closeButtons).forEach((button) => {
    button.addEventListener("click", async function (e) {
      e.preventDefault();
      submitButtonTotalAmount.removeAttribute("disabled");
      submitButtonDepositedMoney.removeAttribute("disabled");
      await reloadData(dni, paginationState)
      toggleModals()
    });
  });

  toggleModalsOfTotalAmountAndDeposited(totalAmountButtons, "totalAmountModal", "tokenModal");
  toggleModalsOfTotalAmountAndDeposited(depositedButtons, "depositedModal", "tokenModalForDeposited");
  validateIfChecksComeTrue(checksOfFixed, addUpdateStateToEventClick, "fixed");
  validateIfChecksComeTrue(checksOfRetired, addUpdateStateToEventClick, "retired");
  /* toggleModalOfObservation(fixedButtons); */
  toggleModalOfProblem(problemButtons);
  paginationSettingsToButtons(dni, paginationState);
}
/* ----------------------------
  Search Benefits by DNI
---------------------------- */

searchInput.addEventListener("change", function (e) {
  e = e.target.value;
  if (verifyIsValidDni(e)) {
    dni = e;
  }
});

/* ----------------------------
  Toasters
---------------------------- */

const invalidToaster = function (error, diferent) {
  if (diferent === "second_alert") {
    var alerta = document.getElementById("second_alert");
  } else if (diferent === "first_alert") {
    var alerta = document.getElementById("first_alert");
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
  }, 3500);
};

const validToaster = function (diferent) {
  if (diferent === "el Importe") {
    var alerta = document.getElementById("amount_alert");
  } else {
    var alerta = document.getElementById("deposited_alert");
  }
  alerta.style.cssText =
    "display: block; background-color: #dff0d8; color: #3c763d;";
  alerta.innerHTML =
    "<strong>¡Bien hecho!</strong> Cambiaste " +
    `${diferent}` +
    " con exito.";
  setTimeout(function () {
    alerta.style.display = "none";
  }, 3500);
};

/* ----------------------------
  Add submit logic to dataTable fields
---------------------------- */

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  if (verifyIsValidDni(dni)) await reloadData(dni, paginationState);
  toggleModals();
});

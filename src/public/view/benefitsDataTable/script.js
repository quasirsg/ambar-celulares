
/* ----------------------------
  
---------------------------- */
const form = document.getElementById("search-form");
const searchInput = document.getElementById("search");
const checksOfRetired = document.getElementsByClassName("checks_of_retired");
const checksOfPaidOut = document.getElementsByClassName("checks_of_paid_out");
const checksOfFixed = document.getElementsByClassName("checks_of_fixed");
const paidButtons = document.getElementsByClassName("paid-button");
const mountButtons = document.getElementsByClassName("mount-button");

let dni;
let checks = [];
let client;
let modalToShow;
let idClient;
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
  "El cliente seleccionado no cuenta con beneficios"
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

async function getBenefitArr(dni) {
  const benefits = await getBenefits(dni);
  const benefitsArr = benefits.map((value) => Object.values(value));
  return benefitsArr;
}

async function reloadData(dni) {
  if (await clientExist(dni)) {
    const benefitsArr = await getBenefitArr(dni);
    if (benefitsArr.length) {
      $("#example").dataTable().fnClearTable();
      $("#example").dataTable().fnAddData(benefitsArr);
    } else {
      invalidToaster({ code: "client_inexistent" });
    }
  }
}

async function editMount(id, mountInput, change, buttonToDisable) {
  try {
    buttonToDisable.disabled = "disabled";
    if (change === "change-mount") {
      validToaster("monto");
      await updateMount(id, mountInput.value);
    } else {
      validToaster("saldo");
      await updatePaid(id, mountInput.value);
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

async function validateTokenAndToggleEditMountModal(codeInput, modalId, dt) {
  const get2faUser = get2faUserInLocalStorage();
  const token = parseInt(codeInput.value);
  try {
    const isUser = await validateToken(get2faUser, token);
    if (isUser === true) {
      $(`#${dt}`).modal("hide");
      $(`#${modalId}`).modal("show");
    } else if (dt === "tokenModalForPaid") {
      invalidToaster({ code: "invalide_user" }, "second_alert");
    } else {
      invalidToaster({ code: "invalide_user" }, "first_alert");
    }
  } catch (error) {
    console.log(error); // TODO: Tirar un toast de error // pendiente a posibles errores
  }
}

function verifyCodesModalAddEventToShowPaidOrMountModal(modalId, dt) {
  const verifyCodesModal = document.getElementById(
    `verify-code-for-edit-${modalId}`
  );
  const codeInput = document.getElementById(`code-${modalId}`);

  async function name(e) {
    e.preventDefault();
    await validateTokenAndToggleEditMountModal(codeInput, modalId, dt);
    codeInput.value = "";
  }

  verifyCodesModal.addEventListener("submit", name);
}

function toggleModalsOfMountAndPaid(buttons, modalId, dt) {
  const editMountHidden = document.getElementById("edit-mount-hidden");

  verifyCodesModalAddEventToShowPaidOrMountModal(modalId, dt);
  Array.from(buttons).forEach((button) => {
    button.addEventListener("click", async function (e) {
      e.preventDefault();
      let valueToSplit = button.value.split(" ");
      idClient = valueToSplit[1];
      $(`#${modalId}-input`).val(`${valueToSplit[0].replace(/[$]/gi, "")}`);
    });
  });
}

function validateIfChecksComeTrue(checks, position, action, columnName) {
  Array.from(checks).forEach((check) => {
    let valuesArr = check.value.split(",");
    let length = valuesArr.length;
    if (valuesArr[position] == true) check.checked = true;
    if (check.checked == true) check.disabled = "disabled";
    action(check, valuesArr, length, columnName);
  });
}

function addUpdateStateToEventClick(check, valuesArr, length, columnName) {
  check.addEventListener("click", async () => {
    check.disabled = "disabled";
    await updateChecks(valuesArr[length - 1], columnName);
  });
}

function toggleModals() {
  const editMountModal = document.getElementById("edit-mount-form");
  const editPaidModal = document.getElementById("edit-paid-form");
  const mountInput = document.getElementById("amountModal-input");
  const paidInput = document.getElementById("paidModal-input");
  const submitButtonMount = document.getElementById("submit_button_mount");
  const submitButtonPaid = document.getElementById("submit_button_paid");
  const closeButtons = document.getElementsByClassName("close_modal")

  editMountModal.addEventListener("submit", async function (e) {
    e.preventDefault();
    await editMount(idClient, mountInput, "change-mount", submitButtonMount);
    mountInput.value = "";
  });
  editPaidModal.addEventListener("submit", async function (e) {
    e.preventDefault();
    await editMount(idClient, paidInput, "change-paid", submitButtonPaid);
    paidInput.value = "";
  });

  Array.from(closeButtons).forEach((button) => {
    button.addEventListener("click", async function (e) {
       e.preventDefault();
       submitButtonMount.removeAttribute("disabled");
       submitButtonPaid.removeAttribute("disabled");
       await reloadData(dni)
       toggleModals()
      });
  });

  toggleModalsOfMountAndPaid(mountButtons, "amountModal", "tokenModal");
  toggleModalsOfMountAndPaid(paidButtons, "paidModal", "tokenModalForPaid");
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
  } else if(diferent === "first_alert"){
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
  if (diferent === "monto") {
    var alerta = document.getElementById("mount_alert");
  } else {
    var alerta = document.getElementById("paid_alert");
  }
  alerta.style.cssText =
    "display: block; background-color: #dff0d8; color: #3c763d;";
  alerta.innerHTML =
    "<strong>¡Bien hecho!</strong> Cambiaste el " +
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

  if (verifyIsValidDni(dni)) await reloadData(dni);
  toggleModals();
  validateIfChecksComeTrue(
    checksOfRetired,
    7,
    addUpdateStateToEventClick,
    "fixed"
  );
  validateIfChecksComeTrue(
    checksOfFixed,
    8,
    addUpdateStateToEventClick,
    "retired"
  );
});

/* ----------------------------
  
---------------------------- */
const form = document.getElementById("search-form");
const searchInput = document.getElementById("search");
const checksOfRetired = document.getElementsByClassName("checks_of_retired");
const checksOfPaidOut = document.getElementsByClassName("checks_of_paid_out");
const checksOfFixed = document.getElementsByClassName("checks_of_fixed");
let dni;
let idOfBenefit;
let checks = [];
let client;

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
errorsMap.set(
  "invalide_user",
  "Los datos proporcionados son incorrectos"
);
errorsMap.set(
  "invalid_number",
  "Debe ingresar unicamente numeros"
);

/* ----------------------------
	Async Functions 
---------------------------- */

async function clientExist(dni) {
  let exists = await getClient(dni);

  return exists.length !== 0;
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
      invalidToaster({code: "client_inexistent"})
    }
    }
}

async function validateTokenAndToggleEditMountModal(codeInput) {
  const get2faUser = get2faUserInLocalStorage();
  const token = parseInt(codeInput.value);
  try {
    const isUser = await validateToken(get2faUser, token);
    if (isUser === true) {
      $("#myModalNorm").modal("hide");
      $("#myModalb").modal("show");
      $("#alert").addClass("disable-div");
    }else{
      invalidToaster({code: "invalide_user"});
    }
  } catch (error) {
    console.log(error);; // TODO: Tirar un toast de error // pendiente a posibles errores
  }
}

async function editMount(mountInput, subButton) {
  const mount = parseInt(mountInput.value);
  try {
  if (isNaN(mount)) {
    invalidToaster({code: "invalid_number"})
  } else{
    subButton.disabled="disabled";
    await updateMount(idOfBenefit, mount);
    validToaster()
  }} catch (error) {
    console.log(error); // TODO: Tirar un toast de error // pendiente a posibles errores
  }
}

/* ----------------------------
	Básic Validations
---------------------------- */
function isNumber(toValidate) {
  return typeof toValidate === "number";
}

function verifyIsValidDni(e) {
  if(e.length >= 7 &&
     e.length <= 9 &&
     !isNaN(e)) return true
     else{invalidToaster({code: "dni_incomplete"})}
}

function isValidTokenAnd2faUser(token, get2faUser) {
  return typeof isNumber(token) && get2faUser;
}

function getId() {
  const buttonsOfMount = document.getElementsByClassName("button-of-mount");
  Array.from(buttonsOfMount).forEach((buttonOfMount) => {
    buttonOfMount.addEventListener("click", async function (buttonOfMount) {
      buttonOfMount.preventDefault();
      let valuesArr = buttonOfMount.target.value.split(",");

      idOfBenefit = valuesArr[valuesArr.length - 1];
    });
  });
}
/* ----------------------------
Add events to fields of dataTables
---------------------------- */
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
  const verifyCodesModal = document.getElementById(
    "verify-code-for-edit-mount-form"
  );
  const editMountModal = document.getElementById("edit-mount-form");
  const codeInput = document.getElementById("code");
  const mountInput = document.getElementById("mount-of-modal");
  const subButton = document.getElementById("submit_button")

  verifyCodesModal.addEventListener("submit", async function (e) {
    e.preventDefault();
    await validateTokenAndToggleEditMountModal(codeInput);
    codeInput.value = "";
  });

  editMountModal.addEventListener("submit", async function (e) {
    e.preventDefault();
    await editMount(mountInput, subButton);
    mountInput.value = "";
  });
}

/* ----------------------------
	Search Benefits by DNI
---------------------------- */

searchInput.addEventListener("change", function (e) {
  e = e.target.value
  if (verifyIsValidDni(e)) {
    dni = e;
  }
});

/* ----------------------------
	Toasters
---------------------------- */
function changeStylesAlert(alerta, errorText) {
  alerta.style.cssText =
    "display: block; background-color: #f2dede; color: #a94442;";
  alerta.innerHTML =
    "<strong>¡Algo salió mal! </strong>" + `${errorText}` + ".";
  setTimeout(function () {
    alerta.style.display = "none";
  }, 4500);
}

const invalidToaster = function (error) {
  const errorText = errorsMap.get(error.code);
  var alerta = document.getElementById("alert")
  console.log(alerta);
  if (alerta.classList.contains("disable-div")) {
    var alert = document.getElementById("second_alert")
    changeStylesAlert(alert, errorText);
  }
  changeStylesAlert(alerta, errorText);
};

const validToaster = function () {
  var alerta = document.getElementById("second_alert");
  alerta.style.cssText =
    "display: block; background-color: #dff0d8; color: #3c763d;";
  alerta.innerHTML =
  "<strong>¡Bien hecho!</strong> Cambiaste el monto con exito.";
};

/* ----------------------------
	Add submit logic to dataTable fields
---------------------------- */

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  if (verifyIsValidDni(dni)) await reloadData(dni);
  getId();
  toggleModals();
  validateIfChecksComeTrue(
    checksOfRetired,
    7,
    addUpdateStateToEventClick,
    "fixed"
  );
  validateIfChecksComeTrue(
    checksOfPaidOut,
    8,
    addUpdateStateToEventClick,
    "paid_out"
  );
  validateIfChecksComeTrue(
    checksOfFixed,
    9,
    addUpdateStateToEventClick,
    "retired"
  );
});

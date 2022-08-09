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
    $("#example").dataTable().fnClearTable();
    $("#example").dataTable().fnAddData(benefitsArr);
  }
}

async function validateTokenAndToggleEditMountModal(codeInput) {
  const get2faUser = get2faUserInLocalStorage();
  const token = parseInt(codeInput.value);
  try {
    if (!isValidTokenAnd2faUser(token, get2faUser)) throw new Error("Error"); // TODO: Tirar un toast de error
    const isUser = await validateToken(get2faUser, token);
    if (isUser === true) {
      $("#myModalNorm").modal("hide");
      $("#myModalb").modal("show");
    }
  } catch (error) {
    console.log(error); // TODO: Tirar un toast de error
  }
}

async function editMount(mountInput) {
  const mount = parseInt(mountInput.value);
  if (!isNumber(mount)) throw new Error("Error"); // TODO: Tirar un toast de error
  try {
    await updateMount(idOfBenefit, mount);
    console.log("updated"); //TODO: Tirar un toast
  } catch (error) {
    console.log(error); // TODO: Tirar un toast de error
  }
}

/* ----------------------------
	Básic Validations
---------------------------- */
function isNumber(toValidate) {
  return typeof toValidate === "number";
}

function verifyIsValidDni(e) {
  return (
    e.target.value.length >= 7 &&
    e.target.value.length <= 9 &&
    !isNaN(e.target.value)
  );
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
	Básic Validations
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

/* ----------------------------
	Add events to fields of dataTables
---------------------------- */
function toggleModals() {
  const verifyCodesModal = document.getElementById(
    "verify-code-for-edit-mount-form"
  );
  const editMountModal = document.getElementById("edit-mount-form");
  const codeInput = document.getElementById("code");
  const mountInput = document.getElementById("mount-of-modal");

  verifyCodesModal.addEventListener("submit", async function (e) {
    e.preventDefault();
    await validateTokenAndToggleEditMountModal(codeInput);
  });

  editMountModal.addEventListener("submit", async function (e) {
    e.preventDefault();
    await editMount(mountInput);
  });
}

/* ----------------------------
	Search Benefits by DNI
---------------------------- */

searchInput.addEventListener("change", function (e) {
  if (verifyIsValidDni(e)) {
    dni = e.target.value;
  }
});

/* ----------------------------
	Add submit logic to dataTable fields
---------------------------- */

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  await reloadData(dni);
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

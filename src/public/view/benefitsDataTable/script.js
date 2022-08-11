// General
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

function validateIfChecksComeTrue(checks, position, action, columnName) {
  Array.from(checks).forEach((e) => {
    let valuesArr = e.value.split(",");
    let length = valuesArr.length;
    if (valuesArr[position] == true) e.checked = true;
    if (e.checked == true) e.disabled = "disabled";
    action(e, valuesArr, length, columnName);
  });
}

function addUpdateStateToEventClick(e, valuesArr, length, columnName) {
  e.addEventListener("click", async () => {
    e.disabled = "disabled";
    await updateChecks(valuesArr[length - 1], columnName);
  });
}

function toggleModals() {
  const modalAForm = document.getElementById("modal-a-form");
  const codeInput = document.getElementById("code");
  modalAForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const get2faUser = get2faUserInLocalStorage();
    const token = parseInt(codeInput.value);
    if (typeof token === "number" && get2faUser) {
      const isUser = await validateToken(get2faUser, token);
      if (isUser === true) {
        $("#myModalNorm").modal("hide");
        $("#myModalb").modal("show");
      }
    }
  });
}

/*
 * Search
 */

const searchInput = document.getElementById("search");
let dni;

searchInput.addEventListener("change", function (e) {
  if (verifyIsValidDni(e)) {
    dni = e.target.value;
  }
});

/*
 * On submit
 */
const form = document.getElementById("search-form");
let checks = [];
let client;

function verifyIsValidDni(e) {
  return (
    e.target.value.length >= 7 &&
    e.target.value.length <= 9 &&
    !isNaN(e.target.value)
  );
}

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  await reloadData(dni);
  toggleModals();
  const checksOfRetired = document.getElementsByClassName("checks_of_retired");
  const checksOfPaidOut = document.getElementsByClassName("checks_of_paid_out");
  const checksOfFixed = document.getElementsByClassName("checks_of_fixed");
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

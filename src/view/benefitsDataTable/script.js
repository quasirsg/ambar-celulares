// General
async function clientExist(dni) {
  let exists = await getClient(dni);

  return exists.length !== 0;
}

async function getBenefitArr() {
  const benefits = await getBenefits(dni);
  const benefitsArr = benefits.map((value) => Object.values(value));
  return benefitsArr;
}

async function reloadData() {
  if (await clientExist(dni)) {
    const benefitsArr = await getBenefitArr();
    $("#example").dataTable().fnClearTable();
    $("#example").dataTable().fnAddData(benefitsArr);
  }
}

function validateIfChecksComeTrue(checks, position, action, fixedOrRetired) {
  Array.from(checks).forEach((e) => {
    let valuesArr = e.value.split(",");
    let length = valuesArr.length;
    if (valuesArr[position] == true) e.checked = true;
    if (e.checked == true) e.disabled = "disabled";
    action(e, valuesArr, length, fixedOrRetired);
  });
}

function addUpdateStateToEventClick(e, valuesArr, length, fixedOrRetired) {
  e.addEventListener("click", async () => {
    e.disabled = "disabled";
    await updateChecks(valuesArr[length - 1], fixedOrRetired);
  });
}
/* ----------------------------

	Validity Checks

	The arrays of validity checks for each input
	Comprised of three things
		1. isInvalid() - the function to determine if the input fulfills a particular requirement
		2. invalidityMessage - the error message to display if the field is invalid
		3. element - The element that states the requirement

---------------------------- */
const searchValidityChecks = [
  {
    isInvalid: function (input) {
      const regex = /^[0-9]{7,8}$/;
      const caracters = input.value;
      const test = regex.test(caracters);
      return test ? false : true;
    },
    invalidityMessage: "Ingrese un dni valido",
    element: document.querySelector(
      'label[for="client"] .input-requirements li:nth-child(1)'
    ),
  },
];
/*
 * Search
 */

const searchInput = document.getElementById("search");
let dni;

searchInput.CustomValidation = new CustomValidation(searchInput);
searchInput.CustomValidation.validityChecks = searchValidityChecks;

searchInput.addEventListener("change", function (e) {
  if (searchInput.CustomValidation.checkInput()) {
    dni = e.target.value;
  }
});

/*
 * On submit
 */
const inputs = document.querySelectorAll('input:not([type="submit"])');
const form = document.getElementById("search-form");
let checks = [];
let client;

function validate() {
  inputs.forEach((input) => {
    checks.push(input.CustomValidation.checkInput());
  });

  return checks.every((e) => e === true);
}

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  validate();
  await reloadData();
  const checksOfRetired = document.getElementsByClassName("checks_of_retired");
  const checksOfFixed = document.getElementsByClassName("checks_of_fixed");
  validateIfChecksComeTrue(
    checksOfRetired,
    8,
    addUpdateStateToEventClick,
    "fixed"
  );
  validateIfChecksComeTrue(
    checksOfFixed,
    7,
    addUpdateStateToEventClick,
    "retired"
  );
});

/**
 *
 * DataTables
 *
 */
$(document).ready(function () {
  $("#example").DataTable({
    data: client,
    columns: [
      { title: "Imei" },
      { title: "Contacto" },
      { title: "Dispositivo" },
      { title: "Descripcion" },
      { title: "Cambios" },
      { title: "Entrada" },
      { title: "Monto" },
      {
        title: "Arreglado",
        targets: 7,
        data: null,
        className: "text-center",
        searchable: false,
        orderable: false,
        render: function (data, type, full, meta) {
          return (
            '<input type="checkbox" class="checks_of_retired" name="check" value="' +
            data +
            '">'
          );
        },
        width: "3%",
      },
      {
        title: "Retirado",
        targets: 7,
        data: null,
        className: "text-center",
        searchable: false,
        orderable: false,
        render: function (data, type, full, meta) {
          return (
            '<input type="checkbox" class="checks_of_fixed" name="check" value="' +
            data +
            '">'
          );
        },
        width: "3%",
      },
    ],
  });
});

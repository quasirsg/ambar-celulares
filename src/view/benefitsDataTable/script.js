/*
 *
 * Mock Data
 *
 */
const mapOfClients = new Map();

mapOfClients.set("42523334", [[1], [2], [3]]);
mapOfClients.set("42523335", [2]);
mapOfClients.set("42523336", [3]);

function clientExist(dni) {
  return mapOfClients.has(dni);
}

function getClient(dni) {
  return mapOfClients.get(dni);
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

searchInput.CustomValidation = new CustomValidation(searchInput);
searchInput.CustomValidation.validityChecks = searchValidityChecks;

//
let dni;

searchInput.addEventListener("change", function (e) {
  if (searchInput.CustomValidation.checkInput()) {
    dni = e.target.value;
  }
});

/*
 * On submit
 */
const inputs = document.querySelectorAll(
  'input:not([type="submit"],[class="nice-select-search"])'
);
const form = document.getElementById("search-form");
let checks = [];
let client;
function validate() {
  inputs.forEach((input) => {
    checks.push(input.CustomValidation.checkInput());
  });

  return checks.every((e) => e === true);
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  validate();
  if (clientExist(dni)) {
    $("#example").dataTable().fnClearTable();
    $("#example").dataTable().fnAddData(getClient(dni));
  }
});

/**
 *
 * DataTables
 *
 */

$(document).ready(function () {
  $("#example").DataTable({
    data: client,
    columns: [{ title: "Example" }, { title: "Chavelon" }],
  });
});

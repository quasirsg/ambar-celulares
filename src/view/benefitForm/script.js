/* ----------------------------
	Get data of bd
---------------------------- */

//mocks
const arrOfClientsMock = [
  { value: "42523334", text: "42523334" },
  { value: "42523333", text: "42523333" },
];

const arrOfMultiSelectMock = [
  {
    label: "Pin de carga",
    value: "pnc",
  },
  {
    label: "Bateria",
    value: "ba",
  },
  {
    label: "Modulo",
    value: "pa",
  },
  {
    label: "Tactil",
    value: "touch",
  },
  {
    label: "Display",
    value: "display",
  },
];
/* ----------------------------

	Validity Checks

	The arrays of validity checks for each input
	Comprised of three things
		1. isInvalid() - the function to determine if the input fulfills a particular requirement
		2. invalidityMessage - the error message to display if the field is invalid
		3. element - The element that states the requirement

---------------------------- */

const clientValidityChecks = [
  {
    isInvalid: function (input) {
      const regex = /^[A-z-0-9]{2,30}$/;
      const caracters = input.value;
      const test = regex.test(caracters);
      return test ? false : true;
    },
    invalidityMessage: "Campo requerido",
    element: document.querySelector(
      'div[id="div-client"] .input-requirements li:nth-child(1)'
    ),
  },
];

const deviceValidityChecks = [
  {
    isInvalid: function (input) {
      const regex = /^[A-z-0-9]{2,15}$/;
      const caracters = input.value;
      const test = regex.test(caracters);
      return test ? false : true;
    },
    invalidityMessage: "Campo requerido",
    element: document.querySelector(
      'div[id="div-device"] .input-requirements li:nth-child(1)'
    ),
  },
];

const imeiValidityChecks = [
  {
    isInvalid: function (input) {
      const regex = /^[0-9]{0,15}$/;
      const caracters = input.value;
      const test = regex.test(caracters);
      return test ? false : true;
    },
    invalidityMessage: "Campo requerido",
    element: document.querySelector(
      'div[id="div-imei"] .input-requirements li:nth-child(1) '
    ),
  },
  {
    isInvalid: function (input) {
      const regex = /^[0-9]{15,15}$/;
      const caracters = input.value;
      const test = regex.test(caracters);
      return test ? false : true;
    },
    invalidityMessage: "Campo requerido",
    element: document.querySelector(
      'div[id="div-imei"] .input-requirements li:nth-child(2) '
    ),
  },
];
const descriptionValidityChecks = [
  {
    isInvalid: function (input) {
      const regex = /^[A-z-0-9 ]{2,255}$/;
      const caracters = input.value;
      const test = regex.test(caracters);
      return test ? false : true;
    },
    invalidityMessage: "Campo requerido",
    element: document.querySelector(
      'div[id="div-description"] .input-requirements li:nth-child(1)'
    ),
  },
];

const replacementValidityChecks = [
  {
    isInvalid: function (input) {
      const regex = /^[A-z-0-9,]{0,255}$/;
      const caracters = input.value;
      const test = regex.test(caracters);
      return test ? false : true;
    },
    invalidityMessage: "Campo requerido",
    element: document.querySelector(
      'div[id="div-replacement"] .input-requirements li:nth-child(1)'
    ),
  },
];

const entryDateValidityChecks = [
  {
    isInvalid: function (input) {
      const regex =
        /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)(?:0?2)\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
      const caracters = input.value;
      const test = regex.test(caracters);
      return test ? false : true;
    },
    invalidityMessage: "dd/mm/yyyy",
    element: document.querySelector(
      'div[id="div-entryDate"] .input-requirements li:nth-child(1)'
    ),
  },
];

const mountValidityChecks = [
  {
    isInvalid: function (input) {
      const regex = /^[0-9]{0,15}$/;
      const caracters = input.value;
      const test = regex.test(caracters);
      return test ? false : true;
    },
    invalidityMessage: "Solo numeros",
    element: document.querySelector(
      'div[id="div-mount"] .input-requirements li:nth-child(1)'
    ),
  },
];
/* ----------------------------

	Tosaster

---------------------------- */
const invalidToaster = function () {
  var alerta = document.getElementById("alert");
  alerta.style.cssText =
    "display: block; background-color: #f2dede; color: #a94442;";
  alerta.innerHTML =
    "<strong>¡Oh, chasquido!</strong> Cambia algunas cosas e intenta enviarlo de nuevo.";
  setTimeout(function () {
    alerta.style.display = "none";
  }, 1500);
};

const validToaster = function () {
  var alerta = document.getElementById("alert");
  alerta.style.cssText =
    "display: block; background-color: #dff0d8; color: #3c763d;";
  alerta.innerHTML =
    "<strong>¡Bien hecho!</strong> Guardaste el dispositivo con exito.";
  setTimeout(function () {
    alerta.style.display = "none";
  }, 2000);
};
/* ----------------------------

	Setup CustomValidation

	Setup the CustomValidation prototype for each input
	Also sets which array of validity checks to use for that input

---------------------------- */
const clientInput = document.getElementById("client");
const deviceInput = document.getElementById("device");
const imeiInput = document.getElementById("imei");
const descriptionInput = document.getElementById("description");
const replacementInput = document.getElementById("replacement");
const entryDateInput = document.getElementById("entryDate");
const mountInput = document.getElementById("mount");

[
  clientInput,
  deviceInput,
  imeiInput,
  descriptionInput,
  replacementInput,
  entryDateInput,
  mountInput,
].forEach((input) => (input.CustomValidation = new CustomValidation(input)));

clientInput.CustomValidation.validityChecks = clientValidityChecks;
deviceInput.CustomValidation.validityChecks = deviceValidityChecks;
imeiInput.CustomValidation.validityChecks = imeiValidityChecks;
descriptionInput.CustomValidation.validityChecks = descriptionValidityChecks;
replacementInput.CustomValidation.validityChecks = replacementValidityChecks;
entryDateInput.CustomValidation.validityChecks = entryDateValidityChecks;
mountInput.CustomValidation.validityChecks = mountValidityChecks;
/* ----------------------------

	NiceSelect

  ---------------------------- */

// get element

const clientSelect = document.getElementById("searchable-select-client");

// Initialize
NiceSelect.bind(clientSelect, { searchable: true, data: arrOfClientsMock });

// Append options
arrOfClientsMock.forEach((e) => {
  let option = document.createElement("option");
  option.value = e.value;
  option.text = e.text;
  clientSelect.append(option);
});

//Event Listener
clientSelect.addEventListener("change", function (e) {
  clientInput.value = e.target.value;
  clientInput.CustomValidation.checkInput();
});
/* ----------------------------

	MultiSelect

  ---------------------------- */
var instance = new SelectPure(".replacement", {
  options: arrOfMultiSelectMock,
  multiple: true, // default: false
  onChange: (value) => {
    replacementInput.value = value[0];
    console.log(value);
    replacementInput.CustomValidation.checkInput();
  },
  classNames: {
    select: "select-pure__select",
    dropdownShown: "select-pure__select--opened",
    multiselect: "select-pure__select--multiple",
    label: "select-pure__label",
    placeholder: "select-pure__placeholder",
    dropdown: "select-pure__options",
    option: "select-pure__option",
    autocompleteInput: "select-pure__autocomplete",
    selectedLabel: "select-pure__selected-label",
    selectedOption: "select-pure__option--selected",
    placeholderHidden: "select-pure__placeholder--hidden",
    optionHidden: "select-pure__option--hidden",
  },
});
/* ----------------------------

	General

---------------------------- */
const textAreaDescription = document.getElementById("text-area-description");

textAreaDescription.addEventListener("keyup", function (e) {
  descriptionInput.value = e.target.value;
  descriptionInput.CustomValidation.checkInput();
});
/* ----------------------------

	Event Listeners

---------------------------- */

const inputs = document.querySelectorAll(
  'input:not([type="submit"],[class="nice-select-search"])'
);
const submit = document.querySelector('button[type="submit"');
const form = document.getElementById("saveClient");
let checks = [];

function validate() {
  inputs.forEach((input) => {
    checks.push(input.CustomValidation.checkInput());
  });

  checks.every((e) => {
    if (e === false) {
      invalidToaster();
    }
    return e;
  });
}

submit.addEventListener("click", validate);
form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (validate()) validToaster(), console.log("ok");

  checks = [];
});

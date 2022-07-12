/* ----------------------------
	Get data of bd
---------------------------- */

//mocks
const arrOfClientsMock = [
  { value: "42523334", text: "42523334" },
  { value: "42523333", text: "42523333" },
];

/* ----------------------------

	CustomValidation prototype

	- Keeps track of the list of invalidity messages for this input
	- Keeps track of what validity checks need to be performed for this input
	- Performs the validity checks and sends feedback to the front end

---------------------------- */

function CustomValidation(input) {
  this.invalidities = [];
  this.validityChecks = [];
  //add reference to the input node
  this.inputNode = input;

  //trigger method to attach the listener
  this.registerListener();
}

CustomValidation.prototype = {
  addInvalidity: function (message) {
    this.invalidities.push(message);
  },
  getInvalidities: function () {
    return this.invalidities.join(". \n");
  },
  checkValidity: function (input) {
    for (var i = 0; i < this.validityChecks.length; i++) {
      const isInvalid = this.validityChecks[i].isInvalid(input);
      if (isInvalid) {
        this.addInvalidity(this.validityChecks[i].invalidityMessage);
      }

      const requirementElement = this.validityChecks[i].element;

      if (requirementElement) {
        if (isInvalid) {
          requirementElement.classList.add("invalid");
          requirementElement.classList.remove("valid");
        } else {
          requirementElement.classList.remove("invalid");
          requirementElement.classList.add("valid");
        }
      } // end if requirementElement
    } // end for
  },
  checkInput: function () {
    // checkInput now encapsulated

    this.inputNode.CustomValidation.invalidities = [];
    this.checkValidity(this.inputNode);

    if (
      this.inputNode.CustomValidation.invalidities.length === 0 &&
      this.inputNode.value !== ""
    ) {
      this.inputNode.setCustomValidity("");
      return true;
    } else {
      var message = this.inputNode.CustomValidation.getInvalidities();
      this.inputNode.setCustomValidity(message);
      return false;
    }
  },
  registerListener: function () {
    //register the listener here

    var CustomValidation = this;

    this.inputNode.addEventListener("input", function () {
      CustomValidation.checkInput();
    });
  },
};

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
      'label[for="client"] .input-requirements li:nth-child(1)'
    ),
  },
];

const deviceValidityChecks = [
  {
    isInvalid: function (input) {
      const regex = /^[A-z-0-9]{2,30}$/;
      const caracters = input.value;
      const test = regex.test(caracters);
      return test ? false : true;
    },
    invalidityMessage: "Campo requerido",
    element: document.querySelector(
      'label[for="device"] .input-requirements li:nth-child(1)'
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
      'label[for="imei"] .input-requirements li:nth-child(1) '
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
      'label[for="imei"] .input-requirements li:nth-child(2) '
    ),
  },
];
const descriptionValidityChecks = [
  {
    isInvalid: function (input) {
      const regex = /^[A-z-0-9]{2,30}$/;
      const caracters = input.value;
      const test = regex.test(caracters);
      return test ? false : true;
    },
    invalidityMessage: "Campo requerido",
    element: document.querySelector(
      'label[for="description"] .input-requirements li:nth-child(1)'
    ),
  },
];

/* ----------------------------

	Setup CustomValidation

	Setup the CustomValidation prototype for each input
	Also sets which array of validity checks to use for that input

---------------------------- */
const clientInput = document.getElementById("client");
const deviceInput = document.getElementById("device");
const imeiInput = document.getElementById("imei");
const descriptionInput = document.getElementById("description");

[clientInput, deviceInput, imeiInput, descriptionInput].forEach(
  (input) => (input.CustomValidation = new CustomValidation(input))
);

clientInput.CustomValidation.validityChecks = clientValidityChecks;
deviceInput.CustomValidation.validityChecks = deviceValidityChecks;
imeiInput.CustomValidation.validityChecks = imeiValidityChecks;
descriptionInput.CustomValidation.validityChecks = descriptionValidityChecks;
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

  return checks.every((e) => e === true);
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (validate()) console.log("ok");

  checks = [];
});

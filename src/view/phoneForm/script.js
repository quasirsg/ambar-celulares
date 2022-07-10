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
    } else {
      var message = this.inputNode.CustomValidation.getInvalidities();
      this.inputNode.setCustomValidity(message);
    }
  },
  registerListener: function () {
    //register the listener here

    var CustomValidation = this;

    this.inputNode.addEventListener("keyup", function () {
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

const modeloValidityChecks = [
  {
    isInvalid: function (input) {
      const regex = /^[A-z-0-9]{2,30}$/;
      const caracters = input.value;
      const test = regex.test(caracters);
      return test ? false : true;
    },
    invalidityMessage: "Ej: Samsung, sin espacios",
    element: document.querySelector(
      'label[for="modelo"] .input-requirements li:nth-child(1)'
    ),
  },
];

const marcaValidityChecks = [
  {
    isInvalid: function (input) {
      const regex = /^[A-z-0-9]{4,30}$/;
      const caracters = input.value;
      const test = regex.test(caracters);
      return test ? false : true;
    },
    invalidityMessage: "Ej: g532m, sin espacios",
    element: document.querySelector(
      'label[for="marca"] .input-requirements li:nth-child(1)'
    ),
  },
];

const nombreValidityChecks = [
  {
    isInvalid: function (input) {
      const regex = /^[A-z-0-9 ]{4,30}$/;
      const caracters = input.value;
      const test = regex.test(caracters);
      return test ? false : true;
    },
    invalidityMessage: "Ej: j7 2016",
    element: document.querySelector(
      'label[for="nombre"] .input-requirements li:nth-child(1)'
    ),
  },
];

/* ----------------------------

	Setup CustomValidation

	Setup the CustomValidation prototype for each input
	Also sets which array of validity checks to use for that input

---------------------------- */

const modeloInput = document.getElementById("modelo");
const marcaInput = document.getElementById("marca");
const nombreInput = document.getElementById("nombre");

modeloInput.CustomValidation = new CustomValidation(modeloInput);
modeloInput.CustomValidation.validityChecks = modeloValidityChecks;

marcaInput.CustomValidation = new CustomValidation(marcaInput);
marcaInput.CustomValidation.validityChecks = marcaValidityChecks;

nombreInput.CustomValidation = new CustomValidation(nombreInput);
nombreInput.CustomValidation.validityChecks = nombreValidityChecks;

/* ----------------------------

	Event Listeners

---------------------------- */

var inputs = document.querySelectorAll('input:not([type="submit"])');

var submit = document.querySelector('button[type="submit"');
var form = document.getElementById("saveClient");

function validate() {
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].CustomValidation.checkInput();
  }
}

submit.addEventListener("click", validate);
form.addEventListener("submit", function (e) {
  e.preventDefault();
  validate();
});

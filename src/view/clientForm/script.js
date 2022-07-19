/* Errors */
const errorsMap = new Map();

errorsMap.set("ER_DUP_ENTRY", "Error el dni ya esta registrado");
errorsMap.set("dni_incomplete","Porfavor ingrese su dni correctamente para poder avanzar");
errorsMap.set("name_incomplete","Porfavor ingrese su nombre correctamente para poder avanzar");
errorsMap.set("surname_incomplete","Porfavor ingrese su apellido correctamente para poder avanzar");
errorsMap.set("phoneNumber_incomplete","Porfavor ingrese su telefono correctamente para poder avanzar");


/*Function to return the client info to method saveClient from DB*/
function clientInfo(dni, name, surname, phoneNumber) {
  return {
    dni: Number(dni),
    name,
    surname,
    phone_number: phoneNumber,
  };
}

function resetForm() {
  form.reset();
}
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

    this.inputNode.addEventListener("mousemove", function () {
      CustomValidation.checkInput();
    });
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

const dniValidityChecks = [
  {
    isInvalid: function (input) {
      return input.value.length > 8;
    },
    invalidityMessage: "Un dni debe ser menor a los 9 digitos",
    element: document.querySelector(
      'div[id="div-dni"] .input-requirements li:nth-child(1)'
    ),
  },
  {
    isInvalid: function (input) {
      const regex = /^[0-9]{7,8}$/;
      const caracters = input.value;
      const test = regex.test(caracters);
      return test ? false : true;
    },
    invalidityMessage: "Un dni solo tiene numeros",
    element: document.querySelector(
      'div[id="div-dni"] .input-requirements li:nth-child(2)'
    ),
  },
];

const nameValidityChecks = [
  {
    isInvalid: function (input) {
      const regex = /^[A-z]{4,30}$/;
      const caracters = input.value;
      const test = regex.test(caracters);
      return test ? false : true;
    },
    invalidityMessage: "Un nombre solo contiene letras",
    element: document.querySelector(
      'div[id="div-name"] .input-requirements li:nth-child(1)'
    ),
  },
];

const surnameValidityChecks = [
  {
    isInvalid: function (input) {
      const regex = /^[A-z]{4,30}$/;
      const caracters = input.value;
      const test = regex.test(caracters);
      return test ? false : true;
    },
    invalidityMessage: "Un apellido solo contiene letras",
    element: document.querySelector(
      'div[id="div-surname"] .input-requirements li:nth-child(1)'
    ),
  },
];

const phoneNumberValidtyChecks = [
  {
    isInvalid: function (input) {
      const regex = /^[0-9]{10,10}$/;
      const caracters = input.value;
      const test = regex.test(caracters);
      return test ? false : true;
    },
    invalidityMessage: "Un numero de telefono solo contiene numeros",
    element: document.querySelector(
      'div[id="div-phoneNumber"] .input-requirements li:nth-child(1)'
    ),
  },
];

const invalidToaster = function (error) {
  const errorText = errorsMap.get(error.code);
  var alerta = document.getElementById("alert");
  alerta.style.cssText =
    "display: block; background-color: #f2dede; color: #a94442;";
  alerta.innerHTML = "<strong>¡Oh, chasquido! </strong>" + `${errorText}` + ".";
  setTimeout(function () {
    alerta.style.display = "none";
  }, 1500);
};

const validToaster = function () {
  var alerta = document.getElementById("alert");
  alerta.style.cssText =
    "display: block; background-color: #dff0d8; color: #3c763d;";
  alerta.innerHTML =
    "<strong>¡Bien hecho!</strong> Guardaste el usuario con exito.";
  setTimeout(function () {
    alerta.style.display = "none";
  }, 2000);
};
/* ----------------------------

	Setup CustomValidation

	Setup the CustomValidation prototype for each input
	Also sets which array of validity checks to use for that input

---------------------------- */

const dniInput = document.getElementById("dni");
const nameInput = document.getElementById("name");
const surnameInput = document.getElementById("surname");
const phoneNumberInput = document.getElementById("phoneNumber");

[dniInput, nameInput, surnameInput, phoneNumberInput].forEach(
  (input) => (input.CustomValidation = new CustomValidation(input))
);

dniInput.CustomValidation.validityChecks = dniValidityChecks;
nameInput.CustomValidation.validityChecks = nameValidityChecks;
surnameInput.CustomValidation.validityChecks = surnameValidityChecks;
phoneNumberInput.CustomValidation.validityChecks = phoneNumberValidtyChecks;
/* ----------------------------

	Event Listeners

---------------------------- */

var inputs = document.querySelectorAll('input:not([type="submit"])');

var submit = document.querySelector('button[type="submit"');
var form = document.getElementById("saveClient");

function validate() {
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].CustomValidation.checkInput();
    if (inputs[i].CustomValidation.invalidities.length !== 0) {
      invalidToaster({
        code: `${inputs[i].id}`+"_incomplete",
      }); break/*realizar los errores del input y condicional para el toaster invalid*/
    }
  }
}

submit.addEventListener("click", validate);
form.addEventListener("submit", async function (e) {
  try {
    e.preventDefault();
    validate();
    const client = clientInfo(
      dniInput.value,
      nameInput.value,
      surnameInput.value,
      phoneNumberInput.value
    );
    resetForm();
    await saveClient(client);
    validToaster();
    new Notification("Registro Exitoso", {body: "Haz ingresado con exito un nuevo cliente"})
  } catch (error) {
    invalidToaster(error);
  }
});

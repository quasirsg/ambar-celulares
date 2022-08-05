/* ----------------------------
	Form and inputs
---------------------------- */
const dniInput = document.getElementById("dni");
const nameInput = document.getElementById("name");
const surnameInput = document.getElementById("surname");
const phoneNumberInput = document.getElementById("phoneNumber");
var inputs = document.querySelectorAll('input:not([type="submit"])');
var submit = document.querySelector('button[type="submit"');
var form = document.getElementById("saveClient");

function resetForm() {
  form.reset();
}
function validate() {
  var check = [];
    inputs.forEach((input) => {
    input.CustomValidation.checkInput();
    if (input.CustomValidation.invalidities.length !== 0) {
      check.push(input.CustomValidation)
      /*if (check.length > 3) {
        var allCamps = "All"
      return invalidToaster({
          code: `${allCamps}` + "_incomplete",
        });
      }else{
        return invalidToaster({
          code: `${input.id}` + "_incomplete",
        });} */
    }
  });

  if (check.length > 3) {
    var allCamps = "All"
    invalidToaster({
        code: `${allCamps}` + "_incomplete",
      });
  }else{
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].CustomValidation.checkInput();
      if (inputs[i].CustomValidation.invalidities.length === 1) {
        return invalidToaster({
          code: `${inputs[i].id}` + "_incomplete",
        });
      }
    }
  }
}

/* Errors */
const errorsMap = new Map();

errorsMap.set("ER_DUP_ENTRY", "Error el dni ya esta registrado");
errorsMap.set(
  "dni_incomplete",
  "Porfavor ingrese su dni correctamente para poder avanzar"
);
errorsMap.set(
  "name_incomplete",
  "Porfavor ingrese su nombre correctamente para poder avanzar"
);
errorsMap.set(
  "surname_incomplete",
  "Porfavor ingrese su apellido correctamente para poder avanzar"
);
errorsMap.set(
  "phoneNumber_incomplete",
  "Porfavor ingrese su telefono correctamente para poder avanzar"
);
errorsMap.set(
  "All_incomplete",
  "Porfavor complete todos los campos correctamente para poder avanzar"
);

/* ----------------------------
	BD
---------------------------- */

// Method to create a client plain object
function clientInfo(dni, name, surname, phoneNumber) {
  return {
    dni: Number(dni),
    name,
    surname,
    phone_number: phoneNumber,
  };
}

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

/* ----------------------------
	Toaster setup
---------------------------- */
const invalidToaster = function (error) {
  const errorText = errorsMap.get(error.code);
  var alerta = document.getElementById("alert");
  alerta.style.cssText =
    "display: block; background-color: #f2dede; color: #a94442;";
  alerta.innerHTML =
    "<strong>¡Algo salió mal! </strong>" + `${errorText}` + ".";
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

    new Notification("Registro Exitoso", {
      body: "Haz ingresado con exito un nuevo cliente",
    });
  } catch (error) {
    invalidToaster(error);
  }
});

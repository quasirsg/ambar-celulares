let user;
let data;
let secret;

(async function re() {
  user = await get2faUser();
  data = user.data;
  secret = data.secret;
  const url = await generateQr(secret.otpauth_url);
  $("#qr-img").attr("src", url);
})();
/* Control Errors*/

const errorsMap = new Map();

errorsMap.set(
  "codes_incomplete",
  "Porfavor ingrese su codigo correctamente para poder avanzar"
);
errorsMap.set(
  "code_incorrect",
  "El codigo que ingreso es incorrecto. Porfavor ingrese su codigo nuevamente para poder avanzar"
);

/* ----------------------------

	Validity Checks

	The arrays of validity checks for each input
	Comprised of three things
		1. isInvalid() - the function to determine if the input fulfills a particular requirement
		2. invalidityMessage - the error message to display if the field is invalid
		3. element - The element that states the requirement

---------------------------- */

const codesValidityChecks = [
  {
    isInvalid: function (input) {
      return input.value.length < 1;
    },
    invalidityMessage: "Requerido",
    element: document.querySelector(
      'div[id="div-codes"] .input-requirements li:nth-child(1)'
    ),
  },
];

/* Toaster */

const invalidToaster = function (error) {
  const errorText = errorsMap.get(error.code);
  var alerta = document.getElementById("alert");
  alerta.style.cssText =
    "display: block; background-color: #f2dede; color: #a94442;";
  alerta.innerHTML =
    "<strong>¡Algo salió mal! </strong>" + `${errorText}` + ".";
  setTimeout(function () {
    alerta.style.display = "none";
  }, 4500);
};

const validToaster = function () {
  var alerta = document.getElementById("alert");
  alerta.style.cssText =
    "display: block; background-color: #dff0d8; color: #3c763d;";
  alerta.innerHTML =
  "<strong>¡Bien hecho!</strong> Guardaste el usuario con exito.";
};

// Funcion que reinicia el formulario y desactiva el boton de submit y el input

function activateButton() {
  form.reset();
  inputs[0].disabled="disabled";
  formButton.disabled="disabled";
  imageIcon.style.cssText="display: none";
  setTimeout(function () {
    location.href = "../index.html"
  }, 4500);
}

/* ----------------------------
	Setup CustomValidation

	Setup the CustomValidation prototype for each input
	Also sets which array of validity checks to use for that input
---------------------------- */

const codesInput = document.getElementById("codes");

codesInput.CustomValidation = new CustomValidation(codesInput);
codesInput.CustomValidation.validityChecks = codesValidityChecks;


/* ----------------------------
	Final
---------------------------- */
var form = document.getElementById("verify-code");
var inputs = document.querySelectorAll('input:not([type="submit"])');
var formButton = document.getElementById("form__button");
var submit = document.querySelector('button[type="submit"');
var imageIcon = document.getElementById("icon")

function validate() {
  inputs.forEach((input) => {
    input.CustomValidation.checkInput();

    if (input.CustomValidation.invalidities.length !== 0) {
      invalidToaster({
        code: `${input.id}` + "_incomplete",
      });
    }
  });
}

submit.addEventListener("click", validate);
form.addEventListener("submit", async function (e) {
  try {
    e.preventDefault();
    const token = codesInput.value;
    const verified = await verifyUser(data.id, token);
    validate()
    if (verified) {
      validToaster()
      activateButton();
      save2faUserInLocalStorage(data.id);
    }else{
      invalidToaster({code: "code_incorrect"})
    }
  } catch (error) {
    invalidToaster(error)
  }
});

$(document).ready(function () {});

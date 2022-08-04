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
const form = document.getElementById("verify-code");

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

form.addEventListener("submit", async function (e) {
  try {
    e.preventDefault();

    const token = codesInput.value;
    const verified = await verifyUser(data.id, token);

    if (verified) {
      save2faUserInLocalStorage(data.id);
    }
  } catch (error) {
    console.log(error);
  }
});

$(document).ready(function () {});

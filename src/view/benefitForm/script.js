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

const imeiValidityChecks = [
  {
    isInvalid: function (input) {
      const regex = /^[0-9]{15,15}$/;
      const caracters = input.value;
      const test = regex.test(caracters);
      return test ? false : true;
    },
    invalidityMessage: "Un imei contiene 15 digitos",
    element: document.querySelector(
      'label[for="imei"] .input-requirements li:nth-child(1)'
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
      'label[for="entryDate"] .input-requirements li:nth-child(1)'
    ),
  },
];
/* ----------------------------

	Select

---------------------------- */
$(".dropdown").click(function () {
  $(this).attr("tabindex", 1).focus();
  $(this).toggleClass("active");
  $(this).find(".dropdown-menu").slideToggle(300);
});
$(".dropdown").focusout(function () {
  $(this).removeClass("active");
  $(this).find(".dropdown-menu").slideUp(300);
});
$(".dropdown .dropdown-menu li").click(function () {
  $(this).parents(".dropdown").find("span").text($(this).text());
  $(this).parents(".dropdown").find("input").attr("value", $(this).attr("id"));
});

/* ----------------------------

Multi Select

---------------------------- */
$(".dropdown-multi dt a").on("click", function () {
  $(".dropdown-multi dd ul").slideToggle("fast");
});

$(".dropdown-multi dd ul li a").on("click", function () {
  $(".dropdown-multi dd ul").hide();
});

function getSelectedValue(id) {
  return $("#" + id)
    .find("dt a span.value")
    .html();
}

$(document).bind("click", function (e) {
  var $clicked = $(e.target);
  if (!$clicked.parents().hasClass("dropdown-multi"))
    $(".dropdown-multi dd ul").hide();
});

$('.mutliSelect input[type="checkbox"]').on("click", function () {
  var title = $(this) //step 1
      .closest(".mutliSelect")
      .find('input[type="checkbox"]')
      .val(),
    title = $(this).val() + ",";

  if ($(this).is(":checked")) {
    var html = '<span title="' + title + '">' + title + "</span>";
    $(".multiSel").append(html); // here value (step 2)
    $(".hida").hide();
  } else {
    $('span[title="' + title + '"]').remove();
    var ret = $(".hida");
    $(".dropdown-multi dt a").append(ret);
  }
});

/* ----------------------------

	Setup CustomValidation

	Setup the CustomValidation prototype for each input
	Also sets which array of validity checks to use for that input

---------------------------- */
const clientInput = document.getElementById("client");
const deviceInput = document.getElementById("device");
const imeiInput = document.getElementById("imei");
const descriptionInput = document.getElementById("description");
const entryDateInput = document.getElementById("entryDate");
const spans = document.getElementById("spanOfMulti");

const checkboxes = Array.from(document.getElementsByClassName("cheboxes"));
[
  clientInput,
  deviceInput,
  imeiInput,
  entryDateInput,
  descriptionInput,
  entryDateInput,
].forEach((e) => (e.CustomValidation = new CustomValidation(e)));

checkboxes.forEach((e) => (e.CustomValidation = new CustomValidation(e)));

imeiInput.CustomValidation.validityChecks = imeiValidityChecks;
entryDateInput.CustomValidation.validityChecks = entryDateValidityChecks;
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
  console.log(spans);
});

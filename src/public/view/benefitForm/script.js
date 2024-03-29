/* ----------------------------
	Get data of bd
---------------------------- */
$(document).ready(async function () {
  const dnis = await getDni();
  const dnisFor = dnis.map((e) => {
    return {
      value: e.dni.toString(),
      text: e.dni.toString(),
    };
  });

  /* ----------------------------
	BD
---------------------------- */
  //Function to reset form

  function resetForm() {
    form.reset();
    niceSelectInstance.clear();
  }

  // Method to create a benefit plain object
  function benefitInfo(
    dni,
    device,
    imei,
    description,
    entry_date,
    paid,
    mount
  ) {
    controlInputs(dni, description);
    return {
      dni: Number(dni),
      device,
      imei,
      description,
      entry_date: String(entry_date).replace(/[,.-]/gi, "/"),
      paid: Number(paid),
      mount: Number(mount),
      fixed: false,
      retired: false,
    };
  }

  function controlInputs(dni, description) {
    if (dni === "null")
      throw new Error(invalidToaster({ code: "client_incomplete" }));
    if (description === "")
      throw new Error(invalidToaster({ code: "description_incomplete" }));
  }

  // Error Control and Validate

  function validate() {
    var check = [];
    inputs.forEach((input) => {
      input.CustomValidation.checkInput();
      if (input.CustomValidation.invalidities.length !== 0) {
        check.push(input.CustomValidation);
      }
    });

    if (check.length === 5) {
      var allCamps = "All";
      invalidToaster({
        code: `${allCamps}` + "_incomplete",
      });
    } else {
      for (var i = 1; i < inputs.length; i++) {
        inputs[i].CustomValidation.checkInput();
        if (inputs[i].CustomValidation.invalidities.length !== 0) {
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
    "client_incomplete",
    "Porfavor ingrese el dni correctamente para poder avanzar"
  );
  errorsMap.set(
    "device_incomplete",
    "Porfavor ingrese el nombre del dispositivio correctamente para poder avanzar"
  );
  errorsMap.set(
    "imei_incomplete",
    "Porfavor ingrese el imei correctamente para poder avanzar"
  );
  errorsMap.set(
    "paid_incomplete",
    "Porfavor ingrese las partes a cambiar correctamente para poder avanzar"
  );
  errorsMap.set(
    "entryDate_incomplete",
    "Porfavor ingrese una fecha correctamente para poder avanzar"
  );
  errorsMap.set(
    "mount_incomplete",
    "Porfavor ingrese el monto correctamente para poder avanzar"
  );
  errorsMap.set(
    "description_incomplete",
    "Porfavor ingrese una descripcion correctamente para poder avanzar"
  );
  errorsMap.set(
    "All_incomplete",
    "Porfavor complete todos los campos correctamente para poder avanzar"
  );

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
        const regex = /^[A-z-0-9]{5,30}$/;
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
        const regex = /^[A-z-0-9 ]{2,15}$/;
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
        const regex = /^[0-9]{2,15}$/;
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
      invalidityMessage: "",
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

  const paidValidityChecks = [
    {
      isInvalid: function (input) {
        const regex = /^[0-9]{1,15}$/;
        const caracters = input.value;
        const test = regex.test(caracters);
        return test ? false : true;
      },
      invalidityMessage: "Solo numeros",
      element: document.querySelector(
        'div[id="div-paid"] .input-requirements li:nth-child(1)'
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
        const regex = /^[0-9]{1,15}$/;
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
  const invalidToaster = async function (error) {
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
  const paidInput = document.getElementById("paid");
  const entryDateInput = document.getElementById("entryDate");
  const mountInput = document.getElementById("mount");

  [
    clientInput,
    deviceInput,
    imeiInput,
    descriptionInput,
    paidInput,
    entryDateInput,
    mountInput,
  ].forEach((input) => (input.CustomValidation = new CustomValidation(input)));

  clientInput.CustomValidation.validityChecks = clientValidityChecks;
  deviceInput.CustomValidation.validityChecks = deviceValidityChecks;
  imeiInput.CustomValidation.validityChecks = imeiValidityChecks;
  descriptionInput.CustomValidation.validityChecks = descriptionValidityChecks;
  paidInput.CustomValidation.validityChecks = paidValidityChecks;
  entryDateInput.CustomValidation.validityChecks = entryDateValidityChecks;
  mountInput.CustomValidation.validityChecks = mountValidityChecks;
  /* ----------------------------

	NiceSelect

  ---------------------------- */

  // get element

  const clientSelect = document.getElementById("searchable-select-client");

  // Initialize
  const niceSelectInstance = NiceSelect.bind(clientSelect, {
    searchable: true,
    data: dnisFor,
  });

  // Append options

  dnisFor.forEach((e) => {
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

  var inputs = document.querySelectorAll(
    /* 'input:not([type="submit"])', */
    'input:not([class="nice-select-search"])'
  );
  var submit = document.querySelector('button[type="submit"');
  var form = document.getElementById("saveClient");

  submit.addEventListener("click", validate);
  form.addEventListener("submit", async function (e) {
    try {
      e.preventDefault();
      validate();
      const benefit = benefitInfo(
        clientInput.value,
        deviceInput.value,
        imeiInput.value,
        descriptionInput.value,
        entryDateInput.value,
        paidInput.value,
        mountInput.value
      );
      validToaster();
      new Notification("Registro Exitoso", {
        body: "Haz ingresado con exito un nuevo cliente",
      });
      resetForm();
      await saveBenefit(benefit)
    } catch (error) {
      console.log(error);
    }
  });
});

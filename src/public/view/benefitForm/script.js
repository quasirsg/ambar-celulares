/* ----------------------------
  Get data of bd
---------------------------- */
$(document).ready(async function () {
  const dnis = await getAllDnis();
  const dnisFor = dnis.map((e) => {
    return {
      value: e.dni.toString(),
      text: e.dni.toString(),
    };
  });
  const brands = await getPhoneBrands();
  const brandsFor = brands.map((e) => {
    return {
      value: e.name,
      text: e.name,
    }
  });

  let dni;

  /* ----------------------------
  BD
---------------------------- */
  //Function to reset form

  function resetForm() {
    form.reset();
    niceSelectInstance.clear();
    niceSelectInstanceBrand.clear();
  }

  // Method to create a benefit plain object
  function benefitInfo(
    dni,
    device,
    imei,
    problem,
    date_received_phone,
    brand,
    deposited_money,
    total_amount_for_service
  ) {
    controlInputs(dni, problem);
    return {
      dni: Number(dni),
      device,
      imei,
      problem,
      date_received_phone,
      brand,
      deposited_money: Number(deposited_money),
      total_amount_for_service: Number(total_amount_for_service),
      fixed: false,
      retired: false,
    };
  }

  // Function to assign the current date
  function setCurrentDate() {
    return Number(moment().format('YYYYMMDD'));
  }

  function controlInputs(dni, problem) {
    if (dni === NaN)
      (invalidToaster({ code: "client_incomplete" }));
    if (problem === "")
      (invalidToaster({ code: "problem_incomplete" }));
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
    "brand_incomplete",
    "Porfavor ingrese la marca del dispositivio correctamente para poder avanzar"
  );
  errorsMap.set(
    "imei_incomplete",
    "Porfavor ingrese el imei correctamente para poder avanzar"
  );
  errorsMap.set(
    "deposited_money_incomplete",
    "Porfavor ingrese el deposito correctamente para poder avanzar"
  );
  errorsMap.set(
    "total_amount_incomplete",
    "Porfavor ingrese el importe correctamente para poder avanzar"
  );
  errorsMap.set(
    "problem_incomplete",
    "Porfavor ingrese un problema correctamente para poder avanzar"
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
        const regex = /^[0-9]{7,8}$/;
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
  const problemValidityChecks = [
    {
      isInvalid: function (input) {
        const regex = /^[A-z0-9 ,.!?'"@#$%^&*()_+\-=\[\]{};:"\\|,.<>\/?]{2,255}$/;
        const caracters = input.value;
        const test = regex.test(caracters);
        return test ? false : true;
      },
      invalidityMessage: "Campo requerido",
      element: document.querySelector(
        'div[id="div-problem"] .input-requirements li:nth-child(1)'
      ),
    },
  ];

  const depositedMoneyValidityChecks = [
    {
      isInvalid: function (input) {
        const regex = /^[0-9]{1,15}$/;
        const caracters = input.value;
        const test = regex.test(caracters);
        return test ? false : true;
      },
      invalidityMessage: "Solo numeros",
      element: document.querySelector(
        'div[id="div-deposited_money"] .input-requirements li:nth-child(1)'
      ),
    },
  ];

  const brandValidityChecks = [
    {
      isInvalid: function (input) {
        const regex = /^[A-z-0-9]{2,30}$/;
        const caracters = input.value;
        const test = regex.test(caracters);
        return test ? false : true;
      },
      invalidityMessage: "Campo requerido",
      element: document.querySelector(
        'div[id="div-brand"] .input-requirements li:nth-child(1)'
      ),
    },
  ];

  const totalAmountValidityChecks = [
    {
      isInvalid: function (input) {
        const regex = /^[0-9]{1,15}$/;
        const caracters = input.value;
        const test = regex.test(caracters);
        return test ? false : true;
      },
      invalidityMessage: "Solo numeros",
      element: document.querySelector(
        'div[id="div-total_amount"] .input-requirements li:nth-child(1)'
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
  const problemInput = document.getElementById("problem");
  const depositedMoneyInput = document.getElementById("deposited_money");
  const brandInput = document.getElementById("brand");
  const totalAmountInput = document.getElementById("total_amount");

  [
    clientInput,
    deviceInput,
    imeiInput,
    problemInput,
    depositedMoneyInput,
    brandInput,
    totalAmountInput,
  ].forEach((input) => (input.CustomValidation = new CustomValidation(input)));

  clientInput.CustomValidation.validityChecks = clientValidityChecks;
  deviceInput.CustomValidation.validityChecks = deviceValidityChecks;
  imeiInput.CustomValidation.validityChecks = imeiValidityChecks;
  problemInput.CustomValidation.validityChecks = problemValidityChecks;
  depositedMoneyInput.CustomValidation.validityChecks = depositedMoneyValidityChecks;
  brandInput.CustomValidation.validityChecks = brandValidityChecks;
  totalAmountInput.CustomValidation.validityChecks = totalAmountValidityChecks;
  /* ----------------------------

  NiceSelect

  ---------------------------- */

  // get element

  const clientSelect = document.getElementById("searchable-select-client");
  const brandSelect = document.getElementById("searchable-select-brand")

  // Initialize
  const niceSelectInstance = NiceSelect.bind(clientSelect, {
    searchable: true,
    data: dnisFor,
  });

  const niceSelectInstanceBrand = NiceSelect.bind(brandSelect, {
    searchable: true,
    data: brandsFor,
  })


  // Append options

  dnisFor.forEach((e) => {
    let option = document.createElement("option");
    option.value = e.value;
    option.text = e.text;
    clientSelect.append(option);
  });

  brandsFor.forEach((e) => {
    let option = document.createElement("option");
    option.value = e.value;
    option.text = e.text;
    brandSelect.append(option);
  })

  //Event Listener
  clientSelect.addEventListener("change", function (e) {
    dni = clientInput.value
    clientInput.value = e.target.value;
    clientInput.CustomValidation.checkInput();
  });

  brandSelect.addEventListener("change", function (e) {
    brandInput.value = e.target.value;
    brandInput.CustomValidation.checkInput();
  });

  brandInput.addEventListener("input", function () {
    const hasText = brandInput.value.trim().length > 0;
    if (hasText) {
      niceSelectInstanceBrand.disable();
    } else {
      niceSelectInstanceBrand.enable();
    }
  });
  /* ----------------------------

  General

---------------------------- */
  const textAreaProblem = document.getElementById("text-area-problem");

  textAreaProblem.addEventListener("keyup", function (e) {
    problemInput.value = e.target.value;
    problemInput.CustomValidation.checkInput();
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
        problemInput.value,
        setCurrentDate(),
        brandInput.value,
        depositedMoneyInput.value,
        totalAmountInput.value
      );

      if (dni !== undefined) {
        validToaster();
        new Notification("Registro Exitoso", {
          body: "Haz ingresado con exito un nuevo cliente",
        });
        resetForm();
        await saveBenefit(benefit);
      } else {
        (invalidToaster({ code: "client_incomplete" }))
      }
    } catch (error) {
      console.log(error);
    }
  });
});

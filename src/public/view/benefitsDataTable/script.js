// General
async function clientExist(dni) {
  let exists = await getClient(dni);

  return exists.length !== 0;
}

async function getBenefitArr(dni) {
  const benefits = await getBenefits(dni);
  const benefitsArr = benefits.map((value) => Object.values(value));
  return benefitsArr;
}

async function reloadData(dni) {
  if (await clientExist(dni)) {
    const benefitsArr = await getBenefitArr(dni);
    $("#example").dataTable().fnClearTable();
    $("#example").dataTable().fnAddData(benefitsArr);
  }
}

function validateIfChecksComeTrue(checks, position, action, columnName) {
  Array.from(checks).forEach((e) => {
    let valuesArr = e.value.split(",");
    let length = valuesArr.length;
    if (valuesArr[position] == true) e.checked = true;
    if (e.checked == true) e.disabled = "disabled";
    action(e, valuesArr, length, columnName);
  });
}

function addUpdateStateToEventClick(e, valuesArr, length, columnName) {
  e.addEventListener("click", async () => {
    e.disabled = "disabled";
    await updateChecks(valuesArr[length - 1], columnName);
  });
}

function toggleModals() {
  const modalAForm = document.getElementById("modal-a-form");

  modalAForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    $("#myModalNorm").modal("hide");
    $("#myModalb").modal("show");
  });
}

/*
 * Search
 */

const searchInput = document.getElementById("search");
let dni;

searchInput.addEventListener("change", function (e) {
  if (verifyIsValidDni(e)) {
    dni = e.target.value; 
  }
});

/*
 * On submit
 */
const form = document.getElementById("search-form");
let checks = [];
let client;

function verifyIsValidDni(e) {
  return (
    e.target.value.length >= 7 &&
    e.target.value.length <= 9 &&
    !isNaN(e.target.value)
  );
}

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  await reloadData(dni);
  toggleModals();
  const checksOfRetired = document.getElementsByClassName("checks_of_retired");
  const checksOfPaidOut = document.getElementsByClassName("checks_of_paid_out");
  const checksOfFixed = document.getElementsByClassName("checks_of_fixed");
  validateIfChecksComeTrue(
    checksOfRetired,
    7,
    addUpdateStateToEventClick,
    "fixed"
  );
  validateIfChecksComeTrue(
    checksOfPaidOut,
    8,
    addUpdateStateToEventClick,
    "paid_out"
  );
  validateIfChecksComeTrue(
    checksOfFixed,
    9,
    addUpdateStateToEventClick,
    "retired"
  );
});

/**
 *
 * DataTables
 *
 */
$(document).ready(function () {
  $("#example").DataTable({
    data: client,
    columns: [
      { title: "Imei" },
      { title: "Contacto" },
      { title: "Dispositivo" },
      { title: "Descripcion" },
      { title: "Cambios" },
      { title: "Entrada" },
      {
        title: "Monto",
        data: null,
        className: "text-center",
        render: function (data, type, full, meta) {
          return `
          <button class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModalNorm">
              ${data[6]}
          </button>
          <!-- Modal -->
          <div
            class="modal fade"
            id="myModalNorm"
            tabindex="-1"
            role="dialog"
            aria-labelledby="myModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <!-- Modal Header -->
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal">
                    <span aria-hidden="true">&times;</span>
                    <span class="sr-only">Close</span>
                  </button>
                  <h4 class="modal-title" id="myModalLabel">Modal title</h4>
                </div>
      
                <!-- Modal Body -->
                <div class="modal-body">
                  <form role="form" id="modal-a-form">
                    <div class="form-group">
                      <label for="exampleInputEmail1">Code</label>
                      <input
                        type="email"
                        class="form-control"
                        id="code"
                        placeholder="Enter 2fa code"
                      />
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                  </form>
                </div>
      
                <!-- Modal Footer -->
                <div class="modal-footer">
                  <button type="button" class="btn btn-default" data-dismiss="modal">
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Modal 2-->
          <div
            class="modal fade"
            id="myModalb"
            tabindex="-1"
            role="dialog"
            aria-labelledby="myModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <!-- Modal Header -->
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal">
                    <span aria-hidden="true">&times;</span>
                    <span class="sr-only">Close</span>
                  </button>
                  <h4 class="modal-title" id="myModalLabel">Modal b</h4>
                </div>
      
                <!-- Modal Body -->
                <div class="modal-body">
                  <form role="form">
                    <div class="form-group">
                      <label for="exampleInputEmail1">Code</label>
                      <input
                        type="email"
                        class="form-control"
                        id="code"
                        placeholder="Enter 2fa code"
                      />
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                  </form>
                </div>
      
                <!-- Modal Footer -->
                <div class="modal-footer">
                  <button type="button" class="btn btn-default" data-dismiss="modal">
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          `;
        },
      },
      {
        title: "Arreglado",
        targets: 7,
        data: null,
        className: "text-center",
        searchable: false,
        orderable: false,
        render: function (data, type, full, meta) {
          return (
            '<input type="checkbox" class="checks_of_retired" name="check" value="' +
            data +
            '">'
          );
        },
        width: "1%",
      },
      {
        title: "Pagado",
        targets: 7,
        data: null,
        className: "text-center",
        searchable: false,
        orderable: false,
        render: function (data, type, full, meta) {
          return (
            '<input type="checkbox" class="checks_of_paid_out" name="check" value="' +
            data +
            '">'
          );
        },
        width: "1%",
      },
      {
        title: "Retirado",
        targets: 7,
        data: null,
        className: "text-center",
        searchable: false,
        orderable: false,
        render: function (data, type, full, meta) {
          return (
            '<input type="checkbox" class="checks_of_fixed" name="check" value="' +
            data +
            '">'
          );
        },
        width: "1%",
      },
    ],
  });
});

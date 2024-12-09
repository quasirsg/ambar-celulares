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
      { title: "Dispositivo" },
      {
        title: "Problema",
        data: null,
        className: "text-center",
        render: function (data, type, row, meta) {
          return `
            <button class="btn btn-primary btn-lg problem-button" data-toggle="modal" data-target="#problemModal" value="${data[2]}">
              Ampliar
            </button>
      
            <!-- Modal -->
            <div
              class="modal fade"
              id="problemModal"
              tabindex="-1"
              role="dialog"
              aria-labelledby="problemModalLabel"
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
                    <h4 class="modal-title" id="problemModalLabel">Descripción del Problema</h4>
                  </div>
          
                  <!-- Modal Body -->
                  <div class="modal-body">
                    <p id="problem-input"></p>
                  </div>
          
                  <!-- Modal Footer -->
                  <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">
                      Cerrar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          `;
        },
      },
      { title: "F. Ingreso" },
      {
        title: "Deposito",
        data: null,
        className: "text-center",
        render: function (data, type, row, meta) {

          return `
            <button class="btn btn-primary btn-lg deposited-button" data-toggle="modal" data-target="#tokenModalForDeposited" value="${data[5]} ${data[8]}" >
             $${data[5]}
            </button>
            <!-- Modal -->
            <div
              class="modal fade"
              id="tokenModalForDeposited"
              tabindex="-1"
              role="dialog"
              aria-labelledby="myModalLabel"
              aria-hidden="true"
            >
            <div class="alert" role="alert" id="second_alert" style="display: none"></div>

              <div class="modal-dialog">
                <div class="modal-content">
                  <!-- Modal Header -->
                  <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">
                      <span aria-hidden="true">&times;</span>
                      <span class="sr-only">Close</span>
                    </button>
                    <h4 class="modal-title" id="myModalLabel">Verificar token</h4>
                  </div>
        
                  <!-- Modal Body -->
                  <div class="modal-body">
                    <form role="form" id="verify-code-for-edit-depositedModal">
                      <div class="form-group">
                        <label for="">Verificar Token</label>
                        <input
                          type="text"
                          class="form-control"
                          id="code-depositedModal"
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

            <!-- Modal 3-->
            <div
              class="modal fade"
              id="depositedModal"
              tabindex="-1"
              role="dialog"
              aria-labelledby="myModalLabel"
              aria-hidden="true"
            >
            <div class="alert" role="alert" id="deposited_alert" style="display: none"></div>
            
            <div class="modal-dialog">
                <div class="modal-content">
                  <!-- Modal Header -->
                  <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">
                      <span aria-hidden="true">&times;</span>
                      <span class="sr-only">Close</span>
                    </button>
                    <h4 class="modal-title" id="myModalLabel">Editar Seña</h4>
                  </div>
        
                  <!-- Modal Body -->
                  <div class="modal-body">
                    <form role="form" id="edit-deposited-money-form">
                      <div class="form-group">
                        <label for="exampleInputEmail1">Seña depositada</label>
                        <input
                          type="number"
                          class="form-control"
                          id="depositedMoneyModal-input"
                          placeholder="Replace amount"
                        />
                      </div>
                      <button type="submit" class="btn btn-primary" id="submit_button_deposited_money">Submit</button>
                    </form>
                  </div>

                  <!-- Modal Footer -->
            <div class="modal-footer">
              <button type="button" class="btn btn-default close_modal" data-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
            `}
      },
      {
        title: "Importe Total",
        data: null,
        className: "text-center",
        render: function (data, type, row, meta) {
          return `
            <button class="btn btn-primary btn-lg totalAmount-button" data-toggle="modal" data-target="#tokenModal" data-tar value="${data[4]} ${data[8]}">
                $${data[4]}
            </button>
            <!-- Modal -->
            <div
              class="modal fade"
              id="tokenModal"
              tabindex="-1"
              role="dialog"
              aria-labelledby="myModalLabel"
              aria-hidden="true"
            >
            <div class="alert" role="alert" id="first_alert" style="display: none"></div>

              <div class="modal-dialog">
                <div class="modal-content">
                  <!-- Modal Header -->
                  <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">
                      <span aria-hidden="true">&times;</span>
                      <span class="sr-only">Close</span>
                    </button>
                    <h4 class="modal-title" id="myModalLabel">Verificar token</h4>
                  </div>
        
                  <!-- Modal Body -->
                  <div class="modal-body">
                    <form role="form" id="verify-code-for-edit-totalAmountModal">
                      <div class="form-group">
                        <label for="">Verificar Token</label>
                        <input
                          type="text"
                          class="form-control"
                          id="code-totalAmountModal"
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
              id="totalAmountModal"
              tabindex="-1"
              role="dialog"
              aria-labelledby="myModalLabel"
              aria-hidden="true"
            >
            <div class="alert" role="alert" id="amount_alert" style="display: none"></div>
            
            <div class="modal-dialog">
                <div class="modal-content">
                  <!-- Modal Header -->
                  <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">
                      <span aria-hidden="true">&times;</span>
                      <span class="sr-only">Close</span>
                    </button>
                    <h4 class="modal-title" id="myModalLabel">Editar Importe Total</h4>
                  </div>
        
                  <!-- Modal Body -->
                  <div class="modal-body">
                    <form role="form" id="edit-total-amount-form">
                      <div class="form-group">
                        <label for="exampleInputEmail1">Importe</label>
                        <input
                          type="number"
                          class="form-control"
                          id="totalAmountModal-input"
                          placeholder="Replace amount"
                        />
                        <input
                          class="amountHide"
                          type="hidden"
                          id="edit-amount-hidden"
                        />
                      </div>
                      <button type="submit" class="btn btn-primary" id="submit_button_total_amount">Submit</button>
                    </form>
                  </div>

                  <!-- Modal Footer -->
                  <div class="modal-footer">
                    <button type="button" class="btn btn-default close_modal" data-dismiss="modal">
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
        targets: 6,
        data: null,
        className: "text-center",
        searchable: false,
        orderable: false,
        render: function (data) {
          return (
            '<input type="checkbox" class="checks_of_retired" name="check" value="' +
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
        render: function (data) {
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
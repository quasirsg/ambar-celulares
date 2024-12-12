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
      { title: "Marca" },
      {
        title: "Deposito",
        data: null,
        className: "text-center",
        render: function (data, type, row, meta) {

          return `
            <button class="btn btn-primary btn-lg deposited-button" data-toggle="modal" data-target="#tokenModalForDeposited" value="${data[6]} ${data[9]}" >
             $${data[6]}
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
            
            <div class="modal-dialog">
            <div class="alert" role="alert" id="second_alert" style="display: none"></div>
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
            
            <div class="modal-dialog">
            <div class="alert" role="alert" id="deposited_alert" style="display: none"></div>
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
            <button class="btn btn-primary btn-lg totalAmount-button" data-toggle="modal" data-target="#tokenModal" data-tar value="${data[5]} ${data[9]}">
                $${data[5]}
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
            
            <div class="modal-dialog">
            <div class="alert" role="alert" id="first_alert" style="display: none"></div>
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
            
            <div class="modal-dialog">
            <div class="alert" role="alert" id="amount_alert" style="display: none"></div>
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
        targets: 7,
        data: null,
        className: "text-center",
        searchable: false,
        orderable: false,
        render: function (data) {
          return data[7] == false
            ?
            `<input type="checkbox" class="checks_of_fixed" data-toggle="modal" data-target="#updatefixedModal" name="check" value="${data[7]}|${data[9]}">
              <!-- Modal -->
              <div
                class="modal fade"
                id="updatefixedModal"
                tabindex="-1"
                role="dialog"
                aria-labelledby="updatefixedModalLabel"
                aria-hidden="true"
              >
              <div class="modal-dialog">
              <div class="alert" role="alert" id="observation_alert" style="display: none"></div>
              <div class="modal-content">
                    <!-- Modal Header -->
                    <div class="modal-header">
                      <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                        <span class="sr-only">Close</span>
                      </button>
                      <h4 class="modal-title" id="myModalLabel">Observaciones</h4>
                    </div>
            
                    <!-- Modal Body -->
                    <div class="modal-body">
                      <form role="form" id="submit-observation-form">
                        <div class="form-group">
                          <label for="exampleInputEmail1">Agregar observacion</label>
                          <input
                            type="text"
                            class="form-control"
                            id="updateObservation-input"
                            placeholder="Añadir observación"
                          />
                        </div>
                        <button type="submit" class="btn btn-primary" id="submit_button_observation">Submit</button>
                      </form>
                    </div>
            
                    <!-- Modal Footer -->
                    <div class="modal-footer">
                      <button type="button" class="btn btn-default close_modal" id="close_modal_fixed" data-dismiss="modal">
                        Cerrar
                      </button>
                    </div>
                  </div>
                </div>
              </div>`

            : `<button class="btn btn-primary btn-lg fixed-button" data-toggle="modal" data-target="#fixedModal" value="${data[11]}|${data[10]}">
                 Ver
               </button>

               <!-- Modal -->
            <div
              class="modal fade"
              id="fixedModal"
              tabindex="-1"
              role="dialog"
              aria-labelledby="fixedModalLabel"
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
                    <h4 class="modal-title" id="fixedModalLabel">Observaciones del dispositivo</h4>
                  </div>
          
                  <!-- Modal Body -->
                  <div class="modal-body">
                  <p id="fixed-input"></p>
                  </div>
                  
                  <!-- Modal Footer -->
                  <div class="modal-footer" style="display: flex; justify-content: space-between; align-items: center;">
                    <div class="form-group" style="margin: 0; padding: 0; display: flex; flex-grow: 1; justify-content: space-between;">
                      <p id="date-fixed-input" class="mb-0" style="flex-grow: 1; text-align: left;"></p>
                      <button type="button" class="btn btn-default" style="margin-left: auto;" data-dismiss="modal">
                        Cerrar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>`
        },
        width: "1%",
      },
      {
        title: "Retirado",
        targets: 8,
        data: null,
        className: "text-center",
        searchable: false,
        orderable: false,
        render: function (data) {
          return (
            `<input type="checkbox" class="checks_of_retired" name="check" value="${data[8]}| ${data[9]}">`
          )
        },
        width: "1%",
      },
    ],

    /* SETTINGS OF DATATABLE*/
    ordering: false, /* disable order in the rows of datatable*/
    info: false, /* disable info show entries, leyend: "Showing 1 to 5 of 5 entries" */
    dom: 'rtip', /* disable buton show entries (10/15/20/50) */
  });
});
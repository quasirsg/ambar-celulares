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
      { title: "Entrada" },
      {
        title: "Monto",
        data: null,
        className: "text-center",
        render: function (data, type, row, meta) {
          console.log(data);
          return `
            <button class="btn btn-primary btn-lg mount-button" data-toggle="modal" data-target="#tokenModal" data-tar value="${data[5]}">
                ${data[5]}
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
            <div class="alert" role="alert" id="alert" style="display: none"></div>

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
                    <form role="form" id="verify-code-for-edit-amountModal">
                      <div class="form-group">
                        <label for="">Verificar Token</label>
                        <input
                          type="text"
                          class="form-control"
                          id="code-amountModal"
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
              id="amountModal"
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
                    <h4 class="modal-title" id="myModalLabel">Editar monto</h4>
                  </div>
        
                  <!-- Modal Body -->
                  <div class="modal-body">
                    <form role="form" id="edit-mount-form">
                      <div class="form-group">
                        <label for="exampleInputEmail1">Monto</label>
                        <input
                          type="text"
                          class="form-control"
                          id="amountModal-input"
                          placeholder="Replace mount"
                        />
                        <input
                          type="hidden"
                          id="edit-mount-hidden"
                        />
                      </div>
                      <button type="submit" class="btn btn-primary" id="submit_button">Submit</button>
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
        title: "Saldo",
        data: null,
        className: "text-center",
        render: function (data) {
          
          return `
            <button class="btn btn-primary btn-lg paid-button" data-toggle="modal" data-target="#tokenModalForPaid" value="${data[6]}" >
              ${data[6]}
            </button>
            <!-- Modal -->
            <div
              class="modal fade"
              id="tokenModalForPaid"
              tabindex="-1"
              role="dialog"
              aria-labelledby="myModalLabel"
              aria-hidden="true"
            >
            <div class="alert" role="alert" id="alert" style="display: none"></div>

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
                    <form role="form" id="verify-code-for-edit-paidModal">
                      <div class="form-group">
                        <label for="">Verificar Token</label>
                        <input
                          type="text"
                          class="form-control"
                          id="code-paidModal"
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
              id="paidModal"
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
                    <h4 class="modal-title" id="myModalLabel">Editar saldo</h4>
                  </div>
        
                  <!-- Modal Body -->
                  <div class="modal-body">
                    <form role="form" id="edit-paid-form">
                      <div class="form-group">
                        <label for="exampleInputEmail1">Saldo</label>
                        <input
                          type="text"
                          class="form-control"
                          id="paidModal-input"
                          placeholder="Replace mount"
                        />
                      </div>
                      <button type="submit" class="btn btn-primary" id="submit_button">Submit</button>
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
            `}
      },
      {
        title: "Arreglado",
        targets: 7,
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
        targets: 8,
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
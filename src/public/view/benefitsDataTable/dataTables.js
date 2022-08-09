
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
                        <label for="">Code</label>
                        <input
                          type="text"
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
  
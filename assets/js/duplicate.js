$toID = 0;

var tblDuplicate = $('#tbl-duplicate').DataTable({
  processing: true,
  serverSide: true, 
  order: [[1, 'desc']],
  scrollX: true,
  scrollX: "100%", 
  columnDefs: [
    {
      targets: 0,
      searchable: false,
      orderable: false,
      className: 'dt-body-center',
      render: function (data, type, full, meta){
          return '<input type="checkbox" name="id[]" value="' + $('<div/>').text(data).html() + '">';
      }
    },
    {
      targets: [7],
      orderable: false,
    }
  ],
  fixedColumns:   {
    leftColumns: 0,
    rightColumns: 1
  },
  lengthMenu: [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
  ajax: {
        url: $base_url + 'Grievance/fetch_duplicate_table',
        type: "POST",
        data: function ( data ) {
            
        }
  },
  initComplete: function(settings, json) {
    setTimeout(() => {
        $('#tbl-duplicate').DataTable().columns.adjust();
    }, 100);
  },
});

$('.dataTables_filter').append('<button id="delete-selected-data" class="btn btn-sm btn-danger float-left mr-3"><i class="fas fa-trash-alt mr-1"></i>Delete selected record</button>');

$('#delete-selected-data').off().on('click', function() {
   var values = $("input[name='id[]']:checked").map(function(){return $(this).val();}).get();

  if (values.length != 0) {
      $('#myModal2').modal({
        show: true,
        backdrop: 'static',
        keyboard: false
      });

      $('#myModal2 .modal-dialog').addClass('modal-sm');
      $('#myModal2 .modal-header').addClass('border-bottom-grs2')
      $('#myModal2 .modal-title').addClass('h6');
      $('#myModal2 .modal-body').addClass('text-center');
      $('#myModal2 .modal-title').html('<i class="fas fa-trash-alt mr-1"></i>Confirmation');
      $('#myModal2 .modal-body').html('Are you sure you want to delete this '+ values.length +' record(s) ?');
      $('#myModal2 .modal-footer').html('<div class="w-100"><button class="btn btn-sm btn-grs float-left" data-dismiss="modal">NO</button>' +
                                        '<button id="btn-yes" class="btn btn-sm btn-grs2 float-right" data-dismiss="modal" data-dismiss="modal">YES</button></div>')

      $('#btn-yes').off().on('click', () => {
        $.ajax({
          url: $base_url + 'Grievance/batch_delete_duplicate',
          method: 'get',
          data: {ids: values},
          success: results => {
            $('.toast-area').append('<div class="toast animated fadeInDown" role="alert" aria-live="assertive" data-delay="5000" aria-atomic="true">' +
                                                  '<div class="toast-header">' +
                                                  '<strong class="mr-auto toast-title">Grievance</strong>' +
                                                  '<button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">' +
                                                  '<span aria-hidden="true">&times;</span>' +
                                                  '</button>' +
                                                  '</div>' +
                                                  '<div class="toast-body">' +
                                                  'Duplicate Grievance deleted successfully' +
                                                  '</div>' +
                                                  '</div>');
              $(".toast").toast('show');
              $('.toast').on('hidden.bs.toast', function () {
                  $(this).remove();
              });
              tblDuplicate.ajax.reload();
              insert_logs('Batch Deleted Duplicate Grievance', null);
          },
          error: (xhr, ajaxOptions, thrownError) => {
            console.error('Error in deleting batch duplicate data: ' + xhr.status + ' => ' + thrownError);
          } 
       })
      });
  }
});

function view_duplicate(id) {

  $('#myModal .modal-title').html('<i class="fas fa-file mr-2"></i>Duplicate Grievance Info');
  $('#myModal .modal-header').addClass('border-bottom-grs');
  $('#myModal').modal({
    show: true,
    backdrop: 'static',
    keyboard: false
  })

  $.ajax({
    url: $base_url + 'grievance/fetch_grievance_info',
    method: 'get',
    dataType: 'json',
    data: {id: id},
    success: result => {
      setTimeout(function() {
          let pantawid;
          $.each(result, function(k, v) {
            var options = { year: 'numeric', month: 'long', day: 'numeric' };
            var date_intake  = new Date(v.g_date_intake);
            var date_encode  = new Date(v.g_date_encode);
              
            $('#myModal .modal-body').html('<div class="row mt-4">' +
                                    '<div class="col-lg-12 mb-4">' +
                                    '<div class="input-container">' +
                                    '<i class="fas fa-calendar-alt"></i>' +
                                    '<div class="group-ben">' +
                                    '<input id="dateIntake" class="input-txt-dis input-txt" type="text" value="' + date_intake.toLocaleDateString("en-US", options) + '" >' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">Date Intake</label>' +
                                    '</div>' +
                                    '<i class="fas fa-calendar-alt ml-1"></i>' +
                                    '<div class="group-ben">' +
                                    '<input id="dateEncode" class="input-txt-dis input-txt" type="text" value="' + date_encode.toLocaleDateString("en-US", options) + '" >' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">Date Encoded</label>' +
                                    '</div>' +
                                    '<i class="fas fa-info-circle ml-1"></i>' +
                                    '<div class="group-ben">' +
                                    '<input id="date-LAT" class="input-txt-dis input-txt" type="text" value="' + v.g_status + '" >' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">Status</label>' +
                                    '</div>' +
                                    '</div>' +
                                    '</div>' +
                                    '<div class="col-lg-6">' +
                                    '<div class="input-container pb-4">' +
                                    '<i class="fas fa-thumbtack"></i>' +
                                    '<div class="group-ben-md">' +
                                    '<input id="tracking" class="input-txt-dis input-txt" type="text" value="' + v.g_tracking_no + '" >' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">Tracking No.</label>' +
                                    '</div>' +
                                    '<i class="fas fa-users ml-1"></i>' +
                                    '<div class="group-ben-md">' +
                                    '<input class="input-txt-dis input-txt" type="text" value="' + v.g_membership + '" >' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">Membership</label>' +
                                    '</div>' +
                                    '<i class="fas fa-user ml-1"></i>' +
                                    '<div class="group-ben">' +
                                    '<input id="fullname" class="input-txt-dis input-txt" type="text" value="' + v.g_fullname + '" >' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">Fullname</label>' +
                                    '</div>' +
                                    '<i class="bar-con fas fa-bars" onclick="view_complainer_info(\'' + v.g_hh_id +'\', \'' + v.g_fullname +'\', \'' + v.g_purok +'\', \'' + v.g_barangay +'\',\'' + v.g_city_muncipality +'\', \'' + v.g_province +'\', \'' + v.g_region +'\', \'' + v.g_hh_set +'\', \'' + v.g_sex +'\', \'' + v.g_contact +'\', \'' + v.g_ip_affiliation +'\')"></i>' +
                                    '</div>' +
                                    '</div>' +
                                    '<div class="col-lg-6">' +
                                    '<div class="input-container pb-4">' +
                                    '<i class="fas fa-map-marked-alt"></i>' +
                                    '<div class="group-ben">' +
                                    '<input class="input-txt-dis input-txt" type="text" value="' + v.g_location +'" >' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">Filed Location</label>' +
                                    '</div>' +
                                    '</div>' +
                                    '</div>' +
                                    '<div class="col-lg-6">' +
                                    '<div class="input-container pb-4">' +
                                    '<i class="fas fa-street-view"></i>' +
                                    '<div class="group-ben">' +
                                    '<input id="assist-by" class="input-txt-dis input-txt" type="text" value="' + v.g_assist_by + '" >' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">Assist By</label>' +
                                    '</div>' +
                                    '</div>' +
                                    '</div>' +
                                    '<div class="col-lg-6">' +
                                    '<div class="input-container">' +
                                    '<i class="fas fa-file-invoice ml-1"></i>' +
                                    '<div class="group-ben">' +
                                    '<input id="report-mode" class="input-txt-dis input-txt" type="text" value="' + v.g_mode + '" >' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">Report Mode</label>' +
                                    '</div>' +
                                    '</div>' +
                                    '</div>' +
                                    '<div class="col-lg-6">' +
                                    '<div class="input-container pb-4">' +
                                    '<i class="fas fa-folder"></i>' +
                                    '<div class="group-ben">' +
                                    '<input id="category" class="input-txt-dis input-txt" type="text" value="' + v.g_category + '" >' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl lbl-dr">Category</label>' +
                                    '</div>' +
                                    '</div>' +
                                    '</div>' +
                                    '<div class="col-lg-6">' +
                                    '<div class="input-container pb-4">' +
                                    '<i class="fas fa-folder-open"></i>' +
                                    '<div class="group-ben">' +
                                    '<input id="sub-category" class="input-txt-dis input-txt" type="text" value="' + v.g_sub_category + '" >' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl lbl-dr">Sub Category</label>' +
                                    '</div>' +
                                    '</div>' +
                                    '</div>' +
                                    '<div class="col-lg-6">' +
                                    '<label for="my-summernote"><i class="fas fa-sticky-note mr-1"></i>DESCRIPTION :</label>' +
                                    '<form method="post" class="summernote summernote2">' +
                                    '<textarea id="my-summernote-des" name="editordata">' + v.g_description + '</textarea>' +
                                    '</form>' +
                                    '</div>' +
                                    '<div class="col-lg-6">' +
                                    '<label for="my-summernote"><i class="far fa-sticky-note mr-1"></i>RESOLUTION : </label>' +
                                    '<form method="post" class="summernote summernote1">' +
                                    '<textarea id="my-summernote-reso" name="editordata">' + v.g_resolution + '</textarea>' +
                                    '</form>' +
                                    '</div>' +
                                    '</div>');

          $('#myModal .modal-footer').html('<button class="btn btn-danger mr-auto" onclick="delete_duplicate(\'' + v.g_id + '\')"><i class="fas fa-trash mr-2"></i>Delete</button><button class="btn btn-success" onclick="approve_duplicate(\'' + v.g_id + '\')"><i class="fas fa-check mr-2"></i>Approve</button>')


          });
    

        setTimeout(() => {
            $('.summernote1 .note-editable').attr('contenteditable',false);
            $('.summernote2 .note-editable').attr('contenteditable',false);
        }, 100);
        summernote_airmode('#my-summernote-reso');
        summernote_airmode('#my-summernote-des');

        $('.input-txt-dis').focus(function(e) {
          $(this).blur();
        });
      }, 100);
    },
    error: (xhr, ajaxOptions, thrownError) => {
      console.error("Error in fetching duplicate grievance: " + xhr.status + ' => ' + thrownError);
    }
  });
  
}

function approve_duplicate(id) {
  $('#myModal2').modal({
    show: true,
    backdrop: 'static',
    keyboard: false
  });

  $('#myModal2 .modal-dialog').addClass('modal-sm');
  $('#myModal2 .modal-header').addClass('border-bottom-grs2')
  $('#myModal2 .modal-title').addClass('h6');
  $('#myModal2 .modal-body').addClass('text-center');
  $('#myModal2 .modal-title').html('Confirmation');
  $('#myModal2 .modal-body').html('Are you sure you want to approve this record?');
  $('#myModal2 .modal-footer').html('<div class="w-100"><button class="btn btn-sm btn-grs float-left" data-dismiss="modal">NO</button>' +
                                    '<button class="btn btn-sm btn-grs2 float-right" data-dismiss="modal" data-dismiss="modal" onclick="approve_duplicate_true(\'' + id +'\')">YES</button></div>')

}

function approve_duplicate_true(id) {
  $.ajax({
      url: $base_url + 'grievance/approve_duplicate_true',
      method: 'POST',
      data: {id: id},
      success: function(result){
          $('#myModal').modal('toggle');
          $('.toast-area').append('<div class="toast animated fadeInDown" role="alert" aria-live="assertive" data-delay="5000" aria-atomic="true">' +
                                              '<div class="toast-header">' +
                                              '<strong class="mr-auto toast-title">Grievance</strong>' +
                                              '<button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">' +
                                              '<span aria-hidden="true">&times;</span>' +
                                              '</button>' +
                                              '</div>' +
                                              '<div class="toast-body">' +
                                              'Duplicate Grievance approved successfully' +
                                              '</div>' +
                                              '</div>');
          $(".toast").toast('show');
          $('.toast').on('hidden.bs.toast', function () {
              $(this).remove();
          });
          insert_logs('Approved Duplicate Grievance', null);
          tblDuplicate.ajax.reload();
      },
      error: function(xhr, ajaxOptions, thrownError) {
        console.error('Error in approving duplicate: ' + xhr.status + ' => ' + thrownError);
      }
  });
}

function delete_duplicate(id) {
  $('#myModal2').modal({
    show: true,
    backdrop: 'static',
    keyboard: false
  });

  $('#myModal2 .modal-dialog').addClass('modal-sm');
  $('#myModal2 .modal-header').addClass('border-bottom-grs2')
  $('#myModal2 .modal-title').addClass('h6');
  $('#myModal2 .modal-body').addClass('text-center');
  $('#myModal2 .modal-title').html('Confirmation');
  $('#myModal2 .modal-body').html('Are you sure you want to delete this record?');
  $('#myModal2 .modal-footer').html('<div class="w-100"><button class="btn btn-sm btn-grs float-left" data-dismiss="modal">NO</button>' +
                                    '<button class="btn btn-sm btn-grs2 float-right" data-dismiss="modal" data-dismiss="modal" onclick="delete_duplicate_true(\'' + id +'\')">YES</button></div>')

}

function delete_duplicate_true(id) {
    $('#myModal3').modal({
        show: true,
        keyboard: false,
        backdrop: 'static'
    })

    $('#myModal3 .modal-title').html('<i class="fas fa-trash-alt mr-2"></i>Delete info');
    $('#myModal3 .modal-body').html('<p class="text-secondary">Please provide reason:</p>' +
                                    '<textarea class="delete-desc"></textarea><p class="delete-alert text-danger m-1 hidden"><i class="fas fa-exclamation-circle mr-2"></i>Reason is required!</p>');
    $('#myModal3 .modal-footer').html('<div class="d-flex w-100"><button class="btn btn-sm btn-secondary" data-dismiss="modal">Cancel</button><button id="delete_grievance_true_1" class="btn btn-sm btn-danger ml-auto">Delete</button></div>')
  
    $(document).off().on('click', '#delete_grievance_true_1', () => {
        let desc = $('.delete-desc').val();
        if (desc.replace(/\s/g, '') == '') {   
            $('.delete-alert').show('slow');
        } else {
            $('#myModal3').modal('toggle');
            $('.delete-alert').hide('slow');
            $.ajax({
                url: $base_url + 'grievance/delete_grievance_true',
                method: 'POST',
                data: {id: id},
                success: function(result){
                    $('#myModal').modal('toggle');
                    $('.toast-area').append('<div class="toast animated fadeInDown" role="alert" aria-live="assertive" data-delay="5000" aria-atomic="true">' +
                                                        '<div class="toast-header">' +
                                                        '<strong class="mr-auto toast-title">Grievance</strong>' +
                                                        '<button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">' +
                                                        '<span aria-hidden="true">&times;</span>' +
                                                        '</button>' +
                                                        '</div>' +
                                                        '<div class="toast-body">' +
                                                        'Duplicate Grievance deleted successfully' +
                                                        '</div>' +
                                                        '</div>');
                    $(".toast").toast('show');
                    $('.toast').on('hidden.bs.toast', function () {
                        $(this).remove();
                    });
                    insert_logs('Deleted Duplicate Grievance', desc);
                    tblDuplicate.ajax.reload();
                },
                error: function(xhr, ajaxOptions, thrownError) {
                  console.error('Error in deleting duplicate grievance: ' + xhr.status + ' => ' + thrownError);
                }
            });
        }
    });
  
}



$('#myModal2').on('hidden.bs.modal', function () {
  $('#myModal').addClass('scrollbar-open');
});

$('#example-select-all').on('click', function(){
      // Get all rows with search applied
      var rows = tblDuplicate.rows({ 'search': 'applied' }).nodes();
      // Check/uncheck checkboxes for all rows in the table
      $('input[type="checkbox"]', rows).prop('checked', this.checked);
   });

   // Handle click on checkbox to set state of "Select all" control
   $('#tblDuplicate tbody').on('change', 'input[type="checkbox"]', function(){
      // If checkbox is not checked
      if(!this.checked){
         var el = $('#tbl-logs-select-all').get(0);
         // If "Select all" control is checked and has 'indeterminate' property
         if(el && el.checked && ('indeterminate' in el)){
            // Set visual state of "Select all" control
            // as 'indeterminate'
            el.indeterminate = true;
         }
      }
   });

//    // // Handle form submission event
//    // $('#frm-example').on('submit', function(e){
//    //    var form = this;

//    //    // Iterate over all checkboxes in the table
//    //    table.$('input[type="checkbox"]').each(function(){
//    //       // If checkbox doesn't exist in DOM
//    //       if(!$.contains(document, this)){
//    //          // If checkbox is checked
//    //          if(this.checked){
//    //             // Create a hidden element
//    //             $(form).append(
//    //                $('<input>')
//    //                   .attr('type', 'hidden')
//    //                   .attr('name', this.name)
//    //                   .val(this.value)
//    //             );
//    //          }
//    //       }
//    //    });
//    // });

//    // tbl_logs.$('input[type="checkbox"]').each(function(){
//    //     console.log($('<input>').attr('type', 'hidden').attr('name', this.name).val(this.value));
//    // });

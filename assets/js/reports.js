$toID = 0;

$('#reportTab').tabs();

$('.gotoRep').on('click', function(event) {

  if (this.hash !== "") {
    event.preventDefault();

    var hash = this.hash;

    $('html, body').animate({
      scrollTop: $(hash).offset().top
    }, 800, function(){
 
      window.location.hash = hash;
    });
  } 
});


var tblAllData = $('#tbl-allData').DataTable({
    processing: true,
    serverSide: true,
    order: [], 
    ajax: {
        url: $base_url + 'Reports/fetch_reports_table_all',
        type: "POST",
        data: function ( data ) {
            data.province = $('#provFilter option:selected').text();
            data.muncipality = $('#munFilter option:selected').text();
            data.barangay =  $('#brgyFilter option:selected').text();
            data.year = $('#yearFilter option:selected').text();
        }
    },
    order: [[0, 'desc']],
    fixedColumns:   {
        leftColumns: 0,
        rightColumns: 1
    },
    columnDefs: [
        {
            targets: [41],
            orderable: false,
        }
    ],
    scrollX: true,
    scrollX: "100%",
    lengthMenu: [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
});

var resTable =  $('#resolvedTable').DataTable( {
      processing: true,
      serverSide: true,
      colReorder: true, 
      order: [], 
      ajax: {
          url: $base_url + 'Reports/fetch_reports_table',
          type: "POST",
          data: function ( d ) {
            d.tbl = 'resolved', 
            d.fromMonth = $('#fromMonth option:selected').val(), 
            d.toMonth = $('#toMonth option:selected').val(), 
            d.year = $('#year option:selected').val()
          }
      },
      dom: 'lBfrtip',
      buttons: [
              {
                extend: 'excelHtml5',
                text: 'Excel',
                className: 'btn-export d-none',
                titleAttr: 'Export to excel file',
                title: 'Report Data',
                footer: true,
                multitables:{
                  categoryTable: 'Category', 
                  trackingTable: 'Tracking',
                  provinceTable: 'Province',
                  resolvedTable: 'Resolved'
                }
              }
     ],
     scrollX: true,
     scrollX: "100%",
     lengthMenu: [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]]
  });



var catTable = $('#categoryTable').DataTable( {
  processing: true,
  serverSide: true,
  colReorder: true, 
  order: [], 
  ajax: {
      url: $base_url + 'Reports/fetch_reports_table_category',
      type: "POST",
      data: function ( d ) {
        d.fromMonth = $('#fromMonth option:selected').val(), 
        d.toMonth = $('#toMonth option:selected').val(), 
        d.year = $('#year option:selected').val()
      }
  },
  scrollX: true,
  scrollX: "100%",
  paging:   false,
  info:     false,
  searching:   false,
  initComplete: function(settings, json) {
    setTimeout(() => {
        $('#categoryTable').DataTable().columns.adjust();
    }, 100);
  },
  "footerCallback": function ( row, data, start, end, display ) {
    var api = this.api(), data;

    var intVal = function ( i ) {
        return typeof i === 'string' ?
            i.replace(/[\$,]/g, '')*1 :
            typeof i === 'number' ?
                i : 0;
    };

    for (var i = 1 ; i <= 6; i++) {
      total = api
          .column( i )
          .data()
          .reduce( function (a, b) {
              return intVal(a) + intVal(b);
          }, 0 );

      pageTotal = api
          .column( i, { page: 'current'} )
          .data()
          .reduce( function (a, b) {
              return intVal(a) + intVal(b);
          }, 0 );

      $( api.column( i ).footer() ).html(total);
    }
}
});

var trackTable = $('#trackingTable').DataTable( {
  processing: true,
  serverSide: true,
  colReorder: true, 
  order: [], 
  ajax: {
      url: $base_url + 'Reports/fetch_reports_table',
      type: "POST",
      data: function ( d ) {
              d.tbl = 'tracking', 
              d.fromMonth = $('#fromMonth option:selected').val(), 
              d.toMonth = $('#toMonth option:selected').val(), 
              d.year = $('#year option:selected').val()
            }
  },
  scrollX: true,
  scrollX: "100%",
  lengthMenu: [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
});

var provTable = $('#provinceTable').DataTable( {
  processing: true,
  serverSide: true,
  colReorder: true, 
  order: [], 
  ajax: {
      url: $base_url + 'Reports/fetch_reports_table_province',
      type: "POST",
      data: function ( d ) {
          d.fromMonth = $('#fromMonth option:selected').val(), 
          d.toMonth = $('#toMonth option:selected').val(), 
          d.year = $('#year option:selected').val()
        }
  },
  paging:   false,
  info:     false,
  searching:   false,
  scrollX: true,
  scrollX: "100%",
  lengthMenu: [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
  footerCallback: function ( row, data, start, end, display ) {
  var api = this.api(), data;

  var intVal = function ( i ) {
      return typeof i === 'string' ?
          i.replace(/[\$,]/g, '')*1 :
          typeof i === 'number' ?
              i : 0;
  };

  for (var i = 1 ; i <= 4; i++) {
    if (i < 4) {
      total = api
        .column( i )
        .data()
        .reduce( function (a, b) {
            return intVal(a) + intVal(b);
        }, 0 );

      pageTotal = api
          .column( i, { page: 'current'} )
          .data()
          .reduce( function (a, b) {
              return intVal(a) + intVal(b);
          }, 0 );

      $( api.column( i ).footer() ).html(total);
    } else if (i == 4) {
      let totalWithin = $( api.column( 2 ).footer() ).text();
      let grandTotal = $( api.column( 3 ).footer() ).text();

      total = totalWithin / (grandTotal / 100);
      total = Math.round(total * 100) / 100;

      $( api.column( 4 ).footer() ).html(total);
    }
    
  }
}
});


$('#btn-export-excel').click(function() {
  $('.loadText').html('Exporting records...');

  $('#loadingModal').modal({
      show: true,
      backdrop: 'static',
      keyboard: false
  });

  trackTable.page.len(-1).draw().on('draw', () => {
    resTable.page.len(-1).draw().on('draw', () => {
      $('#resolvedTable').DataTable().buttons('.btn-export').trigger();
      $('#loadingModal').modal('toggle');
    });
  });
});

$('#tab1-on').click(function() {
    $('#categoryTable').DataTable().columns.adjust();
});

$('#tab2-on').click(function() {
    $('#trackingTable').DataTable().columns.adjust();
});

$('#tab3-on').click(function() {
    $('#provinceTable').DataTable().columns.adjust();
});

$('#tab4-on').click(function() {
    $('#resolvedTable').DataTable().columns.adjust();
});


$('#generateReport').off().on('click', () => {
  $('.loadText').html('Generating records...');

  $('#loadingModal').modal({
      show: true,
      backdrop: 'static',
      keyboard: false
  });
  resTable.ajax.reload();
  trackTable.ajax.reload();
  catTable.ajax.reload(() => {
    setTimeout(() => {
      $('#loadingModal').modal('toggle');
      document.getElementById('reportForm').scrollIntoView({behavior: 'smooth', block: 'center' });
    }, 1000);
    
  });
  provTable.ajax.reload();
  dateRange();
});


function dateRange() {
  let fromMonth = $('#fromMonth option:selected').text();
  let toMonth = $('#toMonth option:selected').text();
  let onYear = $('#year option:selected').text();
  
  $('#rangeLbl').html('<i class="fas fa-calendar mr-2"></i>'+fromMonth+' to '+toMonth+', '+onYear+'');
}

$('#provFilter').change(function() {
    let psgcProv = $('#provFilter option:selected').val();
    $('#munFilter').empty();
    $('#brgyFilter').empty();
    $.ajax({
        url: $base_url + 'Reports/fetch_muncipality',
        method: 'get',
        data: {prov: psgcProv},
        dataType: 'json',
        success: result => {
            $('#munFilter').append('<option selected></option>');
            $.each(result, function(k, v) {
                $('#munFilter').append('<option value="'+v.PSGC_CITY+'">' + v.CITY_NAME + '</option>');
            });

            let mun = $('#munFilter option:selected').val();
            fetch_brgy(mun);
        },
        error: (xhr, ajaxOptions, thrownError) => {
            console.error('Error in fetching city/muncipality: ' + xhr.status + ' => ' + thrownError);
        }
    });
})

$('#munFilter').change(function() {
    let val = $('#munFilter option:selected').val();
    fetch_brgy(val);
})

function fetch_brgy(mun) {
    $('#brgyFilter').empty();
    $.ajax({
        url: $base_url + 'Reports/fetch_brgy',
        method: 'get',
        data: {mun: mun},
        dataType: 'json',
        success: result => {
            $('#brgyFilter').append('<option selected></option>');
            $.each(result, function(k, v) {
                $('#brgyFilter').append('<option>'+v.BRGY_NAME+'</option>');
            });
        },
        error: (xhr, ajaxOptions, thrownError) => {
            console.error('Error in fetching barangay: ' + xhr.status + ' => ' + thrownError);
        }
    });
}

$('#btn-filter').off().on('click', function(){
    let prov = $('#provFilter option:selected').text();
    let mun = $('#munFilter option:selected').text();
    let brgy = $('#brgyFilter option:selected').text();
    let year = $('#yearFilter option:selected').text();

    $('.loadText').html('Filtering data...');
    $('#loadingModal').modal({
        show: true,
        backdrop: 'static',
        keyboard: false
    });
    tblAllData.ajax.reload(function() {
      setTimeout(() => {
        $('#loadingModal').modal('toggle');
      }, 1000);
    });
});

function view_all_data(id) {
  $('#myModal').modal({
    show: true,
    backdrop: 'static',
    keyboard: false
  });
  $('#myModal .modal-title').html('<i class="fas fa-eye mr-2"></i>View Grievance');
  $('#myModal .modal-body').html('<img class="loading2" src="./assets/css/images/loading2.gif" />');
  $('#myModal .modal-header').addClass('border-bottom-grs')
  $('#myModal .modal-footer').empty();
  $.ajax({
    url: $base_url + 'grievance/fetch_grievance_info',
    method: 'get',
    data: {id: id},
    success: function(result) {
      setTimeout(function() {
          let pantawid;
          var p1 = '';
          var p2 = ''; 
          var p3 = '';
          var p4 = '';
          var p5 = '';
          var p6 = '';
          let data = JSON.parse(result);
          $.each(data, function(k, v) {
            var options = { year: 'numeric', month: 'long', day: 'numeric' };
            var date_intake  = new Date(v.g_date_intake);
            var date_encode  = new Date(v.g_date_encode);
            var date_resolved  = new Date(v.g_date_resolve);
            var date_resolved1 = '';

            rcaType = v.category_opt;

            if (isNaN(date_resolved)) {
                date_resolved1 = '';
            } else {
                date_resolved1 = date_resolved.toLocaleDateString("en-US", options);
            }
            var date_last_action = '';
            if (v.g_date_last_action_taken !== null) {
              var date_LAT  = new Date(v.g_date_last_action_taken);
              date_last_action = date_LAT.toLocaleDateString("en-US", options);
            } else {
              date_last_action = ' '; 
            }

            if (v.p1 == null) {
                p1 = '';
            } else {
                p1 = v.p1;   
            }

            if (v.p2 == null) {
                p2 = '';
            } else {
                p2 = v.p2;
            }

            if (v.p3 == null) {
                p3 = '';
            } else {
                p3 = v.p3;
            }

            if (v.p4 == null) {
                p4 = '';
            } else {
                p4 = v.p4;
            }

            if (v.p5 == null) {
                p5 == '';
            } else {
                p5 = v.p5;
            }

            if (v.p6 == null) {
                p6 == '';
            } else {
                p6 = v.p6;
            }

            $('#myModal .modal-body').html('<div  class="row p-2">' +
                                    '<div class="col-lg-6">' +
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
                                    '<i class="fas fa-calendar-alt ml-1"></i>' +
                                    '<div class="group-ben">' +
                                    '<input id="date-LAT" class="input-txt-dis input-txt" type="text" value="' + date_last_action + '" >' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">Date L.A.T</label>' +
                                    '</div>' +
                                    '</div>' +
                                    '</div>' +
                                    '<div class="col-lg-6">' +
                                    '<div class="input-container">' +
                                    '<i class="fas fa-info"></i>' +
                                    '<div class="group-ben">' +
                                    '<select id="grievanceStatus" class="input-txt text-black">' +
                                    '<option value="Ongoing">Ongoing</option>' +
                                    '<option value="Resolved">Resolved</option>' +
                                    '</select>' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl lbl-dr">Status</label>' +
                                    '</div>' +
                                    '<i class="fas fa-calendar-alt ml-1"></i>' +
                                    '<div class="group-ben">' +
                                    '<input id="dateResolve" class="input-txt input-txt-dis" type="text" value="' + date_resolved1 + '" readonly disabled>' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">Date Resolved</label>' +
                                    '<p class="alert-dr text-danger hidden">Resolved Date is required!</p>' +
                                    '</div>' +
                                    '</div>' +
                                    '</div>' +
                                    '<div class="col-lg-12 resolvedDiv mt-2"></div>' +
                                    '</div>' +
                                    '<div id="tabs" class="font-poppins">' +
                                    '<ul>' +
                                    '<li><a href="#tabs-1">Complainants Details and Details of the Case</a></li>' +
                                    '<li><a href="#tabs-2">Root Cause and Retro Transaction Details</a></li>' +
                                    '</ul>' +
                                    '<div id="tabs-1">' +
                                    '<div class="row mt-4">' +
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
                                    '<select id="category" onchange="changeCat()" class="input-txt text-black"></select>' +
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
                                    '<select id="sub-category" class="input-txt text-black"></select>' +
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
                                    '<div class="col-lg-12">' +
                                    '<div class="attachment-form mt-4">' +
                                    '<p class="d-flex"><i class="archive fas fa-archive mr-1"></i>Attachments</p>' +
                                    '<div class="attachment-area">' +
                                    '<div class="attachment-old"></div>' +
                                    '</div>' +
                                    '</div>' +
                                    '</div>' +
                                    '</div>' +
                                    '</div>' +
                                    '<div id="tabs-2">' +
                                    '<div id="optionField" name="root" class="pb-4 mt-3">' +
                                    '</div>' +
                                    '<div id="subjectField" name="root" class="input-container pb-4 mt-3">' +
                                    '</div>' +
                                    '<hr>' +
                                    '<div name="retro" class="input-container pb-4 mt-3">' +
                                    '<i class="fas fa-info-circle"></i>' +
                                    '<div class="group-ben">' +
                                    '<select class="input-txt trans-field text-black" id="retro-yn" onchange="retro_yn()" style="height: 37px" required>' +
                                    '<option value="Blank"></option>' +
                                    '<option value="Yes">Yes</option>' +
                                    '<option value="No">No</option>' +
                                    '</select>' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">Yes or No</label>' +
                                    '</div>' +
                                    '<div class="group-ben ml-2">' +
                                    '<input class="input-txt trans-field" id="retro-yes" type="text" value="' + v.g_retro_transNo + '" disabled>' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">If Yes(Indicate retro trans no.)</label>' +
                                    '</div>' +
                                    '<div class="group-ben ml-2">' +
                                    '<input id="retro-num-child" class="input-txt trans-field" type="text" value="' + v.g_no_child + '" required>' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">No. of child(ren) for retro</label>' +
                                    '</div>' +
                                    '</div>' +
                                    '<div name="retro" class="input-container pb-4">' +
                                    '<i class="fas fa-child"></i>' +
                                    '<div class="group-ben">' +
                                    '<input id="name-child1" class="input-txt trans-field" type="text" value="' + v.g_name_child1 + '" required>' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">Name of child 1</label>' +
                                    '</div>' +
                                    '<i class="fas fa-child ml-2"></i>' +
                                    '<div class="group-ben">' +
                                    '<input id="name-child2" class="input-txt trans-field" type="text" value="' + v.g_name_child2 + '" required>' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">Name of child 2</label>' +
                                    '</div>' +
                                    '<i class="fas fa-child ml-2"></i>' +
                                    '<div class="group-ben">' +
                                    '<input id="name-child3" class="input-txt trans-field" type="text" value="' + v.g_name_child3 + '" required>' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">Name of child 3</label>' +
                                    '</div>' +
                                    '</div>' +
                                    '<p id="hh-id" hidden>' + v.g_hh_id + '</p>' +
                                    '<p id="sex" hidden>' + v.g_sex + '</p>' +
                                    '<p id="region" hidden>' + v.g_region + '</p>' +
                                    '<p id="province" hidden>' + v.g_province + '</p>' +
                                    '<p id="barangay" hidden>' + v.g_barangay + '</p>' +
                                    '<p id="city" hidden>' + v.g_city_muncipality + '</p>' +
                                    '<p id="subject" hidden>' + v.g_subj_complaint + '</p>' +
                                    '<p id="curDate" hidden>' + v.curDate + '</p>' +
                                    '<p id="ip" hidden>' + v.g_ip_affiliation + '</p>' +
                                    '<p id="category-days" hidden>' + v.category_days + '</p>' +
                                    '</div>' +
                                    '</div>');
          
            
            optionField = () => {
                $('#optionField').html('<div class="input-container">' +
                                    '<i class="far fa-file-alt"></i>' +
                                    '<div class="group-ben">' +
                                    '<input class="input-txt input-txt-dis" type="text" value="' + p1 + '" required>' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">P1</label>' +
                                    '</div>' +
                                    '<i class="far fa-file-alt ml-2"></i>' +
                                    '<div class="group-ben">' +
                                    '<input class="input-txt input-txt-dis" type="text" value="' + p2 + '" required>' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">P2</label>' +
                                    '</div>' +
                                    '<i class="far fa-file-alt ml-2"></i>' +
                                    '<div class="group-ben">' +
                                    '<input class="input-txt input-txt-dis" type="text" value="' + p3 + '" required>' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">P3</label>' +
                                    '</div>' +
                                    '</div>' +
                                    '<div class="input-container pt-4">' +
                                    '<i class="far fa-file-alt"></i>' +
                                    '<div class="group-ben">' +
                                    '<input class="input-txt input-txt-dis" type="text" value="' + p4 + '" required>' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">P4</label>' +
                                    '</div>' +
                                    '<i class="far fa-file-alt ml-2"></i>' +
                                    '<div class="group-ben">' +
                                    '<input class="input-txt input-txt-dis" type="text" value="' + p5 + '" required>' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">P5</label>' +
                                    '</div>' +
                                    '<i class="far fa-file-alt ml-2"></i>' +
                                    '<div class="group-ben input-txt-dis">' +
                                    '<input class="input-txt" type="text" value="' + p6 + '" required>' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">P6</label>' +
                                    '</div>' +
                                    '</div>');
            }

            optionField1 = () => {
                $('#optionField').html('<div class="input-container">' +
                                    '<i class="far fa-file-alt"></i>' +
                                    '<div class="group-ben">' +
                                    '<select id="rcaField" class="input-txt " disabled required></select>' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl lbl-dr">RCA</label>' +
                                    '</div>' +
                                    '<i class="far fa-file-alt"></i>' +
                                    '<div class="group-ben">' +
                                    '<input type="text" id="rcaAge" class="input-txt input-txt-dis" value="' + v.g_gbv_age + '" required>' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">GBV Age</label>' +
                                    '</div>' +
                                    '<i class="far fa-file-alt"></i>' +
                                    '<div class="group-ben">' +
                                    '<input type="text" id="rcaSex" class="input-txt input-txt-dis" value="' + v.g_gbv_sex + '" required>' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">GBV Sex</label>' +
                                    '</div>' +
                                    '</div>');

                $.ajax({
                    url: $base_url + 'Grievance/fetch_rca',
                    method: 'get',
                    dataType: 'json',
                    success: result => {
                        $('#rcaField').empty();
                        $.each(result, function(k, r) {
                            $('#rcaField').append('<option value="'+r.root_id+'">'+ r.root_code + ': ' + r.root_description +'</option>');
                        });
                        $('#rcaField').val(v.g_rca);
                    },
                    error: (xhr, ajaxOptions, thrownError) => {
                        console.error('Error in fetch RCA: ' + xhr.status + ' => ' + thrownError);
                    }
                })

            }

            subjectField = () => {
                $('#subjectField').append('<i class="far fa-file-alt"></i>' +
                                        '<div class="group-ben">' +
                                        '<input type="text" id="subjectComp" class="input-txt input-txt-dis" value="' + v.g_subj_complaint + '" required>' +
                                        '<span class="highlight"></span>' +
                                        '<span class="bar"></span>' +
                                        '<label class="input-lbl">Subject complaint</label>' +
                                        '</div>');
            }

            // Category Option Field
            if (v.category_opt == 'rca1') {
                optionField();
            } else if (v.category_opt == 'rca2') {
                optionField1();
            } else {
                $('#optionField').empty();
            }

            if (v.category_subj == 'Yes') {
                subjectField();
            } else {
                $('#subjectField').empty();
            }


            
            // Attachments

            let fileType;
            $.ajax({
                url: $base_url + 'Grievance/fetch_attachments',
                method: 'get',
                dataType: 'json',
                data: {id: v.g_id},
                success: result => {
                    $.each(result, (k, a) => {
                        fileType = a.file_name;
                        if (v.g_status == 'Resolved') {
                            if (fileType.indexOf('.docx') > -1) {
                                $('.attachment-old').append('<button class="btn btn-sm btn-primary m-2"><i class="fas fa-file-word mr-1"></i><a class="text-white" download="'+a.file_name+'" href="'+$base_url +'assets/file/'+ a.file_enc_name +'">'+a.file_name+'</a></button>');
                            } else if (fileType.indexOf('.doc') > -1) {
                                $('.attachment-old').append('<button class="btn btn-sm btn-primary m-2"><i class="fas fa-file-word mr-1"></i><a class="text-white" download="'+a.file_name+'" href="'+$base_url +'assets/file/'+ a.file_enc_name +'">'+a.file_name+'</a></button>');
                            } else if (fileType.indexOf('.xlsx') > -1) {
                                $('.attachment-old').append('<button class="btn btn-sm btn-success m-2"><i class="fas fa-file-excel mr-1"></i><a class="text-white" download="'+a.file_name+'" href="'+$base_url +'assets/file/'+ a.file_enc_name +'">'+a.file_name+'</a></button>');
                            } else if (fileType.indexOf('.xls') > -1) {
                                $('.attachment-old').append('<button class="btn btn-sm btn-success m-2"><i class="fas fa-file-excel mr-1"></i><a class="text-white" download="'+a.file_name+'" href="'+$base_url +'assets/file/'+ a.file_enc_name +'">'+a.file_name+'</a></button>');
                            } else if (fileType.indexOf('.csv') > -1) {
                                $('.attachment-old').append('<button class="btn btn-sm btn-success m-2"><i class="fas fa-file-csv mr-1"></i><a class="text-white" download="'+a.file_name+'" href="'+$base_url +'assets/file/'+ a.file_enc_name +'">'+a.file_name+'</a></button>');
                            } else if (fileType.indexOf('.pdf') > -1) {
                                $('.attachment-old').append('<button class="btn btn-sm btn-danger m-2"><i class="fas fa-file-pdf mr-1"></i><a class="text-white" download="'+a.file_name+'" href="'+$base_url +'assets/file/'+ a.file_enc_name +'">'+a.file_name+'</a></button>');
                            }
                        } else if (v.g_status == 'Ongoing') {
                            if (fileType.indexOf('.docx') > -1) {
                                $('.attachment-old').append('<button class="btn btn-sm btn-primary m-2"><i class="fas fa-file-word mr-1"></i><a class="text-white" download="'+a.file_name+'" href="'+$base_url +'assets/file/'+ a.file_enc_name +'">'+a.file_name+'</a></button>');
                            } else if (fileType.indexOf('.doc') > -1) {
                                $('.attachment-old').append('<button class="btn btn-sm btn-primary m-2"><i class="fas fa-file-word mr-1"></i><a class="text-white" download="'+a.file_name+'" href="'+$base_url +'assets/file/'+ a.file_enc_name +'">'+a.file_name+'</a></button>');
                            } else if (fileType.indexOf('.xlsx') > -1) {
                                $('.attachment-old').append('<button class="btn btn-sm btn-success m-2"><i class="fas fa-file-excel mr-1"></i><a class="text-white" download="'+a.file_name+'" href="'+$base_url +'assets/file/'+ a.file_enc_name +'">'+a.file_name+'</a></button>');
                            } else if (fileType.indexOf('.xls') > -1) {
                                $('.attachment-old').append('<button class="btn btn-sm btn-success m-2"><i class="fas fa-file-excel mr-1"></i><a class="text-white" download="'+a.file_name+'" href="'+$base_url +'assets/file/'+ a.file_enc_name +'">'+a.file_name+'</a></button>');
                            } else if (fileType.indexOf('.csv') > -1) {
                                $('.attachment-old').append('<button class="btn btn-sm btn-success m-2"><i class="fas fa-file-csv mr-1"></i><a class="text-white" download="'+a.file_name+'" href="'+$base_url +'assets/file/'+ a.file_enc_name +'">'+a.file_name+'</a></button>');
                            } else if (fileType.indexOf('.pdf') > -1) {
                                $('.attachment-old').append('<button class="btn btn-sm btn-danger m-2"><i class="fas fa-file-pdf mr-1"></i><a class="text-white" download="'+a.file_name+'" href="'+$base_url +'assets/file/'+ a.file_enc_name +'">'+a.file_name+'</a></button>');
                            }
                        }
                    })
                },
                error: (xhr, ajaxOptions, thrownError) => {
                    console.error('Error in fetching attachments : ' + xhr.status + ' => ' + thrownError);
                }
            });


            $('#myModal').on('hidden.bs.modal', function (e) {
              attID = [];
              $("#myModal .close").prop("onclick", null).off("click");
            })

            // end of Attachments

            $.ajax({
                url: $base_url + 'Grievance/fetch_categories',
                method: 'post',
                dataType: 'json',
                success: result => {
                    $.each(result, function(k, a) {
                        $('#category').append('<option data-rca="' + a.category_opt + '" data-subj="'+ a.category_subj +'" value="'+ a.category_id +'">'+ a.category_name +' : ' + a.category_days + ' day(s)</option>');
                    });
                    $('#category').val(v.g_category);
                    changeCat();
                    setTimeout(() => {
                        $('#sub-category').val(v.g_sub_category);
                    }, 300);
                },
                error: (xhr, ajaxOptions, thrownError) => {
                    console.error('Error in fetching categories : ' + xhr.status + ' => ' + thrownError);
                }
            });

            changeCat = () => {
                let catVal = $('#category option:selected').val();
                $('#sub-category').empty();
                 $.ajax({
                    url: $base_url + 'Grievance/fetch_sub_categories',
                    method: 'get',
                    dataType: 'json',
                    data: {cat: catVal},
                    success: result1 => {
                        $.each(result1, function(k, b) {
                            $('#sub-category').append('<option value="'+ b.sub_category_id +'">'+ b.sub_category_name +'</option>');
                        });
                    },
                    error: (xhr, ajaxOptions, thrownError) => {
                        console.error('Error in fetching sub categories : ' + xhr.status + ' => ' + thrownError);
                    }
                });
            }


            $('#tabs').tabs({ fx: { width: 'show', duration: 'slow'} });
            $("#retro-yn").val(v.g_retro_yn);
            retro_yn();
          

            if (v.g_status == 'Resolved') {
                $('.resolvedDiv').html('<div class="row">' +
                                    '<div class="col-lg-3 input-container">' +
                                    '<i class="fas fa-calendar"></i>' +
                                    '<div class="group-ben">' +
                                    '<input id="" class="input-txt trans-field" type="text" value="'+v.g_resolve_days+'" required>' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">Resolved Days</label>' +
                                    '</div>' +
                                    '</div>' +
                                    '<div class="col-lg-3 input-container">' +
                                    '<i class="fas fa-calendar"></i>' +
                                    '<div class="group-ben">' +
                                    '<input id="" class="input-txt trans-field" type="text" value="'+v.g_timeline+'" required>' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">Timeline</label>' +
                                    '</div>' +
                                    '</div>' +
                                    '<div class="col-lg-3 input-container">' +
                                    '<i class="fas fa-calendar"></i>' +
                                    '<div class="group-ben">' +
                                    '<input id="" class="input-txt trans-field" type="text" value="'+v.g_result+'" required>' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">Result</label>' +
                                    '</div>' +
                                    '</div>' +
                                    '<div class="col-lg-3 input-container">' +
                                    '<i class="fas fa-calendar"></i>' +
                                    '<div class="group-ben">' +
                                    '<input id="" class="input-txt trans-field" type="text" value="'+v.g_remarks+'" required>' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">Remarks</label>' +
                                    '</div>' +
                                    '</div>' +
                                    '</div>');


                
            }

            setTimeout(() => {
                $('.summernote1 .note-editable').attr('contenteditable',false);
                $('.summernote2 .note-editable').attr('contenteditable',false);
            }, 100);
            summernote_airmode('#my-summernote-reso');
            summernote_airmode('#my-summernote-des');
            $('.trans-field').addClass('input-txt-dis');
            $('#category').attr('disabled', true);
            $('#sub-category').attr('disabled', true);
            $('#grievanceStatus').val(v.g_status);
            $('#grievanceStatus').attr('disabled', true);
            $('#retro-yn').attr('disabled', true);
            if ($('#retro-yn option:selected').text() == 'Yes' || $('#retro-yn option:selected').text() == 'No') {
              $('#retro-yn').parent().find('.input-lbl').addClass('lbl-dr');
            }

            if ($('#dateResolve').val() != '') {
              $('#dateResolve').parent().find('.input-lbl').addClass('lbl-dr');
            }
            

            $( "#tabs" ).tabs();
            $('.input-txt-dis').focus(function(e) {
              $(this).blur();
            });


            // $('#grievanceStatus').change(function() {
            //     let stats = $(this).val();
            //     if (stats == 'Resolved') {
            //         $('#dateResolve').removeAttr('disabled');
            //         $('#dateResolve').parent().find('.input-lbl').addClass('lbl-dr');
            //     } else if (stats == 'Ongoing') {
            //         $('#dateResolve').val('');
            //         $('#dateResolve').attr('disabled', true);
            //         $('#dateResolve').parent().find('.input-lbl').removeClass('lbl-dr');
            //     }
            // });

          });
        }, 100);
    },
    error: function(xhr, ajaxOptions, thrownError) {
        console.error('Error in fetching grievance information : ' + xhr.status + ' => ' + thrownError);
    }

  });
}

function retro_yn() {
  let yn = $('#retro-yn option:selected').val();
  if (yn == 'Yes') {
    $('#retro-yes').removeAttr('disabled');
  } else if (yn == 'No' || yn == ' ') {
    $("#retro-yes").val('');
    $('#retro-yes').attr('disabled', true);
  }
}
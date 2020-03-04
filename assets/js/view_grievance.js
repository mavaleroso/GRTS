var This;
var Access = $('#access-status').val();
var attID = new Array();
var rcaType;
var ProvinceName;
var MuncipalityName;
var BarangayName;

$toID = 0;


var channel = pusher.subscribe('channel2');

var btn;

var tableCallBack = function(data) {
    tableGrievance.cell(data.row, 15).data(data.status);
    let daysRemaining = tableGrievance.cell(data.row, 7).data();
    let deadline = tableGrievance.cell(data.row, 9).data();
    let workingDays = tableGrievance.cell(data.row, 10).data();

    if (data.status == 'Working') {
        $('td[data-dt-row="'+data.row+'"][data-dt-column="16"]').empty();
        $('td[data-dt-row="'+data.row+'"][data-dt-column="16"]').html('<i class="fas fa-cogs text-center w-100"></i>');
    } else if (data.status == 'Active') {
        $('td[data-dt-row="'+data.row+'"][data-dt-column="16"]').empty();
        $('td[data-dt-row="'+data.row+'"][data-dt-column="16"]').html('<i class="action-con fas fa-edit text-center w-100" onclick="update_grievance('+ data.id +', '+ daysRemaining +', \''+ deadline +'\', '+ workingDays +', this)"></i>');
    }

}


channel.bind('dataTable', tableCallBack);

var resolvedCallBack = function(data) {
    tableGrievance.cell(data.row, 7).data(data.daysRemaining);
    tableGrievance.cell(data.row, 8).data(data.deadline);
    tableGrievance.cell(data.row, 11).data(data.status);
    tableGrievance.cell(data.row, 12).data(data.dateLAT);
    tableGrievance.cell(data.row, 13).data(data.dateResolved);
    tableGrievance.cell(data.row, 14).data(data.name);
}

channel.bind('resolved', resolvedCallBack);


var ongoingCallBack = function(data1) {
    tableGrievance.cell(data1.row, 7).data(data1.daysRemaining);
    tableGrievance.cell(data1.row, 8).data(data1.deadline);
    tableGrievance.cell(data1.row, 11).data(data1.status);
    tableGrievance.cell(data1.row, 12).data(data1.dateLAT);
    tableGrievance.cell(data1.row, 13).data("");
    tableGrievance.cell(data1.row, 14).data(data1.name);
}

channel.bind('ongoing', ongoingCallBack);


var tableGrievance = $('#tbl-grievance').DataTable( {
  processing: true,
  serverSide: true,
  order: [[0, 'desc']],
  scrollX: true,
  scrollX: "100%",
  columnDefs: [
    {
        targets: [7, 8, 9, 10, 16],
        orderable: false,
    },
    {
        visible: false,
        targets: [9, 10]
    }
  ],
  fixedColumns:   {
    leftColumns: 0,
    rightColumns: 1
  },
  lengthMenu: [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
  ajax: {
        url: $base_url + 'Grievance/fetch_grievance_table',
        type: "POST",
        data: function ( data ) {
            data.province = ProvinceName;
            data.muncipality = MuncipalityName;
            data.barangay = BarangayName;
        }
  },
  initComplete: function(settings, json) {
    setTimeout(() => {
        $('#tbl-grievance').DataTable().columns.adjust();
    }, 100);
  },
});

$('#import').submit(function(e){
    e.preventDefault();

    $('.loadText').html('Importing records...');

    $('#loadingModal').modal({
        show: true,
        backdrop: 'static',
        keyboard: false
    });


    $.ajax({
        url: $base_url + 'Import/upload',
        type:"post",
        data:new FormData(this),
        processData:false,
        contentType:false,
        cache:false,
        async:true,
        success: function(data){
            tableGrievance.ajax.reload();
            setTimeout(() => {
              $('#loadingModal').modal('toggle');
              $('#validatedCustomFile').val('');
              $('.choose-text').val('');
              $('.btn-import').attr('disabled', true);
              if (data == 1) {
                $('.toast-area').append('<div class="toast animated fadeInDown" role="alert" aria-live="assertive" data-delay="5000" aria-atomic="true">' +
                                '<div class="toast-header">' +
                                '<strong class="mr-auto toast-title">Grievance</strong>' +
                                '<button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">' +
                                '<span aria-hidden="true">&times;</span>' +
                                '</button>' +
                                '</div>' +
                                '<div class="toast-body">' +
                                'Grievance imported successfully' +
                                '</div>' +
                                '</div>');
                $(".toast").toast('show');
                $('.toast').on('hidden.bs.toast', function () {
                $(this).remove();
                });
                insert_logs('Grievance imported', null);
              } else {
                $('#myModal3 .modal-dialog').addClass('modal-sm');
                $('#myModal3 .modal-title').html('<i class="fas text-danger fa-exclamation-triangle mr-2"></i>Import Error');
                $('#myModal3 .modal-body').html('<p class="text-center">Wrong file to import.</p>');
                $('#myModal3 .modal-footer').remove();
                $('#myModal3').modal('show');
              } 
            }, 1000);
        },
     });
});

fetch_tags();

function fetch_tags() {
    $.ajax({
        url: $base_url + 'Grievance/fetch_tags',
        method: 'post',
        dataType: 'json',
        success: results => {
            $('.categoriesTags').empty();
            $.each(results.provinceCat, function(k, p) {
                $('.categoriesTags').append('<button onclick="filterProv(\''+p.provName+'\')" class="m-2 viewTags btn btn-sm">'+p.provName+'<span class="tagCount">'+p.countProv+'</span></button>')
            })

            $('.categoriesTags').append(' | ');

            $.each(results.muncityCat, function(k, m) {
                $('.categoriesTags').append('<button onclick="filterMun(\''+m.munName+'\')" class="m-2 viewTags btn btn-sm">'+m.munName+'<span class="tagCount">'+m.countMun+'</span></button>')
            })

            $('.categoriesTags').append(' | ');

            $.each(results.brgyCat, function(k, b) {
                $('.categoriesTags').append('<button onclick="filterBrgy(\''+b.brgyName+'\')" class="m-2 viewTags btn btn-sm">'+b.brgyName+'<span class="tagCount">'+b.countBrgy+'</span></button>')
            })
        },
        error: (xhr, ajaxOptions, thrownError) => {
            console.error('Error in fetch tags: ' + xhr.status + ' => ' + thrownError);
        }
    })
}

function filterProv(provinceName) {
    ProvinceName = provinceName;
    MuncipalityName = null;
    BarangayName = null;
    tableGrievance.ajax.reload();
}

function filterMun(muncipalityName) {
    MuncipalityName = muncipalityName;
    ProvinceName = null;
    BarangayName = null;
    tableGrievance.ajax.reload();
}

function filterBrgy(barangayName) {
    BarangayName = barangayName;
    ProvinceName = null;
    MuncipalityName = null;
    tableGrievance.ajax.reload();
}


function update_grievance($id, days, deadline, workingDays, This) {
  var row = tableGrievance.cell(This).index().row;
  $('#myModal').modal({
    show: true,
    backdrop: 'static',
    keyboard: false
  });
  $('#myModal .modal-title').html('<i class="fas fa-file-alt mr-2"></i>Update Grievance');
  $('#myModal .modal-body').html('<img class="loading2" src="./assets/css/images/loading2.gif" />');
  $('#myModal .modal-header').addClass('border-bottom-grs')
  $('#myModal .modal-footer').empty();
  triggerStatus($id, 'Working', row);
  $(window).on("beforeunload", function(e) {
        triggerStatus($id, 'Active', row);
  });
  $.ajax({
    url: $base_url + 'grievance/fetch_grievance_info',
    method: 'get',
    data: {id: $id},
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
            $('#myModal .close').attr('onclick', "triggerStatus("+v.g_id+", 'Active', "+row+")");
            $('#myModal .close').attr('onclick', "triggerStatus("+v.g_id+", 'Active', "+row+")");
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
                                    '<select id="grievanceStatus" class="input-txt text-black editable-fields">' +
                                    '<option value="Ongoing">Ongoing</option>' +
                                    '<option value="Resolved">Resolved</option>' +
                                    '</select>' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl lbl-dr">Status</label>' +
                                    '</div>' +
                                    '<i class="fas fa-calendar-alt ml-1"></i>' +
                                    '<div class="group-ben">' +
                                    '<input id="dateResolve" class="input-txt editable-fields" type="text" value="' + date_resolved1 + '" readonly disabled>' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">Date Resolved</label>' +
                                    '<p class="alert-dr text-danger hidden">Resolved Date is required!</p>' +
                                    '</div>' +
                                    '</div>' +
                                    '</div>' +
                                    '<div class="col-lg-12 resolvedDiv mt-2"></div>' +
                                    '</div>' +
                                    '<div id="tabs">' +
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
                                    '<select id="category" onchange="changeCat()" class="input-txt text-black editable-fields"></select>' +
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
                                    '<select id="sub-category" class="input-txt text-black editable-fields"></select>' +
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
                                    '<form class="form-horizontal" id="submit">' +
                                    '<div class="form-group">' +
                                    '<input type="file" id="fileInput" name="files[]" accept=".xls, .xlsx, .csv, .docx, .doc" multiple onchange="showname()">' +
                                    '</div>' +
                                    '<input type="text" name="grievance_id" value="'+v.g_id+'" hidden/>' +
                                    '<div class="form-group">' +
                                    '<button class="btn btn-success" id="btn_upload" type="submit" hidden>Upload</button>' +
                                    '</div>' +
                                    '</form>' +
                                    '<div class="attachment-area">' +
                                    '<div class="attachment-old"></div>' +
                                    '<div class="attachment-new"></div>' +
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
                                    '<select class="input-txt trans-field text-black editable-fields" id="retro-yn" onchange="retro_yn()" style="height: 37px" required>' +
                                    '<option value="Blank"></option>' +
                                    '<option value="Yes">Yes</option>' +
                                    '<option value="No">No</option>' +
                                    '</select>' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">Yes or No</label>' +
                                    '</div>' +
                                    '<div class="group-ben ml-2">' +
                                    '<input class="input-txt trans-field editable-fields" id="retro-yes" type="text" value="' + v.g_retro_transNo + '" disabled>' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">If Yes(Indicate retro trans no.)</label>' +
                                    '</div>' +
                                    '<div class="group-ben ml-2">' +
                                    '<input id="retro-num-child" class="input-txt trans-field editable-fields" type="text" value="' + v.g_no_child + '" required>' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">No. of child(ren) for retro</label>' +
                                    '</div>' +
                                    '</div>' +
                                    '<div name="retro" class="input-container pb-4">' +
                                    '<i class="fas fa-child"></i>' +
                                    '<div class="group-ben">' +
                                    '<input id="name-child1" class="input-txt trans-field editable-fields" type="text" value="' + v.g_name_child1 + '" required>' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">Name of child 1</label>' +
                                    '</div>' +
                                    '<i class="fas fa-child ml-2"></i>' +
                                    '<div class="group-ben">' +
                                    '<input id="name-child2" class="input-txt trans-field editable-fields" type="text" value="' + v.g_name_child2 + '" required>' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">Name of child 2</label>' +
                                    '</div>' +
                                    '<i class="fas fa-child ml-2"></i>' +
                                    '<div class="group-ben">' +
                                    '<input id="name-child3" class="input-txt trans-field editable-fields" type="text" value="' + v.g_name_child3 + '" required>' +
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

            $('#myModal .modal-footer').html('<div class="modal-btn w-100"><button class="btn btn-default btn-grs float-left" data-dismiss="modal" onclick="triggerStatus(\'' + v.g_id + '\',\'Active\',\'' + row + '\')">Cancel</button>' +
                                    '<button id="btn-grievance-update" class="btn btn-outline-primary float-right" onclick="update_grievance_reso(\'' + v.g_id + '\', \'' + days + '\', \'' + deadline + '\', \'' + workingDays + '\', \'' + row + '\')"><i class="mr-2 pt-1 fas fa-edit"></i>Update</button>' +
                                    '</div>');


            optionField = () => {
                $('#optionField').html('<div class="input-container">' +
                                    '<i class="far fa-file-alt"></i>' +
                                    '<div class="group-ben dropdown">' +
                                    '<div class="group-ben" id="root1" class="dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                                    '<input id="p1" class="input-txt search-root editable-fields" data-id="'+v.p1ID+'" type="text" value="' + p1 + '" required>' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">P1</label>' +
                                    '</div>' +
                                    '<div class="dropdown-menu animated slideIn list-root margin-drop1 search-location" aria-labelledby="root1">' +
                                    '<img class="search-loader" src="'+$base_url+'/assets/css/images/loading2.gif" />' +
                                    '</div>' +
                                    '</div>' +
                                    '<i class="far fa-file-alt ml-2"></i>' +
                                    '<div class="group-ben dropdown">' +
                                    '<div class="group-ben" id="root2" class="dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                                    '<input id="p2" class="input-txt search-root editable-fields" data-id="'+v.p2ID+'" type="text" value="' + p2 + '" required>' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">P2</label>' +
                                    '</div>' +
                                    '<div class="dropdown-menu animated slideIn list-root margin-drop1 search-location" aria-labelledby="root2">' +
                                    '<img class="search-loader" src="'+$base_url+'/assets/css/images/loading2.gif" />' +
                                    '</div>' +
                                    '</div>' +
                                    '<i class="far fa-file-alt ml-2"></i>' +
                                    '<div class="group-ben dropdown">' +
                                    '<div class="group-ben" id="root3" class="dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                                    '<input id="p3" class="input-txt search-root editable-fields" data-id="'+v.p3ID+'" type="text" value="' + p3 + '" required>' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">P3</label>' +
                                    '</div>' +
                                    '<div class="dropdown-menu animated slideIn list-root margin-drop1 search-location" aria-labelledby="root3">' +
                                    '<img class="search-loader" src="'+$base_url+'/assets/css/images/loading2.gif" />' +
                                    '</div>' +
                                    '</div>' +
                                    '</div>' +
                                    '<div class="input-container pt-4">' +
                                    '<i class="far fa-file-alt"></i>' +
                                    '<div class="group-ben dropdown">' +
                                    '<div class="group-ben" id="root4" class="dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                                    '<input id="p4" class="input-txt search-root editable-fields" data-id="'+v.p4ID+'" type="text" value="' + p4 + '" required>' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">P4</label>' +
                                    '</div>' +
                                    '<div class="dropdown-menu animated slideIn list-root margin-drop1 search-location" aria-labelledby="root4">' +
                                    '<img class="search-loader" src="'+$base_url+'/assets/css/images/loading2.gif" />' +
                                    '</div>' +
                                    '</div>' +
                                    '<i class="far fa-file-alt ml-2"></i>' +
                                    '<div class="group-ben dropdown">' +
                                    '<div class="group-ben" id="root5" class="dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                                    '<input id="p5" class="input-txt search-root editable-fields" data-id="'+v.p5ID+'" type="text" value="' + p5 + '" required>' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">P5</label>' +
                                    '</div>' +
                                    '<div class="dropdown-menu animated slideIn list-root margin-drop1 search-location" aria-labelledby="root5">' +
                                    '<img class="search-loader" src="'+$base_url+'/assets/css/images/loading2.gif" />' +
                                    '</div>' +
                                    '</div>' +
                                    '<i class="far fa-file-alt ml-2"></i>' +
                                    '<div class="group-ben dropdown">' +
                                    '<div class="group-ben" id="root6" class="dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                                    '<input id="p6" class="input-txt search-root editable-fields" data-id="'+v.p6ID+'" type="text" value="' + p6 + '" required>' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">P6</label>' +
                                    '</div>' +
                                    '<div class="dropdown-menu animated slideIn list-root margin-drop1 search-location" aria-labelledby="root6">' +
                                    '<img class="search-loader" src="'+$base_url+'/assets/css/images/loading2.gif" />' +
                                    '</div>' +
                                    '</div>' +
                                    '</div>');
            }

            optionField1 = () => {
                $('#optionField').html('<div class="input-container">' +
                                    '<i class="far fa-file-alt"></i>' +
                                    '<div class="group-ben">' +
                                    '<select id="rcaField" class="input-txt editable-fields" required></select>' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">RCA</label>' +
                                    '</div>' +
                                    '<i class="far fa-file-alt"></i>' +
                                    '<div class="group-ben">' +
                                    '<input type="number" id="rcaAge" class="input-txt editable-fields" value="' + v.g_gbv_age + '" required>' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">GBV Age</label>' +
                                    '</div>' +
                                    '<i class="far fa-file-alt"></i>' +
                                    '<div class="group-ben">' +
                                    '<select id="rcaSex" class="input-txt editable-fields" required>' +
                                    '<option></option>' +
                                    '<option value="Male">Male</option>' +
                                    '<option value="Female">Female</option>' +
                                    '</select>' +
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

                $('#rcaSex').val(v.g_gbv_sex);
            }

            subjectField = () => {
                $('#subjectField').append('<i class="far fa-file-alt"></i>' +
                                        '<div class="group-ben">' +
                                        '<input type="text" id="subjectComp" class="input-txt editable-fields" value="' + v.g_subj_complaint + '" required>' +
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
                                $('.attachment-old').append('<button class="btn btn-sm btn-primary m-2"><i class="fas fa-file-word mr-1"></i><a class="text-white" download="'+a.file_name+'" href="'+$base_url +'assets/file/'+ a.file_enc_name +'">'+a.file_name+'</a><i class="fas fa-times ml-2 deleteAtt" onclick="deleteAtt('+ a.att_id +')"></i></button>');
                            } else if (fileType.indexOf('.doc') > -1) {
                                $('.attachment-old').append('<button class="btn btn-sm btn-primary m-2"><i class="fas fa-file-word mr-1"></i><a class="text-white" download="'+a.file_name+'" href="'+$base_url +'assets/file/'+ a.file_enc_name +'">'+a.file_name+'</a><i class="fas fa-times ml-2 deleteAtt" onclick="deleteAtt('+ a.att_id +')"></i></button>');
                            } else if (fileType.indexOf('.xlsx') > -1) {
                                $('.attachment-old').append('<button class="btn btn-sm btn-success m-2"><i class="fas fa-file-excel mr-1"></i><a class="text-white" download="'+a.file_name+'" href="'+$base_url +'assets/file/'+ a.file_enc_name +'">'+a.file_name+'</a><i class="fas fa-times ml-2 deleteAtt" onclick="deleteAtt('+ a.att_id +')"></i></button>');
                            } else if (fileType.indexOf('.xls') > -1) {
                                $('.attachment-old').append('<button class="btn btn-sm btn-success m-2"><i class="fas fa-file-excel mr-1"></i><a class="text-white" download="'+a.file_name+'" href="'+$base_url +'assets/file/'+ a.file_enc_name +'">'+a.file_name+'</a><i class="fas fa-times ml-2 deleteAtt" onclick="deleteAtt('+ a.att_id +')"></i></button>');
                            } else if (fileType.indexOf('.csv') > -1) {
                                $('.attachment-old').append('<button class="btn btn-sm btn-success m-2"><i class="fas fa-file-csv mr-1"></i><a class="text-white" download="'+a.file_name+'" href="'+$base_url +'assets/file/'+ a.file_enc_name +'">'+a.file_name+'</a><i class="fas fa-times ml-2 deleteAtt" onclick="deleteAtt('+ a.att_id +')"></i></button>');
                            } else if (fileType.indexOf('.pdf') > -1) {
                                $('.attachment-old').append('<button class="btn btn-sm btn-danger m-2"><i class="fas fa-file-pdf mr-1"></i><a class="text-white" download="'+a.file_name+'" href="'+$base_url +'assets/file/'+ a.file_enc_name +'">'+a.file_name+'</a><i class="fas fa-times ml-2 deleteAtt" onclick="deleteAtt('+ a.att_id +')"></i></button>');
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

            deleteAtt2 = () => {
                $.ajax({
                    url: $base_url + 'Grievance/delete_attachment',
                    method: 'get',
                    data:{id: attID},
                    success: results => {
                    },
                    error: (xhr, ajaxOptions, thrownError) => {
                        console.error('Error in deleting attachments : ' + xhr.status + ' => ' + thrownError);
                    }
                });
            }




            $('#submit').submit(function(e){
                e.preventDefault();
                    $.ajax({
                        url: $base_url + 'Grievance/upload_file',
                        type:"post",
                        data:new FormData(this),
                        processData:false,
                        contentType:false,
                        cache:false,
                        async:true,
                        success: function(data){
                        },
                        error: (xhr, ajaxOptions, thrownError) => {
                            console.error('Error in uploading file : ' + xhr.status + ' => ' + thrownError);
                        }
                     });
            });


            showname = () => {
              $('.attachment-new').empty();
              var count = $('#fileInput')[0].files;
              var name = document.getElementById('fileInput');
              let fileName;
              for (var i = 0; i < count.length; i++) {
                fileName = name.files.item(i).name;
                if (fileName.indexOf('.docx') > -1) {
                    $('.attachment-new').append('<button class="btn btn-sm btn-outline-primary m-2"><i class="fas fa-file-word mr-1"></i>'+ name.files.item(i).name + '</button>');
                } else if (fileName.indexOf('.xlsx') > -1) {
                    $('.attachment-new').append('<button class="btn btn-sm btn-outline-success m-2"><i class="fas fa-file-excel mr-1"></i>'+ name.files.item(i).name + '</button>');
                } else if (fileName.indexOf('.pdf') > -1 ) {
                    $('.attachment-new').append('<button class="btn btn-sm btn-outline-danger m-2"><i class="fas fa-file-pdf mr-1"></i>'+ name.files.item(i).name + '</button>');
                } else if (fileName.indexOf('.doc') > -1 ) {
                    $('.attachment-new').append('<button class="btn btn-sm btn-outline-primary m-2"><i class="fas fa-file-word mr-1"></i>'+ name.files.item(i).name + '</button>');
                } else if (fileName.indexOf('.xls') > -1 ) {
                    $('.attachment-new').append('<button class="btn btn-sm btn-outline-success m-2"><i class="fas fa-file-excel mr-1"></i>'+ name.files.item(i).name + '</button>');
                } else if (fileName.indexOf('.csv') > -1 ) {
                    $('.attachment-new').append('<button class="btn btn-sm btn-outline-success m-2"><i class="fas fa-file-csv mr-1"></i>'+ name.files.item(i).name + '</button>');
                }
              }

            };
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

            $('#category').change(function() {
                $('#optionField').empty();
                $('#subjectField').empty();

                let cat_rca = $('#category option:selected').data('rca');

                if (cat_rca == 'rca1') {
                    optionField();
                    searchRoot();
                    searchRootFocus();
                } else if (cat_rca == 'rca2') {
                    optionField1();

                    $('#rcaSex').val(v.g_gbv_sex);
                } else {
                    $('#optionField').empty();
                }

                let cat_subj = $('#category option:selected').data('subj');
                if (cat_subj == 'Yes') {
                    subjectField();
                } else {
                    $('#subjectField').empty();
                }


            });

            $('#tabs').tabs({ fx: { width: 'show', duration: 'slow'} });
            $("#retro-yn").val(v.g_retro_yn);
            retro_yn();
            if (Access == 'Regional') {
                $('.modal-btn').append('<button id="btn-grievance-delete" class="btn btn-outline-danger float-right mr-2" onclick="delete_grievance(\'' + v.g_id + '\')" hidden><i class="mr-2 fas fa-trash-alt"></i>Delete</button>' +
                                    '<button id="btn-grievance-revoke" class="btn btn-outline-danger float-right" onclick="revoke_grievance(\'' + v.g_id + '\', \'' + row + '\')" hidden><i class="mr-2 pt-1 fas fa-undo-alt"></i>Undo</button>');
            }

            if (v.g_status == 'Resolved') {
                $('.resolvedDiv').html('<div class="row">' +
                                    '<div class="col-lg-3 input-container">' +
                                    '<i class="fas fa-calendar"></i>' +
                                    '<div class="group-ben">' +
                                    '<input class="input-txt trans-field" type="text" value="'+v.g_resolve_days+'" required>' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">Resolved Days</label>' +
                                    '</div>' +
                                    '</div>' +
                                    '<div class="col-lg-3 input-container">' +
                                    '<i class="fas fa-calendar"></i>' +
                                    '<div class="group-ben">' +
                                    '<input class="input-txt trans-field" type="text" value="'+v.g_timeline+'" required>' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">Timeline</label>' +
                                    '</div>' +
                                    '</div>' +
                                    '<div class="col-lg-3 input-container">' +
                                    '<i class="fas fa-calendar"></i>' +
                                    '<div class="group-ben">' +
                                    '<input class="input-txt trans-field" type="text" value="'+v.g_result+'" required>' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">Result</label>' +
                                    '</div>' +
                                    '</div>' +
                                    '<div class="col-lg-3 input-container">' +
                                    '<i class="fas fa-calendar"></i>' +
                                    '<div class="group-ben">' +
                                    '<input class="input-txt trans-field" type="text" value="'+v.g_remarks+'" required>' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">Remarks</label>' +
                                    '</div>' +
                                    '</div>' +
                                    '</div>');


                setTimeout(() => {
                    $('.summernote1 .note-editable').attr('contenteditable',false);
                    $('.summernote2 .note-editable').attr('contenteditable',false);
                }, 100);
                summernote_airmode('#my-summernote-reso');
                summernote_airmode('#my-summernote-des');
                $('#btn-grievance-delete').attr('hidden', true);
                $('#btn-grievance-update').attr('hidden', true);
                $('#btn-grievance-revoke').removeAttr('hidden');
                $('.search-root').addClass('input-txt-dis');
                $('.trans-field').addClass('input-txt-dis');
                $('#category').attr('disabled', true);
                $('#sub-category').attr('disabled', true);
                $('#grievanceStatus').val(v.g_status);
                $('#grievanceStatus').attr('disabled', true);
                $('#retro-yn').attr('disabled', true);
                $('#retro-yn').parent().find('.input-lbl').addClass('lbl-dr');
                $('#dateResolve').removeAttr('disabled');
                $('#dateResolve').parent().find('.input-lbl').addClass('lbl-dr');
                $('#submit').remove();
            } else {
                summernote('#my-summernote-reso');
                summernote('#my-summernote-des');
                $('#btn-grievance-delete').removeAttr('hidden');
            }


            if (isNaN(date_resolved)) {
                $('#dateResolve').removeClass('input-txt-dis');
                $('#dateResolve').datepicker({
                    dateFormat: 'MM dd, yy',
                    minDate: date_intake.toLocaleDateString("en-US", options),
                    maxDate: '0'
                });
            } else {
                $('#dateResolve').addClass('input-txt-dis');
            }



            searchRoot = () => {
                $(".search-root").keypress(function(){
                  This = this;
                  var rootID = $(this).attr('id');
                    setTimeout(() => {
                      let search = $(This).val();
                        $.ajax({
                            url:$base_url + 'grievance/search_root',
                            method: 'get',
                            dataType: 'json',
                            data:{search: search},
                            success: data => {
                                if (jQuery.isEmptyObject(data)) {
                                    $('.list-root').html('No results found');
                                } else {
                                    $('.list-root').empty();
                                    $('.list-root').append('<span class="dropdown-menu-arrow"></span>');
                                    $.each(data, function(k, s) {
                                      $('.list-root').append('<a href="" class="dropdown-item" onclick="root_data(\'' + s.root_id + '\', \'' + s.root_code + '\', \'' + s.root_description +'\', ' + rootID + ', event)">' + s.root_code + ': ' + s.root_description +'</a>');
                                    });
                                }
                            }
                        });
                    }, 100);
                });
            }

            searchRoot();


            searchRootFocus = () => {
                $(".search-root").on("focus",function(e) {
                    e.stopPropagation();
                    let id = $(this).closest('div').attr('id');
                    $('#' + id).dropdown('toggle');
                });
            }

            searchRootFocus();




            $( "#tabs" ).tabs();
            $('.input-txt-dis').focus(function(e) {
              $(this).blur();
            });


            $('#grievanceStatus').change(function() {
                let stats = $(this).val();
                if (stats == 'Resolved') {
                    $('#dateResolve').removeAttr('disabled');
                    $('#dateResolve').parent().find('.input-lbl').addClass('lbl-dr');
                } else if (stats == 'Ongoing') {
                    $('#dateResolve').val('');
                    $('#dateResolve').attr('disabled', true);
                    $('#dateResolve').parent().find('.input-lbl').removeClass('lbl-dr');
                }
            });

          });
        }, 100);
    },
    error: function(xhr, ajaxOptions, thrownError) {
        console.error('Error in fetching grievance information : ' + xhr.status + ' => ' + thrownError);
    }

  });
}


function triggerStatus(id, status, row) {
    $.ajax({
        url: $base_url + 'Grievance/triggerStatus',
        method: 'post',
        data: {id: id, status: status, row: row},
        error: (xhr, ajaxOptions, thrownError) => {
            console.error('Error in trigger status: ' + xhr.status + ' => ' + thrownError);
        }
    })
}

function deleteAtt(id) {
    attID.push(id);
}

$(document).on('click', '.deleteAtt', function() {
    $(this).parent().remove();
});

function root_data(id, code, description, root, event) {
    event.preventDefault();
    $(root).data('id', id);
    $(root).val(code + ': ' + description);
    $('.list-root').html('<img class="search-loader" src="'+$base_url+'/assets/css/images/loading2.gif" />');
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

function delete_grievance($id) {
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
                                    '<button class="btn btn-sm btn-grs2 float-right" data-dismiss="modal" data-dismiss="modal" onclick="delete_grievance_true(\'' + $id +'\')">YES</button></div>')

}

function delete_grievance_true($id) {
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
                method: 'get',
                data: {id: $id},
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
                                                        'Grievance deleted successfully' +
                                                        '</div>' +
                                                        '</div>');
                    $(".toast").toast('show');
                    $('.toast').on('hidden.bs.toast', function () {
                        $(this).remove();
                    });
                    insert_logs('Deleted Grievance', desc);
                    setTimeout(() => {
                        tableGrievance.ajax.reload();
                    },1500);
                    tableGrievance.ajax.reload();
                },
                error: function(xhr, ajaxOptions, thrownError) {
                    console.error('Error in deleting grievance: ' + xhr.status + ' => ' + thrownError);
                }
            });
        }
    });

}



$('#myModal2').on('hidden.bs.modal', function () {
  $('#myModal').addClass('scrollbar-open');
  $("#myModal .close").prop("onclick", null).off("click");
});

function update_grievance_reso($id, days, deadline, workingDays , row) {

    if ($('#grievanceStatus option:selected').val() == 'Resolved' && $('#dateResolve').val() == '') {
        $('.alert-dr').show('slow');
    } else {
        $('.alert-dr').hide('slow');
        $('#myModal2').modal({
          show: true,
          backdrop: 'static',
          keyboard: false
        });

        let status = '';

        if ($('#grievanceStatus').val() == 'Resolved') {
            status = 'Resolve';
        } else {
            status = 'Update'
        }

        $('#myModal2 .modal-dialog').addClass('modal-sm');
        $('#myModal2 .modal-header').addClass('border-bottom-grs2')
        $('#myModal2 .modal-title').addClass('h6');
        $('#myModal2 .modal-body').addClass('text-center');
        $('#myModal2 .modal-title').html('Confirmation');
        $('#myModal2 .modal-body').html('Are you sure you want to '+ status +' the Ongoing record?');
        $('#myModal2 .modal-footer').html('<div class="w-100"><button class="btn btn-sm btn-grs float-left" data-dismiss="modal">NO</button>' +
                                        '<button class="btn btn-sm btn-grs2 float-right" data-dismiss="modal" data-dismiss="modal" onclick="update_grievance_true(\'' + $id +'\', \' 1 \', \'' + days + '\', \''+ deadline +'\', \''+ workingDays +'\', \''+ row +'\')">YES</button></div>');
    }
}

function revoke_grievance($id , $row) {
    $('#myModal2').modal({
      show: true,
      backdrop: 'static',
      keyboard: false
    });
    $('#myModal2 .modal-body').html('<img class="loading3" src="./assets/css/images/loading2.gif" />');
    var counter = 6;
    var interval = setInterval(function() {
        counter--;
        $('#myModal2 .modal-body').html('Are you sure you want to undo resolved grievance?<br>Closing after: ' + counter);
        if (counter == 0) {
            $('#myModal2').modal('toggle');
            clearInterval(interval);
        }
        console.log(counter);
    }, 1000);
    $('#myModal2 .modal-dialog').addClass('modal-sm');
    $('#myModal2 .modal-header').addClass('border-bottom-grs-bottom-grs2')
    $('#myModal2 .modal-title').addClass('h6');
    $('#myModal2 .modal-body').addClass('text-center');
    $('#myModal2 .modal-title').html('Confirmation');
    $('#myModal2 .modal-footer').html('<div class="w-100"><button class="btn btn-sm btn-grs float-left" data-dismiss="modal">NO</button>' +
                                    '<button class="btn btn-sm btn-grs2 float-right" data-dismiss="modal" data-dismiss="modal" onclick="update_grievance_true(\'' + $id +'\', \' 2 \', null, null, null, \'' + $row +'\')">YES</button></div>');
    $("#myModal2").on("hidden.bs.modal", function () {
        clearInterval(interval);
    });
}

function update_grievance_true(id, action, days, deadline, workingDays, row1) {
  let tracking_no = $('#tracking').val();
  let hh_id = $('#hh-id').text();
  let full_name = $('#fullname').val();
  let sex = $('#sex').text();
  let region = $('#region').text();
  let province = $('#province').text();
  let city = $('#city').text();
  let barangay = $('#barangay').text();
  let subj_complaint = $('#subject').text();
  let report_mode = $('#report-mode').val();
  let category = $('#category option:selected').val();
  let sub_category = $('#sub-category option:selected').val();
  let grievance_des = $('#my-summernote-des').summernote('code');
  let date_intake = $('#dateIntake').val();
  let date_encode = $('#dateEncode').val();
  let assist_by = $('#assist-by').val();
  let cur_date = $('#curDate').text();
  let grs_timeline = $('#category-days').text();
  let results = grs_timeline - workingDays;
  let remarks;
  if (results >= 0) {
    remarks = 'Within';
  } else if (results < 0) {
    remarks = 'Beyond';
  }
  let ip_affiliation  = $('#ip').text();
  let resolution = $('#my-summernote-reso').summernote('code');

  let p1;
  let p2;
  let p3;
  let p4;
  let p5;
  let p6;

  if ($('#p1').val() != '') {
    p1 = $('#p1').data('id');
  } else {
    p1 = null;
  }

  if ($('#p2').val() != '') {
    p2 = $('#p2').data('id');
  } else {
    p2 = null;
  }

  if ($('#p3').val() != '') {
    p3 = $('#p3').data('id');
  } else {
    p3 = null;
  }

  if ($('#p4').val() != '') {
    p4 = $('#p4').data('id');
  } else {
    p4 = null;
  }

  if ($('#p5').val() != '') {
    p5 = $('#p5').data('id');
  } else {
    p5 = null;
  }

  if ($('#p6').val() != '') {
    p6 = $('#p1').data('id');
  } else {
    p6 = null;
  }

  let subj = $('#subjectComp').val();
  let retro_yn = $('#retro-yn').val();
  let retro_yes = $('#retro-yes').val();
  let retro_num_child = $('#retro-num-child').val();
  let name_child1 = $('#name-child1').val();
  let name_child2 = $('#name-child2').val();
  let name_child3 = $('#name-child3').val();
  let dateResolve = $('#dateResolve').val();
  let rca = $('#rcaField option:selected').val();
  let rcaSex = $('#rcaSex option:selected').text();
  let rcaAge = $('#rcaAge').val();
  let status;
  if (action == 1) {
    if ($('#grievanceStatus').val() == 'Resolved') {
      status = 'Resolved';
    } else {
      status = 'Ongoing';
    }
  } else if (action == 2) {
    dateResolve = '';
    status = 'Ongoing';
  }

  if (attID.length != 0) {
    deleteAtt2();
  }

  if ($('#fileInput').val() != '') {
    $('#btn_upload').click();
  }

  var dFiled = new Date(date_intake);
  var dResolved = new Date(dateResolve);

  if (dFiled > dResolved) {
    console.error('Error: Date filed is greater than Date Resolved');
    return;
  }


  $.ajax({
    url: $base_url + 'grievance/update_grievance_true',
    method: 'POST',
    data: {id: id, tracking: tracking_no, hhId: hh_id, fullName: full_name, gender: sex, loc_region: region, loc_province: province, loc_city: city, loc_brgy: barangay, subject: subj_complaint, mode: report_mode, cat: category, sub_cat: sub_category, description: grievance_des, dateIntake: date_intake, dateEncode: date_encode, assisted: assist_by, resolve: workingDays, timeline: grs_timeline, result_days: results, new_remarks: remarks, ip: ip_affiliation, reso: resolution, p1:p1, p2:p2, p3:p3, p4:p4, p5:p5, p6:p6, retro_yn:retro_yn, retro_yes:retro_yes, retro_num_child:retro_num_child, name_child1: name_child1, name_child2: name_child2, name_child3:name_child3, stats:status, days: days, deadline:deadline, rDate: dateResolve, rcaType: rcaType, subject: subj, rcaAge: rcaAge, rcaSex: rcaSex, rca: rca, row1: row1},
    success: function(result){
        if (action == 1) {
            if (status == 'Ongoing') {
              $('.toast-area').append('<div class="toast animated fadeInDown" role="alert" aria-live="assertive" data-delay="5000" aria-atomic="true">' +
                                        '<div class="toast-header">' +
                                        '<strong class="mr-auto toast-title">Grievance</strong>' +
                                        '<button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">' +
                                        '<span aria-hidden="true">&times;</span>' +
                                        '</button>' +
                                        '</div>' +
                                        '<div class="toast-body">' +
                                        'Grievance updated successfully' +
                                        '</div>' +
                                        '</div>');
                    insert_logs('Updated Grievance', '');
              } else if (status == 'Resolved') {
                  $('.toast-area').append('<div class="toast animated fadeInDown" role="alert" aria-live="assertive" data-delay="5000" aria-atomic="true">' +
                                            '<div class="toast-header">' +
                                            '<strong class="mr-auto toast-title">Grievance</strong>' +
                                            '<button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">' +
                                            '<span aria-hidden="true">&times;</span>' +
                                            '</button>' +
                                            '</div>' +
                                            '<div class="toast-body">' +
                                            'Grievance resolved successfully' +
                                            '</div>' +
                                            '</div>');
                    insert_logs('Resolved Grievance', '');
                    setTimeout(() => {
                        $('.summernote1 .note-editable').attr('contenteditable',false);
                        $('.summernote1').removeClass('summerbox');
                    }, 100);
                    summernote_airmode('#my-summernote-reso');
                    $('#btn-grievance-delete').attr('hidden', true);
                    $('#btn-grievance-update').attr('hidden', true);
                    $('#btn-grievance-revoke').removeAttr('hidden');
                    $('.search-root').addClass('input-txt-dis');
                    $('.trans-field').addClass('input-txt-dis');
                    $("#dateResolve").addClass('input-txt-dis');
                    $("#dateResolve").datepicker("destroy");
                    $('.input-txt-dis').focus(function(e) {
                      $(this).blur();
                    });

              }
        } else if (action == 2) {
            $('#grievanceStatus').val('Ongoing');
            $('#dateResolve').val('');
            setTimeout(() => {
                $('.summernote1 .note-editable').attr('contenteditable',true);
                $('.summernote1').addClass('summerbox');
            }, 100);
            summernote('#my-summernote-reso');
            $('#btn-grievance-delete').removeAttr('hidden');
            $('#btn-grievance-update').removeAttr('hidden');
            $('#btn-grievance-revoke').attr('hidden', true);
            $('.search-root').removeClass('input-txt-dis');
            $('.trans-field').removeClass('input-txt-dis');
            $("#dateResolve").removeClass('input-txt-dis');
            $("#dateResolve").val('');
            $('.toast-area').append('<div class="toast animated fadeInDown" role="alert" aria-live="assertive" data-delay="5000" aria-atomic="true">' +
                                            '<div class="toast-header">' +
                                            '<strong class="mr-auto toast-title">Grievance</strong>' +
                                            '<button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">' +
                                            '<span aria-hidden="true">&times;</span>' +
                                            '</button>' +
                                            '</div>' +
                                            '<div class="toast-body">' +
                                            'Grievance revoked successfully' +
                                            '</div>' +
                                            '</div>');
            insert_logs('Grievance Revoked', '');
        }

        $(".toast").toast('show');
        $('.toast').on('hidden.bs.toast', function () {
            $(this).remove();
        });
      $('#myModal').modal('toggle');
      get_datetime('#date-LAT');
      triggerStatus(id, 'Active', row1);
      tableGrievance.ajax.reload();
    },
    error: function(xhr, ajaxOptions, thrownError) {
      console.error('Error in updating grievance: ' + xhr.status + ' => ' + thrownError);
      triggerStatus(id, 'Active', row1);
    }

  });
}

$('.btn-choose').off().on('click', () => {
    $('#validatedCustomFile').click();
});

$('#validatedCustomFile').change(() => {
    setTimeout(() => {
        var fileName = document.getElementById("validatedCustomFile").files[0].name;
        $('.choose-text').val(fileName);
        if ($('.choose-text').val() != '') {
            $('.btn-import').attr('disabled', false);
        } else {
            $('.btn-import').attr('disabled', true);
        }
    },100);
});

$('.btn-import').off().on('click', () => {
    $('#btn-import').click();
});

$('.show-tags').off().on('click', function() {
    ProvinceName = null;
    MuncipalityName = null;
    BarangayName = null;

    let tagClass = $(this).attr('class');
    let activeClass = tagClass.indexOf('active');
    if (activeClass == -1) {
        $(this).addClass('active');
        $('.categoriesTags').slideDown('fast');
    } else {
        $(this).removeClass('active');
        $('.categoriesTags').slideUp('fast');
        tableGrievance.ajax.reload();
    }
});

$toID = 0;

var tblGrants = $('#tbl-beneficiary').DataTable( {
    processing: true,
    serverSide: true,
    order: [], 
    colReorder: true, 
    ajax: {
        url: $base_url + 'Beneficiary/fetch_beneficiary_table',
        type: "POST",
        data: function ( data ) {
            data.province = $('#prov option:selected').text();
            data.muncipality = $('#mun option:selected').text();
            data.barangay =  $('#brgy option:selected').text();
        }
    },
    columnDefs: [
        { 
            targets: [ 8 ], 
            orderable: false, 
        },
    ],
    scrollX: true,
    scrollX: "100%",
    fixedColumns:   {
        leftColumns: 0,
        rightColumns: 1
    },
    lengthMenu: [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
    initComplete: function(settings, json) {
        setTimeout(() => {
            $('#tbl-beneficiary').DataTable().columns.adjust();
        }, 1000);
    },
});



function view_beneficiary($id) {
  $('#myModal').removeClass('scrollbar-open');

  $('#myModal').modal({
    show: true,
    backdrop: 'static',
    keyboard: false
  });
  $('#myModal .modal-footer').empty();
  $('#myModal .modal-body').html('<img class="loading2" src="./assets/css/images/loading2.gif" />');


  $.ajax({
    url: $base_url + 'beneficiary/fetch_grantee_info',
    method: 'get',
    data: {id: $id},
    dataType: 'json',
    success: function(result) {
      $.each(result, function(k, v) {
        if (v.grant_member == 'rcct') {
            $('#myModal .modal-title').html('<i class="fas fa-users mr-2"></i>RCCT | Grantee Information');
            $('#myModal .modal-body').html('<div class="row">' +
                                    '<div class="col-xl-6 mt-4">' +
                                    '<div class="input-container pb-4">' +
                                    '<i class="fon-con fas fa-home fa-fw"></i>' +
                                    '<div class="group-ben-md ml-1">' +
                                    '<input class="input-txt-dis input-txt" type="text" value="' + v.grant_hh_id + '" >' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">Household ID</label>' +
                                    '</div>' +
                                    '<div class="group-ben-sm ml-2">' +
                                    '<input class="input-txt-dis input-txt" type="text" value="' + v.grant_hh_set + '" >' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">Household Set</label>' +
                                    '</div>' +
                                    '<div class="group-ben-sm ml-2">' +
                                    '<input class="input-txt-dis input-txt" type="text" value="' + v.grant_group + '" >' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">Set Group</label>' +
                                    '</div>' +
                                    '</div>' +
                                    '<div class="input-container pb-4">' +
                                    '<i class="fon-con fas fa-home fa-fw"></i>' +
                                    '<div class="group-ben ml-1">' +
                                    '<input class="input-txt-dis input-txt" type="text" value="' + v.grant_entry_id + '" >' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">Entry ID</label>' +
                                    '</div>' +
                                    '<div class="group-ben ml-2">' +
                                    '<input class="input-txt-dis input-txt" type="text" value="' + v.grant_relation_hh_head + '" >' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">Relation to HH head</label>' +
                                    '</div>' +
                                    '<div class="group-ben ml-2">' +
                                    '<input class="input-txt-dis input-txt" type="text" value="' + v.grant_ip_affiliation + '" >' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">IP affiliation</label>' +
                                    '</div>' +
                                    '</div>' +
                                    '<div class="input-container pb-4">' +
                                    '<i class="fon-con fas fa-user fa-fw"></i>' +
                                    '<div class="group-ben ml-1">' +
                                    '<input class="input-txt-dis input-txt" type="text" value="' + v.grant_lastname + '" >' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">Last Name</label>' +
                                    '</div>' +
                                    '<div class="group-ben ml-2">' +
                                    '<input class="input-txt-dis input-txt" type="text" value="' + v.grant_firstname + '" >' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">First Name</label>' +
                                    '</div>' +
                                    '<div class="group-ben ml-2">' +
                                    '<input class="input-txt-dis input-txt" type="text" value="' + v.grant_middlename + '" >' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">Middle Name</label>' +
                                    '</div>' +
                                    '<div class="group-ben-md2 ml-2">' +
                                    '<input class="input-txt-dis input-txt" type="text" value="' + v.grant_extname + '" >' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">Ext. Name</label>' +
                                    '</div>' +
                                    '</div>' +
                                    '<div class="input-container pb-4">' +
                                    '<i class="fon-con fas fa-venus-mars fa-w"></i>' +
                                    '<div class="group-ben">' +
                                    '<input class="input-txt-dis input-txt" type="text" value="' + v.grant_sex.toLowerCase() + '" >' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">Sex</label>' +
                                    '</div>' +
                                    '<i class="fon-con fas fa-calendar-day fa-w ml-1"></i>' +
                                    '<div class="group-ben">' +
                                    '<input class="input-txt-dis input-txt" type="text" value="' + v.grant_bday + '" >' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">Birthday</label>' +
                                    '</div>' +
                                    '<i class="fon-con fas fa-user-cog fa-w ml-1"></i>' +
                                    '<div class="group-ben">' +
                                    '<input class="input-txt-dis input-txt" type="text" value="' + v.grant_age + '" >' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">Age</label>' +
                                    '</div>' +
                                    '</div>' +
                                    '<div class="input-container pb-4">' +
                                    '<i class="fon-con fas fa-map-marker-alt fa-w"></i>' +
                                    '<div class="group-ben ml-1">' +
                                    '<input class="input-txt-dis input-txt" type="text" value="' + v.grant_barangay + '" >' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">Barangay</label>' +
                                    '</div>' +
                                    '<div class="group-ben ml-2">' +
                                    '<input class="input-txt-dis input-txt" type="text" value="' + v.grant_muncipality + '" >' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">Muncipaliy/City</label>' +
                                    '</div>' +
                                    '<div class="group-ben ml-2">' +
                                    '<input class="input-txt-dis input-txt" type="text" value="' + v.grant_province + '" >' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">Province</label>' +
                                    '</div>' +
                                    '<div class="group-ben ml-2">' +
                                    '<input class="input-txt-dis input-txt" type="text" value="' + v.grant_region + '" >' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">Region</label>' +
                                    '</div>' +
                                    '</div>' +
                                    '</div>' +
                                    '<div class="col-xl-6 mt-4">' +
                                    '<div class="input-container pb-4">' +
                                    '<i class="fon-con fas fa-calendar fa-w"></i>' +
                                    '<div class="group-ben">' +
                                    '<input class="input-txt-dis input-txt" type="text" value="' + v.grant_date_enumeration + '" >' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">Date enumerated</label>' +
                                    '</div>' +
                                    '<i class="fon-con fas fa-id-card fa-w ml-1"></i>' +
                                    '<div class="group-ben">' +
                                    '<input class="input-txt-dis input-txt" type="text" value="' + v.grant_mode_payment + '" >' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">Mode of payment</label>' +
                                    '</div>' +
                                    '</div>' +
                                    '<div class="input-container pb-4">' +
                                    '<i class="fon-con fas fa-calendar fa-w"></i>' +
                                    '<div class="group-ben">' +
                                    '<input class="input-txt-dis input-txt" type="text" value="' + v.grant_date_tagged + '" >' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">Date tagged</label>' +
                                    '</div>' +
                                    '<i class="fon-con fas fa-user-tag fa-w ml-1"></i>' +
                                    '<div class="group-ben">' +
                                    '<input class="input-txt-dis input-txt" type="text" value="' + v.grant_tagged_by + '" >' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">Tagged by</label>' +
                                    '</div>' +
                                    '</div>' +
                                    '<div class="input-container pb-4">' +
                                    '<i class="fon-con fas fa-calendar fa-w"></i>' +
                                    '<div class="group-ben">' +
                                    '<input class="input-txt-dis input-txt" type="text" value="' + v.grant_date_reg + '" >' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">Date registered</label>' +
                                    '</div>' +
                                    '<i class="fon-con fas fa-user-check fa-w ml-1"></i>' +
                                    '<div class="group-ben">' +
                                    '<input class="input-txt-dis input-txt" type="text" value="' + v.grant_reg_status + '" >' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">Regstration status</label>' +
                                    '</div>' +
                                    '</div>' +
                                    '<div class="input-container pb-4">' +
                                    '<i class="fon-con fas fa-female fa-w"></i>' +
                                    '<div class="group-ben">' +
                                    '<input class="input-txt-dis input-txt" type="text" value="' + v.grant_mother_maiden + '" >' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">Mother\'s maiden name</label>' +
                                    '</div>' +
                                    '</div>' +
                                    '<div class="input-container pb-4">' +
                                    '<i class="fon-con fas fa-user-edit fa-w"></i>' +
                                    '<div class="group-ben">' +
                                    '<input class="input-txt-dis input-txt" type="text" value="' + v.grant_client_status + '" >' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">Client Status</label>' +
                                    '</div>' +
                                    '</div>' +
                                    '</div>' +
                                    '</div>');

        } else if (v.grant_member ==  'mcct') {
            $('#myModal .modal-title').html('<i class="fas fa-users mr-2"></i>MCCT | Grantee Information');
            $('#myModal .modal-body').html('<div class="row">' +
                                    '<div class="col-xl-6 mt-4">' +
                                    '<div class="input-container pb-4">' +
                                    '<i class="fon-con fas fa-home fa-fw"></i>' +
                                    '<div class="group-ben-md ml-1">' +
                                    '<input class="input-txt-dis input-txt" type="text" value="' + v.grant_hh_id + '" >' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">Household ID</label>' +
                                    '</div>' +
                                    '<div class="group-ben-sm ml-2">' +
                                    '<input class="input-txt-dis input-txt" type="text" value="' + v.grant_batch + '" >' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">Batch</label>' +
                                    '</div>' +
                                    '<div class="group-ben-sm ml-2">' +
                                    '<input class="input-txt-dis input-txt" type="text" value="' + v.grant_family_status + '" >' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">Familty status</label>' +
                                    '</div>' +
                                    '</div>' +
                                    '<div class="input-container pb-4">' +
                                    '<i class="fon-con fas fa-home fa-fw"></i>' +
                                    '<div class="group-ben ml-1">' +
                                    '<input class="input-txt-dis input-txt" type="text" value="' + v.grant_person_id + '" >' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">Person ID</label>' +
                                    '</div>' +
                                    '<div class="group-ben ml-2">' +
                                    '<input class="input-txt-dis input-txt" type="text" value="' + v.grant_relation_hh_head + '" >' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">Relation to HH head</label>' +
                                    '</div>' +
                                    '<div class="group-ben ml-2">' +
                                    '<input class="input-txt-dis input-txt" type="text" value="' + v.grant_ip_affiliation + '" >' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">IP affiliation</label>' +
                                    '</div>' +
                                    '</div>' +
                                    '<div class="input-container pb-4">' +
                                    '<i class="fon-con fas fa-user fa-fw"></i>' +
                                    '<div class="group-ben ml-1">' +
                                    '<input class="input-txt-dis input-txt" type="text" value="' + v.grant_lastname + '" >' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">Last Name</label>' +
                                    '</div>' +
                                    '<div class="group-ben ml-2">' +
                                    '<input class="input-txt-dis input-txt" type="text" value="' + v.grant_firstname + '" >' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">First Name</label>' +
                                    '</div>' +
                                    '<div class="group-ben ml-2">' +
                                    '<input class="input-txt-dis input-txt" type="text" value="' + v.grant_middlename + '" >' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">Middle Name</label>' +
                                    '</div>' +
                                    '<div class="group-ben-md2 ml-2">' +
                                    '<input class="input-txt-dis input-txt" type="text" value="' + v.grant_extname + '" >' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">Ext. Name</label>' +
                                    '</div>' +
                                    '</div>' +
                                    '<div class="input-container pb-4">' +
                                    '<i class="fon-con fas fa-venus-mars fa-w"></i>' +
                                    '<div class="group-ben">' +
                                    '<input class="input-txt-dis input-txt" type="text" value="' + v.grant_sex + '" >' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">Sex</label>' +
                                    '</div>' +
                                    '<i class="fon-con fas fa-calendar-day fa-w ml-1"></i>' +
                                    '<div class="group-ben">' +
                                    '<input class="input-txt-dis input-txt" type="text" value="' + v.grant_bday + '" >' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">Birthday</label>' +
                                    '</div>' +
                                    '<i class="fon-con fas fa-user-cog fa-w ml-1"></i>' +
                                    '<div class="group-ben">' +
                                    '<input class="input-txt-dis input-txt" type="text" value="' + v.grant_age + '" >' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">Age</label>' +
                                    '</div>' +
                                    '</div>' +
                                    '<div class="input-container pb-4">' +
                                    '<i class="fon-con fas fa-map-marker-alt fa-w"></i>' +
                                    '<div class="group-ben ml-1">' +
                                    '<input class="input-txt-dis input-txt" type="text" value="' + v.grant_barangay + '" >' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">Barangay</label>' +
                                    '</div>' +
                                    '<div class="group-ben ml-2">' +
                                    '<input class="input-txt-dis input-txt" type="text" value="' + v.grant_muncipality + '" >' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">Muncipaliy/City</label>' +
                                    '</div>' +
                                    '<div class="group-ben ml-2">' +
                                    '<input class="input-txt-dis input-txt" type="text" value="' + v.grant_province + '" >' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">Province</label>' +
                                    '</div>' +
                                    '<div class="group-ben ml-2">' +
                                    '<input class="input-txt-dis input-txt" type="text" value="' + v.grant_region + '" >' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">Region</label>' +
                                    '</div>' +
                                    '</div>' +
                                    '</div>' +
                                    '<div class="col-xl-6 mt-4">' +
                                    '<div class="input-container pb-4">' +
                                    '<i class="fon-con fas fa-id-badge fa-w"></i>' +
                                    '<div class="group-ben">' +
                                    '<input class="input-txt-dis input-txt" type="text" value="' + v.grant_client_status + '" >' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">Member status</label>' +
                                    '</div>' +
                                    '<i class="fon-con fas fa-user-tie fa-w ml-1"></i>' +
                                    '<div class="group-ben">' +
                                    '<input class="input-txt-dis input-txt" type="text" value="' + v.grant_occupation + '" >' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">Occupation</label>' +
                                    '</div>' +
                                    '</div>' +
                                    '<div class="input-container pb-4">' +
                                    '<i class="fon-con fas fa-user-graduate fa-w"></i>' +
                                    '<div class="group-ben">' +
                                    '<input class="input-txt-dis input-txt" type="text" value="' + v.grant_highest_education + '" >' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">Highest education</label>' +
                                    '</div>' +
                                    '<i class="fon-con fas fa-user-alt fa-w ml-1"></i>' +
                                    '<div class="group-ben">' +
                                    '<input class="input-txt-dis input-txt" type="text" value="' + v.grant_solo_parent + '" >' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">Solo parent</label>' +
                                    '</div>' +
                                    '</div>' +
                                    '<div class="input-container pb-4">' +
                                    '<i class="fon-con fas fa-school fa-w"></i>' +
                                    '<div class="group-ben">' +
                                    '<input class="input-txt-dis input-txt" type="text" value="' + v.grant_attending_school + '" >' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">Attending school</label>' +
                                    '</div>' +
                                    '<div class="group-ben ml-2">' +
                                    '<input class="input-txt-dis input-txt" type="text" value="' + v.grant_school_name + '" >' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">School name</label>' +
                                    '</div>' +
                                    '</div>' +
                                    '<div class="input-container pb-4">' +
                                    '<i class="fon-con fas fa-hospital fa-w"></i>' +
                                    '<div class="group-ben">' +
                                    '<input class="input-txt-dis input-txt" type="text" value="' + v.grant_attending_health_facility + '" >' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">Attending health facility</label>' +
                                    '</div>' +
                                    '<div class="group-ben ml-2">' +
                                    '<input class="input-txt-dis input-txt" type="text" value="' + v.grant_health_facility_name + '" >' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">Health facility</label>' +
                                    '</div>' +
                                    '</div>' +
                                    '<div class="input-container pb-4">' +
                                    '<i class="fon-con fas fa-id-card fa-w"></i>' +
                                    '<div class="group-ben">' +
                                    '<input class="input-txt-dis input-txt" type="text" value="' + v.grant_enrollment_type + '" >' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">Enrollment type</label>' +
                                    '</div>' +
                                    '<i class="fon-con fas fa-user-injured fa-w ml-1"></i>' +
                                    '<div class="group-ben">' +
                                    '<input class="input-txt-dis input-txt" type="text" value="' + v.grant_disable + '" >' +
                                    '<span class="highlight"></span>' +
                                    '<span class="bar"></span>' +
                                    '<label class="input-lbl">Disabled</label>' +
                                    '</div>' +
                                    '</div>' +
                                    '</div>' +
                                    '</div>');

            
        }

        $('.input-txt-dis').focus(function(e) {
            $(this).blur();
        });
        
      });


    },
    error: function(xhr, ajaxOptions, thrownError) {
      console.error('Error in fetching grantees data: ' + xhr.status + ' => ' + thrownError);
    }
  });
}


$('#prov').change(function() {
    let psgcProv = $('#prov option:selected').val();
    $('#mun').empty();
    $('#brgy').empty();
    $.ajax({
        url: $base_url + 'beneficiary/fetch_muncipality',
        method: 'get',
        data: {prov: psgcProv},
        dataType: 'json',
        success: result => {
            $('#mun').append('<option selected></option>');
            $.each(result, function(k, v) {
                $('#mun').append('<option value="'+v.PSGC_CITY+'">' + v.CITY_NAME + '</option>');
            });

            let mun = $('#mun option:selected').val();
            fetch_brgy(mun);
        },
        error: (xhr, ajaxOptions, thrownError) => {
            console.error('Error in fetching mucipality: ' + xhr.status + ' => ' + thrownError);
        }
    });
});

$('#mun').change(function() {
    let val = $('#mun option:selected').val();
    fetch_brgy(val);
})

function fetch_brgy(mun) {
    $('#brgy').empty();
    $.ajax({
        url: $base_url + 'Beneficiary/fetch_brgy',
        method: 'get',
        data: {mun: mun},
        dataType: 'json',
        success: result => {
            $('#brgy').append('<option selected></option>');
            $.each(result, function(k, v) {
                $('#brgy').append('<option>'+v.BRGY_NAME+'</option>');
            });
        },
        error: (xhr, ajaxOptions, thrownError) => {
            console.error('Error in fetching barangay: ' + xhr.status + ' => ' + thrownError);
        }
    });
}

$('#btn-filter').off().on('click', function(){
    let prov = $('#prov option:selected').text();
    let mun = $('#mun option:selected').text();
    let brgy = $('#brgy option:selected').text();

    if (prov == '' && mun == '' && brgy == '') {

    } else {
        $('.loadText').html('Filtering records...');
        $('#loadingModal').modal({
            show: true,
            backdrop: 'static',
            keyboard: false
        });
        tblGrants.ajax.reload(function() {
            setTimeout(() => {
                $('#loadingModal').modal('toggle');
            }, 1000);
        });
    }
        
});
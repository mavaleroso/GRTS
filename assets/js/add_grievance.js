$toID = 0;

datePicker('#date-f');
datePicker('#date-assist');

var This;

function datePicker(field) {
	$(field).datepicker({ 
		dateFormat: 'MM dd, yy',
		maxDate: '0'
	});
}

$(".search-field").keypress(function() {
  setTimeout(() => {
    let grantee = $('input[type=radio]:checked').val();
    if ($('input[type=radio]:checked').val() == 'RCCT' || $('input[type=radio]:checked').val() == 'MCCT') {
      let search = $(this).val();
      $('.search-result').html('<img src="'+ $base_url +'/assets/css/images/loading2.gif" class="search-loader" />');
        $.ajax({
            url:$base_url + "main/search_grantee",
            method:"get",
            data:{query: search, memType: grantee},
            success:function(data){
              var d = JSON.parse(data);
              if (jQuery.isEmptyObject(d)) {
                $('.search-result').html('No results found');
              } else { 
                $('.search-result').empty();
                $('.search-result').append('<span class="dropdown-menu-arrow"></span>');
                $.each(d, function(k, v) {
                  $('.search-result').append('<a href="" class="dropdown-item" onclick="search_data(\'' + v.grant_id +'\', \'' + v.grant_firstname +'\' , \'' + v.grant_middlename +'\', \'' + v.grant_lastname +'\', \'' + v.grant_hh_id +'\', \'' + v.grant_hh_set +'\', \'' + v.grant_ip_affiliation +'\', \'' + v.grant_sex +'\', \'' + v.grant_purok +'\', \'' + v.grant_barangay +'\', \'' + v.grant_muncipality +'\', \'' + v.grant_province +'\', \'' + v.grant_region +'\', event)">'+ v.grant_hh_id + '<br>' +v.grant_firstname+ ' ' + v.grant_middlename + ' ' + v.grant_lastname +'</a>');
                });
				    	}
            },
            error: (xhr, ajaxOptions, thrownError) => {
              console.error('Error in matching grantee: ' + xhr.status + ' => ' + thrownError);
            }
        });
    }
  }, 100);
}).on('keydown', function(e) {
   if (e.keyCode == 8)
     $(this).trigger('keypress');
});

$(".search-brgy").keypress(function(){
  let id = $(this).attr('id');
  setTimeout(() => {
    let search = $(this).val();
    $('.list-brgy').html('<img src="'+ $base_url +'/assets/css/images/loading2.gif" class="search-loader" />');
    $.ajax({
        url:$base_url + "main/search_brgy",
        method:"get",
        data:{search: search},
        dataType: 'json',
        success:function(data){
          if (jQuery.isEmptyObject(data)) {
            $('.list-brgy').html('No results found');
          } else {
            $('.list-brgy').empty();
            $('.list-brgy').append('<span class="dropdown-menu-arrow"></span>');
            $.each(data, function(k, v) {
              $('.list-brgy').append('<a class="dropdown-item" href="" onclick="fill_location(\''+ id +'\',\'' + v.BRGY_NAME +'\', event)">'+ v.BRGY_NAME +'</a>');
            });
          }
        },
        error: (xhr, ajaxOptions, thrownError) => {
          console.error('Error in matching barangay: ' + xhr.status + ' => ' + thrownError);
        }
    });
  }, 100);
}).on('keydown', function(e) {
   if (e.keyCode == 8)
     $(this).trigger('keypress');
});

$(".search-mun-city").keypress(function(){
  let id = $(this).attr('id');
  setTimeout(() => {
    let search = $(this).val();
    $('.list-mun-city').html('<img src="'+ $base_url +'/assets/css/images/loading2.gif" class="search-loader" />');
    $.ajax({
        url:$base_url + "main/search_mun_city",
        method:"get",
        data:{search: search},
        success:function(data){
          var d = JSON.parse(data);
          if (jQuery.isEmptyObject(d)) {
            $('.list-mun-city').html('No results found');
          } else {
            $('.list-mun-city').empty();
            $('.list-mun-city').append('<span class="dropdown-menu-arrow"></span>');
            $.each(d, function(k, v) {
              $('.list-mun-city').append('<a class="dropdown-item" href="" onclick="fill_location(\''+ id +'\',\'' + v.CITY_NAME +'\', event)">'+ v.CITY_NAME +'</a>');
            });
          }
        },
        error: (xhr, ajaxOptions, thrownError) => {
          console.error('Error in matching city/muncipality: ' + xhr.status + ' => ' + thrownError);
        }
    });
  }, 100);
}).on('keydown', function(e) {
   if (e.keyCode == 8)
     $(this).trigger('keypress');
});

$(".search-provinces").keypress(function(){
  let id = $(this).attr('id');
  setTimeout(() => {
    let search = $(this).val();
    $('.list-province').html('<img src="'+ $base_url +'/assets/css/images/loading2.gif" class="search-loader" />');
    $.ajax({
        url:$base_url + "main/search_provinces",
        method:"get",
        data:{search: search},
        success:function(data){
          var d = JSON.parse(data);
          if (jQuery.isEmptyObject(d)) {
            $('.list-province').html('No results found');
          } else {
            $('.list-province').empty();
            $('.list-province').append('<span class="dropdown-menu-arrow"></span>');
            $.each(d, function(k, v) {
              $('.list-province').append('<a class="dropdown-item" href="" onclick="fill_location(\''+ id +'\',\'' + v.PROVINCE_NAME +'\', event)">'+ v.PROVINCE_NAME +'</a>');
            });
          }
        },
        error: (xhr, ajaxOptions, thrownError) => {
          console.error('Error in matching provinces: ' + xhr.status + ' => ' + thrownError);
        }
    });
  }, 100);
}).on('keydown', function(e) {
   if (e.keyCode == 8)
     $(this).trigger('keypress');
});

$(".search-regions").keypress(function(){
  let id = $(this).attr('id');
  setTimeout(() => {
    let search = $(this).val();
    $('.list-region').html('<img src="'+ $base_url +'/assets/css/images/loading2.gif" class="search-loader" />');
    $.ajax({
        url:$base_url + "main/search_regions",
        method:"get",
        data:{search: search},
        success:function(data){
          var d = JSON.parse(data);
          if (jQuery.isEmptyObject(d)) {
            $('.list-region').html('No results found');
          } else {
          $('.list-region').empty();
          $('.list-region').append('<span class="dropdown-menu-arrow"></span>');
          $.each(d, function(k, v) {
            $('.list-region').append('<a class="dropdown-item" href="" onclick="fill_location(\''+ id +'\',\'' + v.REGION_NAME +'\', event)">'+ v.REGION_NAME +'</a>');
          });
          }
        },
        error: (xhr, ajaxOptions, thrownError) => {
          console.error('Error in matching regions: ' + xhr.status + ' => ' + thrownError);
        }
    });
  }, 100);
      
}).on('keydown', function(e) {
   if (e.keyCode == 8)
     $(this).trigger('keypress');
});

$('#category').change(function(){
  $catType = 0;
  $('.divCat').empty();
   let val = $('#category').val();
   let valTxt = $('#category').text();

   let catSubj = $(this).find(':selected').data('subj');
   let catOpt = $(this).find(':selected').data('rca');
 
   if (catOpt == 'rca1' || valTxt == 'Payment-related issues') {
      $catType = 1;
      $('.divCat').append('<div class="row field-set pl-3 pr-3">' +
                          '<div class="col-lg-4 input-container">' +
                          '<i class="fas fa-file-alt ml-1"></i>' +
                          '<div class="group dropdown">' +
                          '<div class="group" id="root1" class="dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                          '<input type="text" id="p1" class="input-txt search-root" name="" required>' +
                          '<span class="highlight"></span>' +
                          '<span class="bar"></span>' +
                          '<label class="input-lbl">P1</label>' +
                          '</div>' +
                          '<div class="dropdown-menu animated slideIn list-root margin-drop1 search-location" aria-labelledby="root1">' +
                          '<img class="search-loader" src="'+$base_url+'/assets/css/images/loading2.gif" />' +
                          '</div>' +
                          '</div>' +
                          '</div>' +
                          '<div class="col-lg-4 input-container">' +
                          '<i class="fas fa-file-alt ml-1"></i>' +
                          '<div class="group dropdown">' +
                          '<div class="group" id="root2" class="dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                          '<input type="text" id="p2" class="input-txt search-root" name="" required>' +
                          '<span class="highlight"></span>' +
                          '<span class="bar"></span>' +
                          '<label class="input-lbl">P2</label>' +
                          '</div>' +
                          '<div class="dropdown-menu animated slideIn list-root margin-drop1 search-location" aria-labelledby="root2">' +
                          '<img class="search-loader" src="'+$base_url+'/assets/css/images/loading2.gif" />' +
                          '</div>' +
                          '</div>' +
                          '</div>' +
                          '<div class="col-lg-4 input-container">' +
                          '<i class="fas fa-file-alt ml-1"></i>' +
                          '<div class="group dropdown">' +
                          '<div class="group" id="root3" class="dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                          '<input type="text" id="p3" class="input-txt search-root" name="" required>' +
                          '<span class="highlight"></span>' +
                          '<span class="bar"></span>' +
                          '<label class="input-lbl">P3</label>' +
                          '</div>' +
                          '<div class="dropdown-menu animated slideIn list-root margin-drop1 search-location" aria-labelledby="root3">' +
                          '<img class="search-loader" src="'+$base_url+'/assets/css/images/loading2.gif" />' +
                          '</div>' +
                          '</div>' +
                          '</div>' +
                             '<div class="col-lg-4 input-container">' +
                          '<i class="fas fa-file-alt ml-1"></i>' +
                          '<div class="group dropdown">' +
                          '<div class="group" id="root4" class="dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                          '<input type="text" id="p4" class="input-txt search-root" name="" required>' +
                          '<span class="highlight"></span>' +
                          '<span class="bar"></span>' +
                          '<label class="input-lbl">P4</label>' +
                          '</div>' +
                          '<div class="dropdown-menu animated slideIn list-root margin-drop1 search-location" aria-labelledby="root4">' +
                          '<img class="search-loader" src="'+$base_url+'/assets/css/images/loading2.gif" />' +
                          '</div>' +
                          '</div>' +
                          '</div>' +
                             '<div class="col-lg-4 input-container">' +
                          '<i class="fas fa-file-alt ml-1"></i>' +
                          '<div class="group dropdown">' +
                          '<div class="group" id="root5" class="dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                          '<input type="text" id="p5" class="input-txt search-root" name="" required>' +
                          '<span class="highlight"></span>' +
                          '<span class="bar"></span>' +
                          '<label class="input-lbl">P5</label>' +
                          '</div>' +
                          '<div class="dropdown-menu animated slideIn list-root margin-drop1 search-location" aria-labelledby="root5">' +
                          '<img class="search-loader" src="'+$base_url+'/assets/css/images/loading2.gif" />' +
                          '</div>' +
                          '</div>' +
                          '</div>' +
                             '<div class="col-lg-4 input-container">' +
                          '<i class="fas fa-file-alt ml-1"></i>' +
                          '<div class="group dropdown">' +
                          '<div class="group" id="root6" class="dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                          '<input type="text" id="p6" class="input-txt search-root" name="" required>' +
                          '<span class="highlight"></span>' +
                          '<span class="bar"></span>' +
                          '<label class="input-lbl">P6</label>' +
                          '</div>' +
                          '<div class="dropdown-menu animated slideIn list-root margin-drop1 search-location" aria-labelledby="root6">' +
                          '<img class="search-loader" src="'+$base_url+'/assets/css/images/loading2.gif" />' +
                          '</div>' +
                          '</div>' +
                          '</div>' +
                          '</div>');
   }


   if (catOpt == 'rca2' || valTxt == 'Gender-related issues') {
      $catType = 2;
      $('.divCat').append('<div class="row field-set pl-3 pr-3">' +
                          '<div class="col-lg-6 input-container">' +
                          '<i class="fas fa-file ml-1"></i>' +
                          '<div class="group">' +
                          '<select class="input-txt" id="rca" name="" required></select>' +
                          '<span class="highlight"></span>' +
                          '<span class="bar"></span>' +
                          '<label class="input-lbl">RCA<sup>*</sup></label>' +
                          '<p class="field-required alert-rca">This field is required.</p>' +
                          '</div>' +
                          '</div>' +
                          '<div class="col-lg-3 input-container">' +
                          '<i class="fas fa-portrait ml-1"></i>' +
                          '<div class="group">' +
                          '<input type="number" id="rca-age" class="input-txt" name="" required>' +
                          '<span class="highlight"></span>' +
                          '<span class="bar"></span>' +
                          '<label class="input-lbl">Age<sup>*</sup></label>' +
                          '<p class="field-required alert-rca-age">This field is required.</p>' +
                          '</div>' +
                          '</div>' +
                          '<div class="col-lg-3 input-container">' +
                          '<i class="fas fa-venus-mars ml-1"></i>' +
                          '<div class="group">' +
                          '<select class="input-txt" id="rca-sex" name="" required>' +
                          '<option></option>' +
                          '<option>Male</option>' +
                          '<option>Female</option>' +
                          '</select>' +
                          '<span class="highlight"></span>' +
                          '<span class="bar"></span>' +
                          '<label class="input-lbl">Sex<sup>*</sup></label>' +
                          '<p class="field-required alert-rca-sex">This field is required.</p>' +
                          '</div>' +
                          '</div>' +
                          '</div>');
   }

   if (catSubj == 'Yes') {
      $('.divCat').append('<div class="row field-set pl-3 pr-3">' +
                          '<div class="col-lg-12 input-container">' +
                          '<i class="fas fa-file-alt ml-1"></i>' +
                          '<div class="group">' +
                          '<input type="text" id="subject" class="input-txt" name="" required>' +
                          '<span class="highlight"></span>' +
                          '<span class="bar"></span>' +
                          '<label class="input-lbl">Subject of complaint<sup>*</sup></label>' +
                          '<p class="field-required alert-subject">This field is required.</p>' +
                          '</div>' +
                          '</div>' +
                          '</div>');
   }

   $(".search-root").keypress(function(){
    This = this;
      setTimeout(() => {
        let search = $(This).val();
          $.ajax({
              url:$base_url + "grievance/search_root",
              method:"get",
              data:{search: search},
              success:function(data){
                  var d = JSON.parse(data);
                  if (jQuery.isEmptyObject(d)) {
                      $('.list-root').html('No results found');
                  } else { 
                      $('.list-root').empty();
                      $('.list-root').append('<span class="dropdown-menu-arrow"></span>');
                      $.each(d, function(k, v) {
                        $('.list-root').append('<a href="" class="dropdown-item" onclick="root_data(\'' + v.root_id + '\',\'' + v.root_code + '\', \'' + v.root_description +'\', event)">' + v.root_code + ': ' + v.root_description +'</a>');
                      });
                  }   
              },
              error: (xhr, ajaxOptions, thrownError) => {
                console.error('Error in matching root: ' + xhr.status + ' => ' + thrownError);
              }
          });
      }, 100);
  }).on('keydown', function(e) {
     if (e.keyCode == 8)
       $(this).trigger('keypress');
  });

  $(".search-root").on("focus",function(e) {
      e.stopPropagation();
      let id = $(this).closest('div').attr('id');
      $('#' + id).dropdown('toggle');
  });
 

   $.ajax({
       url: $base_url + "main/sub_category",
       method: 'get',
       data: { cat_id: val },
       dataType: 'json',
       success:function(result) {
            $('#sub-category').empty();
            $.each(result, function(k, v) {
              $('#sub-category').append('<option value="'+v.sub_category_id+'">'+ v.sub_category_name + '</option>');
            });

        },
        error: (xhr, ajaxOptions, thrownError) => {
          console.error('Error in fetching sub_category: ' + xhr.status + ' => ' + thrownError);
        }
   });

   $.ajax({
       url: $base_url + "main/fetch_rca",
       method: 'get',
       data: { rca: val },
       dataType: 'json',
       success:function(result) {
            $('#rca').empty();
            $.each(result, function(k, v) {
              $('#rca').append('<option data-id="'+v.root_id+'" value="'+ v.root_code +'">'+ v.root_description + '</option>');
            });
        },
        error: (xhr, ajaxOptions, thrownError) => {
          console.error('Error in fetching rca: ' + xhr.status + ' => ' + thrownError);
        }
    });
});


function root_data(id, code, description, event) {
  event.preventDefault();
  $(This).val(code + ': ' + description);
  $(This).data('id', id);
  $('.list-root').html('<img class="search-loader" src="'+$base_url+'/assets/css/images/loading2.gif" />');
}

$(".search-field").on("focus",function() {
	let id = $(this).closest('div').attr('id');
	$('#' + id).dropdown('toggle');
});
$(".search-brgy").on("focus",function() {
	let id = $(this).closest('div').attr('id');
	$('#' + id).dropdown('toggle');
});
$(".search-mun-city").on("focus",function() {
	let id = $(this).closest('div').attr('id');
	$('#' + id).dropdown('toggle');
});
$(".search-provinces").on("focus",function() {
	let id = $(this).closest('div').attr('id');
	$('#' + id).dropdown('toggle');
});
$(".search-regions").on("focus",function() {
	let id = $(this).closest('div').attr('id');
	$('#' + id).dropdown('toggle');
});

function fill_location(field, value, event) {
	event.preventDefault();
	$('#' + field).val(value);
}

$('input[name=optradio]').click(function() {
  $('.input-txt').val('');
  if ($('input[name=optradio]:checked').val() == 'RCCT' || $('input[name=optradio]:checked').val() == 'MCCT') {
    $('.search-result').css('display', '');
  } else if ($('input[name=optradio]:checked').val() == 'Non-beneficiary') {
    $('.search-result').hide();
  }
});


function search_data($id1, $fname1, $mname2, $lname3, $hh_id4, $hh_set5, $ip_affiliation6, $sex7, $purok8, $brgy9, $muncipality10, $provinces11, $region12, event) {
      event.preventDefault();
      $beneficiary_id = $id1;
      $('#fname').val($fname1);
      $('#mname').val($mname2);
      $('#lname').val($lname3);
      $('#hh-id').val($hh_id4);
      $('#set').val($hh_set5);
      $('#ip').val($ip_affiliation6);
      $('#purok').val($purok8);
      $('#brgy').val($brgy9);
      $('#mun-city').val($muncipality10);
      $('#province').val($provinces11);
      $('#region').val($region12);

      if ($sex7.toLowerCase() === 'male') {
        $('#sex').val('Male').change();
      } else if ($sex7.toLowerCase() === 'female') {
        $('#sex').val('Female').change();
      }
      
      $('.search-result').html('<img src="'+ $base_url +'/assets/css/images/loading2.gif" class="search-loader" />');
    }

function btn_submit() {
      $comp_type = $('input[name=optradio]:checked').val();
      $r_mode = $('#rep-mode option:selected').text();
      $household_id = $('#hh-id').val();
      $set = $('#set').val();
      $fname = $('#fname').val();
      $mname = $('#mname').val();
      $lname = $('#lname').val();
      $sex = $('#sex').val();
      $purok = $('#purok').val();
      $brgy = $('#brgy').val();
      $mun_city = $('#mun-city').val();
      $province = $('#province').val();
      $region = $('#region').val();
      $date_filed = $('#date-f').val();
      $client_status = 'Ongoing';
      $ip = $('#ip').val();
      $contact = $('#contact').val();
      $category = $("#category option:selected").text();
      $categoryVal = $("#category option:selected").val();
      $sub_category = $('#sub-category option:selected').text();
      $sub_categoryVal = $('#sub-category option:selected').val();
      $comp_des = $('#comp-des').val();
      $in_reso = $('#in-reso').val();
      $assist_by = $('#assist-by').val();
      $date_assist = $('#date-assist').val();
      $filed_location = $('#user-location').val();
      $p1 = $('#p1').val();
      $p2 = $('#p2').val();
      $p3 = $('#p3').val();
      $p4 = $('#p4').val();
      $p5 = $('#p5').val();
      $p6 = $('#p6').val();
      $p1ID = $('#p1').data('id');
      $p2ID = $('#p2').data('id');
      $p3ID = $('#p3').data('id');
      $p4ID = $('#p4').data('id');
      $p5ID = $('#p5').data('id');
      $p6ID = $('#p6').data('id');
      $rca = $('#rca option:selected').text();
      $rcaVal = $('#rca option:selected').data('id');
      $rcaAge = $('#rca-age').val();
      $rcaSex = $('#rca-sex option:selected').text();
      $subject = $('#subject').val();

      let catOpt = $('#category').find(':selected').data('rca');
      let catSubj = $('#category').find(':selected').data('subj');

      if ($in_reso == '' || $assist_by == '' || $date_assist == '' || $r_mode == '') {

        if ($in_reso == '') {
          $('.alert-resolution').show('slow');
        } else {
          $('.alert-resolution').hide('slow');
        }

        if ($assist_by == '') {
          $('.alert-assist-by').show('slow');
        } else {
          $('.alert-assist-by').hide('slow');
        }

        if ($date_assist == '') {
          $('.alert-date-assist').show('slow');
        } else {
          $('.alert-date-assist').hide('slow');
        }

        if ($r_mode == '') {
          $('.alert-r-mode').show('slow');
        } else {
          $('.alert-r-mode').hide('slow');
        }

      } else {
        $('.field-required').hide();

        $('#myModal').modal({
          show: true,
          backdrop: 'static',
          keyboard: false
        });
        $('#myModal .modal-footer').empty();
        $('#myModal .modal-body').empty();
        $('#myModal .modal-title').empty();
        $('#myModal .modal-title').html('<h4><i class="fas fa-file-alt mr-2"></i>GRIEVANCE FORM</h4>');
        $('#myModal .modal-body').html('<table id="table-modal" style="width: 100%; border-collapse: collapse">' +
                                  '<tr>' +
                                  '<th class="font-weight-bold" colspan="6">I. COMPLAINANT INFORMATION</th>' +
                                  '</tr>' +
                                  '<tr>' +
                                  '<td class="font-weight-bold">Complainant Type:</td>' +
                                  '<td>'+ $comp_type +'</td>' +
                                  '<td class="font-weight-bold">Report Mode:</td>' +
                                  '<td>'+ $r_mode +'</td>' +
                                  '<td class="font-weight-bold">Date Filed:</td>' +
                                  '<td>'+ $date_filed +'</td>' +
                                  '</tr>' +
                                  '<tr>' +
                                  '<td class="font-weight-bold">Household ID #:</td>' +
                                  '<td>'+ $household_id +'</td>' +
                                  '<td  class="font-weight-bold">Set:</td>' +
                                  '<td>'+ $set +'</td>' +
                                  '<td class="font-weight-bold">Client Status:</td>' +
                                  '<td>'+ $client_status +'</td>' +
                                  '</tr>' +
                                  '<tr>' +
                                  '<td class="font-weight-bold">Name:</td>' +
                                  '<td>'+ $fname + ' ' + $mname + ' ' + $lname +'</td>' +
                                  '<td class="font-weight-bold">Sex:</td>' +
                                  '<td>'+ $sex +'</td>' +
                                  '<td class="font-weight-bold">IP Affiliation:</td>' +
                                  '<td>'+ $ip +'</td>' +
                                  '</tr>' +
                                  '<tr>' +
                                  '<td class="font-weight-bold">Address:</td>' +
                                  '<td colspan="3">'+ $purok + ' ' + $brgy + ', ' + $mun_city + ', ' + $province + ', ' + $region +'</td>' +
                                  '<td class="font-weight-bold">Contact #:</td>' +
                                  '<td>'+ $contact +'</td>' +
                                  '</tr>' +
                                  '<tr>' +
                                  '<th class="font-weight-bold" colspan="6">II. GRIEVANCE INFORMATION</th>' +
                                  '</tr>' +
                                  '<tr style="border-bottom: 1px solid #999">' +
                                  '<td class="font-weight-bold">Category:</td>' +
                                  '<td colspan="2">'+ $category +'</td>' +
                                  '<td class="font-weight-bold">Sub-category:</td>' +
                                  '<td colspan="2">'+ $sub_category +'</td>' +
                                  '</tr>' +
                                  // additional
                                  '<tr class="optRow1">' +
                                  '</tr>' +
                                  '<tr class="optRow2">' +
                                  '</tr>' +
                                  '<tr class="optRow3">' +
                                  '</tr>' +
                                  // end
                                  '<tr>' +
                                  '<td class="font-weight-bold" colspan="6" style="border-bottom: 1px solid #fff">Please describe the complaint here.</td>' +
                                  '</tr>' +
                                  '<tr>' +
                                  '<td colspan="6">'+ $comp_des +'</td>' +
                                  '</tr>' +
                                  '<tr>' +
                                  '<th class="font-weight-bold" colspan="6">III. RESOLUTION INFORMATION </th>' +
                                  '</tr>' +
                                  '<tr>' +
                                  '<td class="font-weight-bold" colspan="6" style="border-bottom: 1px solid #fff">Initial Resolution</td>' +
                                  '</tr>' +
                                  '<tr style="border-bottom: 1px solid #999">' +
                                  '<td colspan="6">'+ $in_reso +'</td>' +
                                  '</tr>' +
                                  '<tr>' +
                                  '<td class="font-weight-bold">Assisted by:</td>' +
                                  '<td colspan="2">'+ $assist_by +'</td>' +
                                  '<td class="font-weight-bold">Date assisted:</td>' +
                                  '<td colspan="2">'+ $date_assist +'</td>' +
                                  '</tr>' +
                                  '<tr>' +
                                  '<td class="font-weight-bold">Filed location:</td>' +
                                  '<td colspan="5">'+ $filed_location + '</td>' +
                                  '</tr>' +
                                  '</table>')
      }
      $('#myModal .modal-footer').html('<button type="button" class="float-left btn btn-info" data-dismiss="modal">Cancel</button><button type="button" class="pull-right btn btn-info" onclick="insert_grievance()" data-dismiss="">Submit</button>');
    
      if (catOpt == 'rca1') {
        $('.optRow1').html('<td class="font-weight-bold">P1:</td>' +
                            '<td>' + $p1 + '</td>' +
                            '<td class="font-weight-bold">P2:</td>' +
                            '<td>' + $p2 + '</td>' +
                            '<td class="font-weight-bold">p3:</td>' +
                            '<td>' + $p3 + '</td>');

       $('.optRow2').html('<td class="font-weight-bold">P4:</td>' +
                            '<td>' + $p4 + '</td>' +
                            '<td class="font-weight-bold">P5:</td>' +
                            '<td>' + $p5 + '</td>' +
                            '<td class="font-weight-bold">P6:</td>' +
                            '<td>' + $p6 + '</td>');
      } else if (catOpt == 'rca2') {
        $('.optRow1').html('<td class="font-weight-bold">RCA:</td>' +
                            '<td>' + $rca + '</td>' +
                            '<td class="font-weight-bold">RCA Age:</td>' +
                            '<td>' + $rcaAge + '</td>' +
                            '<td class="font-weight-bold">RCA Sex:</td>' +
                            '<td>' + $rcaSex + '</td>');
      }

      if (catSubj == 'Yes') {
        $('.optRow3').html('<td class="font-weight-bold">Subject:</td>' +
                            '<td colspan="5">' + $subject + '</td>');
      }
    }

    function insert_grievance() {
      if ($filed_location == '') {
        welcome1();
      } else {
         $.ajax({
            url:$base_url + "grievance/insert_grievance",
            method:"POST",
            data:{ ben_id:$beneficiary_id, r_mode: $r_mode, member:$comp_type, household_id:$household_id, hh_set:$set, fname:$fname, mname:$mname, lname:$lname, sex:$sex, purok:$purok, brgy:$brgy, mun_city:$mun_city, province:$province, region:$region, date_filed:$date_filed, date_encoded:$dateToday, client_status:$client_status, ip:$ip, contact:$contact, category:$categoryVal, sub_category:$sub_categoryVal, comp_des:$comp_des, in_reso:$in_reso, assist_by:$assist_by, date_assist:$date_assist, filed_location: $filed_location, rca: $rcaVal, rcaAge: $rcaAge, rcaSex: $rcaSex, p1: $p1ID, p2: $p2ID, p3: $p3ID, p4: $p4ID, p5: $p5ID, p6: $p6ID, subj: $subject, catType: $catType},
            success:function(result){
              if (result == 1) {
                $('#myModal3').modal({
                  show: true,
                  backdrop: 'static',
                  keyboard: false
                });
                $('#myModal3 .modal-header .close').remove();
                $('#myModal3 .modal-title').html('<i class="fas text-danger fa-exclamation-triangle mr-2"></i>Duplicate Error');
                $('#myModal3 .modal-body').html('<p class="text-center">The Grievance Data is already exist and still Ongoing this year.</p><div class="timerDiv"></div>');
                $('#myModal3 .modal-body .timerDiv').html('<p class="text-center">Please check again the information.</p>');
                
                setTimeout(() => {
                  $('#myModal').modal('toggle');
                  $('#myModal3').modal('toggle');
                }, 3000);
            
              } else {
                $('#myModal').modal('toggle');
                $('.toast-area').append('<div class="toast animated fadeInDown" role="alert" aria-live="assertive" data-delay="5000" aria-atomic="true">' +
                                        '<div class="toast-header">' +
                                        '<strong class="mr-auto toast-title">Grievance</strong>' +
                                        '<button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">' +
                                        '<span aria-hidden="true">&times;</span>' +
                                        '</button>' +
                                        '</div>' +
                                        '<div class="toast-body">' +
                                        'Grievance added successfully' +
                                        '</div>' +
                                        '</div>' +
                '');
                $(".toast").toast('show');
                
                $('.toast').on('hidden.bs.toast', function () {
                    $(this).remove();
                });

                setTimeout(() => {
                  insert_logs('Add Grievance');
                  Add_grievance();
                }, 1500);
              }
            },
            error: function(xhr, ajaxOptions, thrownError) {
              console.error('Error in inserting grievance: ' + xhr.status + ' => ' + thrownError);
            }
        });
      }
    }

    function btn_move($trig1, $trig2, $trig3, $trig4) {
      $($trig1).hide();
      $($trig2).show('slow');
      $($trig3).removeClass('active');
      $($trig4).addClass('active');
    }

    function btn_com_info() {
      let fname = $('#fname').val();
      let lname = $('#lname').val();
      let sex = $('#sex option:selected').text();
      let brgy = $('#brgy').val();
      let mun_city = $('#mun-city').val();
      let province = $('#province').val();
      let region = $('#region').val();
      let date_filed = $('#date-f').val();

      if (fname == '' || lname == '' || sex == '' || brgy == '' || mun_city == '' || province == '' || region == '' || date_filed == '' ) {

        if (fname == '') {
          $('.alert-fname').show('slow');
        } else {
          $('.alert-fname').hide('slow');
        }

        if (lname == '') {
          $('.alert-lname').show('slow');
        } else {
          $('.alert-lname').hide('slow');
        }

        if (sex == ' ') {
          $('.alert-sex').show('slow');
        } else {
          $('.alert-sex').hide('slow');
        }

        if (brgy == '') {
          $('.alert-brgy').show('slow');
        } else {
          $('.alert-brgy').hide('slow');
        }

        if (mun_city == '') {
          $('.alert-mun-city').show('slow');
        } else {
          $('.alert-mun-city').hide('slow');
        }

        if (province == '') {
          $('.alert-province').show('slow');
        } else {
          $('.alert-province').hide('slow');
        }

        if (region == '') {
          $('.alert-region').show('slow');
        } else {
          $('.alert-region').hide('slow');
        }

        if (date_filed == '') {
          $('.alert-date-filed').show('slow');
        } else {
          $('.alert-date-filed').hide('slow');
        }

      } else {
        $('.field-required').hide();
        $('#form-sec1').hide();
        $('#form-sec2').show('slow');
        $('.tab1').removeClass('active');
        $('.tab2').addClass('active');
      }

    }

    function btn_griev_info() {
      let a = 0;
      let b = 0;
      let c = 0;
      let d = 0;
      let e = 0;
      let f = 0;
      let category = $('#category').val();
      let description = $('#comp-des').val();
      let rca = $('#rca option:selected').val();
      let rcaAge = $('#rca-age').val();
      let rcaSex = $('#rca-sex option:selected').val();
      let subject = $('#subject').val();
      let catSubj = $('#category').find(':selected').data('subj');
      let catOpt = $('#category').find(':selected').data('rca');

       if (catOpt == 'rca2') {

        if (rca == '') {
          $('.alert-rca').show('slow');
          a = 1;
        } else {
          $('.alert-rca').hide('slow');
          a = 0;
        }

        if (rcaAge == '') {
          $('.alert-rca-age').show('slow');
          b = 1;
        } else {
          $('.alert-rca-age').hide('slow');
          b = 0;
        }

        if (rcaSex == '') {
          $('.alert-rca-sex').show('slow');
          c = 1;
        } else {
          $('.alert-rca-sex').hide('slow');
          c = 0;
        }
      } 

      if (catSubj == 'Yes') {
        if (subject == '') {
          $('.alert-subject').show('slow');
          d = 1;
        } else {
          $('.alert-subject').hide('slow');
          d = 0;
        }
      }


      if (category == '') {
        $('.alert-category').show('slow');
          e = 1;
      } else {
        $('.alert-category').hide('slow');
          e = 0;
      }

      if (description == '') {
        $('.alert-description').show('slow');
          f = 1;
      } else {
        $('.alert-description').hide('slow');
          f = 0;
      }

      if (a == 0 && b == 0 && c == 0 && d == 0 && e == 0 && f == 0) {
        $('.field-required').hide();
        $('#form-sec2').hide();
        $('#form-sec3').show('slow');
        $('.tab2').removeClass('active');
        $('.tab3').addClass('active');
      }
        
    }

    $('#date-e').focus(function() {
      get_datetime('#date-e');
    });


    get_date();
    function get_date() {
      $.ajax({
          url: $base_url + "main/get_datetime",
          method: 'POST',
          success:function(result) {
            var d = JSON.parse(result);
            $.each(d, function(k, v) {
              $dateToday = v.Result;
            });
          },
          error: (xhr, ajaxOptions, thrownError) => {
            console.error('Error in fetching current date and time: ' + xhr.status + ' => ' + thrownError);
          }
      });
    }

$base_url = $("#base-url").val();
$beneficiary = "";
$beneficiary_id = "";
$user_name = $('#ogName').val();
$sessionID = $('#sesuser-id').val();
$toID = 0;

var user_name = $('#user-name').val();
var userimg = $('#img-user').val();
var messageAction = 0;


var pusher = new Pusher('474122b4eeeae7308798', {
  cluster: 'ap2',
  forceTLS: true
});



function mediaSize(x) {
  if (x.matches) {
    $('.nav2-container').removeClass('show');
    $("#sidebarCollapse").attr("onclick", false);
    $('#sidebarCollapse').attr('hidden', true);
    $('#notification1').attr('hidden', true);
    $('#logout1').attr('hidden', true);
    $('#nav2').attr('hidden', false);
    $('.btn-print').hide();
  } else {
    $('.nav2-container').removeClass('show');
    $('#sidebarCollapse').attr('hidden', false);
    $("#sidebarCollapse").attr("onclick","sidebar1()");
    $('#notification1').attr('hidden', false);
    $('#logout1').attr('hidden', false);
    $('#nav2').attr('hidden', true);
    $('.btn-print').show();
  }
}

var x = window.matchMedia("(max-width: 767px)");
mediaSize(x);
x.addListener(mediaSize);



  function sidebar1() {
    $('#sidebar, #content').toggleClass('active');
    $('.collapse.in').toggleClass('in');
    $('a[aria-expanded=true]').attr('aria-expanded', 'false');
  }




  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })

  $(function () {
    $('[data-toggle="popover"]').popover()
  })


  $("#sidebar").mCustomScrollbar({
      theme: "minimal"
  });




  $('#expand-grievance').on('click', function () {
    $('#expand-grievance-arrow').toggleClass('active-font');
    $(this).removeClass('active');
    $(this).toggleClass('nav-grievance');
  });

  $('#myModal').on('hidden.bs.modal', function () {
    $('#myModal .modal-header').removeClass('border-bottom-grs');
    $('#myModal .modal-title').empty();
    $('#myModal .modal-body').html('<img class="loading2" src="'+$base_url+'/assets/css/images/loading2.gif" />');
    $('#myModal .modal-footer').empty();
  })

  $('#myModal3').on('hidden.bs.modal', function () {
    $('#myModal3 .modal-dialog').removeClass('modal-sm');
  })


  function Dashboard() {
    window.history.pushState("test", "test", "/GRTS/dashboard");
    document.title = "GRTS Dashboard";
    $('.nav-dash').addClass('active');
    $('.nav-add-grievance').removeClass('active');
    $('.nav-view-grievance').removeClass('active');
    $('.nav-duplicate-entry').removeClass('active');
    $('.nav-beneficiary').removeClass('active');
    $('.nav-reports').removeClass('active');
    $('.nav-logs').removeClass('active');
    $('.a-message').removeClass('active');
    $('.a-profile').removeClass('active');
    $('.nav2-container').removeClass('show');

    $('.content-body').empty();
    $('.content-body').html('<img class="loading" src="' + $base_url + '/assets/css/images/loading.gif" />');
  	$.ajax({
  		url: $base_url + "/main/dashboard_data",
  		type: "html",
  		success:function(data){$('.content-body').html(data);},
      error: (xhr, ajaxOptions, thrownError) => {
        console.error('Error in loading dashboard page: ' + xhr.status + ' => ' + thrownError);
      }
  	});
  }

  function Add_grievance() {
    window.history.pushState("test", "test", "/GRTS/add_grievance");
    document.title = "GRTS Add Grievance";
    $('.nav-dash').removeClass('active');
    $('.nav-add-grievance').addClass('active');
    $('.nav-view-grievance').removeClass('active');
    $('.nav-duplicate-entry').removeClass('active');
    $('.nav-beneficiary').removeClass('active');
    $('.nav-reports').removeClass('active');
    $('.nav-logs').removeClass('active');
    $('.a-message').removeClass('active');
    $('.a-profile').removeClass('active');
    $('.nav2-container').removeClass('show');

    $('.content-body').empty();
    $('.content-body').html('<img class="loading" src="' + $base_url + '/assets/css/images/loading.gif" />');
    $.ajax({
      url: $base_url + "/main/add_grievance_data",
      type: "html",
      success:function(data){$('.content-body').html(data);},
      error: (xhr, ajaxOptions, thrownError) => {
        console.error('Error in loading add grievance page: ' + xhr.status + ' => ' + thrownError);
      }
    });
  }

  function View_grievance() {
    window.history.pushState("test", "test", "/GRTS/view_grievance");
    document.title = "GRTS View Grievance";
    $('.nav-dash').removeClass('active');
    $('.nav-add-grievance').removeClass('active');
    $('.nav-view-grievance').addClass('active');
    $('.nav-duplicate-entry').removeClass('active');
    $('.nav-beneficiary').removeClass('active');
    $('.nav-reports').removeClass('active');
    $('.nav-logs').removeClass('active');
    $('.a-message').removeClass('active');
    $('.a-profile').removeClass('active');
    $('.nav2-container').removeClass('show');

    $('.content-body').empty();
    $('.content-body').html('<img class="loading" src="' + $base_url + '/assets/css/images/loading.gif" />');
  	$.ajax({
  		url: $base_url + "/main/view_grievance_data",
  		type: "html",
  		success:function(data){$('.content-body').html(data);},
      error: (xhr, ajaxOptions, thrownError) => {
        console.error('Error in loading view grievance page: ' + xhr.status + ' => ' + thrownError);
      }
  	});
  }

  function Duplicate_entry() {
    window.history.pushState("test", "test", "/GRTS/duplicate_grievance");
    document.title = "GRTS Duplicate Grievance";
    $('.nav-dash').removeClass('active');
    $('.nav-add-grievance').removeClass('active');
    $('.nav-view-grievance').removeClass('active');
    $('.nav-duplicate-entry').addClass('active');
    $('.nav-beneficiary').removeClass('active');
    $('.nav-reports').removeClass('active');
    $('.nav-logs').removeClass('active');
    $('.a-message').removeClass('active');
    $('.a-profile').removeClass('active');
    $('.nav2-container').removeClass('show');

    $('.content-body').empty();
    $('.content-body').html('<img class="loading" src="' + $base_url + '/assets/css/images/loading.gif" />');
    $.ajax({
      url: $base_url + "/main/duplicate_entry_data",
      type: "html",
      success:function(data){$('.content-body').html(data);},
      error: (xhr, ajaxOptions, thrownError) => {
        console.error('Error in loading duplicate grievance page: ' + xhr.status + ' => ' + thrownError);
      }
    });

  }

  function Beneficiary() {
    window.history.pushState("test", "test", "/GRTS/grantees");
    document.title = "GRTS Grantees";
    $('.nav-dash').removeClass('active');
    $('.nav-add-grievance').removeClass('active');
    $('.nav-view-grievance').removeClass('active');
    $('.nav-duplicate-entry').removeClass('active');
    $('.nav-beneficiary').addClass('active');
    $('.nav-reports').removeClass('active');
    $('.nav-logs').removeClass('active');
    $('.a-message').removeClass('active');
    $('.a-profile').removeClass('active');
    $('.nav2-container').removeClass('show');

    $('.content-body').empty();
    $('.content-body').html('<img class="loading" src="' + $base_url + '/assets/css/images/loading.gif" />');
  	$.ajax({
  		url: $base_url + "/main/beneficiary_data",
  		type: "html",
  		success:function(data){$('.content-body').html(data);},
      error: (xhr, ajaxOptions, thrownError) => {
        console.error('Error in loading grantee page: ' + xhr.status + ' => ' + thrownError);
      }
  	});
    $('#example').DataTable();

  }

  function Reports() {
    window.history.pushState("test", "test", "/GRTS/reports");
    document.title = "GRTS Reports";
    $('.nav-dash').removeClass('active');
    $('.nav-add-grievance').removeClass('active');
    $('.nav-view-grievance').removeClass('active');
    $('.nav-duplicate-entry').removeClass('active');
    $('.nav-beneficiary').removeClass('active');
    $('.nav-reports').addClass('active');
    $('.nav-logs').removeClass('active');
    $('.a-message').removeClass('active');
    $('.a-profile').removeClass('active');
    $('.nav2-container').removeClass('show');

    $('.content-body').empty();
    $('.content-body').html('<img class="loading" src="' + $base_url + '/assets/css/images/loading.gif" />');
  	$.ajax({
  		url: $base_url + "/main/reports_data",
  		type: "html",
  		success:function(data){$('.content-body').html(data);},
      error: (xhr, ajaxOptions, thrownError) => {
        console.error('Error in loading reports page: ' + xhr.status + ' => ' + thrownError);
      }
  	});
  }

  function Logs() {
    window.history.pushState("test", "test", "/GRTS/logs");
    document.title = "GRTS Logs";
    $('.nav-dash').removeClass('active');
    $('.nav-add-grievance').removeClass('active');
    $('.nav-view-grievance').removeClass('active');
    $('.nav-duplicate-entry').removeClass('active');
    $('.nav-beneficiary').removeClass('active');
    $('.nav-reports').removeClass ('active');
    $('.nav-logs').addClass('active');
    $('.a-message').removeClass('active');
    $('.a-profile').removeClass('active');
    $('.nav2-container').removeClass('show');


    $('.content-body').empty();
    $('.content-body').html('<img class="loading" src="' + $base_url + '/assets/css/images/loading.gif" />');
  	$.ajax({
  		url: $base_url + "/main/logs_data",
  		type: "html",
  		success:function(data){$('.content-body').html(data);},
      error: (xhr, ajaxOptions, thrownError) => {
        console.error('Error in loading logs page: ' + xhr.status + ' => ' + thrownError);
      }
  	});
  }

  function Profile() {
    $('.a-profile').addClass('active');
    $('.a-message').removeClass('active');
    window.history.pushState("test", "test", "/GRTS/profile");
    document.title = "GRTS Profile";
    $('.nav-dash').removeClass('active');
    $('.nav-add-grievance').removeClass('active');
    $('.nav-view-grievance').removeClass('active');
    $('.nav-duplicate-entry').removeClass('active');
    $('.nav-beneficiary').removeClass('active');
    $('.nav-reports').removeClass ('active');
    $('.nav-logs').removeClass('active');
    $('.nav2-container').removeClass('show');

    $('.content-body').empty();
    $('.content-body').html('<img class="loading" src="' + $base_url + '/assets/css/images/loading.gif" />');
  	$.ajax({
  		url: $base_url + "/main/profile_data",
  		type: "html",
  		success:function(data){$('.content-body').html(data);},
      error: (xhr, ajaxOptions, thrownError) => {
        console.error('Error in loading profile page: ' + xhr.status + ' => ' + thrownError);
      }
  	});
  }

  function Message() {
    $('.a-message').addClass('active');
    $('.a-profile').removeClass('active');
    window.history.pushState("test", "test", "/GRTS/message");
    document.title = "GRTS Message";
    $('.nav-dash').removeClass('active');
    $('.nav-add-grievance').removeClass('active');
    $('.nav-view-grievance').removeClass('active');
    $('.nav-duplicate-entry').removeClass('active');
    $('.nav-beneficiary').removeClass('active');
    $('.nav-reports').removeClass ('active');
    $('.nav-logs').removeClass('active');
    $('.nav2-container').removeClass('show');

    $('.content-body').empty();
    $('.content-body').html('<img class="loading" src="' + $base_url + '/assets/css/images/loading.gif" />');
    $.ajax({
      url: $base_url + "/main/message_data",
      type: "html",
      success:function(data){$('.content-body').html(data);},
      error: (xhr, ajaxOptions, thrownError) => {
        console.error('Error in loading message page: ' + xhr.status + ' => ' + thrownError);
      }
    });
  }



  welcome1();

  function welcome1() {
    setTimeout(() => {
      let welcome = $('#welcome-trig').val();
      let location = $('#user-location').val();
      if (welcome == 'True') {
        $('#welcomeModal').modal('show');
      } else if(location == '') {
        $('.welcome-field').empty();
        $('#welcomeModal .modal-title').html('<i class="fas fa-exclamation-triangle text-warning mr-2"></i>Warning')
        $('#welcomeModal').modal('show');
        $('#welcomeModal .modal-footer').empty();
      }
    }, 1500);
  }

  function get_datetime(trig) {
    $(trig).empty();
    $.ajax({
        url: $base_url + "main/get_datetime",
        method: 'POST',
        success:function(result) {
          var d = JSON.parse(result);
          $.each(d, function(k, v) {
            $(trig).val(v.Result);
          });
        },
        error: (xhr, ajaxOptions, thrownError) => {
          console.error('Error on fetching date and time: ' + xhr.status + ' => ' + thrownError);
        }
    });
  }

  function summernote($id) {
    $($id).summernote({
      minHeight: 238,
      focus: true,
      airMode: false,
      fontNames: ['Roboto', 'Calibri', 'Times New Roman', 'Arial'],
      fontNamesIgnoreCheck: ['Roboto', 'Calibri'],
      dialogsInBody: true,
      dialogsFade: true,
      disableDragAndDrop: true,
      toolbar: [
          ['view', ['fullscreen']],
          ],
      popover: {
        air: [
          ['color', ['color']],
          ['font', ['bold', 'underline', 'clear']]
        ]
      },
  });
  $('#my-summernote2').summernote({airMode: true,placeholder:'Try the airmode'});
  }

  function summernote_airmode($id) {
    $($id).summernote({
      keyboard: false,
      minHeight: 283,
      focus: false,
      airMode: false,
      fontNames: ['Roboto', 'Calibri', 'Times New Roman', 'Arial'],
      fontNamesIgnoreCheck: ['Roboto', 'Calibri'],
      dialogsInBody: true,
      dialogsFade: true,
      disableDragAndDrop: true,
      toolbar: [],
      popover: {
        air: [
          ['color', ['color']],
          ['font', ['bold', 'underline', 'clear']]
        ]
      },
    });
  }


  function view_complainer_info($hh_id, $fullname, $purok, $brgy, $city, $province, $region, $hh_set, $sex, $contact, $ip) {
    $('#myModal2').modal({
      show: true,
      backdrop: 'static',
      keyboard: false
    });

    $('.modal-footer2').empty();
    $('.modal-title2').addClass('h5');
    $('.modal-title2').html('Complainers Information');
    $('#myModal2 .modal-header').removeClass('border-bottom-grs2');
    $('#myModal2 .modal-header').addClass('border-bottom-grs');
    $('#myModal2 .modal-dialog').removeClass('modal-sm');
    $('#myModal2 .modal-dialog').css({'width' : '70% !important'});

    $('.modal-body2').html('<div class="input-container pb-4">' +
                            '<i class="fas fa-home"></i>' +
                            '<div class="group-ben">' +
                            '<input class="input-txt-dis input-txt" type="text" value="' + $hh_id + '" >' +
                            '<span class="highlight"></span>' +
                            '<span class="bar"></span>' +
                            '<label class="input-lbl">Household ID</label>' +
                            '</div>' +
                            '<div class="group-ben-md ml-2">' +
                            '<input class="input-txt-dis input-txt" type="text" value="' + $hh_set + '" >' +
                            '<span class="highlight"></span>' +
                            '<span class="bar"></span>' +
                            '<label class="input-lbl">HH Set</label>' +
                            '</div>' +
                            '</div>' +
                            '<div class="input-container pb-4">' +
                            '<i class="fas fa-user"></i>' +
                            '<div class="group-ben">' +
                            '<input class="input-txt-dis input-txt" type="text" value="' + $fullname + '" >' +
                            '<span class="highlight"></span>' +
                            '<span class="bar"></span>' +
                            '<label class="input-lbl">Fullname</label>' +
                            '</div>' +
                            '<i class="fas fa-restroom ml-1"></i>' +
                            '<div class="group-ben-md">' +
                            '<input class="input-txt-dis input-txt" type="text" value="' + $sex + '">' +
                            '<span class="highlight"></span>' +
                            '<span class="bar"></span>' +
                            '<label class="input-lbl">Sex</label>' +
                            '</div>' +
                            '</div>' +
                            '<div class="input-container pb-4">' +
                            '<i class="fas fa-mobile"></i>' +
                            '<div class="group-ben">' +
                            '<input class="input-txt-dis input-txt" type="text" value="' + $contact + '" >' +
                            '<span class="highlight"></span>' +
                            '<span class="bar"></span>' +
                            '<label class="input-lbl">Contact</label>' +
                            '</div>' +
                            '<i class="fas fa-users"></i>' +
                            '<div class="group-ben">' +
                            '<input class="input-txt-dis input-txt" type="text" value="' + $ip + '" >' +
                            '<span class="highlight"></span>' +
                            '<span class="bar"></span>' +
                            '<label class="input-lbl">IP Affiliation</label>' +
                            '</div>' +
                            '</div>' +
                            '<div class="input-container">' +
                            '<i class="fas fa-map-marker-alt"></i>' +
                            '<div class="group-ben">' +
                            '<input class="input-txt-dis input-txt" type="text" value="' + $purok + ' ' + $brgy + ', ' + $city + ', ' + $province + ', ' + $region + '" >' +
                            '<span class="highlight"></span>' +
                            '<span class="bar"></span>' +
                            '<label class="input-lbl">Address</label>' +
                            '</div>' +
                            '</div>' +
                            '' +
                            '' +
                            '' +
                            '' +
                            '');

    $('.input-txt-dis').focus(function(e) {
      $(this).blur();
    });
  }

  notification();

  function notification() {
    $('#notify').empty();
    $('#notify').html('<div class="msg-loading"><img src="'+$base_url+'assets/css/images/loading2.gif"></div>');
    setTimeout(() => {
      let Img;
      let name;
      $.ajax({
        url: $base_url + 'Message/fetch_notification',
        method: 'post',
        dataType: 'json',
        success: results => {
              if (results.length > 0) {
                $('.newNotif').removeClass('hidden');
                $('.newNotif').html(results.length);
                $('#notify').empty();
                $.each(results, function(k, v) {
                  if ($user_name == v.name2) {
                    name = v.name1;
                    Img = v.avatar1;
                    newID = v.userID1;
                  } else {
                    name = v.name2;
                    Img = v.avatar2;
                    newID = v.userID2;
                  }
                  if (Img == null) {
                    Img = 'user-man.png';
                  }
                  $('#notify').append('<div class="dropdown-item pl-3 pr-3 pt-2 pb-2 cursor-pointer d-flex">' +
                            '<div class="msg-img-holder">' +
                            '<img class="msg-img" src="'+$base_url+'assets/user-img/'+ Img +'" >' +
                            '</div>' +
                            '<div class="ml-2">' +
                            '<p class="message-desc">'+ v.m_message +'</p>' +
                            '<p class="msg-user">'+name+'</p>' +
                            '</div>' +
                            '<i class="h5 m-auto far color-3-txt fa-arrow-alt-circle-right"></i>' +
                            '</div>');
                });
              } else {
                $('.newNotif').addClass('hidden');
                $('.newNotif').html('');
                $('#notify').empty();
                $('#notify').append('<p class="color-4-txt f-13 p-3 dropdown-item cursor-pointer m-auto text-center w-100">No new messages</p>');
              }

        },
        error: (xhr, ajaxOptions, thrownError) => {
          console.error('Error in fetching notification: ' + xhr.status + ' => ' + thrownError);
        }
      });
    }, 100);
  }

var channel = pusher.subscribe('channel1');

var chatCallBack = function(data) {
  if (data.type == 'single') {

  notification();
  if (messageAction == 0 && $sessionID == data.msg_to && $toID == data.msg_from) {
    seenState(data.code);
    if (data.msg_from == $sessionID) {
      $('.conversation').append('<p class="ml-auto msg-from msg-info1 righttip" title="'+data.date+'">' + data.message + '</p>');
    } else {
      $('.conversation').append('<p class="mr-auto msg-to msg-info2 righttip" title="'+data.date+'">' + data.message + '</p>');
    }
    $(".righttip").tooltip({
        placement:"right"
    });
    updateScroll();


  }

  let classN = $('#search-inbox').attr('class');
  if (classN == 'recent-msg') {
    inbox();
  }
  messageAction = 0;
  }
}

channel.bind('chat', chatCallBack);

channel.bind('pusher:subscription_succeeded', function(members) {
  // console.log('Successfully subscribed');
})


function seenState(code1) {
  $.ajax({
    url: $base_url + 'Message/seenState',
    method: 'post',
    data: {code: code1},
    error: (xhr, ajaxOptions, thrownError) => {
      console.error('Error at Message seen state: ' + xhr.state + ' => ' + thrownError);
    }
  })
}

function updateScroll(){
    var element = document.getElementById("msg-hist");
    element.scrollTop = element.scrollHeight;
}

$toID = 0;


$('.edit-con').click(function(){
    let id = $(this).parent().parent().siblings().attr('id');
    $('#' + id).attr('disabled', false);
    $(this).removeClass('fa-edit');
    $(this).addClass('fa-ban');
    if (id == 'uname') {
        $('#' + id).addClass('border');
    }
    setTimeout(() => {
        $(this).removeClass('edit-con');
        $(this).addClass('cancel-btn'); 
    }, 100);
});

$(document).on('click', '.cancel-btn', function() {
    let id = $(this).parent().parent().siblings().attr('id');
    $('#' + id).attr('disabled', true);
    $(this).removeClass('fa-ban'); 
    $(this).addClass('fa-edit'); 
    $(this).removeClass('fa-save'); 
    if (id == 'uname') {
        $('#' + id).removeClass('border');
    } else if (id == 'upass') {
        $('.upass').text('Password');
        $('.edit-password').fadeOut('slow');
        $('#upass').val($('#oldPass').val());
    } else if (id == 'username') {
        $('#username').val($('#old').val());
    }
    setTimeout(() => {
        $(this).removeClass('cancel-btn'); 
        $(this).removeClass('save-btn'); 
        $(this).addClass('edit-con'); 
    }, 100);
});

$("[data-toggle=popover]").popover();

$(document).on('click','.save-btn',function(){
   let id = $(this).parent().parent().siblings().attr('id');
   let value = $('#' + id).val();
   let This = this;
   $(this).removeClass('fa-save'); 
   $(this).removeClass('fa-ban'); 
   $(this).addClass('loader');
   if (id == 'uname') {
        $.ajax({
            url: $base_url + 'profile/update_name',
            method: 'post',
            data: {name: value},
            success: function(result) {
                $('#' + id).attr('disabled', true);
                $(This).removeClass('loader');
                $(This).addClass('fa-edit');
                $('#' + id).removeClass('border');
                setTimeout(() => {
                    $(This).removeClass('save-btn');
                    $(This).addClass('edit-con'); 
                    $(This).removeClass('cancel-btn');
                }, 100);

                $('.toast-area').append('<div class="toast animated fadeInDown" role="alert" aria-live="assertive" data-delay="5000" aria-atomic="true">' +
                                        '<div class="toast-header">' +
                                        '<strong class="mr-auto toast-title">Profile</strong>' +
                                        '<button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">' +
                                        '<span aria-hidden="true">&times;</span>' +
                                        '</button>' +
                                        '</div>' +
                                        '<div class="toast-body">' +
                                        'Name updated successfully' +
                                        '</div>' +
                                        '</div>' +
                '');
                $(".toast").toast('show');
                
                $('.toast').on('hidden.bs.toast', function () {
                    $(this).remove();
                });

                insert_logs('Updated Profile Name', '');
                
            },
            error: function(xhr, ajaxOptions, thrownError) {
                console.error('Error in updating name: ' + xhr.status + ' => ' + thrownError);
            }
        });
    }
    if (id == 'username') {
        $.ajax({
            url: $base_url + 'profile/update_username',
            method: 'post',
            data: {uname: value},
            success: function(result) {
                $('#' + id).attr('disabled', true);
                $(This).removeClass('loader');
                $(This).addClass('fa-edit');
                $('#' + id).removeClass('border');
                setTimeout(() => {
                    $(This).removeClass('save-btn');
                    $(This).addClass('edit-con');  
                    $(This).removeClass('cancel-btn');
                }, 100);

                $('.toast-area').append('<div class="toast animated fadeInDown" role="alert" aria-live="assertive" data-delay="5000" aria-atomic="true">' +
                                        '<div class="toast-header">' +
                                        '<strong class="mr-auto toast-title">Profile</strong>' +
                                        '<button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">' +
                                        '<span aria-hidden="true">&times;</span>' +
                                        '</button>' +
                                        '</div>' +
                                        '<div class="toast-body">' +
                                        'Username updated successfully' +
                                        '</div>' +
                                        '</div>' +
                '');
                $(".toast").toast('show');
                
                $('.toast').on('hidden.bs.toast', function () {
                    $(this).remove();
                });
                insert_logs('Updated Profile Username', '');

                
            },
            error: function(xhr, ajaxOptions, thrownError) {
                console.error('Error in updating username: ' + xhr.status + ' => ' + thrownError);
            }
        })
    }
});



$('#username').keypress(function() {
    setTimeout(() => {
        let oldUname = $('#old').val();
        let newUname = $(this).val();
        let fontCon = $(this).siblings().find('i');
        let This = this;
        if (newUname == '') {
            $(fontCon).addClass('fa-ban');
            $(fontCon).addClass('cancel-btn');
            setTimeout(() => {
                $(fontCon).removeClass('fa-save');
                $(fontCon).removeClass('save-btn');
            }, 1000);
        } else {
            $.ajax({
                url: $base_url + 'profile/check_username',
                method: 'post',
                data: {old: oldUname, new: newUname},
                success: function(result) {
                    if (result == 1) {
                        $(This).attr('data-content', 'Username already taken.');
                        $(fontCon).removeClass('loader');
                        $(fontCon).addClass('fa-times');
                        $(fontCon).addClass('Uname-close');
                        $(fontCon).removeClass('fa-save');  
                        $(fontCon).removeClass('save-btn');
                    } else {
                        $(This).attr('data-content', 'Username available.');
                        $(fontCon).addClass('save-btn');
                        $(fontCon).addClass('fa-save');  
                        $(fontCon).removeClass('Uname-close');
                    }
                    $(This).popover('show')
                },
                error: function(xhr, ajaxOptions, thrownError) {
                    console.error('Error in checking username match: ' + xhr.status + ' => ' + thrownError);
                }
            });
        }
    }, 100);
}).on('keydown', function(e) {
 if (e.keyCode == 8)
   $(this).trigger('keypress');
});

$(document).on('click', '.Uname-close', function(){
   let id = $(this).parent().parent().siblings().attr('id');
   $('#'+ id).val('');
   $('#'+ id).removeAttr('data-content');
});

$('.edit-btn2').click(function() {
    $(this).removeClass('fa-edit');
    $(this).addClass('fa-save');
    $('.card2 input').attr('disabled', false);
    $('.card2 input').addClass('input-active');
    setTimeout(() => {
        $(this).removeClass('.edit-btn2');
        $(this).addClass('save-btn2'); 
    }, 100);
});

$(document).on('click','.save-btn2',function() {
    let This = this;
    let brgy = $('#brgy').val();
    let city = $('#city').val();
    let province = $('#province').val();
    let region = $('#region').val();
    if (city.replace(/\s/g, '') != '' && province.replace(/\s/g, '') != '' && region.replace(/\s/g, '') != '') {
        $('.card2-alert').fadeOut('slow');
        $.ajax({
            url: $base_url + 'profile/update_location',
            method: 'post',
            data: {barangay: brgy, city: city, province: province, region: region},
            success: function(result) {

                $(This).addClass('fa-edit');
                $(This).removeClass('fa-save');
                $('.card2 input').attr('disabled', true);
                $('.card2 input').removeClass('input-active');
                setTimeout(() => {
                    $(This).addClass('.edit-btn2');
                    $(This).removeClass('save-btn2'); 
                }, 100);

                

                $('.toast-area').append('<div class="toast animated fadeInDown" role="alert" aria-live="assertive" data-delay="5000" aria-atomic="true">' +
                                            '<div class="toast-header">' +
                                            '<strong class="mr-auto toast-title">Profile</strong>' +
                                            '<button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">' +
                                            '<span aria-hidden="true">&times;</span>' +
                                            '</button>' +
                                            '</div>' +
                                            '<div class="toast-body">' +
                                            'Location updated successfully' +
                                            '</div>' +
                                            '</div>' +
                '');

                $(".toast").toast('show');
                
                $('.toast').on('hidden.bs.toast', function () {
                    $(this).remove();
                });

                insert_logs('Updated Profile Location', '');


            },
            error: function(xhr, ajaxOptions, thrownError) {
                console.error('Error in updating location: ' + xhr.status + ' => ' + thrownError);
            }
        })
    } else {
        $('.card2-alert').fadeIn('slow');
    }
    
 });

 $('#b-day').datepicker({
    dateFormat: 'MM dd, yy',
    maxDate: '0',
    changeMonth: true,
    changeYear: true
 });

 $('.edit-btn3').click(function() {
    $(this).removeClass('fa-edit');
    $(this).addClass('fa-save');
    $('.card3 .input-edit').attr('disabled', false);
    $('.card3 .input-edit').addClass('input-active');
    setTimeout(() => {
        $(this).removeClass('.edit-btn3');
        $(this).addClass('save-btn3'); 
    }, 100);
});


$(document).on('click','.save-btn3',function(){
    let This = this;
    let email = $('#email').val();
    let contact = $('#contact').val();
    let bday = $('#b-day').val();
    $.ajax({
        url: $base_url + 'profile/update_info',
        method: 'post',
        data: {email: email, contact: contact, bday: bday},
        success: function(result) {
            $(This).addClass('fa-edit');
            $(This).removeClass('fa-save');
            $('.card3 .input-edit').attr('disabled', true);
            $('.card3 .input-edit').removeClass('input-active');
            setTimeout(() => {
                $(This).addClass('.edit-btn3');
                $(This).removeClass('save-btn3'); 
            }, 100);

            $('.toast-area').append('<div class="toast animated fadeInDown" role="alert" aria-live="assertive" data-delay="5000" aria-atomic="true">' +
                                        '<div class="toast-header">' +
                                        '<strong class="mr-auto toast-title">Profile</strong>' +
                                        '<button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">' +
                                        '<span aria-hidden="true">&times;</span>' +
                                        '</button>' +
                                        '</div>' +
                                        '<div class="toast-body">' +
                                        'Information updated successfully' +
                                        '</div>' +
                                        '</div>' +
            '');

            $(".toast").toast('show');
            
            $('.toast').on('hidden.bs.toast', function () {
                $(this).remove();
            });
                
            insert_logs('Updated Profile Info', '');

        },
        error: function(xhr, ajaxOptions, thrownError) {
            console.error('Error in updating basic info: ' + xhr.status + ' => ' + thrownError);
        }
    });
 });

 $('.edit-pass').click(function() {
    $(this).addClass('fa-ban');
    $(this).removeClass('fa-edit');
    $('#upass').attr('disabled', false);
    $('.upass').text('Old Pass');
    $('#upass').val(null);
    $('.edit-password').fadeIn('slow');
    setTimeout(() => {
        $(this).removeClass('edit-pass');
        $(this).addClass('cancel-btn'); 
    }, 100);
 });
 
$(document).on('click','.save-pass',function(){
    let newPass = $('#upass1').val();
    $(this).removeClass('fa-ban');
    $(this).removeClass('fa-save');
    $(this).addClass('fa-edit');
    $('#upass').val(newPass);
    $('#upass').attr('disabled', true);
    $('.upass').text('Password');
    $('.edit-password').fadeOut('slow');
    setTimeout(() => {
        $(this).addClass('edit-pass');
        $(this).removeClass('save-pass'); 
        $(this).removeClass('cancel-btn'); 
    }, 1000);
    $('#upass1').val('');
    $('#upass1').siblings().find('i').removeClass('fa-check');
    $('#upass1').siblings().find('i').addClass('font-white');
    $('#upass1').siblings().find('i').addClass('fa-edit');

    $('#upass2').val('');
    $('#upass2').siblings().find('i').removeClass('fa-check');
    $('#upass2').siblings().find('i').addClass('font-white');
    $('#upass2').siblings().find('i').addClass('fa-edit');

    $('#upass1').attr('disabled', true);
    $('#upass2').attr('disabled', true);

    $('.upass').text('Password');


    setTimeout(() => {
        $.ajax({
            url: $base_url + 'profile/update_password',
            method: 'post',
            data: {pass: newPass},
            success: function(result) {
                $('.toast-area').append('<div class="toast animated fadeInDown" role="alert" aria-live="assertive" data-delay="5000" aria-atomic="true">' +
                                        '<div class="toast-header">' +
                                        '<strong class="mr-auto toast-title">Profile</strong>' +
                                        '<button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">' +
                                        '<span aria-hidden="true">&times;</span>' +
                                        '</button>' +
                                        '</div>' +
                                        '<div class="toast-body">' +
                                        'Password updated successfully' +
                                        '</div>' +
                                        '</div>' +
                '')
                $(".toast").toast('show');
                
                $('.toast').on('hidden.bs.toast', function () {
                    $(this).remove();
                });

                insert_logs('Updated Profile Password', '');

            },
            error: function(xhr, ajaxOptions, thrownError) {
                console.error('Error in updating password: ' + xhr.status + ' => ' + thrownError);
            }
        });
    }, 100);

 });



 $('#upass').keypress(function() {
     setTimeout(() => {
        let value = $(this).val();
        let btnCon = $(this).siblings().find('i');
        let This = this;
        if (value == '') {
            $(btnCon).removeClass('fa-edit');
            $(btnCon).removeClass('fa-save');
            $(btnCon).removeClass('save-pass');
            $(btnCon).removeClass('fa-times');
            $(btnCon).removeClass('fa-check');
            $(btnCon).addClass('fa-ban');
            $(btnCon).addClass('cancel-btn');
            $('#upass1').attr('disabled', true);
            $('#upass2').attr('disabled', true);
            $('#upass1').val('');
            $('#upass2').val('');
            $('#upass1').siblings().find('i').removeClass('fa-check');
            $('#upass1').siblings().find('i').removeClass('fa-times');
            $('#upass1').siblings().find('i').addClass('fa-edit');
            $('#upass1').siblings().find('i').addClass('font-white');

            $('#upass2').siblings().find('i').removeClass('fa-check');
            $('#upass2').siblings().find('i').removeClass('fa-times');
            $('#upass2').siblings().find('i').addClass('fa-edit');
            $('#upass2').siblings().find('i').addClass('font-white');


        } else {
            $.ajax({
                url: $base_url + 'profile/match_password',
                method: 'post',
                data: {pass: value},
                success: function(result) {
                    if (result == 0) {
                        $('#upass1').attr('disabled', true);
                        $('#upass2').attr('disabled', true);
                        $('#upass1').val('');
                        $('#upass2').val('');
                        $('#upass1').siblings().find('i').removeClass('fa-check');
                        $('#upass1').siblings().find('i').removeClass('fa-times');
                        $('#upass1').siblings().find('i').addClass('fa-edit');
                        $('#upass1').siblings().find('i').addClass('font-white');

                        $('#upass2').siblings().find('i').removeClass('fa-check');
                        $('#upass2').siblings().find('i').removeClass('fa-times');
                        $('#upass2').siblings().find('i').addClass('fa-edit');
                        $('#upass2').siblings().find('i').addClass('font-white');
                         $(btnCon).removeClass('fa-edit');
                         $(btnCon).removeClass('fa-save');
                         $(btnCon).removeClass('save-pass');
                         $(btnCon).removeClass('fa-check');
                         $(btnCon).addClass('fa-times');
                         $(btnCon).removeClass('fa-ban');
                        $(btnCon).removeClass('cancel-btn');
                    } else if(result == 1) {
                         $(btnCon).removeClass('fa-edit');
                         $(btnCon).removeClass('fa-save');
                         $(btnCon).removeClass('save-pass');
                         $(btnCon).removeClass('fa-times');
                         $(btnCon).removeClass('loader');
                         $(btnCon).addClass('fa-check');
                         $('#upass1').attr('disabled', false);
                         $(btnCon).removeClass('fa-ban');
                        $(btnCon).removeClass('cancel-btn');
                    }
                },
                error: function(xhr, ajaxOptions, thrownError) {
                    console.error('Error in matching password: ' + xhr.status + ' => ' + thrownError);
                }
            });
        }
     }, 100);
 }).on('keydown', function(e) {
 if (e.keyCode == 8)
   $(this).trigger('keypress');
});

 $('#upass1').keypress(function(){
    setTimeout(() => {
        let btnCon = $(this).siblings().find('i');
        $(btnCon).addClass('fa-edit');
        $(btnCon).addClass('font-white');
        $(btnCon).removeClass('fa-check');
        $('#upass2').siblings().find('i').addClass('font-white');
        $('#upass2').val('');
        if ($(this).val() != '') {
            $('#upass2').attr('disabled', false);
            $(btnCon).removeClass('fa-edit');
            $(btnCon).removeClass('font-white');
            $(btnCon).addClass('fa-check');    
        } else if ($(this).val() == '') {
            $('#upass2').attr('disabled', true);
        }
    }, 100);
 }).on('keydown', function(e) {
 if (e.keyCode == 8)
   $(this).trigger('keypress');
});

 $('#upass2').keypress(function() {
     setTimeout(() => {
        let btnCon = $(this).siblings().find('i');
        let pass = $('#upass1').val();
        let confirmPass = $('#upass2').val();
        if (confirmPass == '') {
            $(btnCon).addClass('fa-edit');
            $(btnCon).addClass('font-white');
            $(btnCon).removeClass('fa-check');  
            $(btnCon).removeClass('fa-times');  
        } else {
            $(btnCon).removeClass('fa-edit');
            $(btnCon).removeClass('font-white');
            if (confirmPass == pass) {
                $(btnCon).removeClass('fa-times');  
                $(btnCon).addClass('fa-check');    
                $('#upass').siblings().find('i').addClass('save-pass');
                $('#upass').siblings().find('i').addClass('fa-save');
                $('#upass').siblings().find('i').removeClass('fa-check');
            } else {
                $(btnCon).removeClass('fa-check');  
                $(btnCon).addClass('fa-times');
                $('#upass').siblings().find('i').removeClass('save-pass');
                $('#upass').siblings().find('i').removeClass('fa-save');
                $('#upass').siblings().find('i').addClass('fa-check');
            }
        }
     }, 100);
 }).on('keydown', function(e) {
 if (e.keyCode == 8)
   $(this).trigger('keypress');
});


 
 var keyTime = 0;
 var keyTime1 = 0;
 var keyTime2 = 0;
 var keyInterval;
 var keyInterval1;
 var keyInterval1;

 $('.input-card1').focus(function() {
    keyInterval = setInterval(() => {
        keyTime++;
        if (keyTime === 1) {
            $(this).siblings().find('i').removeClass('loader');
            if ($(this).attr('id') != 'upass' && $(this).attr('id') != 'upass1' && $(this).attr('id') != 'upass2') {
                $(this).siblings().find('i').addClass('fa-save');
                if ($(this).attr('id') == 'uname') {
                    $(this).siblings().find('i').addClass('save-btn');
                }
            }
        }
    }, 1000);
 });

 $('.input-card1').keypress(function() {
    $(this).siblings().find('i').removeClass('fa-edit');
    $(this).siblings().find('i').removeClass('fa-times');
    $(this).siblings().find('i').removeClass('fa-save');
    $(this).siblings().find('i').removeClass('fa-ban');
    $(this).siblings().find('i').removeClass('cancel-btn');
    $(this).siblings().find('i').addClass('loader');
    keyTime = 0;
 }).on('keydown', function(e) {
if (e.keyCode == 8)
    $(this).trigger('keypress');
});

 $('.input-card1').focusout(function() {
    $(this).siblings().find('i').removeClass('loader');
    if ($(this).attr('id') != 'upass' && $(this).attr('id') != 'upass1' && $(this).attr('id') != 'upass2') {
        $(this).siblings().find('i').addClass('fa-save');
    } 
    clearInterval(keyInterval);
 });


 $('.input-card2').keypress(function() {
    let id = $(this).attr('id');
    let btnCon;
    if (id == 'city' || id == 'province' || id == 'region') {
        btnCon = $(this).parent().parent().siblings().find('.edit-btn2');
    } else if (id == 'purok' || id == 'brgy') {
        btnCon = $(this).parent().parent().parent().parent().siblings().find('.edit-btn2');
    }
    $(btnCon).addClass('fa-edit');
    $(btnCon).addClass('loader');
    keyTime1 = 0;
 }).on('keydown', function(e) {
     if (e.keyCode == 8)
       $(this).trigger('keypress');
    });


 $('.input-card2').focus(function() {
    let id = $(this).attr('id');
    let btnCon;
    if (id == 'city' || id == 'province' || id == 'region') {
        btnCon = $(this).parent().parent().siblings().find('.edit-btn2');
    } else if (id == 'purok' || id == 'brgy') {
        btnCon = $(this).parent().parent().parent().parent().siblings().find('.edit-btn2');
    }

    keyInterval1 = setInterval(() => {
        keyTime1++;
        if (keyTime1 == 1) {
            $(btnCon).removeClass('loader');
            $(btnCon).addClass('fa-save');
        }
    }, 1000);
 });

 $('.input-card2').focusout(function() {
    let id = $(this).attr('id');
    let btnCon;
    if (id == 'city' || id == 'province' || id == 'region') {
        btnCon = $(this).parent().parent().siblings().find('.edit-btn2');
    } else if (id == 'purok' || id == 'brgy') {
        btnCon = $(this).parent().parent().parent().parent().siblings().find('.edit-btn2');
    }
    $(btnCon).removeClass('loader');
    $(btnCon).addClass('fa-save');
    clearInterval(keyInterval1);
 });


  $('.input-card3').keypress(function() {
    let id = $(this).attr('id');
    let btnCon;
    if (id == 'email') {
        btnCon = $(this).siblings().find('.edit-btn3');
    } else if (id == 'contact') {
        btnCon = $(this).parent().parent().siblings().find('.edit-btn3');
    }
    $(btnCon).addClass('fa-edit');
    $(btnCon).addClass('loader');
    keyTime2 = 0;
 }).on('keydown', function(e) {
 if (e.keyCode == 8)
   $(this).trigger('keypress');
});


 $('.input-card3').focus(function() {
    let id = $(this).attr('id');
    let btnCon;
    if (id == 'email') {
        btnCon = $(this).siblings().find('.edit-btn3');
    } else if (id == 'contact') {
        btnCon = $(this).parent().parent().siblings().find('.edit-btn3');
    }

    keyInterval2 = setInterval(() => {
        keyTime2++;
        if (keyTime2 == 1) {
            $(btnCon).removeClass('loader');
            $(btnCon).addClass('fa-save');
        }
    }, 1000);
 });

 $('.input-card3').focusout(function() {
    let id = $(this).attr('id');
    let btnCon;
    if (id == 'email') {
        btnCon = $(this).siblings().find('.edit-btn3');
    } else if (id == 'contact') {
        btnCon = $(this).parent().parent().siblings().find('.edit-btn3');
    }
    $(btnCon).removeClass('loader');
    $(btnCon).addClass('fa-save');
    clearInterval(keyInterval2);
 });


$('#btn-choose').click(function() {
    $('#img-file').click();
});

function sub(obj , event) {
    let file = obj.value;
    let filename = file.split('\\');
    $('#btn-choose').html(filename[filename.length - 1]);
    $('#form-submit').submit();
    event.preventDefault();
}

$('#imgForm').submit(function(event) {
    event.preventDefault(); 
    $('#imgForm button').html('<i class="loader"></i>');
    setTimeout(() => {
        $.ajax({
        url: $base_url + 'profile/do_upload',
        method: 'post',
        data: new FormData(this),
        processData: false,
        contentType: false,
        cache: false,
        async: false,
        success: function(result) {
            delete_img();
            $('#imgForm button').html('upload');
            $('.toast-area').append('<div class="toast animated fadeInDown" role="alert" aria-live="assertive" data-delay="5000" aria-atomic="true">' +
                                        '<div class="toast-header">' +
                                        '<strong class="mr-auto toast-title">Profile</strong>' +
                                        '<button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">' +
                                        '<span aria-hidden="true">&times;</span>' +
                                        '</button>' +
                                        '</div>' +
                                        '<div class="toast-body">' +
                                        'Image updated successfully' +
                                        '</div>' +
                                        '</div>' +
            '');
            $(".toast").toast('show');
            
            $('.toast').on('hidden.bs.toast', function () {
                $(this).remove();
            });
            insert_logs('Updated Profile Image', '');

            location.reload();  
        },
        error: function(xhr, ajaxOptions, thrownError) {
            console.error('Error in uploading new image profile: ' + xhr.status + ' => ' + thrownError);
        }
    });
    }, 1000);
});

function delete_img() {
    $.ajax({
        url: $base_url + 'profile/delete_img',
        method: 'post',
        data: {img: userimg},
        error: (xhr, ajaxOptions, thrownError) => {
            console.error('Error in deleting old image: ' + xhr.status + ' => ' + thrownError);
        }
    });
}



$('#brgy').keypress(function() {
    let id = $(this).attr('id');
    setTimeout(() => {
        let search = $(this).val();
          $('.search-result').html('<img src="'+ $base_url +'/assets/css/images/loading2.gif" class="search-loader" />');
            $.ajax({
                url:$base_url + "main/search_brgy",
                method:"GET",
                data:{search: search},
                success:function(data){
                  var d = JSON.parse(data);
                  if (jQuery.isEmptyObject(d)) {
                    $('.list-brgy').html('No results found');
                  } else {
                    $('.list-brgy').empty();
                    $('.list-brgy').append('<span class="dropdown-menu-arrow"></span>');
                    $.each(d, function(k, v) {
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


$("#city").keypress(function(){
  let id = $(this).attr('id');
  setTimeout(() => {
    let search = $(this).val();
    $('.list-mun-city').html('<img src="'+ $base_url +'/assets/css/images/loading2.gif" class="search-loader" />');
    $.ajax({
        url:$base_url + "main/search_mun_city",
        method:"GET",
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

$("#province").keypress(function(){
  let id = $(this).attr('id');
  setTimeout(() => {
    let search = $(this).val();
    $('.list-province').html('<img src="'+ $base_url +'/assets/css/images/loading2.gif" class="search-loader" />');
    $.ajax({
        url:$base_url + "main/search_provinces",
        method:"GET",
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
        }
    });
  }, 100);
}).on('keydown', function(e) {
 if (e.keyCode == 8)
   $(this).trigger('keypress');
});

$("#region").keypress(function(){
  let id = $(this).attr('id');
  setTimeout(() => {
    let search = $(this).val();
    $('.list-region').html('<img src="'+ $base_url +'/assets/css/images/loading2.gif" class="search-loader" />');
    $.ajax({
        url:$base_url + "main/search_regions",
        method:"GET",
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

function fill_location(field, value, event) {
    event.preventDefault();
    $('#' + field).val(value);
}

$('.search-loc').focus(function() {
    $(this).dropdown('toggle');
});

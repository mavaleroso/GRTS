// Initialization
$toID = 0;
$dateNow = '';

inbox();


// End Initialization

var keyTime = 0;
var keyInterval;

$('#search-inbox').on('keypress', function() {
	$('.load').addClass('loader');
	let classN = $(this).attr('class');
	if (classN == 'recent-msg') {
		inbox();
	} else if (classN == 'new-msg') {
		inbox2();
	}
    keyTime = 0;
}).on('keydown', function(e) {
	if (e.keyCode==8)
	     $(this).trigger('keypress');
})

$('#search-inbox').focus(function() {
	keyInterval = setInterval(() => {
		keyTime++;
		if (keyTime === 2) {
			$('.load').removeClass('loader');
		}
	}, 1000);
});

$('#search-inbox').focusout(function() {
	$('.load').removeClass('loader');
    clearInterval(keyInterval);
});

// End loadler

// Message inbox

function inbox() {
	setTimeout(() => {
		$('#inbox').html('<div class="msg-loading"><img src="'+$base_url+'assets/css/images/loading2.gif"></div>');
		let searchVal = $('#search-inbox').val();
		let Img;
		let name;
		$.ajax({
			url: $base_url + 'Message/fetch_message',
			method: 'get',
			dataType: 'json',
			data: {name: searchVal},
			success: results => {
					$('#inbox').empty();
					if (jQuery.isEmptyObject(results)) {
						$('#inbox').append('<div class="msg-error"><p>Results Not Found</p></div>');
					} else {
						$.each(results, function(k, v) {
							if ($user_name == v.name2) {
								name = v.name1;
								Img = v.avatar1;
								newID = v.userID1;
								access = v.access1;
							} else {
								name = v.name2;
								Img = v.avatar2;
								newID = v.userID2;
								access = v.access2;
							}
							if (Img == null) {
								Img = 'user-man.png';
							}

							if (v.is_seen == 0) {
								$('#inbox').append('<div class="message-item unread" onclick="message_convo(\'' + v.m_code +'\', '+newID+', \'' + Img +'\', \'' + name +'\',  \'' + access +'\')">' +
												'<div class="msg-image">' +
												'<img class="msg-image2" src="'+$base_url+'assets/user-img/'+ Img +'" >' +
												'</div>' +
												'<div class="msg-description">' +
												'<p class="msg-name">'+name+'</p>' +
												'<p class="msg-desc">'+ v.m_message +'</p>' +
												'<p class="msg-date">'+ v.msgDate +'</p>' +
												'</div>' +
												'</div>');
							} else {
								$('#inbox').append('<div class="message-item" onclick="message_convo(\'' + v.m_code +'\', '+newID+', \'' + Img +'\', \'' + name +'\',  \'' + access +'\')">' +
												'<div class="msg-image">' +
												'<img class="msg-image2" src="'+$base_url+'assets/user-img/'+ Img +'" >' +
												'</div>' +
												'<div class="msg-description">' +
												'<p class="msg-name">'+name+'</p>' +
												'<p class="msg-desc">'+ v.m_message +'</p>' +
												'<p class="msg-date">'+ v.msgDate +'</p>' +
												'</div>' +
												'</div>');
							}
							
						});
					}
			},
			error: (xhr, ajaxOptions, thrownError) => {
				console.error('Error in fetching recent messages: ' + xhr.status + ' => ' + thrownError);
			}
		});
	}, 100);
}

function inbox2() {
	setTimeout(() => {
		$('#inbox').html('<div class="msg-loading"><img src="'+$base_url+'assets/css/images/loading2.gif"></div>');
		let searchVal = $('#search-inbox').val();
		let Img;
		let name;
		$.ajax({
			url: $base_url + 'Message/fetch_contacts',
			method: 'get',
			dataType: 'json',
			data: {name: searchVal},
			success: results => {
					$('#inbox').empty();
					if (jQuery.isEmptyObject(results)) {
						$('#inbox').append('<div class="msg-error"><p>Results Not Found</p></div>');
					} else {
						$.each(results, function(k, v) {
							if (v.avatar == null) {
								Img = 'user-man.png';
							} else {
								Img = v.avatar;
							}
							$('#inbox').append('<div class="message-item" onclick="message_convo(\'' + null +'\', '+v.user_id+', \'' + Img +'\', \'' + v.fullname +'\', \'' + v.access +'\')">' +
												'<div class="msg-image">' +
												'<img class="msg-image2" src="'+$base_url+'assets/user-img/'+ Img +'" >' +
												'</div>' +
												'<div class="new-msg-description">' +
												'<p class="new-msg-name">'+v.fullname+'</p>' +
												'</div>' +
												'</div>');
						});
					}
			},
			error: (xhr, ajaxOptions, thrownError) => {
				console.error('Error in fetching contacts: ' + xhr.status + ' => ' + thrownError);
			}
		});
	}, 100);
}

$('#new-msg').off().on('click', function() {
	$('#search-inbox').val('');
	$('#search-inbox').removeClass('recent-msg');
	$('#search-inbox').addClass('new-msg');
	$(this).addClass('active');
	$('#recent-msg').removeClass('active');
	$('#recent-msg i').removeClass('fa-envelope-open');
	$('#recent-msg i').addClass('fa-envelope');
	$('#new-msg i').removeClass('fa-envelope');
	$('#new-msg i').addClass('fa-envelope-open');
	inbox2();
});
$toID = 0;

$('#recent-msg').off().on('click', function() {
	$('#search-inbox').val('');
	$('#search-inbox').addClass('recent-msg');
	$('#search-inbox').removeClass('new-msg');
	$(this).addClass('active');
	$('#new-msg').removeClass('active');
	$('#new-msg i').removeClass('fa-envelope-open');
	$('#new-msg i').addClass('fa-envelope');
	$('#recent-msg i').removeClass('fa-envelope');
	$('#recent-msg i').addClass('fa-envelope-open');
	inbox();
});

// End message inbox


// Message convo

function message_convo(code, id, image, name2, access) {
	notification();
	$toID = id;
	$('.conversation').empty();
	$('.convo-name').html('<div class="convo-header-img">' +
							'<img src="' +$base_url + 'assets/user-img/'+ image +'" >' +
							'</div>' +
							'<p class="name2">' + name2 +	'</p>');
	$('.conversation').append('<div class="convo-img">' +
							'<img src="'+ $base_url +'assets/user-img/'+image+'">' +
							'</div>' +
							'<p class="convo-name2">'+ name2 +'</p>' +
							'<p class="convo-access">'+ access +'</p>');
	$('.conversation').append('<div id="load-convo" class="msg-loading"><img src="'+$base_url+'assets/css/images/loading2.gif"></div>');
	if (code == null) {
		$('#msg-content').attr('disabled', false);
		$('.btn-send').attr('disabled', false);
		$('.conversation').empty();
	} else {
		$.ajax({
			url: $base_url + 'Message/fetch_convo',
			method: 'get',
			dataType: 'json',
			data: {code: code},
			success: results => {
				$('#load-convo').remove();
				$('#msg-content').attr('disabled', false);
				$('.btn-send').attr('disabled', false);
				$.each(results, function(k, v) {
					if (v.m_from == $sessionID) {
						$('.conversation').append('<p class="ml-auto msg-from msg-info1 righttip"  title="'+v.msgDate+'">' + v.m_message + '</p>');
					} else {
						$('.conversation').append('<p class="mr-auto msg-to msg-info2 righttip" title="'+v.msgDate+'">' + v.m_message + '</p>');
					}
				});
				updateScroll();
				$(".righttip").tooltip({
				    placement:"right"
				});

			},
			error: (xhr, ajaxOptions, thrownError) => {
				console.error('Error in fetching convo: ' + xhr.status + ' => ' + thrownError);
			}
		});
	}
	$('.btn-send').off().on('click', () => {
		messageAction = 1;
		let newMsg = $('#msg-content').val();
		fetch_time();
		$('.conversation').append('<p class="ml-auto msg-from msg-info1 righttip" title="'+ $dateNow +'">' + newMsg + '</p>');
		updateScroll();
		$(".righttip").tooltip({
		    placement:"right"
		});
		if (newMsg.replace(/\s/g, '') != '') {
			$.ajax({
				url: $base_url + 'Message/send_message',
				method: 'post',
				data: {toId: id, newMsg: newMsg, code: code},
				success: results => {
					$('#msg-content').val(null);
				},
				error: (xhr, ajaxOptions, thrownError) => {
					console.error('Error in sending message: ' + xhr.status + ' => ' + thrownError);
				}
			});

		}
	});

}

function fetch_time() {
	$.ajax({
		url: $base_url + 'Message/fetch_time',
		dataType: 'json',
		async: false,
		success: results => {
			 $dateNow = results.curDate;
		},
		error: (xhr, ajaxOptions, thrownError) => {
			console.error('Error in fetching time: ' + xhr.status + ' => ' + thrownError);
		}
	})
}


$('#msg-content').keypress(function(e) {
	if (e.keyCode == '13' && e.shiftKey == false) {
		$('.btn-send').click();
	}
});

$.ajax({
    url: $base_url + 'Message/delete_messages',
    error: (xhr, ajaxOptions, thrownError) => {
        console.error('Error in deleting messages: ' + xhr.status + ' => ' + thrownError);
    }
})

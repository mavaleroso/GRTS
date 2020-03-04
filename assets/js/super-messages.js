$(document).ready(function() {

	// Global variable

	$toID = 0;
	$dateNow = '';

	// End var

	$('.msg-btn').off().on('click', function() {
		$('.msg-btn i').removeClass('fa-envelope-open');
		$('.msg-btn i').addClass('fa-envelope');
		$(this).find('i').removeClass('fa-envelope');
		$(this).find('i').addClass('fa-envelope-open');
		let id = $(this).attr('id');
		if (id == 'btn-recent') {
			recent_messages();
			$('#search-user').addClass('recent-msg');
			$('#search-user').removeClass('new-msg');
			$('#new-messages').hide();
			$('#recent-messages').show();
		} else if (id == 'btn-new') {
			new_messages();
			$('#search-user').removeClass('recent-msg');
			$('#search-user').addClass('new-msg');
			$('#new-messages').show();
			$('#recent-messages').hide();
		}
	})


	// Message Content

	recent_messages = () => {
		$('#recent-messages').html('<div ><img class="msg-loading" src="'+$base_url+'assets/css/images/loading2.gif"></div>');
		setTimeout(() => {
			let searchVal = $('#search-user').val();
			let Img;
			let name;
			$.ajax({
				url: $base_url + 'Super/fetch_recent_messages',
				method: 'get',
				data: {search: searchVal},
				dataType: 'json',
				success: results => {
					$('#recent-messages').empty();
					if (jQuery.isEmptyObject(results)) {
						$('#recent-messages').html('<div class="msg-not-found text-center mt-2"><p>No results found.</p></div>');
					} else {
						$.each(results, function(k, v) {
							if ($userName == v.name2) {
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
								Img = 'default.png'; 
							}
							$('#recent-messages').append('<div class="user-area d-flex" onclick="message_convo(\'' + v.m_code +'\', '+newID+', \'' + Img +'\', \'' + name +'\',  \'' + access +'\')">' +
														'<div class="user-img-area mr-auto">' +
														'<div class="user-img">' +
														'<img src="' + $base_url + 'assets/user-img/'+ Img +'" >' +
														'</div>' +
														'</div>' +
														'<div class="user-text-area ml-auto">' +
														'<p class="msg-user m-0">' + name + '</p>' +
														'<p class="msg-content m-0">' + v.m_message + '</p>' +
														'<p class="msg-time text-right m-1">' + v.msgDate + '</p>' +
														'</div>' +
														'</div>');
						});
					}
				},
				error: (xhr, ajaxOptions, thrownError) => {
					console.error('Error in fetching recent messages: ' + xhr.status + ' => ' + thrownError);
				}
			});
		}, 100);
	}


	new_messages = () => {
		$('#new-messages').html('<div ><img class="msg-loading" src="'+$base_url+'assets/css/images/loading2.gif"></div>');
		setTimeout(() => {
			let searchVal = $('#search-user').val();
			let Img;
			let name;
			$.ajax({
				url: $base_url + 'Super/fetch_new_messages',
				method: 'get',
				data: {search: searchVal},
				dataType: 'json',
				success: results => {
					$('#new-messages').empty();

					if (jQuery.isEmptyObject(results)) {
						$('#new-messages').html('<div class="msg-not-found text-center mt-2"><p>No results found.</p></div>');
					} else {
						$.each(results, function(k, v) {
							if (v.avatar == null) {
								Img = 'default.png'; 
							} else {
								Img = v.avatar;
							}
							$('#new-messages').append('<div class="user-area d-flex" onclick="message_convo(' + null +', '+v.user_id+', \'' + Img +'\', \'' + v.fullname +'\', \'' + v.access +'\')">' + 
													'<div class="user-img-area mr-auto">' +
													'<div class="user-img">' +
													'<img src="'+$base_url+'assets/user-img/'+ Img +'">' +
													'</div>' +
													'</div>' +
													'<div class="user-text-area ml-auto">' +
													'<p class="msg-user">'+v.fullname+'</p>' +
													'</div>' +
													'</div>');
						});
					}
				},
				error: (xhr, ajaxOptions, thrownError) => {
					console.error('Error in fetching new messages: ' + xhr.status + ' => ' + thrownError);
				}
			});
		}, 100);
	}


	message_convo = (code, id, image, name2, access) => {
		notification();
		$toID = id;
		$('.convo-area').empty(); 
		$('.user-convo-header').html('<p>' + name2 + '</p>' +
									'<div class="convo-img">' +
									'<img src="' + $base_url + 'assets/user-img/' + image + '">' +
									'</div>');

		$('.convo-area').append('<div class="user-convo-img-area mt-5">' +
								'<div class="convo-img-holder">' +
								'<img src="' + $base_url + 'assets/user-img/' + image + '">' +
								'</div>' +
								'<h6>' + name2 + '</h6>' +
								'<p>' + access + '</p>' +
								'</div>');

		$('.convo-area').append('<img class="gif-loader" src="' + $base_url + 'assets/css/images/loading2.gif">');
		if (code == null) {
			$('.gif-loader').remove();
		} else {
			$.ajax({
				url: $base_url + 'Super/fetch_convo',
				method: 'get',
				dataType: 'json',
				data: {code: code},
				success: results => {
					$('.gif-loader').remove();
					$.each(results, function(k, v) {
						if (v.m_from == $userSessionID) {
							$('.convo-area').append('<p class="ml-auto msg-right righttip"  title="'+v.msgDate+'">' + v.m_message + '</p>');
						} else {
							$('.convo-area').append('<p class="mr-auto msg-left righttip" title="'+v.msgDate+'">' + v.m_message + '</p>');
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
		$('#btn-send-msg').off().on('click', () => {
			$messageAction = 1;
			let newMsg = $('#msg-content').val();
			
			if (newMsg.replace(/\s/g, '') != '') {
				$.ajax({
					url: $base_url + 'Super/send_message',
					method: 'post',
					data: {toId: id, newMsg: newMsg, code: code},
					success: results => {
						fetch_time();
						$('.convo-area').append('<p class="ml-auto msg-right righttip" title="'+ $dateNow +'">' + newMsg + '</p>');
						updateScroll();
						$(".righttip").tooltip({
						    placement:"right"
						}); 
						$('#msg-content').val(null);
					},
					error: (xhr, ajaxOptions, thrownError) => {
						console.error('Error in sending messages: ' + xhr.status + ' => ' + thrownError);
					}
				});
				
			}
		});
	}

	// End of Message Content

	// Time

	fetch_time = () => {
		$.ajax({
			url: $base_url + 'Super/fetch_time',
			dataType: 'json',
			async: false,
			success: results => {
				 $dateNow = results.curDate;
			},
			error: (xhr, ajaxOptions, thrownError) => {
				console.error('Error get time now: ' + xhr.status + ' => ' + thrownError);
			}
		});
	}

	// End time


	// Search user

	var keyTime = 0;
	var keyInterval;

	$('#search-user').on('keypress', function() {
		$('.msg-user-search p i').addClass('loader');
		let classN = $(this).attr('class');
		if (classN == 'recent-msg') {
			recent_messages();
		} else if (classN == 'new-msg') {
			new_messages();
		}
	    keyTime = 0;
	}).on('keydown', function(e) {
	   if (e.keyCode==8)
	     $(this).trigger('keypress');
 	});

	$('#search-user').focus(function() {
		keyInterval = setInterval(() => {
			keyTime++;
			if (keyTime === 2) {
				$('.msg-user-search p i').removeClass('loader');
			}
		}, 1000);
	});

	$('#search-user').focusout(function() {
		$('.msg-user-search p i').removeClass('loader');
	    clearInterval(keyInterval);
	});

	// End of Search


	$('#msg-content').keypress(function(e) {
		if (e.keyCode == '13' && e.shiftKey == false) {
			$('#btn-send-msg').click();
		} 
	});

	// Send all message

	$('#btn-send-all').off().on('click', function() {
		$('.user-convo-header').html('<p class="f-13">Send all users<i class="fas fa-users ml-2 mt-1"></i></p>');
		$('.convo-area').html('<div class="send-all-area d-flex"></div><p class="send-all-txt"></p>');

		$.ajax({
			url: $base_url + 'Super/fetch_user_img3',
			dataType: 'json',
			success: results => {
				$('.send-all-area').empty();
				let image;
				$.each(results, function(k, v) {
					if (v.avatar == null) {
						image = 'default.png';
					} else {
						image = v.avatar;
					}
					$('.send-all-area').append('<div class="all-users-img">' +
							'<img src="' + $base_url + 'assets/user-img/' + image + '">' +
							'</div>');
				});
				$('.send-all-area').append('<p>...</p>');
			},
			error: (xhr, ajaxOptions, thrownError) => {
				console.error('Error in fetching 3 users image: ' + xhr.status + ' => ' + thrownError);
			}
		})

		$.ajax({
			url: $base_url + 'Super/fetch_active_users_count',
			dataType: 'json',
			success: results => {
				$('.send-all-txt').html('Send all to ' + results.countUsers + ' users ');
			},
			error: (xhr, ajaxOptions, thrownError) => {
				console.error('Error in fetching active users count: ' + xhr.status + ' => ' + thrownError);
			}
		})


		



		$('#btn-send-msg').off().on('click', () => {
			$messageAction = 1;
			let newMsg = $('#msg-content').val();
			fetch_time();
			$('.convo-area').append('<p class="ml-auto msg-right righttip" title="'+ $dateNow +'">' + newMsg + '</p>');
			updateScroll();
			$(".righttip").tooltip({
			    placement:"right"
			}); 
			$('#msg-content').val(null);
			if (newMsg.replace(/\s/g, '') != '') {
				$.ajax({
					url: $base_url + 'Super/send_message',
					method: 'post',
					data: {newMsg: newMsg},
					success: results => {
						messages();
					},
					error: (xhr, ajaxOptions, thrownError) => {
						console.error('Error in sending messages to all: ' + xhr.status + ' => ' + thrownError);
					}
				});
				
			}
		});

	});

	// End send all

	// Initialization

	recent_messages();
	
	$.ajax({
	    url: $base_url + 'Message/delete_messages',
	    error: (xhr, ajaxOptions, thrownError) => {
	        console.error('Error in deleting messages: ' + xhr.status + ' => ' + thrownError);
	    }
	})
	// End of Initialization
})
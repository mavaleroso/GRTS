$(document).ready(function() {
	$userName = $('#user-name').val();
	$base_url = $('#base').val();
	$userSessionID = $('#user-session-id').val();
	$messageAction = 0;
	$toID = 0;

 	var pusher = new Pusher('474122b4eeeae7308798', {
	    cluster: 'ap2',
    	forceTLS: true
  	});

	dashboard = () => {
		window.history.pushState("test", "test", "/GRS/super/dashboard");
      	document.title = "GRTS Super Dashboard";

      	$('.nav-dash').addClass('active');
      	$('.nav-requests').removeClass('active');
      	$('.nav-logs').removeClass('active');
      	$('.nav-messages').removeClass('active');

		$('#content-body').html('<img class="loading" src="' + $base_url + '/assets/css/images/loading.gif" />');

		setTimeout(() => {
			$.ajax({
				url: $base_url + 'super/dashboard_data',
				dataType: 'html',
				async: false,
				success: function(result) {
					$('#content-body').html(result);
				},
				error: (xhr, ajaxOptions, thrownError) => {
					console.error('Error in loading the Dashboard: ' + xhr.status + ' => ' + thrownError);
				}
			});
		}, 100);
	}

	requests = () => {
		window.history.pushState("test", "test", "/GRS/super/requests");
      	document.title = "GRTS Super Request";

      	$('.nav-dash').removeClass('active');
      	$('.nav-requests').addClass('active');
      	$('.nav-logs').removeClass('active');
      	$('.nav-messages').removeClass('active');

      	$('#content-body').html('<img class="loading" src="' + $base_url + '/assets/css/images/loading.gif" />');

		setTimeout(() => {
			$.ajax({
				url: $base_url + 'super/requests_data',
				dataType: 'html',
				async: false,
				success: function(result) {
					$('#content-body').html(result);
				},
				error: (xhr, ajaxOptions, thrownError) => {
					console.error('Error in loading the Dashboard: ' + xhr.status + ' => ' + thrownError);
				}
			});
		}, 100);
	}

	logs = () => {
		window.history.pushState("test", "test", "/GRS/super/logs");
      	document.title = "GRTS Super Logs";

      	$('.nav-dash').removeClass('active');
      	$('.nav-requests').removeClass('active');
      	$('.nav-logs').addClass('active');
      	$('.nav-messages').removeClass('active');

		$('#content-body').html('<img class="loading" src="' + $base_url + '/assets/css/images/loading.gif" />');
		setTimeout(() => {
			$.ajax({
				url: $base_url + 'super/logs_data',
				dataType: 'html',
				async: false,
				success: function(result) {
					$('#content-body').html(result);
				},
				error: (xhr, ajaxOptions, thrownError) => {
					console.error('Error in loading the Logs: ' + xhr.status + ' =>' + thrownError);
				}
			});
		}, 100);
	}

	messages = () => {
		window.history.pushState("test", "test", "/GRS/super/messages");
      	document.title = "GRTS Super Messages";

      	$('.nav-dash').removeClass('active');
      	$('.nav-requests').removeClass('active');
      	$('.nav-logs').removeClass('active');
      	$('.nav-messages').addClass('active');

		$('#content-body').html('<img class="loading" src="' + $base_url + '/assets/css/images/loading.gif" />');
		setTimeout(() => {
			$.ajax({
				url: $base_url + 'super/messages_data',
				dataType: 'html',
				async: false,
				success: function(result) {
					$('#content-body').html(result);
				},
				error: (xhr, ajaxOptions, thrownError) => {
					console.error('Error in loading the Logs: ' + xhr.status + ' =>' + thrownError);
				}
			});
		}, 100);
	}

	$('#settings').off().on('click', () => {
		$('#myModal .modal-title').html('<i class="mr-2 fas fa-cogs"></i>Account setting');
		$('#myModal .modal-body').html('<div class="p-5">' +
										'<p class="text-danger setting-alert-field"></p>' +
										'<label for="oldPass" class="setting-lbl mr-2">Old password: </label>' +
										'<div class="setting-field mb2">' +
										'<input type="password" autocomplete="off" id="oldPass" class="pl-2 pr-2 setting-input"/><i class="fas  font-con"></i>' +
										'</div>' +
										'<label for="newPass" class="setting-lbl mr-2">New password: </label>' +
										'<div class="setting-field sBox mb2">' +
										'<input type="password" autocomplete="off" id="newPass" class="pl-2 pr-2 setting-input passField"/><i class="fas  font-con"></i>' +
										'</div>' +
										'<label for="confirmPass" class="setting-lbl mr-2">Confirm password: </label>' +
										'<div class="setting-field sBox mb2">' +
										'<input type="password" autocomplete="off" id="confirmPass" class="pl-2 pr-2 setting-input passField"/><i class="fas  font-con"></i>' +
										'</div>' +
										'<button id="btn-setting-update" class="btn btn-primary btn-sm ml-auto mr-auto d-block mt-5">Update</button>' +
										'</div>' +
										'');

		$('.passField').prop('disabled', true);

		$('#myModal').modal({
			backdrop: 'static',
			keyboard: false,
			show: true
		});

		let keyTime = 0;
		let keyInterval;
		let id;

		$('.setting-input').focus(function() {
			id = $(this).attr('id');
			keyInterval = setInterval(() => {
				keyTime++;
				if (keyTime == 1) {
					$(this).siblings().removeClass('loader');
					if (id == 'newPass') {
						let value = $('#newPass').val();
						if (value != '') {
							$(this).siblings().addClass('fa-check');
						} else {
							$(this).siblings().removeClass('fa-check');
						}
					}
				}
			}, 1000);
		});

		$('.setting-input').keypress(function() {
			id = $(this).attr('id');
			$(this).siblings().addClass('loader');
			keyTime = 0;

			switch(id) {
				case 'oldPass':
					setTimeout(() => {
						let value = $('#oldPass').val();
						if (value != '') {
							$.ajax({
								url: $base_url + 'Super/match_password',
								method: 'post',
								dataType: 'json',
								data: {value: value},
								success: result => {
									$('.passField').val('');
									$('.passField').siblings().removeClass('fa-check');

									if (result == 1) {
										$('#oldPass').siblings().removeClass('loader');
										$('#oldPass').siblings().removeClass('fa-times');
										$('#oldPass').siblings().addClass('fa-check');
										$('.passField').parent().removeClass('sBox');
										$('.passField').prop('disabled', false);
									} else {
										$('#oldPass').siblings().addClass('loader');
										$('#oldPass').siblings().addClass('fa-times');
										$('#oldPass').siblings().removeClass('fa-check');
										$('.passField').parent().addClass('sBox');
										$('.passField').prop('disabled', true);
									}
								},
								error: (xhr, ajaxOptions, thrownError) => {
									console.error('Error in matching password : ' + xhr.status + ' => ' + thrownError);
								}
							});
						} else {
							$('#oldPass').siblings().removeClass('fa-times');
						}
					},100);
					break;

				case 'newPass':
					setTimeout(() => {
						let value = $('#newPass').val();
						$('#confirmPass').val('');
						$('#confirmPass').siblings().removeClass('fa-check');
						$('#confirmPass').siblings().removeClass('fa-times');

						if (value == '') {
							$('#newPass').siblings().removeClass('fa-check');
						} 
					},100);
					break;

				case 'confirmPass':
					setTimeout(() => {
						let value = $('#confirmPass').val();
						let pass = $('#newPass').val();
						if (value != '') {
							if (value == pass) {
								$('#confirmPass').siblings().removeClass('loader');
								$('#confirmPass').siblings().removeClass('fa-times');
								$('#confirmPass').siblings().addClass('fa-check');
							} else {
								$('#confirmPass').siblings().removeClass('fa-check');
								$('#confirmPass').siblings().addClass('fa-times');
								$('#confirmPass').siblings().addClass('loader');
							}
						} else {
							$('#confirmPass').siblings().removeClass('fa-check');
							$('#confirmPass').siblings().removeClass('fa-times');
						}
					})
					break;

				default:
					break;
			}

		}).on('keydown', function(e) {
		   if (e.keyCode == 8)
		     $(this).trigger('keypress');
		});

		$('.setting-input').focusout(function() {
			$(this).siblings().removeClass('loader');
			clearInterval(keyInterval);
		});

		$(document).off().on('click', '#btn-setting-update', () => {
			let oldPass = $('#oldPass').val();
			let newPass = $('#newPass').val();
			let confirmPass = $('#confirmPass').val();

			if (oldPass == '' && newPass != '' && confirmPass != '') {
				$('.setting-alert-field').text('Old password is required');
			} else if (oldPass != '' && newPass == '' && confirmPass != '') {
				$('.setting-alert-field').text('New password is required');
			} else if (oldPass != '' && newPass != '' && confirmPass == '') {
				$('.setting-alert-field').text('Confirm password is required');
			} else if (oldPass == '' && newPass == '' && confirmPass != '') {
				$('.setting-alert-field').text('Old and new password is required');
			} else if (oldPass != '' && newPass == '' && confirmPass == '') {
				$('.setting-alert-field').text('New and confirm password is required');
			} else if (oldPass == '' && newPass != '' && confirmPass == '') {
				$('.setting-alert-field').text('Old and confirm password is required');
			} else if (oldPass == '' && newPass == '' && confirmPass == '') {
				$('.setting-alert-field').text('All password fields is required');
			} else if (newPass != confirmPass) {
				$('.setting-alert-field').text('Confirm password not match');
			} else {
				$.ajax({
					url: $base_url + 'Super/update_password',
					method: 'post',
					data: {newPass: newPass},
					success: result => {
						$('#myModal').modal('toggle');
						$('.toast-area').append('<div class="toast fade animated fadeInDown" role="alert" aria-live="assertive" data-delay="5000" aria-atomic="true">' +
		                                        '<div class="toast-header">' +
		                                        '<strong class="mr-auto toast-title">Super admin</strong>' +
		                                        '<button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">' +
		                                        '<span aria-hidden="true">&times;</span>' +
		                                        '</button>' +
		                                        '</div>' +
		                                        '<div class="toast-body">' +
		                                        'Admin password updated successfully' +
		                                        '</div>' +
		                                        '</div>');
		                $(".toast").toast('show');
		                
		                $('.toast').on('hidden.bs.toast', function () {
		                    $(this).remove();
		                });
					},
					error: (xhr, ajaxOptions, thrownError) => {
						console.error('Error in updating password: ' + xhr.status + ' => ' + thrownError);
					}
				})
			}

		});
	});

	$('#overide').off().on('click', function() {

		$('#myModal').modal({
			backdrop: 'static',
			keyboard: false,
			show: true
		});

		$('#myModal .modal-title').html('<i class="mr-2 fas fa-wrench"></i>Overide');
		$('#myModal .modal-body').html('<div class="delete-message-area overide-area d-flex">' +
									'<button id="delete-msg-all" class="btn btn-danger"><i class="fas fa-trash-alt"></i></button><p>Delete all messages</p>' +
									'<div class="confirm-action"></div>' +
									'</div>' +
									'<hr>' +
									'<div class="delete-logs-area overide-area d-flex">' +
									'<button id="delete-logs-all" class="btn btn-danger"><i class="fas fa-trash-alt"></i></button><p class="ml-2">Delete all logs</p>' +
									'<div class="confirm-action2"></div>' +
									'</div>' +
									'<hr>' +
									'<div class="overide-users-area overide-area d-flex mb-3">' +
									'<button id="overide-users" class="btn btn-primary"><i class="fas fa-cog"></i></button><p class="ml-2">Overide user: </p>' +
									'<select class="user-select"></select>' +
									'</div>' +
									'<table id="overide-tbl" class="display table-striped table-borderless w-100">' +
									'<thead>' +
									'<tr>' +
									'<th>ID</th>' +
									'<th>Name</th>' +
									'<th>Clearance</th>' +
									'<th>Action</th>' +
									'</tr>' +
									'</thead>' +
									'<tbody></tbody>' +
									'</table>');

		var overideTbl = $('#overide-tbl').DataTable({
			processing: true,
			serverSide: true,
			responsive: true,
		    scrollX: true,
	    	scrollX: "100%",
			sDom: 't',
			ajax: {
		        url: $base_url + 'Super/fetch_overide_users',
	        	method: 'post',
		        dataType: 'json',
		        data: function(data) {
		            
		        }
		    },
		    
		    lengthMenu: [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
		});


		reOveride = () => {
			$.ajax({
				url: $base_url + 'Super/fetch_user_overide',
				dataType: 'json',
				success: results => {
					$('.user-select').html('<option value="-1" selected></option>');
					$.each(results, function(k, v) {
						$('.user-select').append('<option value="' + v.user_id + '">' + v.fullname + '</option>');
					});
				},
				error: (xhr, ajaxOptions, thrownError) => {
					console.error('Error in fetching user overide: ' + xhr.status + ' => ' + thrownError);
				}
			});
		} 

		reOveride();

		$('#delete-msg-all').off().on('click', () => {
			$('.confirm-action2').empty();
			$('.confirm-action').html('<div><button id="btn-msg-no" class="btn-1 btn btn-sm btn-primary">No</button><button id="btn-msg-yes"  class="btn btn-2 btn-sm btn-danger">Yes</button></div>');

			$('#btn-msg-no').off().on('click', () => {
				$('.confirm-action').empty();
			});

			$('#btn-msg-yes').off().on('click', () => {
				$.ajax({
					url: $base_url + 'Super/delete_all_messages',
					success: results => {
						$('.toast-area').append('<div class="toast fade animated fadeInDown" role="alert" aria-live="assertive" data-delay="5000" aria-atomic="true">' +
		                                        '<div class="toast-header">' +
		                                        '<strong class="mr-auto toast-title">Super admin</strong>' +
		                                        '<button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">' +
		                                        '<span aria-hidden="true">&times;</span>' +
		                                        '</button>' +
		                                        '</div>' +
		                                        '<div class="toast-body">' +
		                                        'All messages deleted successfully' +
		                                        '</div>' +
		                                        '</div>');
		                $(".toast").toast('show');
		                
		                $('.toast').on('hidden.bs.toast', function () {
		                    $(this).remove();
						});
						insert_logs('Deleting all messages');
						$('#myModal').modal('toggle');
					},
					error: (xhr, ajaxOptions, thrownError) => {
						console.error('Error in deleting all messages: ' + xhr.status + ' => ' + thrownError);
					}
				})
				$('.confirm-action').empty();
			});
		});

		$('#delete-logs-all').off().on('click', () => {
			$('.confirm-action').empty();
			$('.confirm-action2').html('<div><button id="btn-logs-no" class="btn-1 btn btn-sm btn-primary">No</button><button id="btn-logs-yes" class="btn btn-2 btn-sm btn-danger">Yes</button></div>');

			$('#btn-logs-no').off().on('click', () => {
				$('.confirm-action2').empty();
			});

			$('#btn-logs-yes').off().on('click', () => {
				$.ajax({
					url: $base_url + 'Super/delete_all_logs',
					success: results => {
						$('.toast-area').append('<div class="toast fade animated fadeInDown" role="alert" aria-live="assertive" data-delay="5000" aria-atomic="true">' +
		                                        '<div class="toast-header">' +
		                                        '<strong class="mr-auto toast-title">Super admin</strong>' +
		                                        '<button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">' +
		                                        '<span aria-hidden="true">&times;</span>' +
		                                        '</button>' +
		                                        '</div>' +
		                                        '<div class="toast-body">' +
		                                        'All logs deleted successfully' +
		                                        '</div>' +
		                                        '</div>');
		                $(".toast").toast('show');
		                
		                $('.toast').on('hidden.bs.toast', function () {
		                    $(this).remove();
						});
						insert_logs('Deleting all logs');
						$('#myModal').modal('toggle');
					},
					error: (xhr, ajaxOptions, thrownError) => {
						console.error('Error in deleting all logs: ' + xhr.status + ' => ' + thrownError);
					}
				})
				$('.confirm-action').empty();
			});
		});

		$('#overide-users').off().on('click', () => {
			var user = $('.user-select option:selected').val();
			var name = $('.user-select option:selected').text(); 
			if (name != '') {
				$.ajax({
					url: $base_url + 'Super/update_overide_user',
					method: 'post',
					data: {userID: user, value: 1},
					success: results => {
						$('.toast-area').append('<div class="toast fade animated fadeInDown" role="alert" aria-live="assertive" data-delay="5000" aria-atomic="true">' +
		                                        '<div class="toast-header">' +
		                                        '<strong class="mr-auto toast-title">Super admin</strong>' +
		                                        '<button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">' +
		                                        '<span aria-hidden="true">&times;</span>' +
		                                        '</button>' +
		                                        '</div>' +
		                                        '<div class="toast-body">' +
		                                        'Add overide setting to ' + name + ' successfully' +
		                                        '</div>' +
		                                        '</div>');
		                $(".toast").toast('show');
		                
		                $('.toast').on('hidden.bs.toast', function () {
		                    $(this).remove();
						});
						overideTbl.ajax.reload();
						insert_logs('Add overide user: ' + name);
						$('.user-select').val(-1);
						reOveride();
					},
					error: (xhr, ajaxOptions, thrownError) => {
						console.error('Error in updating overtime user: ' + xhr.status + ' => ' + thrownError);
					}
				});
			}
		});

		remove_overide = (name, id) => {
			$.ajax({
				url: $base_url + 'Super/update_overide_user',
				method: 'post',
				data: {userID: id, value: 0},
				success: results => {
					$('.toast-area').append('<div class="toast fade animated fadeInDown" role="alert" aria-live="assertive" data-delay="5000" aria-atomic="true">' +
	                                        '<div class="toast-header">' +
	                                        '<strong class="mr-auto toast-title">Super admin</strong>' +
	                                        '<button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">' +
	                                        '<span aria-hidden="true">&times;</span>' +
	                                        '</button>' +
	                                        '</div>' +
	                                        '<div class="toast-body">' +
	                                        'Remove overide to ' + name + ' successfully' +
	                                        '</div>' +
	                                        '</div>');
	                $(".toast").toast('show');
	                
	                $('.toast').on('hidden.bs.toast', function () {
	                    $(this).remove();
					});
					overideTbl.ajax.reload();
					insert_logs('Remove overide user: ' + name);
					$('.user-select').val(-1);
					reOveride();
				},
				error: (xhr, ajaxOptions, thrownError) => {
					console.error('Error in updating overtime user: ' + xhr.status + ' => ' + thrownError);
				}
			});
		}

		
	});

	notification = () => {
	    setTimeout(() => {
	      $.ajax({
	        url: $base_url + 'Super/fetch_notification',
	        dataType: 'json',
	        success: results => {
	        	if (!jQuery.isEmptyObject(results)) {
	        		$('.newNotif').removeClass('hidden');
	            	$('.newNotif').html(results.length);
	        	} else {
	        		$('.newNotif').addClass('hidden');
	            	$('.newNotif').html('0');
	        	}
	        },
	        error: (xhr, ajaxOptions, thrownError) => {
	        	console.error('Error in fetching notification: ' + xhr.status + ' => ' + thrownError);
	        }
	      });
	    }, 100);
	  }
	  
	insert_logs = action => {
		$.ajax({
			url: $base_url + 'Logs/insert_logs',
			method: 'post',
			data: {action: action},
			error: (xhr, ajaxOptions, thrownError) => {
				console.error('Error in inserting logs: ' + xhr.status + ' => ' + thrownError);
			}
		});
	}

  	notification();

	// Scroll 

    updateScroll = () => {
		var element = document.querySelector(".convo-area");
		element.scrollTop = element.scrollHeight;
	}

	// End Scroll

	seenState = code1 => {
	  $.ajax({
	    url: $base_url + 'Super/seenState',
	    method: 'post',
	    data: {code: code1},
	    error: (xhr, ajaxOptions, thrownError) => {
	      console.error('Error at Message seen state: ' + xhr.state + ' => ' + thrownError);
	    }
	  })
	}


  	// Pusher.logToConsole = true;

	var channel = pusher.subscribe('channel1');

	var chatCallBack = function(data) {
	  if (data.type == 'single') {
		  notification();
		  if ($messageAction == 0 && $userSessionID == data.msg_to && $toID == data.msg_from) {
		    seenState(data.code);
		    if (data.msg_from == $userSessionID) {
		      $('.convo-area').append('<p class="ml-auto msg-right righttip" title="'+data.date+'">' + data.message + '</p>');
		    } else {
		      $('.convo-area').append('<p class="mr-auto msg-left righttip" title="'+data.date+'">' + data.message + '</p>');
		    }
		    $(".righttip").tooltip({
		        placement:"right"
		    });    
		    updateScroll();
		  }

		  let classN = $('#search-user').attr('class');
		  if (classN == 'recent-msg') {
		    recent_messages();
		  } 
		  	$messageAction = 0;
	  }
	}

	channel.bind('chat', chatCallBack);

	channel.bind('pusher:subscription_succeeded', function(members) {
	  // console.log('Successfully subscribed');
	})

 	
});



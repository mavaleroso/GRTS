$(document).ready(function() {

	var tableRequests = $('#requests-tbl').DataTable({
		processing: true,
	    serverSide: true,
	    order: [],
	    responsive: true,
	    scrollX: true,
		scrollX: "100%",
		columnDefs: [
			{
				targets: [ 4 ],
				orderable: false
			}
		],
    	lengthMenu: [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
    	ajax: {
	        url: $base_url + 'Super/fetch_pending_requests',
	        type: "POST",
	        data: function ( data ) {
	        }
	    },
	});

	confirm_request = id => {

		$('#myModal2 .modal-title').html('<i class="fas fa-user-check mr-2"></i>Confirm')

		$('#myModal2').modal({
			show: true,
			backdrop: 'static',
			keyboard: false
		});

		$('#myModal2 .modal-body').html('<select class="confirm-select">' +
										'<option>Provincial</option>' +
										'<option>Regional</option>' +
										'</select>');

		$('#myModal2 .modal-footer').html('<button onclick="confirm_true('+ id +')" class="btn btn-sm btn-primary ml-auto">Confirm</button>');
	}

	confirm_true = id => {
		let value = $('.confirm-select option:selected').text();
		$.ajax({
			url: $base_url + 'Super/confirm_request',
			method: 'post',
			data: {id: id, value: value},
			success: results => {
				$('#myModal2').modal('toggle');
				$('.toast-area').append('<div class="toast fade animated fadeInDown" role="alert" aria-live="assertive" data-delay="5000" aria-atomic="true">' +
                                        '<div class="toast-header">' +
                                        '<strong class="mr-auto toast-title">Super admin</strong>' +
                                        '<button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">' +
                                        '<span aria-hidden="true">&times;</span>' +
                                        '</button>' +
                                        '</div>' +
                                        '<div class="toast-body">' +
                                        'User confirmed successfully' +
                                        '</div>' +
                                        '</div>');
                $(".toast").toast('show');
                
                $('.toast').on('hidden.bs.toast', function () {
                    $(this).remove();
                });

                tableRequests.ajax.reload();
			},
			error: (xhr, ajaxOptions, thrownError) => {
				console.error('Error in confirming user request: ' + xhr.status + ' => ' + thrownError);
			}
		})
	}

	delete_request = id => {
		$('#myModal2 .modal-title').html('<i class="fas fa-user-times mr-2"></i>Delete')

		$('#myModal2').modal({
			show: true,
			backdrop: 'static',
			keyboard: false
		});

		$('#myModal2 .modal-body').html('<p class="text-center">Are you sure on rejecting this request?</p>');

		$('#myModal2 .modal-footer').html('<button data-dismiss="modal" class="btn btn-sm btn-primary mr-auto">Cancel</button><button onclick="delete_true('+ id +')" class="btn btn-sm btn-danger ml-auto">Confirm</button>');
	}

	delete_true = id => {
		$.ajax({
			url: $base_url + 'Super/delete_request',
			method: 'get',
			data: {id: id},
			success: results => {
				$('#myModal2').modal('toggle');
				$('.toast-area').append('<div class="toast fade animated fadeInDown" role="alert" aria-live="assertive" data-delay="5000" aria-atomic="true">' +
                                        '<div class="toast-header">' +
                                        '<strong class="mr-auto toast-title">Super admin</strong>' +
                                        '<button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">' +
                                        '<span aria-hidden="true">&times;</span>' +
                                        '</button>' +
                                        '</div>' +
                                        '<div class="toast-body">' +
                                        'User request deleted successfully' +
                                        '</div>' +
                                        '</div>');
                $(".toast").toast('show');
                
                $('.toast').on('hidden.bs.toast', function () {
                    $(this).remove();
                });

                tableRequests.ajax.reload();
			},
			error: (xhr, ajaxOptions, thrownError) => {
				console.error('Error in deleting user request: ' + xhr.status + ' => ' + thrownError);
			}
		})
	}

});
$(document).ready(() => {

	var tbl_logs = $('#tbl-logs').DataTable({
		processing: true, 
	    serverSide: true, 
	    order: [[0, 'desc']],
	    ajax: {
	        url: $base_url + 'Super/fetch_logs_table',
	        method: 'post',
	        dataType: 'json',
	        data: function(data) {
	            
	        }
	    },
	    
	    lengthMenu: [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
	});

	$.ajax({
	    url: $base_url + 'Logs/delete_logs',
	    error: (xhr, ajaxOptions, thrownError) => {
	        console.error('Error in deleting logs: ' + xhr.status + ' => ' + thrownError);
	    }
	});

	delete_description = description => {
	    $('#myModal3 .modal-title').html('<i class="fas fa-info mr-1"></i> Reason');
	    $('#myModal3 .modal-body').html('<textarea class="delete-txtarea" disabled>'+ description +'</textarea>');
	    $('#myModal3').modal('show');
	}


});


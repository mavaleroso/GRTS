$toID = 0;


$('#tbl-logs').DataTable( {
    processing: true,
    serverSide: true,
    order: [[0, 'desc']],
    ajax: {
        url: $base_url + 'Logs/fetch_logs_table',
        type: "POST",
        data: function ( data ) {

        }
    },
    scrollX: true,
    scrollX: "100%",
    lengthMenu: [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
});
$('#tbl-logs').DataTable().columns.adjust();

function insert_logs(action, description) {
    $.ajax({
        url: $base_url + "logs/insert_logs",
        method: 'POST',
        data: {action: action, description: description},
        error: function(xhr, ajaxOptions, thrownError) {
            console.error('Error in inserting logs: ' + xhr.status + ' => ' + thrownError);
        }
    });
}

function delete_description(description) {
    $('#myModal3 .modal-title').html('<i class="fas fa-info mr-1"></i> Reason');
    $('#myModal3 .modal-body').html('<textarea class="delete-txtarea" disabled>'+ description +'</textarea>');
    $('#myModal3').modal('show');
}

$.ajax({
    url: $base_url + 'Logs/delete_logs',
    error: (xhr, ajaxOptions, thrownError) => {
        console.error('Error in deleting logs: ' + xhr.status + ' => ' + thrownError);
    }
})

$(document).ready(() => {

	countTable = () => {
		$.ajax({
			url: $base_url + 'Super/count_tbl',
			method: 'post',
			dataType: 'json',
			success: result => {
				$('#count-users').text(result.users);
				$('#count-categories').text(result.cat);
				$('#count-sub-categories').text(result.subCat);
				$('#count-root').text(result.root);
				$('#count-modes').text(result.mode);
				$('#count-holidays').text(result.holidays);
			},
			error: (xhr, ajaxOptions, thrownError) => {
				console.error('Error on fetchng users info: ' + xhr.status + ' => ' + thrownError);
			}
		});
	}

	countTable();

	newDataTable = (table, controller) => {
		$(table).DataTable({
			dom: '<"toolbar float-left">frtip',
			scrollY: "300px",
			bInfo: false,
			scrollCollapse: true,
			processing: true, 
			serverSide: true, 
			columnDefs: [
				{
					targets: [ -1 ],
					orderable: false
				}
			],
		    order: [], 
		    ajax: {
		        url: $base_url + 'Super/' + controller,
		        method: 'post',
		        dataType: 'json',
		        data: function(data) {
		            
		        }
		    }
		});
	}

	newDataTable('#tbl-users','fetch_users_table');
	newDataTable('#tbl-categories', 'fetch_categories_table');
	newDataTable('#tbl-sub-categories', 'fetch_subCategories_table');
	newDataTable('#tbl-root', 'fetch_root_table');
	newDataTable('#tbl-rmode', 'fetch_mode_table');
	newDataTable('#tbl-holidays', 'fetch_holiday_table');

	$("#tbl-categories_wrapper div.toolbar").html('<button id="btn-categories-add" class="btn btn-sm btn-primary"><i class="fas fa-plus mr-1"></i>Add</button>');
	$("#tbl-sub-categories_wrapper div.toolbar").html('<button id="btn-sub-categories-add" class="btn btn-sm btn-primary"><i class="fas fa-plus mr-1"></i>Add</button>');
	$("#tbl-root_wrapper div.toolbar").html('<button id="btn-root-add" class="btn btn-sm btn-primary"><i class="fas fa-plus mr-1"></i>Add</button>');
	$("#tbl-rmode_wrapper div.toolbar").html('<button id="btn-rmode-add" class="btn btn-sm btn-primary"><i class="fas fa-plus mr-1"></i>Add</button>');
	$("#tbl-holidays_wrapper div.toolbar").html('<button id="btn-holiday-add" class="btn btn-sm btn-primary"><i class="fas fa-plus mr-1"></i>Add</button>');

	$('#btn-holiday-add').off().on('click', () => {
		$('#myModal .modal-title').html('<i class="fas fa-plus mr-2"></i>Holidays');
		$('#myModal .modal-body').html('<div class="row">' +
										'<div class="col-lg-6">' +
										'<label>Holiday</label>' +
										'<input autocomplete="off" id="holidayName" class="custom-field" type="text">' +
										'</div>' +
										'<div class="col-lg-6">' +
										'<label>Date</label>' +
										'<input autocomplete="off" id="holidayDate" class="custom-field" type="text" readonly>' +
										'</div>' +
										'</div>');
		$('#myModal .modal-footer').html('<p class="alert-required alert-field"></p><button id="btn-holiday-add2" class="btn-sm btn btn-primary ml-auto mr-2">Add</button>');
		$('#holidayDate').datepicker({
			changeMonth: true,
        	changeYear: true,
        	showButtonPanel: true,
        	dateFormat: 'm-d-yy'
        });
		$('#myModal').modal({
			backdrop: 'static',
			keyboard: false,
			show: true
		});

		$(document).off().on('click', '#btn-holiday-add2', () => {
			let hName = $('#holidayName').val();
			let hDate = $('#holidayDate').val();

			if (hName == '' && hDate != '') {
				$('#myModal .alert-field').text('Holiday Name is required!');
			} else if (hName != '' && hDate == '') {
				$('#myModal .alert-field').text('Holiday Date is required!');
			} else if (hName == '' && hDate == '') {
				$('#myModal .alert-field').text('Holiday Name and Date are required!');
			} else if (hName != '' && hDate != '') {
				$('#myModal .alert-field').empty();

				// hDate = hDate + ', 0000';
				$.ajax({
					url: $base_url + 'super/add_holiday',
					method: 'post',
					data: {hName: hName, hDate: hDate},
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
		                                        'Holiday added successfully' +
		                                        '</div>' +
		                                        '</div>');
		                $(".toast").toast('show');
		                
		                $('.toast').on('hidden.bs.toast', function () {
		                    $(this).remove();
		                });

		                $('#tbl-holidays').DataTable().ajax.reload();
						countTable();
						insert_logs('Added holiday');

					},
					error: (xhr, ajaxOptions, thrownError) => {
						console.error('Error in adding holiday: ' + xhr.status + ' => ' + thrownError);
					}
				});
			}
			
		});
	});

	

	holiday_edit = id => {
		$.ajax({
			url: $base_url + 'super/get_holiday',
			method: 'get',
			dataType: 'json',
			data: {id: id},
			success: result => {
				$('#myModal .modal-title').html('<i class="fas fa-edit mr-2"></i>Holidays');
				$('#myModal .modal-body').html('<div class="row">' +
												'<div class="col-lg-6">' +
												'<label>Holiday</label>' +
												'<input autocomplete="off" id="holidayName" class="custom-field" type="text" value="'+result.holiday_name+'">' +
												'<input autocomplete="off" id="holidayID" class="custom-field" type="text" value="'+result.holiday_id+'" hidden>' +
												'</div>' +
												'<div class="col-lg-6">' +
												'<label>Date</label>' +
												'<input autocomplete="off" id="holidayDate" class="custom-field" type="text" value="'+result.hDate+'" >' +
												'</div>' +
												'</div>');
				$('#myModal .modal-footer').html('<p class="alert-required alert-field"></p><button id="btn-holiday-update" class="btn-sm btn btn-primary ml-auto mr-2">Update</button>');
				$('#holidayDate').datepicker({
					changeMonth: true,
		        	changeYear: true,
        			showButtonPanel: true,
		        	dateFormat: 'm-d-yy'
				});
				$('#myModal').modal({
					backdrop: 'static',
					keyboard: false,
					show: true
				});
			},
			error: (xhr, ajaxOptions, thrownError) => {
				console.error('Error in fetching holiday(s): ' + xhr.status + ' => ' + thrownError);
			}
		});

		$(document).off().on('click', '#btn-holiday-update', () => {
			let hID = $('#holidayID').val();
			let hName = $('#holidayName').val();
			let hDate = $('#holidayDate').val();

			if (hName == '' && hDate != '') {
				$('#myModal .alert-field').text('Holiday Name is required!');
			} else if (hName != '' && hDate == '') {
				$('#myModal .alert-field').text('Holiday Date is required!');
			} else if (hName == '' && hDate == '') {
				$('#myModal .alert-field').text('Holiday Name and Date are required!');
			} else if (hName != '' && hDate != '') {
				$('#myModal .alert-field').empty();

				$.ajax({
					url: $base_url + 'super/update_holiday',
					method: 'post',
					data: {hID: hID, hName: hName, hDate, hDate},
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
		                                        'Holiday updated successfully' +
		                                        '</div>' +
		                                        '</div>');
		                $(".toast").toast('show');
		                
		                $('.toast').on('hidden.bs.toast', function () {
		                    $(this).remove();
		                });

		                $('#tbl-holidays').DataTable().ajax.reload();
						insert_logs('Updated holiday');


					},
					error: (xhr, ajaxOptions, thrownError) => {
						console.error('Error on updating holiday: ' + xhr.status + ' => ' + thrownError);
					}
				});
			}
				
		});
	}

	

	$('#btn-rmode-add').off().on('click', () => {
		$('#myModal .modal-title').html('<i class="fas fa-plus mr-2"></i>Report Mode');
		$('#myModal .modal-body').html('<div class="row pl-3 pr-3">' +
										'<div class="col-lg-8">' +
										'<input autocomplete="off" id="repMode" class="custom-field" type="text">' +
										'</div>' +
										'<div class="col-lg-4">' +
										'<button id="btn-rmode-add2" class="btn w-100 btn-primary">Add</button>' +
										'</div>' +
										'</div>');
		$('#myModal .modal-footer').html('<p class="mr-auto alert-required alert-field"></p>');
		$('#myModal').modal({
			backdrop: 'static',
			keyboard: false,
			show: true
		});

		$(document).off().on('click', '#btn-rmode-add2', () => {
			let mode = $('#repMode').val();
			if (mode == '') {
				$('#myModal .alert-field').text('Report Mode is required!');
			} else {
				$('#myModal .alert-field').empty();
				$.ajax({
					url: $base_url + 'super/add_report',
					method: 'post',
					data: {mode: mode},
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
		                                        'Report mode added successfully' +
		                                        '</div>' +
		                                        '</div>');
		                $(".toast").toast('show');
		                
		                $('.toast').on('hidden.bs.toast', function () {
		                    $(this).remove();
		                });

		                $('#tbl-users').DataTable().ajax.reload();
						countTable();
						insert_logs('Added report mode');

					},	
					error: (xhr, ajaxOptions, thrownError) => {
						console.error('Error in adding report: ' + xhr.status + ' => ' + thrownError);
					}
				})
			}
		});
	});

	

	mode_edit = id => {
		$.ajax({
			url: $base_url + 'super/get_rmode',
			method: 'get',
			dataType: 'json',
			data: {id: id},
			success: result => {
				$('#myModal .modal-title').html('<i class="fas fa-edit mr-2"></i>Report Mode');
				$('#myModal .modal-body').html('<div class="row pl-3 pr-3">' +
												'<div class="col-lg-8">' +
												'<input autocomplete="off" id="repMode" value="'+ result.mode_name +'" class="custom-field" type="text">' +
												'<input autocomplete="off" id="repID" type="text" value="'+ result.mode_id +'" hidden >'+
												'</div>' +
												'<div class="col-lg-4">' +
												'<button id="btn-rmode-update" class="btn w-100 btn-primary">Update</button>' +
												'</div>' +
												'</div>');
				$('#myModal .modal-footer').html('<p class="mr-auto alert-required alert-field"></p>');
				$('#myModal').modal({
					backdrop: 'static',
					keyboard: false,
					show: true
				});
			},
			error: (xhr, ajaxOptions, thrownError) => {
				console.error('Error on fetching report mod: ' + xhr.status + ' => ' + thrownError);
			}
		});

		$(document).off().on('click', '#btn-rmode-update', () => {
			let repID = $('#repID').val();
			let repMode = $('#repMode').val();
			if(repMode == '') {
				$('#myModal .alert-field').text('Report Mode is required!');
			} else {
				$('#myModal .alert-field').empty();

				$.ajax({
					url: $base_url + 'super/update_rmode',
					method: 'post',
					data: {repID: repID, repMode: repMode},
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
		                                        'Report mode updated successfully' +
		                                        '</div>' +
		                                        '</div>');
		                $(".toast").toast('show');
		                
		                $('.toast').on('hidden.bs.toast', function () {
		                    $(this).remove();
		                });

		                $('#tbl-rmode').DataTable().ajax.reload();
						insert_logs('Updated report mode');

					},
					error: (xhr, ajaxOptions, thrownError) => {
						console.error('Error in updating report mode: ' + xhr.status + ' => ' + thrownError);
					}
				});
			}
		});	
	}

	

	$('#btn-root-add').off().on('click', () => {
		$('#myModal .modal-title').html('<i class="fas fa-plus mr-2"></i>Root Cause');
		$('#myModal .modal-body').html('<div class="row">' +
										'<div class="col-lg-3">' +
										'<label>Root Code</label>' +
										'<input autocomplete="off" id="rootCode" class="custom-field" type="text">' +
										'</div>' +
										'<div class="col-lg-3">' +
										'<label>Category ID</label>' +
										'<select id="rCatID" class="custom-field">' +
										'<option></option>' +
										'</select>' +
										'</div>' +
										'<div class="col-lg-6">' +
										'<label>Root Description</label>' +
										'<input autocomplete="off" id="rootDesc" class="custom-field" type="text" >' +
										'</div>' +
										'</div>' +
										'</div>' +
										'</div>');
		$('#myModal .modal-footer').html('<p class="alert-required alert-field"></p><button id="btn-root-add2" class="btn-sm btn btn-primary ml-auto mr-2">Add</button>');

		$.ajax({
			url: $base_url + 'Super/fetch_category_count',
			dataType: 'json',
			success: results => {
				$.each(results, function(k, v) {
					$('#rCatID').append('<option value="' + v.category_id + '">' +  v.category_id + '</option>');
				})
			},
			error: (xhr, ajaxOptions, thrownError) => {
				console.log('Error in fetching category count: ' + xhr.status + ' => ' + thrownError);
			}
		})

		$('#myModal').modal({
			backdrop: 'static',
			keyboard: false,
			show: true
		});

		$('#btn-root-add2').off().on('click', () => {
			let rCode = $('#rootCode').val();
			let rDesc = $('#rootDesc').val();
			let rCatID = $('#rCatID option:selected').val();

			if (rCode == '' && rDesc != '') {
				$('#myModal .alert-field').text('Root Code is required!');
			} else if (rDesc == '' && rCode != '') {
				$('#myModal .alert-field').text('Root Description is required!');
			} else if (rDesc == '' && rCode == '') {
				$('#myModal .alert-field').text('Root Code and Description are required!');
			} else if (rDesc != '' && rCode != '') {
				$('#myModal .alert-field').empty();

				$.ajax({
					url: $base_url + 'super/add_root',
					method: 'post',
					data: {rCode: rCode, rDesc: rDesc, rCatID: rCatID},
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
		                                        'Root added successfully' +
		                                        '</div>' +
		                                        '</div>');
		                $(".toast").toast('show');
		                
		                $('.toast').on('hidden.bs.toast', function () {
		                    $(this).remove();
		                });

		                $('#tbl-root').DataTable().ajax.reload();
						countTable();
						insert_logs('Added root cause');


					},
					error: (xhr, ajaxOptions, thrownError) => {
						console.error('Error in adding root cause: ' + xhr.status + ' => ' + thrownError);
					}
				});

			}
			
		});

	});

	

	root_edit = id => {
		$.ajax({
			url: $base_url + 'super/get_root',
			method: 'get',
			dataType: 'json',
			data: {id: id},
			success: result => {
				$('#myModal .modal-title').html('<i class="fas fa-edit mr-2"></i>Root Cause');
				$('#myModal .modal-body').html('<div class="row">' +
												'<div class="col-lg-3">' +
												'<label>Root Code</label>' +
												'<input id="rootCode" class="custom-field" value="'+ result.root_code +'">' +
												'</div>' +
												'<div class="col-lg-3">' +
												'<label>Category ID</label>' +
												'<select id="rCatID" class="custom-field">' +
												'<option></option>' +
												'</select>' +
												'</div>' +
												'<div class="col-lg-6">' +
												'<label>Root Description</label>' +
												'<input autocomplete="off" id="rootDesc" class="custom-field" type="text" value="'+ result.root_description +'">' +
												'</div>' +
												'</div>' +
												'</div>' +
												'</div>');
				$('#myModal .modal-footer').html('<p class="alert-required alert-field"></p><button id="btn-root-update" class="btn-sm btn btn-primary ml-auto mr-2">Update</button>');

				$.ajax({
					url: $base_url + 'Super/fetch_category_count',
					dataType: 'json',
					success: data => {
						$.each(data, function(k, a) {
							$('#rCatID').append('<option value="' + a.category_id + '">' +  a.category_id + '</option>');
						})

						$('#rCatID').val(result.category_id);
					},
					error: (xhr, ajaxOptions, thrownError) => {
						console.log('Error in fetching category count: ' + xhr.status + ' => ' + thrownError);
					}
				})


				$('#myModal').modal({
					backdrop: 'static',
					keyboard: false,
					show: true
				});
			},
			error: (xhr, ajaxOptions, thrownError) => {
				console.error('Error in fetching root cause: ' + xhr.status + ' => ' + thrownError);
			}
		});


		$(document).off().on('click', '#btn-root-update', () => {
			let id = $('#rootID').val();
			let rCode = $('#rootCode').val();
			let rDesc = $('#rootDesc').val();
			let rCatID = $('#rCatID option:selected').val();

			if (rCode == '' && rDesc != '') {
				$('#myModal .alert-field').text('Root Code is required!');
			} else if (rDesc == '' && rCode != '') {
				$('#myModal .alert-field').text('Root Description is required!');
			} else if (rDesc == '' && rCode == '') {
				$('#myModal .alert-field').text('Root Code and Description are required!');
			} else if (rDesc != '' && rCode != '') {
				$('#myModal .alert-field').empty();

				$.ajax({
					url: $base_url + 'super/update_root',
					method: 'post',
					data: {id: id, rCode: rCode, rDesc: rDesc, rCatID: rCatID},
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
		                                        'Root updated successfully' +
		                                        '</div>' +
		                                        '</div>');
		                $(".toast").toast('show');
		                
		                $('.toast').on('hidden.bs.toast', function () {
		                    $(this).remove();
		                });

		                $('#tbl-root').DataTable().ajax.reload();
						insert_logs('Updated root cause');

					},
					error: (xhr, ajaxOptions, thrownError) => {
						console.error('Error in updating root cause: ' + xhr.status + ' => ' + thrownError);
					}
				});
			}
			
		});
	}

	



	edit_user = id => {
			$.ajax({
				url: $base_url + 'super/get_user',
				method: 'get',
				data: {id: id},
				dataType: 'json',
				success: result => {
				$('#myModal .modal-title').html('<i class="fas fa-edit mr-2"></i>Users Access');
				$('#myModal .modal-body').html('<div class="row pl-3 pr-3">' +
												'<div class="col-lg-8">' +
												'<select class="user-edit">' +
												'<option value=""></option>' +
												'<option value="Regional">Regional</option>' +
												'<option value="Provincial">Provincial</option>' +
												'</select>' +
												'</div>' +
												'<div class="col-lg-4">' +
												'<button onclick="update_user('+id+')" class="btn w-100 btn-primary">Update</button>' +
												'</div>' +
												'</div>');
			
				$(".user-edit").val(result.access).change();
				$('#myModal').modal({
					backdrop: 'static',
					keyboard: false,
					show: true
				});
			},
			error: (xhr, ajaxOptions, thrownError) => {
				console.error('Error in updating user: ' + xhr.status + ' => ' + thrownError);
			}
		});
	}

	update_user = id => {
		let access = $('.user-edit option:selected').val();
		$.ajax({
			url: $base_url + 'super/update_user',
			method: 'post',
			data: {id: id, access: access},
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
                                        'User updated successfully' +
                                        '</div>' +
                                        '</div>');
                $(".toast").toast('show');
                
                $('.toast').on('hidden.bs.toast', function () {
                    $(this).remove();
                });

                $('#tbl-users').DataTable().ajax.reload();
				insert_logs('Updated user access');

			},
			error: (xhr, ajaxOptions, thrownError) => {
				console.error('Error in updating user: ' + xhr.status + ' => ' + thrownError);
			}
		});
	}


	$('#btn-categories-add').off().on('click', () => {

		$('#myModal .modal-title').html('<i class="fas fa-plus mr-2"></i>Categories');
		$('#myModal .modal-body').html('<div class="row">' +
										'<div class="col-lg-8">' +
										'<label>Category name:</label>' +
										'<input autocomplete="off" id="catName" class="custom-field" type="text" name="category">' +
										'</div>' +
										'<div class="col-lg-4">' +
										'<label>Category days:</label>' +
										'<input autocomplete="off" id="catDays" class="custom-field" type="number" name="catDays">' +
										'</div>' +
										'<div class="col-lg-6 mt-3">' + 
										'<label>Subject:</label>' +
										'<select id="catSubj" class="custom-field">' +
										'<option>No</option>' +
										'<option>Yes</option>' +
										'</select>' +
										'</div>' +
										'<div class="col-lg-6 mt-3">' + 
										'<label>RCA:</label>' +
										'<select id="catOpt" class="custom-field">' +
										'<option></option>' +
										'<option>rca1</option>' +
										'<option>rca2</option>' +
										'</select>' +
										'</div>' +
										'</div>' +
										'</div>' +
										'</div>');
		$('#myModal .modal-footer').html('<p class="alert-required alert-field"></p><button id="btn-add-category" class="btn-sm btn btn-primary ml-auto mr-2">Add</button>');

		$('#myModal').modal({
			backdrop: 'static',
			keyboard: false,
			show: true
		});

		$('#btn-add-category').off().on('click', () => {
			let categoryName = $('#catName').val();
			let categoryDays = $('#catDays').val();
			let categorySubj = $('#catSubj option:selected').text();
			let categoryOpt = $('#catOpt option:selected').text();
			
			if (categoryName == '' && categoryDays != '') {
				$('#myModal .alert-field').text('Category Name is required!');
			} else if (categoryDays == '' && categoryName != '') {
				$('#myModal .alert-field').text('Category Days is required!');
			} else if (categoryName == '' && categoryDays == '') {
				$('#myModal .alert-field').text('Category Name and Days are required!');
			} else if (categoryName != '' && categoryDays != '') {
				$('#myModal .alert-field').empty();

				$.ajax({
					url: $base_url + 'super/add_category',
					method: 'post',
					data: {catName: categoryName, catDays: categoryDays, catSubj: categorySubj, catOpt: categoryOpt},
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
		                                        'Category added successfully' +
		                                        '</div>' +
		                                        '</div>');
		                $(".toast").toast('show');
		                
		                $('.toast').on('hidden.bs.toast', function () {
		                    $(this).remove();
		                });

	                $('#tbl-categories').DataTable().ajax.reload();
					countTable();
					insert_logs('Added category');


					},
					error: (xhr, ajaxOptions, thrownError) => {
						console.error('Error in adding category: ' + xhr.status + ' => ' + thrownError);
					}
				});
			}
		});
	});


	

	
	$('#btn-sub-categories-add').off().on('click', () => {
		$('#myModal .modal-title').html('<i class="fas fa-plus mr-2"></i>Sub-category');
		$('#myModal .modal-body').html('<div class="row">' +
										'<div class="col-lg-6">' +
										'<label>Category</label>' +
										'<select id="catName1" class="custom-field"></select>' +
										'</div>' +
										'<div class="col-lg-6">' +
										'<label>Sub-category</label>' +
										'<input autocomplete="off" id="subCat1" class="custom-field" type="text">' +
										'</div>' +
										'</div>');
		$('#myModal .modal-footer').html('<p class="alert-required alert-field"></p><button id="btn-add-sub-category" class="btn-sm btn btn-primary ml-auto mr-2">Add</button>');

		$.ajax({
			url: $base_url + 'super/get_all_category',
			dataType: 'json',
			success: result => {
				$('#catName1').empty();
				$.each(result, function(k, v) {
					$('#catName1').append('<option value="'+v.category_id+'">'+ v.category_name +'</option>');
				});

				$('#myModal').modal({
					backdrop: 'static',
					keyboard: false,
					show: true
				})
			},
			error: (xhr, ajaxOptions, thrownError) => {
				console.error('Error in adding category: ' + xhr.status + ' => ' + thrownError);
			}
		});
		
		$('#btn-add-sub-category').off().on('click', () => {
			let catID = $('#catName1 option:selected').val();
			let subCategoryName = $('#subCat1').val();
			if (subCategoryName == '') {
				$('#myModal .alert-field').text('Sub-category Name is required!');
			} else {
				$('#myModal .alert-field').empty();

				setTimeout(() => {
					$.ajax({
						url: $base_url + 'super/add_sub_category',
						method: 'post',
						data: {categoryID: catID, subCatName: subCategoryName},
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
			                                        'Sub-category added successfully' +
			                                        '</div>' +
			                                        '</div>');
			                $(".toast").toast('show');
			                
			                $('.toast').on('hidden.bs.toast', function () {
			                    $(this).remove();
			                });

	           				$('#tbl-sub-categories').DataTable().ajax.reload();
							countTable();
							insert_logs('Added sub-category');
			                
						},
						error: (xhr, ajaxOptions, thrownError) => {
							console.error('Error in adding sub category: ' + xhr.status + ' => ' + thrownError);
						}
					});
				}, 100);
			}

			
		});
	});

	


	fillField = (id, value, field, event) => {
		event.preventDefault();
		$(field).val(value);
		$('#cat_id').val(id);
	}

	

	


	categories_edit = id => {

		$('#myModal .modal-title').html('<i class="fas fa-edit mr-2"></i>Categories');

		$.ajax({
			url: $base_url + 'super/get_category',
			method: 'get',
			dataType: 'json',
			data: {id: id},
			success: result => {
				$('#myModal .modal-body').html('<div class="row">' +
												'<div class="col-lg-8">' +
												'<label>Category name:</label>' +
												'<input autocomplete="off" id="catName1" class="custom-field" type="text" name="category" value="'+ result.category_name +'">' +
												'</div>' +
												'<div class="col-lg-4">' +
												'<label>Category days:</label>' +
												'<input autocomplete="off" id="catDays1" class="custom-field" type="text" name="catDays" value="'+ result.category_days +'">' +
												'</div>' +
												'<div class="col-lg-6 mt-3">' + 
												'<label>Subject:</label>' +
												'<select id="catSubj" class="custom-field">' +
												'<option value="No">No</option>' +
												'<option value="Yes">Yes</option>' +
												'</select>' +
												'</div>' +
												'<div class="col-lg-6 mt-3">' + 
												'<label>RCA:</label>' +
												'<select id="catOpt" class="custom-field">' +
												'<option></option>' +
												'<option value="rca1">rca1</option>' +
												'<option value="rca2">rca2</option>' +
												'</select>' +
												'</div>' +
												'</div>' +
												'</div>' +
												'</div>');

				$('#myModal .modal-footer').html('<p class="alert-required alert-field"></p><button onclick="update_category('+ id +')" class="btn-sm btn btn-primary ml-auto mr-2">Update</button>');

				$('#catSubj').val(result.category_subj);
				$('#catOpt').val(result.category_opt);
		
			},
			error: (xhr, ajaxOptions, thrownError) => {
				console.error('Error in editing category: ' + xhr.status + ' => ' + thrownError);
			}
		});

		$('#myModal').modal({
			backdrop: 'static',
			keyboard: false,
			show: true
		});
	}

	update_category = id => {
		let categoryName = $('#catName1').val();
		let categoryDays = $('#catDays1').val();
		let categorySubj = $('#catSubj option:selected').text();
		let categoryOpt = $('#catOpt option:selected').text();

		if (categoryName == '' && categoryDays != '') {
			$('#myModal .alert-field').text('Category Name is required!');
		} else if (categoryDays == '' && categoryName != '') {
			$('#myModal .alert-field').text('Category Days is required!');
		} else if (categoryName == '' && categoryDays == '') {
			$('#myModal .alert-field').text('Category Name and Days are required!');
		} else if (categoryName != '' && categoryDays != '') {
			$('#myModal .alert-field').empty();

			$.ajax({
				url: $base_url + 'super/update_category',
				method: 'post',
				data: {id: id, catName: categoryName, catDays: categoryDays, catSubj: categorySubj, catOpt: categoryOpt},
				success: result =>{
					$('#myModal').modal('toggle');
					$('.toast-area').append('<div class="toast fade animated fadeInDown" role="alert" aria-live="assertive" data-delay="5000" aria-atomic="true">' +
	                                        '<div class="toast-header">' +
	                                        '<strong class="mr-auto toast-title">Super admin</strong>' +
	                                        '<button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">' +
	                                        '<span aria-hidden="true">&times;</span>' +
	                                        '</button>' +
	                                        '</div>' +
	                                        '<div class="toast-body">' +
	                                        'Category updated successfully' +
	                                        '</div>' +
	                                        '</div>');
	                $(".toast").toast('show');
	                
	                $('.toast').on('hidden.bs.toast', function () {
	                    $(this).remove();
	                });
   				 	
   				 	$('#tbl-categories').DataTable().ajax.reload();
					insert_logs('Updated category');


				},
				error: (xhr, ajaxOptions, thrownError) => {
					console.error('Error in updating category: ' + xhr.status + ' => ' + thrownError);
				}		
			});
		}
		
	}

	delete_row = (id, field) => {
		let newField = field;
		$('#myModal .modal-dialog').addClass('modal-sm');
		$('#myModal .modal-title').html('<i class="fas fa-info mr-2"></i>Confirmation');
		$('#myModal .modal-body').html('<p class="text-center">Are you sure you want to delete this record?</p>');
		$('#myModal .modal-footer').html('<p class="alert-required alert-field"></p><button data-dismiss="modal" class="btn btn-sm btn-primary">No</button><button onclick="delete_true('+id+', \''+field+'\')" class="btn btn-sm btn-danger ml-auto">Yes</button>')
		$('#myModal').modal({
			backdrop: 'static',
			keyboard: false,
			show: true
		});
	}

	delete_true = (id, newField) => {
		$.ajax({
			url: $base_url + 'super/delete',
			method: 'get',
			data: {id: id, tbl: newField},
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
                                        'Record deleted successfully' +
                                        '</div>' +
                                        '</div>');
                $(".toast").toast('show');
                
                $('.toast').on('hidden.bs.toast', function () {
                    $(this).remove();
                });


               switch(newField) {
               		case ' category ':
				 		$('#tbl-categories').DataTable().ajax.reload();
						insert_logs('Deleted category');
				 		break;

				 	case ' sub_category ':
			 			$('#tbl-sub-categories').DataTable().ajax.reload();
						insert_logs('Deleted sub-category');
				 		break;

				 	case ' root ':
				 		$('#tbl-root').DataTable().ajax.reload();
						insert_logs('Deleted root cause');
				 		break;

				 	case ' rmode ':
			 			$('#tbl-rmode').DataTable().ajax.reload();
						insert_logs('Deleted report mode');
				 		break;

				 	case ' holiday ':
			 			$('#tbl-holidays').DataTable().ajax.reload();
						insert_logs('Deleted holiday');
				 		break;

				 	default:
				 		alert('Table not found');
               }

				countTable();


			},
			error: (xhr, ajaxOptions, thrownError) => {
				console.error('Error in deleting records: ' + xhr.status  + ' => ' + thrownError);
			}
		});
	}

	$('#myModal').on('hidden.bs.modal', function (e) {
		$('#myModal .modal-dialog').removeClass('modal-sm');
		$('#myModal .modal-title').empty();
		$('#myModal .modal-body').html('<img class="loading2" src="' + $base_url + '/assets/css/images/loading.gif" />');
		$('#myModal .modal-footer').empty();
	})

	subCategories_edit = id => {
		$.ajax({
			url: $base_url + 'super/get_subCategory',
			method: 'get',
			dataType: 'json',
			data: {id: id},
			success: result => {
				$('#myModal .modal-title').html('<i class="fas fa-plus mr-2"></i>Sub-category');
				$('#myModal .modal-body').html('<div class="row">' +
												'<div class="col-lg-6">' +
												'<label>Category</label>' +
												'<select id="catName1" class="custom-field">' +
												'<select>' +
												'<input autocomplete="off" type="text" id="subCat_id" value="'+result.sub_category_id+'"  hidden />' +
												'</div>' +
												'<div class="col-lg-6">' +
												'<label>Sub-category</label>' +
												'<input autocomplete="off" id="subCat1" class="custom-field" type="text" name="subCat" value="'+result.sub_category_name+'">' +
												'</div>' +
												'</div>');
				$('#myModal .modal-footer').html('<p class="alert-required alert-field"></p><button id="btn-update-sub-category" class="btn-sm btn btn-primary ml-auto mr-2">Update</button>');
				
				let selectedOptionID = result.category_id;

				$.ajax({
					url: $base_url + 'super/get_all_category',
					dataType: 'json',
					success: result => {
						$('#catName1').empty();
						$.each(result, function(k, v) {
							$('#catName1').append('<option value="'+v.category_id+'">'+ v.category_name +'</option>');
						});

						$('#catName1').val(selectedOptionID).change();

						$('#myModal').modal({
							backdrop: 'static',
							keyboard: false,
							show: true
						})
					},
					error: (xhr, ajaxOptions, thrownError) => {
						console.error('Error in fetching categories: ' + xhr.status + ' => ' + thrownError);
					}
				});

			},
			error: (xhr, ajaxOptions, thrownError) => {
				alert(xhr.status + ' => ' +thrownError);
				console.error('Error in editing sub category: ' + xhr.status + ' => ' + thrownError);
			}
		});

		$(document).off().on('click', '#btn-update-sub-category', () => {
			let catID = $('#catName1 option:selected').val();
			let subCategoryName = $('#subCat1').val();
			let id = $('#subCat_id').val();
			if (subCategoryName == '') {
				$('#myModal .alert-field').text('Sub-category Name is required!');
			} else {
				$('#myModal .alert-field').empty();

				setTimeout(() => {
					$.ajax({
						url: $base_url + 'super/update_sub_category',
						method: 'post',
						data: {id: id, categoryID: catID, subCatName: subCategoryName},
						success: result => {
							console.log('updated successfully');
							$('#myModal').modal('toggle');
							$('.toast-area').append('<div class="toast fade animated fadeInDown" role="alert" aria-live="assertive" data-delay="5000" aria-atomic="true">' +
			                                        '<div class="toast-header">' +
			                                        '<strong class="mr-auto toast-title">Super admin</strong>' +
			                                        '<button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">' +
			                                        '<span aria-hidden="true">&times;</span>' +
			                                        '</button>' +
			                                        '</div>' +
			                                        '<div class="toast-body">' +
			                                        'Sub-category updated successfully' +
			                                        '</div>' +
			                                        '</div>');
			                $(".toast").toast('show');
			                
			                $('.toast').on('hidden.bs.toast', function () {
			                    $(this).remove();
			                });
	               				 
	       				 	$('#tbl-sub-categories').DataTable().ajax.reload();
							insert_logs('Updated sub-category');

						},
						error: (xhr, ajaxOptions, thrownError) => {
							console.error('Error in updating sub category: ' + xhr.status + ' => ' + thrownError);
						}
					});
				}, 100);
			}
			
		});
		
	}

	

});
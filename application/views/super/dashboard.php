<div class="animated fadeIn">
<div class="row">
    <div class="col-xl-2 col-md-6 mb-4">
      <div class="card border-left-primary shadow h-100 py-2">
        <div class="card-body">
          <div class="row no-gutters align-items-center">
            <div class="col mr-2">
              <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">Users</div>
              <div id="count-users" class="h5 mb-0 font-weight-bold text-gray-800"></div>
            </div>
            <div class="col-auto">
              <i class="fas fa-users fa-2x text-gray-300"></i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-xl-2 col-md-6 mb-4">
      <div class="card border-left-success shadow h-100 py-2">
        <div class="card-body">
          <div class="row no-gutters align-items-center">
            <div class="col mr-2">
              <div class="text-xs font-weight-bold text-success text-uppercase mb-1">Categories</div>
              <div id="count-categories" class="h5 mb-0 font-weight-bold text-gray-800"></div>
            </div>
            <div class="col-auto">
              <i class="fas fa-folder fa-2x text-gray-300"></i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-xl-2 col-md-6 mb-4">
      <div class="card border-left-secondary shadow h-100 py-2">
        <div class="card-body">
          <div class="row no-gutters align-items-center">
            <div class="col mr-2">
              <div class="text-xs font-weight-bold text-secondary text-uppercase mb-1">Sub-categories</div>
              <div id="count-sub-categories" class="h5 mb-0 font-weight-bold text-gray-800"></div>
            </div>
            <div class="col-auto">
              <i class="fas fa-folder-open fa-2x text-gray-300"></i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-xl-2 col-md-6 mb-4">
      <div class="card border-left-info shadow h-100 py-2">
        <div class="card-body">
          <div class="row no-gutters align-items-center">
            <div class="col mr-2">
              <div class="text-xs font-weight-bold text-info text-uppercase mb-1">Root Cause</div>
              <div class="row no-gutters align-items-center">
                <div class="col-auto">
                  <div id="count-root" class="h5 mb-0 mr-3 font-weight-bold text-gray-800"></div>
                </div>
              </div>
            </div>
            <div class="col-auto">
              <i class="fas fa-file-alt fa-2x text-gray-300"></i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-xl-2 col-md-6 mb-4">
      <div class="card border-left-warning shadow h-100 py-2">
        <div class="card-body">
          <div class="row no-gutters align-items-center">
            <div class="col mr-2">
              <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">Report Modes</div>
              <div id="count-modes" class="h5 mb-0 font-weight-bold text-gray-800"></div>
            </div>
            <div class="col-auto">
              <i class="fas fa-mobile fa-2x text-gray-300"></i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-xl-2 col-md-6 mb-4">
      <div class="card border-left-danger shadow h-100 py-2">
        <div class="card-body">
          <div class="row no-gutters align-items-center">
            <div class="col mr-2">
              <div class="text-xs font-weight-bold text-danger text-uppercase mb-1">Holidays</div>
              <div id="count-holidays" class="h5 mb-0 font-weight-bold text-gray-800"></div>
            </div>
            <div class="col-auto">
              <i class="fas fa-calendar fa-2x text-gray-300"></i>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
<div class="row" class="tbl-field">
	<div class="col-lg-6">
		<div class="card shadow mb-4 card-height">
      	<div class="card-header py-3">
    			<h6 class="m-0 font-weight-bold text-secondary">Users</h6>
  	    </div>
          <div class="card-body">
            <table id="tbl-users" class="table table-borderless table-striped" width="100%" cellspacing="0">
            	<thead>
            		<tr>
                  <th>ID</th>
            			<th>Name</th>
            			<th>Access</th>
                  <th>Edit</th>
            		</tr>
            	</thead>
            	<tbody>
            	</tbody>
            </table>
          </div>
    </div>
	</div>
	<div class="col-lg-6">
		<div class="card shadow mb-4 card-height">
        	<div class="card-header py-3">
      			<h6 class="m-0 font-weight-bold text-secondary">Categories</h6>
    	    </div>
            <div class="card-body">
              <table id="tbl-categories" class="table table-borderless table-striped" width="100%" cellspacing="0">
              	<thead>
              		<tr>
                    <th>ID</th>
              			<th>Category</th>
              			<th>Days</th>
                    <th>Subject</th>
                    <th>Rca</th>
                    <th>Action</th>
              		</tr>
              	</thead>
              	<tbody>
              	</tbody>
              </table>
            </div>
      </div>
	</div>

  <div class="col-lg-5">
    <div class="card shadow mb-4 card-height">
          <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-secondary">Sub-categories</h6>
          </div>
            <div class="card-body">
              <table id="tbl-sub-categories" class="table table-borderless table-striped" width="100%" cellspacing="0">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Sub-category</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                </tbody>
              </table>
            </div>
      </div>
  </div>

	<div class="col-lg-7">
		<div class="card shadow mb-4 card-height">
        	<div class="card-header py-3">
      			<h6 class="m-0 font-weight-bold text-secondary">Root Cause</h6>
    	    </div>
            <div class="card-body">
              <table id="tbl-root" class="table table-borderless table-striped" width="100%" cellspacing="0">
              	<thead>
              		<tr>
                    <th>ID</th>
                    <th>Root Code</th>
              			<th>Category ID</th>
              			<th>Root Description</th>
                    <th>Action</th>
              		</tr>
              	</thead>
              	<tbody>
              	</tbody>
              </table>
            </div>
      </div>
	</div>

	<div class="col-lg-6">
		<div class="card shadow mb-4 card-height">
        	<div class="card-header py-3">
      			<h6 class="m-0 font-weight-bold text-secondary">Report Modes</h6>
    	    </div>
            <div class="card-body">
              <table id="tbl-rmode" class="table table-borderless table-striped" width="100%" cellspacing="0">
              	<thead>
              		<tr>
                    <th>ID</th>
              			<th>Report</th>
                    <th>Action</th>
              		</tr>
              	</thead>
              	<tbody>
              	</tbody>
              </table>
            </div>
      </div>
	</div>

  <div class="col-lg-6">
    <div class="card shadow mb-4 card-height">
          <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-secondary">Holidays</h6>
          </div>
            <div class="card-body">
              <table id="tbl-holidays" class="table table-borderless table-striped" width="100%" cellspacing="0">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Holiday</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                </tbody>
              </table>
            </div>
      </div>
  </div>
</div>
</div>

<script src="<?php echo base_url() ?>assets/js/super-dashboard.js"></script>

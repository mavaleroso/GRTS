<link rel="stylesheet" href="<?php echo base_url() ?>assets/css/grievance.css">

<div class="card-1 card shadow animated fadeIn">
  <div class="card-header">
    <div class="card-title m-0 h6"><i class="mr-2 fas fa-users-cog"></i>Grievance List</div>
  </div>
  <div class="card-body p-3">
    <div class="p-0">
      <?php if(form_error('fileURL')) {?>
          <div class="alert alert-danger alert-dismissible">
              <button type="button" class="close" data-dismiss="alert">&times;</button>
              <?php print form_error('fileURL'); ?>
          </div>
      <?php } ?>
      <form id="import" enctype="multipart/form-data" accept-charset="utf-8" hidden>
         <input class="d-inline float-left" type="file" id="validatedCustomFile" name="fileURL" required accept=".xls, .xlsx, .csv" />
         <input id="btn-import" class="d-inline float-left" type="submit" name="import" value="Import" />
      </form>
      <div class="d-flex">
        <button class="btn-choose">Choose File</button>
        <input class="choose-text" type="text" name="" disabled>
        <button class="btn-import" disabled>Import</button>

        <button class="btn btn-sm ml-auto shadow-sm show-tags"><i class="fas fa-arrows-alt-v"></i></button>
      </div>
    </div>
    <div class="categoriesTags p-2 mt-3 hidden"></div>

    <table id="tbl-grievance" class="display nowrap table table-striped table-borderless animated fadeIn" style="width:100%">
      <thead>
          <tr>
              <th>ID</th>
              <th>HH ID</th>
              <th>Member</th>
              <th>Name</th>
              <th>Category</th>
              <th>Sub-category</th>
              <th>Date Intake</th>
              <th>Days</th>
              <th>Deadline</th>
              <th>Deadline1</th>    <!-- Hidden Column -->
              <th>Working Days</th> <!-- Hidden Column -->
              <th>Status</th>
              <th>Date L.A.T.</th>
              <th>Date Resolved</th>
              <th>Last Modified By</th>
              <th>State</th>
              <th class="th-bkg">Action</th>
          </tr>
      </thead>
      <tbody></tbody>
    </table>
  </div>
</div>

<script src="<?php echo base_url() ?>assets/js/view_grievance.js"></script>

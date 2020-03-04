<link rel="stylesheet" href="<?php echo base_url() ?>assets/css/duplicate.css">

<div class="card-1 card shadow animated fadeIn">
  <div class="card-header">
    <div class="card-title m-0 h6"><i class="mr-2 fas fa-clone"></i>Duplicate Grievance</div>
  </div>
  <div class="card-body p-3">
    <table id="tbl-duplicate" class="display nowrap table table-striped table-borderless animated fadeIn" style="width:100%">
      <thead>
          <tr>
              <th><input type="checkbox" name="select_all" value="1" id="example-select-all"></th>
              <th>ID</th>
              <th>HH ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Sub-category</th>
              <th>Date Intake</th>
              <th class="th-bkg">Action</th>
          </tr>
      </thead>
      <tbody></tbody>
    </table>
  </div>
</div>

<script src="<?php echo base_url() ?>assets/js/duplicate.js"></script>


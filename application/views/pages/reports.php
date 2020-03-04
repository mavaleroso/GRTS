<link rel="stylesheet" href="<?php echo base_url() ?>assets/css/reports.css">


<div class="card shadow animated fadeIn">
  <div class="card-header">
    <div class="card-title h6 m-0"><i class="mr-2 fas fa-file"></i>Generate Reports</a></div>
  </div>
  <div class="card-body p-3">
    <div class="row">
      <div class="col-lg-3 d-flex">
        <h6 class="p-2">FROM:</h6>
        <select  id="fromMonth" class="monthSelector ml-auto">
          <option selected></option>
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
      </div>
      <div class="col-lg-3 d-flex">
        <h6 class="p-2">TO:</h6>
        <select id="toMonth" class="monthSelector ml-auto">
          <option selected></option>
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
      </div>
      <div class="col-lg-3 d-flex">
        <h6 class="p-2">YEAR:</h6>
        <select id="year" class="monthSelector ml-auto">
          <option selected></option>
          <?php 
            foreach ($year as $key => $value) {
             echo '<option value="'.$value->year.'">'.$value->year.'</option>';
            }
          ?>
          
        </select>
      </div>
      <div class="col-lg-3">
        <button id="generateReport" class="btn btn-sm btn-success m-auto d-block p-2 ">Generate<i class="ml-1 fas fa-arrow-alt-circle-right"></i></button>
      </div>
    </div>
  </div>
</div>

<div class="card shadow animated fadeIn mt-4">
  <div class="card-header">
    <div class="card-title h6 m-0"><i class="mr-2 fas fa-table"></i>All Grievance Data</div>
  </div>
  <div class="card-body p-4">
    <div class="row">
      <div class="col-lg-3 d-flex">
        <label class="labelFilter" for="provFilter">Province</label>
        <select id="provFilter" class="selectFilter">
         <option selected></option>
          <?php 
              foreach ($filterProv as $key => $value) {
                  echo '<option value="'.$value->PSGC_PROVINCE.'">'. $value->PROVINCE_NAME .'</option>';
              }
          ?>
        </select>
      </div>
      <div class="col-lg-3 d-flex">
        <label class="labelFilter" for="munFilter">Muncipality</label>
        <select id="munFilter" class="selectFilter"></select>
      </div>
      <div class="col-lg-3 d-flex">
        <label class="labelFilter" for="brgyFilter">Barangay</label>
        <select id="brgyFilter" class="selectFilter"></select>
      </div>
      <div class="col-lg-3 d-flex">
        <label class="labelFilter" for="yearFilter">Year</label>
        <select id="yearFilter" class="selectFilter">
         <option selected></option>
          <?php 
            foreach ($year as $key => $value) {
             echo '<option value="'.$value->year.'">'.$value->year.'</option>';
            }
          ?>
        </select>
      </div>
      <div class="col-lg-12 mt-3 mb-1">
        <button id="btn-filter" class="btn m-auto d-block btn-sm btn-secondary"><i class="fas fa-filter mr-1"></i>Filter</button>
      </div>
    </div>
    <hr>
    <table id="tbl-allData" class="table nowrap table-striped table-borderless" style="width:100%">
        <thead>
            <tr>
                <th>ID</th>
                <th>Tracking No.</th>
                <th>Household ID</th>
                <th>Fullname</th>
                <th>Sex</th>
                <th>Region</th>
                <th>Province</th>
                <th>City/Muncipality</th>
                <th>Barangay</th>
                <th>Subject</th>
                <th>GBV Sex</th>
                <th>GBV Age</th>
                <th>Mode</th>
                <th>Category</th>
                <th>Sub-category</th>
                <th>Grievance Description</th>
                <th>Actions/Resolution</th>
                <th>Date Intake</th>
                <th>Date Encode</th>
                <th>Date of Last action taken</th>
                <th>Date Resolve</th>
                <th>Assisted By</th>
                <th>Status</th>
                <th>Resolve</th>
                <th>Timeline</th>
                <th>Result</th>
                <th>Remarks</th>
                <th>RCA</th>
                <th>P1</th>
                <th>P2</th>
                <th>P3</th>
                <th>P4</th>
                <th>P5</th>
                <th>P6</th>
                <th>Yes or No</th>
                <th>if(yes): Transaction #</th>
                <th># of Child</th>
                <th>Name of Child 1</th>
                <th>Name of Child 2</th>
                <th>Name of Child 3</th>
                <th>IP Affiliation</th>  
                <th class="th-bkg">Action</th>
            </tr>
        </thead>
        <tbody></tbody>
    </table>
  </div>
</div>

<div id="reportForm" class="card shadow animated fadeIn mt-4">
  <div class="card-header">
    <div class="card-title h6 m-0"><i class="mr-2 fas fa-file-alt"></i>Reports</div>
  </div>
  <div class="card-body p-3">
    <div class="card-height d-flex">
      <button id="btn-export-excel" class="btn btn-sm btn-success"><i class="fas fa-file-csv mr-2"></i>Export CSV</button>
      <h6 id="rangeLbl" class="ml-auto p-1"></h6>
    </div>
    <div id="reportTab" class="mt-3">
      <ul>
        <li id="tab1-on"><a href="#reptabs-1">Category</a></li>
        <li id="tab2-on"><a href="#reptabs-2">Tracking</a></li>
        <li id="tab3-on"><a href="#reptabs-3">Province</a></li>
        <li id="tab4-on"><a href="#reptabs-4">Resolved</a></li>
      </ul>
      <div id="reptabs-1">
        <table id="categoryTable" class="display nowrap table table-striped table-borderless w-100">
          <thead>
            <tr class="tbl-row">
              <th>Category</th>
              <th>Agusan Del Norte</th>
              <th>Agusan Del Sur</th>
              <th>Dinagat Island</th>
              <th>Suriago Del Norte</th>
              <th>Surigao Del Sur</th>
              <th>Grand Total</th>
            </tr>
          </thead>
          <tbody></tbody>
          <tfoot>
            <tr>
              <th>Grand Total</th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
      <div id="reptabs-2">
        <table id="trackingTable" class="display nowrap table table-striped table-borderless w-100">
          <thead>
              <tr class="tbl-row">
                  <th>Tracking No.</th>
                  <th>Household ID</th>
                  <th>Fullname</th>
                  <th>Sex</th>
                  <th>Region</th>
                  <th>Province</th>
                  <th>City/Muncipality</th>
                  <th>Barangay</th>
                  <th>Subject</th>
                  <th>GBV Sex</th>
                  <th>GBV Age</th>
                  <th>Mode</th>
                  <th>Category</th>
                  <th>Sub-category</th>
                  <th>Grievance Description</th>
                  <th>Actions/Resolution</th>
                  <th>Date Intake</th>
                  <th>Date Encode</th>
                  <th>Date of Last action taken</th>
                  <th>Date Resolve</th>
                  <th>Assisted By</th>
                  <th>Status</th>
                  <th>RCA</th>
                  <th>P1</th>
                  <th>P2</th>
                  <th>P3</th>
                  <th>P4</th>
                  <th>P5</th>
                  <th>P6</th>
                  <th>Yes or No</th>
                  <th>if(yes): Transaction #</th>
                  <th># of Child</th>
                  <th>Name of Child 1</th>
                  <th>Name of Child 2</th>
                  <th>Name of Child 3</th>
                  <th>IP Affiliation</th>          
              </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
      </div>
      <div id="reptabs-3">
        <table id="provinceTable" class="display nowrap table table-striped table-borderless w-100">
          <thead>
            <tr class="tbl-row">
              <th>Province</th>
              <th>Beyond</th>
              <th>Within</th>
              <th>Grand Total</th>
              <th>Percentage (%)</th>
            </tr>
          </thead>
          <tbody></tbody>
           <tfoot>
            <tr>
              <th>Grand Total</th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
      <div id="reptabs-4">
        <table id="resolvedTable" class="display nowrap table table-striped table-borderless w-100">
          <thead>
              <tr class="tbl-row">
                  <th>Tracking No.</th>
                  <th>Household ID</th>
                  <th>Fullname</th>
                  <th>Sex</th>
                  <th>Region</th>
                  <th>Province</th>
                  <th>City/Muncipality</th>
                  <th>Barangay</th>
                  <th>Subject</th>
                  <th>GBV Sex</th>
                  <th>GBV Age</th>
                  <th>Mode</th>
                  <th>Category</th>
                  <th>Sub-category</th>
                  <th>Grievance Description</th>
                  <th>Actions/Resolution</th>
                  <th>Date Intake</th>
                  <th>Date of Last action taken</th>
                  <th>Date Encode</th>
                  <th>Date Resolve</th>
                  <th>Assisted By</th>
                  <th>Status</th>
                  <th>Resolve</th>
                  <th>Timeline</th>
                  <th>Result</th>
                  <th>Remarks</th>
                  <th>RCA</th>
                  <th>P1</th>
                  <th>P2</th>
                  <th>P3</th>
                  <th>P4</th>
                  <th>P5</th>
                  <th>P6</th>
                  <th>Yes or No</th>
                  <th>if(yes): Transaction #</th>
                  <th># of Child</th>
                  <th>Name of Child 1</th>
                  <th>Name of Child 2</th>
                  <th>Name of Child 3</th>
                  <th>IP Affiliation</th>          
              </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  </div>
</div>

<script src="<?php echo base_url() ?>assets/js/buttons.html5.2.min.js"></script>
<script src="<?php echo base_url() ?>assets/js/reports.js"></script>

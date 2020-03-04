<link rel="stylesheet" href="<?php echo base_url() ?>assets/css/beneficiary.css">

<div class="card card-1 shadow animated fadeIn">
    <div class="card-header">
        <div class="card-title m-0 h6"><i class="mr-2 fas fa-users"></i>Grantee List</div>
    </div>
    <div class="card-body p-3">
        <div class="row pt-4 pb-4 pr-5 pl-5">
            <div class="col-lg-4 d-flex">
                <label for="prov" class="mr-2 f-12 w-25">Province</label>
                <select class="filterField w-75" id="prov">
                    <option selected></option>
                <?php 
                    foreach ($filterProv as $key => $value) {
                        echo '<option value="'.$value->PSGC_PROVINCE.'">'. $value->PROVINCE_NAME .'</option>';
                    }
                ?>
                </select>
            </div>
            <div class="col-lg-4 d-flex">
                <label for="mun" class="mr-2 f-12 w-25">Muncipality</label>
                <select class="filterField w-75" id="mun">
                </select>
            </div>
            <div class="col-lg-4 d-flex">
                <label for="brgy" class="mr-2 f-12 w-25">Barangay</label>
                <select class="filterField w-75" id="brgy">
                </select>
            </div>
            <div class="col-lg-12 d-flex">
                <button id="btn-filter" class="btn btn-sm btn-secondary mr-auto ml-auto mt-3"><i class="fas fa-filter mr-1"></i>Filter</button>
            </div>
        </div>
        <table id="tbl-beneficiary" class="display nowrap table table-striped table-borderless animated fadeIn" style="width:100%">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Member</th>
                    <th>Last Name</th>
                    <th>First Name</th>
                    <th>Middle Name</th>
                    <th>Age</th>
                    <th>Sex</th>
                    <th>Address</th>
                    <th width="30px" class="th-bkg">View</th>
                </tr>
            </thead>
            <tbody></tbody>
      </table>
    </div>
</div>
<script src="<?php echo base_url() ?>assets/js/beneficiary.js"></script>

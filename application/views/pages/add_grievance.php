<link rel="stylesheet" href="<?php echo base_url() ?>assets/css/grievance.css">
<input id="user-location" type="text" value="<?php echo $user->location ?>" hidden>

<div class="form-grievance shadow animated fadeIn">
  <h4>GRIEVANCE FORM</h4>
  <ul class="form-grievance-ul">
    <li class="tab1 active">COMPLAINANT INFORMATION</li>
    <li class="tab2">GRIEVANCE INFORMATION</li>
    <li class="tab3">RESOLUTION INFORMATION</li>
  </ul>
  <section id="form-sec1">
    <div class="row mb-4">
      <div class="col-sm-4">
        <div class="radio-form-div">
          <input type="radio" name="optradio" value="RCCT" id="radio-one" class="form-radio" checked>
          <label class="radio-lbl" for="radio-one">RCCT</label>
        </div>
      </div>
      <div class="col-sm-4">
        <div class="radio-form-div">
          <input type="radio" name="optradio" value="MCCT" id="radio-two" class="form-radio">
          <label class="radio-lbl" for="radio-two">MCCT</label>
        </div>
      </div>
      <div class="col-sm-4">
        <div class="radio-form-div">
          <input type="radio" name="optradio" value="Non-beneficiary" id="radio-three" class="form-radio">
          <label class="radio-lbl" for="radio-three">Non-beneficiary</label>
        </div>
      </div>
    </div>
    <form >
      <div class="row field-set pl-3 pr-3">
        <div class="col-lg-8 input-container">
          <i class="fas fa-home"></i>
          <div class="group dropdown">
            <div class="group group-hh" id="demo" class="dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <input class="input-txt search-field" id="hh-id"  type="text" required>
              <span class="highlight"></span>
              <span class="bar"></span>
              <label class="input-lbl">Household ID</label>
            </div>
            <div class="dropdown-menu animated slideIn search-result margin-drop search-location" aria-labelledby="demo">
              <img class="search-loader" src="<?php echo base_url() ?>/assets/css/images/loading2.gif" />
            </div>
          </div>
          <div class="group">
            <input class="input-txt" id="set" type="text" required>
            <span class="highlight"></span>
            <span class="bar"></span>
            <label class="input-lbl">Set</label>
          </div>
        </div>
        <div class="col-lg-4 input-container">
          <i class="fas fa-users"></i>
          <div class="group">
            <input class="input-txt" id="ip" type="text" required>
            <span class="highlight"></span>
            <span class="bar"></span>
            <label class="input-lbl">IP Affiliation</label>
          </div>
        </div>
      </div>
      <div class="row field-set pl-3 pr-3">
        <div class="col-lg-9 input-container">
          <i class="fas fa-user"></i>
          <div class="group dropdown">
            <div class="group group-fname" id="demo1" class="dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" name="button">
              <input class="input-txt search-field" id="fname" type="text" required>
              <span class="highlight"></span>
              <span class="bar"></span>
              <label class="input-lbl">First Name<sup>*</sup></label>
              <p class="field-required alert-fname">This field is required.</p>
            </div>
            <div class="dropdown-menu animated slideIn search-result margin-drop search-location" aria-labelledby="demo1">
              <img class="search-loader" src="<?php echo base_url() ?>/assets/css/images/loading2.gif" />
            </div>
          </div>
          <div class="group group-mname">
            <input class="input-txt search-field" id="mname" type="text" required>
            <span class="highlight"></span>
            <span class="bar"></span>
            <label class="input-lbl">Middle Name</label>
          </div>
          <div class="group dropdown">
            <div class="group group-lname" id="demo3" class="dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" name="button">
              <input class="input-txt search-field" id="lname" type="text" required>
              <span class="highlight"></span>
              <span class="bar"></span>
              <label class="input-lbl">Last Name<sup>*</sup></label>
              <p class="field-required alert-lname">This field is required.</p>
            </div>
            <div class="dropdown-menu animated slideIn search-result margin-drop search-location" aria-labelledby="demo3">
                <img class="search-loader" src="<?php echo base_url() ?>/assets/css/images/loading2.gif" />
            </div>
          </div>
        </div>
        <div class="col-lg-3 input-container">
          <i class="fas fa-restroom"></i>
          <div class="group">
            <select class="input-txt" id="sex" required>
              <option disabled selected> </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <span class="highlight"></span>
            <span class="bar"></span>
            <label class="input-lbl">Sex<sup>*</sup></label>
            <p class="field-required alert-sex">This field is required.</p>
          </div>
        </div>
      </div>
      <div class="row field-set pl-3 pr-3">
        <div class="col-lg-12 input-container">
          <i class="fas fa-map-marker-alt"></i>
          <div class="group">
            <input class="input-txt" id="purok" type="text" required>
            <span class="highlight"></span>
            <span class="bar"></span>
            <label class="input-lbl">Purok</label>
          </div>
          <div class="group dropdown">
            <div class="group" id="searchBrgy1" class="dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <input class="input-txt search-brgy" id="brgy" type="text" required>
              <span class="highlight"></span>
              <span class="bar"></span>
              <label class="input-lbl">Barangay<sup>*</sup></label>
              <p class="field-required alert-brgy">This field is required.</p>
            </div>
            <div class="dropdown-menu animated slideIn list-brgy search-location margin-drop" aria-labelledby="searchBrgy1">
                  <img class="search-loader" src="<?php echo base_url() ?>/assets/css/images/loading2.gif" />
            </div>
          </div>
          
          <div class="group dropdown">
            <div class="group" id="searchMunCity1" class="dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <input class="input-txt search-mun-city" id="mun-city" type="text" list="list-mun-city" required>
              <span class="highlight"></span>
              <span class="bar"></span>
              <label class="input-lbl">Muncipality/City<sup>*</sup></label>
              <p class="field-required alert-mun-city">This field is required.</p>
            </div>
            <div class="dropdown-menu animated slideIn list-mun-city search-location margin-drop" aria-labelledby="searchMunCity1">
                  <img class="search-loader" src="<?php echo base_url() ?>/assets/css/images/loading2.gif" />
            </div>
          </div>
          
          <div class="group dropdown">
            <div class="group" id="searchProvince" class="dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <input class="input-txt search-provinces" id="province" type="text"  required>
              <span class="highlight"></span>
              <span class="bar"></span>
              <label class="input-lbl">Province<sup>*</sup></label>
              <p class="field-required alert-province">This field is required.</p>
            </div>
            <div class="dropdown-menu animated slideIn list-province search-location margin-drop" aria-labelledby="searchProvince">
                  <img class="search-loader" src="<?php echo base_url() ?>/assets/css/images/loading2.gif" />
            </div>
          </div>

          <div class="group dropdown">
            <div class="group" id="searchRegion" class="dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <input class="input-txt search-regions" id="region" type="text" required>
              <span class="highlight"></span>
              <span class="bar"></span>
              <label class="input-lbl">Region<sup>*</sup></label>
              <p class="field-required alert-region">This field is required.</p>
            </div>
            <div class="dropdown-menu animated slideIn list-region search-location margin-drop" aria-labelledby="searchRegion">
                  <img class="search-loader" src="<?php echo base_url() ?>/assets/css/images/loading2.gif" />
            </div>
          </div>
        </div>
      </div>
      
      <div class="row field-set pl-3 pr-3">
        <div class="col-lg-6 input-container">
          <i class="fas fa-mobile"></i>
          <div class="group">
            <input class="input-txt" id="contact" type="text" required>
            <span class="highlight"></span>
            <span class="bar"></span>
            <label class="input-lbl">Contact #</label>
          </div>
        </div>
        <div class="col-lg-6 input-container">
          <i class="far fa-calendar-alt"></i>
          <div class="group">
            <input class="input-txt" id="date-f" name="datefilter" type="text" required>
            <span class="highlight"></span>
            <span class="bar"></span>
            <label class="input-lbl">Date Filed<sup>*</sup></label>
            <p class="field-required alert-date-filed">This field is required.</p>
          </div>
        </div>
      </div>
    </form>
    <div class="form-btn">
      <button class="btn btn-info float-right" onclick="btn_com_info()" type="button" name="button">Next</button>
    </div>
  </section>

  <section id="form-sec2" class="hidden">
    <div class="row field-set pl-3 pr-3">
      <div class="col-lg-6 input-container">
        <i class="fas fa-folder"></i>
        <div class="group">
          <select class="input-txt" id="category" name="" required>
            <option value=""></option>
            <?php
              foreach ($res as $key => $value) {
                echo '<option data-rca="'.$value->category_opt.'" data-subj="'.$value->category_subj.'" value="'. $value->category_id .'">'. $value->category_name .'</option>';
              }
            ?>
          </select>
          <span class="highlight"></span>
          <span class="bar"></span>
          <label class="input-lbl">Category<sup>*</sup></label>
          <p class="field-required alert-category">This field is required.</p>
        </div>
      </div>
      <div class="col-lg-6 input-container">
        <i class="fas fa-folder-open"></i>
        <div class="group">
          <select class="input-txt" id="sub-category" name="" required>
            <option value=""></option>
          </select>
          <span class="highlight"></span>
          <span class="bar"></span>
          <label class="input-lbl">Sub-category</label>
        </div>
      </div>
    </div>
    <div class="divCat"></div>
    <div class="row field-set pl-3 pr-3 mt-3">
      <div class="col-lg-12 input-container">
        <i class="fas fa-file-signature"></i>
        <div class="group">
          <textarea class="input-txt txt-area" id="comp-des" name="name" rows="8" cols="80"></textarea>
          <span class="highlight"></span>
          <span class="bar"></span>
          <label class="input-lbl">PLEASE DESCRIBE THE COMPLAINT HERE:<sup>*</sup></label>
          <p class="field-required alert-description">This field is required.</p>
        </div>
      </div>
    </div>
    <div class="form-btn">
      <button class="btn btn-info float-left" onclick="btn_move('#form-sec2', '#form-sec1', '.tab2', '.tab1')" type="button" name="button">Back</button>
      <button class="btn btn-info float-right" onclick="btn_griev_info()" type="button" name="button">Next</button>
    </div>
  </section>

  <section id="form-sec3" class="hidden">
    <div class="row field-set pl-3 pr-3">
      <div class="col-lg-12 input-container">
        <i class="far fa-handshake"></i>
        <div class="group">
          <textarea class="input-txt txt-area" id="in-reso" name="name" rows="8" cols="80"></textarea>
          <span class="highlight"></span>
          <span class="bar"></span>
          <label class="input-lbl">INITIAL RESOLUTION:<sup>*</sup></label>
          <p class="field-required alert-resolution">This field is required.</p>
        </div>
      </div>
    </div>
    <div class="row field-set pl-3 pr-3">
      <div class="col-lg-4 input-container">
        <i class="fas fa-file-invoice"></i>
        <div class="group">
          <!-- <input class="input-txt" type="text" id="rep-mode" name=""  required> -->
          <select class="input-txt" id="rep-mode" required>
            <option disabled selected></option>
            <?php
              foreach ($res1 as $key => $value) {
                echo "<option value=". $value->mode_name .">". $value->mode_name ."</option>";
              }
            ?>
          </select>
          <span class="highlight"></span>
          <span class="bar"></span>
          <label class="input-lbl">Report Mode<sup>*</sup></label>
          <p class="field-required alert-r-mode">This field is required.</p>
        </div>
      </div>
      <div class="col-lg-4 input-container">
        <i class="fas fa-street-view"></i>
        <div class="group">
          <input class="input-txt" type="text" id="assist-by" name=""  required>
          <span class="highlight"></span>
          <span class="bar"></span>
          <label class="input-lbl">Assisted By<sup>*</sup></label>
          <p class="field-required alert-assist-by">This field is required.</p>
        </div>
      </div>
      <div class="col-lg-4 input-container">
        <i class="far fa-calendar-alt"></i>
        <div class="group">
          <input class="input-txt" id="date-assist" type="text" name="" value="" required>
          <span class="highlight"></span>
          <span class="bar"></span>
          <label class="input-lbl">Date Assisted<sup>*</sup></label>
          <p class="field-required alert-date-assist">This field is required.</p>
        </div>
      </div>
    </div>
    <div class="form-btn">
      <button class="btn btn-info float-left" onclick="btn_move('#form-sec3', '#form-sec2', '.tab3', '.tab2')" type="button" name="button">Back</button>
      <button class="btn btn-info float-right" onclick="btn_submit()" type="button" name="button">Submit</button>
    </div>
  </section>
</div>


<script src="<?php echo base_url(); ?>assets/js/add_grievance.js"></script>

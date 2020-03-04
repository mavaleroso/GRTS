<link rel="stylesheet" href="<?php echo base_url() ?>assets/css/profile.css">
<input id="old" type="text" value="<?= $user->username ?>" hidden>
<input id="oldPass" type="password" value="<?= $user->password ?>" hidden>
<?php 
    if ($user->location != '') {
        $str_arr = explode(",", $user->location); 
    } else {
        $str_arr = array('', '', '', '', '');
    }
?>
<div class="row p-4 animated fadeIn">
    <div class="col-lg-5 parent-card">
        <div class="card card1 shadow">
            <div class="img-holder">
                <?php 
                    if ($user->avatar != '') {
                        echo '<img src="'. base_url() .'assets/user-img/'. $user->avatar .'" alt="user image">';
                    } else {
                        echo '<img src="'. base_url() .'assets/css/images/user-man.png" alt="user image">';
                    }
                ?>
            </div>
            <form id="imgForm">
                <div class="form-group form-img">
                    <div hidden><input id="img-file" type="file" name="file" class="input-img" onchange="sub(this, event)"></div>
                    <div id="btn-choose" class="btn btn-img" id="btn_upload">Choose file</div>
                    <button class="btn btn-img" id="btn_upload" type="submit">Upload</button>
                </div>
            </form>   
            <hr>
            <div class="info">
                <div class="row">
                    <label for="uname" class="col-sm-4 col-form-label">Name</label>
                    <div class="col-sm-8 input-group name-group">
                        <input type="text" class="form-control card-field input-card1" id="uname" value="<?php echo $user->fullname ?>" disabled>
                        <div class="input-group-append">
                            <span class="input-group-text cursor-pointer icon-container">
                                    <i class="fas con-width fa-edit edit-con"></i>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <label for="uaccess" class="col-sm-4 col-form-label">Access</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control card-field" id="uaccess" value="<?php echo $user->access ?>" disabled>
                    </div>
                </div>
            </div>
            <hr>
            <div class="credential">
                <div class="form-group row">
                    <label for="username" class="col-sm-4 col-form-label">Username</label>
                    <div class="col-sm-8 input-group">
                        <input type="text" class="form-control input-card1" id="username" data-toggle="popover" data-trigger="focus" data-placement="top" value="<?php echo $user->username ?>" disabled>
                        <div class="input-group-append">
                            <span class="input-group-text cursor-pointer icon-container"><i class="fas con-width fa-edit edit-con"></i></span>
                        </div>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="upass" class="upass col-sm-4 col-form-label">Password</label>
                    <div class="col-sm-8 input-group">
                        <input type="password" class="form-control input-card1" id="upass" autocomplete="password" value="<?php echo $user->password ?>" disabled>
                        <div class="input-group-append">
                            <span class="input-group-text cursor-pointer icon-container"><i class="fas con-width fa-edit edit-pass"></i></span>
                        </div>
                    </div>
                </div>
                <div class="edit-password display-n">
                    <div class="form-group row">
                        <label for="upass1" class="col-sm-4 col-form-label">New Pass</label>
                        <div class="col-sm-8 input-group">
                            <input type="password" class="form-control input-card1" id="upass1" autocomplete="password" disabled>
                            <div class="input-group-append">
                                <span class="input-group-text cursor-pointer"><i class="fas con-width fa-edit font-white"></i></span>
                            </div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="upass2" class="col-sm-4 col-form-label">Confirm Pass</label>
                        <div class="col-sm-8 input-group">
                            <input type="password" class="form-control input-card1" id="upass2" autocomplete="password" disabled>
                            <div class="input-group-append">
                                <span class="input-group-text cursor-pointer"><i class="fas con-width fa-edit font-white"></i></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="col-lg-7">
        <div class="card shadow card2 p-3">
            <div class="card2-title">
                <h5 class="text-center"><i class="fas fa-map-marker-alt text-primary mr-2"></i>Location</h5>
                <i class="edit-btn2 con-width fas fa-edit"></i>
            </div>
            <p class="card2-alert text-center text-danger w-100 display-n">Fields that has (*) are required!</p>
            <div class="row pt-1">
                <div class="col-md-6">
                   
                    <label for="brgy" class="ml-2">Barangay</label>
                    <div class="dropdown">
                        <input type="text" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="input-style-4 input-card2 dropdown-toggle search-loc" id="brgy" value="<?php if (sizeof($str_arr) == 4) {echo $str_arr[0];} ?>" disabled>  
                        <div class="dropdown-menu animated slideIn search-result list-brgy margin-drop search-location" aria-labelledby="brgy">
                            <img class="search-loader" src="<?php echo base_url() ?>/assets/css/images/loading2.gif" />
                        </div>
                    </div>
                    

                    <label for="city" class="mt-2 ml-2">City/Mun<span class="text-danger">*</span></label>
                    <div class="dropdown">
                        <input type="text" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="input-style-4 input-card2 search-loc" id="city" value="<?php if (sizeof($str_arr) == 4) {echo substr($str_arr[1], 1);} else {echo substr($str_arr[0], 1);} ?>" disabled>
                        <div class="dropdown-menu animated slideIn search-result list-mun-city margin-drop search-location" aria-labelledby="city">
                            <img class="search-loader" src="<?php echo base_url() ?>/assets/css/images/loading2.gif" />
                        </div>
                    </div>
                </div>

                <div class="col-md-6">
                    <label for="province" class="ml-2">Province<span class="text-danger">*</span></label>
                    <div class="dropdown">
                        <input type="text" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="input-style-4 input-card2 search-loc" id="province" value="<?php if (sizeof($str_arr) == 4) {echo substr($str_arr[2], 1);} else {echo substr($str_arr[1], 1);} ?>" disabled>
                        <div class="dropdown-menu animated slideIn search-result list-province margin-drop search-location" aria-labelledby="province">
                            <img class="search-loader" src="<?php echo base_url() ?>/assets/css/images/loading2.gif" />
                        </div>
                    </div>
                    <label for="region" class="mt-2 ml-2">Region<span class="text-danger">*</span></label>
                    <div class="dropdown">
                        <input type="text" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="input-style-4 input-card2 search-loc" id="region" value="<?php if (sizeof($str_arr) == 4) {echo substr($str_arr[3], 1);} else {echo substr($str_arr[2], 1);} ?>" disabled>
                        <div class="dropdown-menu animated slideIn search-result list-region margin-drop search-location" aria-labelledby="region">
                            <img class="search-loader" src="<?php echo base_url() ?>/assets/css/images/loading2.gif" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        

        <div class="card shadow card3 p-3">
            <div class="card3-title ">
                <h6 class="text-center"><i class="fas fa-file-alt text-secondary mr-2"></i>Information</h6>
                <i class="edit-btn3 fas con-width fa-edit"></i>
            </div>
            <label for="email" class="mt ml-2">Email</label>
            <input type="email" class="input-style-5 input-edit input-card3" id="email" value="<?php echo $user->email ?>" disabled>
            <div class="row">
                <div class="col-sm-6">
                    <label for="contact" class="mt-2 ml-2">Contact</label>
                    <input type="text" class="input-style-5 input-edit input-card3" id="contact" value="<?php echo $user->contact ?>" disabled>
                </div>                
                <div class="col-sm-6">
                    <label for="b-day" class="mt-2 ml-2">Birth Date</label>
                    <input type="text" class="input-style-5 input-edit input-card3" id="b-day" value="<?php echo $user->bday ?>" disabled>
                 </div>
            </div>
            <div class="row">
                <div class="col-sm-6">
                    <label for="ldl" class="mt-2 ml-2">Last action taken</label>
                    <input type="text" class="input-style-5" id="ldl" value="<?php echo $user->log_action ?>" disabled>
                </div>
                <div class="col-sm-6">
                    <label for="lat" class="mt-2 ml-2">Last action date</label>
                    <input type="text" class="input-style-5" id="lat" value="<?php echo $user->dateAction ?>" disabled>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="<?php echo base_url() ?>assets/js/profile.js"></script>



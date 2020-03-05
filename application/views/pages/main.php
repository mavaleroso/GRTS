<!DOCTYPE html>
<html>
  <head>
      <title>GRTS</title>
      <link rel="icon" type="image/x-icon" href="<?= base_url() ?>assets/css/images/grs_logo.ico" />

      <meta charset="UTF-8">
      <meta name="description" content="Grievance Redress Tracking System">
      <meta name="keywords" content="HTML,CSS,JavaScript,PHP,AJAX">
      <meta name="author" content="DSWD-4P's">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="refresh" content="7200;url=<?php echo base_url() ?>Main/request_logout" />

      <?php $this->load->view('resources/CSS') ?>
      <link rel="stylesheet" href="<?php echo base_url() ?>assets/css/main.css">

      <input id="base-url" type="text"  value="<?php echo base_url() ?>" hidden>
      <input id="user-location" type="text" value="<?php echo $data->location ?>" hidden>
      <input id="access-status" type="text" value="<?php echo $this->session->userdata('access'); ?>" hidden>
      <input id="welcome-trig" type="text"  value="<?php echo $this->session->flashdata('welcome') ?>" hidden>
      <input id="img-user" type="text"  value="<?php echo $data->avatar ?>" hidden>
      <input id="sesuser-id" type="text" value="<?php echo $this->session->userdata('user_id'); ?>" hidden>
      <input id="ogName" type="text" value="<?php echo $data->fullname ?>" hidden>

  </head>
  <body id="myBody">
    <div class="wrapper animated fadeIn">
        <nav id="sidebar" class="shadow">
            <div class="sidebar-header d-flex">
                <img src="<?= base_url() ?>assets/css/images/grs_logo.png">
                <p>GRTS</p>
            </div>

            <ul class="list-unstyled components">
                <div class="heading-div">
                  <?php
                    if ($data->avatar != '') {
                        echo '<img class="u-logo" src="'. base_url() .'assets/user-img/'. $data->avatar .'" alt="user image">';
                    } else {
                        echo '<img class="u-logo" src="'. base_url() .'assets/css/images/user-man.png" alt="user image">';
                    }
                  ?>
                  <div class="stats"></div>
                  <p><?php echo $data->fullname ?><br><span class="access-p"><?php echo $data->access ?></span></p>
                </div>
                <li class="nav-dash">
                    <a onclick="Dashboard();"><i class="fas fa-tachometer-alt"></i><span class="tab">Dashboard</span></a>
                </li>
                <li id="nav-grievance">
                    <a href="#pageSubmenu" id="expand-grievance" data-toggle="collapse" aria-expanded="false" ><i class="far fa-list-alt"></i><span class="tab">Grievance</span><i id="expand-grievance-arrow" class="float-right mt-1 mr-2 fas fa-chevron-right"></i></a>
                    <ul class="collapse list-unstyled" id="pageSubmenu">
                        <li class="nav-add-grievance">
                            <a onclick="Add_grievance();" ><i class="fas fa-user-plus"></i><span class="tab">Add Grievance</span></a>
                        </li>
                        <li class="nav-view-grievance">
                            <a onclick="View_grievance();" ><i class="fas fa-users-cog"></i><span class="tab">View Grievance</span></a>
                        </li>
                        <li class="nav-duplicate-entry">
                            <a onclick="Duplicate_entry();" ><i class="fas fa-clone"></i><span class="tab">Duplicate Entry</span></a>
                        </li>
                    </ul>
                </li>
                <li class="nav-beneficiary">
                    <a onclick="Beneficiary();" ><i class="fas fa-users"></i><span class="tab">Grantee list</span></a>
                </li>
                <li class="nav-reports">
                    <a onclick="Reports();" ><i class="fas fa-file-alt"></i><span class="tab">Reports</span></a>
                </li>
                <li class="nav-logs">
                    <a onclick="Logs();"><i class="fas fa-clipboard"></i><span class="tab">Logs</span></a>
                </li>
            </ul>
            <hr class="divider">
            <footer class="sidebar-footer">
              <ul>
                <li>
                  <a class="a-profile cursor-pointer" onclick="Profile()">Profile</a>
                </li>
                <li>
                  <a class="a-message cursor-pointer" onclick="Message()">Message</a>
                </li>
              </ul>
            </footer>
        </nav>

        <div id="content">

            <nav class="navbar shadow navbar-expand-lg navbar-light bg-light">
                    <button type="button" id="sidebarCollapse" onclick="sidebar1()" class="btn btn-main">
                        <i class="fas fa-bars"></i>
                    </button>
                    <div id="notification1" class="btn-group ml-auto mr-2 message-field">
                      <button type="button" onclick="notification()" " class="logout-btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="fas fa-envelope"></i>
                      </button>
                      <p class="newNotif hidden">1</p>
                      <div class="dropdown-menu dropdown-menu-right shadow-sm mt-3">
                        <h6 class="dropdown-header text-center">Message Center</h6>
                        <div id="notify"></div>
                        <p class="dropdown-footer" onclick="Message()">Read more messages</p>
                      </div>
                    </div>
                    <div id="logout1" class="btn-group mr-2 logout-field">
                      <button type="button" class="logout-btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="fas fa-sign-out-alt"></i>
                      </button>
                      <div class="dropdown-menu dropdown-menu-right mt-3">
                        <h6 class="dropdown-header">Confirmation</h6>
                        <div class="dropdown-body p-2">
                          <p class="text-center">Do you really want to logout?</p>
                        </div>
                        <p class="dropdown-footer d-flex pl-2 pr-2 pb-0 mb-0"><button class="btn btn-secondary btn-sm cursor-pointer">No</button><button class="btn btn-primary btn-sm ml-auto cursor-pointer"><a href="<?php echo base_url() ?>Main/request_logout">Yes</a></button></p>
                      </div>
                    </div>

                    <nav id="nav2" class="navbar-expand-md w-100" hidden>
                      <div class="w-100">
                        <div class="nav-logo-mini mr-auto d-flex">
                          <img src="<?= base_url() ?>assets/css/images/grs_logo.png">
                          <p>GRTS</p>
                        </div>
                        <button id="navToggle2" class="navbar-toggler ml-auto d-block" type="button" data-toggle="collapse" data-target="#collapsingNavbarXs">
                            <div class="heading-div2">
                              <?php
                                if ($data->avatar != '') {
                                    echo '<img src="'. base_url() .'assets/user-img/'. $data->avatar .'" alt="user image">';
                                } else {
                                    echo '<img src="'. base_url() .'assets/css/images/user-man.png" alt="user image">';
                                }
                              ?>
                            </div>
                            <i class="stats2 fas fa-caret-down"></i>
                        </button>
                        <div class="nav2-container navbar-collapse collapse p-3" id="collapsingNavbarXs">
                            <ul class="navbar-nav">
                                <li class="nav-tem">
                                  <a class="nav-link cursor-pointer" onclick="Dashboard()">Dashboard</a>
                                </li>
                                <li class="nav-item">
                                  <a class="nav-link" id="grievanceDropdownMenu" role="button" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Grievance <i class="fas fa-caret-down"></i></a>
                                  <div class="dropdown-menu cursor-pointer dropdown-font" area-labelledby="grievanceDropdownMenu">
                                    <a class="dropdown-item cursor-pointer dropdown-font" onclick="Add_grievance()">Add Grievance</a>
                                    <a class="dropdown-item cursor-pointer dropdown-font" onclick="View_grievance()">View Grievance</a>
                                    <a class="dropdown-item cursor-pointer dropdown-font" onclick="Duplicate_entry()">Duplicate Grievance</a>
                                  </div>
                                </li>
                                <li class="nav-item">
                                  <a class="nav-link cursor-pointer" onclick="Beneficiary()">Grantee list</a>
                                </li>
                                <li class="nav-item">
                                  <a class="nav-link cursor-pointer" onclick="Reports()">Reports</a>
                                </li>
                                <li class="nav-item">
                                  <a class="nav-link cursor-pointer" onclick="Logs()">Logs</a>
                                </li>
                                <li class="nav-item">
                                  <a class="nav-link cursor-pointer" onclick="Profile()">Profile</a>
                                </li>
                                <li class="nav-item">
                                  <a class="nav-link cursor-pointer" onclick="Message()">Message</a>
                                </li>
                                <li class="nav-item">
                                  <a class="nav-link cursor-pointer" href="<?= base_url() ?>Main/request_logout">Logout</a>
                                </li>
                            </ul>
                        </div>
                      </div>
                    </nav>
            </nav>

            <div id="content-body" class="content-body"></div>
            <footer class="p-3 content-footer text-center shadow">Department of Social Welfare and Development &#9679; GRS Tracking © All rights reserved - 2019</footer>
        </div>
    </div>
    <!-- The Modal -->
    <div class="modal fade" id="myModal">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h6 class="modal-title  w-100 "></h6>
            <button type="button" style="outline:none" class="close" data-dismiss="modal">&times;</button>
          </div>
          <div class="modal-body p-3">
            <img class="loading2" src="<?php echo base_url() ?>/assets/css/images/loading2.gif" />
          </div>
          <div class="modal-footer"></div>
        </div>
      </div>
    </div>

    <!-- The Modal 2-->
    <div class="modal fade" id="myModal2">
      <div class="modal-dialog">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header modal-header2 text-center">
            <h4 class="modal-title modal-title2 w-100 "></h4>
            <button type="button" style="outline:none" class="close" data-dismiss="modal">&times;</button>
          </div>
          <!-- Modal body -->
          <div class="modal-body modal-body2 p-3">
            <img class="loading2" src="<?php echo base_url() ?>/assets/css/images/loading2.gif" />
          </div>
          <!-- Modal footer -->
          <div class="modal-footer modal-footer2">

          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="myModal3">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header p-2">
            <h6 class="modal-title m-0 pl-2"></h6>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>
          <!-- Modal body -->
          <div class="modal-body modal-body2 p-3">
            <img class="loading2" src="<?php echo base_url() ?>/assets/css/images/loading2.gif" />
          </div>
          <!-- Modal footer -->
          <div class="modal-footer modal-footer2">

          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="loadingModal">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <!-- Modal Header -->
          <!-- Modal body -->
            <img class="loadMod" src="<?php echo base_url() ?>/assets/css/images/loading.gif" />
            <p class="loadText text-white">Importing Files...</p>
          <!-- Modal footer -->
        </div>
      </div>
    </div>

     <div class="modal fade" id="welcomeModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header modal-header2 text-center">
            <h4 class="modal-title w-100"><i class="fas fa-door-open mr-1 text-primary"></i>Welcome</h4>
            <button type="button" style="outline:none" class="close" data-dismiss="modal">&times;</button>
          </div>
          <div class="modal-body">
            <div class="d-flex welcome-field pt-3">
              <div class="welcome-img-holder">
                <?php
                  if ($data->avatar != '') {
                      echo '<img class="welcome-img" src="'. base_url() .'assets/user-img/'. $data->avatar .'" alt="user image">';
                  } else {
                      echo '<img class="welcome-img" src="'. base_url() .'assets/css/images/user-man.png" alt="user image">';
                  }
                ?>
              </div>
              <div class="p-1">
                <h4 class="mb-0"><?php echo $this->session->userdata('fullname'); ?></h4>
                <p class="text-center"><?php echo $this->session->userdata('access'); ?></p>
              </div>
            </div>
            <?php
                if ($data->location == null) {
                  echo '<hr>';
                  echo '<h6 class="text-center">Please fill-in your current location on your profile!</h6>';
                  echo '<button class="btn btn-primary btn-profile" data-dismiss="modal" onclick="Profile()">Go to Profile <i class="fas fa-arrow-right"></i></button>';
                }
            ?>
          </div>
          <div class="modal-footer modal-footer2">

          </div>
        </div>
      </div>
    </div>

    <div aria-live="polite" aria-atomic="true" style="position: absolute; min-height: 200px; right: 10px; top: 60px; z-index: 99999">
      <div class="toast-area" style="position: absolute; top: 0; right: 0;">
      </div>
    </div>


      <?php $this->load->view('resources/JS') ?>
      <script src="<?php echo base_url() ?>assets/js/main.js"></script>
      <script src="<?php echo base_url() ?>assets/js/logs.js"></script>
      <?php echo $hello;?>
  </body>
</html>

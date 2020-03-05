<!DOCTYPE html>
<html>
<head>
	<title>GRTS Super Admin</title>
  <link rel="icon" type="image/x-icon" href="<?= base_url() ?>assets/css/images/grs_logo.ico" />
  
  <meta charset="UTF-8">
  <meta name="description" content="Grievance Redress Tracking System">
  <meta name="keywords" content="HTML,CSS,JavaScript,PHP,AJAX">
  <meta name="author" content="DSWD-4P's">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <?php $this->load->view('resources/CSS') ?>
  
  <input id="base" type="text" value="<?= base_url() ?>" hidden>
  <link rel="stylesheet" type="text/css" href="<?php echo base_url() ?>assets/css/sb-admin.css">
  <link rel="stylesheet" type="text/css" href="<?php echo base_url() ?>assets/css/super-main.css">
  <input id="user-name" type="text" value="<?= $data->fullname ?>" hidden>
  <input id="user-session-id" type="text" value="<?= $this->session->userdata('user_id') ?>" hidden>

</head>
<body id="page-top">
  <div id="wrapper">
   
    <div id="content-wrapper" class="d-flex flex-column">

      <div id="content">

        <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
          <a class="navbar-brand d-flex" href="#">
            <img src="<?= base_url() ?>assets/css/images/grs_logo.png">
            <p>GRTS</p>
          </a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>  

          <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3" style="z-index: 99999">
            <i class="fa fa-bars"></i>
          </button>
            <ul class="navbar-nav ml-auto">
              <li class="nav-item mr-3">
                <a class="nav-link nav-dash" onclick="dashboard()">Dashboard</a>
              </li>
              <li class="nav-item mr-3">
                <a class="nav-link nav-requests"  onclick="requests()">Request</a>
              </li>
              <li class="nav-item mr-3">
                <a class="nav-link nav-logs" onclick="logs()">Logs</a>
              </li>
              <li class="nav-item nav-separator mr-3"></li>
              <li class="nav-item">
                <a class="nav-link nav-messages" onclick="messages()"><i class="fas fa-envelope"></i><span class="newNotif hidden">5</span></a>
              </li>
              <li class="nav-item dropdown no-arrow">
                <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <span class="mr-2 d-none d-lg-inline text-gray-600 small"></span>
                  <img class="img-profile rounded-circle" src="<?php echo base_url() ?>assets/css/images/user-man.png">
                </a>
                <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                  <a id="settings" class="dropdown-item">
                    <i class="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                    Settings
                  </a>
                  <a id="overide" class="dropdown-item mt-2">
                    <i class="fas fa-wrench fa-sm fa-fw mr-2 text-gray-400"></i>
                    Overide
                  </a>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item" href="<?php echo base_url() ?>super/logout_request">
                    <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                    Logout
                  </a>
                </div>
              </li>
            </ul>
          <!-- </div> -->

        </nav>

        <div id="content-body" class="container-fluid"></div>
        <footer class="p-3 content-footer text-center shadow">Department of Social Welfare and Development &#9679; GRS Tracking © All rights reserved - 2019</footer>
      </div>
    </div>
  </div>

  <a class="scroll-to-top rounded" href="#page-top">
    <i class="fas fa-angle-up"></i>
  </a>

  <div id="myModal" class="modal fade" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title"></h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
            <img class="loading2" src="<?php echo base_url() ?>assets/css/images/loading.gif" />
        </div>
        <div class="modal-footer">
          
        </div>
      </div>
    </div>
  </div>

  <div id="myModal2" class="modal fade" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-sm" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <p class="modal-title"></p>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
            <img class="loading2" src="<?php echo base_url() ?>assets/css/images/loading.gif" />
        </div>
        <div class="modal-footer">
          
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

  <div aria-live="polite" aria-atomic="true" style="position: fixed; min-height: 200px; right: 10px; top: 60px; z-index: 99999">
      <div class="toast-area" style="position: absolute; top: 0; right: 0;">
      </div>
  </div>

	<?php $this->load->view('resources/JS') ?>
	<script src="<?php echo base_url() ?>assets/js/jquery.easing.js"></script>
	<script src="<?php echo base_url() ?>assets/js/sb-admin.js"></script>
	<script src="<?php echo base_url() ?>assets/js/super.js"></script>
  <?php echo $page; ?>

</body>
</html>
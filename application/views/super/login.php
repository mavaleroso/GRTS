<!DOCTYPE html>
<html>
<head>
	<title>GRTS Super Login</title>
  
  <meta charset="UTF-8">
  <meta name="description" content="Grievance Redress Tracking System">
  <meta name="keywords" content="HTML,CSS,JavaScript,PHP,AJAX">
  <meta name="author" content="DSWD-4P's">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <?php $this->load->view('resources/CSS') ?>

  <link rel="icon" type="image/x-icon" href="<?= base_url() ?>assets/css/images/grs_logo.ico" />
  <link rel="stylesheet" type="text/css" href="<?= base_url() ?>assets/css/sb-admin.css">
  <link rel="stylesheet" type="text/css" href="<?= base_url() ?>assets/css/super-login.css">
</head>
<body id="content-wrapper" class="d-flex flex-column">
  <div class="card shadow login-form animated fadeInDown">
      <div class="card-body">
        <img class="system-logo" src="<?= base_url() ?>assets/css/images/grs_logo.png" alt="GRTS LOGO">
        <p class="system-title m-0">Grievance Redress Tracking System</p>
        <p class="edition m-0 text-center">- Super Admin -</p>
        <hr>
        <form class="" action="<?= base_url() ?>super/login_request" method="post">
          <div class="div-form">
            <p class="flash-warning"><?= $message = $this->session->flashdata('data_name'); ?></p>
            <div class="login-field d-flex">
              <i class="fas fa-user"></i><input type="text" placeholder="Username" autocomplete="off" name="username" required>
            </div>
            <div class="login-field d-flex mt-2">
              <i class="fas fa-key"></i><input type="password" placeholder="Password" autocomplete="off" name="password" required>
            </div>
            <input class="btn-submit" type="submit" value="Login">
          </div>
        </form>
      </div>
      <div class="card-footer">
        <p class="login-footer text-center m-0">DSWD ● GRTS © All rights reserved - 2019</p>
      </div>
  </div>
	<?php $this->load->view('resources/JS') ?>
  <script type="text/javascript">
    window.history.pushState('', '', '/GRS/super');
  </script>
</body>
</html>
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>

    <title>GRTS Login</title>

    <meta charset="UTF-8">
    <meta name="description" content="Grievance Redress Tracking System">
    <meta name="keywords" content="HTML,CSS,JavaScript,PHP,AJAX">
    <meta name="author" content="DSWD-4P's">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="icon" type="image/x-icon" href="<?= base_url() ?>assets/css/images/grs_logo.ico" />
    <link rel="stylesheet" href="<?= base_url()?>assets/bootstrap/css/bootstrap.css">
    <link rel="stylesheet" href="<?= base_url()?>assets/css/animate.css">
    <link rel="stylesheet" href="<?= base_url()?>assets/fontawesome/css/all.css">
    <link rel="stylesheet" href="<?= base_url()?>assets/css/login.css">

  </head>
  <body class="d-flex">
    <div class="shadow card login-card animated fadeInDown">
      <div class="card-body">
        <img class="img-logo" src="<?= base_url(); ?>/assets/css/images/grs_logo.png" alt="">
        <p class="system-title m-0">Grievance Redress Tracking System</p>
        <p class="text-center edition "> - Online Edition - </p>
        <hr>
        <form class="" action="Main/login_request" method="post">
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
    <script src="<?= base_url()?>assets/js/jquery.js"></script>
  </body>
</html>

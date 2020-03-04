<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Main extends CI_Controller{

  public function __construct() {
    parent::__construct();
    $this->load->model('Model_grievance');
    $this->load->model('Model_beneficiary');
    $this->load->model('Model_logs');
    $this->load->model('Model_reports');
    $this->load->model('Model_category');
    $this->load->model('Model_sub_category');
    $this->load->model('Model_lib_brgy');
    $this->load->model('Model_lib_cities');
    $this->load->model('Model_lib_provinces');
    $this->load->model('Model_lib_regions');
    $this->load->model('Model_user');
    $this->load->model('Model_holidays');
    $this->load->model('Model_root');

  }

  public function index() {
    if($this->session->userdata('user_id') && $this->session->userdata('access') == 'Regional' || $this->session->userdata('access') == 'Provincial'){
      $id = $this->session->userdata('user_id');
      $load1['hello'] = "<script language=\"javascript\">Dashboard();</script>";
      $load1['data'] = $this->Model_user->query("SELECT * FROM user_info WHERE user_id = '$id'")->row();
      $this->load->view('pages/main', $load1);
    }else{
      $this->load->view('login');
    }
  }



  public function dashboard_data() {

    $result['province'] = $this->Model_grievance->query("SELECT *, SUM(g_status='Ongoing') as 'countOngoing', SUM(g_status='Resolved') as 'countResolved', COUNT(*) as 'countAll' FROM grievance WHERE YEAR(g_date_intake) = YEAR(NOW()) AND g_status IN ('Ongoing', 'Resolved') GROUP BY g_province")->result();

    $result['category'] = $this->Model_grievance->query("SELECT *, SUM(g_status='Ongoing') as 'countOngoing', SUM(g_status='Resolved') as 'countResolved', COUNT(*) as 'countAll' FROM grievance  WHERE YEAR(g_date_intake) = YEAR(NOW()) AND g_status IN ('Ongoing', 'Resolved') GROUP BY g_category")->result();

    $result['mode'] = $this->Model_grievance->query("SELECT *, SUM(g_status='Ongoing') as 'countOngoing', SUM(g_status='Resolved') as 'countResolved', COUNT(*) as 'countAll' FROM grievance  WHERE YEAR(g_date_intake) = YEAR(NOW()) AND g_status IN ('Ongoing', 'Resolved') GROUP BY g_mode")->result();

    $result['grievance'] = $this->Model_grievance->query("SELECT count(*) as 'countAll', DATE_FORMAT(NOW(), '%M %d, %Y %h:%i %p') AS 'DateNow' FROM grievance WHERE YEAR(g_date_intake) = YEAR(NOW()) AND g_status IN ('Ongoing', 'Resolved')")->row();

    $result['grievance2'] = $this->Model_grievance->query("SELECT DATE_FORMAT(NOW(), '%Y-%m-%d') as 'curDate', g_date_intake, category_days FROM grievance INNER JOIN category on category.category_id = grievance.g_category WHERE grievance.g_status = 'Ongoing' AND YEAR(grievance.g_date_intake) = YEAR(NOW())")->result();

    $result['grantee'] = $this->Model_grievance->query("SELECT *, COUNT(*) as 'countAll' FROM grantee_list")->row();

    $result['reports'] = $this->Model_grievance->query("SELECT *, COUNT(*) as 'countAll' FROM grievance WHERE g_status IN ('Ongoing','Resolved')")->row();

    $result['holidays'] = $this->Model_holidays->query("SELECT DATE_FORMAT(NOW(), '%Y') as 'curYear',holiday_date FROM holidays")->result();

    if ($this->session->userdata('user_id')) {
      return $this->load->view('pages/dashboard', $result);
    } else {
      redirect(base_url());
    }
  }

  public function add_grievance_data() {
    $id = $this->session->userdata('user_id');
    $result['user'] = $this->Model_user->query("SELECT * FROM user_info WHERE user_id = '$id'")->row();
    $result['res'] = $this->Model_category->query("SELECT * FROM category")->result();
    $result['res1'] = $this->Model_category->query("SELECT * FROM report_modes")->result();

    if ($this->session->userdata('user_id')) {
      return $this->load->view('pages/add_grievance', $result);
    } else {
      redirect(base_url());
    }
  }

  public function view_grievance_data() {
    if ($this->session->userdata('user_id')) {
      return $this->load->view('pages/view_grievance');
    } else {
      redirect(base_url());
    }
  }

  public function duplicate_entry_data() {
    if ($this->session->userdata('user_id')) {
      return $this->load->view('pages/duplicate_entry');
    } else {
      redirect(base_url());
    }
  }

  public function beneficiary_data() {
    $data['filterProv'] = $this->Model_lib_provinces->query("SELECT PSGC_PROVINCE, PROVINCE_NAME FROM lib_provinces WHERE REGION_ID='16' GROUP BY PROVINCE_NAME")->result();

    if ($this->session->userdata('user_id')) {
      return $this->load->view('pages/beneficiary.php', $data);
    } else {
      redirect(base_url());
    }
  }

  public function reports_data() {
    $result['year'] = $this->Model_grievance->query("SELECT DATE_FORMAT(g_date_intake, '%Y') as 'year' FROM grievance GROUP BY year DESC")->result();
    $result['filterProv'] = $this->Model_lib_provinces->query("SELECT PSGC_PROVINCE, PROVINCE_NAME FROM lib_provinces WHERE REGION_ID='16' GROUP BY PROVINCE_NAME")->result();

    if ($this->session->userdata('user_id')) {
      return $this->load->view('pages/reports', $result);
    } else {
      redirect(base_url());
    }
  }

  public function logs_data() {
    if ($this->session->userdata('user_id')) {
      return $this->load->view('pages/logs');
    } else {
      redirect(base_url());
    }
  }

  public function profile_data() {
    $id = $this->session->userdata('user_id');
    $result['user'] = $this->Model_user->query("SELECT *,DATE_FORMAT(user_info.birthdate, '%M %d, %Y') as 'bday',  DATE_FORMAT(logs.created_date, '%M %d, %Y | %h:%i %p') as 'dateAction' FROM user_info INNER JOIN logs on logs.log_user_id = user_info.user_id WHERE user_info.user_id = '$id' ORDER BY logs.log_action DESC LIMIT 1")->row();

    if ($this->session->userdata('user_id')) {
      return $this->load->view('pages/profile', $result);
    } else {
      redirect(base_url());
    }
  }

  public function message_data() {
    $id = $this->session->userdata('user_id');
    $result['user'] = $this->Model_user->query("SELECT * FROM user_info WHERE user_id = '$id'")->row();

    if ($this->session->userdata('user_id')) {
      return $this->load->view('pages/message', $result);
    } else {
      redirect(base_url());
    }
  }


  public function sub_category() {
    $category_id = $this->input->get('cat_id');
    $result = $this->Model_sub_category->query("SELECT * FROM sub_category WHERE category_id = '$category_id'")->result();
    echo json_encode($result);
  }

  public function fetch_rca() {
    $rca = $this->input->get('rca');
    $result = $this->Model_root->query("SELECT * FROM root_cause INNER JOIN category on category.category_id = root_cause.category_id WHERE root_cause.category_id = '$rca'")->result();
    echo json_encode($result);
  }

  public function get_datetime() {
    $result = $this->Model_sub_category->query("SELECT DATE_FORMAT(NOW(), '%M %d, %Y') AS 'Result'")->result();
    echo json_encode($result);
  }

  public function search_grantee() {
    $search = $this->input->get('query');
    $type = $this->input->get('memType');
    $result = $this->Model_beneficiary->query("SELECT * FROM grantee_list WHERE CONCAT(grant_firstname, grant_middlename, grant_lastname, grant_hh_id) LIKE '%$search%' AND grant_member = '$type' LIMIT 3")->result();
    echo json_encode($result);
  }

  public function search_brgy() {
    $search = $this->input->get('search');
    $result = $this->Model_lib_brgy->query("SELECT * FROM lib_brgy WHERE BRGY_NAME LIKE '%$search%' LIMIT 10")->result();
    echo json_encode($result);
  }

  public function search_mun_city() {
    $search = $this->input->get('search');
    $result = $this->Model_lib_cities->query("SELECT * FROM lib_cities WHERE CITY_NAME LIKE '%$search%' LIMIT 10")->result();
    echo json_encode($result);
  }

  public function search_provinces() {
    $search = $this->input->get('search');
    $result = $this->Model_lib_provinces->query("SELECT * FROM lib_provinces WHERE PROVINCE_NAME LIKE '%$search%' LIMIT 10")->result();
    echo json_encode($result);
  }

  public function search_regions() {
    $search = $this->input->get('search');
    $result = $this->Model_lib_regions->query("SELECT * FROM lib_regions WHERE REGION_NAME LIKE '%$search%' LIMIT 10")->result();
    echo json_encode($result);
  }



  public function login_request() {
    $user = $this->input->post('username');
    $pass = $this->input->post('password');
    $pass2 =  md5($pass);

    if($result = $this->model_user->query("SELECT * FROM user_info WHERE username='$user' AND password='$pass2' AND access IN ('Regional', 'Provincial') AND access != 'Super'")->result()) {

      foreach ($result as $key => $value) {
        if ($value) {
            $data = [
                  'user_id' => $value->user_id,
                  'level_id' => $value->level_id,
                  'fullname' => $value->fullname,
                  'access' => $value->access,
                  'overide' => $value->overide_status
            ];
            $this->session->set_userdata($data);
            $this->session->set_flashdata('welcome', 'True');
            $this->model_user->update(['is_status' => '1'], ['user_id' => $this->session->user_id]);
            redirect(base_url('main'));
        } else {
          echo 'error';
        }
      }

    } else if ($result = $this->model_user->query("SELECT * FROM user_info WHERE username='$user' AND password='$pass2' AND access != 'Super'")->result()) {

      $data = array('request_status' => 1, 'access' => NULL);
      $where = array('username' => $user);

      $this->Model_user->update($data, $where);

      $this->session->set_flashdata('data_name', 'Please notify admin to confirm your access request.');
      redirect(base_url().'main?login_attempt='.md5(0));

    } else {

      $this->session->set_flashdata('data_name', 'Incorrect Employee Username or Password!');
      redirect(base_url().'main?login_attempt='.md5(0));

    }
  }

  public function request_logout() {
    $this->model_user->update(["is_status" => "0"], ["user_id" => $this->session->user_id]);
    $this->session->sess_destroy();
    redirect(base_url());
  }

  public function dashboard() {
    if($this->session->userdata('user_id')){
      $load1['hello'] = "<script language=\"javascript\">Dashboard();</script>";
      $id = $this->session->userdata('user_id');
      $load1['data'] = $this->Model_user->query("SELECT * FROM user_info WHERE user_id = '$id'")->row();

      $this->load->view('pages/main', $load1);
    }else{
      redirect(base_url());
    }
  }

  public function add_grievance() {
    if($this->session->userdata('user_id') && $this->session->userdata('access') == 'Regional' || $this->session->userdata('access') == 'Provincial'){
      $load1['hello'] = "<script language=\"javascript\">Add_grievance();</script>";
      $id = $this->session->userdata('user_id');
      $load1['data'] = $this->Model_user->query("SELECT * FROM user_info WHERE user_id = '$id'")->row();
      $this->load->view('pages/main', $load1);
    }else{
      redirect(base_url());
    }
  }

  public function view_grievance() {
    if($this->session->userdata('user_id') && $this->session->userdata('access') == 'Regional' || $this->session->userdata('access') == 'Provincial'){
      $load1['hello'] = "<script language=\"javascript\">View_grievance();</script>";
      $id = $this->session->userdata('user_id');
      $load1['data'] = $this->Model_user->query("SELECT * FROM user_info WHERE user_id = '$id'")->row();
      $this->load->view('pages/main', $load1);
    }else{
      redirect(base_url());
    }
  }

  public function duplicate_entry() {
    if($this->session->userdata('user_id') && $this->session->userdata('access') == 'Regional' || $this->session->userdata('access') == 'Provincial'){
      $load1['hello'] = "<script language=\"javascript\">Duplicate_entry();</script>";
      $id = $this->session->userdata('user_id');
      $load1['data'] = $this->Model_user->query("SELECT * FROM user_info WHERE user_id = '$id'")->row();
      $this->load->view('pages/main', $load1);
    }else{
      redirect(base_url());
    }
  }

  public function beneficiary() {
    if($this->session->userdata('user_id') && $this->session->userdata('access') == 'Regional' || $this->session->userdata('access') == 'Provincial'){
      $load1['hello'] = "<script language=\"javascript\">Beneficiary();</script>";
      $id = $this->session->userdata('user_id');
      $load1['data'] = $this->Model_user->query("SELECT * FROM user_info WHERE user_id = '$id'")->row();
      $this->load->view('pages/main', $load1);
    }else{
      redirect(base_url());
    }
  }

  public function reports() {
    if($this->session->userdata('user_id') && $this->session->userdata('access') == 'Regional' || $this->session->userdata('access') == 'Provincial'){
      $load1['hello'] = "<script language=\"javascript\">Reports();</script>";
      $id = $this->session->userdata('user_id');
      $load1['data'] = $this->Model_user->query("SELECT * FROM user_info WHERE user_id = '$id'")->row();
      $this->load->view('pages/main', $load1);
    }else{
      redirect(base_url());
    }
  }

  public function logs() {
    if($this->session->userdata('user_id') && $this->session->userdata('access') == 'Regional' || $this->session->userdata('access') == 'Provincial'){
      $load1['hello'] = "<script language=\"javascript\">Logs();</script>";
      $id = $this->session->userdata('user_id');
      $load1['data'] = $this->Model_user->query("SELECT * FROM user_info WHERE user_id = '$id'")->row();
      $this->load->view('pages/main', $load1);
    }else{
      redirect(base_url());
    }
  }

  public function profile() {
    if($this->session->userdata('user_id') && $this->session->userdata('access') == 'Regional' || $this->session->userdata('access') == 'Provincial'){
      $load1['hello'] = "<script language=\"javascript\">Profile();</script>";
      $id = $this->session->userdata('user_id');
      $load1['data'] = $this->Model_user->query("SELECT * FROM user_info WHERE user_id = '$id'")->row();
      $this->load->view('pages/main', $load1);
    }else{
      redirect(base_url());
    }
  }

  public function message() {
    if($this->session->userdata('user_id') && $this->session->userdata('access') == 'Regional' || $this->session->userdata('access') == 'Provincial'){
      $load1['hello'] = "<script language=\"javascript\">Message();</script>";
      $id = $this->session->userdata('user_id');
      $load1['data'] = $this->Model_user->query("SELECT * FROM user_info WHERE user_id = '$id'")->row();
      $this->load->view('pages/main', $load1);
    }else{
      redirect(base_url());
    }
  }


}
?>

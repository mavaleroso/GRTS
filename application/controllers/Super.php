<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Super extends CI_Controller{

  public function __construct() {
      parent::__construct();
      $this->load->model('Model_user');
      $this->load->model('Model_category');
      $this->load->model('Model_sub_category');
      $this->load->model('Model_root');
      $this->load->model('Model_mode');
      $this->load->model('Model_holidays');
      $this->load->model('Model_logs');
      $this->load->model('Model_datatable');
      $this->load->model('Model_message');

  }

  public function index() {
    if($this->session->userdata('user_id') && $this->session->userdata('access') == 'Super'){
      $redirect['page'] = '<script>$(document).ready(() => {dashboard()});</script>';
      $id = $this->session->userdata('user_id');
      $redirect['data'] = $this->Model_user->query("SELECT * FROM user_info WHERE user_id = '$id'")->row();
      $this->load->view('super/main', $redirect);
    } else {
      $this->load->view('super/login');
    }
  }

 public function dashboard() {
    if($this->session->userdata('user_id') && $this->session->userdata('access') == 'Super'){
      $redirect['page'] = '<script>$(document).ready(() => {dashboard()});</script>';
      $id = $this->session->userdata('user_id');
      $redirect['data'] = $this->Model_user->query("SELECT * FROM user_info WHERE user_id = '$id'")->row();
      $this->load->view('super/main', $redirect);
    } else {
      $this->load->view('super/login');
    }
  }

  public function requests() {
    if($this->session->userdata('user_id') && $this->session->userdata('access') == 'Super'){
      $redirect['page'] = '<script>$(document).ready(() => {requests()});</script>';
      $id = $this->session->userdata('user_id');
      $redirect['data'] = $this->Model_user->query("SELECT * FROM user_info WHERE user_id = '$id'")->row();
      $this->load->view('super/main', $redirect);
    } else {
      $this->load->view('super/login');
    }
  }

  public function logs() {
    if($this->session->userdata('user_id') && $this->session->userdata('access') == 'Super'){
      $redirect['page'] = '<script>$(document).ready(() => {logs()});</script>';
      $id = $this->session->userdata('user_id');
      $redirect['data'] = $this->Model_user->query("SELECT * FROM user_info WHERE user_id = '$id'")->row();
      $this->load->view('super/main', $redirect);
    } else {
      $this->load->view('super/login');
    }
  }
  
  public function messages() {
    if($this->session->userdata('user_id') && $this->session->userdata('access') == 'Super'){
      $redirect['page'] = '<script>$(document).ready(() => {messages()});</script>';
      $id = $this->session->userdata('user_id');
      $redirect['data'] = $this->Model_user->query("SELECT * FROM user_info WHERE user_id = '$id'")->row();
      $this->load->view('super/main', $redirect);
    } else {
      $this->load->view('super/login');
    }
  }


  public function login_request() {
      $user = $this->input->post('username');
      $pass = $this->input->post('password');
      $pass =  md5($pass);

      if($result = $this->Model_user->query("SELECT * FROM user_info WHERE username='$user' AND password='$pass' AND access='super'")->result()) {

        foreach ($result as $key => $value) {
            if ($value) {
                $data = [
                    'user_id' => $value->user_id,
                    'level_id' => $value->level_id,
                    'fullname' => $value->fullname,
                    'access' => $value->access
                ];
                $this->session->set_userdata($data);
                $this->session->set_flashdata('welcome', 'True');
                $this->model_user->update(['is_status' => '1'], ['user_id' => $this->session->user_id]);
                redirect(base_url('super'));
            } else {
                echo 'error';
            }
        } 

    } else {
            $this->session->set_flashdata('data_name', 'Incorrect Username or Password!');
          // redirect(base_url().'super?login_attempt='.md5(0));
          redirect(base_url(). 'super');
      }
  }

  public function logout_request() {
    $this->model_user->update(["is_status" => "0"], ["user_id" => $this->session->user_id]);
    $this->session->sess_destroy();
    redirect(base_url('super'));
  }

  public function dashboard_data() {
    if ($this->session->userdata('user_id')) {
      return $this->load->view('super/dashboard');
    } else {
      redirect(base_url());
    }
  }

  public function requests_data() {
    if ($this->session->userdata('user_id')) {
      return $this->load->view('super/requests');
    } else {
      redirect(base_url());
    }
  }


  public function logs_data() {
    if ($this->session->userdata('user_id')) {
      return $this->load->view('super/logs');
    } else {
      redirect(base_url());
    }
  }

  public function messages_data() {
    if ($this->session->userdata('user_id')) {
      return $this->load->view('super/messages');
    } else {
      redirect(base_url());
    }
  }

  public function count_tbl() {
    $query = $this->Model_user->query("SELECT count(*) as 'users', (SELECT count(*) FROM category) as 'cat', (SELECT count(*) FROM sub_category) as 'subCat', (SELECT count(*) FROM root_cause) as 'root', (SELECT count(*) FROM report_modes) as 'mode', (SELECT count(*) FROM holidays) as 'holidays' FROM user_info")->row();

    echo json_encode($query);
  }

  public function get_user() {
    $id = $this->input->get('id');
    $query = $this->Model_user->query("SELECT * FROM user_info WHERE user_id = '$id'")->row();
    echo json_encode($query);
  }

  public function get_category() {
    $id = $this->input->get('id');
    $query = $this->Model_category->query("SELECT * FROM category WHERE category_id = '$id'")->row();
    echo json_encode($query);
  }

  public function update_user() {
    $id = $this->input->post('id');
    $access = $this->input->post('access');
    $where = array('user_id' => $id, );
    $data = array('access' => $access, 'request_status' => 2);
    $query = $this->Model_user->update($data, $where);
  }

  public function add_category() {
    $categoryName = $this->input->post('catName');
    $categoryDays = $this->input->post('catDays');
    $categorySubj = $this->input->post('catSubj');
    $categoryOpt = $this->input->post('catOpt');

    $data = array(
      'category_name' => $categoryName,
      'category_days' => $categoryDays,
      'category_subj' => $categorySubj,
      'category_opt' => $categoryOpt
      );

    $this->Model_category->insert($data);
  }

  public function add_sub_category() {
    $categoryID = $this->input->post('categoryID');
    $subCategoryName = $this->input->post('subCatName');

    $data = array(
      'category_id' => $categoryID,
      'sub_category_name' => $subCategoryName
      );

    $this->Model_sub_category->insert($data);
  }

  public function get_all_category() {
    $query = $this->Model_category->query("SELECT * FROM category")->result();
    echo json_encode($query);
  }

  public function update_category() {
    $id = $this->input->post('id');
    $catName = $this->input->post('catName');
    $catDays = $this->input->post('catDays');
    $categorySubj = $this->input->post('catSubj');
    $categoryOpt = $this->input->post('catOpt');
    $where = array('category_id' => $id, );
    $data = array(
      'category_name' => $catName,
      'category_days' => $catDays,
      'category_subj' => $categorySubj,
      'category_opt' => $categoryOpt
    );
    $this->Model_category->update($data, $where);
  }

  public function update_sub_category() {
    $id = $this->input->post('id');
    $cat_id = $this->input->post('categoryID');
    $sub_name = $this->input->post('subCatName');
    $where = array('sub_category_id' => $id, );
    $data = array(
      'category_id' => $cat_id,
      'sub_category_name' => $sub_name
    );
    $this->Model_sub_category->update($data, $where);
  }


  public function delete() {
    $id = $this->input->get('id');
    $tbl = $this->input->get('tbl');
    if ($tbl == ' category ') {
      $where = array('category_id' => $id, );
      $this->Model_category->delete($where);
    } elseif ($tbl == ' sub_category ') {
      $where = array('sub_category_id' => $id, );
      $this->Model_sub_category->delete($where);
    } elseif ($tbl == ' root ') {
      $where = array('root_id' => $id, );
      $this->Model_root->delete($where);
    } elseif ($tbl == ' rmode ') {
      $where = array('mode_id' => $id, );
      $this->Model_mode->delete($where);
    } elseif ($tbl == ' holiday ') {
      $where = array('holiday_id' => $id, );
      $this->Model_holidays->delete($where);
    }

  }

  public function get_subCategory() {
    $id = $this->input->post('id');
    $query = $this->Model_sub_category->query("SELECT * FROM sub_category INNER JOIN category on category.category_id = sub_category.category_id WHERE sub_category.sub_category_id = '$id'")->row();
    echo json_encode($query);
  }

  public function add_root() {
    $rootCode = $this->input->post('rCode');
    $rootDesc = $this->input->post('rDesc');
    $rCatID = $this->input->post('rCatID');

    $data = array(
      'root_code' => $rootCode, 
      'root_description' => $rootDesc 
    );

    if ($rCatID != NULL) {
      $data['category_id'] = $rCatID;
    }

    $this->Model_root->insert($data);
  }

  public function get_root() {
    $id = $this->input->get('id');
    $query = $this->Model_root->query("SELECT * FROM root_cause WHERE root_id = '$id'")->row();
    echo json_encode($query);
  }

  public function update_root() {
    $id = $this->input->post('id');
    $rCode = $this->input->post('rCode');
    $rDesc = $this->input->post('rDesc');
    $rCatID = $this->input->post('rCatID');

    $data = array(
      'root_code' => $rCode,
      'root_description' => $rDesc,
    );

    if ($rCatID != NULL) {
      $data['category_id'] = $rCatID;
    }

    $where = array('root_id' => $id, );

    $this->Model_root->update($data, $where);
  }

  public function add_report() {
    $mode = $this->input->post('mode');
    $data = array('mode_name' => $mode, );
    $this->Model_mode->insert($data);
  }

  public function get_rmode() {
    $id = $this->input->get('id');
    $query = $this->Model_mode->query("SELECT * FROM report_modes WHERE mode_id = '$id'")->row();
    echo json_encode($query);
  }

  public function update_rmode() {
    $id = $this->input->post('repID');
    $repMode = $this->input->post('repMode');
    $where = array('mode_id' => $id, );
    $data = array('mode_name' => $repMode,);
    $this->Model_mode->update($data, $where);
  }

  public function add_holiday() {
    $holidayName = $this->input->post('hName');
    $holidayDate = $this->input->post('hDate');
    $hDate = explode('-', $holidayDate); 
    $data = array(
      'holiday_name' => $holidayName, 
      'holiday_date' => $hDate[2] . '-' . $hDate[0] . '-' . $hDate[1]
    );
    $this->Model_holidays->insert($data);
  }

  public function get_holiday() {
    $id = $this->input->get('id');
    $query = $this->Model_holidays->query("SELECT *, DATE_FORMAT(holiday_date, '%m-%d-%Y') as hDate FROM holidays WHERE holiday_id = '$id'")->row();
    echo json_encode($query);
  }

  public function update_holiday() {
    $id = $this->input->post('hID');
    $holidayName = $this->input->post('hName');
    $holidayDate = $this->input->post('hDate');
    $hDate = explode('-', $holidayDate); 
    $where = array('holiday_id' => $id, );
    $data = array(
      'holiday_name' => $holidayName, 
      'holiday_date' => $hDate[2] . '-' . $hDate[0] . '-' . $hDate[1]
    );
    $this->Model_holidays->update($data, $where);
  }

  public function fetch_users_table() {
    $table = 'user_info';

    $select = '*'; 
    $joinTbl1 = NULL;
    $joinArgs1 = NULL;
    $joinTbl2 = NULL; 
    $joinArgs2 = NULL; 
    $joinTbl3 = NULL;  
    $joinArgs3 = NULL; 
    $joinTbl4 = NULL; 
    $joinArgs4 = NULL; 
    $joinTbl5 = NULL; 
    $joinArgs5 = NULL; 
    $joinTbl6 = NULL; 
    $joinArgs6 = NULL; 
    $joinTbl7 = NULL; 
    $joinArgs7 = NULL; 
    $joinTbl8 = NULL; 
    $joinArgs8 = NULL; 
    $joinTbl9 = NULL; 
    $joinArgs9 = NULL; 
    $whereInCol = NULL; 
    $whereInArgs = NULL; 
    $whereArgs = NULL; 
    $whereLike = NULL; 
    $whereMonth = NULL; 
    $whereYear = NULL; 
    $column1 = NULL; 
    $groupBy = NULL; 
    $havingArgs = NULL;

    $column_order = array(null, 'fullname','access','is_status'); 
    $column_search = array('fullname','access','is_status'); 
    $order = array('user_id' => 'asc'); 
    $list = $this->Model_datatable->get_datatables($table, $select, $joinTbl1, $joinArgs1, $joinTbl2, $joinArgs2, $joinTbl3, $joinArgs3, $joinTbl4, $joinArgs4, $joinTbl5, $joinArgs5, $joinTbl6, $joinArgs6, $joinTbl7, $joinArgs7, $joinTbl8, $joinArgs8, $joinTbl9, $joinArgs9, $whereInCol, $whereInArgs, $whereArgs, $whereLike, $whereMonth, $whereYear, $column1, $groupBy, $column_order, $column_search, $order, $havingArgs);
    $data = array();
    $no = $this->input->post('start');
    foreach ($list as $users) {
      $no++;
      $row = array();
      $row[] = $users->user_id;
      $row[] = $users->fullname;
      $row[] = $users->access;
      $row[] = "<i onclick='edit_user(".$users->user_id.")' class='fas fa-edit w-100 text-center'><i>";

      $data[] = $row;
    }

    $output = array(
      "draw" => $this->input->post('draw'),
      "recordsTotal" => $this->Model_datatable->count_all($table),
      "recordsFiltered" => $this->Model_datatable->count_filtered($table, $select, $joinTbl1, $joinArgs1, $joinTbl2, $joinArgs2, $joinTbl3, $joinArgs3, $joinTbl4, $joinArgs4, $joinTbl5, $joinArgs5, $joinTbl6, $joinArgs6, $joinTbl7, $joinArgs7, $joinTbl8, $joinArgs8, $joinTbl9, $joinArgs9, $whereInCol, $whereInArgs, $whereArgs, $whereLike, $whereMonth, $whereYear, $column1, $groupBy, $column_order, $column_search, $order, $havingArgs),
      "data" => $data,
    );
    echo json_encode($output);
  }

  public function fetch_categories_table() {

    $select = '*'; 
    $joinTbl1 = NULL;
    $joinArgs1 = NULL;
    $joinTbl2 = NULL; 
    $joinArgs2 = NULL; 
    $joinTbl3 = NULL;  
    $joinArgs3 = NULL; 
    $joinTbl4 = NULL; 
    $joinArgs4 = NULL; 
    $joinTbl5 = NULL; 
    $joinArgs5 = NULL; 
    $joinTbl6 = NULL; 
    $joinArgs6 = NULL; 
    $joinTbl7 = NULL; 
    $joinArgs7 = NULL; 
    $joinTbl8 = NULL; 
    $joinArgs8 = NULL; 
    $joinTbl9 = NULL; 
    $joinArgs9 = NULL; 
    $whereInCol = NULL; 
    $whereInArgs = NULL; 
    $whereArgs = NULL; 
    $whereLike = NULL; 
    $whereMonth = NULL; 
    $whereYear = NULL; 
    $column1 = NULL; 
    $groupBy = NULL; 
    $havingArgs = NULL;

    $table = 'category';
    $column_order = array(null, 'category_name','category_days'); 
    $column_search = array('category_name','category_days'); 
    $order = array('category_id' => 'asc'); 
    $list = $this->Model_datatable->get_datatables($table, $select, $joinTbl1, $joinArgs1, $joinTbl2, $joinArgs2, $joinTbl3, $joinArgs3, $joinTbl4, $joinArgs4, $joinTbl5, $joinArgs5, $joinTbl6, $joinArgs6, $joinTbl7, $joinArgs7, $joinTbl8, $joinArgs8, $joinTbl9, $joinArgs9, $whereInCol, $whereInArgs, $whereArgs, $whereLike, $whereMonth, $whereYear, $column1, $groupBy, $column_order, $column_search, $order, $havingArgs);
    $data = array();
    $no = $this->input->post('start');
    foreach ($list as $category) {
      $no++;
      $row = array();
      $row[] = $category->category_id;
      $row[] = $category->category_name;
      $row[] = $category->category_days;
      $row[] = $category->category_subj;
      $row[] = $category->category_opt;
      $row[] = "<div class='m-auto d-block action-w'><i onclick='categories_edit(". $category->category_id .")' class='fas fa-edit mr-2'></i><i onclick='delete_row(". $category->category_id .", \" category \")' class='fas fa-trash'></i></div>";

      $data[] = $row;
    }

    $output = array(
      "draw" => $this->input->post('draw'),
      "recordsTotal" => $this->Model_datatable->count_all($table),
      "recordsFiltered" => $this->Model_datatable->count_filtered($table, $select, $joinTbl1, $joinArgs1, $joinTbl2, $joinArgs2, $joinTbl3, $joinArgs3, $joinTbl4, $joinArgs4, $joinTbl5, $joinArgs5, $joinTbl6, $joinArgs6, $joinTbl7, $joinArgs7, $joinTbl8, $joinArgs8, $joinTbl9, $joinArgs9, $whereInCol, $whereInArgs, $whereArgs, $whereLike, $whereMonth, $whereYear, $column1, $groupBy, $column_order, $column_search, $order, $havingArgs),
      "data" => $data,
    );
    echo json_encode($output);
  }

  public function fetch_subCategories_table() {

    $select = '*'; 
    $joinTbl1 = NULL;
    $joinArgs1 = NULL;
    $joinTbl2 = NULL; 
    $joinArgs2 = NULL; 
    $joinTbl3 = NULL;  
    $joinArgs3 = NULL; 
    $joinTbl4 = NULL; 
    $joinArgs4 = NULL; 
    $joinTbl5 = NULL; 
    $joinArgs5 = NULL; 
    $joinTbl6 = NULL; 
    $joinArgs6 = NULL; 
    $joinTbl7 = NULL; 
    $joinArgs7 = NULL; 
    $joinTbl8 = NULL; 
    $joinArgs8 = NULL; 
    $joinTbl9 = NULL; 
    $joinArgs9 = NULL; 
    $whereInCol = NULL; 
    $whereInArgs = NULL; 
    $whereArgs = NULL; 
    $whereLike = NULL; 
    $whereMonth = NULL; 
    $whereYear = NULL; 
    $column1 = NULL; 
    $groupBy = NULL; 
    $havingArgs = NULL;

    $table = 'sub_category';
    $column_order = array(null, 'sub_category_name'); 
    $column_search = array('sub_category_name'); 
    $order = array('sub_category_id' => 'asc'); 

    $list = $this->Model_datatable->get_datatables($table, $select, $joinTbl1, $joinArgs1, $joinTbl2, $joinArgs2, $joinTbl3, $joinArgs3, $joinTbl4, $joinArgs4, $joinTbl5, $joinArgs5, $joinTbl6, $joinArgs6, $joinTbl7, $joinArgs7, $joinTbl8, $joinArgs8, $joinTbl9, $joinArgs9, $whereInCol, $whereInArgs, $whereArgs, $whereLike, $whereMonth, $whereYear, $column1, $groupBy, $column_order, $column_search, $order, $havingArgs);
    $data = array();
    $no = $this->input->post('start');
    foreach ($list as $subCategory) {
      $no++;
      $row = array();
      $row[] = $subCategory->sub_category_id;
      $row[] = $subCategory->sub_category_name;
      $row[] = "<div class='m-auto d-block action-w'><i onclick='subCategories_edit(".$subCategory->sub_category_id.")' class='fas fa-edit mr-2'></i><i onclick='delete_row(". $subCategory->sub_category_id .", \" sub_category \")' class='fas fa-trash'></i></div>";

      $data[] = $row;
    }

    $output = array(
      "draw" => $this->input->post('draw'),
      "recordsTotal" => $this->Model_datatable->count_all($table),
      "recordsFiltered" => $this->Model_datatable->count_filtered($table, $select, $joinTbl1, $joinArgs1, $joinTbl2, $joinArgs2, $joinTbl3, $joinArgs3, $joinTbl4, $joinArgs4, $joinTbl5, $joinArgs5, $joinTbl6, $joinArgs6, $joinTbl7, $joinArgs7, $joinTbl8, $joinArgs8, $joinTbl9, $joinArgs9, $whereInCol, $whereInArgs, $whereArgs, $whereLike, $whereMonth, $whereYear, $column1, $groupBy, $column_order, $column_search, $order, $havingArgs),
      "data" => $data,
    );
    echo json_encode($output);
  }

  public function fetch_root_table() {

    $select = '*'; 
    $joinTbl1 = NULL;
    $joinArgs1 = NULL;
    $joinTbl2 = NULL; 
    $joinArgs2 = NULL; 
    $joinTbl3 = NULL;  
    $joinArgs3 = NULL; 
    $joinTbl4 = NULL; 
    $joinArgs4 = NULL; 
    $joinTbl5 = NULL; 
    $joinArgs5 = NULL; 
    $joinTbl6 = NULL; 
    $joinArgs6 = NULL; 
    $joinTbl7 = NULL; 
    $joinArgs7 = NULL; 
    $joinTbl8 = NULL; 
    $joinArgs8 = NULL; 
    $joinTbl9 = NULL; 
    $joinArgs9 = NULL; 
    $whereInCol = NULL; 
    $whereInArgs = NULL; 
    $whereArgs = NULL; 
    $whereLike = NULL; 
    $whereMonth = NULL; 
    $whereYear = NULL; 
    $column1 = NULL; 
    $groupBy = NULL; 
    $havingArgs = NULL;

    $table = 'root_cause';
    $column_order = array(null, 'root_code', 'root_description');
    $column_search = array('root_code', 'root_description'); 
    $order = array('root_id' => 'asc'); 
    $list = $this->Model_datatable->get_datatables($table, $select, $joinTbl1, $joinArgs1, $joinTbl2, $joinArgs2, $joinTbl3, $joinArgs3, $joinTbl4, $joinArgs4, $joinTbl5, $joinArgs5, $joinTbl6, $joinArgs6, $joinTbl7, $joinArgs7, $joinTbl8, $joinArgs8, $joinTbl9, $joinArgs9, $whereInCol, $whereInArgs, $whereArgs, $whereLike, $whereMonth, $whereYear, $column1, $groupBy, $column_order, $column_search, $order, $havingArgs);
    $data = array();
    $no = $this->input->post('start');
    foreach ($list as $root) {
      $no++;
      $row = array();
      $row[] = $root->root_id;
      $row[] = $root->root_code;
      $row[] = $root->category_id;
      $row[] = $root->root_description;
      $row[] = "<div class='m-auto d-block action-w'><i onclick='root_edit(".$root->root_id.")' class='fas fa-edit mr-2'></i><i onclick='delete_row(". $root->root_id .", \" root \")' class='fas fa-trash'></i></div>";

      $data[] = $row;
    }

    $output = array(
      "draw" => $this->input->post('draw'),
      "recordsTotal" => $this->Model_datatable->count_all($table),
      "recordsFiltered" => $this->Model_datatable->count_filtered($table, $select, $joinTbl1, $joinArgs1, $joinTbl2, $joinArgs2, $joinTbl3, $joinArgs3, $joinTbl4, $joinArgs4, $joinTbl5, $joinArgs5, $joinTbl6, $joinArgs6, $joinTbl7, $joinArgs7, $joinTbl8, $joinArgs8, $joinTbl9, $joinArgs9, $whereInCol, $whereInArgs, $whereArgs, $whereLike, $whereMonth, $whereYear, $column1, $groupBy, $column_order, $column_search, $order, $havingArgs),
      "data" => $data,
    );
    echo json_encode($output);
  }

  public function fetch_mode_table() {

    $select = '*'; 
    $joinTbl1 = NULL;
    $joinArgs1 = NULL;
    $joinTbl2 = NULL; 
    $joinArgs2 = NULL; 
    $joinTbl3 = NULL;  
    $joinArgs3 = NULL; 
    $joinTbl4 = NULL; 
    $joinArgs4 = NULL; 
    $joinTbl5 = NULL; 
    $joinArgs5 = NULL; 
    $joinTbl6 = NULL; 
    $joinArgs6 = NULL; 
    $joinTbl7 = NULL; 
    $joinArgs7 = NULL; 
    $joinTbl8 = NULL; 
    $joinArgs8 = NULL; 
    $joinTbl9 = NULL; 
    $joinArgs9 = NULL; 
    $whereInCol = NULL; 
    $whereInArgs = NULL; 
    $whereArgs = NULL; 
    $whereLike = NULL; 
    $whereMonth = NULL; 
    $whereYear = NULL; 
    $column1 = NULL; 
    $groupBy = NULL; 
    $havingArgs = NULL;

    $table = 'report_modes';
    $column_order = array(null, 'mode_name'); 
    $column_search = array('mode_name'); 
    $order = array('mode_id' => 'asc'); 
    $list = $this->Model_datatable->get_datatables($table, $select, $joinTbl1, $joinArgs1, $joinTbl2, $joinArgs2, $joinTbl3, $joinArgs3, $joinTbl4, $joinArgs4, $joinTbl5, $joinArgs5, $joinTbl6, $joinArgs6, $joinTbl7, $joinArgs7, $joinTbl8, $joinArgs8, $joinTbl9, $joinArgs9, $whereInCol, $whereInArgs, $whereArgs, $whereLike, $whereMonth, $whereYear, $column1, $groupBy, $column_order, $column_search, $order, $havingArgs);
    $data = array();
    $no = $this->input->post('start');
    foreach ($list as $mode) {
      $no++;
      $row = array();
      $row[] = $mode->mode_id;
      $row[] = $mode->mode_name;
      $row[] = "<div class='m-auto d-block action-w'><i onclick='mode_edit(".$mode->mode_id.")' class='fas fa-edit mr-2'></i><i onclick='delete_row(". $mode->mode_id .", \" rmode \")' class='fas fa-trash'></i></div>";

      $data[] = $row;
    }

    $output = array(
      "draw" => $this->input->post('draw'),
      "recordsTotal" => $this->Model_datatable->count_all($table),
      "recordsFiltered" => $this->Model_datatable->count_filtered($table, $select, $joinTbl1, $joinArgs1, $joinTbl2, $joinArgs2, $joinTbl3, $joinArgs3, $joinTbl4, $joinArgs4, $joinTbl5, $joinArgs5, $joinTbl6, $joinArgs6, $joinTbl7, $joinArgs7, $joinTbl8, $joinArgs8, $joinTbl9, $joinArgs9, $whereInCol, $whereInArgs, $whereArgs, $whereLike, $whereMonth, $whereYear, $column1, $groupBy, $column_order, $column_search, $order, $havingArgs),
      "data" => $data,
    );
    echo json_encode($output);
  }

   public function fetch_holiday_table() {

    $select = '*, DATE_FORMAT(holiday_date, "%m-%d-%Y") as hDate'; 
    $joinTbl1 = NULL;
    $joinArgs1 = NULL;
    $joinTbl2 = NULL; 
    $joinArgs2 = NULL; 
    $joinTbl3 = NULL;  
    $joinArgs3 = NULL; 
    $joinTbl4 = NULL; 
    $joinArgs4 = NULL; 
    $joinTbl5 = NULL; 
    $joinArgs5 = NULL; 
    $joinTbl6 = NULL; 
    $joinArgs6 = NULL; 
    $joinTbl7 = NULL; 
    $joinArgs7 = NULL; 
    $joinTbl8 = NULL; 
    $joinArgs8 = NULL; 
    $joinTbl9 = NULL; 
    $joinArgs9 = NULL; 
    $whereInCol = NULL; 
    $whereInArgs = NULL; 
    $whereArgs = NULL; 
    $whereLike = NULL; 
    $whereMonth = NULL; 
    $whereYear = NULL; 
    $column1 = NULL; 
    $groupBy = NULL; 
    $havingArgs = NULL;
    
    $table = 'holidays';
    $column_order = array('holiday_name', 'holiday_date');
    $column_search = array('holiday_name', 'holiday_date'); 
    $order = array('holiday_id' => 'asc'); 
    $list = $this->Model_datatable->get_datatables($table, $select, $joinTbl1, $joinArgs1, $joinTbl2, $joinArgs2, $joinTbl3, $joinArgs3, $joinTbl4, $joinArgs4, $joinTbl5, $joinArgs5, $joinTbl6, $joinArgs6, $joinTbl7, $joinArgs7, $joinTbl8, $joinArgs8, $joinTbl9, $joinArgs9, $whereInCol, $whereInArgs, $whereArgs, $whereLike, $whereMonth, $whereYear, $column1, $groupBy, $column_order, $column_search, $order, $havingArgs);
    $data = array();
    $no = $this->input->post('start');
    foreach ($list as $mode) {
      $no++;
      $row = array();
      $row[] = $mode->holiday_id;
      $row[] = $mode->holiday_name;
      $row[] = $mode->hDate;
      $row[] = "<div class='m-auto d-block action-w'><i onclick='holiday_edit(".$mode->holiday_id.")' class='fas fa-edit mr-2'></i><i onclick='delete_row(". $mode->holiday_id .", \" holiday \")' class='fas fa-trash'></i></div>";

      $data[] = $row;
    }

    $output = array(
      "draw" => $this->input->post('draw'),
      "recordsTotal" => $this->Model_datatable->count_all($table),
      "recordsFiltered" => $this->Model_datatable->count_filtered($table, $select, $joinTbl1, $joinArgs1, $joinTbl2, $joinArgs2, $joinTbl3, $joinArgs3, $joinTbl4, $joinArgs4, $joinTbl5, $joinArgs5, $joinTbl6, $joinArgs6, $joinTbl7, $joinArgs7, $joinTbl8, $joinArgs8, $joinTbl9, $joinArgs9, $whereInCol, $whereInArgs, $whereArgs, $whereLike, $whereMonth, $whereYear, $column1, $groupBy, $column_order, $column_search, $order, $havingArgs),
      "data" => $data,
    );
    echo json_encode($output);
  }

  public function fetch_logs_table() {

    $select = "*, DATE_FORMAT(created_date, '%M %d, %Y %h:%i %p') AS 'createdDate'"; 
    $joinTbl1 = NULL;
    $joinArgs1 = NULL;
    $joinTbl2 = NULL; 
    $joinArgs2 = NULL; 
    $joinTbl3 = NULL;  
    $joinArgs3 = NULL; 
    $joinTbl4 = NULL; 
    $joinArgs4 = NULL; 
    $joinTbl5 = NULL; 
    $joinArgs5 = NULL; 
    $joinTbl6 = NULL; 
    $joinArgs6 = NULL; 
    $joinTbl7 = NULL; 
    $joinArgs7 = NULL; 
    $joinTbl8 = NULL; 
    $joinArgs8 = NULL; 
    $joinTbl9 = NULL; 
    $joinArgs9 = NULL; 
    $whereInCol = NULL; 
    $whereInArgs = NULL; 
    $whereArgs = NULL; 
    $whereLike = NULL; 
    $whereMonth = NULL; 
    $whereYear = NULL; 
    $column1 = NULL; 
    $groupBy = NULL; 
    $havingArgs = NULL;
    
    $table = 'logs';
    $column_order = array('log_id', 'log_name', 'log_clearance', 'log_action', 'created_date'); 
    $column_search = array('log_id', 'log_name', 'log_clearance', 'log_action', 'created_date'); 
    $order = array('log_id' => 'desc'); 
    $list = $this->Model_datatable->get_datatables($table, $select, $joinTbl1, $joinArgs1, $joinTbl2, $joinArgs2, $joinTbl3, $joinArgs3, $joinTbl4, $joinArgs4, $joinTbl5, $joinArgs5, $joinTbl6, $joinArgs6, $joinTbl7, $joinArgs7, $joinTbl8, $joinArgs8, $joinTbl9, $joinArgs9, $whereInCol, $whereInArgs, $whereArgs, $whereLike, $whereMonth, $whereYear, $column1, $groupBy, $column_order, $column_search, $order, $havingArgs);
    $data = array();
    $no = $this->input->post('start');
    foreach ($list as $logs) {
      $no++;
      $row = array();
      $row[] = $logs->log_id;
      $row[] = $logs->log_name;
      $row[] = $logs->log_clearance;
      if ($logs->log_clearance == 'Regional') {
        if ($logs->log_action == 'Deleted Grievance' || $logs->log_action == 'Deleted Duplicate Grievance') {
          $row[] = '<p class="p-0 m-0 text-danger">' .$logs->log_action . '</p><i onclick="delete_description(\''.$logs->log_description.'\')" class="btn-reason float-right fas fa-info-circle"></i>';
        } else {
          $row[] = '<p class="p-0 m-0 text-success">' .$logs->log_action . '</p>';
        }
      } else if ($logs->log_clearance == 'Super') {
        if ($logs->log_action == 'Deleted Grievance' || $logs->log_action == 'Deleted Duplicate Grievance') {
          $row[] = '<p class="p-0 m-0 text-danger">' .$logs->log_action . '</p><i onclick="delete_description(\''.$logs->log_description.'\')" class="btn-reason float-right fas fa-info-circle"></i>';
        } else {
          $row[] = '<p class="p-0 m-0 text-primary">' .$logs->log_action . '</p>';
        }
      } else {
        if ($logs->log_action == 'Deleted Grievance' || $logs->log_action == 'Deleted Duplicate Grievance') {
          $row[] = '<p class="p-0 m-0 text-danger">' .$logs->log_action . '</p><i onclick="delete_description(\''.$logs->log_description.'\')" class="btn-reason float-right fas fa-info-circle"></i>';
        } else {
          $row[] = $logs->log_action;
        }
      }
      $row[] = $logs->createdDate;

      $data[] = $row;
    }

    $output = array(
      "draw" => $this->input->post('draw'),
      "recordsTotal" => $this->Model_datatable->count_all($table),
      "recordsFiltered" => $this->Model_datatable->count_filtered($table, $select, $joinTbl1, $joinArgs1, $joinTbl2, $joinArgs2, $joinTbl3, $joinArgs3, $joinTbl4, $joinArgs4, $joinTbl5, $joinArgs5, $joinTbl6, $joinArgs6, $joinTbl7, $joinArgs7, $joinTbl8, $joinArgs8, $joinTbl9, $joinArgs9, $whereInCol, $whereInArgs, $whereArgs, $whereLike, $whereMonth, $whereYear, $column1, $groupBy, $column_order, $column_search, $order, $havingArgs),
      "data" => $data,
    );
    echo json_encode($output);
  }

  public function match_password() {
    $user = $this->session->userdata('user_id');
    $value = $this->input->post('value');
    $pass = md5($value);
    $query = $this->Model_user->query("SELECT password FROM user_info WHERE user_id = '$user' AND password = '$pass'")->num_rows();
    echo json_encode($query);
  }

  public function update_password() {
    $user = $this->session->userdata('user_id');
    $newPass = $this->input->post('newPass');
    $newPass = md5($newPass);
    $where = array('user_id' => $user);
    $data = array('password' => $newPass);
    $this->Model_user->update($data, $where);
  }

  public function fetch_category_count() {
    $results = $this->Model_category->query("SELECT category_id FROM category")->result();

    echo json_encode($results);
  }

  public function fetch_recent_messages() {
    $id = $this->session->userdata('user_id');
    $name = $this->input->get('search');

    $results = $this->Model_message->query("SELECT m.*, DATE_FORMAT(m.m_date, '%m-%d-%Y %h:%i %p') as 'msgDate',a.user_id as 'userID1' ,b.user_id as 'userID2', a.fullname as 'name1', b.fullname as 'name2', a.avatar as 'avatar1', b.avatar as 'avatar2', a.access as 'access1', b.access as 'access2' FROM message as m LEFT JOIN user_info as a ON m.m_from = a.user_id LEFT JOIN user_info as b ON m.m_to = b.user_id WHERE (a.fullname LIKE '%$name%' OR b.fullname LIKE '%$name%') AND m.m_id IN (SELECT max(m_id) as id FROM message WHERE (m_from = '$id' OR m_to = '$id') GROUP BY m_code) ORDER BY m.m_date DESC")->result();

    echo json_encode($results);
  }

  public function fetch_new_messages() {
    $id = $this->session->userdata('user_id');
    $name = $this->input->get('search');

    $results = $this->Model_message->query("SELECT * from user_info WHERE fullname LIKE '%$name%' AND request_status = 2")->result();

    echo json_encode($results);
  }

  public function fetch_convo() {
    $id = $this->session->userdata('user_id');
    $code = $this->input->get('code');

    $results = $this->Model_message->query("SELECT m.*, DATE_FORMAT(m.m_date, '%m-%d-%Y %h:%i %p') as 'msgDate', m.is_seen as 'seen', m.m_to as 'toUser', a.user_id as 'userID1' ,b.user_id as 'userID2', a.fullname as 'name1', b.fullname as 'name2', a.avatar as 'avatar1', b.avatar as 'avatar2' FROM message AS m LEFT JOIN user_info as a ON m.m_from = a.user_id LEFT JOIN user_info as b ON m.m_to = b.user_id WHERE m.m_code = '$code' ORDER BY m.m_date ASC")->result();

    $results1 = $this->Model_message->query("SELECT m.*, m.is_seen as 'seen', m.m_to as 'toUser', a.user_id as 'userID1' ,b.user_id as 'userID2', a.fullname as 'name1', b.fullname as 'name2', a.avatar as 'avatar1', b.avatar as 'avatar2' FROM message AS m LEFT JOIN user_info as a ON m.m_from = a.user_id LEFT JOIN user_info as b ON m.m_to = b.user_id WHERE m.m_code = '$code' AND m.is_seen = 0 ORDER BY m.m_date ASC")->result();

    foreach ($results1 as $key => $value) {
      if ($value->toUser == $id) {
        $data = array('is_seen' =>  1);
        $where = array('m_code' => $code, 'm_to' => $id);
        $this->Model_message->update($data, $where);      
      }
    }
    

    echo json_encode($results);
  }

  public function send_message() {

    $id = $this->session->userdata('user_id');
    $toID = $this->input->post('toId');
    $newMsg = $this->input->post('newMsg');

    $options = array(
      'cluster' => 'ap2',
      'useTLS' => true
    );
    $pusher = new Pusher\Pusher(
      '474122b4eeeae7308798',
      'c7c4607f8653bf6e1bb9',
      '896494',
      $options
    );

    
    $date = $this->Model_message->query("SELECT DATE_FORMAT(NOW(), '%Y-%m-%d %h:%i %p') as 'curDate', DATE_FORMAT(NOW(), '%m-%d-%Y %h:%i %p') as 'curDate2' FROM user_info LIMIT 1")->result();
    

    if ($toID == NULL) {

      $results = $this->Model_user->query("SELECT user_id FROM user_info WHERE user_id != '$id' AND request_status = 2")->result();

      foreach ($results as $key => $value) {

         $code = $this->Model_message->query("SELECT m_code FROM message WHERE (m_from = '$id' AND m_to = '$value->user_id') OR (m_from = '$value->user_id' AND m_to = '$id') LIMIT 1")->result();

        if ($code != NULL) {
          $code1 = $code[0]->m_code;
        } else {
          $code1 = md5($id + $value->user_id);
        }

        $message = array(
          'message' => $newMsg,
          'msg_from' => $id,
          'msg_to' => $value->user_id, 
          'code' => $code1,
          'date' => $date[0]->curDate2,
          'type' => 'multi'
        );

        $pusher->trigger('channel1', 'chat', $message);

        $data = array(
            'm_date' => $date[0]->curDate,
            'm_to' => $value->user_id,
            'm_from' => $id,
            'm_message' => $newMsg,
            'm_code' => $code1
           );

        $this->Model_message->insert($data);
      }

    } else {
      $code = $this->Model_message->query("SELECT m_code FROM message WHERE (m_from = '$id' AND m_to = '$toID') OR (m_from = '$toID' AND m_to = '$id') LIMIT 1")->result();

      if ($code != NULL) {
        $code1 = $code[0]->m_code;
      } else {
        $code1 = md5($id + $toID);
      }

      $message = array(
        'message' => $newMsg,
        'msg_from' => $id,
        'msg_to' => $toID, 
        'code' => $code1,
        'date' => $date[0]->curDate2,
        'type' => 'single'
      );

      $pusher->trigger('channel1', 'chat', $message);

      $data = array(
          'm_date' => $date[0]->curDate,
          'm_to' => $toID,
          'm_from' => $id,
          'm_message' => $newMsg,
          'm_code' => $code1
         );

      $this->Model_message->insert($data);

    }

    

  }

  public function seenState() {
    $code = $this->input->post('code');

    $data = array('is_seen' =>  1);
    $where = array('m_code' => $code);
    $this->Model_message->update($data, $where);
  }


  public function fetch_time() {
    $time = $this->Model_message->query("SELECT DATE_FORMAT(NOW(), '%m-%d-%Y %h:%i %p') as curDate FROM message")->row();

    echo json_encode($time);
  }

  public function fetch_notification() {
    $id = $this->session->userdata('user_id');
    $results = $this->Model_message->query("SELECT m.*,a.user_id as 'userID1' ,b.user_id as 'userID2', a.fullname as 'name1', b.fullname as 'name2', a.avatar as 'avatar1', b.avatar as 'avatar2', a.access as 'access1', b.access as 'access2' FROM message as m LEFT JOIN user_info as a ON m.m_from = a.user_id LEFT JOIN user_info as b ON m.m_to = b.user_id WHERE m.m_id IN (SELECT max(m_id) as id FROM message WHERE m.m_to = '$id' AND m.is_seen = 0 GROUP BY m_code) ORDER BY m.m_date DESC")->result();

    echo json_encode($results);
  }

  public function fetch_pending_requests() {
    $select = '*'; 
    $joinTbl1 = NULL;
    $joinArgs1 = NULL;
    $joinTbl2 = NULL; 
    $joinArgs2 = NULL; 
    $joinTbl3 = NULL;  
    $joinArgs3 = NULL; 
    $joinTbl4 = NULL; 
    $joinArgs4 = NULL; 
    $joinTbl5 = NULL; 
    $joinArgs5 = NULL; 
    $joinTbl6 = NULL; 
    $joinArgs6 = NULL; 
    $joinTbl7 = NULL; 
    $joinArgs7 = NULL; 
    $joinTbl8 = NULL; 
    $joinArgs8 = NULL; 
    $joinTbl9 = NULL; 
    $joinArgs9 = NULL; 
    $whereInCol = NULL; 
    $whereInArgs = NULL; 
    $whereArgs = array('access' => '', 'request_status' => 1); 
    $whereLike = NULL; 
    $whereMonth = NULL; 
    $whereYear = NULL; 
    $column1 = NULL; 
    $groupBy = NULL; 
    $havingArgs = NULL;
    
    $table = 'user_info';
    $column_order = array('user_id', 'fullname', 'email', 'contact'); 
    $column_search = array('user_id', 'fullname', 'email', 'contact'); 
    $order = array('user_id' => 'desc'); 
    $list = $this->Model_datatable->get_datatables($table, $select, $joinTbl1, $joinArgs1, $joinTbl2, $joinArgs2, $joinTbl3, $joinArgs3, $joinTbl4, $joinArgs4, $joinTbl5, $joinArgs5, $joinTbl6, $joinArgs6, $joinTbl7, $joinArgs7, $joinTbl8, $joinArgs8, $joinTbl9, $joinArgs9, $whereInCol, $whereInArgs, $whereArgs, $whereLike, $whereMonth, $whereYear, $column1, $groupBy, $column_order, $column_search, $order, $havingArgs);
    $data = array();
    $no = $this->input->post('start');
    foreach ($list as $user) {
      $no++;
      $row = array();
      $row[] = $user->user_id;
      $row[] = $user->fullname;
      $row[] = $user->email;
      $row[] = $user->contact;
      $row[] = '<div class="request-action-div d-block m-auto"><button onclick="confirm_request(' . $user->user_id . ')" class="request-btn-action btn btn-sm p-0 mr-1 ml-1"><i class="text-primary fas fa-user-check fa-fw"></i></button><button onclick="delete_request(' . $user->user_id . ')" class="request-btn-action btn btn-sm p-0 mr-1 ml-1"><i class="text-danger fas fa-user-times fa-fw"></i></button></div>';

      $data[] = $row;
    }

    $output = array(
      "draw" => $this->input->post('draw'),
      "recordsTotal" => $this->Model_datatable->count_all($table),
      "recordsFiltered" => $this->Model_datatable->count_filtered($table, $select, $joinTbl1, $joinArgs1, $joinTbl2, $joinArgs2, $joinTbl3, $joinArgs3, $joinTbl4, $joinArgs4, $joinTbl5, $joinArgs5, $joinTbl6, $joinArgs6, $joinTbl7, $joinArgs7, $joinTbl8, $joinArgs8, $joinTbl9, $joinArgs9, $whereInCol, $whereInArgs, $whereArgs, $whereLike, $whereMonth, $whereYear, $column1, $groupBy, $column_order, $column_search, $order, $havingArgs),
      "data" => $data,
    );
    echo json_encode($output);
  }

  public function confirm_request() {
    $id = $this->input->post('id');
    $value = $this->input->post('value');

    $data = array('access' => $value, 'request_status' => 2);
    $where = array('user_id' => $id);

    $this->Model_user->update($data, $where);
  }

  public function delete_request() {
    $id = $this->input->get('id');

    $data = array('access' => NULL, 'request_status' => 0 );
    $where = array('user_id' => $id);

    $this->Model_user->update($data, $where);
  }

  public function delete_all_messages() {
    $this->Model_message->query("DELETE FROM message");
  }

  public function delete_all_logs() {
    $this->Model_logs->query("DELETE FROM logs");
  }

  public function fetch_user_overide() {
    $id = $this->session->userdata('user_id');
    $results = $this->Model_user->query("SELECT user_id, fullname FROM user_info WHERE overide_status=0 AND request_status=2 AND user_id != '$id'")->result();

    echo json_encode($results);
  }

  public function update_overide_user() {
    $id = $this->input->post('userID');
    $val = $this->input->post('value');

    $data = array('overide_status' => $val);
    $where = array('user_id' => $id);

    $this->Model_user->update($data, $where);
  }

  public function fetch_overide_users() {
    $select = 'user_id, fullname, access'; 
    $joinTbl1 = NULL;
    $joinArgs1 = NULL;
    $joinTbl2 = NULL; 
    $joinArgs2 = NULL; 
    $joinTbl3 = NULL;  
    $joinArgs3 = NULL; 
    $joinTbl4 = NULL; 
    $joinArgs4 = NULL; 
    $joinTbl5 = NULL; 
    $joinArgs5 = NULL; 
    $joinTbl6 = NULL; 
    $joinArgs6 = NULL; 
    $joinTbl7 = NULL; 
    $joinArgs7 = NULL; 
    $joinTbl8 = NULL; 
    $joinArgs8 = NULL; 
    $joinTbl9 = NULL; 
    $joinArgs9 = NULL; 
    $whereInCol = NULL; 
    $whereInArgs = NULL; 
    $whereArgs = array('request_status' => 2, 'overide_status' => 1); 
    $whereLike = NULL; 
    $whereMonth = NULL; 
    $whereYear = NULL; 
    $column1 = NULL; 
    $groupBy = NULL; 
    $havingArgs = NULL;
    
    $table = 'user_info';
    $column_order = array('user_id', 'fullname', 'access'); 
    $column_search = array('user_id', 'fullname', 'access'); 
    $order = array('user_id' => 'desc'); 
    $list = $this->Model_datatable->get_datatables($table, $select, $joinTbl1, $joinArgs1, $joinTbl2, $joinArgs2, $joinTbl3, $joinArgs3, $joinTbl4, $joinArgs4, $joinTbl5, $joinArgs5, $joinTbl6, $joinArgs6, $joinTbl7, $joinArgs7, $joinTbl8, $joinArgs8, $joinTbl9, $joinArgs9, $whereInCol, $whereInArgs, $whereArgs, $whereLike, $whereMonth, $whereYear, $column1, $groupBy, $column_order, $column_search, $order, $havingArgs);
    $data = array();
    $no = $this->input->post('start');
    foreach ($list as $user) {
      $no++;
      $row = array();
      $row[] = $user->user_id;
      $row[] = $user->fullname;
      $row[] = $user->access;
      $row[] = '<button onclick="remove_overide(\'' . $user->fullname . '\', ' . $user->user_id . ')" class="m-auto d-block btn btn-sm btn-danger pt-0 pb-0"><i class="fas fa-times"></i></button>';

      $data[] = $row;
    }

    $output = array(
      "draw" => $this->input->post('draw'),
      "recordsTotal" => $this->Model_datatable->count_all($table),
      "recordsFiltered" => $this->Model_datatable->count_filtered($table, $select, $joinTbl1, $joinArgs1, $joinTbl2, $joinArgs2, $joinTbl3, $joinArgs3, $joinTbl4, $joinArgs4, $joinTbl5, $joinArgs5, $joinTbl6, $joinArgs6, $joinTbl7, $joinArgs7, $joinTbl8, $joinArgs8, $joinTbl9, $joinArgs9, $whereInCol, $whereInArgs, $whereArgs, $whereLike, $whereMonth, $whereYear, $column1, $groupBy, $column_order, $column_search, $order, $havingArgs),
      "data" => $data,
    );
    echo json_encode($output);
  }

  public function fetch_user_img3() {
    $id = $this->session->userdata('user_id');
    $results = $this->Model_user->query("SELECT avatar FROM user_info WHERE request_status = 2 AND user_id != $id LIMIT 3")->result();

    echo json_encode($results);
  }

  public function fetch_active_users_count() {
    $id = $this->session->userdata('user_id');
    $result = $this->Model_user->query("SELECT COUNT(*) as countUsers FROM user_info WHERE request_status = 2 AND user_id != $id")->row();

    echo json_encode($result);
  }

}
?>
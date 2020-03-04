<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Logs extends CI_Controller{

  public function __construct() {
    parent::__construct();
    $this->load->model('Model_logs');
    $this->load->model('Model_datatable');
    $this->load->library('session');
  }

  public function insert_logs() {
    $id = $this->session->userdata('user_id');
    $name = $this->session->userdata('fullname');
    $access = $this->session->userdata('access');
    $action = $this->input->post('action');
    $description = $this->input->post('description');

    $data = array(
      'log_user_id' => $id,
      'log_name' => $name,
      'log_clearance' => $access,
      'log_action' => $action,
      'log_description' => $description
    );

    $result = $this->Model_logs->insert($data);
  }

  public function fetch_logs_table() {
    $table = 'logs';
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
    $havingArgs = NULL;
    $column_order = array('log_id', 'log_name', 'log_clearance', 'log_action', 'created_date');
    $column_search = array('log_id', 'log_name', 'log_clearance', 'log_action', 'created_date');
    $order = array('log_id' => 'asc');
    $column1 = NULL;
    $whereMonth = array('');
    $whereYear = array('');
    $groupBy = NULL;

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
          $row[] = '<div class="d-flex"><p class="p-0 m-0 text-danger">' .$logs->log_action . '</p><i onclick="delete_description(\''.$logs->log_description.'\')" class="btn-reason float-right fas fa-info-circle ml-auto"></i></div>';
        } else {
          $row[] = '<p class="p-0 m-0 text-success">' .$logs->log_action . '</p>';
        }
      } else if ($logs->log_clearance == 'Super') {
        if ($logs->log_action == 'Deleted Grievance' || $logs->log_action == 'Deleted Duplicate Grievance') {
          $row[] = '<div class="d-flex"><p class="p-0 m-0 text-danger">' .$logs->log_action . '</p><i onclick="delete_description(\''.$logs->log_description.'\')" class="btn-reason float-right fas fa-info-circle ml-auto"></i></div>';
        } else {
          $row[] = '<p class="p-0 m-0 text-primary">' .$logs->log_action . '</p>';
        }
      } else {
        if ($logs->log_action == 'Deleted Grievance' || $logs->log_action == 'Deleted Duplicate Grievance') {
          $row[] = '<div class="d-flex"><p class="p-0 m-0 text-primary">' .$logs->log_action . '</p><i onclick="delete_description(\''.$logs->log_description.'\')" class="btn-reason float-right fas fa-info-circle ml-auto"></i></div>';
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

  public function delete_logs() {
    $this->Model_logs->query("DELETE FROM logs WHERE DATE_FORMAT((created_date + INTERVAL 1 MONTH), '%Y-%m-%d') = DATE_FORMAT(NOW(), '%Y-%m-%d')");
  }

}
?>

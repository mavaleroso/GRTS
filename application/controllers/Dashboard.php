<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Dashboard extends CI_Controller{

  public function __construct() {
    parent::__construct();
    $this->load->model('Model_grievance');
  }

  public function fetch_grantee_count() {
    $result = $this->Model_grievance->query("SELECT COUNT(*) as 'countAll' FROM grantee_list")->row();

    echo json_encode($result);
  }

  public function fetch_provinces() {
    $result = $this->Model_grievance->query("SELECT g_province, Count(g_province) as 'countResult', Sum(g_status = 'Ongoing') as 'sumOngoing', Sum(g_status = 'Resolved') as 'sumResolved' FROM grievance WHERE YEAR(g_date_intake) = YEAR(NOW()) AND g_status IN ('Ongoing', 'Resolved') GROUP BY g_province")->result();

    echo json_encode($result);
  }

  public function fetch_categories() {
    $result = $this->Model_grievance->query("SELECT *, Count(g_category) as 'countResult', Sum(g_status = 'Ongoing') as 'sumOngoing', Sum(g_status = 'Resolved') as 'sumResolved' FROM grievance LEFT JOIN category on grievance.g_category = category.category_id WHERE YEAR(grievance.g_date_intake) = YEAR(NOW()) AND g_status IN ('Ongoing', 'Resolved') GROUP BY grievance.g_category")->result();

    echo json_encode($result);
  }

  public function fetch_modes() {
    $result = $this->Model_grievance->query("SELECT *, Count(g_mode) as 'countModes' FROM grievance WHERE YEAR(g_date_intake) = YEAR(NOW()) AND g_status IN ('Ongoing', 'Resolved') GROUP BY g_mode")->result();

    echo json_encode($result);
  }

  public function fetch_status() {
    $result = $this->Model_grievance->query("SELECT *, Count(g_status) as 'countStatus' FROM grievance WHERE YEAR(g_date_intake) = YEAR(NOW()) GROUP BY g_status ORDER BY g_status DESC")->result();

    echo json_encode($result);
  }

}
?>

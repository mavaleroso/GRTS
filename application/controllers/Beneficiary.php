<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Beneficiary extends CI_Controller{

  public function __construct() {
    parent::__construct();
    $this->load->model('Model_beneficiary');
    $this->load->model('Model_datatable');
  }

  public function fetch_grantee_info() {
    $grant_id = $this->input->get('id');
    $result = $this->Model_beneficiary->query("SELECT * FROM grantee_list WHERE grant_id = '$grant_id'")->result();
    echo json_encode($result);
  }

  public function fetch_beneficiary_table() {
    $prov = $this->input->post('province');
    $mun = $this->input->post('muncipality');
    $brgy = $this->input->post('barangay');

    $table = 'grantee_list';
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
    $whereInCol= NULL;
    $whereInArgs=NULL;
    if ($prov != NULL || $mun != NULL || $brgy != NULL) {
      if ($prov!= NULL && $mun == NULL && $brgy == NULL) {
        $whereArgs = array(
          'grant_province' => $prov,
        );
      } else if ($prov != NULL && $mun != NULL && $brgy == NULL) {
        $whereArgs = array(
          'grant_province' => $prov,
          'grant_muncipality' => $mun
        );
      } else if ($prov != NULL && $mun != NULL && $brgy != NULL) {
         $whereArgs = array(
          'grant_province' => $prov,
          'grant_muncipality' => $mun,
          'grant_barangay' => $brgy
         );
      }
      
    } else {
      $whereArgs = NULL;
    }
    $whereLike = NULL;
    $column_order = array('grant_id', 'grant_member', 'grant_lastname','grant_firstname','grant_middlename','grant_age','grant_sex','grant_purok', 'grant_barangay', 'grant_muncipality', 'grant_province', 'grant_region'); 
    $column_search = array('grant_id', 'grant_member', 'grant_lastname','grant_firstname','grant_middlename','grant_age','grant_sex','grant_purok', 'grant_barangay', 'grant_muncipality', 'grant_province', 'grant_region'); 
    $order = array('grant_id' => 'asc'); 

    $column1 = NULL;
    $whereMonth = array('');
    $whereYear = array('');

    $groupBy = NULL;
    $havingArgs = NULL;

    $list = $this->Model_datatable->get_datatables($table, $select, $joinTbl1, $joinArgs1, $joinTbl2, $joinArgs2, $joinTbl3, $joinArgs3, $joinTbl4, $joinArgs4, $joinTbl5, $joinArgs5, $joinTbl6, $joinArgs6, $joinTbl7, $joinArgs7, $joinTbl8, $joinArgs8, $joinTbl9, $joinArgs9, $whereInCol, $whereInArgs, $whereArgs, $whereLike, $whereMonth, $whereYear, $column1, $groupBy, $column_order, $column_search, $order, $havingArgs);
    $data = array();
    $no = $this->input->post('start');
    foreach ($list as $grant) {
      $no++;
      $row = array();
      $row[] = ucfirst(strtolower($grant->grant_id));
      $row[] = ucfirst(strtolower($grant->grant_member));
      $row[] = ucfirst(strtolower($grant->grant_lastname));
      $row[] = ucfirst(strtolower($grant->grant_firstname));
      $row[] = ucfirst(strtolower($grant->grant_middlename));
      $row[] = ucfirst(strtolower($grant->grant_age));
      $row[] = ucfirst(strtolower($grant->grant_sex));
      $row[] = ucfirst(strtolower($grant->grant_barangay)) . ', ' . ucfirst(strtolower($grant->grant_muncipality)) . ', ' . ucfirst(strtolower($grant->grant_province)) . ', ' . ucfirst(strtolower($grant->grant_region));
      $row[] = '<i class="fas fa-eye action-edit" onclick="view_beneficiary(' . $grant->grant_id . ')"></i>';

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

  public function fetch_muncipality() {
    $prov = $this->input->get('prov');
    $data = $this->Model_beneficiary->query("SELECT PSGC_CITY, CITY_NAME FROM lib_cities INNER JOIN lib_provinces on lib_provinces.PROVINCE_ID = lib_cities.PROVINCE_ID WHERE lib_provinces.PSGC_PROVINCE = '$prov'")->result();

    echo json_encode($data);
  }

  public function fetch_brgy() {
    $mun = $this->input->get('mun');
    $data = $this->Model_beneficiary->query("SELECT BRGY_NAME FROM lib_brgy INNER JOIN lib_cities on lib_cities.CITY_ID = lib_brgy.CITY_ID WHERE lib_cities.PSGC_CITY = '$mun'")->result();

    echo json_encode($data);
  }

}
?>

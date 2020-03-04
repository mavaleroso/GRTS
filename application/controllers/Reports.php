<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Reports extends CI_Controller{
  public function __construct() {
    parent::__construct();
    $this->load->model('Model_reports');
    $this->load->model('Model_datatable');
  }

  // public function fetch_reports_info() {
  // 	$id = $this->input->get('id');
  //   $result = $this->Model_reports->query("SELECT * FROM reports WHERE rep_id = $id")->result();

  //   echo json_encode($result);
  // }

  public function fetch_reports_table() {
  	$tbl = $this->input->post('tbl');
  	$startMonth = $this->input->post('fromMonth');
  	$endMonth = $this->input->post('toMonth');
  	$onYear = $this->input->post('year');

    $table = 'grievance AS g';
    $select = "*, concat(a.root_code, ': ', a.root_description) as aRoot, concat(b.root_code, ': ', b.root_description) as bRoot, concat(c.root_code, ': ', c.root_description) as cRoot, concat(d.root_code, ': ', d.root_description) as dRoot, concat(e.root_code, ': ', e.root_description) as eRoot, concat(f.root_code, ': ', f.root_description) as fRoot, concat(h.root_code, ': ', h.root_description) as rcaRoot, date_format(g.g_date_intake, '%m-%d-%Y') as dateI, date_format(g.g_date_last_action_taken, '%m-%d-%Y') as dateLAT, date_format(g.g_date_encode, '%m-%d-%Y') as dateE, date_format(g.g_date_resolve, '%m-%d-%Y') as dateR";
    $joinTbl1 = 'category';
    $joinArgs1 = 'category.category_id = g.g_category';
    $joinTbl2 = 'sub_category';
    $joinArgs2 = 'sub_category.sub_category_id = g.g_sub_category';
    $joinTbl3 = 'root_cause as a';
    $joinArgs3 = 'a.root_id = g.g_p1';
    $joinTbl4 = 'root_cause as b';
    $joinArgs4 = 'b.root_id = g.g_p2';
    $joinTbl5 = 'root_cause as c';
    $joinArgs5 = 'c.root_id = g.g_p3';
    $joinTbl6 = 'root_cause as d';
    $joinArgs6 = 'd.root_id = g.g_p4';
    $joinTbl7 = 'root_cause as e';
    $joinArgs7 = 'e.root_id = g.g_p5';
    $joinTbl8 = 'root_cause as f';
    $joinArgs8 = 'f.root_id = g.g_p6';
    $joinTbl9 = 'root_cause as h';
    $joinArgs9 = 'h.root_id = g.g_rca';
    $whereInCol = 'g_status';
    $whereInArgs = array('Ongoing', 'Resolved');
    $whereArgs = NULL;
    $whereLike = NULL;
    $havingArgs = NULL;
    $column1 = 'g_date_intake';
    $whereMonth = array('');
    $whereYear = array('');
    $groupBy = NULL;
    if ($tbl == 'resolved') {
    	$whereInCol = 'g_status';
    	$whereInArgs = array('Resolved');
    }
    foreach (range($startMonth, $endMonth) as $number) {
    	array_push($whereMonth,$number);
	}

    array_push($whereYear, $onYear);

    $column_order = array('g_tracking_no', 'g_hh_id', 'g_fullname', 'g_sex', 'g_region', 'g_province', 'g_city_muncipality', 'g_barangay', 'g_subj_complaint', 'g_gbv_sex', 'g_gbv_age', 'g_mode', 'g_category', 'g_sub_category', 'g_description', 'g_resolution', 'g_date_intake', 'g_date_last_action_taken', 'g_date_encode', 'g_assist_by', 'g_date_resolve', 'g_status', 'g_rca', 'g_p1', 'g_p2', 'g_p3', 'g_p4', 'g_p5', 'g_p6', 'g_retro_yn', 'g_retro_transNo', 'g_no_child', 'g_name_child1', 'g_name_child2', 'g_name_child3', 'g_ip_affiliation', 'g_resolve_days', 'g_timeline', 'g_result', 'g_remarks'); 

    $column_search = array('g_tracking_no', 'g_hh_id', 'g_fullname', 'g_sex', 'g_region', 'g_province', 'g_city_muncipality', 'g_barangay', 'g_subj_complaint', 'g_gbv_sex', 'g_gbv_age', 'g_mode', 'g_category', 'g_sub_category', 'g_description', 'g_resolution', 'g_date_intake', 'g_date_last_action_taken', 'g_date_encode', 'g_assist_by', 'g_date_resolve', 'g_status', 'g_rca', 'g_p1', 'g_p2', 'g_p3', 'g_p4', 'g_p5', 'g_p6', 'g_retro_yn', 'g_retro_transNo', 'g_no_child', 'g_name_child1', 'g_name_child2', 'g_name_child3', 'g_ip_affiliation', 'g_resolve_days', 'g_timeline', 'g_result', 'g_remarks'); 
    
    $order = array('g_id' => 'desc'); 


    $list = $this->Model_datatable->get_datatables($table, $select, $joinTbl1, $joinArgs1, $joinTbl2, $joinArgs2, $joinTbl3, $joinArgs3, $joinTbl4, $joinArgs4, $joinTbl5, $joinArgs5, $joinTbl6, $joinArgs6, $joinTbl7, $joinArgs7, $joinTbl8, $joinArgs8, $joinTbl9, $joinArgs9, $whereInCol, $whereInArgs, $whereArgs, $whereLike, $whereMonth, $whereYear, $column1, $groupBy, $column_order, $column_search, $order, $havingArgs);
    $data = array();
    $no = $this->input->post('start');
    foreach ($list as $report) {
		$no++;
		$row = array();
		$row[] = $report->g_tracking_no;
		$row[] = $report->g_hh_id;
		$row[] = ucwords(strtolower($report->g_fullname));
		$row[] = $report->g_sex;
		$row[] = $report->g_region;
		$row[] = $report->g_province;
		$row[] = $report->g_city_muncipality;
		$row[] = $report->g_barangay;
		$row[] = $report->g_subj_complaint;
		$row[] = $report->g_gbv_sex;
        if ($report->g_gbv_age == 0) {
           $row[] = '';
        } else {
           $row[] = $report->g_gbv_age;
        }
		$row[] = $report->g_mode;
		$row[] = $report->category_name;
		$row[] = $report->sub_category_name;
		$row[] = $report->g_description;
		$row[] = $report->g_resolution;
		$row[] = $report->dateI;
		$row[] = $report->dateE;
        $row[] = $report->dateLAT;
		if ($report->g_date_resolve == '0000-00-00') {
            $row[] = '';
        } else {
            $row[] = $report->dateR;
        }
        $row[] = $report->g_assist_by;
		$row[] = $report->g_status;
		if ($tbl == 'resolved') {
      		if ($report->g_resolve_days == 0) {
                $row[] = '';
            } else {
                $row[] = $report->g_resolve_days;
            }
            
            if ($report->g_timeline == 0) {
                $row[] = '';
            } else {
                $row[] = $report->g_timeline;
            }
            
            if ($report->g_result == 0) {
                $row[] = '';
            } else {
                $row[] = $report->g_result;
            }	       
            $row[] = $report->g_remarks;
		}
		$row[] = $report->rcaRoot;
		$row[] = $report->aRoot;
		$row[] = $report->bRoot;
		$row[] = $report->cRoot;
		$row[] = $report->dRoot;
		$row[] = $report->eRoot;
		$row[] = $report->fRoot;
		$row[] = $report->g_retro_yn;
		$row[] = $report->g_retro_transNo;
		$row[] = $report->g_no_child;
		$row[] = ucwords(strtolower($report->g_name_child1));
		$row[] = ucwords(strtolower($report->g_name_child2));
		$row[] = ucwords(strtolower($report->g_name_child3));
		$row[] = ucfirst(strtolower($report->g_ip_affiliation));

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


  public function fetch_reports_table_all() {
    $prov = $this->input->post('province');
    $mun = $this->input->post('muncipality');
    $brgy = $this->input->post('barangay');
    $year = $this->input->post('year');

    $table = 'grievance AS g';
    $select = "*, concat(a.root_code, ': ', a.root_description) as aRoot, concat(b.root_code, ': ', b.root_description) as bRoot, concat(c.root_code, ': ', c.root_description) as cRoot, concat(d.root_code, ': ', d.root_description) as dRoot, concat(e.root_code, ': ', e.root_description) as eRoot, concat(f.root_code, ': ', f.root_description) as fRoot, concat(h.root_code, ': ', h.root_description) as rcaRoot, date_format(g.g_date_intake, '%m-%d-%Y') as dateI, date_format(g.g_date_last_action_taken, '%m-%d-%Y') as dateLAT, date_format(g.g_date_encode, '%m-%d-%Y') as dateE, date_format(g.g_date_resolve, '%m-%d-%Y') as dateR";
    $joinTbl1 = 'category';
    $joinArgs1 = 'category.category_id = g.g_category';
    $joinTbl2 = 'sub_category';
    $joinArgs2 = 'sub_category.sub_category_id = g.g_sub_category';
    $joinTbl3 = 'root_cause as a';
    $joinArgs3 = 'a.root_id = g.g_p1';
    $joinTbl4 = 'root_cause as b';
    $joinArgs4 = 'b.root_id = g.g_p2';
    $joinTbl5 = 'root_cause as c';
    $joinArgs5 = 'c.root_id = g.g_p3';
    $joinTbl6 = 'root_cause as d';
    $joinArgs6 = 'd.root_id = g.g_p4';
    $joinTbl7 = 'root_cause as e';
    $joinArgs7 = 'e.root_id = g.g_p5';
    $joinTbl8 = 'root_cause as f';
    $joinArgs8 = 'f.root_id = g.g_p6';
    $joinTbl9 = 'root_cause as h';
    $joinArgs9 = 'h.root_id = g.g_rca';
    $whereInCol = 'g_status';
    $whereInArgs = array('Resolved', 'Ongoing');
    if ($prov != NULL || $mun != NULL || $brgy != NULL) {
      if ($prov!= NULL && $mun == NULL && $brgy == NULL) {
        $whereArgs = array(
          'g_province' => $prov,
        );
      } else if ($prov != NULL && $mun != NULL && $brgy == NULL) {
        $whereArgs = array(
          'g_province' => $prov,
          'g_city_muncipality' => $mun
        );
      } else if ($prov != NULL && $mun != NULL && $brgy != NULL) {
         $whereArgs = array(
          'g_province' => $prov,
          'g_city_muncipality' => $mun,
          'g_barangay' => $brgy
         );
      }
      
    } else {
      $whereArgs = NULL;
    }
    if ($year != NULL) {
        $whereLike = array('g_date_intake' => $year);
    } else {
        $whereLike = NULL;
    }
    $groupBy = NULL;
    $column1 = NULL;
    $havingArgs = NULL;
    $whereMonth = NULL;
    $whereYear = NULL;

    $column_order = array('g_id', 'g_tracking_no', 'g_hh_id', 'g_fullname', 'g_sex', 'g_region', 'g_province', 'g_city_muncipality', 'g_barangay', 'g_subj_complaint', 'g_gbv_sex', 'g_gbv_age', 'g_mode', 'category_name', 'sub_category_name', 'g_description', 'g_resolution', 'g_date_intake', 'g_date_last_action_taken', 'g_date_encode', 'g_date_resolve', 'g_assist_by', 'g_status', 'g_resolve_days', 'g_timeline', 'g_result', 'g_remarks', 'g_rca', 'g_p1', 'g_p2', 'g_p3', 'g_p4', 'g_p5', 'g_p6', 'g_retro_yn', 'g_retro_transNo', 'g_no_child', 'g_name_child1', 'g_name_child2', 'g_name_child3', 'g_ip_affiliation'); 

    $column_search = array('g_id', 'g_tracking_no', 'g_hh_id', 'g_fullname', 'g_sex', 'g_region', 'g_province', 'g_city_muncipality', 'g_barangay', 'g_subj_complaint', 'g_gbv_sex', 'g_gbv_age', 'g_mode', 'category_name', 'sub_category_name', 'g_description', 'g_resolution', 'g_date_intake', 'g_date_last_action_taken', 'g_date_encode', 'g_date_resolve', 'g_assist_by', 'g_status', 'g_resolve_days', 'g_timeline', 'g_result', 'g_remarks', 'g_rca', 'g_p1', 'g_p2', 'g_p3', 'g_p4', 'g_p5', 'g_p6', 'g_retro_yn', 'g_retro_transNo', 'g_no_child', 'g_name_child1', 'g_name_child2', 'g_name_child3', 'g_ip_affiliation'); 

    $order = array('g_id' => 'desc'); 


    $list = $this->Model_datatable->get_datatables($table, $select, $joinTbl1, $joinArgs1, $joinTbl2, $joinArgs2, $joinTbl3, $joinArgs3, $joinTbl4, $joinArgs4, $joinTbl5, $joinArgs5, $joinTbl6, $joinArgs6, $joinTbl7, $joinArgs7, $joinTbl8, $joinArgs8, $joinTbl9, $joinArgs9, $whereInCol, $whereInArgs, $whereArgs, $whereLike, $whereMonth, $whereYear, $column1, $groupBy, $column_order, $column_search, $order, $havingArgs);
    $data = array();
    $no = $this->input->post('start');
    foreach ($list as $report) {
      $no++;
      $row = array();
      $row[] = $report->g_id;
      $row[] = $report->g_tracking_no;
      $row[] = $report->g_hh_id;
      $row[] = ucwords(strtolower($report->g_fullname));
      $row[] = $report->g_sex;
      $row[] = $report->g_region;
      $row[] = $report->g_province;
      $row[] = $report->g_city_muncipality;
      $row[] = $report->g_barangay;
      $row[] = $report->g_subj_complaint;
      $row[] = $report->g_gbv_sex;
      if ($report->g_gbv_age == 0) {
            $row[] = NULL;
          } else {
            $row[] = $report->g_gbv_age;
          }
      $row[] = $report->g_mode;
      $row[] = $report->category_name;
      $row[] = $report->sub_category_name;
      $row[] = $report->g_description;
      $row[] = $report->g_resolution;
      $row[] = $report->dateI;
      $row[] = $report->dateE;
      $row[] = $report->dateLAT;
      if ($report->g_date_resolve == '0000-00-00') {
          $row[] = NULL;
      } else {
          $row[] = $report->dateR;
      }
      $row[] = $report->g_assist_by;
      $row[] = $report->g_status;
      if ($report->g_resolve_days == 0) {
          $row[] = NULL;
      } else {
          $row[] = $report->g_resolve_days;
      }
      
      if ($report->g_timeline == 0) {
          $row[] = NULL;
      } else {
          $row[] = $report->g_timeline;
      }
      
      if ($report->g_result == 0) {
          $row[] = NULL;
      } else {
          $row[] = $report->g_result;
      }
      $row[] = $report->g_remarks;
      $row[] = $report->rcaRoot;
      $row[] = $report->aRoot;
      $row[] = $report->bRoot;
      $row[] = $report->cRoot;
      $row[] = $report->dRoot;
      $row[] = $report->eRoot;
      $row[] = $report->fRoot;
      $row[] = $report->g_retro_yn;
      $row[] = $report->g_retro_transNo;
      $row[] = $report->g_no_child;
      $row[] = ucwords(strtolower($report->g_name_child1));
      $row[] = ucwords(strtolower($report->g_name_child2));
      $row[] = ucwords(strtolower($report->g_name_child3));
      $row[] = ucwords(strtolower($report->g_ip_affiliation));
      $row[] = '<button onclick="view_all_data(' . $report->g_id . ')" class="pt-0 pb-0 btn btn-sm m-auto d-block"><i class="pt-0 pb-0 mb-0 fas fa-eye"></i></button>';

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

  public function fetch_reports_table_category() {
	$startMonth = $this->input->post('fromMonth');
  	$endMonth = $this->input->post('toMonth');
  	$onYear = $this->input->post('year');

    $table = 'grievance AS g';
    $select = "*, , SUM(g_province = 'AGUSAN DEL NORTE') as 'ADN', SUM(g_province = 'AGUSAN DEL SUR') as 'ADS', SUM(g_province = 'DINAGAT ISLAND') as 'DI', SUM(g_province = 'SURIGAO DEL NORTE') as 'SDN', SUM(g_province = 'SURIGAO DEL SUR') as 'SDS', COUNT(*) as 'total'";
    $joinTbl1 = 'category';
    $joinArgs1 = 'category.category_id = g.g_category';
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
    $havingArgs = NULL;
    $column1 = 'g_date_intake';
    $whereMonth = array('');
    $whereYear = array('');
    $whereInCol = 'g_status';
    $whereInArgs = array('Resolved');
    $whereArgs = NULL;
    $whereLike = NULL;
    $groupBy = 'g_category';

    foreach (range($startMonth, $endMonth) as $number) {
    	array_push($whereMonth,$number);
	}

    array_push($whereYear, $onYear);

    $column_order = array('category_name', 'ADN', 'ADS', 'DI', 'SDN', 'SDS', 'total'); 

    $column_search = array(''); 

    $order = array('g_id' => 'desc'); 


    $list = $this->Model_datatable->get_datatables($table, $select, $joinTbl1, $joinArgs1, $joinTbl2, $joinArgs2, $joinTbl3, $joinArgs3, $joinTbl4, $joinArgs4, $joinTbl5, $joinArgs5, $joinTbl6, $joinArgs6, $joinTbl7, $joinArgs7, $joinTbl8, $joinArgs8, $joinTbl9, $joinArgs9, $whereInCol, $whereInArgs, $whereArgs, $whereLike, $whereMonth, $whereYear, $column1, $groupBy, $column_order, $column_search, $order, $havingArgs);
    $data = array();
    $no = $this->input->post('start');
    foreach ($list as $category) {
		$no++;
		$row = array();
		$row[] = $category->category_name;
		$row[] = $category->ADN;
		$row[] = $category->ADS;
		$row[] = $category->DI;
		$row[] = $category->SDN;
		$row[] = $category->SDS;
		$row[] = $category->total;

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

  public function fetch_reports_table_province() {
  	$startMonth = $this->input->post('fromMonth');
  	$endMonth = $this->input->post('toMonth');
  	$onYear = $this->input->post('year');

    $table = 'grievance';
    $select = "*, COUNT(*) as 'Total', SUM(g_remarks = 'Beyond') as 'Beyond' , SUM(g_remarks = 'Within') as 'Within'";
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
    $havingArgs = NULL;
    $column1 = 'g_date_intake';
    $whereMonth = array('');
    $whereYear = array('');
    $whereInCol = 'g_status';
    $whereInArgs = 'Resolved';
    $whereArgs = NULL;
    $whereLike = NULL;
    $groupBy = 'g_province';

    foreach (range($startMonth, $endMonth) as $number) {
    	array_push($whereMonth,$number);
	}

    array_push($whereYear, $onYear);

    $column_order = array('g_province', 'Beyond', 'Within', 'Total', null); 

    $column_search = array(''); 

    $order = array('g_id' => 'desc'); 


    $list = $this->Model_datatable->get_datatables($table, $select, $joinTbl1, $joinArgs1, $joinTbl2, $joinArgs2, $joinTbl3, $joinArgs3, $joinTbl4, $joinArgs4, $joinTbl5, $joinArgs5, $joinTbl6, $joinArgs6, $joinTbl7, $joinArgs7, $joinTbl8, $joinArgs8, $joinTbl9, $joinArgs9, $whereInCol, $whereInArgs, $whereArgs, $whereLike, $whereMonth, $whereYear, $column1, $groupBy, $column_order, $column_search, $order, $havingArgs);
    $data = array();
    $no = $this->input->post('start');
    foreach ($list as $province) {
		$no++;
		$row = array();
		$row[] = $province->g_province;
		$row[] = $province->Beyond;
		$row[] = $province->Within;
		$row[] = $province->Total;
		$row[] = round($province->Within / ($province->Total / 100), 2);

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
    $data = $this->Model_reports->query("SELECT PSGC_CITY, CITY_NAME FROM lib_cities INNER JOIN lib_provinces on lib_provinces.PROVINCE_ID = lib_cities.PROVINCE_ID WHERE lib_provinces.PSGC_PROVINCE = '$prov'")->result();

    echo json_encode($data);
  }

  public function fetch_brgy() {
    $mun = $this->input->get('mun');
    $data = $this->Model_reports->query("SELECT BRGY_NAME FROM lib_brgy INNER JOIN lib_cities on lib_cities.CITY_ID = lib_brgy.CITY_ID WHERE lib_cities.PSGC_CITY = '$mun'")->result();

    echo json_encode($data);
  }

}

?>
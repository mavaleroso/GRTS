<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Grievance extends CI_Controller{

  public function __construct() {
    parent::__construct();
    $this->load->model('Model_grievance');
    $this->load->model('Model_beneficiary');
    $this->load->model('Model_root');
    $this->load->model('Model_reports');
    $this->load->model('Model_category');
    $this->load->model('Model_sub_category');
    $this->load->model('Model_lib_brgy');
    $this->load->model('Model_lib_cities');
    $this->load->model('Model_lib_provinces');
    $this->load->model('Model_lib_regions');
    $this->load->model('Model_datatable');
    $this->load->model('Model_holidays');
    $this->load->model('Model_upload');
  }

  public function currentDate() {
    $this->Model_grievance->query("SELECT MONTH() as curMonth, YEAR() as curYear FROM grievance")->row();
  }

  public function insert_grievance() {
    $fullname = $this->input->post('fname') . ' ' . $mname = $this->input->post('mname') . ' ' . $lname = $this->input->post('lname');
    $category = $this->input->post('category');
    $subCategory = $this->input->post('sub_category');
    $dIntake = date('Y', strtotime($this->input->post('date_filed')));
    $type = $this->input->post('catType');

    if ($this->Model_grievance->query("SELECT * FROM grievance WHERE g_fullname = '$fullname' AND g_category = '$category' AND g_sub_category = '$subCategory' AND g_status = 'Ongoing' AND g_date_intake LIKE '%$dIntake%'")->row()) {
        $stats = 1;
    } else {
        $p1 = $this->input->post('p1');
        $p2 = $this->input->post('p2');
        $p3 = $this->input->post('p3');
        $p4 = $this->input->post('p4');
        $p5 = $this->input->post('p5');
        $p6 = $this->input->post('p6');

        $stats = 0;
        $randomNum = substr(str_shuffle("0123456789"), 0, 5);
        $date = $this->get_datetime();
        $tracking_no = date('Y-m-d', strtotime($date)) . '-' . $randomNum;
        if ($type == 1) {
          $data = array(
            'g_tracking_no' => $tracking_no,
            'g_beneficiary_id' => $this->input->post('ben_id'),
            'g_membership' => $this->input->post('member'),
            'g_fullname' => $this->input->post('fname') . ' ' . $mname = $this->input->post('mname') . ' ' . $lname = $this->input->post('lname'),
            'g_purok' => $this->input->post('purok'),
            'g_barangay' => $this->input->post('brgy'),
            'g_city_muncipality' => $this->input->post('mun_city'),
            'g_province' => $this->input->post('province'),
            'g_region' => $this->input->post('region'),
            'g_sex' => $this->input->post('sex'),
            'g_hh_id' => $this->input->post('household_id'),
            'g_hh_set' => $this->input->post('hh_set'),
            'g_contact' => $this->input->post('contact'),
            'g_ip_affiliation' => $this->input->post('ip'),
            'g_category' => $this->input->post('category'),
            'g_sub_category' => $this->input->post('sub_category'),
            'g_description' => $this->input->post('comp_des'),
            'g_resolution' => $this->input->post('in_reso'),
            'g_location' => $this->input->post('filed_location'),
            'g_assist_by' => $this->input->post('assist_by'),
            'g_date_encode' => date('Y-m-d', strtotime($this->input->post('date_encoded'))),
            'g_date_last_action_taken' => date('Y-m-d', strtotime($this->input->post('date_encoded'))),
            'g_date_intake' => date('Y-m-d', strtotime($this->input->post('date_filed'))),
            'g_status' => $this->input->post('client_status'),
            'g_mode' => $this->input->post('r_mode'),
            'g_subj_complaint' => $this->input->post('subj')

        );

          if ($p1 != '') {
            $data['g_p1'] = $p1;
          }

          if ($p2 != '') {
            $data['g_p2'] = $p2;
          }

          if ($p3 != '') {
            $data['g_p3'] = $p3;
          }

          if ($p4 != '') {
            $data['g_p4'] = $p4;
          }

          if ($p5 != '') {
            $data['g_p5'] = $p5;
          }

          if ($p6 != '') {
            $data['g_p6'] = $p6;
          }
        } else if ($type == 2) {
            $data = array(
                'g_tracking_no' => $tracking_no,
                'g_beneficiary_id' => $this->input->post('ben_id'),
                'g_membership' => $this->input->post('member'),
                'g_fullname' => $this->input->post('fname') . ' ' . $mname = $this->input->post('mname') . ' ' . $lname = $this->input->post('lname'),
                'g_purok' => $this->input->post('purok'),
                'g_barangay' => $this->input->post('brgy'),
                'g_city_muncipality' => $this->input->post('mun_city'),
                'g_province' => $this->input->post('province'),
                'g_region' => $this->input->post('region'),
                'g_sex' => $this->input->post('sex'),
                'g_hh_id' => $this->input->post('household_id'),
                'g_hh_set' => $this->input->post('hh_set'),
                'g_contact' => $this->input->post('contact'),
                'g_ip_affiliation' => $this->input->post('ip'),
                'g_category' => $this->input->post('category'),
                'g_sub_category' => $this->input->post('sub_category'),
                'g_description' => $this->input->post('comp_des'),
                'g_resolution' => $this->input->post('in_reso'),
                'g_location' => $this->input->post('filed_location'),
                'g_assist_by' => $this->input->post('assist_by'),
                'g_date_encode' => date('Y-m-d', strtotime($this->input->post('date_encoded'))),
                'g_date_last_action_taken' => date('Y-m-d', strtotime($this->input->post('date_encoded'))),
                'g_date_intake' => date('Y-m-d', strtotime($this->input->post('date_filed'))),
                'g_status' => $this->input->post('client_status'),
                'g_mode' => $this->input->post('r_mode'),
                'g_rca' => $this->input->post('rca'),
                'g_gbv_age' => $this->input->post('rcaAge'),
                'g_gbv_sex' => $this->input->post('rcaSex'),
                'g_subj_complaint' => $this->input->post('subj')
            );
        } else {
            $data = array(
                'g_tracking_no' => $tracking_no,
                'g_beneficiary_id' => $this->input->post('ben_id'),
                'g_membership' => $this->input->post('member'),
                'g_fullname' => $this->input->post('fname') . ' ' . $mname = $this->input->post('mname') . ' ' . $lname = $this->input->post('lname'),
                'g_purok' => $this->input->post('purok'),
                'g_barangay' => $this->input->post('brgy'),
                'g_city_muncipality' => $this->input->post('mun_city'),
                'g_province' => $this->input->post('province'),
                'g_region' => $this->input->post('region'),
                'g_sex' => $this->input->post('sex'),
                'g_hh_id' => $this->input->post('household_id'),
                'g_hh_set' => $this->input->post('hh_set'),
                'g_contact' => $this->input->post('contact'),
                'g_ip_affiliation' => $this->input->post('ip'),
                'g_category' => $this->input->post('category'),
                'g_sub_category' => $this->input->post('sub_category'),
                'g_description' => $this->input->post('comp_des'),
                'g_resolution' => $this->input->post('in_reso'),
                'g_location' => $this->input->post('filed_location'),
                'g_assist_by' => $this->input->post('assist_by'),
                'g_date_encode' => date('Y-m-d', strtotime($this->input->post('date_encoded'))),
                'g_date_last_action_taken' => date('Y-m-d', strtotime($this->input->post('date_encoded'))),
                'g_date_intake' => date('Y-m-d', strtotime($this->input->post('date_filed'))),
                'g_status' => $this->input->post('client_status'),
                'g_mode' => $this->input->post('r_mode'),
                'g_subj_complaint' => $this->input->post('subj')
            );
        }

        $this->Model_grievance->insert($data);
    }
    echo $stats;
  }

  public function fetch_grievance_info() {
    $grievance_id = $this->input->get('id');
    $result = $this->Model_grievance->query("SELECT *,DATE_FORMAT(NOW(), '%m/%d/%Y') AS curDate, concat(a.root_code, ': ', a.root_description) as p1, concat(b.root_code, ': ', b.root_description) as p2, concat(c.root_code, ': ', c.root_description) as p3, concat(d.root_code, ': ', d.root_description) as p4, concat(e.root_code, ': ', e.root_description) as p5, concat(f.root_code, ': ', f.root_description) as p6, a.root_id as p1ID, b.root_id as p2ID, c.root_id as p3ID, d.root_id as p4ID, e.root_id as p5ID, f.root_id as p6ID  FROM grievance AS g INNER JOIN category ON g.g_category = category.category_id LEFT JOIN root_cause AS a ON a.root_id = g.g_p1 LEFT JOIN root_cause AS b ON b.root_id = g.g_p2 LEFT JOIN root_cause AS c ON c.root_id = g.g_p3 LEFT JOIN root_cause AS d ON d.root_id = g.g_p4 LEFT JOIN root_cause AS e ON e.root_id = g.g_p5 LEFT JOIN root_cause AS f ON f.root_id = g.g_p6 WHERE g_id = '$grievance_id'")->result();
    echo json_encode($result);
  }

  public function fetch_categories() {
    $result = $this->Model_category->query("SELECT * FROM category")->result();
    echo json_encode($result);
  }

  public function fetch_sub_categories() {
    $cat = $this->input->get('cat');
    $subCat = $this->Model_sub_category->query("SELECT * FROM sub_category WHERE category_id = '$cat'")->result();

    echo json_encode($subCat);
  }

  public function update_grievance_true() {
    $sessionName = $this->session->userdata('fullname');
    $row1 = $this->input->post('row1');
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



    $id = $this->input->post('id');
    $tracking = $this->input->post('tracking');
    $hh_id = $this->input->post('hhId');
    $fullname = $this->input->post('fullName');
    $sex = $this->input->post('gender');
    $region = $this->input->post('loc_region');
    $province = $this->input->post('loc_province');
    $city = $this->input->post('loc_city');
    $barangay = $this->input->post('loc_brgy');
    $subj_complaint = $this->input->post('subject');
    $report_mode = $this->input->post('mode');
    $category = $this->input->post('cat');
    $sub_category = $this->input->post('sub_cat');
    $grievance_des = $this->input->post('description');
    $date_intake = $this->input->post('dateIntake');
    $date_encode = $this->input->post('dateEncode');
    $assist_by = $this->input->post('assisted');
    $resolve_days = $this->input->post('resolve');
    $grs_timeline = $this->input->post('timeline');
    $results = $this->input->post('result_days');
    $remarks = $this->input->post('new_remarks');
    $ip_affiliation = $this->input->post('ip');
    $reso = $this->input->post('reso');
    $p1 = $this->input->post('p1');
    $p2 = $this->input->post('p2');
    $p3 = $this->input->post('p3');
    $p4 = $this->input->post('p4');
    $p5 = $this->input->post('p5');
    $p6 = $this->input->post('p6');
    $retro_yn = $this->input->post('retro_yn');
    $retro_yes = $this->input->post('retro_yes');
    $num_child = $this->input->post('retro_num_child');
    $name_child1 = $this->input->post('name_child1');
    $name_child2 = $this->input->post('name_child2');
    $name_child3 = $this->input->post('name_child3');
    $status = $this->input->post('stats');
    $date = $this->get_datetime();
    $rDate = $this->input->post('rDate');
    $days = $this->input->post('days');
    $deadline = $this->input->post('deadline');
    $subject = $this->input->post('subject');
    $rcaType = $this->input->post('rcaType');
    $rca = $this->input->post('rca');
    $rcaAge = $this->input->post('rcaAge');
    $rcaSex = $this->input->post('rcaSex');
    $subject = $this->input->post('subject');




    $this->load->view('libraries/getWorkingDays');
    $holidays1 = array('');
    $holidays = $this->Model_holidays->query("SELECT *, DATE_FORMAT(NOW(), '%Y') as 'curYear', DATE_FORMAT(NOW(), '%Y-%m-%d') as 'dateNow' FROM holidays")->result();
    foreach ($holidays as $key => $value) {
        array_push($holidays1,$value->curYear.'-'.$value->holiday_date);
    }
    $workingDays = getWorkingDays(date('Y-m-d', strtotime($date_intake)),date('Y-m-d', strtotime($rDate)),$holidays1) - 1;
    $workingDays1 = getWorkingDays(date('Y-m-d', strtotime($date_intake)), $holidays[0]->dateNow ,$holidays1) - 1;
    $days_remaining = $grs_timeline - $workingDays;
    $days_remaining1 = $grs_timeline - $workingDays1;
    $days_remaining = (int)$days_remaining;
    $days_remaining1 = (int)$days_remaining1;
    if ($days_remaining <= 5 && $days_remaining > 0) {
        $deadline1 = 'Priority';
    } elseif ($days_remaining <= 0) {
        $deadline1 = 'Past Deadline';
    } else {
        $deadline1 = 'Normal';
    }

    if ($days_remaining1 <= 5 && $days_remaining1 > 0) {
        $deadline =  '<p class="text-warning m-0">Priority</p>';
    } elseif ($days_remaining1 <= 0) {
        $deadline = '<p class="text-danger m-0">Past Deadline</p>';
    } else {
        $deadline = '<p class="text-success m-0">Normal</p>';
    }


    if ($status === 'Ongoing') {
        $data = array(
            'g_description' => $grievance_des,
            'g_category' => $category,
            'g_sub_category' => $sub_category,
            'g_resolution' => htmlspecialchars($reso),
            'g_subj_complaint' => $subject,
            'g_retro_yn' => $retro_yn,
            'g_retro_transNo' => $retro_yes,
            'g_no_child' => $num_child,
            'g_name_child1' => $name_child1,
            'g_name_child2' => $name_child2,
            'g_name_child3' => $name_child3,
            'g_status' => $status,
            'g_date_last_action_taken' => date('Y-m-d', strtotime($date)),
            'g_date_resolve' => '',
            'g_resolve_days' => '',
            'g_timeline' => '',
            'g_result' => '',
            'g_deadline' => '',
            'g_remarks' => '',
            'modified_by' => $sessionName
        );

          if ($rca != '') {
            $data['g_rca'] = $rca;
            $data['g_gbv_age'] = $rcaAge;
            $data['g_gbv_sex'] = $rcaSex;
          } else {
            $data['g_rca'] = NULL;
            $data['g_gbv_age'] = NULL;
            $data['g_gbv_sex'] = NULL;
          }

          if ($p1 != '') {
            $data['g_p1'] = $p1;
          } else {
            $data['g_p1'] = NULL;
          }

          if ($p2 != '') {
            $data['g_p2'] = $p2;
          } else {
            $data['g_p2'] = NULL;
          }

          if ($p3 != '') {
            $data['g_p3'] = $p3;
          } else {
            $data['g_p3'] = NULL;
          }

          if ($p4 != '') {
            $data['g_p4'] = $p4;
          } else {
            $data['g_p4'] = NULL;
          }

          if ($p5 != '') {
            $data['g_p5'] = $p5;
          } else {
            $data['g_p5'] = NULL;
          }

          if ($p6 != '') {
            $data['g_p6'] = $p6;
          } else {
            $data['g_p6'] = NULL;
          }


        $this->Model_grievance->update($data, 'g_id =' . $id);

        $pusherData = array(
            'row' => $row1,
            'name' => $sessionName,
            'daysRemaining' => $days_remaining1,
            'deadline' => $deadline,
            'status' => 'Ongoing',
            'dateLAT' => date('m-d-Y', strtotime($date)),
        );

        $pusher->trigger('channel2', 'ongoing', $pusherData);

    } elseif ($status === 'Resolved') {
        $data = array(
            'g_description' => $grievance_des,
            'g_category' => $category,
            'g_sub_category' => $sub_category,
            'g_resolution' => htmlspecialchars($reso),
            'g_subj_complaint' => $subject,
            'g_retro_yn' => $retro_yn,
            'g_retro_transNo' => $retro_yes,
            'g_no_child' => $num_child,
            'g_name_child1' => $name_child1,
            'g_name_child2' => $name_child2,
            'g_name_child3' => $name_child3,
            'g_status' => $status,
            'g_resolve_days' => $workingDays,
            'g_timeline' => $grs_timeline,
            'g_result' => $days_remaining,
            'g_deadline' => $deadline1,
            'g_remarks' => $remarks,
            'g_date_last_action_taken' => date('Y-m-d', strtotime($date)),
            'g_date_resolve' => date('Y-m-d', strtotime($rDate)),
            'modified_by' => $sessionName
        );

          if ($rca != '') {
            $data['g_rca'] = $rca;
            $data['g_gbv_age'] = $rcaAge;
            $data['g_gbv_sex'] = $rcaSex;
          } else {
            $data['g_rca'] = NULL;
            $data['g_gbv_age'] = NULL;
            $data['g_gbv_sex'] = NULL;
          }

          if ($p1 != '') {
            $data['g_p1'] = $p1;
          } else {
            $data['g_p1'] = NULL;
          }

          if ($p2 != '') {
            $data['g_p2'] = $p2;
          } else {
            $data['g_p2'] = NULL;
          }

          if ($p3 != '') {
            $data['g_p3'] = $p3;
          } else {
            $data['g_p3'] = NULL;
          }

          if ($p4 != '') {
            $data['g_p4'] = $p4;
          } else {
            $data['g_p4'] = NULL;
          }

          if ($p5 != '') {
            $data['g_p5'] = $p5;
          } else {
            $data['g_p5'] = NULL;
          }

          if ($p6 != '') {
            $data['g_p6'] = $p6;
          } else {
            $data['g_p6'] = NULL;
          }



        $this->Model_grievance->update($data, 'g_id =' . $id);



        $pusherData = array(
            'row' => $row1,
            'name' => $sessionName,
            'daysRemaining' => $days_remaining,
            'deadline' => $deadline1,
            'status' => 'Resolved',
            'dateLAT' =>date('m-d-Y', strtotime($date)),
            'dateResolved' => date('m-d-Y', strtotime($rDate))

        );

        $pusher->trigger('channel2', 'resolved', $pusherData);
    }



  }

  public function delete_grievance_true() {
    $id = $this->input->get('id');
    $this->Model_grievance->delete('g_id =' . $id);
  }

  public function get_datetime() {
    $result = $this->Model_sub_category->query("SELECT DATE_FORMAT(NOW(), '%M %d, %Y') AS 'Result'")->result();
    echo json_encode($result);
    foreach ($result as $key => $value) {
        return $value->Result;
    }
  }

  public function search_root() {
    $search = $this->input->get('search');
    $result = $this->Model_root->query("SELECT * FROM root_cause WHERE root_code LIKE '%$search%' AND root_code NOT LIKE '%GAD%' LIMIT 10")->result();
    echo json_encode($result);
  }

  public function fetch_grievance_table() {
    $prov = $this->input->post('province');
    $mun = $this->input->post('muncipality');
    $brgy = $this->input->post('barangay');
    $overideStatus = $this->session->userdata('overide');

    $table = 'grievance';

    $select = '*, DATE_FORMAT(NOW(), "%Y-%m-%d") AS "curDate", DATE_FORMAT(g_date_intake, "%m-%d-%Y") AS "dateIntake2", DATE_FORMAT(g_date_last_action_taken, "%m-%d-%Y") AS "last_action_taken2", DATE_FORMAT(g_date_resolve, "%m-%d-%Y") as dateR, , (case when (MONTH(NOW()) <= 3 and YEAR(g_date_intake) = YEAR(NOW()) - 1) or (YEAR(g_date_intake) = YEAR(NOW())) then 1 else 0 end) as trig';

    $joinTbl1 = 'category';
    $joinArgs1 = 'category.category_id = grievance.g_category';
    $joinTbl2 = 'sub_category';
    $joinArgs2 = 'sub_category.sub_category_id = grievance.g_sub_category';
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
    if ($overideStatus == 1) {
        $havingArgs = NULL;
    } else {
        $havingArgs = 'trig = 1';
    }
    $whereInCol = 'g_status';
    $whereInArgs = array('Ongoing', 'Resolved');
    if ($prov != NULL || $mun != NULL || $brgy != NULL) {
      if ($prov!= NULL && $mun == NULL && $brgy == NULL) {
        $whereArgs = array(
          'g_province' => $prov,
        );
      } else if ($prov == NULL && $mun != NULL && $brgy == NULL) {
        $whereArgs = array(
          'g_city_muncipality' => $mun
        );
      } else if ($prov == NULL && $mun == NULL && $brgy != NULL) {
         $whereArgs = array(
          'g_barangay' => $brgy
         );
      }
    } else {
      $whereArgs = NULL;
    }
    $whereLike  = NULL;
    $column_order = array('g_id', 'g_hh_id', 'g_membership','g_fullname', 'g_category', 'g_sub_category', 'g_date_intake', null, null, 'g_status', 'g_date_last_action_taken', 'g_date_resolve', 'is_status', 'modified_by');
    $column_search = array('g_id', 'g_hh_id', 'g_membership','g_fullname', 'g_category', 'g_sub_category', 'g_date_intake', 'g_status', 'g_date_last_action_taken', 'g_date_resolve', 'is_status', 'modified_by');
    $order = array('g_id' => 'desc');

    $column1 = NULL;
    $whereMonth = array('');
    $whereYear = array('');

    $groupBy = NULL;

    $this->load->view('libraries/getWorkingDays');
    $list = $this->Model_datatable->get_datatables($table, $select, $joinTbl1, $joinArgs1, $joinTbl2, $joinArgs2, $joinTbl3, $joinArgs3, $joinTbl4, $joinArgs4, $joinTbl5, $joinArgs5, $joinTbl6, $joinArgs6, $joinTbl7, $joinArgs7, $joinTbl8, $joinArgs8, $joinTbl9, $joinArgs9, $whereInCol, $whereInArgs, $whereArgs, $whereLike, $whereMonth, $whereYear, $column1, $groupBy, $column_order, $column_search, $order, $havingArgs);
    $data = array();
    $no = $this->input->post('start');

    $holidays1 = array('');
    $holidays = $this->Model_holidays->query("SELECT holiday_date FROM holidays")->result();
    foreach ($holidays as $key => $value) {
        array_push($holidays1,$value->holiday_date);
    }

    foreach ($list as $view) {
        $workingDays = getWorkingDays($view->g_date_intake,$view->curDate,$holidays1) - 1;
        $days_remaining = $view->category_days - $workingDays;
        $days_remaining = (int)$days_remaining;
        if ($view->g_status == 'Resolved') {
          $days_remaining = $view->g_result;
          $deadline = $view->g_deadline;
          $deadline1 = $view->g_deadline;
        } else {
          if ($days_remaining <= 7 && $days_remaining > 0) {
            $deadline = '<p class="text-warning m-0">Priority</p>';
            $deadline1 = 'Priority';
          } elseif ($days_remaining <= 0) {
            $deadline = '<p class="text-danger m-0">Past Deadline</p>';
            $deadline1 = 'Past Deadline';
          } else {
            $deadline = '<p class="text-success m-0">Normal</p>';
            $deadline1 = 'Normal';
          }
        }

      $no++;
      $row = array();
      $row[] = $view->g_id;
      $row[] = $view->g_hh_id;
      $row[] = ucfirst(strtolower($view->g_membership));
      $row[] = ucwords(strtolower($view->g_fullname));
      $row[] = $view->category_name;
      $row[] = $view->sub_category_name;
      $row[] = $view->dateIntake2;
      $row[] = $days_remaining;
      $row[] = $deadline;
      $row[] = $deadline1;
      $row[] = $workingDays;
      $row[] = $view->g_status;
      if ($view->last_action_taken2 == '00-00-0000') {
          $row[] = NULL;
      } else {
          $row[] = $view->last_action_taken2;
      }

      if ($view->dateR == '00-00-0000') {
        $row[] = '';
      } else {
        $row[] = $view->dateR;
      }
      $row[] = $view->modified_by;
      if ($view->is_status == 0) {
        $row[] = 'Active';
      } else {
        $row[] = 'Working';
      }

      if ($view->is_status == 0) {
        $row[] = '<i class="action-con fas fa-edit text-center w-100" onclick="update_grievance('. $view->g_id .', '. $days_remaining .', \''. $deadline1 .'\', '. $workingDays .', this)"></i>';
      } else {
        $row[] = '<i class="fas fa-cogs text-center w-100"></i>';
      }

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

  public function fetch_duplicate_table() {
    $table = 'grievance';
    $select = '*, DATE_FORMAT(NOW(), "%Y-%m-%d") AS "curDate", DATE_FORMAT(g_date_intake, "%m-%d-%Y") AS "dateIntake2", DATE_FORMAT(g_date_last_action_taken, "%m-%d-%Y") AS "last_action_taken2"';
    $joinTbl1 = 'category';
    $joinArgs1 = 'category.category_id = grievance.g_category';
    $joinTbl2 = 'sub_category';
    $joinArgs2 = 'sub_category.sub_category_id = grievance.g_sub_category';
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
    $whereInCol = 'g_status';
    $whereInArgs = array('Duplicate');
    $whereArgs = NULL;
    $whereLike = NULL;
    $column_order = array(null, 'g_id', 'g_hh_id', 'g_fullname', 'g_category', 'g_sub_category', 'g_date_intake', null, null, 'g_status', 'g_date_last_action_taken');
    $column_search = array('g_id', 'g_hh_id', 'g_fullname', 'g_category', 'g_sub_category', 'g_date_intake', 'g_status', 'g_date_last_action_taken');
    $order = array('g_id' => 'desc');

    $column1 = NULL;
    $whereMonth = array('');
    $whereYear = array('');

    $groupBy = NULL;

    $list = $this->Model_datatable->get_datatables($table, $select, $joinTbl1, $joinArgs1, $joinTbl2, $joinArgs2, $joinTbl3, $joinArgs3, $joinTbl4, $joinArgs4, $joinTbl5, $joinArgs5, $joinTbl6, $joinArgs6, $joinTbl7, $joinArgs7, $joinTbl8, $joinArgs8, $joinTbl9, $joinArgs9, $whereInCol, $whereInArgs, $whereArgs, $whereLike, $whereMonth, $whereYear, $column1, $groupBy, $column_order, $column_search, $order, $havingArgs);
    $data = array();
    $no = $this->input->post('start');


    foreach ($list as $view) {

      $no++;
      $row = array();
      $row[] = $view->g_id;
      $row[] = $view->g_id;
      $row[] = $view->g_hh_id;
      $row[] = $view->g_fullname;
      $row[] = $view->category_name;
      $row[] = $view->sub_category_name;
      $row[] = $view->dateIntake2;
      $row[] = '<i class="fas fa-eye view action-con w-100 text-center cursor-pointer h6" onclick="view_duplicate('.$view->g_id.')"></i>';

      $data[] = $row;
    }

    $output = array(
            "draw" => $this->input->post('draw'),
            "recordsTotal" => $this->Model_datatable->count_all($table),
            "recordsFiltered" => $this->Model_datatable->count_filtered($table, $select, $joinTbl1, $joinArgs1, $joinTbl2, $joinArgs2, $joinTbl3, $joinArgs3, $joinTbl4, $joinArgs4, $joinTbl5, $joinArgs5, $joinTbl6, $joinArgs6, $joinTbl7, $joinArgs7, $joinTbl8, $joinArgs8, $joinTbl9, $joinArgs9, $whereInCol, $whereInArgs, $whereLike, $whereArgs, $whereMonth, $whereYear, $column1, $groupBy, $column_order, $column_search, $order, $havingArgs),
            "data" => $data,
        );
    echo json_encode($output);
  }

  public function upload_file() {
    $id = $this->input->post('grievance_id');
    $data = [];

      $count = count($_FILES['files']['name']);

      for($i=0;$i<$count;$i++){

        if(!empty($_FILES['files']['name'][$i])){

          $config['upload_path'] = './assets/file';
          $config['allowed_types'] = 'csv|xls|xlsx|docx|doc|pdf';
          $config['encrypt_name'] = TRUE;
          $config['file_name'] = $_FILES['files']['name'][$i];

          $_FILES['file']['name'] = $_FILES['files']['name'][$i];
          $_FILES['file']['type'] = $_FILES['files']['type'][$i];
          $_FILES['file']['tmp_name'] = $_FILES['files']['tmp_name'][$i];
          $_FILES['file']['error'] = $_FILES['files']['error'][$i];
          $_FILES['file']['size'] = $_FILES['files']['size'][$i];

          $this->load->library('upload',$config);

          if($this->upload->do_upload('file')){
            $uploadData = $this->upload->data();
            $data = array(
                'g_id' => $id,
                'file_name' => $_FILES['files']['name'][$i],
                'file_enc_name' => $uploadData['file_name']
            );
            $this->Model_upload->insert($data);
            // $data['totalFiles'][] = $filename;
          }
        }

      }
  }



  public function fetch_attachments() {
    $id = $this->input->get('id');

    $result = $this->Model_upload->query("SELECT * FROM attachment WHERE g_id = '$id'")->result();

    echo json_encode($result);
  }

  public function delete_attachment() {
    $id = $this->input->get('id');
    $newID = "'" . implode( "', '", $id ) . "'";
    $result = $this->Model_upload->query("SELECT * FROM attachment WHERE att_id IN ($newID)")->result();
    foreach ($result as $key => $value) {
        $this->delete_file($value->file_enc_name);
    }
    $column = 'att_id';
    $this->Model_upload->delete_batch($id, $column);
  }

  public function delete_file($name) {
    $path = 'assets/file/'. $name;
    unlink($path);
  }

  public function approve_duplicate_true() {
    $id = $this->input->post('id');

    $data = array('g_status' => 'Ongoing');
    $where = array('g_id' => $id);

    $this->Model_grievance->update($data, $where);
  }

  public function fetch_rca() {
    $result = $this->Model_category->query("SELECT * FROM root_cause WHERE category_id = 9")->result();
    echo json_encode($result);
  }

  public function triggerStatus() {
    $id = $this->input->post('id');
    $status = $this->input->post('status');
    $row = $this->input->post('row');
    $newStatus = 0;
    if ($status == 'Working') {
        $newStatus = 1;
    } else if ($status == 'Active') {
        $newStatus = 0;
    }

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

    $data = array(
        'id' => $id,
        'row' => $row,
        'status' => $status
    );
    $pusher->trigger('channel2', 'dataTable', $data);

    $data = array('is_status' => $newStatus, );
    $where = array('g_id' => $id, );
    $this->Model_grievance->update($data, $where);
  }

  public function fetch_tags() {
    $result['provinceCat'] = $this->Model_grievance->query("SELECT  x.g_province as provName, sum(x.trig) as countProv FROM (SELECT (case when (MONTH(NOW()) <= 3 and YEAR(g_date_intake) = YEAR(NOW()) - 1) or (YEAR(g_date_intake) = YEAR(NOW())) then 1 else 0 end) as trig, g_province FROM grievance WHERE g_status IN ('Ongoing', 'Resolved') HAVING trig = 1) as x GROUP BY x.g_province")->result();
    $result['muncityCat'] = $this->Model_grievance->query("SELECT  x.g_city_muncipality as munName, sum(x.trig) as countMun FROM (SELECT (case when (MONTH(NOW()) <= 3 and YEAR(g_date_intake) = YEAR(NOW()) - 1) or (YEAR(g_date_intake) = YEAR(NOW())) then 1 else 0 end) as trig, g_city_muncipality FROM grievance WHERE g_status IN ('Ongoing', 'Resolved') HAVING trig = 1) as x GROUP BY x.g_city_muncipality")->result();
    $result['brgyCat'] = $this->Model_grievance->query("SELECT  x.g_barangay as brgyName, sum(x.trig) as countBrgy FROM (SELECT (case when (MONTH(NOW()) <= 3 and YEAR(g_date_intake) = YEAR(NOW()) - 1) or (YEAR(g_date_intake) = YEAR(NOW())) then 1 else 0 end) as trig, g_barangay FROM grievance WHERE g_status IN ('Ongoing', 'Resolved') HAVING trig = 1) as x GROUP BY x.g_barangay")-> result();

    echo json_encode($result);
  }

  public function batch_delete_duplicate() {
    $data = $this->input->get('ids');
    $column = 'g_id';
    $this->Model_grievance->delete_batch($data, $column);
  }
}
?>

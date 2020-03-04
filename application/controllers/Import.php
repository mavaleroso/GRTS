<?php
defined('BASEPATH') OR exit('No direct script access allowed');
use PhpOffice\PhpSpreadsheet\Spreadsheet;
class Import extends CI_Controller{

  public function __construct() {
    parent::__construct();
    $this->load->model('Model_excel');
    $this->load->model('Model_grievance');
  }

  public function upload() {
        $data = array();
        $data['title'] = 'Import Excel Sheet | TechArise';
        $data['breadcrumbs'] = array('Home' => '#');
         // Load form validation library
         $this->load->library('form_validation');
         $this->form_validation->set_rules('fileURL', 'Upload File', 'callback_checkFileValidation');
         if($this->form_validation->run() == false) {

              // header('Location: ' . base_url() . '/view_grievance');
         } else {
            if(!empty($_FILES['fileURL']['name'])) {
                $extension = pathinfo($_FILES['fileURL']['name'], PATHINFO_EXTENSION);

                if($extension == 'csv'){
                    $reader = new \PhpOffice\PhpSpreadsheet\Reader\Csv();
                } elseif($extension == 'xlsx') {
                    $reader = new \PhpOffice\PhpSpreadsheet\Reader\Xlsx();
                } else {
                    $reader = new \PhpOffice\PhpSpreadsheet\Reader\Xls();
                }
                $spreadsheet = $reader->load($_FILES['fileURL']['tmp_name']);
                $allDataInSheet = $spreadsheet->getActiveSheet()->toArray(null, true, true, true);
                $arrayCount = count($allDataInSheet);
                $flag = 0;

                $createArray = array('ben_id', 'membership', 'tracking_no', 'fullname', 'sex', 'hh_id', 'hh_set', 'purok', 'barangay', 'city_mun', 'province', 'region', 'contact_no', 'category', 'sub_category', 'description', 'resolution', 'filed_location', 'assist_by', 'date_encode', 'date_intake', 'subj_complaint', 'rca', 'gbv_sex', 'gbv_age', 'r_mode', 'p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'ip');

                $makeArray = array('ben_id' => 'ben_id', 'membership' => 'membership', 'tracking_no' => 'tracking_no', 'fullname' => 'fullname', 'sex' => 'sex', 'hh_id' => 'hh_id', 'hh_set' => 'hh_set', 'purok' => 'purok', 'barangay' => 'barangay', 'city_mun' => 'city_mun', 'province' => 'province', 'region' => 'region', 'contact_no' => 'contact_no', 'category' => 'category', 'sub_category' => 'sub_category', 'description' => 'description', 'resolution' => 'resolution', 'filed_location' => 'filed_location', 'assist_by' => 'assist_by', 'date_encode' => 'date_encode', 'date_intake' => 'date_intake', 'subj_complaint' => 'subj_complaint', 'rca' => 'rca', 'gbv_sex' => 'gbv_sex', 'gbv_age' => 'gbv_age', 'r_mode' => 'r_mode', 'p1' => 'p1', 'p2' => 'p2', 'p3' => 'p3', 'p4' => 'p4', 'p5' => 'p5', 'p6' => 'p6', 'ip' => 'ip');

                $SheetDataKey = array();
                foreach ($allDataInSheet as $dataInSheet) {
                    foreach ($dataInSheet as $key => $value) {
                        if (in_array(trim($value), $createArray)) {
                            $value = preg_replace('/\s+/', '', $value);
                            $SheetDataKey[trim($value)] = $key;
                        }
                    }
                }
                $dataDiff = array_diff_key($makeArray, $SheetDataKey);
                if (empty($dataDiff)) {
                    $flag = 1;
                }
                // match excel sheet column
                if ($flag===1) {
                    for ($i = 2; $i <= $arrayCount; $i++) {
                        $addresses = array();
                        $g_beneficiary_id = $SheetDataKey['ben_id'];
                        $g_membership = $SheetDataKey['membership'];
                        $g_tracking_no = $SheetDataKey['tracking_no'];
                        $g_fullname = $SheetDataKey['fullname'];
                        $g_sex = $SheetDataKey['sex'];
                        $g_hh_id = $SheetDataKey['hh_id'];
                        $g_hh_set = $SheetDataKey['hh_set'];
                        $g_purok = $SheetDataKey['purok'];
                        $g_barangay = $SheetDataKey['barangay'];
                        $g_city_muncipality = $SheetDataKey['city_mun'];
                        $g_province = $SheetDataKey['province'];
                        $g_region = $SheetDataKey['region'];
                        $g_contact = $SheetDataKey['contact_no'];
                        $g_category = $SheetDataKey['category'];
                        $g_sub_category = $SheetDataKey['sub_category'];
                        $g_description = $SheetDataKey['description'];
                        $g_resolution = $SheetDataKey['resolution'];
                        $g_location = $SheetDataKey['filed_location'];
                        $g_assist_by = $SheetDataKey['assist_by'];
                        $g_date_encode = $SheetDataKey['date_encode'];
                        $g_date_intake = $SheetDataKey['date_intake'];
                        $g_subj_complaint = $SheetDataKey['subj_complaint'];
                        $g_rca = $SheetDataKey['rca'];
                        $g_gbv_sex = $SheetDataKey['gbv_sex'];
                        $g_gbv_age = $SheetDataKey['gbv_age'];
                        $g_mode = $SheetDataKey['r_mode'];
                        $g_p1 = $SheetDataKey['p1'];
                        $g_p2 = $SheetDataKey['p2'];
                        $g_p3 = $SheetDataKey['p3'];
                        $g_p4 = $SheetDataKey['p4'];
                        $g_p5 = $SheetDataKey['p5'];
                        $g_p6 = $SheetDataKey['p6'];
                        $g_ip_affiliation = $SheetDataKey['ip'];

                        $g_beneficiary_id = filter_var(trim($allDataInSheet[$i][$g_beneficiary_id]), FILTER_SANITIZE_STRING);
                        $g_membership = filter_var(trim($allDataInSheet[$i][$g_membership]), FILTER_SANITIZE_STRING);
                        $g_tracking_no = filter_var(trim($allDataInSheet[$i][$g_tracking_no]), FILTER_SANITIZE_STRING);
                        $g_fullname = filter_var(trim($allDataInSheet[$i][$g_fullname]), FILTER_SANITIZE_STRING);
                        $g_sex = filter_var(trim($allDataInSheet[$i][$g_sex]), FILTER_SANITIZE_STRING);
                        $g_hh_id = filter_var(trim($allDataInSheet[$i][$g_hh_id]), FILTER_SANITIZE_STRING);
                        $g_hh_set = filter_var(trim($allDataInSheet[$i][$g_hh_set]), FILTER_SANITIZE_STRING);
                        $g_purok = filter_var(trim($allDataInSheet[$i][$g_purok]), FILTER_SANITIZE_STRING);
                        $g_barangay = filter_var(trim($allDataInSheet[$i][$g_barangay]), FILTER_SANITIZE_STRING);
                        $g_city_muncipality = filter_var(trim($allDataInSheet[$i][$g_city_muncipality]), FILTER_SANITIZE_STRING);
                        $g_province = filter_var(trim($allDataInSheet[$i][$g_province]), FILTER_SANITIZE_STRING);
                        $g_region = filter_var(trim($allDataInSheet[$i][$g_region]), FILTER_SANITIZE_STRING);
                        $g_contact = filter_var(trim($allDataInSheet[$i][$g_contact]), FILTER_SANITIZE_STRING);
                        $g_category = filter_var(trim($allDataInSheet[$i][$g_category]), FILTER_SANITIZE_STRING);
                        $g_sub_category = filter_var(trim($allDataInSheet[$i][$g_sub_category]), FILTER_SANITIZE_STRING);
                        $g_description = filter_var(trim($allDataInSheet[$i][$g_description]), FILTER_SANITIZE_STRING);
                        $g_resolution = filter_var(trim($allDataInSheet[$i][$g_resolution]), FILTER_SANITIZE_STRING);
                        $g_location = filter_var(trim($allDataInSheet[$i][$g_location]), FILTER_SANITIZE_STRING);
                        $g_assist_by = filter_var(trim($allDataInSheet[$i][$g_assist_by]), FILTER_SANITIZE_STRING);
                        $g_date_encode = filter_var(trim($allDataInSheet[$i][$g_date_encode]), FILTER_SANITIZE_STRING);
                        $g_date_intake = filter_var(trim($allDataInSheet[$i][$g_date_intake]), FILTER_SANITIZE_STRING);
                        $g_subj_complaint = filter_var(trim($allDataInSheet[$i][$g_subj_complaint]), FILTER_SANITIZE_STRING);
                        $g_rca = filter_var(trim($allDataInSheet[$i][$g_rca]), FILTER_SANITIZE_STRING);
                        $g_gbv_sex = filter_var(trim($allDataInSheet[$i][$g_gbv_sex]), FILTER_SANITIZE_STRING);
                        $g_gbv_age = filter_var(trim($allDataInSheet[$i][$g_gbv_age]), FILTER_SANITIZE_STRING);
                        $g_mode = filter_var(trim($allDataInSheet[$i][$g_mode]), FILTER_SANITIZE_STRING);
                        $g_p1 = filter_var(trim($allDataInSheet[$i][$g_p1]), FILTER_SANITIZE_STRING);
                        $g_p2 = filter_var(trim($allDataInSheet[$i][$g_p2]), FILTER_SANITIZE_STRING);
                        $g_p3 = filter_var(trim($allDataInSheet[$i][$g_p3]), FILTER_SANITIZE_STRING);
                        $g_p4 = filter_var(trim($allDataInSheet[$i][$g_p4]), FILTER_SANITIZE_STRING);
                        $g_p5 = filter_var(trim($allDataInSheet[$i][$g_p5]), FILTER_SANITIZE_STRING);
                        $g_p6 = filter_var(trim($allDataInSheet[$i][$g_p6]), FILTER_SANITIZE_STRING);
                        $g_ip_affiliation = filter_var(trim($allDataInSheet[$i][$g_ip_affiliation]), FILTER_SANITIZE_STRING);

                        $newStatus;

                        $fetchGrievance = $this->Model_grievance->query("SELECT COUNT(g_id) as 'bear' FROM grievance WHERE g_fullname = '$g_fullname' AND g_hh_id = '$g_hh_id' AND g_category = '$g_category' AND g_sub_category = '$g_sub_category' AND g_status = 'Ongoing'")->row();

                        if ($fetchGrievance->bear > 0) {
                          $newStatus = 'Duplicate';
                        } else {
                          $newStatus = 'Ongoing';
                        }

                        if ($g_rca == '') {
                          $g_rca = NULL;
                        }

                        if ($g_p1 == '') {
                          $g_p1 = NULL;
                        }

                        if ($g_p2 == '') {
                          $g_p2 = NULL;
                        }

                        if ($g_p3 == '') {
                          $g_p3 = NULL;
                        }

                        if ($g_p4 == '') {
                          $g_p4 = NULL;
                        }

                        if ($g_p5 == '') {
                          $g_p5 = NULL;
                        }

                        if ($g_p6 == '') {
                          $g_p6 = NULL;
                        }

                        $dintake = explode('-', $g_date_intake);
                        $date_intake_true = $dintake[2].'-'.$dintake[0].'-'.$dintake[1];

                        $dencode = explode('-', $g_date_encode);
                        $date_encode_true = $dencode[2].'-'.$dencode[0].'-'.$dencode[1];

                        $arrayData = array(
                          'g_beneficiary_id' => $g_beneficiary_id,
                          'g_membership' => $g_membership,
                          'g_tracking_no' => $g_tracking_no,
                          'g_fullname' => $g_fullname,
                          'g_sex' => $g_sex,
                          'g_hh_id' => $g_hh_id,
                          'g_hh_set' => $g_hh_set,
                          'g_purok' => $g_purok,
                          'g_barangay' => $g_barangay,
                          'g_city_muncipality' => $g_city_muncipality,
                          'g_province' => $g_province,
                          'g_region' => $g_region,
                          'g_contact' => $g_contact,
                          'g_category' => $g_category,
                          'g_sub_category' => $g_sub_category,
                          'g_description' => $g_description,
                          'g_resolution' => $g_resolution,
                          'g_location' => $g_location,
                          'g_assist_by' => $g_assist_by,
                          'g_date_encode' => $date_encode_true,
                          'g_date_intake' => $date_intake_true,
                          'g_subj_complaint' => $g_subj_complaint,
                          'g_rca' => $g_rca,
                          'g_gbv_sex' => $g_gbv_sex,
                          'g_gbv_age' => $g_gbv_age,
                          'g_mode' => $g_mode,
                          'g_p1' => $g_p1,
                          'g_p2' => $g_p2,
                          'g_p3' => $g_p3,
                          'g_p4' => $g_p4,
                          'g_p5' => $g_p5,
                          'g_p6' => $g_p6,
                          'g_ip_affiliation' => $g_ip_affiliation,
                          'g_status' => $newStatus
                        );

                        $fetchData[] = $arrayData;

                    }
                    $data['dataInfo'] = $fetchData;
                    $this->Model_excel->setBatchImport($fetchData);
                    $this->Model_excel->importData();
                    echo 1;
                } else {
                    echo 0;
                }
            }
        }
    }

    // checkFileValidation
    public function checkFileValidation($string) {
      $file_mimes = array('text/x-comma-separated-values',
        'text/comma-separated-values',
        'application/octet-stream',
        'application/vnd.ms-excel',
        'application/x-csv',
        'text/x-csv',
        'text/csv',
        'application/csv',
        'application/excel',
        'application/vnd.msexcel',
        'text/plain',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      );
      if(isset($_FILES['fileURL']['name'])) {
            $arr_file = explode('.', $_FILES['fileURL']['name']);
            $extension = end($arr_file);
            if(($extension == 'xlsx' || $extension == 'xls' || $extension == 'csv') && in_array($_FILES['fileURL']['type'], $file_mimes)){
                return true;
            }else{
                $this->form_validation->set_message('checkFileValidation', 'Please choose correct file.');
                return false;
            }
        }else{
            $this->form_validation->set_message('checkFileValidation', 'Please choose a file.');
            return false;
        }
    }

}
?>

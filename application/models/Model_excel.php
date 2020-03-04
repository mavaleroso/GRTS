<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Model_excel extends CI_Model {
	private $_batchImport;
 
    public function setBatchImport($batchImport) {
        $this->_batchImport = $batchImport;
    }
 
    public function importData() {
        $data = $this->_batchImport;
        $this->db->insert_batch('grievance', $data);
    }

}
?>

<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class MY_Model extends CI_Model {

	public $tbl_name;

	public function __construct()
	{
		parent::__construct();
		$this->load->database("default");
	}

	public function query($query = "") {
		$query = $this->db->query($query);
		return $query;
	}

	public function insert($data = []) {
		$data = $this->trim($data);
		if($this->db->insert($this->tbl_name, $data)) {
			return true;
		}
		return false;
	}

	public function update($data, $where) {
		// $data = $this->trim($data);
		$where = $this->trim($where);
		if($this->db->where($where)->update($this->tbl_name, $data)) {
			return true;
		}
		return false;
	}

	public function delete($data = []) {
		$data = $this->trim($data);
		if($this->db->delete($this->tbl_name, $data)) {
			return true;
		}
		return false;
	}

	public function delete_batch($data, $column) {
		$data = $this->trim($data);
		$column = $this->trim($column);
		if ($this->db->where_in($column, $data)->delete($this->tbl_name)) {
			return true;
		}
		return false;
	}

	public function trim($data = []) {
		foreach ($data as $key => $value) {
			$value = trim($value);
			$value = strip_tags($value);
			$value = stripslashes($value);
			$data[$key] = $value;
		}
		return $data;
	}

}

/* End of file MY_Model.php */
/* Location: ./application/core/MY_Model.php */

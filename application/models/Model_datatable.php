<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Model_datatable extends CI_Model {

	public function __construct() {
		parent::__construct();
		$this->load->database();
	}


	private function _get_datatables_query($table, $select, $joinTbl1, $joinArgs1, $joinTbl2, $joinArgs2, $joinTbl3, $joinArgs3, $joinTbl4, $joinArgs4, $joinTbl5, $joinArgs5, $joinTbl6, $joinArgs6, $joinTbl7, $joinArgs7, $joinTbl8, $joinArgs8, $joinTbl9, $joinArgs9, $whereInCol, $whereInArgs, $whereArgs, $whereLike, $whereMonth, $whereYear, $column1, $groupBy, $column_order, $column_search, $order, $havingArgs)
	{
		$this->db->select($select);
		$this->db->from($table);
		if ($joinTbl1 != NULL && $joinArgs1 != NULL) {
			$this->db->join($joinTbl1, $joinArgs1);
		}

		if ($joinTbl2 != NULL && $joinArgs2 != NULL) {
			$this->db->join($joinTbl2, $joinArgs2);
		}

		if ($joinTbl3 != NULL && $joinArgs3 != NULL) {
			$this->db->join($joinTbl3, $joinArgs3, 'left');
		}

		if ($joinTbl4 != NULL && $joinArgs4 != NULL) {
			$this->db->join($joinTbl4, $joinArgs4, 'left');
		}

		if ($joinTbl5 != NULL && $joinArgs5 != NULL) {
			$this->db->join($joinTbl5, $joinArgs5, 'left');
		}

		if ($joinTbl6 != NULL && $joinArgs6 != NULL) {
			$this->db->join($joinTbl6, $joinArgs6, 'left');
		}

		if ($joinTbl7 != NULL && $joinArgs7 != NULL) {
			$this->db->join($joinTbl7, $joinArgs7, 'left');
		}

		if ($joinTbl8 != NULL && $joinArgs8 != NULL) {
			$this->db->join($joinTbl8, $joinArgs8, 'left');
		}

		if ($joinTbl8 != NULL && $joinArgs9 != NULL) {
			$this->db->join($joinTbl9, $joinArgs9, 'left');
		}

		if ($whereInCol != NULL && $whereInArgs != NULL) {
			$this->db->where_in($whereInCol, $whereInArgs);
		}

		if ($whereArgs != NULL) {
			$this->db->where($whereArgs);
		}

		if ($whereLike != NULL) {
			$this->db->LIKE($whereLike);
		}

		if ($whereMonth != NULL && $whereYear != NULL && $column1 != NULL) {
			$this->db->where_in('MONTH('.$column1.')', $whereMonth);
			$this->db->where_in('YEAR('.$column1.')', $whereYear);
		}


		if ($groupBy != NULL) {
			$this->db->group_by($groupBy);
		}

		if ($havingArgs != NULL) {
			$this->db->having($havingArgs);
		}

		// $order = array('g_id' => 'desc'); 

		$i = 0;

		foreach ($column_search as $item) 
		{
			if($_POST['search']['value']) 
			{
				
				if($i===0) 
				{
					$this->db->group_start(); 
					$this->db->like($item, $_POST['search']['value']);
				}
				else
				{
					$this->db->or_like($item, $_POST['search']['value']);
				}

				if(count($column_search) - 1 == $i) 
					$this->db->group_end(); 
			}
			$i++;
		}
		
		if(isset($_POST['order'])) 
		{
			$this->db->order_by($column_order[$_POST['order']['0']['column']], $_POST['order']['0']['dir']);
		} 
		else if(isset($this->order))
		{
			$this->db->order_by(key($order), $order[key($order)]);
		}
	}

	public function get_datatables($table, $select, $joinTbl1, $joinArgs1, $joinTbl2, $joinArgs2, $joinTbl3, $joinArgs3, $joinTbl4, $joinArgs4, $joinTbl5, $joinArgs5, $joinTbl6, $joinArgs6, $joinTbl7, $joinArgs7, $joinTbl8, $joinArgs8, $joinTbl9, $joinArgs9, $whereInCol, $whereInArgs, $whereArgs, $whereLike, $whereMonth, $whereYear, $column1, $groupBy, $column_order, $column_search, $order, $havingArgs)
	{

		$this->_get_datatables_query($table, $select, $joinTbl1, $joinArgs1, $joinTbl2, $joinArgs2, $joinTbl3, $joinArgs3, $joinTbl4, $joinArgs4, $joinTbl5, $joinArgs5, $joinTbl6, $joinArgs6, $joinTbl7, $joinArgs7, $joinTbl8, $joinArgs8, $joinTbl9, $joinArgs9, $whereInCol, $whereInArgs, $whereArgs, $whereLike, $whereMonth, $whereYear, $column1, $groupBy, $column_order, $column_search, $order, $havingArgs);
		if($_POST['length'] != -1)
		$this->db->limit($_POST['length'], $_POST['start']);
		$query = $this->db->get();
		return $query->result();
	}

	public function count_filtered($table, $select, $joinTbl1, $joinArgs1, $joinTbl2, $joinArgs2, $joinTbl3, $joinArgs3, $joinTbl4, $joinArgs4, $joinTbl5, $joinArgs5, $joinTbl6, $joinArgs6, $joinTbl7, $joinArgs7, $joinTbl8, $joinArgs8, $joinTbl9, $joinArgs9, $whereInCol, $whereInArgs, $whereArgs, $whereLike, $whereMonth, $whereYear, $column1, $groupBy, $column_order, $column_search, $order, $havingArgs)
	{
		$this->_get_datatables_query($table, $select, $joinTbl1, $joinArgs1, $joinTbl2, $joinArgs2, $joinTbl3, $joinArgs3, $joinTbl4, $joinArgs4, $joinTbl5, $joinArgs5, $joinTbl6, $joinArgs6, $joinTbl7, $joinArgs7, $joinTbl8, $joinArgs8, $joinTbl9, $joinArgs9, $whereInCol, $whereInArgs, $whereArgs, $whereLike, $whereMonth, $whereYear, $column1, $groupBy, $column_order, $column_search, $order, $havingArgs);
		$query = $this->db->get();
		return $query->num_rows();
	}

	public function count_all($table)
	{
		$this->db->from($table);
		return $this->db->count_all_results();
	}


}

<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Message extends CI_Controller{

  public function __construct() {
    parent::__construct();
    $this->load->model('Model_message');
  }

  public function fetch_message() {
    $id = $this->session->userdata('user_id');
    $name = $this->input->get('name');

    $results = $this->Model_message->query("SELECT m.*, DATE_FORMAT(m.m_date, '%m-%d-%Y %h:%i %p') as 'msgDate',a.user_id as 'userID1' ,b.user_id as 'userID2', a.fullname as 'name1', b.fullname as 'name2', a.avatar as 'avatar1', b.avatar as 'avatar2', a.access as 'access1', b.access as 'access2' FROM message as m LEFT JOIN user_info as a ON m.m_from = a.user_id LEFT JOIN user_info as b ON m.m_to = b.user_id WHERE (a.fullname LIKE '%$name%' OR b.fullname LIKE '%$name%') AND m.m_id IN (SELECT max(m_id) as id FROM message WHERE (m_from = '$id' OR m_to = '$id') GROUP BY m_code) ORDER BY m.m_date DESC")->result();

    echo json_encode($results);
  }

  public function fetch_notification() {
    $id = $this->session->userdata('user_id');
    $results = $this->Model_message->query("SELECT m.*,a.user_id as 'userID1' ,b.user_id as 'userID2', a.fullname as 'name1', b.fullname as 'name2', a.avatar as 'avatar1', b.avatar as 'avatar2', a.access as 'access1', b.access as 'access2' FROM message as m LEFT JOIN user_info as a ON m.m_from = a.user_id LEFT JOIN user_info as b ON m.m_to = b.user_id WHERE m.m_id IN (SELECT max(m_id) as id FROM message WHERE m.m_to = '$id' AND m.is_seen = 0 GROUP BY m_code) ORDER BY m.m_date DESC")->result();

    echo json_encode($results);
  }

  public function fetch_contacts() {
    $id = $this->session->userdata('user_id');
    $name = $this->input->get('name');

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



    $code = $this->Model_message->query("SELECT m_code FROM message WHERE (m_from = '$id' AND m_to = '$toID') OR (m_from = '$toID' AND m_to = '$id') LIMIT 1")->result();

    $date = $this->Model_message->query("SELECT DATE_FORMAT(NOW(), '%Y-%m-%d %h:%i %p') as 'curDate', DATE_FORMAT(NOW(), '%m-%d-%Y %h:%i %p') as 'curDate2' FROM user_info LIMIT 1")->result();

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

  public function delete_messages() {
    $this->Model_message->query("DELETE FROM message WHERE DATE_FORMAT((m_date + INTERVAL 1 MONTH), '%Y-%m-%d') = DATE_FORMAT(NOW(), '%Y-%m-%d')");
  }

}
?>

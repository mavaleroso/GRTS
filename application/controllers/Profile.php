<?php
defined('BASEPATH') OR exit('No direct script access allowed');

    class Profile extends CI_Controller{

        public function __construct() {
            parent::__construct();
            $this->load->model('Model_user');
        }

        public function update_name() {
            $id = $this->session->userdata('user_id');
            $where = array('user_id' => $id);
            $data = array(
                'fullname' => $this->input->post('name') 
            );
            $query = $this->Model_user->update($data, $where);
        }

        public function update_username() {
            $id = $this->session->userdata('user_id');
            $where = array('user_id' => $id);
            $data = array(
                'username' => $this->input->post('uname') 
            );
            $query = $this->Model_user->update($data, $where);
        }

        public function check_username() {
            $origin =  $this->input->post('old');
            $uname =  $this->input->post('new');
            $status = 0;
            $select = $this->Model_user->query("SELECT username FROM user_info WHERE NOT username = '$origin'")->result();
            foreach ($select as $key => $value) {
                if ($uname === $value->username) {
                    $status = 1;
                }
            }
            echo $status;
        }

        public function match_password() {
            $id = $this->session->userdata('user_id');
            $pass = $this->input->post('pass');
            $pass = md5($pass);
            $status = 0;
            if($select = $this->Model_user->query("SELECT * FROM user_info WHERE user_id = '$id' and password = '$pass'")->result()){
                $status = 1;
            } else {
                $status = 0;
            }
            echo $status;
        }

        public function update_password() {
            $id = $this->session->userdata('user_id');
            $pass = $this->input->post('pass');
            $pass = md5($pass);
            $where = array('user_id' => $id);
            $data = array(
                'password' => $pass
            );
            $this->Model_user->update($data, $where);
        }

        public function update_location() {
            $id = $this->session->userdata('user_id');
            $brgy = $this->input->post('barangay');
            $city = $this->input->post('city');
            $province = $this->input->post('province');
            $region = $this->input->post('region');
            $where = array('user_id' => $id);
            $data = array(
                'location' => $brgy . ', ' . $city . ', ' . $province . ', ' . $region
            );
            $this->Model_user->update($data, $where);
        }

        public function update_info() {
            $id = $this->session->userdata('user_id');
            $email = $this->input->post('email');
            $contact = $this->input->post('contact');
            $bday = $this->input->post('bday');
            $where = array('user_id' => $id);
            $data = array(
                'email' => $email,
                'contact' => $contact,
                'birthdate' => date('Y-m-d', strtotime($bday))
            );
            $this->Model_user->update($data, $where);
        }

        public function do_upload() {
            $config['upload_path']="./assets/user-img";
            $config['allowed_types']='gif|jpg|png';
            $config['encrypt_name'] = TRUE;
            $id = $this->session->userdata('user_id');
            
            $this->load->library('upload',$config);
            if($this->upload->do_upload("file")){
                // $data = array('upload_data' => $this->upload->data());
                $data = $this->upload->data();
                //Resize and Compress Image
                $config['image_library']='gd2';
                $config['source_image']='./assets/user-img/'.$data['file_name'];
                $config['create_thumb']= FALSE;
                $config['maintain_ratio']= FALSE;
                $config['quality']= '60%';
                $config['width']= 600;
                $config['height']= 600;
                $config['new_image']= './assets/user-img/'.$data['file_name'];
                $this->load->library('image_lib', $config);
                $this->image_lib->resize();

                $image= $data['file_name']; 

                $where = array(
                    'user_id' => $id
                );

                $data = array(
                    'avatar' => $image 
                );

                $result= $this->Model_user->update($data, $where);
                echo json_decode($result);
            }
        }

        public function delete_img() {
            $img = $this->input->post('img');
            $path = 'assets/user-img/'. $img;
            unlink($path);
        }
}


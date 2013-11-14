<?php
$data = array();
$data['users'] = array();
$data['users'][0] = array('name' => 'John Doe', 'age' => '43');
$data['users'][1] = array('name' => 'Jane Smith', 'age' => '21');

echo json_encode($data);

?>
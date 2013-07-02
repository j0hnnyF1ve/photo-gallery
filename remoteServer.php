<?php
/*
TODO:
Make a ResponseMessage class that is instantiated everytime we send a message back to the client
- should contain
  - status (success, fail)
  - message
  - data (optional, in either XML or JSON)
*/

$action = (isset($_GET['action']) ) ? $_GET['action'] : '';
if(empty($action)) { return 'No action entered'; }

switch($action) 
{
	case 'loadDataFile':
		require_once('apps/remoteServer/include/loadDataFile.php');
		break;
	case 'saveDataFile':
		$data = (isset($_POST['data']) ) ? $_POST['data'] : '';
		$filename = (isset($_POST['filename']) ) ? $_POST['filename'] : '';
		if(empty($data)) { return 'No data'; }
		if(empty($filename)) { return 'No data'; }

		require_once('apps/remoteServer/include/saveDataFile.php');
		saveDataFile($data, $filename);
		break;
	default:
		break;	
}
?>
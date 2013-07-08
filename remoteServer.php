<?php
/*
TODO:
Make a ResponseMessage class that is instantiated everytime we send a message back to the client
- should contain
  - status (success, fail)
  - message
  - data (optional, in either XML or JSON)
*/
require_once('include/helper.php');
require_once('apps/remoteServer/include/RemoteMessage.php');

$action = (isset($_GET['action']) ) ? $_GET['action'] : '';
if(empty($action)) { $remoteMessage = new RemoteMessage(false, 'No action entered'); echo $remoteMessage->getJson(); return; }

switch($action) 
{
// TODO: add in validation for data and filepath
	case 'loadDataFile':
		$filename = (isset($_POST['filename']) ) ? $_POST['filename'] : '';
		$galleryName = (isset($_POST['galleryName']) ) ? $_POST['galleryName'] : '';
		$filePath = "gallery/$galleryName/data/$filename";

		if(empty($filename)) { $remoteMessage = new RemoteMessage(false, 'No filename supplied.'); echo $remoteMessage->getJson(); return; }
		if(empty($galleryName)) { $remoteMessage = new RemoteMessage(false, 'No gallery supplied.'); echo $remoteMessage->getJson(); return; }
		if(!is_file($filePath)) { $remoteMessage = new RemoteMessage(false, 'Invalid filename supplied.'); echo $remoteMessage->getJson(); return; }

		require_once('apps/remoteServer/include/loadDataFile.php');
		loadDataFile($filePath);
		break;
	case 'saveDataFile':
		$data = (isset($_POST['data']) ) ? $_POST['data'] : '';
		$filename = (isset($_POST['filename']) ) ? $_POST['filename'] : '';
		$galleryName = (isset($_POST['galleryName']) ) ? $_POST['galleryName'] : '';
		$filePath = "gallery/$galleryName/data/$filename";

		if(empty($data)) { $remoteMessage = new RemoteMessage(false, 'No data.'); echo $remoteMessage->getJson(); return; }
		if(empty($filename)) { $remoteMessage = new RemoteMessage(false, 'No filename supplied.'); echo $remoteMessage->getJson(); return; }
		if(empty($galleryName)) { $remoteMessage = new RemoteMessage(false, 'No gallery supplied.'); echo $remoteMessage->getJson(); return; }
		if(!is_file($filePath)) { $remoteMessage = new RemoteMessage(false, 'Invalid filename supplied.'); echo $remoteMessage->getJson(); return; }

		require_once('apps/remoteServer/include/saveDataFile.php');
		saveDataFile($data, $filePath);
		break;
	case 'getImageList':
		$galleryName = (isset($_POST['galleryName']) ) ? $_POST['galleryName'] : '';
		if(empty($galleryName)) { $remoteMessage = new RemoteMessage(false, 'No gallery supplied.'); echo $remoteMessage->getJson(); return; }

		require_once('apps/remoteServer/include/getImageList.php');
		getImageList($galleryName);

		break;
	default:
		break;	
}
?>
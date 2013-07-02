<?php
/* 
This app will allow you to generate your own JSON or XML file from a gallery with columns and rows
One thing to note is that all files will have rows that have the same number of columns, and columns with the same number of rows.
Blank elements will be filled in with a dummy element. 
This is so the navigation front-end element doesn't trip over rows with different number of columns
*/
require_once('include/helper.php');
require_once('include/config.php');
require_once('apps/generateDataFile/include/json.php');
require_once('apps/generateDataFile/include/xml.php');

$filename = (isset($_GET['filename']) ) ? $_GET['filename'] : 'file';
// TODO: need to filter any slashes in the filename to get rid of invalid content
// look up regExp to get a valid filename

$fileType = (isset($_GET['fileType']) ) ? $_GET['fileType'] : 'xml';
$gallery = (isset($_GET['gallery']) ) ? $_GET['gallery'] : '';
// TODO: validate gallery to be only a string that is a valid Unix/Linux/Windows filepath

$cols = (isset($_GET['cols']) && is_numeric($_GET['cols'] )) ? $_GET['cols'] : '1';

$errorMessage = '';
if(!in_array($fileType, array('xml','json') ) ) { $errorMessage .= "<div>Invalid file type specified</div>"; }
if(empty($gallery)) { $errorMessage .=  "<div>No gallery supplied</div>"; }
if(!empty($errorMessage)) { echo $errorMessage; exit; }

$galleryDir = $galleryRoot . '/' . $gallery;

$galleryList = helper_trimFileList(scandir($galleryDir), $galleryDir);
if(empty($galleryList) ) { echo 'Gallery was empty'; return; }

switch($fileType)
{
	case 'json':
		$jsonDoc = generateJson($filename, $galleryList, $galleryDir, $cols);
	  header('Content-type: text/javascript');
	  echo $jsonDoc;
		break;
	case 'xml':
		$xmlDoc = generateXml($filename, $galleryList, $galleryDir, $cols);
		header('Content-type: text/xml');
		echo $xmlDoc;
		break;
}
?>
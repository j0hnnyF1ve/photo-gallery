<?php
// assume that we need to call a server to grab our xml
// expecting full path
$filename = isset($_GET['filename']) ? $_GET['filename'] : '';
if(empty($filename) || !is_file($filename) ) { exit('no file to edit'); }

require_once('include/config.php');
require_once('include/helper.php');

$walkthroughDir = 'apps/editWalkthrough';
$walkthroughJsDir = $walkthroughDir . '/js';

$scriptHtml = '';
$scriptFiles = helper_trimFileList(scandir($walkthroughJsDir), $walkthroughJsDir);
foreach($scriptFiles as $filePath) 
{
	$scriptFile = $walkthroughJsDir . '/' . $filePath;
	$scriptHtml .= '<script type="text/javascript" src="'.$scriptFile.'"></script>';
}
?>

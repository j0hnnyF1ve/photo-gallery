<?php
// assume that we need to call a server to grab our xml
// expecting full path
$filename = isset($_GET['filename']) ? $_GET['filename'] : '';
$galleryName = isset($_GET['galleryName']) ? $_GET['galleryName'] : '';
if(empty($filename) ) { exit('no file to edit'); }
if(empty($galleryName)) { exit('no gallery specified'); }

require_once('include/config.php');
require_once('include/helper.php');

$path = "gallery/$galleryName";
$dataPath = $path . "/data";

if(!is_file($dataPath . '/' . $filename) ) { exit('Invalid file'); } 

$walkthroughDir = 'apps/editWalkthrough';
$walkthroughJsDir = $walkthroughDir . '/js';

$scriptPath = $walkthroughJsDir;
$scriptHtml = '';

// create Script Html
if(is_dir($scriptPath))
{
  $scriptList = helper_trimFileDirList(scandir($scriptPath), $scriptPath);

  if(!empty($scriptList))
  {
    foreach($scriptList as $script)
    {
      if(is_dir($scriptPath .'/' . $script) ) 
      {
        if(strpos($script, 'helpers') !== false) { continue; }
        $secondaryScriptPath = $scriptPath .'/' . $script;

        $secondaryScriptList = helper_trimFileList(scandir($secondaryScriptPath), $secondaryScriptPath);
        if(!empty($secondaryScriptList) ) 
        {
          foreach($secondaryScriptList as $secondaryScript) 
          {
            $scriptHtml .= helper_addSpaces('<script type="text/javascript" src="' . $secondaryScriptPath .'/' . $secondaryScript . '"></script>', 16)  . chr(10);
          }
        }
      }
      else // TODO: This needs to be a recursive directory/file traversal someday
      {
        if(strpos($script, '.php') > 0) { $script .= $queryString; }
        $scriptHtml .= helper_addSpaces('<script type="text/javascript" src="' . $scriptPath .'/' . $script . '"></script>', 16)  . chr(10);
      }
    }
  }
}
?>

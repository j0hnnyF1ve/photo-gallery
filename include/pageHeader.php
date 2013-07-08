<?php
/* 
Server side code for preparing the page
*/

require_once('include/helper.php');
require_once('include/config.php');
require_once('include/Mobile_Detect.php');

$detect = new Mobile_Detect;
$deviceType = ($detect->isMobile() ? ($detect->isTablet() ? 'tablet' : 'phone') : 'computer');
$isPhone = (strpos($deviceType, 'phone') !== false) ? true : false;
$bodyClass = ($isPhone) ? 'class="mobile"' : '';

$page = isset($_GET['page']) ? $_GET['page'] : 'gallery_index';
$galleryTemplate = isset($_GET['galleryType']) ? $_GET['galleryType'] : 'thumbnail-grid'; // string that tells us how the gallery should be displayed
$debug = isset($_GET['debug']) ? true : false;

// var declarations
$pageCss = '';
$galleryCss = '';
$scriptHtml = '';

// create page CSS
if(!empty($page) && is_file('css/' . $page .'.css') ) {
  $pageCss .= helper_addSpaces('<link rel="stylesheet" href="css/' . $page . '.css" />', 2) . chr(10);
}

// create gallery CSS
if(!empty($galleryTemplate) )
{
  $stylesheetPath = $galleryTemplateRoot . '/' . $galleryTemplate . '/css';
  if(is_dir($stylesheetPath))
  {
    $stylesheetList = helper_trimFileList(scandir($stylesheetPath), $stylesheetPath);
    if(!empty($stylesheetList))
    {
      foreach($stylesheetList as $stylesheet)
      {
        $galleryCss .= helper_addSpaces('<link rel="stylesheet" href="' . $stylesheetPath .'/' . $stylesheet . '" />', 2) . chr(10);
      }
    }
  }
}

// create Script Html
if(!empty($galleryTemplate) )
{
  $queryString = '';
  foreach($_GET as $key => $val) {
    if(!empty($queryString) ) { $queryString .= '&'; }
    $queryString .= rawurlencode($key). '=' .rawurlencode($val);
  }
  if(!empty($queryString) ) { $queryString = '?' . $queryString; }

  $scriptPath = $galleryTemplateRoot . '/' . $galleryTemplate . '/js';

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
              if(strpos($secondaryScript, '.php') > 0) { $secondaryScript .= $queryString; }
              $scriptHtml .= helper_addSpaces('<script type="text/javascript" src="' . $secondaryScriptPath .'/' . $secondaryScript . '"></script>', 2)  . chr(10);
            }
          }
        }
        else // TODO: This needs to be a recursive directory/file traversal someday
        {
          if(strpos($script, '.php') > 0) { $script .= $queryString; }
          $scriptHtml .= helper_addSpaces('<script type="text/javascript" src="' . $scriptPath .'/' . $script . '"></script>', 2)  . chr(10);
        }
      }
    }
  }
}

$pageHtml = '';
ob_start();
// create page Html
if(strlen($page) > 0)
{
  if(is_file('page/' . $page . '.php') )
  {
    include('page/' . $page . '.php');
  }
  else
  {
    include('page/page_not_found.php');
  }
}
$pageHtml = ob_get_contents();
ob_end_clean();


// set the default mobile device width if it hasn't been set already
$mobileDeviceWidth = (!empty($mobileDeviceWidth) && (is_numeric($mobileDeviceWidth) || strpos($mobileDeviceWidth, 'device-width') >= 0) ) ? $mobileDeviceWidth : "device-width";

?>
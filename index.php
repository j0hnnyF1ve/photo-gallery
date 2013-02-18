<?php
/* APP NOTES
** index.php and the "page" folder are linked together
** Content from the "pages" folder must be called from index.php
*/
$page = isset($_GET['page']) ? $_GET['page'] : 'gallery_list';
$galleryRoot = 'gallery'; // root of the main gallery folder
$galleryTemplateRoot = 'gallery_templates';
$galleryTemplate = isset($_GET['galleryType']) ? $_GET['galleryType'] : 'thumbnail-grid'; // string that tells us how the gallery should be displayed
$debug = isset($_GET['debug']) ? true : false;
?>
<!DOCTYPE HTML>
<html>
  
  
<head>
  <title>A Road A Little Less Traveled</title>
  <link rel="stylesheet" href="css/main.css" />
<?php
if(!empty($page) && is_file('css/' . $page .'.css') ) {
  echo '<link rel="stylesheet" href="css/' . $page . '.css" />' . chr(10);
}
if(!empty($galleryTemplate) )
{
  $stylesheetPath = $galleryTemplateRoot . '/' . $galleryTemplate . '/css';
//  if(is_file($stylesheetPath))
  {
    $stylesheetList = scandir($stylesheetPath);
    $key = array_search('.', $stylesheetList);
    array_splice($stylesheetList, $key, 1);
    $key = array_search('..', $stylesheetList);
    array_splice($stylesheetList, $key, 1);
    
    if(!empty($stylesheetList))
    {
      foreach($stylesheetList as $stylesheet)
      {
        echo '<link rel="stylesheet" href="' . $stylesheetPath .'/' . $stylesheet . '" />' . chr(10);
      }
    }
  }
}
?>
  <script type="text/javascript" src="js/jquery.js"></script>
  <script type="text/javascript">
    var GLOBAL = {}; // define the GLOBAL object, so we know what values in the program are global
  </script>
  <script type="text/javascript" src="js/loaders.js"></script>
<?php
if(!empty($galleryTemplate) )
{
  $scriptPath = $galleryTemplateRoot . '/' . $galleryTemplate . '/js';
//  if(is_file($scriptPath))
  {
    $scriptList = scandir($scriptPath);
    $key = array_search('.', $scriptList);
    array_splice($scriptList, $key, 1);
    $key = array_search('..', $scriptList);
    array_splice($scriptList, $key, 1);
    
    if(!empty($scriptList))
    {
      foreach($scriptList as $script)
      {
        echo '<script type="text/javascript" src="' . $scriptPath .'/' . $script . '"></script>'  . chr(10);
      }
    }
  }
}
?>
</head>



<body>
  <div id="LoadScreen"></div>
  <div id="Lightbox"></div>
  <div id="Content">
<?php
  if(strlen($page) > 0)
  {
    if(is_file('page/' . $page . '.php') )
    {
      require_once('page/' . $page . '.php');
    }
    else
    {
      require_once('page/page_not_found.php');
    }
  }
?>
  </div>
</body>



</html>

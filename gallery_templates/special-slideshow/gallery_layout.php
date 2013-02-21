<?php
require_once('helper.php');

if(!is_dir($galleryRoot)) { exit 'Fatal error: Couldn\'t find gallery path!'; }

// var declarations
$galleryList = Array(),
$currentGalleryList = Array(),
$audioFileList = Array();

$currentGalleryName = '',
$currentGalleryDir = '';

$audioFileHtml = '',
$scriptHtml = '',
$imageScriptString = '';


// get the list of all galleries
$galleryList = helper_trimFileList( scandir($galleryRoot), $galleryRoot );

$currentGalleryName = isset($_GET['currentGallery']) ? $_GET['currentGallery'] : $galleryList[0];
if(!empty($currentGalleryList) ) 
{
  echo 'The gallery you selected was not found. ';
  return;
}

// get the current gallery list
$currentGalleryDir = $galleryRoot . '/' . $currentGalleryName;
if(is_dir($currentGalleryDir))
{
  $currentGalleryList = helper_trimFileList( scandir($currentGalleryDir), $currentGalleryDir );
}
else
{
  echo 'The gallery you selected was not found. ';
  return;
}

// write out audio html
if(is_dir($currentGalleryDir . '/audio') )
{
  $audioFileList = helper_trimFileList( scandir($currentGalleryDir . '/audio'), $currentGalleryDir . '/audio' );

  // generate the Audio Html
  if(!empty($audioFileList))
  {
    if($debug === true) {
      $audioFileHtml .= helper_addSpaces('<audio id="AudioTrack" controls="controls">', 6)  . chr(10);
    }
    else {
      $audioFileHtml .= helper_addSpaces('<audio id="AudioTrack" controls="controls">', 6)  . chr(10);
    }

    foreach($audioFileList as $audioFile)
    {
      $audioFileHtml .= helper_addSpaces('<source src="'.$currentGalleryDir. '/audio/' . $audioFile.'" type="audio/mpeg" />', 8)  . chr(10); // testing audio at this moment
    }
    $audioFileHtml .= helper_addSpaces('Sorry, audio is not available at this time', 8);
    $audioFileHtml .= helper_addSpaces('</audio>', 6) . chr(10);
  }
}

// write out current gallery list
if(!empty($currentGalleryList))
{
  // load the images into the application
  $imageScriptString = helper_addSpaces('var newImage;', 2) . chr(10);
  foreach($currentGalleryList as $img)
  {
    $imgPath = $currentGalleryDir.'/'. $img;
    if(is_file($imgPath) )
    {
      $info = pathinfo($imgPath);
      $dimensions = getimagesize($imgPath);
      $width = $dimensions[0]; $height = $dimensions[1];
      
      $caption = basename($img,'.'.$info['extension']);
      ob_start();

?>
  newImage = new Image(); 
  newImage.src = '<?php echo $imgPath; ?>';
  newImage.ogWidth = '<?php echo $width; ?>';
  newImage.ogHeight = '<?php echo $height; ?>';
  newImage.caption = '<?php echo $caption; ?>';
  newImage.onload = Loaders.imageLoadAction;
  GLOBAL.images.push(newImage);
<?php

      $imageScriptString .= ob_get_flush();
    }
  }
  
  // create script html
  ob_start();
?>
<script type="text/javascript">
  (function(){
  "use strict";
  
  GLOBAL.images = Array();
  GLOBAL.objectIndex = 0;
  GLOBAL.maxImgSize = 400;
  Loaders.detailedLoad = <?php echo isset($_GET['detailedLoad']) ? "true" : "false"; ?>;
  if(Loaders.detailedLoad !== true) { Loaders.showLoadingText(); }

  <?php echo $imageScriptString; ?>

  // an array of actions/functions
  GLOBAL.actionQueue = Array();
  
  })();
  /* end gallery layout code */
</script>  
<?php  
  $scriptHtml .= ob_get_flush();
  // load the special-slideshow-actions.js if it's available
  // holds the playable stack for the gallery
  if(is_dir($currentGalleryDir . '/js') && is_file($currentGalleryDir . '/js/special-slideshow-actions.js') )
  {
    $scriptHtml .= '<script type="text/javascript" src="' . $currentGalleryDir . '/js/special-slideshow-actions.js' . '" ></script>' . chr(10);
  }
}

// begin layout below
?>
  
<div id="Controls">
  <div id="ControlsContainer">
    <div>
      <?php echo $audioFileHtml; ?>
    </div>
    <div>
      <button onclick="GLOBAL.pauseShow()">Pause Show</button>
      <button onclick="GLOBAL.continueShow()">Continue Show</button>
      <button onclick="GLOBAL.startShow()">Restart Show</button>
    </div>
  </div>
  <div id="ControlsTab">Controls</div>
</div>
<?php echo $scriptHtml; ?>
<?php
require_once($_SERVER['DOCUMENT_ROOT'] . dirname($_SERVER['PHP_SELF']) . '/include/helper.php');
if(!is_dir($galleryRoot) ) { exit('Fatal error: Couldn\'t find gallery path!'); }


// var declarations
$galleryList = Array();
$currentGalleryList = Array();
$audioFileList = Array();

$currentGalleryName = '';
$currentGalleryDir = '';

$audioFileHtml = '';
$scriptHtml = '';
$imageScriptString = '';

$showAudioControls = false;


// get the list of all galleries
$galleryList = helper_trimFileList( scandir($galleryRoot), $galleryRoot );

$currentGalleryName = isset($_GET['currentGallery']) ? $_GET['currentGallery'] : $galleryList[0];
$showAudioControls = isset($_GET['showAudioControls']) ? true : false;
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
    if($showAudioControls === true) {
      $audioFileHtml .= helper_addSpaces('<audio id="AudioTrack" controls="controls">', 6)  . chr(10);
    }
    else {
      $audioFileHtml .= helper_addSpaces('<audio id="AudioTrack" >', 6)  . chr(10);
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
  foreach($currentGalleryList as $img)
  {
    $imgPath = $currentGalleryDir.'/'. $img;
    if(is_file($imgPath) )
    {
      $info = pathinfo($imgPath);
      $dimensions = getimagesize($imgPath);
      $width = $dimensions[0];
      $height = $dimensions[1];
      $caption = basename($img,'.'.$info['extension']);

      ob_start();
      ?>  addImageToQueue( { src: '<?php echo $imgPath; ?>', ogWidth: '<?php echo $width; ?>', ogHeight: '<?php echo $height; ?>', caption: '<?php echo $caption; ?>', callback: Loaders.imageLoadAction } );<?php
      echo chr(10);

      $imageScriptString .= ob_get_contents();
      ob_end_clean();
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
    $(window).ready(
      function()
      {
        Controls_Audio.audioTrack = document.getElementById('AudioTrack'); }
        Controls_Audio.audioTrack.muted = <?php echo isset($_GET['audioOff']) ? "true" : "false"; ?>
      }
    );
    
  
    // helper function to add images to the queue
    var addImageToQueue = function( params )
    {
      var newImage = new Image();
      
      newImage.src = params.src;
      newImage.ogWidth = params.ogWidth;
      newImage.ogHeight = params.ogHeight;
      newImage.caption = params.caption;
      newImage.onload = params.callback;
      GLOBAL.images.push(newImage);
    }
  
  <?php echo $imageScriptString; ?>
  
    // an array of actions/functions
    GLOBAL.actionQueue = Array();
    
    })();
    /* end gallery layout code */
  </script>  
<?php  
  $scriptHtml .= ob_get_contents();
  ob_end_clean();
  // load the special-slideshow-actions.js if it's available
  // holds the playable stack for the gallery
  if(is_dir($currentGalleryDir . '/js') && is_file($currentGalleryDir . '/js/special-slideshow-actions.js') )
  {
    $scriptHtml .= helper_addSpaces('<script type="text/javascript" src="' . $currentGalleryDir . '/js/special-slideshow-actions.js' . '" ></script>', 2) . chr(10);
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
        <button id="ControlsPause">Pause Show</button>
        <button id="ControlsContinue">Continue Show</button>
        <button id="ControlsRestart">Restart Show</button>
        <button id="ControlsAudioToggle">Audio On</button>
      </div>
    </div>
    <div id="ControlsTab">Controls</div>
  </div>
<?php echo $scriptHtml; ?>
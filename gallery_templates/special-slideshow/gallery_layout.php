<?php
$galleryList = scandir($galleryRoot);
// get rid of the . and .. operators in the directory list
foreach($galleryList as $file)
{
  if(is_dir($galleryRoot . '/' . $file) )
  {
    $key = array_search($file, $galleryList);
    array_splice($galleryList, $key, 1);
  }
}

$currentGalleryName = isset($_GET['currentGallery']) ? $_GET['currentGallery'] : $galleryList[0];
if(!empty($currentGallery) )
{
  echo 'The gallery you selected was not found. ';
  return;
}
$currentGalleryDir = $galleryRoot . '/' . $currentGalleryName;
if(is_dir($currentGalleryDir))
{
  $currentGallery = scandir($currentGalleryDir);
}
else
{
  echo 'The gallery you selected was not found. ';
  return;
}

// take out all directorys in the gallery
foreach($currentGallery as $file)
{
  if(is_dir($currentGalleryDir . '/' . $file) )
  {
    $key = array_search($file, $currentGallery);
    array_splice($currentGallery, $key, 1);
  }
}
$audioFileList = Array();
if(is_dir($currentGalleryDir . '/audio') )
{
  $audioFileList = scandir($currentGalleryDir . '/audio');
  
  // take out all directorys in the gallery
  foreach($audioFileList as $file)
  {
    if(is_dir($currentGalleryDir . '/audio/' . $file) )
    {
      $key = array_search($file, $audioFileList);
      array_splice($audioFileList, $key, 1);
    }
  }
}

echo '<div id="Controls">';
  echo '<div id="ControlsContainer">';
    echo '<div>';
      if(!empty($audioFileList))
      {
        if($debug === true) {
          echo '<audio id="AudioTrack" controls="controls">'  . chr(10);
        }
        else {
          echo '<audio id="AudioTrack" controls="controls">'  . chr(10);
        }
          foreach($audioFileList as $audioFile)
          {
            echo '<source src="'.$currentGalleryDir. '/audio/' . $audioFile.'" type="audio/mpeg" />'  . chr(10); // testing audio at this moment
          }
          echo 'Sorry, audio is not available at this time';
        echo '</audio>' . chr(10);
      }
    echo '</div>' . chr(10);
    echo '<div>';
      echo '<button onclick="GLOBAL.pauseShow()">Pause Show</button>';
      echo '<button onclick="GLOBAL.continueShow()">Continue Show</button>';
      echo '<button onclick="GLOBAL.startShow()">Restart Show</button>';
    echo '</div>' . chr(10);
    echo '<div>'. chr(10);
    
    echo '</div>'. chr(10);
  echo '</div>'. chr(10);
  echo '<div id="ControlsTab">';
    echo 'Controls';
  echo '</div>'. chr(10);
echo '</div>'. chr(10);

if(!empty($currentGallery))
{
  // load the images into the application
  $scriptString = 'var newImage;' . chr(10);
  foreach($currentGallery as $img)
  {
    $imgPath = $currentGalleryDir.'/'. $img;
    if(is_file($imgPath) )
    {
      $info = pathinfo($imgPath);
      $dimensions = getimagesize($imgPath);
      $width = $dimensions[0]; $height = $dimensions[1];
      
      $caption = basename($img,'.'.$info['extension']);
      $scriptString .= 'newImage = new Image(); ' . chr(10) .
        'newImage.src = \''. $imgPath . '\'; ' . chr(10) .
        'newImage.ogWidth = \'' . $width . '\'; ' . chr(10) .
        'newImage.ogHeight = \'' . $height . '\'; ' . chr(10) .
        'newImage.caption = \'' . $caption . '\'; ' . chr(10) .
        'newImage.onload = Loaders.imageLoadAction; ' . chr(10) . 
        'GLOBAL.images.push(newImage); ' . chr(10) . chr(10); 
    }
  }
?>
<script type="text/javascript">
  
(function(){
"use strict";
  
GLOBAL.images = Array();
GLOBAL.objectIndex = 0;
GLOBAL.maxImgSize = 400;
Loaders.detailedLoad = <?php echo isset($_GET['detailedLoad']) ? "true" : "false"; ?>;
if(Loaders.detailedLoad !== true) { Loaders.showLoadingText(); }

<?php
// create the images array
echo $scriptString;
?>

// an array of actions/functions
GLOBAL.actionQueue = Array();


})();
/* end gallery layout code */

</script>

<?php
  // load the special-slideshow-actions.js if it's available
  // holds the playable stack for the gallery
  if(is_dir($currentGalleryDir . '/js') && is_file($currentGalleryDir . '/js/special-slideshow-actions.js') )
  {
    echo '<script type="text/javascript" src="' . $currentGalleryDir . '/js/special-slideshow-actions.js' . '" ></script>' . chr(10);
  }
}

?>
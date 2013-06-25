<?php
$currentGalleryName = isset($_GET['currentGallery']) ? $_GET['currentGallery'] : '';
$thumbnailPlacement = isset($_GET['tnPlacement']) ? $_GET['tnPlacement'] : 'bottom';
if(!in_array($thumbnailPlacement, array('left', 'right', 'bottom') ) ) { $thumbnailPlacement = 'bottom'; }
if(!empty($currentGallery) )
{
  echo 'The gallery you selected was not found. ';
  return;
}
$currentGalleryDir = $galleryRoot . '/' . $currentGalleryName;
if(is_dir($currentGalleryDir))
{
  $currentGallery = helper_trimFileList(scandir($currentGalleryDir), $currentGalleryDir);
}
else
{
  echo 'The gallery you selected was not found. ';
  return;
}

$scriptHtml = '';
$imageScriptString = '';

// Create the gallery
// write out current gallery list
if(!empty($currentGallery))
{
  $imageScriptString = generateLoadImagesJs($currentGallery, $currentGalleryDir);
  
  // create script html
  ob_start();
?>
  <script type="text/javascript">
    (function(){
    "use strict";
    
    GLOBAL.images = new Array( new Array() );
    GLOBAL.objectIndex = 0;

    Loaders.detailedLoad = <?php echo isset($_GET['detailedLoad']) ? "true" : "false"; ?>;
    if(Loaders.detailedLoad !== true) { Loaders.showLoadingText(); }

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
  
    })();
    /* end gallery layout code */
  </script>  
<?php  
  $scriptHtml .= ob_get_contents();
  ob_end_clean();
  
  // load the walkthrough.js if it's available
  // holds the playable stack for the gallery
  if(is_dir($currentGalleryDir . '/js') && is_file($currentGalleryDir . '/js/walkthrough.js') )
  {
    $scriptHtml .= helper_addSpaces('<script type="text/javascript" src="' . $currentGalleryDir . '/js/walkthrough.js' . '" ></script>', 2) . chr(10);
  }
}


// DISPLAY SECTION
// display the title of the gallery
?>

<?php echo $scriptHtml; ?>

<h1><?php echo $currentGalleryName; ?></h1>
<div id="LayoutContainer">
  <div id="DisplayDiv">
    <img id="DisplayImg" />
  </div>

  <nav id="ThumbnailViewer">
    <div id="ThumbnailMenubar"></div>
    <div id="ThumbnailContent"></div>
  </nav>
</div>

<?php

function generateLoadImagesJs($gallery, $galleryDir)
{
  $imageScriptString = '';
  $index = 0;
  $col = 0;

  if(empty($gallery)) { return ''; }
  $galleryCount = count($gallery);
  foreach($gallery as $img)
  {
    $imgPath = $galleryDir.'/'. $img;
    if(is_file($imgPath) )
    {
      ob_start();

      $info = pathinfo($imgPath);
      $dimensions = getimagesize($imgPath);
      $width = $dimensions[0];
      $height = $dimensions[1];
      $caption = basename($img,'.'.$info['extension']);

      ?>  
          var param = 
          { src: '<?php echo addslashes($imgPath); ?>', 
            ogWidth: '<?php echo $width; ?>', 
            ogHeight: '<?php echo $height; ?>', 
            caption: '<?php echo addslashes($caption); ?>', 
            callback: Loaders.imageLoadAction };
          GLOBAL.images[<?php echo $col; ?>][<?php echo $index % 3; ?>] = param;

      <?php
      $index++;
      if($index % 3 === 0 && $index !== 0 && $index < $galleryCount) { 
        echo chr(10);
        $col++;
        echo '          GLOBAL.images['.$col.'] = new Array();'; 
      }
      $imageScriptString .= ob_get_contents();
      ob_end_clean();
    }
  }
  return $imageScriptString;
}
?>
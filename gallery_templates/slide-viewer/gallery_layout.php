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
  // load the images into the application
  foreach($currentGallery as $img)
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
      ?>  addImageToQueue( { src: '<?php echo addslashes($imgPath); ?>', ogWidth: '<?php echo $width; ?>', ogHeight: '<?php echo $height; ?>', caption: '<?php echo addslashes($caption); ?>', callback: Loaders.imageLoadAction } );<?php
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

    Loaders.detailedLoad = <?php echo isset($_GET['detailedLoad']) ? "true" : "false"; ?>;
    if(Loaders.detailedLoad !== true) { Loaders.showLoadingText(); }

    $(document).ready(
      function()
      {
        setupGallery();
        Actions.setActiveImage( { id: 0 } );
        Actions.switchImage( {image: GLOBAL.activeImage} );

        $(document).keydown(KeyActions.keydown);
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

    GLOBAL.thumbnailPlacement = '<?php echo $thumbnailPlacement; ?>';
    var thumbnailSize = 150;
    var setupGallery = function() {
      switch(GLOBAL.thumbnailPlacement) {
        case 'left':
          $('#LayoutContainer').addClass(GLOBAL.thumbnailPlacement);
          break;
        case 'right':
          $('#LayoutContainer').addClass(GLOBAL.thumbnailPlacement);
          break;
        case 'bottom':
        default:
          $('#LayoutContainer').addClass(GLOBAL.thumbnailPlacement);
          break;
      }

      var imageList = GLOBAL.images;
      for(var index in imageList)
      {
        var image = imageList[index];
        var ratio = image.ogHeight / image.ogWidth;

        $('<img />', 
          { 
            id: "Image" + index,
            src: image.src, 
            ogWidth: image.ogWidth,
            ogHeight: image.ogHeight,
            width: thumbnailSize, 
            height: thumbnailSize * ratio
          })
          .appendTo('#ThumbnailViewer'); 
      }

      $('#ThumbnailViewer')
        .mouseover( MouseActions.imgMouseOver )
        .mouseout( MouseActions.imgMouseOut )
        .mousedown( MouseActions.imgMouseDown )
        .mouseup( MouseActions.imgMouseUp );
    }
  
  <?php echo $imageScriptString; ?>
  
    })();
    /* end gallery layout code */
  </script>  
<?php  
  $scriptHtml .= ob_get_contents();
  ob_end_clean();
  
  // load the slide-viewer.js if it's available
  // holds the playable script for the gallery
  if(is_dir($currentGalleryDir . '/js') && is_file($currentGalleryDir . '/js/slide-viewer.js') )
  {
    $scriptHtml .= helper_addSpaces('<script type="text/javascript" src="' . $currentGalleryDir . '/js/slide-viewer.js' . '" ></script>', 2) . chr(10);
  }
}


// DISPLAY SECTION
// display the title of the gallery
?>

<h1><?php echo $currentGalleryName; ?></h1>

<?php echo $scriptHtml; ?>

<div id="LayoutContainer">
  <div id="DisplayDiv">
    <img id="DisplayImg" />
  </div>

  <div id="ThumbnailViewer">
  </div>
</div>
<?php header('Content-type: text/javascript'); ?>
<?php
// FIX THIS, USING photogallery as the app name, should be able to use something else to refer to the root
define('SITE_ROOT', '../../../');
require_once(SITE_ROOT . '/include/helper.php');
require_once(SITE_ROOT . '/include/config.php');
require_once(SITE_ROOT . '/include/Mobile_Detect.php');
require_once('helpers/image_loaders.php');

$detect = new Mobile_Detect;
$deviceType = ($detect->isMobile() ? ($detect->isTablet() ? 'tablet' : 'phone') : 'computer');
$isPhone = (strpos($deviceType, 'phone') !== false) ? true : false;

$currentGalleryName = isset($_GET['currentGallery']) ? $_GET['currentGallery'] : '';
$currentGalleryDir = $appRoot . '/' . $galleryRoot . '/' . $currentGalleryName;
$dataName = isset($_GET['data']) ? $_GET['data'] . '.xml' : 'walkthrough.xml';

// use the server directory to get the root
$serverGalleryDir = $_SERVER['DOCUMENT_ROOT'] . $currentGalleryDir;
$hasXml = false;

if(is_dir($serverGalleryDir))
{

  if(is_file($serverGalleryDir . '/data/' . $dataName) )
  { 
    $currentGallery = array();
    $hasXml = true;
    $xml = simplexml_load_file($serverGalleryDir . '/data/' . $dataName);
    $rowCount = 0;
    $colCount = 0;
    foreach($xml->row as $row) {
      $currentGallery[$rowCount] = array();
      foreach($row->file as $file) {
        if($file->path) {
          $currentGallery[$rowCount][$colCount++] = array('path' => $file->path);
        }
        else {
          $currentGallery[$rowCount][$colCount++] = array();
        }
      }
      $rowCount++;
      $colCount = 0;
    }
  }
  else {
    $currentGallery = helper_trimFileList(scandir($serverGalleryDir), $serverGalleryDir);
  }
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
  if($hasXml) {
    $imageScriptString = generateLoadImagesJsFromXml($currentGallery, $serverGalleryDir);
  }
  else { 
    $imageScriptString = generateLoadImagesJsFromFiles($currentGallery, $currentGalleryDir, $serverGalleryDir);
  }
  
  // create script html
  ob_start();
?>
GLOBAL.images = new Array( new Array() );
GLOBAL.objectIndex = 0;

Loaders.detailedLoad = <?php echo isset($_GET['detailedLoad']) ? "true" : "false"; ?>;
if(Loaders.detailedLoad !== true) { Loaders.showLoadingText(); }

<?php echo $imageScriptString; ?>

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

define('THUMBSIZE', ($isPhone) ? 75 : 50);
define('NAVIMGSIZE', ($isPhone) ? 125 : 100);
define('MAXIMGSIZE', ($isPhone) ? 400 : 450);

// script data begins
?>
// wrap in anonymous function to prevent namespace conflicts
(function(){
"use strict";

GLOBAL.activeImage = null; // current active image
GLOBAL.maxImgSize = <?php echo MAXIMGSIZE; ?>;  
GLOBAL.xid = 1; // the row id of the current element
GLOBAL.yid = 0; // the column id of the current element
GLOBAL.timeout = null; // timeout object used to clear timeouts

$(document).ready(
  function()
  {
    var midX = Math.floor(GLOBAL.images[0].length / 2);
    setupThumbnailViewer();

    Actions.setActiveImage( { xid: midX, yid: 0 } );
    Actions.switchImage( {image: GLOBAL.activeImage} );

    var message = 'This is a test of writing out a message.  This is very exciting because now we have a good way of adding a description to our gallery.';
    Message.setCurrent(message);

    setupNav();

    if('ontouchstart' in window) 
    {
      $(document).on('touchstart', UI.TouchHandler.touchstart);
    }
    else 
    {
      $(document).mousedown( UI.MouseHandler.mousedown )
    }

    if('ontouchend' in window) 
    {
      $(document).on('touchend', UI.TouchHandler.touchend);
    }
    else 
    {
      $(document).mouseup( UI.MouseHandler.mouseup );
    }

    $(document).keydown(UI.KeyHandler.keydown)
      .mouseover( UI.MouseHandler.mouseover )
      .mouseout( UI.MouseHandler.mouseout )
      .mousemove( UI.MouseHandler.mousemove )
      .resize( function() { Actions.setNavImagePos(); } )

    $('#MessageBox').click( UI.OptionsHandler.messageBoxClick );
    $('#MessageMode').click( UI.OptionsHandler.messageModeClick );

    /* for mobile browsers */
    $(window).on( 'orientationchange', function() { Actions.setNavImagePos(); } );

  }
);

<?php echo $scriptHtml; ?>

var navImgSize = <?php echo NAVIMGSIZE; ?>;
var thumbnailSize = <?php echo THUMBSIZE; ?>;

var setupNav = function() 
{
  $('img.navImg').width(navImgSize).height(navImgSize);
  Actions.setNavImages();
}

var setupThumbnailViewer = function() {
  var imageList = GLOBAL.images;
  var row;

  // go through the image array and take out all the images
//  for(var i=0; i < imageList.length; i++)
  for(var i=imageList.length-1; i >= 0; i--)
  {
    row = $('<div class="row"/>').appendTo('#ThumbnailContent');
    for(var j=0; j < imageList[i].length; j++)
//    for(var j=imageList[i].length-1; j >= 0; j--)
    {
      var image = imageList[i][j];
      var ratio = image.ogHeight / image.ogWidth;

      $('<img />', 
        { 
          id: "Image" + i + j,
          xid: j,
          yid: i,
          class: (image.src) ? 'thumb' : 'blank',
          src: (image.src) ? image.src : 'assets/blank.gif', 
          ogWidth: image.ogWidth,
          ogHeight: image.ogHeight,
          width: thumbnailSize, 
          height: thumbnailSize
        })
        .appendTo(row); 
      }
  }

  var numColumns = imageList[0].length;

  // TODO: limit the Thumbnail Viewer to 5 columns
  // if we have a layout with more than 5 columns (such as a layout with many columns, 1 row), then have a horizontal scrollbar
  $('#ThumbnailViewer')
    .appendTo('body')
    .height( (($('#ThumbnailViewer img:eq(0)').height() + 25) * 3) + $('#Options').height() );
 
  var newHeight = (window.height > 500) ? window.height : 500;
  $('#Content').height(newHeight);

  var newWidth = 110 + ( (numColumns - 1) * (thumbnailSize + 15) );
  $('#ThumbnailContent')
    .width( newWidth )
    .attr( {'maxWidth': newWidth});

  MenuActions.hideMenu();
  setTimeout( function() {$('#ThumbnailViewer').css('visibility', 'visible'); }, 1000);
}

})();
/* end gallery script */

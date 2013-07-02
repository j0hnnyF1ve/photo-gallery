<?php
require_once(SITE_ROOT . '/include/helper.php');
require_once(SITE_ROOT . '/include/config.php');

// generate the javascript image data to be loaded into the array
function generateLoadImagesJsFromFiles($gallery, $galleryDir, $serverDir)
{
  $imageScriptString = '';
  $index = 0;
  $row = 0;

  if(empty($gallery)) { return ''; }
  $galleryCount = count($gallery);
  foreach($gallery as $img)
  {
    $imgPath = $galleryDir.'/'. $img;
    $serverPath = $serverDir.'/'.$img;
    ob_start();
    if(is_file($serverPath) )
    {

      $info = pathinfo($imgPath);
      $dimensions = getimagesize($serverPath);
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
GLOBAL.images[<?php echo $row; ?>][<?php echo $index % 3; ?>] = param;
      <?php
      $index++;
      if($index % 3 === 0 && $index !== 0 && $index < $galleryCount) { 
        echo chr(10);
        $row++;
        echo 'GLOBAL.images['.$row.'] = new Array();'; 
      }
    }
    else 
    {
?>  
GLOBAL.images[<?php echo $i; ?>][<?php echo $j; ?>] = {};
<?php
    }
    $imageScriptString .= ob_get_contents();
    ob_end_clean();
  }
  ob_start();
?>

GLOBAL.images.numRows = <?php echo $row + 1; ?>;
GLOBAL.images.numCols = 3;
<?php
  $imageScriptString .= ob_get_contents();
  ob_end_clean();

  return $imageScriptString;
}

// generates javascript from images
// note that the relative path for the image is expected to be in there
function generateLoadImagesJsFromXml($galleryList, $serverDir) {
  if( empty($galleryList) ) { return ''; }

  $imageScriptString = '';
  $rowCount = count($galleryList);

  $imageScriptString .= "var param = '';";

  $count = 0;
  for($i=0; $i < $rowCount; $i++) {
    $colCount = count($galleryList[$i]);
    $imageScriptString .= chr(10) . 'GLOBAL.images['.$i.'] = new Array();'; 

    for($j=0; $j < $colCount; $j++) {

      if( empty($galleryList[$i][$j]) ) {
          ob_start();
?>  
GLOBAL.images[<?php echo $i; ?>][<?php echo $j; ?>] = {};
<?php
          $imageScriptString .= ob_get_contents();
          ob_end_clean();
      }
      else
      {
        $imgPath = $galleryList[$i][$j]['path'];

        $file = basename($imgPath);
        $serverPath = $serverDir.'/'.$file;

        if(is_file($serverPath) )
        {

          $info = pathinfo($imgPath);
          $dimensions = getimagesize($serverPath);
          $width = $dimensions[0];
          $height = $dimensions[1];
          $caption = basename($file,'.'.$info['extension']);

          ob_start();
          ?>  
param = 
{ src: '<?php echo addslashes($imgPath); ?>', 
  ogWidth: '<?php echo $width; ?>', 
  ogHeight: '<?php echo $height; ?>', 
  caption: '<?php echo addslashes($caption); ?>', 
  callback: Loaders.imageLoadAction };
GLOBAL.images[<?php echo $i; ?>][<?php echo $j; ?>] = param;
<?php
          $imageScriptString .= ob_get_contents();
          ob_end_clean();
        } // end if

      }
    } // end for j
  } // end for i

  ob_start();
?>

GLOBAL.images.numRows = <?php echo $rowCount; ?>;
GLOBAL.images.numCols = <?php echo count($galleryList[0]); ?>;
<?php
  $imageScriptString .= ob_get_contents();
  ob_end_clean();


  return $imageScriptString;
}

?>
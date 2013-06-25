<?php
$galleryList = scandir($galleryRoot);

// get rid of the . and .. operators in the directory list
$key = array_search('.', $galleryList);
array_splice($galleryList, $key, 1);
$key = array_search('..', $galleryList);
array_splice($galleryList, $key, 1);

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

// DISPLAY GALLERY SECTION

// display the title of the gallery
echo "<h1>$currentGalleryName</h1>"  . chr(10);

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

  if(!empty($audioFileList))
  {
    if($debug === true) {
      echo '<audio loop="loop" controls="controls">'  . chr(10);
    }
    else {
      echo '<audio loop="loop" autoplay="autoplay" controls="controls">'  . chr(10);
    }
      foreach($audioFileList as $audioFile)
      {
        echo '<source src="'.$currentGalleryDir. '/audio/' . $audioFile.'" type="audio/mpeg" />'  . chr(10); // testing audio at this moment
      }
      echo 'Sorry, audio is not available at this time';
    echo '</audio>';
  }
}


$thumbnailSize = 150; // temp parameter for thumbnail size, will use actual thumbs later
$count = 0;
echo '<div class="galleryRow">'  . chr(10);
foreach($currentGallery as $img)
{
  $filepath = $currentGalleryDir . '/' . $img;
  
  $dimensions = getimagesize($filepath);

//  if($debug === true) { echo print_r(getimagesize($filepath), true ); echo '<br/>'; }
  $width = $dimensions[0]; $height = $dimensions[1];
  // temp code to create proper thumbnails, need to change this later
//  if($width > $height)
  {
    $ratio = round($width/$height , 2);
    $imgWidth = $thumbnailSize;
    $imgHeight = round($thumbnailSize / $ratio, 0);
  }
/*
  else
  {
    $ratio = round($height/$width, 2);
    $imgWidth = round($thumbnailSize / $ratio, 0);
    $imgHeight = $thumbnailSize;
  }
*/  
//  if($debug === true) { echo $imgWidth . ' ' . $imgHeight . ' ' . $ratio . '<br/>'; }

  echo '<img width="'.$imgWidth.'" height="'.$imgHeight.'" src="'.$currentGalleryDir.'/'. $img .'" />'  . chr(10);
  
  $count++;
  if($count >= 4) { $count = 0;
    echo '</div><div class="galleryRow">'  . chr(10);
  }
}
echo '</div>'  . chr(10);
?>
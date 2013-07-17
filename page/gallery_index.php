<?php
/*
A special index for my travel photo galleries
*/
$galleryIndexList = helper_trimDirList(scandir(GALLERY_ROOT), GALLERY_ROOT);

if(empty($galleryIndexList))
{
  echo 'No galleries found.';
  return;
}

echo '<h1>My Photo Galleries</h1>';
echo '<ul id="GalleryIndex">';


$maxDim = ($isPhone) ? 330 : 375;
foreach($galleryIndexList as $gallery)
{
    if($gallery != 'Beaches and Scenery of Thailand') { continue; }
	$galleryDir = GALLERY_ROOT . '/' . $gallery;
	$galleryList = helper_trimFileList(scandir($galleryDir), $galleryDir);
	$galleryType = 'special-slideshow';

	$img = $galleryList[6];
//	$img = $galleryList[rand(0, count($galleryList) - 1)];

	$galleryTitle = $gallery;
	// hardcoded gallery name, should change later to read from xml or more standardized format
	switch($gallery)
	{
		case 'Visit Angkor Wat':
			$galleryType = 'walkthrough';
			$img = $galleryList[1];
			break;
		case 'Take Me Away':
			$galleryTitle .= ' (Audio Gallery)';
			break;
		default: 
			break;
	}

	$imgPath = $galleryDir . '/' . $img;
	$imgSize = getImageSize($imgPath);

	$imgWidth = $imgSize[0];
	$imgHeight = $imgSize[1];
	if($imgWidth > $imgHeight)
	{
		$ratio = $imgHeight / $imgWidth;
		$imgWidth = $maxDim;
		$imgHeight = ceil($imgWidth * $ratio);
	}
	else {
		$ratio = $imgWidth / $imgHeight;
		$imgHeight = $maxDim;
		$imgWidth = ceil($imgHeight * $ratio);
	}

  echo '<li>';

    echo '<a target="_blank" href="index.php?page=gallery&galleryType='.$galleryType.'&currentGallery='.rawurlencode($gallery).'">';
  	echo '<img src="'.$imgPath.'" width="'.$imgWidth.'" height="'.$imgHeight.'"/>';
    echo '</a>';

    // need to change this later when we write the .htaccess rewrite rules
    echo '<a target="_blank" href="index.php?page=gallery&galleryType='.$galleryType.'&currentGallery='.rawurlencode($gallery).'">'.$galleryTitle.'</a>';
  echo '</li>';
}

echo '</ul>';
?>
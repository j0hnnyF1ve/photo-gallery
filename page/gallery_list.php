<?php
$galleryList = scandir($galleryRoot);
$galleryListCount = count($galleryList);

// get rid of the . and .. operators in the directory list
$key = array_search('.', $galleryList);
array_splice($galleryList, $key, 1);
$key = array_search('..', $galleryList);
array_splice($galleryList, $key, 1);

if(empty($galleryList))
{
  echo 'No galleries found.';
  return;
}

echo '<h1>Photo Gallery List</h1>';
echo '<ul id="GalleryList">';
foreach($galleryList as $gallery)
{
  echo '<li>';
    // need to change this later when we write the .htaccess rewrite rules
    echo '<a target="_blank" href="index.php?page=gallery&currentGallery='.$gallery.'">'.$gallery.'</a>';
  echo '</li>';
}

foreach($galleryList as $gallery)
{
  echo '<li>';
    // need to change this later when we write the .htaccess rewrite rules
    echo '<a target="_blank" href="index.php?page=gallery&galleryType=special-slideshow&currentGallery='.$gallery.'">'.$gallery.' - Special Slideshow</a>';
  echo '</li>';
}

echo '</ul>';
?>
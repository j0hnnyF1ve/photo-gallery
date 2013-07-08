<?php
function getImageList($galleryName)
{
  $galleryDir = 'gallery/' . $galleryName;
  if(is_dir($galleryDir))
  {
    $imageList = helper_trimFileList(scandir($galleryDir), $galleryDir);
    if(!empty($imageList))
    {
      $remoteMessage = new RemoteMessage(true, "$galleryName has been fetched successfully.", $imageList); 
      echo $remoteMessage->getJson(); 
      return;
    }
  }

  $remoteMessage = new RemoteMessage(false, "$galleryName was unable to be fetched successfully"); 
  echo $remoteMessage->getJson(); 
}
?>
<?php
function loadDataFile($filepath) 
{
  $name = basename($filepath);
  $parentDir = dirname($filepath);

  $fileContents = file_get_contents($filepath);

  $remoteMessage = new RemoteMessage(true, "$name has been loaded successfully.", $fileContents); 
  echo $remoteMessage->getJson(); 
}
?>
<?php
$galleryTemplateFile = $galleryTemplateRoot . '/' . $galleryTemplate . '/gallery_layout.php';
if(is_file($galleryTemplateFile) )
{
  require_once($galleryTemplateFile);
}
?>
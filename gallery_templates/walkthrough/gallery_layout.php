<?php
$currentGalleryName = isset($_GET['currentGallery']) ? $_GET['currentGallery'] : '';
$mobileDeviceWidth = 800;

// DISPLAY SECTION
// display the title of the gallery
?>

<h1><?php echo $currentGalleryName; ?></h1>
<div id="LayoutContainer">
  <div id="DisplayDiv">
    <img class="navImg up" id="ImgUp" />
    <img class="navImg left" id="ImgLeft" />
    <img class="navImg right" id="ImgRight" />
    <img class="navImg down" id="ImgDown" />
    <img id="DisplayImg" />
    <div id="MessageBackground"></div>
    <span id="Message"></span>
  </div>

  <nav id="ThumbnailViewer">
    <div id="ThumbnailMenubar">
      <a id="ToggleLink">Photo Map</a>
    </div>
    <div id="Options">
      <div>
        <input type="checkbox" id="MessageBox" /><label for="MessageBox">Hide Description?</label>
      </div>
      <div>
        <input type="checkbox" id="MessageMode" /><label for="MessageMode">Show Description Quickly</label>
      </div>
    </div>
    <div id="ThumbnailContent"></div>
  </nav>
</div>


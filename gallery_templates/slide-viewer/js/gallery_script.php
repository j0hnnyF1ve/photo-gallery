<?php header('Content-type: text/javascript'); ?>

// wrap in anonymous function to prevent namespace conflicts
(function(){
"use strict";

GLOBAL.activeImage = null;
GLOBAL.maxImgWidth = 500;
GLOBAL.maxImgHeight = 500;
GLOBAL.maxImgSize = 450;  
GLOBAL.imageIndex = 0;
GLOBAL.thumbnailPlacement = '';
GLOBAL.timeout = null;

})();
/* end gallery script */
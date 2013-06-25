<?php header('Content-type: text/javascript'); ?>

// wrap in anonymous function to prevent namespace conflicts
(function(){
"use strict";

GLOBAL.activeImage = null;
GLOBAL.maxImgWidth = 500;
GLOBAL.maxImgHeight = 500;
GLOBAL.maxImgSize = 450;  
GLOBAL.xid = 1;
GLOBAL.yid = 0;
GLOBAL.timeout = null;

$(document).ready(
  function()
  {
    setupThumbnailViewer();
    Actions.setActiveImage( { xid: 1, yid: 0 } );
    Actions.switchImage( {image: GLOBAL.activeImage} );

    $(document).keydown(KeyActions.keydown)
      .mouseover( MouseActions.mouseOver )
      .mouseout( MouseActions.mouseOut )
      .mousedown( MouseActions.mouseDown )
      .mousemove( MouseActions.mouseMove )
      .mouseup( MouseActions.mouseUp );
  }
);



var thumbnailSize = 50;
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
          class: 'thumb',
          src: image.src, 
          ogWidth: image.ogWidth,
          ogHeight: image.ogHeight,
          width: thumbnailSize, 
          height: thumbnailSize * ratio
        })
        .appendTo(row); 
      }
  }

  $('#ThumbnailViewer')
    .appendTo('body')
    .offset( { left: $('#DisplayDiv').offset().left - 50, top: 50 } )
}

})();
/* end gallery script */
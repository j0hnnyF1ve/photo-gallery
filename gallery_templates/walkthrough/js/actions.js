// wrap in anonymous function to prevent namespace conflicts
var Actions = {};

(function(){
"use strict";


Actions.isActiveImage = function(xid, yid) {
	return (GLOBAL.xid === xid && GLOBAL.yid === yid);
}

// params should supply 2 parameters, an xid and a yid
Actions.setActiveImage = function(params) {
	var xid = params.xid,
			yid = params.yid;

	if( isNaN(xid) || isNaN(yid) ) { return; }
	if( !GLOBAL.images[yid][xid] ) { return; }
  if( GLOBAL.images[yid][xid].class === 'blank') { return; }

  if(GLOBAL.activeImage) { $('#Image' + GLOBAL.yid + GLOBAL.xid).css( {'border-color': '#fff', 'border-width': 1}); }

	GLOBAL.xid = xid;
	GLOBAL.yid = yid;
  GLOBAL.activeImage = GLOBAL.images[yid][xid];

  if(GLOBAL.activeImage) { $('#Image' + GLOBAL.yid + GLOBAL.xid).css({'border-color': 'yellow', 'border-width': 4}); }

  // get the offset by getting the thumbnail offset, and subtracting it from the container's offset
	var offset = $('#Image' + GLOBAL.yid + GLOBAL.xid).offset().top - $('#ThumbnailContent').offset().top + $('#ThumbnailContent').scrollTop() - ($('#ThumbnailContent').height() / 2) + ($('#Image' + GLOBAL.yid + GLOBAL.xid).height() / 2);

  Message.hide();
	clearTimeout(GLOBAL.timeout);
  // wait a bit before updating position of thumbnail cursor
	GLOBAL.timeout = setTimeout( (function(curOffset) { return function() { 
    $('#ThumbnailContent').animate( { scrollTop: curOffset, duration: 10 } ); 
    Actions.setNavImages();  
    Message.show(); 
    Message.setupCurrentPosition(); 
    Message.adjustSize();
    Message.cancel();
    Message.clear(); 
    Message.write();

  } })(offset), 300);
};

Actions.switchImage = function(params) {
	var curImage = params.image;
	if(!curImage) { return; }

  var width = (curImage.ogWidth) ? curImage.ogWidth : curImage.width,
      height = (curImage.ogHeight) ? curImage.ogHeight : curImage.height,
      ratio = 1;

  if(width > height) {
    ratio = height / width,
    width = GLOBAL.maxImgSize,
    height = GLOBAL.maxImgSize * ratio;
  }
  else {
    ratio = width / height,
    height = GLOBAL.maxImgSize,
    width = GLOBAL.maxImgSize * ratio;
  }

  $('#DisplayImg')
    .css('visibility', 'hidden')
    .attr('src', curImage.src)
    .width(width).height(height)
    .hide().css('visibility', 'visible')
    .fadeIn(300);

  if(curImage && curImage.description) 
  {
    Message.setCurrent(curImage.description);
  }
};

Actions.setNavImages = function() {
  var images = GLOBAL.images, 
    colId = parseInt(GLOBAL.xid, 10), rowId = parseInt(GLOBAL.yid, 10), 
    image;

  var setImage = function(img, curColId, curRowId) 
  {
    image = images[curRowId][curColId];
    if(!image || !image.src) { img.hide(); }
    else {
      img.show().attr({
          xid: curColId,
          yid: curRowId,
          src: (image.src) ? image.src : 'assets/blank.gif', 
          ogWidth: image.ogWidth,
          ogHeight: image.ogHeight
      });

    }
  };

  if(rowId + 1 < images.numRows) // up
  {
    setImage($('#ImgUp'), colId, (rowId+1) ) ;
  }
  else { $('#ImgUp').hide() }

  if(colId - 1 >= 0) // left
  {
    setImage($('#ImgLeft'), (colId-1), rowId);
  }
  else { $('#ImgLeft').hide() }

  if(colId + 1 < images.numCols) // right
  {
    setImage($('#ImgRight'), (colId+1), rowId);
  }
  else { $('#ImgRight').hide() }

  if(rowId - 1 >= 0) // down
  {
    setImage($('#ImgDown'), colId, (rowId-1) ) ;
  }
  else { $('#ImgDown').hide() }
  Actions.setNavImagePos();
}

Actions.setNavImagePos = function() {
  var spacing = 20;
  $('#ImgUp').css( { 
    'left': ($('#DisplayDiv').width() / 2) - ($('#ImgUp').width() / 2),
    'top': ($('#DisplayImg').offset().top - $('#DisplayDiv').offset().top) - $('#ImgUp').height() - spacing,
  } );
  $('#ImgLeft').css( { 
    'left': ($('#DisplayImg').offset().left - $('#DisplayDiv').offset().left) - $('#ImgLeft').width() - spacing,
    'top': ($('#DisplayImg').height() / 2) + $('#DisplayImg').offset().top - ($('#ImgRight').height() ),
  } );
  $('#ImgRight').css( { 
    'left': ($('#DisplayImg').offset().left + $('#DisplayImg').width() - $('#DisplayDiv').offset().left) + spacing,
    'top': ($('#DisplayImg').height() / 2) + $('#DisplayImg').offset().top - ($('#ImgRight').height() ),
  } );
  $('#ImgDown').css( { 
    'left': ($('#DisplayDiv').width() / 2) - ($('#ImgDown').width() / 2),
    'top': ($('#DisplayImg').offset().top + $('#DisplayImg').height() - $('#DisplayDiv').offset().top) + spacing,
  } );
}

})();
/* end actions.js script */
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

  if(GLOBAL.activeImage) { $('#Image' + GLOBAL.yid + GLOBAL.xid).css( {'border-color': '#fff', 'border-width': 1}); }

	GLOBAL.xid = xid;
	GLOBAL.yid = yid;
  GLOBAL.activeImage = GLOBAL.images[yid][xid];

  if(GLOBAL.activeImage) { $('#Image' + GLOBAL.yid + GLOBAL.xid).css({'border-color': 'yellow', 'border-width': 4}); }

  // get the offset by getting the thumbnail offset, and subtracting it from the container's offset
	var offset = $('#Image' + GLOBAL.yid + GLOBAL.xid).offset().top - $('#ThumbnailContent').offset().top + $('#ThumbnailContent').scrollTop() - ($('#ThumbnailContent').height() / 2) + ($('#Image' + GLOBAL.yid + GLOBAL.xid).height() / 2);

	clearTimeout(GLOBAL.timeout);
	GLOBAL.timeout = setTimeout( (function(curOffset) { return function() { $('#ThumbnailContent').animate( { scrollTop: curOffset, duration: 10 } ); } })(offset), 300);
}

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

	var margin = ( $('#DisplayDiv').height() - height ) / 2;
	$('#DisplayDiv').css( {'margin-top': margin } );
  $('#DisplayImg').hide().attr('src', curImage.src).width(width).height(height).fadeIn(1000);
}

})();
/* end actions.js script */
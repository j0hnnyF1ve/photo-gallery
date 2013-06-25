// wrap in anonymous function to prevent namespace conflicts
var Actions = {};

(function(){
"use strict";

Actions.isActiveImage = function(id) {
	return (GLOBAL.imageIndex == id);
}

Actions.setActiveImage = function(params) {
	var id = params.id;
	if( isNaN(id) )  { return; }

  if(GLOBAL.activeImage) { $('#Image' + GLOBAL.imageIndex).css( {'border-color': '#fff', 'border-width': 1}); }

	GLOBAL.imageIndex = id;
  GLOBAL.activeImage = GLOBAL.images[id];

  if(GLOBAL.activeImage) { $('#Image' + GLOBAL.imageIndex).css({'border-color': 'yellow', 'border-width': 4}); }

	//  $('#ThumbnailViewer').animate( { scrollLeft: $('#Image' + GLOBAL.imageIndex).offset().left - $('#ThumbnailViewer').offset().left } );

	var offset = (GLOBAL.thumbnailPlacement == 'left' || GLOBAL.thumbnailPlacement == 'right') ? 
		$('#Image' + GLOBAL.imageIndex).offset().top - $('#ThumbnailViewer').offset().top + $('#ThumbnailViewer').scrollTop() - ($('#ThumbnailViewer').height() / 2) + ($('#Image' + GLOBAL.imageIndex).height() / 2) :
		$('#Image' + GLOBAL.imageIndex).offset().left - $('#ThumbnailViewer').offset().left + $('#ThumbnailViewer').scrollLeft() - ($('#ThumbnailViewer').width() / 2) + ($('#Image' + GLOBAL.imageIndex).width() / 2);

	clearTimeout(GLOBAL.timeout);
	var params = '';
	if(GLOBAL.thumbnailPlacement == 'left' || GLOBAL.thumbnailPlacement == 'right') {
		params = { scrollTop: offset, duration: 100 };
	}
	else {
		params = { scrollLeft: offset, duration: 100 }
	}
	GLOBAL.timeout = setTimeout( (function(curParams) { return function() { $('#ThumbnailViewer').animate( curParams ); } })(params), 500);

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

	if(GLOBAL.thumbnailPlacement == 'left' || GLOBAL.thumbnailPlacement == 'right') 
	{
		var margin = ( $('#DisplayDiv').height() - height ) / 2;
		$('#DisplayDiv').css( {'margin-top': margin } );
	}

  $('#DisplayImg').hide().attr('src', curImage.src).width(width).height(height).fadeIn(1000);


}

})();
/* end actions.js script */
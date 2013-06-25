// wrap in anonymous function to prevent namespace conflicts

var MouseActions = {};
(function(){
"use strict";

MouseActions.imgMouseOver = function()
{
  this.style.cursor = 'pointer';
};

MouseActions.imgMouseOut = function()
{
  this.style.cursor = 'default'; 
};

MouseActions.imgMouseDown = function()
{
	if(!event.target.src) { return; }

	var imageId = event.target.id.replace('Image', '');
	if(Actions.isActiveImage(imageId) ) { return; }

	Actions.setActiveImage( {id: imageId } );
	Actions.switchImage( {image: event.target } );
};

MouseActions.imgMouseUp = function()
{
//  this.style.borderColor = '#fff';
};

})();
/* end gallery script */
// wrap in anonymous function to prevent namespace conflicts

var MouseActions = {};
(function(){
"use strict";

MouseActions.mouseOver = function()
{
	if(event.target.className === 'thumb' || event.target.id === 'ThumbnailMenubar')
	{
	  document.body.style.cursor = 'pointer';
	}
};

MouseActions.mouseOut = function()
{
	if(event.target.className === 'thumb' || event.target.id === 'ThumbnailMenubar')
	{
	  document.body.style.cursor = 'default'; 
	}
};

MouseActions.mouseDown = function()
{
	if(event.target.id === 'ThumbnailMenubar') { MenuActions.dragStart(event, true); }
	if(event.target != document) { event.preventDefault(); }
	if(!event.target.src || event.target.className !== 'thumb') { return; }

	var curXid = $(event.target).attr('xid'),
			curYid = $(event.target).attr('yid');

	if(Actions.isActiveImage(curXid, curYid) ) { return; }

	Actions.setActiveImage( { xid: curXid, yid: curYid } );
	Actions.switchImage( {image: event.target } );
};

MouseActions.mouseMove = function() {
	if(MenuActions.isDragOn() ) { MenuActions.dragMove(event); }
};

MouseActions.mouseUp = function()
{
	if(MenuActions.isDragOn() ) { MenuActions.dragEnd(event); }
};

})();
/* end gallery script */
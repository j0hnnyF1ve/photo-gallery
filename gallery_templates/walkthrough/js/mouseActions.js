// wrap in anonymous function to prevent namespace conflicts

var MouseActions = {};
(function(){
"use strict";

MouseActions.mouseOver = function(event)
{
	if(event.target.nodeName.toLowerCase() === 'a' || $(event.target).hasClass('thumb') || $(event.target).hasClass('navImg') || event.target.id === 'ThumbnailMenubar')
	{
	  document.body.style.cursor = 'pointer';
	}
};

MouseActions.mouseOut = function(event)
{
	if(event.target.nodeName.toLowerCase() === 'a' || $(event.target).hasClass('thumb') || $(event.target).hasClass('navImg') || event.target.id === 'ThumbnailMenubar')
	{
	  document.body.style.cursor = 'default'; 
	}
};

MouseActions.mouseDown = function(event)
{
	event.preventDefault(); 

	if(event.target.id === 'ToggleLink' || event.target.id === 'ThumbnailMenubar') { MenuActions.toggle(); }
//	if(event.target.id === 'ThumbnailMenubar') { MenuActions.dragStart(event, true); }
//	if(event.target != document) { event.preventDefault(); }
	if(!event.target.src || (!$(event.target).hasClass('thumb') && !$(event.target).hasClass('navImg')) ) { return; }

	var curXid = $(event.target).attr('xid'),
			curYid = $(event.target).attr('yid');

	if(Actions.isActiveImage(curXid, curYid) ) { return; }

	Actions.setActiveImage( { xid: curXid, yid: curYid } );
	Actions.switchImage( {image:  GLOBAL.activeImage } );
//	  Actions.setNavImages();
};

MouseActions.mouseMove = function(event) {
//	if(MenuActions.isDragOn() ) { MenuActions.dragMove(event); }
event.preventDefault();
};

MouseActions.mouseUp = function(event)
{
//	if(MenuActions.isDragOn() ) { MenuActions.dragEnd(event); }
event.preventDefault();
};

})();
/* end gallery script */
// wrap in anonymous function to prevent namespace conflicts

var MenuActions = {};
(function(){
"use strict";
	var dragTarget = null,
			hasHandle = false,
			isDrag = false,
			startX = 0,
			startY = 0,
			offsetX = 0,
			offsetY = 0;

	MenuActions.isDragOn = function() { return isDrag; };
	MenuActions.stopDrag = function() { MenuActions.isDrag = false; };

	MenuActions.dragStart = function(event, targetHasHandle)
	{
		dragTarget = event.target;
		hasHandle = targetHasHandle;
		isDrag = true;
		startX = event.x;
		startY = event.y;
		offsetX = event.offsetX;
		offsetY = event.offsetY;

		event.preventDefault();
	};

	MenuActions.dragMove = function(event)
	{
		if(!isDrag) { return; }

		var curX = startX - offsetX - (startX - event.x),
				curY = startY - offsetY - (startY - event.y);

		if(curX < 0) { curX = 0; }
		if(curY < 0) { curY = 0; }

		if(hasHandle) {
			$(dragTarget.parentNode).offset( { left: curX, top: curY });
		}
		else {
			$(dragTarget).offset( { left: curX, top: curY });
		}
		event.preventDefault();
	}

	MenuActions.dragEnd = function(event)
	{
		isDrag = false;
		event.preventDefault();
	}


})();
/* end gallery script */
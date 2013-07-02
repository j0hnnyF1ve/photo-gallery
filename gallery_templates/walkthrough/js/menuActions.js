// wrap in anonymous function to prevent namespace conflicts

var MenuActions = {};
(function(){
"use strict";
	var dragTarget = null,
			hasHandle = false,
			isDrag = false,
			startX = 0,
			startY = 0,
			targetOffsetX = 0,
			targetOffsetY = 0,
			mode = 'hide';

	MenuActions.showMenu = function() {
		$('#ThumbnailViewer').animate( { 'width': $('#ThumbnailContent').width() + $('#ThumbnailMenubar').width() + 8 }, { duration: 500 } )
//		$('#ThumbnailViewer').width('auto');
//		$('#ThumbnailContent')
//			.animate( { 'width': $('#ThumbnailContent').attr('maxWidth') }, { duration: 500, complete:  function() { $('#ThumbnailContent').css( {'overflow-y':'scroll'} ); $('#ThumbnailViewer').width($('#ThumbnailContent').width() + $('#ThumbnailMenubar').width() ) } } )
//		$('#ThumbnailContent')
//			.animate( { 'width': $('#ThumbnailContent').attr('maxWidth') }, { duration: 500 } );

		mode = 'show';
	};

	MenuActions.hideMenu = function() { 
		$('#ThumbnailViewer').animate( { 'width': $('#ThumbnailMenubar').width() }, { duration: 500 } )
//		$('#ThumbnailViewer').animate( { 'right': 0 - $('#ThumbnailViewer').width() + $('#ThumbnailMenubar').width() }, { duration: 500 } )
//		$('#ThumbnailViewer').width('auto');
//		$('#ThumbnailContent').css( {'overflow-y':'hidden'} ).animate( { 'width': 0 }, { duration: 500, complete: function() { $('#ThumbnailViewer').width( $('#ThumbnailMenubar').width() ); } } );
//		$('#ThumbnailContent').css( {'overflow-y':'hidden'} ).animate( { 'width': 0 }, { duration: 500 } );
		mode = 'hide';
	};


	MenuActions.toggle = function() {
		if(mode === 'show') { MenuActions.hideMenu(); }
		else if(mode === 'hide') { MenuActions.showMenu(); }
	};

	MenuActions.isDragOn = function() { return isDrag; };
	MenuActions.stopDrag = function() { MenuActions.isDrag = false; };

	MenuActions.dragStart = function(event, targetHasHandle)
	{
		dragTarget = event.target;
		hasHandle = targetHasHandle;
		isDrag = true;
		startX = event.pageX;
		startY = event.pageY;
		targetOffsetX = event.offsetX;
		targetOffsetY = event.offsetY;
//		targetOffsetX = $(event.target).offset().left;
//		targetOffsetY = $(event.target).offset().top;

		event.preventDefault();
	};

	MenuActions.dragMove = function(event)
	{
		if(!isDrag) { return; }

		var curX = startX - targetOffsetX - (startX - event.pageX),
				curY = startY - targetOffsetY - (startY - event.pageY);

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
var DragHandler = {};
// wrap in anonymous function to prevent namespace conflicts
(function(){
"use strict";
	var startTarget = null,
			dragTarget = null,
			dragTargetHandle = null,
			hasHandle = false,
			isDrag = false,
			startX = 0,
			startY = 0,
			endX = 0,
			endY = 0,
			targetOffsetX = 0,
			targetOffsetY = 0;

	DragHandler.isDragOn = function() { return isDrag; };
	DragHandler.stopDrag = function() { DragHandler.isDrag = false; };

	DragHandler.start = function(event, targetHasHandle)
	{
		var elToClone = (targetHasHandle) ? $(event.target).parent() : event.target;
		dragTargetHandle = (targetHasHandle) ? event.target : null;
		startTarget = elToClone;

		isDrag = true;
		startX = event.pageX;
		startY = event.pageY;
		endX = $(elToClone).offset().left,
		endY = $(elToClone).offset().top,
		targetOffsetX = (targetHasHandle) ? ($(dragTargetHandle).width() / 2) : $(elToClone).width() / 2;
		targetOffsetY = (targetHasHandle) ? ($(dragTargetHandle).height() / 2) : $(elToClone).height() / 2;

		var targetCss = (targetHasHandle) ? 
			{ 'position': 'absolute', 'left': startX - ($(dragTargetHandle).width() / 2), 'top': startY - ($(dragTargetHandle).height() / 2),  'opacity': 0.5 } :
			{ 'position': 'absolute', 'left': startX - targetOffsetX, 'top': startY - targetOffsetY, 'opacity': 0.6 };

		var target = $(elToClone).clone()
			.attr( { 'id': 'ActiveItem'} )
			.removeClass('draggable dropzone')
			.css( targetCss )
			.appendTo('body');
		dragTarget = target;
		hasHandle = targetHasHandle;
	};

	DragHandler.move = function(event)
	{
		if(!isDrag) { return; }

		var curX = startX - targetOffsetX - (startX - event.pageX),
				curY = startY - targetOffsetY - (startY - event.pageY);

		$(dragTarget).offset( { left: curX, top: curY });

		var windowWidth = Math.max( $(document).width(), $(window).width() ), 
				windowOffsetWidth = ($(dragTarget).width()/2),
				windowMaxX = windowWidth - windowOffsetWidth,
		    windowHeight = Math.max( $(document).height(), $(window).height() ), 
				windowOffsetHeight = ($(dragTarget).height()/2),
				windowMaxY = windowHeight - windowOffsetHeight,

				screenWidth = window.innerWidth, 
				screenHeight = window.innerHeight - 150, // where does this height come from??????
				scrollLeft = $(window).scrollLeft(),
				scrollTop = $(window).scrollTop();

		if(curX < 0) { curX = 0; }
		else if(curX > windowMaxX ) { curX = windowMaxX; }
		if(curY < 0) { curY = 0; }
//		else if(curY > windowMaxY ) { curY = windowMaxY; }

		var newScrollTop = 0,
				diff = 0,
				factor = 0.3; // factor affects the rate of the scroll 

		// near 100 pixels from bottom of screen
		if( (screenHeight - 100) - (curY - scrollTop) <= 0) 
		{
			diff = Math.round( (Math.abs( (screenHeight - 100) - (curY - scrollTop))) * factor);
			if(diff < 0) { diff = 0; }
			newScrollTop = scrollTop + 10 + diff;
		}
		// near top of screen
		else if(curY - scrollTop <= 0)
		{
			diff = Math.round(Math.abs(curY - scrollTop) * factor ) ;
			newScrollTop = scrollTop - 10 - diff ;
		}

		// prevent from scrolling past the end of the document
		if(newScrollTop !== 0 && newScrollTop <= (windowMaxY - screenHeight - 200))
		{
			$(window).scrollTop(newScrollTop);
		}
	}

	DragHandler.end = function(event)
	{
		var nodeName = dragTarget[0].nodeName.toLowerCase();
		
		var curX = event.pageX, curY = event.pageY;
 		var dropzones = $(nodeName + '.dropzone');
 		var numDropzones = dropzones.length; 
 		var left, top, right, bottom, isDropzone, curDropzone;

 		for(var i=0; i < numDropzones; i++) {
			curDropzone = dropzones[i];
			left = $(curDropzone).offset().left,
			top = $(curDropzone).offset().top,
			right = (1 * left + $(curDropzone).width() ), 
			bottom = (1 * top + $(curDropzone).height() ),
			isDropzone = false;

			if( (left <= curX && right >= curX) && (top <= curY && bottom >= curY) ) 
			{	
				isDropzone = true;	
				var clone = $(startTarget).clone()[0];

				// swap elements
//				if(curDropzone.parentNode === startTarget.parentNode) 
				{
					$(curDropzone).after(clone);
					$(startTarget).before(curDropzone);
					$(startTarget).remove();
				}
	 			break;
			}
 			
 			var elName = (hasHandle) ? $(curDropzone).children('h2').html() : $(curDropzone).attr('src');
 		}

 		var removeElement = function () {
 			$(dragTarget).remove(); dragTarget=null; dragTargetHandle=null;
 		}

 		if(isDropzone === false) {
			$(dragTarget).animate( 
				{	'left': endX, 'top':endY},
				{ duration: 200, complete: removeElement }
			);
 		}
 		else {
 			removeElement();
 		}
		
		isDrag = false;
	}

})();
/* end script */

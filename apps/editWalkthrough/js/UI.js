// UI is in charge of handling inputs from the UI (mouse/keyboard)
var UI = {};

// wrap in anonymous function to prevent namespace conflicts
(function(){
"use strict";
	var curTimeout = null;
	var curElement = null;

	// helper private function to change the current element
	var ui_helper_selectElement = function(element) 
	{
		if(curElement) { 
			$(curElement).removeClass('selected'); 
			console.log('changed element', curElement, element);
			curElement = null;
		}
		
		if(curElement === element) 
		{
			curElement = null;
			$(element).removeClass('selected');
		}
		else 
		{
			curElement = element;
			$(element).addClass('selected');
		}
	};

  UI.mouseOver = function(event) 
  {
  	var targetName = (event.target && event.target.nodeName) ? event.target.nodeName.toLowerCase() : '';
		if(targetName === 'img' || targetName === 'h2')
		{
		  document.body.style.cursor = 'pointer';
		}
  };

  UI.mouseOut = function(event)
  {
  	var targetName = (event.target && event.target.nodeName) ? event.target.nodeName.toLowerCase() : '';
		if(targetName === 'img' || targetName === 'h2')
		{
		  document.body.style.cursor = 'default'; 
		}
  };

  UI.mouseDown = function(event)
  {
  	if($(event.target).hasClass('draggable') ) 
  	{
  		if( $(event.target).hasClass('thumb') || $(event.target).hasClass('blank') ) 
  		{
  			ui_helper_selectElement(event.target);
  		}
  		var hasHandle = $(event.target).hasClass('handle');
  		
  		// have a slight timeout to make sure we want to drag
  		clearTimeout(curTimeout);
  		curTimeout = setTimeout(
  			(function(dragObjHasHandle) { 
  				return function() {
	  				DragHandler.start(event, dragObjHasHandle);
	  			}
  			})(hasHandle), 100);

			event.preventDefault();
  	}
  };

  UI.mouseMove = function(event)
  {
  	if(DragHandler.isDragOn() ) 
  	{
  		DragHandler.move(event);
  	}
			event.preventDefault();
  };

  UI.mouseUp = function(event)
	{
		clearTimeout(curTimeout);
  	if(DragHandler.isDragOn() ) 
  	{
  		DragHandler.end(event);
  	}
			event.preventDefault();
	};


})();
/* end script */

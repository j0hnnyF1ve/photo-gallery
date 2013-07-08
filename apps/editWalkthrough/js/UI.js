// UI is in charge of making changes to the UI
var UI = (UI) ? UI : {};

// wrap in anonymous function to prevent namespace conflicts
(function(){
"use strict";

var theSelectedElement = null; // holds the current element

UI.getActiveElement = function() { return theSelectedElement; }

UI.deselectElement = function() 
{
    $('.selected').removeClass('selected');
    theSelectedElement = null;
}

// function to change the current element
UI.selectElement = function(element) 
{
  if(theSelectedElement && theSelectedElement.id !== element.id ) // unselect the previous element
  {
    UI.deselectElement();
  }

	theSelectedElement = element;
	$(element).addClass('selected');
};

})();
/* end script */

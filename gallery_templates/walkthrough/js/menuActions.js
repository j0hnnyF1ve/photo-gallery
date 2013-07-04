// wrap in anonymous function to prevent namespace conflicts

var MenuActions = {};
(function(){
"use strict";
	var mode = 'hide';

	MenuActions.showMenu = function() {
		$('#ThumbnailViewer').animate( { 'width': $('#ThumbnailContent').width() + $('#ThumbnailMenubar').width() + 8 }, { duration: 500 } )
		mode = 'show';
	};

	MenuActions.hideMenu = function() { 
		$('#ThumbnailViewer').animate( { 'width': $('#ThumbnailMenubar').width() }, { duration: 500 } )
		mode = 'hide';
	};

	MenuActions.toggle = function() {
		if(mode === 'show') { MenuActions.hideMenu(); }
		else if(mode === 'hide') { MenuActions.showMenu(); }
	};

})();
/* end gallery script */
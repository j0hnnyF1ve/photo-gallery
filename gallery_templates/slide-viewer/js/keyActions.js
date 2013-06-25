// wrap in anonymous function to prevent namespace conflicts

var KeyActions = {};
(function(){
"use strict";

KeyActions.keydown = function() {
	if( event.keyCode in [37,38,39,40] ) { return; }

	switch(event.keyCode) {
		case 37: // left
			if(GLOBAL.thumbnailPlacement == 'bottom') { 
	      if(GLOBAL.imageIndex - 1 >= 0) { 
	      	Actions.setActiveImage( { id:GLOBAL.imageIndex - 1 } ); 
		      Actions.switchImage( {image: GLOBAL.activeImage} );
	      } 
				event.preventDefault();
			}
		break;
		case 38: // up
			if(GLOBAL.thumbnailPlacement == 'left' || GLOBAL.thumbnailPlacement == 'right') { 
	      if(GLOBAL.imageIndex - 1 >= 0) { 
	      	Actions.setActiveImage( { id:GLOBAL.imageIndex - 1 } ); 
		      Actions.switchImage( {image: GLOBAL.activeImage} );
	      } 
				event.preventDefault();
			}
			break;
		case 39: // right
			if(GLOBAL.thumbnailPlacement == 'bottom') { 
	      if((GLOBAL.imageIndex * 1) + 1 < GLOBAL.images.length) { 
	      	Actions.setActiveImage( { id:(GLOBAL.imageIndex * 1) + 1 } ); 
		      Actions.switchImage( {image: GLOBAL.activeImage} );
	      } 
				event.preventDefault();
			}
			break;
		case 40: // down
			if(GLOBAL.thumbnailPlacement == 'left' || GLOBAL.thumbnailPlacement == 'right') { 
	      if((GLOBAL.imageIndex * 1) + 1 < GLOBAL.images.length) { 
	      	Actions.setActiveImage( { id:(GLOBAL.imageIndex * 1) + 1 } ); 
		      Actions.switchImage( {image: GLOBAL.activeImage} );
	      } 
				event.preventDefault();
			}
			break;
		default: break;
	}
}

})();
/* end gallery script */
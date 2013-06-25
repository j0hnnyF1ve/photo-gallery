// wrap in anonymous function to prevent namespace conflicts

var KeyActions = {};
(function(){
"use strict";

KeyActions.keydown = function() {
	if( event.keyCode in [37,38,39,40] ) { return; }

	switch(event.keyCode) {
		case 37: // left
      if(GLOBAL.xid - 1 >= 0) { 
      	Actions.setActiveImage( { xid:GLOBAL.xid - 1, yid: GLOBAL.yid } ); 
	      Actions.switchImage( {image: GLOBAL.activeImage} );
      } 
			event.preventDefault();
			break;
		case 38: // up
      if((GLOBAL.yid * 1) + 1 < GLOBAL.images.length) { 
      	Actions.setActiveImage( { xid: GLOBAL.xid, yid:(GLOBAL.yid * 1) + 1 } ); 
	      Actions.switchImage( {image: GLOBAL.activeImage} );
      } 
			event.preventDefault();
			break;
		case 39: // right
      if((GLOBAL.xid * 1) + 1 < GLOBAL.images[GLOBAL.yid].length) { 
      	Actions.setActiveImage( { xid:(GLOBAL.xid * 1) + 1, yid: GLOBAL.yid } ); 
	      Actions.switchImage( {image: GLOBAL.activeImage} );
      } 
			event.preventDefault();
			break;
		case 40: // down
      if(GLOBAL.yid - 1 >= 0) { 
      	Actions.setActiveImage( { xid: GLOBAL.xid, yid:GLOBAL.yid - 1 } ); 
	      Actions.switchImage( {image: GLOBAL.activeImage} );
      } 
			event.preventDefault();
			break;
		default: break;
	}
}

})();
/* end gallery script */
// wrap in anonymous function to prevent namespace conflicts

var KeyActions = {};
(function(){
"use strict";

KeyActions.keydown = function(event) {
	if( !($.inArray(event.keyCode, [37,38,39,40]) >= 0 ) ) { return; }

	var xid = GLOBAL.xid, yid = GLOBAL.yid, changeImage = false;
	switch(event.keyCode) {
		case 37: // left
      if(GLOBAL.xid - 1 >= 0) { 
      	xid = 1 * xid - 1;
      	changeImage = true;
      } 
			break;
		case 38: // up
      if((GLOBAL.yid * 1) + 1 < GLOBAL.images.length) { 
      	yid = 1 * yid + 1;
      	changeImage = true;
      } 
			break;
		case 39: // right
      if((GLOBAL.xid * 1) + 1 < GLOBAL.images[GLOBAL.yid].length) { 
      	xid = 1 * xid + 1;
      	changeImage = true;
      } 
			break;
		case 40: // down
      if(GLOBAL.yid - 1 >= 0) { 
  			yid = 1 * yid - 1;
      	changeImage = true;
      } 
			break;
		default: break;
	}

	var keyAction = function(curXid, curYid) {
  	Actions.setActiveImage( { xid: curXid, yid: curYid } ); 
    Actions.switchImage( {image: GLOBAL.activeImage} );
	}

	if(changeImage == true && GLOBAL.images[yid][xid] != null && GLOBAL.images[yid][xid].src != null) {
		keyAction(xid, yid);
	}
	event.preventDefault();
}

})();
/* end gallery script */
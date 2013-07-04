// wrap in anonymous function to prevent namespace conflicts

var UI = (UI) ? UI : {};
UI.TouchHandler = {};
(function(){
"use strict";

UI.TouchHandler.touchstart = function(event) 
{
  //event.preventDefault();
};

UI.TouchHandler.touchend = function(event) {
  if(event.target.id === 'ToggleLink' || event.target.id === 'ThumbnailMenubar') { MenuActions.toggle(); }
  if(!event.target.src || (!$(event.target).hasClass('thumb') && !$(event.target).hasClass('navImg')) ) { return; }

  var curXid = $(event.target).attr('xid'),
      curYid = $(event.target).attr('yid');

  if(Actions.isActiveImage(curXid, curYid) ) { return; }

  Actions.setActiveImage( { xid: curXid, yid: curYid } );
  Actions.switchImage( {image:  GLOBAL.activeImage } );
};

})();
/* end UI.TouchHandler script */
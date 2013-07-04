// wrap in anonymous function to prevent namespace conflicts

var UI = (UI) ? UI : {};
UI.MouseHandler = {};
(function(){
"use strict";

UI.MouseHandler.mouseover = function(event)
{
  if(event.target.nodeName.toLowerCase() === 'a' || $(event.target).hasClass('thumb') || $(event.target).hasClass('navImg') || event.target.id === 'ThumbnailMenubar')
  {
    document.body.style.cursor = 'pointer';
  }
};

UI.MouseHandler.mouseout = function(event)
{
  if(event.target.nodeName.toLowerCase() === 'a' || $(event.target).hasClass('thumb') || $(event.target).hasClass('navImg') || event.target.id === 'ThumbnailMenubar')
  {
    document.body.style.cursor = 'default'; 
  }
};

UI.MouseHandler.mousedown = function(event)
{
  event.preventDefault(); 

};

UI.MouseHandler.mousemove = function(event) 
{

};

UI.MouseHandler.mouseup = function(event)
{
  if(event.target.id === 'ToggleLink' || event.target.id === 'ThumbnailMenubar') { MenuActions.toggle(); }
  if(!event.target.src || (!$(event.target).hasClass('thumb') && !$(event.target).hasClass('navImg')) ) { return; }

  var curXid = $(event.target).attr('xid'),
      curYid = $(event.target).attr('yid');

  if(Actions.isActiveImage(curXid, curYid) ) { return; }

  Actions.setActiveImage( { xid: curXid, yid: curYid } );
  Actions.switchImage( {image:  GLOBAL.activeImage } );
};

})();

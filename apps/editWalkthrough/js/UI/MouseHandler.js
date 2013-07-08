// UI is in charge of handling inputs from the UI (mouse/keyboard)
var UI = (UI) ? UI : {};
UI.MouseHandler = {};

// wrap in anonymous function to prevent namespace conflicts
(function(){
"use strict";

var curMouseTimeout = null;

UI.MouseHandler.mouseover = function(event) 
{
  var target = event.target;
  if(!target) { return; }
  var targetName = (target && target.nodeName) ? target.nodeName.toLowerCase() : '';
  if(targetName === 'img' || targetName === 'h2')
  {
    document.body.style.cursor = 'pointer';
  }

  if( !DragHandler.isDragOn()  && ( (targetName === 'img' && $(target).hasClass('thumb') ) || target.id === 'ImageEditor' || target.parentNode.id === 'ImageEditor') )
  {
    clearTimeout(curMouseTimeout);
    curMouseTimeout = setTimeout(
      (function() { return function() { Component.ImageEditor.create(target); } } )(), 500 );
  }
  else
  {
    clearTimeout(curMouseTimeout);
    Component.ImageEditor.remove();
  }
  $(event.target).attr('aTitle', $(event.target).attr('title') ).removeAttr('title');
  event.preventDefault();
};

UI.MouseHandler.mouseout = function(event)
{
  var target = event.target;
  var targetName = (target && target.nodeName) ? target.nodeName.toLowerCase() : '';
  if(targetName === 'img' || targetName === 'h2')
  {
    document.body.style.cursor = 'default'; 
    if(targetName !== 'img' && target.id !== 'ImageEditor' && target.parentNode.id != 'ImageEditor')
    {
      Component.ImageEditor.remove();
    }
  }
  $(target).attr('title', $(target).attr('aTitle') ).removeAttr('aTitle');
};

UI.MouseHandler.mousedown = function(event)
{
  var target = event.target;
  if(target.id === 'ImageBrowser' || target.parentNode.id === 'ImageBrowser') { return; }
  if(target.id !== 'ImageEditor' && target.parentNode.id !== 'ImageEditor') 
  { 
    Component.ImageEditor.remove(); 
  }


  if($(target).hasClass('draggable') )   
  {
    var hasHandle = $(target).hasClass('handle');
  
    if( $(target).hasClass('thumb') || $(target).hasClass('blank') || $(target).hasClass('handle') ) 
    {
      if( $(target).hasClass('handle') )
      {
        UI.selectElement(target.parentNode);
      }
      else
      {
        UI.selectElement(target);
      }
      Component.OptionsMenu.create(target);
    }

    // have a slight timeout to make sure we want to drag
    clearTimeout(curMouseTimeout);
    curMouseTimeout = setTimeout(
      (function(dragObjHasHandle) { 
        return function() {
          DragHandler.start(event, dragObjHasHandle);
        }
      })(hasHandle), 100);

    event.preventDefault();
  }
};

UI.MouseHandler.mousemove = function(event)
{
  if(DragHandler.isDragOn() ) 
  {
    DragHandler.move(event);
  }
  event.preventDefault();
};

UI.MouseHandler.mouseup = function(event)
{
  clearTimeout(curMouseTimeout);
  if(DragHandler.isDragOn() ) 
  {
    var dropzone = DragHandler.getCurDropzone(event, DragHandler.getCurTarget() );

    if(dropzone) {
      Component.OptionsMenu.create(dropzone);
    }
    DragHandler.end(event, dropzone);
  }
  event.preventDefault();
};

})();
/* end script */

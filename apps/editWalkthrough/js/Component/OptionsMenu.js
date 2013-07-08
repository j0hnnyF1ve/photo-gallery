// OptionsMenu handles the creation, rendering, and removal of the Options Menu
var Component = (Component) ? Component : {};
Component.OptionsMenu = {};

// wrap in anonymous function to prevent namespace conflicts
(function(){
"use strict";

var isActive = false;

Component.OptionsMenu.isVisible = function() {
  return isActive;
}

Component.OptionsMenu.create = function(curTarget)
{
  isActive = true;
  // remove any current options menus
  $('#Options').remove();
  $('<div/>', { id: 'Options' })
    .hide()
    .appendTo('body');


  // need to always use the current element, not the dropzone
  var curActiveElement = UI.getActiveElement();
  if(!$(curActiveElement).hasClass('blank') && !$(curActiveElement).hasClass('row') )
  {
    $('<button />', { id: 'Start' }).html('Make Startpoint').appendTo('#Options');
    $('<button />', { id: 'Delete' }).html('Delete').appendTo('#Options');

    $('#Start').click( Component.OptionsMenu.startpointButtonHandler );
    $('#Delete').click( Component.OptionsMenu.deleteButtonHandler );
  }
  else if( $(curActiveElement).hasClass('row')  )
  {
    $('<button />', { id: 'AddAbove' }).html('Add Row Above').appendTo('#Options');
    $('<button />', { id: 'AddBelow' }).html('Add Row Below').appendTo('#Options');
    $('<button />', { id: 'DeleteRow' }).html('Delete Row').appendTo('#Options');

    $('#AddAbove').click( Component.OptionsMenu.addRowButtonHandler );
    $('#AddBelow').click( Component.OptionsMenu.addRowButtonHandler );
    $('#DeleteRow').click( Component.OptionsMenu.deleteRowButtonHandler );
  }
  else // blank image
  {
    $('<button />', { id: 'Add' }).html('Add Image').appendTo('#Options');
    $('#Add').click( Component.OptionsMenu.addButtonHandler );
  }

  $('<button />', { id: 'Hide' }).html('Hide Options').appendTo('#Options');
  $('#Hide').click( Component.OptionsMenu.hideButtonHandler );

  var curLeft = $(curTarget).offset().left + $(curTarget).width() - $('#Options').width() - 5,
      curTop = $(curTarget).offset().top + 10;

  $('#Options')
    .css( { 
      'left': curLeft, 
      'top': curTop, 
      'zIndex': 100 } )
    .show();
};

Component.OptionsMenu.remove = function()
{
  isActive = false;
  $('#Options').remove();
}

Component.OptionsMenu.addRowButtonHandler = function(event) 
{
  var target = event.target;
  var curActiveElement = UI.getActiveElement();
  if(curActiveElement.nodeName.toLowerCase() !== 'div') { return; }

  switch(target.id)
  {
    case 'AddAbove':
      Ops.makeNewRow(curActiveElement, 'above');
      break;
    case 'AddBelow':
      Ops.makeNewRow(curActiveElement, 'below');
      break;
    default:
      break;
  }
}

Component.OptionsMenu.deleteRowButtonHandler = function(event)
{
  var curActiveElement = UI.getActiveElement();

  if(curActiveElement.nodeName.toLowerCase() !== 'div') { return; }

  Component.Dialog.show('Are you sure you wish to delete this?', 
    (function(obj) { return function() 
      { 
        Ops.deleteRow(obj); 
        Component.OptionsMenu.remove();
      } 
    })(curActiveElement ) 
  );  
}

Component.OptionsMenu.deleteButtonHandler = function(event)
{
  Component.Dialog.show('Are you sure you wish to delete this?', 
    (function(obj) { return function() 
      { 
        Ops.makeBlank(obj); 
        Component.OptionsMenu.create(obj);
      } 
    })(UI.getActiveElement() ) 
  );
};

Component.OptionsMenu.addButtonHandler = function(event)
{
  Component.ImageBrowser.show();
};

Component.OptionsMenu.startpointButtonHandler = function(event)
{
  var activeElement = UI.getActiveElement();
  $('.row img').removeClass('startpoint');
  $(activeElement).addClass('startpoint');
};

Component.OptionsMenu.hideButtonHandler = function(event)
{
  Component.OptionsMenu.remove();
};

})();
/* end script */

// Editor is in charge of editing photo specific info
var Component = (Component) ? Component : {};
Component.ImageEditor = {};

// wrap in anonymous function to prevent namespace conflicts
(function(){
"use strict";

var curElementToEdit = null;

Component.ImageEditor.create = function(curTarget)
{
  if( $('#ImageEditor').length ) { return; }
 
  curElementToEdit = curTarget;

  Component.ImageEditor.remove();
  $('<div/>', { id: 'ImageEditor' })
    .hide()
    .appendTo('body');

  $('<label />').html('Description').appendTo('#ImageEditor');
  $('<textarea />', { id: 'Description' }).val( $(curTarget).attr('description')).appendTo('#ImageEditor');

  var curLeft = $(curTarget).offset().left + ($(curTarget).width() / 2) - ($('#ImageEditor').width() / 2) ,
      curTop = $(curTarget).offset().top + 10;

  $('#ImageEditor')
    .css( { 
      'position': 'absolute', 
      'left': curLeft, 
      'top': curTop, 
      'zIndex': 100 } )
    .fadeIn(300);
};

Component.ImageEditor.remove = function()
{

  if(curElementToEdit)
  {
    $('#' + curElementToEdit.id).attr('description', $('#Description').val() );
  }

  $('#ImageEditor').remove();
};

})();
/* end script */

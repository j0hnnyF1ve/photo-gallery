// Dialog is in charge of popping up a dialog to the user
var Component = (Component) ? Component : {};
Component.Dialog = {};

// wrap in anonymous function to prevent namespace conflicts
(function(){
"use strict";

Component.Dialog.show = function(message, okCallback, cancelCallback)
{
  Component.Dialog.hide(); // get rid of any old dialogs

  $('body').append('<div class="dialog" id="Dialog"><div class="menubar">Attention</div><div class="message"></div><div class="buttons"><button id="OkButton">Yes</button><button id="CancelButton">Cancel</button></div></div>');
  $('body').append('<div class="dialogShadow" id="DialogShadow"></div>');

  $('#Dialog').hide();
  $('#Dialog .message').append(message);
  Component.Dialog.position();

  if(okCallback && typeof okCallback === 'function')
  {
    $('#OkButton').on('click', okCallback);
  }
  if(cancelCallback && typeof okCallback === 'function')
  {
    $('#CancelButton').on('click', okCallback);
  }
  $('#OkButton').on('click', Component.Dialog.hide);
  $('#CancelButton').on('click', Component.Dialog.hide);

  $('#Dialog').fadeIn(300);

  $(window).on( 'resize', Component.Dialog.position );
};

Component.Dialog.position = function() 
{
  var curLeft = (window.innerWidth / 2) - ( $('#Dialog').width() / 2),
      curTop = (window.innerHeight / 2) - ( $('#Dialog').height() / 2);

  $('#Dialog').css( { left: curLeft, top: curTop} );
};

Component.Dialog.hide = function() 
{
  $('#Dialog').remove();
  $('#DialogShadow').remove();

  $('#OkButton').off('click');
  $('#CancelButton').off('click');

  $(window).off( 'resize', Component.Dialog.position );
};


})();
/* end script */

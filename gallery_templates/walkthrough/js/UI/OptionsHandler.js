// wrap in anonymous function to prevent namespace conflicts

var UI = (UI) ? UI : {};
UI.OptionsHandler = {};
(function(){
"use strict";

UI.OptionsHandler.messageBoxClick = function(event) 
{
  if(event.target.checked)
  {
    Message.hide();
  }
  else 
  {
    Message.show();
  }
};

UI.OptionsHandler.messageModeClick = function(event) 
{
  if(event.target.checked)
  {
    Message.showQuickly();
  }
  else
  {
    Message.showSlowly();
  }
};

})();
/* end UI.OptionsHandler script */
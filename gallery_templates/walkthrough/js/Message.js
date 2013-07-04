// wrap in anonymous function to prevent namespace conflicts
var Message = {};

(function(){
"use strict";

var actionInterval = null;
var currentMessage = '';
var isMessageVisible = true;
var showMessageQuickly = false;

Message.setCurrent = function(message) { currentMessage = message; }
Message.getCurrent = function() { return currentMessage; }

Message.show = function() 
{
  isMessageVisible = true;
  $('#MessageBackground').show();
  $('#Message').show();
};

Message.hide = function() 
{
  isMessageVisible = false;
  $('#MessageBackground').hide();
  $('#Message').hide();
};

Message.showQuickly = function()
{
  showMessageQuickly = true;
  Message.clear();
  Message.write(currentMessage);
};

Message.showSlowly = function()
{
  showMessageQuickly = false;
  Message.clear();
  Message.write(currentMessage);
};

Message.write = function(curMessage)
{
  if(curMessage)
  {
    Message.setCurrent(curMessage);
    Message.adjustSize();
  }

  if(showMessageQuickly) {
    Message.cancel();
    $('#Message').hide().html(currentMessage).fadeIn(500);
  }
  else {
    Message.writeOut(currentMessage, 25);
  }
};

Message.writeOut = function(curMessage, ms) 
{
  var index = 0;
  var messageLength = (curMessage) ? curMessage.length : -1;
  if(!curMessage || messageLength <= 0) { return; }

  Message.cancel();
  actionInterval = setInterval(
    (function(message) {
      var messageLength = (message) ? message.length : -1;
      return function() 
      {
        if(!message || messageLength <= 0) { return; }

        $('#Message').append(message[index]);
        index++;
        // stop at 2000 characters if the loop gets out of hand
        if(index > messageLength || index > 2000) 
        {
          Message.cancel();
        }
      }
    })(curMessage)
  , ms)
};

Message.cancel = function() 
{
  clearInterval(actionInterval);
};

Message.clear = function() 
{
  $('#Message').html('');
};

Message.adjustSize = function()
{
  $('#Message').css('visibility', 'hidden').html(currentMessage);

  // if the new message is taller than the old one, we need to resize both boxes
  if($('#Message')[0].offsetHeight > $('#MessageBackground').height() )
  {
    var oldTop =  parseInt($('#MessageBackground').css('top'), 10),
      curTop = $('#Message')[0].offsetHeight - $('#MessageBackground').height();

    $('#MessageBackground')
      .height($('#Message')[0].offsetHeight)
      .css('top', oldTop - curTop)
    $('#Message').css('top', oldTop - curTop);
  }

  $('#Message').html('').css('visibility', 'visible');
}

Message.setupCurrentPosition = function()
{
  var borderLeftWidth = parseInt( $('#DisplayImg').css('borderLeftWidth'), 10);
  var borderTopWidth = parseInt( $('#DisplayImg').css('borderTopWidth'), 10);
  if(isNaN(borderLeftWidth)) { borderLeftWidth = 0; }
  if(isNaN(borderTopWidth)) { borderTopWidth = 0; }

  var paddingLeft = parseInt($('#Message').css('paddingLeft'), 10),
      paddingRight = parseInt($('#Message').css('paddingRight'), 10);
  if(isNaN(paddingLeft) ) { paddingLeft = 0; }
  if(isNaN(paddingRight) ) { paddingRight = 0; }

  $('#MessageBackground')
    .width($('#DisplayImg').width() )
    .css({ 
      'left': $('#DisplayImg').offset().left - $('#DisplayDiv').offset().left + borderLeftWidth, 
      'top': $('#DisplayImg').offset().top - $('#DisplayDiv').offset().top + borderTopWidth + $('#DisplayImg').height() - $('#MessageBackground').height()
  } );

  $('#Message')
    .width( $('#MessageBackground').width() - paddingLeft - paddingRight )
    .css({ 
      'left': parseInt( $('#MessageBackground').css('left'), 10), 
      'top': parseInt( $('#MessageBackground').css('top'), 10)
  } );
};

})();
/* end actions.js script */
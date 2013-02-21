/*
 * Dependencies:
 * jQuery
 */

var Controls = {};
/* Start Controls Definition */
(function() {
"use strict";  

Controls.curTimeout = null; // variable used to store the current timeout Id returned from setTimeout
Controls.curIndex = 0;        // stores the current place in the slideshow

Controls.toggleControls = function()
{
  if( $('#Controls').position().top >= 0)
  {
    Controls.hideControls();
  }
  else
  {
    Controls.showControls();
  }
};

Controls.showControls = function()
{
  $('#Controls').animate( { top: 0 }, {duration: 350} );
};

Controls.hideControls = function()
{
  $('#Controls').animate(
    { top: -$('#Controls').height() + parseInt($('#ControlsTab').css('padding-top'), 10 ) + parseInt($('#ControlsTab').css('padding-bottom'), 10 )  + $('#ControlsTab').height() },
    {duration: 350} );
};

Controls.startShow = function()
{
  setTimeout( function() { 
    // start the audio
    Controls_Audio.resetAudio(); Controls_Audio.startAudio();
    
    // reset everything, start over
    clearTimeout(Controls.curTimeout);
    Controls.playNextAction(0);
  }, 1000);
};

Controls.continueShow = function()
{
  // start the audio track from when it left off
  Controls_Audio.startAudio();
  Controls.playNextAction(Controls.curIndex);
};

Controls.pauseShow = function()
{
  // start the audio track from when it left off
  Controls_Audio.pauseAudio();
  clearTimeout(Controls.curTimeout);
};

// recursive function that plays the stack in sequence starting with the index supplied
Controls.playNextAction = function(index)
{
  var action = GLOBAL.actionQueue[index];

  // finished playing, no more actions, reset the index to 0
  if(!action) { Controls.curIndex = 0; return; }
  
  Controls.curIndex = index;
  
  // play the next action
  Controls.curTimeout = setTimeout( (function() { action.perform(); Controls.playNextAction(index+1); }), action.timeout );
};

// plays the entire stack without pause
Controls.playStack = function()
{
  // play the stack
  // NOTE: we need a way to stop the stack on command, right now we are just queueing
  var currentTimeout = 0;
  var helper_executeAction = function(action, timeout)
  {
    setTimeout(action, timeout);
  };
  
  for(var i=0; i < GLOBAL.actionQueue.length; i++)
  {
    currentTimeout += GLOBAL.actionQueue[i].timeout;
    // create an anonymous function to save the scope of the current action, and set a timeout to execute the appropriate action
    helper_executeAction(GLOBAL.actionQueue[i].perform, currentTimeout);
  }
};

})();
/* End Controls Definition */
<?php header('Content-type: text/javascript'); ?>
/* Dependencies:
 * jQuery and the $ jquery object is expected to exist
 */

if(GLOBAL === null) { GLOBAL = {}; }

// wrap in anonymous function to prevent namespace conflicts
(function(){
"use strict";

GLOBAL.interval = null,
GLOBAL.curTimeout = null,
GLOBAL.curIndex = 0, 
GLOBAL.numImagesLoaded = 0;
  
// initialize the show, showing the load screen 
$(document).ready(
  function()
  {
    $('#LoadScreen').show();
    $('#Controls')
      .show()
      .css( { left: $(window).width() / 2 - $('#Controls').width() / 2 } );
    $('#ControlsTab')
      .mouseover( function() { this.style.cursor = 'pointer'; } )
      .mouseout( function() { this.style.cursor = 'default'; } )
      .click( GLOBAL.toggleControls );
      
    GLOBAL.hideControls();
    
    GLOBAL.interval = setInterval( (
      function() {
        // check to see if all assets have been loaded... if so, then start the show!
        if(GLOBAL.numImagesLoaded >= GLOBAL.images.length)
        {
          if(GLOBAL.detailedLoad !== 'true') {
            Loaders.stopLoadingText();
          }
          else {
            $('#LoadScreen').html( $('#LoadScreen').html() + '<div>All assets have been loaded.</div>');    
          }
          // get rid of the load screen, quit checking for a finished load, clear the interval
          clearInterval(GLOBAL.interval);
          $('#LoadScreen').fadeOut(1500);
       
          // start the slide show
          GLOBAL.startShow();
        }        
      }),                           
      500);
  }
);

GLOBAL.toggleControls = function()
{
  if( $('#Controls').position().top >= 0)
  {
    GLOBAL.hideControls();
  }
  else
  {
    GLOBAL.showControls();
  }
};

GLOBAL.showControls = function()
{
  $('#Controls').animate( { top: 0 }, {duration: 350} );
};

GLOBAL.hideControls = function()
{
  $('#Controls').animate(
    { top: -$('#Controls').height() + parseInt($('#ControlsTab').css('padding-top'), 10 ) + parseInt($('#ControlsTab').css('padding-bottom'), 10 )  + $('#ControlsTab').height() },
    {duration: 350} );
};

GLOBAL.startShow = function()
{
  setTimeout( function() { 
    // start the audio
    GLOBAL.resetAudio(); GLOBAL.startAudio();
    
    // reset everything, start over
    clearTimeout(GLOBAL.curTimeout);
    GLOBAL.playNextAction(0);
  }, 1000);
};

GLOBAL.continueShow = function()
{
  // start the audio track from when it left off
  GLOBAL.startAudio();
  GLOBAL.playNextAction(GLOBAL.curIndex);
};

GLOBAL.pauseShow = function()
{
  // start the audio track from when it left off
  GLOBAL.pauseAudio();
  clearTimeout(GLOBAL.curTimeout);
};

GLOBAL.startAudio = function()
{
  var audioTrack = document.getElementById('AudioTrack');
  if(audioTrack !== null) { audioTrack.play();  }
};

GLOBAL.pauseAudio = function()
{
  var audioTrack = document.getElementById('AudioTrack');
  if(audioTrack !== null) { audioTrack.pause();  }  
};

GLOBAL.resetAudio = function()
{
  var audioTrack = document.getElementById('AudioTrack');
  if(audioTrack !== null) { audioTrack.currentTime = 0;  }
};

// recursive function that plays the stack in sequence starting with the index supplied
GLOBAL.playNextAction = function(index)
{
  var action = GLOBAL.actionQueue[index];

  // finished playing, no more actions, reset the index to 0
  if(action === null) { GLOBAL.curIndex = 0; return; }
  
  GLOBAL.curIndex = index;
  
  // play the next action
  GLOBAL.curTimeout = setTimeout( (function() { action.perform(); GLOBAL.playNextAction(index+1); }), action.timeout );
};

// plays the entire stack without pause
GLOBAL.playStack = function()
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
/* end special-slideshow-actions */
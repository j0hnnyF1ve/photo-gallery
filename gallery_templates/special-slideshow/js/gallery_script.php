<?php header('Content-type: text/javascript'); ?>
if(GLOBAL == null) { GLOBAL = {}; }
GLOBAL.interval = null,
GLOBAL.curTimeout,
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
      .click( toggleControls );
      
    hideControls();
    
    GLOBAL.interval = setInterval( (
      function() {
        // check to see if all assets have been loaded... if so, then start the show!
        if(GLOBAL.numImagesLoaded >= GLOBAL.images.length)
        {
          if(GLOBAL.detailedLoad != 'true') {
            stopLoadingText();
          }
          else {
            $('#LoadScreen').html( $('#LoadScreen').html() + '<div>All assets have been loaded.</div>');    
          }
          // get rid of the load screen, quit checking for a finished load, clear the interval
          clearInterval(GLOBAL.interval);
          $('#LoadScreen').fadeOut(1500);
       
          // start the slide show
          startShow();
        }        
      }),                           
      500);
  }
);

function toggleControls()
{
  if( $('#Controls').position().top >= 0)
  {
    hideControls();
  }
  else
  {
    showControls();
  }
}

function showControls()
{
  $('#Controls').animate( { top: 0 }, {duration: 350} );
}

function hideControls()
{
  $('#Controls').animate(
    { top: -$('#Controls').height() + parseInt($('#ControlsTab').css('padding-top') ) + parseInt($('#ControlsTab').css('padding-bottom') )  + $('#ControlsTab').height() },
    {duration: 350} );
}

function startShow()
{
  setTimeout( function() { 
    // start the audio
    resetAudio(); startAudio();
    
    // reset everything, start over
    clearTimeout(GLOBAL.curTimeout);
    playNextAction(0);
  }, 1000);
}

function continueShow()
{
  // start the audio track from when it left off
  startAudio();
  playNextAction(GLOBAL.curIndex)
}

function pauseShow()
{
  // start the audio track from when it left off
  pauseAudio();
  clearTimeout(GLOBAL.curTimeout);
}

function startAudio()
{
  var audioTrack = document.getElementById('AudioTrack');
  if(audioTrack != null) { audioTrack.play();  }
}

function pauseAudio()
{
  var audioTrack = document.getElementById('AudioTrack');
  if(audioTrack != null) { audioTrack.pause();  }  
}

function resetAudio()
{
  var audioTrack = document.getElementById('AudioTrack');
  if(audioTrack != null) { audioTrack.currentTime = 0;  }
}

// recursive function that plays the stack in sequence starting with the index supplied
function playNextAction(index)
{
  var action = GLOBAL.actionQueue[index];

  // finished playing, no more actions, reset the index to 0
  if(action == null) { GLOBAL.curIndex = 0; return; }
  
  GLOBAL.curIndex = index;
  
  // play the next action
  GLOBAL.curTimeout = setTimeout( (function() { action.perform(); playNextAction(index+1); }), action.timeout );
}

// plays the entire stack without pause
function playStack()
{
  // play the stack
  // NOTE: we need a way to stop the stack on command, right now we are just queueing
  var currentTimeout = 0;
  for(var i=0; i < GLOBAL.actionQueue.length; i++)
  {
    currentTimeout += GLOBAL.actionQueue[i].timeout;
    // create an anonymous function to save the scope of the current action, and set a timeout to execute the appropriate action
    ( function(action, timeout) { setTimeout(action, timeout); } )(GLOBAL.actionQueue[i].perform, currentTimeout);
  }
}

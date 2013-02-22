<?php header('Content-type: text/javascript'); ?>
/* Dependencies:
 * jQuery and the $ jquery object is expected to exist
 * Loaders is expected to exist because of page loader
 */

if(!GLOBAL) { GLOBAL = {}; }

// wrap in anonymous function to prevent namespace conflicts
(function(){
"use strict";

GLOBAL.curInterval = null,  // variable used to store the GLOBAL interval Id returned from setInterval
GLOBAL.defaultMouseoverHandler = function(self) {
  return function() { self.css( { cursor:'pointer' } ); };
}
GLOBAL.defaultMouseoutHandler = function(self) {
  return function() { self.css( { cursor:'default' } ); };
}
  
// initialize the show, showing the load screen 
$(document).ready(
  function()
  {
    $('#LoadScreen').show();
    $('#Controls')
      .show()
      .css( { left: $(window).width() / 2 - $('#Controls').width() / 2 } );
    $('#ControlsTab')
      .mouseover( GLOBAL.defaultMouseoverHandler( $('#ControlsTab') ) )
      .mouseout( GLOBAL.defaultMouseoutHandler( $('#ControlsTab') ) )
      .click( Controls.toggleControls );
    $('#ControlsPause')
      .mouseover( GLOBAL.defaultMouseoverHandler( $('#ControlsPause') ) )
      .mouseout( GLOBAL.defaultMouseoutHandler( $('#ControlsPause') ) )
      .click( (function() { Controls.pauseShow(); }) );
    $('#ControlsContinue')
      .mouseover( GLOBAL.defaultMouseoverHandler( $('#ControlsContinue') ) )
      .mouseout( GLOBAL.defaultMouseoutHandler( $('#ControlsContinue') ) )
      .click( (function() { Controls.continueShow(); }) );
    $('#ControlsRestart')
      .mouseover( GLOBAL.defaultMouseoverHandler( $('#ControlsRestart') ) )
      .mouseout( GLOBAL.defaultMouseoutHandler( $('#ControlsRestart') ) )
      .click( (function() { Controls.startShow(); }) );
    $('#ControlsAudioToggle')
      .mouseover( GLOBAL.defaultMouseoverHandler( $('#ControlsAudioToggle') ) )
      .mouseout( GLOBAL.defaultMouseoutHandler( $('#ControlsAudioToggle') ) )
      .click( (function(obj) { return function() { Controls_Audio.toggleAudioHandler(obj); }; })($('#ControlsAudioToggle')) );
      
    Controls.hideControls();
    
    GLOBAL.curInterval = setInterval( (
      function() {
        // check to see if all assets have been loaded... if so, then start the show!
        if(Loaders.numImagesLoaded >= GLOBAL.images.length)
        {
          if(Loaders.detailedLoad !== true) {
            Loaders.stopLoadingText();
          }
          else {
            $('#LoadScreen').html( $('#LoadScreen').html() + '<div>All assets have been loaded.</div>');    
          }
          // get rid of the load screen, quit checking for a finished load, clear the interval
          clearInterval(GLOBAL.curInterval);
          $('#LoadScreen').fadeOut(1500);
       
          // start the slide show
          Controls.startShow();
        }        
      }),                           
      500);
  }
);


})();
/* end gallery script */
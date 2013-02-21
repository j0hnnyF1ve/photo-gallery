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
      .click( Controls.toggleControls );
    $('#ControlsPause').click( (function() { Controls.pauseShow(); }) ;
    $('#ControlsContinue').click( (function() { Controls.continueShow(); }) ;
    $('#ControlsRestart').click( (function() { Controls.restartShow(); }) ;
      
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
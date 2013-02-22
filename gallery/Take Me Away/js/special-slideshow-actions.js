// only try to load actions if the actionStack is present
(function(){
"use strict";

if(GLOBAL.actionQueue !== null)
{
  var helper_createRandomFadeAnimations = function() {
    Actions.createRandomFades(1, 3000);
  };

  GLOBAL.actionQueue.push( {
    perform : function()
    {
      Controls_Audio.setTime(77);
      Controls_Audio.setVolume(0);
      Controls_Audio.startAudio();
      for(var i=0; i < 20; i++)
      {
        setTimeout( function() { Controls_Audio.increaseVolume(0.05); }, 100 * i);
      }
    },
    timeout : 3500
  } );  
  
  GLOBAL.actionQueue.push( { perform : helper_createRandomFadeAnimations, timeout : 500 } );  
  for(var i=0; i < 5; i++)
  {
    GLOBAL.actionQueue.push( { perform : helper_createRandomFadeAnimations, timeout : 3500 } );  
  }
  
  GLOBAL.actionQueue.push( {
    perform : function()
    {
      for(var i=0; i < 40; i++)
      {
        setTimeout( function() { Controls_Audio.decreaseVolume(0.025); }, 100 * i);
      }
      setTimeout( function() { Controls_Audio.pauseAudio(); }, 4100)
    },
    timeout : 3500
  } );   
}

})();
/* end special-slideshow-actions */
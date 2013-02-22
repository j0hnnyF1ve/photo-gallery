// only try to load actions if the actionStack is present
(function(){
"use strict";

if(GLOBAL.actionQueue !== null)
{
  /* Helper functions to do different common operations*/
  var helper_createRandomFadeAnimations = function() {
    Actions.createRandomFades(1, 3000);
  };

  var helper_generateRandomX = function() {
    return (Math.random() * ($(window).width() / 2) ) + ($(window).width() / 5);    
  }
  
  var helper_createSingleFadeAnimation = function(curX, curY) {
    return function() { Actions.createSingleFade( { x: curX, y: curY, interval: 3500, containerClass: 'postcardImageContainer' } ); }
  };
  
  var helper_createText = function(curText)
  {
    return function() {
      var curTextObj = TextActions.createText( { text: curText, z: 1000 } );
      $(curTextObj)
        .css( {
          left: ($(window).width() / 2) - (curTextObj.width() / 2),
          top: ($(window).height() / 2) - (curTextObj.height() / 2)
        } )
        .fadeIn(1000)
    }
  }
  
  var helper_createTextFadeAnimation = function(curText) {
    return function() { TextActions.fadeInText( { text: curText, z: 1000 } ); }
  };
  
  var helper_fadeInMusicHandler = function()
  {
    Controls_Audio.setTime(77);
    Controls_Audio.setVolume(0);
    Controls_Audio.startAudio();
    for(var i=0; i < 20; i++)
    {
      setTimeout( function() { Controls_Audio.increaseVolume(0.05); }, 100 * i);
    }
  };
  
  var helper_fadeOutMusicHandler = function()
  {
    for(var i=0; i < 40; i++)
    {
      setTimeout( function() { Controls_Audio.decreaseVolume(0.025); }, 100 * i);
    }
    setTimeout( function() { Controls_Audio.pauseAudio(); }, 4100)
  };
  
  var helper_pushToQueue = function(actionToPerform, curTimeout)
  {
    GLOBAL.actionQueue.push({ perform : actionToPerform, timeout : curTimeout });  
  };

  
  
  /* SET UP THE QUEUE */
  helper_pushToQueue(
    helper_createTextFadeAnimation('Wanna Get Away?'), 2000 );
  // fade in music
  helper_pushToQueue( helper_fadeInMusicHandler, 2000);
  // display images
  helper_pushToQueue( helper_createSingleFadeAnimation(), 500 );
  for(var i=0; i < 4; i++)
  {
    helper_pushToQueue( helper_createSingleFadeAnimation( helper_generateRandomX() ), 3500 );
  }

  helper_pushToQueue(
    helper_createTextFadeAnimation('Take a Journey To Amazing Places'), 2000 );
  // display images
  helper_pushToQueue( helper_createSingleFadeAnimation(), 500 );
  for(var i=0; i < 4; i++)
  {
    helper_pushToQueue( helper_createSingleFadeAnimation( helper_generateRandomX() ), 3500 );
  }
  
  helper_pushToQueue(
    helper_createTextFadeAnimation('Sample Delicious Foods'), 2000 );
  // display images
  helper_pushToQueue( helper_createSingleFadeAnimation(), 500 );
  for(var i=0; i < 4; i++)
  {
    helper_pushToQueue( helper_createSingleFadeAnimation( helper_generateRandomX() ), 3500 );
  }
  
  helper_pushToQueue(
    helper_createText('Come to Asia!'), 2000 );
  
  
  // fade out music and stop it
  helper_pushToQueue(helper_fadeOutMusicHandler, 3500);
}

})();
/* end special-slideshow-actions */
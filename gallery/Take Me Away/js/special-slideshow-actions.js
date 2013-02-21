// only try to load actions if the actionStack is present
(function(){
"use strict";

if(GLOBAL.actionQueue !== null)
{
  var action;
  var helper_createRandomFadeAnimations = function() {
    Actions.createRandomFades(1, 3000);
  };
  
  GLOBAL.actionQueue.push( { perform : helper_createRandomFadeAnimations, timeout : 500 } );  

  for(var i=0; i < 29; i++)
  {
    GLOBAL.actionQueue.push( { perform : helper_createRandomFadeAnimations, timeout : 3500 } );  
  }
}

})();
/* end special-slideshow-actions */
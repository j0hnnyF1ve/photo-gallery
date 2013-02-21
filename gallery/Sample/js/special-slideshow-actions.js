// only try to load actions if the actionStack is present
(function(){
"use strict";

if(GLOBAL.actionQueue !== null)
{
  var action;
  var helper_createRandomFadeAnimations = function() {
    Actions.createRandomFades(5, 3000);
  };
  
  action = {
    perform : helper_createRandomFadeAnimations,
    timeout : 500
  };
  GLOBAL.actionQueue.push(action);  

  for(var i=0; i < 29; i++)
  {
    action = {
      perform : helper_createRandomFadeAnimations,
      timeout : 16000
    };
    GLOBAL.actionQueue.push(action);  
  }
}

})();
/* end special-slideshow-actions */
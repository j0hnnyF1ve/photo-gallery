// only try to load actions if the actionStack is present
if(GLOBAL.actionQueue != null)
{
  var action;

    action = {
    perform : function() { createRandomFades(5, 3000); },
    timeout : 500
  };
  GLOBAL.actionQueue.push(action);  

  for(var i=0; i < 29; i++)
  {
    action = {
      perform : function() { createRandomFades(5, 3000); },
      timeout : 16000
    };
    GLOBAL.actionQueue.push(action);  
  }
}
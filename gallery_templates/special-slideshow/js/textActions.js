function createText(params)
{
  var textId = 'Text' + GLOBAL.objectIndex++;
  var text = (params != null && params.text != null) ? params.text : '';
  var curZ = (params != null && params.z != null ) ? params.z : 0;
  
  $('#Content').append(
    '<div id="' + textId+ '" class="text" >' + text + 
    '</div>');
  
  var textObject = $('#' + textId);
  textObject.css( {zIndex: curZ} )
  return textObject;
}

function moveText(params)
{
  if(params == null) { return; }
  if(params.textObj == null) { return; }
  if(params.x == null) { return; }
  if(params.y == null) { return; }
  var textObj = params.textObj;
  
  var curX = params.x - (textObj.width() / 2),
      curY = params.y - (textObj.height() / 2);

  textObj.css( { left: curX, top: curY } ); 
}

function slideText(params)
{
  if(params == null) { return; }
  if(params.textObj == null) { return; }
  if(params.x == null) { return; }
  if(params.y == null) { return; }
  if(params.animationTime == null ) { return; }

  var textObj = params.textObj;  
  
  var curX = params.x - (textObj.width() / 2),
      curY = params.y - (textObj.height() / 2)

  textObj.animate( { left: curX, top: curY }, { duration: params.animationTime } ); 
}
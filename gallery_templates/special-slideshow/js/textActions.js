/* NOTES:
 * Dependencies:
 * GLOBAL object must exist
 * GLOBAL.objectIndex must exist
 */

var TextActions = {} ;

/* Start TextActions Definition */
(function() {
"use strict";  

/* createText
 * function that creates a text object and returns it
 * 
 * parameters:
 * - params
 *   - text - text to be displayed
 *   - curZ - z index of the text
 */
TextActions.createText = function(params)
{
  var textId = 'Text' + GLOBAL.objectIndex++;
  var text = (params && params.text) ? params.text : '';
  var curZ = (params && params.z) ? params.z : 0;
  
  $('#Content').append(
    '<div id="' + textId+ '" class="text" >' + text + 
    '</div>');
  
  var textObject = $('#' + textId);
  textObject.css( {zIndex: curZ} );
  return textObject;
};

/* createText
 * function that creates a text object and returns it
 * 
 * parameters:
 * - params
 *   - x - x pos to place the CENTER of the text
 *   - y - y pos to place the CENTER of the text
 */
TextActions.fadeInText = function(params)
{
  var curText = TextActions.createText( { text: params.text, z: params.z } );
  
  params.x = ( (params.x) ? params.x : ($(window).width() / 2) ) - (curText.width() / 2);
  params.y = ( (params.y) ? params.y : ($(window).height() / 2) ) - (curText.height() / 2);
  
  curText
    .css( { left: params.x, top: params.y } )
    .fadeIn(1000)
    .delay(2000)
    .fadeOut(500, (function(myText) { var textToRemove = myText; var f = function() { textToRemove.remove(); }; return f; })(curText) );
}

TextActions.moveText = function(params)
{
  if(!params) { return; }
  if(!params.textObj) { return; }
  if(!params.x) { return; }
  if(!params.y) { return; }
  var textObj = params.textObj;
  
  var curX = params.x - (textObj.width() / 2),
      curY = params.y - (textObj.height() / 2);

  textObj.css( { left: curX, top: curY } ); 
};

TextActions.slideText = function(params)
{
  if(!params) { return; }
  if(!params.textObj) { return; }
  if(!params.x) { return; }
  if(!params.y) { return; }
  if(!params.animationTime) { return; }

  var textObj = params.textObj;  
  
  var curX = params.x - (textObj.width() / 2),
      curY = params.y - (textObj.height() / 2);

  textObj.animate( { left: curX, top: curY }, { duration: params.animationTime } ); 
};

})(); 
/* end TextActions Definition */

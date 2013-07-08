// OptionsMenu handles the creation, rendering, and removal of the Options Menu
var Ops = (Ops) ? Ops : {};
Ops.Editor = {};

// wrap in anonymous function to prevent namespace conflicts
(function(){
"use strict";

Ops.Editor.loadXml = function(xmlFile)
{
  $('#Editor').html('');
  var rows = xmlFile.getElementsByTagName('row');
  var html = '';

  var count = 0;
  for(var index=rows.length - 1; index >= 0; index--) 
  {
    var row = rows[index];

    html += '<div id="Row'+index+'" class="row dropzone"><h2 id="Handle'+index+'" class="draggable handle">' + row.nodeName.toUpperCase() + ' #' + index + '</h2>';

    var files = row.getElementsByTagName('file');
    for(var jIndex=0; jIndex < files.length; jIndex++) 
    {
      var file = files[jIndex];

      if(!file.hasChildNodes() ) { 
        html += '<img id="Item' + count + '" class="blank draggable dropzone" src="assets/blank.gif" alt="" title="" />';          
        count++;
        continue;
      }

      var child = $(file),
          path = child.children('path'),
          classes = 'thumb draggable dropzone';
      var startpoint = child.children('startpoint');
      if(startpoint[0] && startpoint[0].firstChild) {
        classes += ' startpoint';
      }
      
      html += '<img id="Item' + count + '" class="' + classes + '" src="' + path[0].firstChild.nodeValue + '" alt="' + path[0].firstChild.nodeValue + '" title="' + path[0].firstChild.nodeValue + '"';

      var description = child.children('description');
      if(description[0] && description[0].firstChild) {
        html += ' description = "' + description[0].firstChild.nodeValue + '"';
      }

      html += ' />';

      count++;
    }
    html += '</div>';
  }
  $(html).appendTo('#Editor');
};

Ops.Editor.createSaveFile = function()
{
  var rows = $.makeArray( $('#Editor').children('div.row') );   

  var saveData = [];
  var numRows = rows.length,
      numCols,
      row, cols, col;

  // save in reverse order, the bottom showing row is the 1st one
  for(var i=numRows-1; i >= 0; i--)
  {
    row = rows[i];
    cols = $.makeArray( $(row).children('img') );
    saveData[i] = [];

    numCols = cols.length;

    for(var j=0; j < numCols; j++) {
      col = cols[j];
      if(col && col.src.indexOf('blank.gif') < 0) 
      {  
        // TODO: In the future, when we have more elements than just the path, have it loop through all elements and add it to a blank object to be passed to the server
        saveData[i][j] = { 'path': col.title };
        if($(col).hasClass('startpoint') )
        {
          saveData[i][j].startpoint = 'true';
        }
        if($(col).attr('description') )
        {
          saveData[i][j].description = $(col).attr('description');
        }
      }
      else // put in an element with a blank path
      {
        saveData[i][j] = { 'path': '' };
      }
    }
  }  
  return saveData;
};

})();
/* end script */

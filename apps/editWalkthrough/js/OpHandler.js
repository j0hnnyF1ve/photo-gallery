// The OpHandler is in charge of handling operations sent to it by the UI
var OpHandler = {};

// wrap in anonymous function to prevent namespace conflicts
(function(){
"use strict";

OpHandler.loadHandler = function(xmlResponse) 
{
	if(!$.isXMLDoc(xmlResponse) ) { console.log('No data found!'); }
	$('#EditTitle span').append(' ' + GLOBAL.filename);

	var rows = xmlResponse.getElementsByTagName('row');
	var html = '';

	for(var index=rows.length - 1; index >= 0; index--) 
	{
		var row = rows[index];

		html += '<div class="row dropzone"><h2 class="draggable handle">' + row.nodeName + ' #' + index + '</h2>';

		var files = row.getElementsByTagName('file');
		for(var jIndex=0; jIndex < files.length; jIndex++) 
		{
			var file = files[jIndex];
			if(!file.hasChildNodes() ) { 
				html += '<img class="blank draggable dropzone" src="assets/blank.gif" alt="" title="" />';					
				continue;
			}

			for(var k=0; k < file.childNodes.length; k++) 
			{
				var child = file.childNodes[k];
				html += '<img class="thumb draggable dropzone" src="' + child.firstChild.nodeValue + '" alt="' + child.firstChild.nodeValue + '" title="' + child.firstChild.nodeValue + '"/>';
			}
		}
		html += '</div>';
	}
	$(html).appendTo('#Editor');
};

OpHandler.saveHandler = function(event) {
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
			}
			else // put in an element with a blank path
			{
				saveData[i][j] = { 'path': '' };
			}
		}
	}

	$.ajax({
		type: "POST",
		url: 'remoteServer.php?action=saveDataFile',
		data: { data: saveData, filename: GLOBAL.filename },
		dataType: 'json'
	}).done( OpHandler.saveResponseHandler );
};

OpHandler.saveResponseHandler = function(response) 
{
	console.log(response);
};

})();
/* end script */

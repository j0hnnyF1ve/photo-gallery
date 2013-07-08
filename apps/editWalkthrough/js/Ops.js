// The Ops is in charge of handling operations sent to it by the UI and the remote
var Ops = (Ops) ? Ops : {};

// wrap in anonymous function to prevent namespace conflicts
(function(){
"use strict";

Ops.saveResponseHandler = function(response) 
{
	if(!response) 
	{
		Ops.printMessage( { isError: true, message: 'Operation failed, please try again' } );
		return;
	}

	if(response && response.success && response.success === false) 
	{
		Ops.printMessage( { isError: true, message: 'Request was not successful' } );
		$('#SaveButton').hide();
		return;
	}

	Ops.printMessage( { isError: false, message: response.message } );
};

Ops.loadImageHandler = function(response)
{
	console.log(response);
}

Ops.printMessage = function(params)
{
	if(!params || !params.message) { return; }
	var message = params.message;

	var isError = (params.isError && typeof params.isError === 'boolean') ? params.isError : false;

	var messageClass = (isError) ? 'error' : 'success';
	$('#Message')
		.hide()
		.html(message)
		.removeClass('*').addClass(messageClass)
		.fadeIn(1000, 
			function() { 
				setTimeout(function() { $('#Message').fadeOut(500); }, 4000); 
		});
};

Ops.makeBlank = function(obj)
{
	if(!obj || !$(obj).hasClass('thumb', 'blank') ) { return; }

	$('#' + obj.id)
		.removeClass('thumb startpoint')
		.addClass('blank')
		.attr( { 'src': 'assets/blank.gif', 'title': '', 'alt': '' });
};

Ops.setImage = function(obj, src)
{
	$('#' + obj.id)
		.removeClass('blank')
		.addClass('thumb')
		.attr( { 'src': src, 'title': src, 'alt': src } );
}

Ops.makeNewRow = function(curTarget, order)
{
	if(!curTarget) { return; }

	var index = Ops.getNewRowIndex();

	if(index < 0) { Ops.printMessage( { isError: true, message: 'There was a problem adding a row: Couldn\'t get a proper index' } ); return; }

  var rowHtml = '<div id="Row'+index+'" class="row dropzone"><h2 id="Handle'+index+'" class="draggable handle">ROW# ' + index + '</h2>';

  var columnsLength = 5;
  for(var i=0; i < columnsLength; i++)
  {
	  rowHtml += '<img id="ItemNew' + index + '' + i + '" class="blank draggable dropzone" src="assets/blank.gif" alt="" title="" />';          
  }

	switch(order)
	{
		case 'above':
			$(curTarget).before(rowHtml);
			break;
		case 'below':
			$(curTarget).after(rowHtml);
			break;
		default:
			break;
	}
};

Ops.getNewRowIndex = function()
{
	var rowIndex = $('.row').length;

	while( $('#Row' + rowIndex).length > 0)
	{
		rowIndex++;
		if(rowIndex > 300) { return -99; }
	}
	return rowIndex;
};

Ops.deleteRow = function(curTarget) 
{
	if(!curTarget) { return; }

	$(curTarget).remove();
};

})();
/* end script */

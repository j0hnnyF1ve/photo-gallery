// The Remote is in charge of handling remote operations between the server and the client
var Remote = {};

// wrap in anonymous function to prevent namespace conflicts
(function(){
"use strict";

Remote.loadDataFile = function(in_filename, in_galleryName)
{
  $.ajax({
    type: "POST",
    url: 'remoteServer.php?action=loadDataFile',
    data: { filename: in_filename, galleryName: in_galleryName },
    dataType: 'json'
  }).done( Remote.loadHandler );

}

Remote.loadHandler = function(response) 
{
  if(response && response.success && response.success === false) 
  {
    Ops.printMessage( { isError: true, message: 'Request was not successful' } );
    $('#SaveButton').hide();
    return;
  }

  var xml = (new DOMParser() ).parseFromString(response.data, 'text/xml');
  if(!$.isXMLDoc(xml) ) 
  {
    Ops.printMessage( { isError: true, message: 'No data found!' } );
    $('#SaveButton').hide();
    return;
  }

  $('#SaveButton').show();
  $('#EditTitle span').append(' ' + GLOBAL.filename);

  Ops.Editor.loadXml(xml);
  Ops.printMessage( { isError: false, message: response.message } );
};

Remote.saveHandler = function(event) 
{
  var saveData = Ops.Editor.createSaveFile();

  $.ajax({
    type: "POST",
    url: 'remoteServer.php?action=saveDataFile',
    data: { data: saveData, filename: GLOBAL.filename, galleryName: GLOBAL.galleryName },
    dataType: 'json'
  }).done( Ops.saveResponseHandler );
};

Remote.fetchImages = function(callback) 
{
  $.ajax({
    type: "POST",
    url: 'remoteServer.php?action=getImageList',
    data: { galleryName: GLOBAL.galleryName },
    dataType: 'json'
  }).done( callback );
}

})();
/* end script */

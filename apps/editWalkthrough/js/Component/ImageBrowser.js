// UI is in charge of handling inputs from the UI (mouse/keyboard)
var Component = (Component) ? Component : {};
Component.ImageBrowser = {};

// wrap in anonymous function to prevent namespace conflicts
(function(){
"use strict";

var selectedImage = null;

Component.ImageBrowser.show = function()
{
  if($('#ImageBrowser').length )
  {
    Component.ImageBrowser.checkForUnusedImages();
    $('#ImageBrowser').show();
    $('#ImageBrowserShadow').show();

    $('#ReloadButton').on('click', Component.ImageBrowser.reload);
    $('#CancelButton').on('click', Component.ImageBrowser.hide);
    $('#ImageBrowser .imageList').on('click', Component.ImageBrowser.select);

    return;
  }
  // else, create the image browser

  $('body').append('<div class="dialog" id="ImageBrowser"><div class="menubar">Image Browser</div><div class="imageList"></div><div class="buttons"><button id="ReloadButton">Reload Images</button><button id="CancelButton">Cancel</button></div></div>');
  $('body').append('<div class="dialogShadow" id="ImageBrowserShadow"></div>');

  Component.ImageBrowser.position();

  $('#ReloadButton').on('click', Component.ImageBrowser.reload);
  $('#CancelButton').on('click', Component.ImageBrowser.hide);
  $('#ImageBrowser .imageList').on('click', Component.ImageBrowser.select);

  Component.ImageBrowser.reload();

  $(window).on( 'resize', Component.ImageBrowser.position );
};

Component.ImageBrowser.select = function(event)
{
  if(!event || !event.target) { return; }
  if(event.target.nodeName.toLowerCase() !== 'img' ) { return; }
  
  Ops.setImage(UI.getActiveElement(), event.target.src);

  Component.ImageBrowser.hide();
  Component.OptionsMenu.create( UI.getActiveElement() ); // reset the context menu
};

Component.ImageBrowser.reload = function()
{
  Remote.fetchImages( Component.ImageBrowser.populateBrowser );
};

Component.ImageBrowser.hide = function() 
{
  $('#ImageBrowser').hide();
  $('#ImageBrowserShadow').hide();
};

Component.ImageBrowser.position = function() 
{
  var curLeft = (window.innerWidth / 2) - ( $('#ImageBrowser').width() / 2),
      curTop = (window.innerHeight / 2) - ( $('#ImageBrowser').height() / 2);

  $('#ImageBrowser').css( { left: curLeft, top: curTop} );
};


Component.ImageBrowser.populateBrowser = function(response)
{
  if (response && response.success === true && response.data)
  {
    var data = response.data;
    var objList = [];

    for(var index in data)
    {
      var imgName = data[index];
      var imgPath = GLOBAL.path + '/' + imgName;

      objList.push('<img src="' + imgPath + '" />');
    }

    $('#ImageBrowser .imageList').html('');
    for(var i=0; i < objList.length; i++)
    {
      $('#ImageBrowser .imageList').append(objList[i]);
    }

    Component.ImageBrowser.checkForUnusedImages();
  }
};

Component.ImageBrowser.checkForUnusedImages = function()
{
  var images =  $('#ImageBrowser .imageList img');
  var imagesLength = images.length;
  var changeImagesList = [];

  var editorImages = $('div.row img.thumb');
  var editorImagesLength = editorImages.length;
  for(var i=0; i < imagesLength; i++)
  {
    if(!images[i] || images[i].nodeName.toLowerCase() !== 'img') { continue; }
    
    var image = images[i],
        imgPath = images[i].src,
        found = false;

    for(var j=0; j < editorImagesLength; j++)
    { 
      var curEditorImage = editorImages[j],
          curEditorImagePath = curEditorImage.src;
      if(imgPath === curEditorImage.src )
      {
        found = true;
        $(image).removeClass('unused');
        break;
      }
    }
    if(!found)
    {
      changeImagesList.push(image);
    }
  }

  var changeImagesListLength = changeImagesList.length;
  for(var i=0; i < changeImagesListLength; i++)
  {
    var clone = $(changeImagesList[i]).addClass('unused').clone();
    var parentNode = changeImagesList[i].parentNode;
    $(changeImagesList[i]).remove();
    $(parentNode).prepend(clone);
  }
};

})();
/* end script */

var Loaders = {};

(function(){
"use strict";

Loaders.detailedLoad = false,   // value that determines if we show a detailed load, or a regular load
Loaders.loadingInterval = null, // variable that holds the loadingInterval Id
Loaders.numImagesLoaded = 0,    // variable that holds the number of images currently loaded
Loaders.numOfPeriods = 0;       // variable that holds the number of periods currently showing in the Loading... text

Loaders.showLoadingText = function()
{
  $('#LoadScreen').html(
    '<div id="LoadingText" style="position: absolute; font: 30px Verdana">Loading...</div>'
  );

  var windowWidth   = $(window).width(),
      windowHeight  = $(window).height();

  var midPointX = windowWidth / 2 - $('#LoadingText').width() / 2,
      midPointY = windowHeight / 2 - $('#LoadingText').height() / 2;

  $('#LoadingText').css( { left: midPointX, top: midPointY } );
  Loaders.loadingInterval = setInterval(Loaders.animateLoadingText, 500);
};

Loaders.animateLoadingText = function()
{
  var loadingText = 'Loading';
  for(var i=0; i < Loaders.numOfPeriods; i++)
  {
    loadingText += '.';
  }
  $('#LoadingText').html(loadingText);
  Loaders.numOfPeriods = (Loaders.numOfPeriods + 1) % 4;
};

Loaders.stopLoadingText = function()
{
  clearInterval(Loaders.loadingInterval);
};

/*
 * Callback to be used with images
 * When an image loads, on a detailed load
 */
Loaders.imageLoadAction = function()
{
  if(GLOBAL !== null && Loaders.detailedLoad === 'true')
  {
    $('#LoadScreen').html( $('#LoadScreen').html() + '<div>' + this.src + ' was loaded.</div>');
  }
  Loaders.numImagesLoaded++;
};

})();
/* end Loaders */
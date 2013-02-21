var Loaders = {};

(function(){
"use strict";

Loaders.loadingInterval = null, // variable that holds the loadingInterval Id
Loaders.numOfPeriods = 0;

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

// updates the loading screen to show assets that have been loaded
Loaders.loadAction = function()
{
  if(GLOBAL !== null && GLOBAL.detailedLoad === 'true')
  {
    $('#LoadScreen').html( $('#LoadScreen').html() + '<div>' + this.src + ' was loaded.</div>');
  }
  GLOBAL.numImagesLoaded++;
};

})();
/* end Loaders */
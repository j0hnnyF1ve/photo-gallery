GLOBAL.loadingInterval = null,
GLOBAL.numOfPeriods = 0;
function showLoadingText()
{
  $('#LoadScreen').html(
    '<div id="LoadingText" style="position: absolute; font: 30px Verdana">Loading...</div>'
  );

  var windowWidth   = $(window).width(),
      windowHeight  = $(window).height();

  var midPointX = windowWidth / 2 - $('#LoadingText').width() / 2,
      midPointY = windowHeight / 2 - $('#LoadingText').height() / 2;

  $('#LoadingText').css( { left: midPointX, top: midPointY } );
  GLOBAL.loadingInterval = setInterval(animateLoadingText, 500);
}

function animateLoadingText()
{
  loadingText = 'Loading';
  for(var i=0; i < GLOBAL.numOfPeriods; i++)
  {
    loadingText += '.';
  }
  $('#LoadingText').html(loadingText);
  GLOBAL.numOfPeriods = (GLOBAL.numOfPeriods + 1) % 4;
}
function stopLoadingText()
{
  clearInterval(GLOBAL.loadingInterval);
}

// updates the loading screen to show assets that have been loaded
function loadAction()
{
  if(GLOBAL != null && GLOBAL.detailedLoad == 'true')
  {
    $('#LoadScreen').html( $('#LoadScreen').html() + '<div>' + this.src + ' was loaded.</div>');
  }
  GLOBAL.numImagesLoaded++;
}

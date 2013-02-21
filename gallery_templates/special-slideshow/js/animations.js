var Animations = {};

/* Start Animations Definition */
(function() {
"use strict";  

Animations.slider = function(params)
{
  // slide in, slide out
  if(!params) { return; }
  if(!params.container) { return; }
  if(!params.image) { return; }
  if(!params.caption ) { return; }

  var container = params.container;
  var image = params.image;
  var callback = (params.callback) ? params.callback : null;

  var windowWidth   = $(window).width(),
      windowHeight  = $(window).height();
      
  var mainImageWidth  = image.width(),
      mainImageHeight = image.height();
      
  var midPointX = windowWidth / 2 - mainImageWidth / 2,
      midPointY = windowHeight / 2 - mainImageHeight / 2;

  var startX = 0,
      startY = midPointY;

  var curZ = (params.z) ? params.z : 0;

  container.css(
  {
    left: startX + 'px',
    top: startY,
    zIndex: curZ,
    opacity: 0
  } );

  container
  .show()
  .animate( { opacity: 1, left: midPointX }, { duration: 750 } )
  .delay(1000)
  .animate( { opacity: 0.25, left: windowWidth + 100 },
            { duration: 750, complete: (function() { if(callback) { callback.call(); } container.remove(); } ) }
    ); 
};

Animations.randomSlider = function(params)
{
  // random slide in
  // also do tests to see if the params are jquery objects
  if(!params) { return; }
  if(!params.container) { return; }
  if(!params.image) { return; }
  if(!params.caption ) { return; }
  
  var container = params.container;
  var image = params.image;
  var callback = (params.callback) ? params.callback : null;
  
  var windowWidth   = $(window).width(),
      windowHeight  = $(window).height();

  var mainImageWidth  = image.width(),
      mainImageHeight = image.height();

  var midPointX = windowWidth / 2 - mainImageWidth / 2,
      midPointY = windowHeight / 2 - mainImageHeight / 2;
      
  var startX = Math.floor(Math.random() * (windowWidth - mainImageWidth) ),
      startY = Math.floor(Math.random() * (windowHeight - mainImageHeight) );

/*
*    // random slideout
  var randX = Math.floor(Math.random() * 2);
  var randY = Math.floor(Math.random() * 2);
  
  var endX = (randX >= 1) ? 0 - mainImageWidth - 100 : windowWidth + 100;
  var endY = (randY >= 1) ? 0 - mainImageHeight - 100 : windowHeight + 100;
*/
  // slideout opposite the start quadrant
  var endX = (startX > midPointX) ? 0 - mainImageWidth - 100 : windowWidth + 100;
  var endY = (startY > midPointY) ? 0 - mainImageHeight - 100 : windowHeight + 100;

  var curZ = (params.z) ? params.z : 0;
  
  container.css(
  {
    left: startX,
    top: startY,
    zIndex: curZ,
    opacity: 0
  } )
    .show()
    .animate(
      { opacity: 1, left: midPointX, top: midPointY },
      { duration: 750 }
    )
    .delay(1000)
    .animate(
      { opacity: 1, left: endX, top: endY },
      { duration: 750, complete: (function() { if(callback) { callback.call(); } container.remove(); } ) }
    );

};

Animations.fadeIn = function(params)
{
  // fadeIn
  // also do tests to see if the params are jquery objects
  if(!params) { return; }
  if(!params.container) { return; }
  if(!params.image) { return; }
  if(!params.caption ) { return; }
  
  var container = params.container;
  var image = params.image;
  var callback = (params.callback) ? params.callback : null;

  var windowWidth   = $(window).width(),
      windowHeight  = $(window).height();

  var mainImageWidth  = image.width(),
      mainImageHeight = image.height();

  var midPointX = windowWidth / 2 - mainImageWidth / 2,
      midPointY = windowHeight / 2 - mainImageHeight / 2;

  var curX = (params.x) ? params.x : midPointX;
  var curY = (params.y) ? params.y : midPointY;
  var curZ = (params.z) ? params.z : 0;

  container
    .css(
    {
      left: curX + 'px',
      top: curY + 'px',
      zIndex: curZ
    } )
    .fadeIn(1000)
    .delay(1000)
    .fadeOut(500, (function() { if(callback !== null) { callback.call(); } container.remove(); }) );
};

Animations.show = function(params)
{
  // also do tests to see if the params are jquery objects
  if(!params) { return; }
  if(!params.container) { return; }
  if(!params.image) { return; }
  if(!params.caption ) { return; }
 
  var container = params.container;
  var callback = (params.callback) ? params.callback : null;

  var curX = (params.x) ? params.x : 0;
  var curY = (params.y) ? params.y : 0;
  var curZ = (params.z) ? params.z : 0;
  
  container
    .css(
    {
      left: curX + 'px',
      top: curY + 'px',
      zIndex: curZ
    } ).show();
    
  if(callback) { callback.call(); container.remove(); }
};

Animations.textFade = function(params)
{
  // also do tests to see if the params are jquery objects
  if(params === null) { return; }
  if(params.textObj === null) { return; }

  var textObj = params.textObj;
  var callback = (params.callback) ? params.callback : null;

  textObj.fadeIn(1000)
      .delay(3000)
      .fadeOut(500, ( function() { if(callback) { callback.call(); } } ) );  
};

})(); 
/* end Animations Definition */













/*
// SAMPLE CODE TO DEMONSTRATE ANIMATION TYPES


function createRandomImageAndAnimate(params)
{
  var imageIndex = (params && params.imageIndex) ? params.imageIndex : Math.floor( Math.random() * GLOBAL.images.length );
  var curImage = GLOBAL.images[imageIndex];

  var randId = Math.floor(Math.random() * 1000000);
  var imageContainerId = 'ImageContainer' + randId;
  var imageId = 'Image' + randId;
  var imageCaptionId = 'ImageCaption' + randId;
  
  $('#Content').append(
    '<div id="' + imageContainerId + '" class="imageContainer" >' + 
      '<img width="500" height="400" id="' + imageId + '" class="image" />' + 
      '<div id="' + imageCaptionId + '" class="imageCaption" ></div>' +
    '</div>'
  )
  var imageContainer = $('#' + imageContainerId);
  var image = $('#' + imageId);
  var imageCaption = $('#' + imageCaptionId);
  
  imageContainer.hide();
  
  image.attr('src', curImage.src);
  imageCaption.html(curImage.caption);

  var windowWidth   = $(window).width(),
      windowHeight  = $(window).height();
  var mainImageWidth  = image.width(),
      mainImageHeight = image.height();
  var curX = Math.floor(Math.random() * (windowWidth - mainImageWidth - 50) ) + 50,
      curY = Math.floor(Math.random() * (windowHeight - mainImageHeight - 100 ) ) + 50;

  var imageParams = {
    container : imageContainer,
    image : image,
    caption : imageCaption,
    x : curX,
    y : curY
  }

  Animations.fadeIn(imageParams);
}

function swapImage(animationType)
{
  var imageIndex = Math.floor( Math.random() * GLOBAL.images.length );
  var image = GLOBAL.images[imageIndex];
  
  $('#MainImageContainer').hide();
  
  $('#MainImage').attr('src', image.src);
  $('#MainImageCaption').html(image.caption);
  
  animate(animationType);
}

function animate(animationType)
{
  animationType = (animationType) ? animationType : 0;
//   var animationType = Math.floor(Math.random() * 3);

  switch(animationType)
  {
    case 0:
      var params = {
        container : $('#MainImageContainer'),
        image : $('#MainImage'),
        caption : $('#MainImageCaption'), 
        x : curX,
        y : curY
      }
      Animations.slider(params);
      break;
    case 1:
      var params = {
        container : $('#MainImageContainer'),
        image : $('#MainImage'),
        caption : $('#MainImageCaption')
      }
      Animations.randomSlider(params);
      break;
    case 2:
      var windowWidth   = $(window).width(),
          windowHeight  = $(window).height();
      var mainImageWidth  = $('#MainImage').width(),
          mainImageHeight = $('#MainImage').height();
      var curX = Math.floor(Math.random() * (windowWidth - mainImageWidth - 50) ) + 50,
          curY = Math.floor(Math.random() * (windowHeight - mainImageHeight - 100 ) ) + 50;

      var params = {
        container : $('#MainImageContainer'),
        image : $('#MainImage'),
        caption : $('#MainImageCaption'), 
        x : curX,
        y : curY
      }

      Animations.fadeIn(params);
      break;
    case 3:
      var windowWidth   = $(window).width(),
          windowHeight  = $(window).height();
      var mainImageWidth  = $('#MainImage').width(),
          mainImageHeight = $('#MainImage').height();
      var curX = Math.floor(Math.random() * (windowWidth - mainImageWidth - 50) ) + 50,
          curY = Math.floor(Math.random() * (windowHeight - mainImageHeight - 100 ) ) + 50;

      var params = {
        container : $('#MainImageContainer'),
        image : $('#MainImage'),
        caption : $('#MainImageCaption'), 
        x : curX,
        y : curY
      }
      Animations.show(params);
      break;
    default: Animations.fadeIn(); break;
  }
}
*/


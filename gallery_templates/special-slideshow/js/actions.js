/* NOTES:
 * Actions are often used animations.  If we need to make a custom animation, simply make one in the special-slideshow-actions.js queue
 * 
 * Dependencies:
 * GLOBAL object must exist
 * GLOBAL.objectIndex must exist
 * GLOBAL.maxImgSize must exist
 * ANIMATIONS must exist
 * ANIMATIONS.slider must exist
 * ANIMATIONS.fadeIn must exist
 * ANIMATIONS.randomSlider must exist
 */
var Actions = {};

/* Start Actions Definition */
(function() {
"use strict";  

/* createImage
 * helper function that creates an image container, image, and caption, and places it in the DOM
 * returns the jQuery reference to the container, image, and caption
 * optional parameters:
 * - imageIndex - select the image to put on stage, by indexId
 */
Actions.createImage = function(params)
{
  var imageIndex, curImage;
  if( !params || (params && !params.srcImage) )
  {
    imageIndex = (params && params.imageIndex) ? params.imageIndex : Math.floor( (Math.random() * 1000000) % GLOBAL.images.length );
    curImage = GLOBAL.images[imageIndex];
  }
  else
  {
    curImage = params.srcImage;
  }

  var currentId = GLOBAL.objectIndex++;
  var imageContainerId = 'ImageContainer' + currentId;
  var imageId = 'Image' + currentId;
  var imageCaptionId = 'ImageCaption' + currentId;
    
  $('#Content').append(
    '<div id="' + imageContainerId + '" class="imageContainer" >' + 
//      '<img width="500" height="400" id="' + imageId + '" class="image" />' + 
      '<img id="' + imageId + '" class="image" />' +
      '<div id="' + imageCaptionId + '" class="imageCaption" ></div>' +
    '</div>'
  );
  var imageContainer = $('#' + imageContainerId);
  var image = $('#' + imageId);
  var imageCaption = $('#' + imageCaptionId);

  imageContainer.hide();
  
  image.attr('src', curImage.src);
  imageCaption.html(curImage.caption);

  var width, height;
  if(curImage.ogWidth >= curImage.ogHeight) {
    width = GLOBAL.maxImgSize,
    height = GLOBAL.maxImgSize * curImage.ogHeight/curImage.ogWidth;
  }
  else{
    width = GLOBAL.maxImgSize * curImage.ogWidth/curImage.ogHeight,
    height = GLOBAL.maxImgSize;
  }
  width = Math.floor(width), height = Math.floor(height);
  $(image).width(width).height(height);
  
  var imageParams = {
    container : imageContainer,
    image : image,
    caption : imageCaption
  };
  return imageParams;
};

/* createSliders
 * helper function that creates sliders across the screen for the specified number of images
 * 
 * parameters:
 * - numPics - number of pics to render
 * - interval - the time between pics rendered
 */
Actions.createSliders = function(numPics, interval)
{
  if(!numPics || numPics === '') { numPics = 1; }
  if(!interval || isNaN(interval) ) { interval = 500; }
  
  var helper_createSlider = function() {
    var params = Actions.createImage();
    
    Animations.slider(params);
  };
  
  for(var i=0; i < numPics; i++)
  {
    setTimeout(helper_createSlider , i * interval );
  }
};

/* createSingleFadeIn
 * helper function that creates random fade effects for the specified number of images
 * 
 * parameters:
 * - params
 *   - 
 *   
 * - interval - the time between pics rendered
 */
Actions.createSingleFade = function(params)
{
  if(!params) { return; }
  if(!params.x) { params.x = null; }
  if(!params.y) { params.y = null; }
  if(!params.interval || isNaN(params.interval) ) { params.interval = 500; }
  
  var helper_createSingleFade = function(paramsPassedIn) {
    return function() {
      var curParams = Actions.createImage();
      
      curParams.x = (!paramsPassedIn.x) ? paramsPassedIn.x : $(window).width() / 2  - curParams.image.width() / 2,
      curParams.y = (!paramsPassedIn.y) ? paramsPassedIn.y : $(window).height() / 2 - curParams.image.height() / 2;
  
      Animations.fadeIn(curParams);
    }
  };
  
  setTimeout( helper_createSingleFade(params), i * params.interval );
};

/* createRandomFades
 * helper function that creates random fade effects for the specified number of images
 * 
 * parameters:
 * - numPics - number of pics to render
 * - interval - the time between pics rendered
 */
Actions.createRandomFades = function(numPics, interval)
{
  if(!numPics || numPics === '') { numPics = 1; }
  if(!interval || isNaN(interval) ) { interval = 500; }
  
  var helper_createRandomFade = function() {
    var params = Actions.createImage();
    
    params.x = Math.floor(Math.random() * ($(window).width() - params.image.width() - 50) ) + 50,
    params.y = Math.floor(Math.random() * ($(window).height() - params.image.height() - 100 ) ) + 50;

    Animations.fadeIn(params);
  };
  
  for(var i=0; i < numPics; i++)
  {
    setTimeout(helper_createRandomFade, i * interval );
  }
};

/* createRandomSliders
 * helper function that creates random sliders across the screen for the specified number of images
 * 
 * parameters:
 * - numPics - number of pics to render
 * - interval - the time between pics rendered
 */
Actions.createRandomSliders = function(numPics, interval)
{
  if(!numPics || numPics === '') { numPics = 1; }
  if(!interval || isNaN(interval) ) { interval = 500; }
  
  var helper_createRandomSlider = function() {
    var params = Actions.createImage();
    
    Animations.randomSlider(params);
  };
  
  for(var i=0; i < numPics; i++)
  {
    setTimeout(helper_createRandomSlider, i * interval );
  }
};  
 
})();
/* End Actions Definition */
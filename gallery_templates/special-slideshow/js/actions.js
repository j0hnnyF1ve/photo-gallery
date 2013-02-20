
/* createImage
 * helper function that creates an image container, image, and caption, and places it in the DOM
 * returns the jQuery reference to the container, image, and caption
 * optional parameters:
 * - imageIndex - select the image to put on stage, by indexId
 */
var Actions = {};

Actions.createImage = function(params)
{
  var imageIndex, curImage;
  if( params == null || (params != null && params.srcImage == null) )
  {
    imageIndex = (params != null && params.imageIndex != null) ? params.imageIndex : Math.floor( (Math.random() * 1000000) % GLOBAL.images.length );
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
  )
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
}

/* createSliders
 * helper function that creates sliders across the screen for the specified number of images
 * 
 * parameters:
 * - numPics - number of pics to render
 * - interval - the time between pics rendered
 */
Actions.createSliders = function(numPics, interval)
{
  if(numPics == null || numPics == '') { numPics = 1; }
  if(interval == null || isNaN(interval) ) { interval = 500; }
  
  for(var i=0; i < numPics; i++)
  {
    setTimeout( function() {
        var params = Actions.createImage();
        
        animation_slider(params);
      }, i * interval );
  }
}

/* createRandomFades
 * helper function that creates random fade effects for the specified number of images
 * 
 * parameters:
 * - numPics - number of pics to render
 * - interval - the time between pics rendered
 */
Actions.createRandomFades = function(numPics, interval)
{
  if(numPics == null || numPics == '') { numPics = 1; }
  if(interval == null || isNaN(interval) ) { interval = 500; }
  
  var windowWidth = $(window).width(),
      windowHeight = $(window).height();  
  
  for(var i=0; i < numPics; i++)
  {
    setTimeout( function() {
        var params = Actions.createImage();
        
        params.x = Math.floor(Math.random() * (windowWidth - params.image.width() - 50) ) + 50,
        params.y = Math.floor(Math.random() * (windowHeight - params.image.height() - 100 ) ) + 50;

        animation_fadeIn(params);
      }, i * interval );
  }
}

/* createRandomSliders
 * helper function that creates random sliders across the screen for the specified number of images
 * 
 * parameters:
 * - numPics - number of pics to render
 * - interval - the time between pics rendered
 */
Actions.createRandomSliders = function(numPics, interval)
{
  if(numPics == null || numPics == '') { numPics = 1; }
  if(interval == null || isNaN(interval) ) { interval = 500; }
  
  for(var i=0; i < numPics; i++)
  {
    setTimeout( function() {
        var params = Actions.createImage();
        
        animation_randomSlider(params);
      }, i * interval );
  }
}
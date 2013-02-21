<?php header('Content-type: text/javascript'); ?>

// wrap in anonymous function to prevent namespace conflicts
(function(){
"use strict";

GLOBAL.activeImage = null;
GLOBAL.maxImgWidth = 500;
GLOBAL.maxImgHeight = 500;

$(document).ready(
  function()
  {
    $('.galleryRow img')
      .mouseover( GLOBAL.imgMouseOver )
      .mouseout( GLOBAL.imgMouseOut )
      .mousedown( GLOBAL.imgMouseDown )
      .mouseup( GLOBAL.imgMouseUp );
      
    $('#Lightbox')
      .mousedown( GLOBAL.lightboxMousedown );
  }
);

GLOBAL.imgMouseOver = function()
{
  this.style.cursor = 'pointer';
};

GLOBAL.imgMouseOut = function()
{
  this.style.cursor = 'default'; 
};

GLOBAL.imgMouseDown = function()
{
  if(GLOBAL.activeImage) { GLOBAL.activeImage.style.borderColor = '#fff'; }
  this.style.borderColor = 'yellow';
  GLOBAL.activeImage = this;

  $('body').prepend('<img id="LightboxImage" src="' + this.src + '" />');
  var windowWidth = $(window).width(),
      windowHeight = $(window).height();

  var lightboxWidth = $('#LightboxImage').width(),
      lightboxHeight = $('#LightboxImage').height();
  
  var imgRatio, imgWidth, imgHeight;
  if(imgWidth > imgHeight)
  {
    imgRatio = lightboxWidth / lightboxHeight,
    imgWidth = GLOBAL.maxImgWidth,
    imgHeight = GLOBAL.maxImgHeight / imgRatio;
  }
  else
  {
    imgRatio = lightboxHeight / lightboxWidth;
    imgWidth = GLOBAL.maxImgWidth / imgRatio,
    imgHeight = GLOBAL.maxImgHeight;
  }
  
  $('#LightboxImage').css(
    {
      left: (windowWidth / 2 - imgWidth / 2) + 'px',
      top: (windowHeight / 2 - imgHeight / 2) + 'px',
      width: imgWidth + 'px',
      height: imgHeight + 'px'
    } );

  $('#Lightbox').fadeIn(500, function() { $('#LightboxImage').css({visibility: 'visible'}); } );
};

GLOBAL.imgMouseUp = function()
{
//  this.style.borderColor = '#fff';
};

GLOBAL.lightboxMousedown = function()
{
  $('#LightboxImage').remove();
  $('#Lightbox').fadeOut(500);
  $('#Lightbox').html('');
};

})();
/* end gallery script */
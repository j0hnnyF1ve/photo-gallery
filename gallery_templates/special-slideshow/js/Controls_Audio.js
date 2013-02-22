var Controls_Audio = {};
/* Start Controls_Audio Definition */
(function() {
"use strict";  

// we can change this later to have the audioTrack value be initialized in the application
Controls_Audio.audioTrack = null;
$(window).ready( function() { Controls_Audio.audioTrack = document.getElementById('AudioTrack'); } );

Controls_Audio.startAudio = function()
{
  Controls_Audio.audioTrack.play(); 
};

Controls_Audio.pauseAudio = function()
{
  Controls_Audio.audioTrack.pause(); 
};

Controls_Audio.setTime = function(time)
{
  Controls_Audio.audioTrack.currentTime = time;
}

Controls_Audio.setVolume = function(volume)
{
  if(volume >= 0 && volume <= 100) { Controls_Audio.audioTrack.volume = volume; }
}

Controls_Audio.increaseVolume = function(increment)
{
  if(Controls_Audio.audioTrack.volume <= 100) { Controls_Audio.audioTrack.volume += increment; }
}

Controls_Audio.decreaseVolume = function(increment)
{
  if(Controls_Audio.audioTrack.volume >= 0) { Controls_Audio.audioTrack.volume -= increment; }
}

Controls_Audio.resetAudio = function()
{
  Controls_Audio.setTime(0);
};


})();
/* End Controls Definition */
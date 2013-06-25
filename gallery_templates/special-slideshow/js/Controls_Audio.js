var Controls_Audio = {};
/* Start Controls_Audio Definition */
(function() {
"use strict";  

// we can change this later to have the audioTrack value be initialized in the application
Controls_Audio.audioTrack = null;

Controls_Audio.turnAudioOn = function() { if(!Controls_Audio.audioTrack) { return; } Controls_Audio.audioTrack.muted = false;  }
Controls_Audio.turnAudioOff = function() { if(!Controls_Audio.audioTrack) { return; } Controls_Audio.audioTrack.muted = true;  }

//
Controls_Audio.toggleAudioHandler = function(buttonObj) {
  if(!Controls_Audio.audioTrack) { return; }

  if(Controls_Audio.audioTrack.muted === false) {
    Controls_Audio.turnAudioOff();
    if(buttonObj) { $(buttonObj).html('Audio Off'); }
  }
  else {
    Controls_Audio.turnAudioOn();
    if(buttonObj) { $(buttonObj).html('Audio On'); }
  }
}

Controls_Audio.startAudio = function()
{
  if(!Controls_Audio.audioTrack) { return; }
  
  if(Controls_Audio.audioOn === false) { return; }
  Controls_Audio.audioTrack.play(); 
};

Controls_Audio.pauseAudio = function()
{
  if(!Controls_Audio.audioTrack) { return; }
  
  Controls_Audio.audioTrack.pause(); 
};

Controls_Audio.setTime = function(time)
{
  if(!Controls_Audio.audioTrack) { return; }
  
  Controls_Audio.audioTrack.currentTime = time;
}

Controls_Audio.setVolume = function(volume)
{
  if(!Controls_Audio.audioTrack) { return; }
  
  if(volume >= 0 && volume <= 100) { Controls_Audio.audioTrack.volume = volume; }
}

Controls_Audio.increaseVolume = function(increment)
{
  if(!Controls_Audio.audioTrack) { return; }
  
  Controls_Audio.audioTrack.volume = (Controls_Audio.audioTrack.volume + increment <= 1) ? Controls_Audio.audioTrack.volume + increment : 1;
}

Controls_Audio.decreaseVolume = function(increment)
{
  if(!Controls_Audio.audioTrack) { return; }
  
  Controls_Audio.audioTrack.volume = (Controls_Audio.audioTrack.volume - increment >= 0) ? Controls_Audio.audioTrack.volume - increment : 0;
}

Controls_Audio.resetAudio = function()
{
  if(!Controls_Audio.audioTrack) { return; }
  
  Controls_Audio.setTime(0);
};


})();
/* End Controls Definition */
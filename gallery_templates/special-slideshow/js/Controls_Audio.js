var Controls_Audio = {};
/* Start Controls_Audio Definition */
(function() {
"use strict";  

// we can change this later to have the audioTrack value be initialized in the application
Controls_Audio.audioTrack = document.getElementById('AudioTrack');
Controls_Audio.startAudio = function()
{
  Controls_Audio.audioTrack.play(); 
};

Controls_Audio.pauseAudio = function()
{
  Controls_Audio.audioTrack.pause(); 
};

Controls_Audio.resetAudio = function()
{
  Controls_Audio.audioTrack.currentTime = 0;
};

})();
/* End Controls Definition */
var Controls_Audio = {};
/* Start Controls_Audio Definition */
(function() {
"use strict";  

Controls_Audio.startAudio = function()
{
  var audioTrack = document.getElementById('AudioTrack');
  if(audioTrack) { audioTrack.play();  }
};

Controls_Audio.pauseAudio = function()
{
  var audioTrack = document.getElementById('AudioTrack');
  if(audioTrack) { audioTrack.pause();  }  
};

Controls_Audio.resetAudio = function()
{
  var audioTrack = document.getElementById('AudioTrack');
  if(audioTrack) { audioTrack.currentTime = 0;  }
};

})();
/* End Controls Definition */
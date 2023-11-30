document.addEventListener('DOMContentLoaded', function() {
    var audioElement = document.getElementById('sound1');
  
    // Function to toggle play/pause on the audio element.
    function togglePlayPause() {
      if (audioElement.paused || audioElement.ended) {
        audioElement.play();
      } else {
        audioElement.pause();
      }
    }
  
    // Try to play the audio automatically.
    var playPromise = audioElement.play();
  
    if (playPromise !== undefined) {
      playPromise.then(function() {
        // Automatic playback started successfully.
        // Now we listen for a click to pause the audio.
        document.addEventListener('click', togglePlayPause);
      }).catch(function(error) {
        // Automatic playback failed.
        // Wait for a user interaction to start playback.
        console.error("Playback failed:", error);
        
        // Listen for the first user interaction to start the audio.
        document.addEventListener('click', function startAudioAfterInteraction() {
          togglePlayPause(); // This plays the audio since it's currently paused.
  
          // Now that audio is playing, we switch the listener to toggle play/pause.
          document.removeEventListener('click', startAudioAfterInteraction);
          document.addEventListener('click', togglePlayPause);
        }, {once: true});
      });
    }
  });
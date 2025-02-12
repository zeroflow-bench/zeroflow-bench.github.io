window.HELP_IMPROVE_VIDEOJS = false;

function resetVideos() {
  document.querySelectorAll('video').forEach(video => {
    video.currentTime = 0;
    video.play();
  });
}

function fastForwardVideos() {
  document.querySelectorAll('video').forEach(video => {
    video.currentTime += 1;
  });
}

function rewindVideos() {
  document.querySelectorAll('video').forEach(video => {
    video.currentTime -= 1;
  });
}

function endVideos() {
  document.querySelectorAll('video').forEach(video => {
    video.currentTime = video.duration;
    video.pause();
  });
}

function playPauseVideo() {
  document.querySelectorAll('video').forEach(video => {
    video.paused || video.ended ? video.play() : video.pause();
  });
}

$(document).ready(function() {

  // Button group active class toggle
  document.querySelectorAll('.button-group span').forEach(button => {
    button.addEventListener('click', function() {
      this.parentNode.querySelectorAll('span').forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // Model and optimizer button click event
  const modelButtons = document.querySelectorAll('.model-button');
  const optimizerButtons = document.querySelectorAll('.optimizer-button');
  const rows = document.querySelectorAll('.results-row');

  const setActiveButton = (buttons, updateTable) => {
    buttons.forEach(button => {
      button.addEventListener('click', function() {
        buttons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        updateTable();
      });
    });
  };

  setActiveButton(modelButtons, updateTable);
  setActiveButton(optimizerButtons, updateTable);

  function updateTable() {
    const currentModel = document.querySelector('.model-button.active').getAttribute('data-model');
    const currentOptimizer = document.querySelector('.optimizer-button.active').getAttribute('data-optimizer');

    rows.forEach(row => {
      if (row.classList.contains(currentModel) && row.classList.contains(currentOptimizer)) {
        row.style.display = ''; // Show row
      } else {
        row.style.display = 'none'; // Hide row
      }
    });
  }

  updateTable();

  const video = document.querySelector('video');
  const progress = document.querySelector('.controls progress');

  function updateProgress() {
    progress.value = (video.currentTime / video.duration) * 100;
  }

  video.addEventListener('timeupdate', updateProgress);
  video.addEventListener('ended', () => {
    progress.value = 100;
  });

  document.querySelector('.button.reset').addEventListener('click', () => {
    video.currentTime = 0;
    progress.value = 0;
  });
});



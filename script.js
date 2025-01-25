document.addEventListener('DOMContentLoaded', () => {
    const directoryInput = document.getElementById('directoryInput');
    const fileList = document.getElementById('file-list');
    const searchInput = document.getElementById('searchInput');
    const loadSelectedBtn = document.getElementById('loadSelected');
    const videoPanel = document.getElementById('video-panel');
    const playPauseBtn = document.getElementById('playPause');
    const volumeSlider = document.getElementById('volume');
    const syncSeekBtn = document.getElementById('syncSeek');
    const playbackSpeedBtn = document.getElementById('playbackSpeed');
    const rewindBtn = document.getElementById('rewind');
    const fullscreenBtn = document.getElementById('fullscreen');
    const toggleThemeBtn = document.getElementById('toggleTheme');
    const swapVideosBtn = document.getElementById('swapVideos');
  
    let videoFiles = [];
    let videoElements = [];
  
    // Handle directory input and display file list
    directoryInput.addEventListener('change', (event) => {
      videoFiles = Array.from(event.target.files).filter(file => file.type.startsWith('video/'));
      renderFileList(videoFiles.map((file, index) => ({ file, originalIndex: index })));
    });
  
    // Render file list with filtering support
    const renderFileList = (files) => {
      fileList.innerHTML = '';
  
      if (files.length === 0) {
        fileList.innerHTML = '<p>No video files found.</p>';
        return;
      }
  
      files.forEach(({ file, originalIndex }) => {
        const label = document.createElement('label');
        label.innerHTML = `
          <input type="checkbox" data-original-index="${originalIndex}">
          ${file.name}
          <hr />
        `;
        fileList.appendChild(label);
      });
    };

    // Filter files based on search input
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase();
      const filteredFiles = videoFiles
        .map((file, index) => ({ file, originalIndex: index }))
        .filter(({ file }) => file.name.toLowerCase().includes(query));
      renderFileList(filteredFiles);
    });

    // Load selected videos
    loadSelectedBtn.addEventListener('click', () => {
      videoPanel.innerHTML = '';
      videoElements = [];
  
      const selectedCheckboxes = Array.from(fileList.querySelectorAll('input[type="checkbox"]:checked'));
      if (selectedCheckboxes.length === 0) {
        alert('Please select at least one video.');
        return;
      }
  
      selectedCheckboxes.forEach((checkbox, i) => {
        const originalIndex = parseInt(checkbox.dataset.originalIndex, 10);
        const file = videoFiles[originalIndex];
  
        // Create a wrapper for each video
        const videoWrapper = document.createElement('div');
        const video = document.createElement('video');

        video.src = URL.createObjectURL(file);
        video.controls = true;

        if (i === 0) {
            video.classList.add('first-vid');
        } else if (i === 1) {
            video.classList.add('second-vid');
        }

        video.addEventListener('play', () => highlightPlayingVideo(video));
        video.addEventListener('pause', () => removeHighlight(video));
  
        videoWrapper.appendChild(video);
        videoPanel.appendChild(videoWrapper);
  
        videoElements.push(video);
      });
    });
  
    // Highlight currently playing video
    const highlightPlayingVideo = (video) => {
      videoElements.forEach(v => v.classList.remove('playing'));
      video.classList.add('playing');
    };

    // Remove highlight from paused video
    const removeHighlight = (video) => {
      video.classList.remove('playing');
    };

    // Play/Pause all videos
    playPauseBtn.addEventListener('click', () => {
      if (videoElements.some(video => video.paused)) {
        videoElements.forEach(video => video.play());
      } else {
        videoElements.forEach(video => video.pause());
      }
    });
  
    // Synchronize volume
    volumeSlider.addEventListener('input', (event) => {
      const volume = event.target.value;
      videoElements.forEach(video => (video.volume = volume));
    });
  
    // Synchronize seek position
    syncSeekBtn.addEventListener('click', () => {
      if (videoElements.length === 0) return;
      const masterTime = videoElements[0].currentTime; // Use the first video as master
      videoElements.forEach(video => (video.currentTime = masterTime));
    });

    // Change playback speed
    playbackSpeedBtn.addEventListener('click', () => {
        const newSpeed = prompt('Enter playback speed (e.g., 1 for normal, 0.5 for half speed, 2 for double speed):', '1');
        if (newSpeed !== null) {
            videoElements.forEach(video => (video.playbackRate = parseFloat(newSpeed)));
        }
    });

    // Rewind all videos by 5 seconds
    rewindBtn.addEventListener('click', () => {
        videoElements.forEach(video => {
            video.currentTime = Math.max(0, video.currentTime - 5);
        });
    });

    // Toggle fullscreen for the first video
    fullscreenBtn.addEventListener('click', () => {
      if (videoElements.length > 0) {
        const video = videoElements[0];
        if (video.requestFullscreen) {
          video.requestFullscreen();
        } else if (video.mozRequestFullScreen) { // Firefox
          video.mozRequestFullScreen();
        } else if (video.webkitRequestFullscreen) { // Chrome, Safari and Opera
          video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) { // IE/Edge
          video.msRequestFullscreen();
        }
      }
    });

    // Toggle dark mode
    toggleThemeBtn.addEventListener('click', () => {
      const currentTheme = document.body.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      document.body.setAttribute('data-theme', newTheme);
      toggleThemeBtn.textContent = newTheme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode';
    });

    // Swap the places and styles of the videos
    swapVideosBtn.addEventListener('click', () => {
      if (videoElements.length < 2) {
        alert('Please load at least two videos to swap.');
        return;
      }

      const firstVideoWrapper = videoElements[0].parentElement;
      const secondVideoWrapper = videoElements[1].parentElement;

      videoPanel.insertBefore(secondVideoWrapper, firstVideoWrapper);
      videoPanel.insertBefore(firstVideoWrapper, secondVideoWrapper.nextSibling);

      // Swap the elements in the array
      [videoElements[0], videoElements[1]] = [videoElements[1], videoElements[0]];

      // Swap the styles
      videoElements[0].classList.toggle('first-vid');
      videoElements[0].classList.toggle('second-vid');
      videoElements[1].classList.toggle('first-vid');
      videoElements[1].classList.toggle('second-vid');
    });
  });
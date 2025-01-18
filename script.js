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
  
    let videoFiles = [];
    let videoElements = [];
  
    // Handle directory input and display file list
    directoryInput.addEventListener('change', (event) => {
      videoFiles = Array.from(event.target.files).filter(file => file.type.startsWith('video/'));
      renderFileList(videoFiles);
    });
  
    // Render file list with filtering support
    const renderFileList = (files) => {
      fileList.innerHTML = '';
  
      if (files.length === 0) {
        fileList.innerHTML = '<p>No video files found.</p>';
        return;
      }
  
      files.forEach((file, index) => {
        const label = document.createElement('label');
        label.innerHTML = `
          <input type="checkbox" data-index="${index}">
          ${file.name}
          <hr />
        `;
        fileList.appendChild(label);
      });
    };
  
    // Filter files based on search input
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase();
      const filteredFiles = videoFiles.filter(file => file.name.toLowerCase().includes(query));
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
        const fileIndex = parseInt(checkbox.dataset.index, 10);
        const file = videoFiles[fileIndex];
  
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
  
        videoWrapper.appendChild(video);
        videoPanel.appendChild(videoWrapper);
  
        videoElements.push(video);
      });
    });
  
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
  });
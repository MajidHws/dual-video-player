# Dual Video Player

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

## Introduction
The Dual Video Player is an application that allows users to play two videos simultaneously. It is designed for comparing video content side-by-side, making it useful for video editors, content creators, and anyone who needs to analyze two videos at the same time.

## Features
- Play two videos simultaneously
- Independent controls for each video
- Synchronized play/pause functionality
- Adjustable playback speed
- Fullscreen support for both videos
- User-friendly interface

## Installation
To install the Dual Video Player, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/dual-video-player.git
    ```
2. Navigate to the project directory:
    ```bash
    cd dual-video-player
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```

## Usage
To start the application, run:
```bash
npm start
```
Then open your web browser and navigate to `http://localhost:3000`.

### Playing Videos
1. Click on the "Load Video 1" button to select the first video file.
2. Click on the "Load Video 2" button to select the second video file.
3. Use the controls to play, pause, and adjust the playback speed of each video.

## Configuration
You can configure the application by editing the `config.json` file located in the project directory. The available configuration options are:

- `defaultPlaybackSpeed`: The default playback speed for the videos.
- `syncPlayPause`: Boolean value to enable or disable synchronized play/pause functionality.

Example `config.json`:
```json
{
  "defaultPlaybackSpeed": 1.0,
  "syncPlayPause": true
}
```

## Contributing
We welcome contributions to the Dual Video Player project. To contribute, follow these steps:

1. Fork the repository.
2. Create a new branch:
    ```bash
    git checkout -b feature-branch
    ```
3. Make your changes and commit them:
    ```bash
    git commit -m "Description of your changes"
    ```
4. Push to the branch:
    ```bash
    git push origin feature-branch
    ```
5. Create a pull request on GitHub.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

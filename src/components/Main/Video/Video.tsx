import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import 'bootstrap/dist/css/bootstrap.css';
import Nouislider from 'nouislider-react';
import 'nouislider/distribute/nouislider.css';
import { Row } from 'react-bootstrap';

function Video() {
  const [url, setUrl] = useState('');
  const [playing, setPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [mirrored, setMirrored] = useState(false);
  const [played, setPlayed] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [startloop, setStartloop] = useState(0);
  const [endloop, setEndloop] = useState(1);
  const videoRef = useRef<ReactPlayer | null>(null);

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handlePause = () => {
    setPlaying(false);
  };

  const handlePlay = () => {
    setPlaying(true);
  };

  const handleSpeed = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlaybackRate(parseFloat(e.target.value));
  };
  
  const handleMirror = () => {
    setMirrored(!mirrored);
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSeeking(true);
    setPlayed(parseFloat(e.target.value));
    if (videoRef.current) {
      videoRef.current.seekTo(parseFloat(e.target.value));
    }
    setSeeking(false);
  };
  

  const handleProgress = (state: { played: number }) => {
    if (!seeking) {
      setPlayed(state.played);
    }
  };

  const handleLoopSeeking = (values: number[], handle: number) => {
    const player = videoRef.current;
    if (player) { // Check if player is not null
      if (!handle) {
        player.seekTo(values[0]);
        setStartloop(values[0]);
      } else {
        player.seekTo(values[1]);
        setEndloop(values[1]);
      }
    }
  };
  
  const handleLoopSection = () => {
    const player = videoRef.current;
    if (player) { // Check if player is not null
      const checkbox = document.querySelector("input[name=loop") as HTMLInputElement;
      if (checkbox) {
        checkbox.addEventListener('change', () => {
          if (checkbox.checked) {
            player.seekTo(startloop);
            setPlayed(startloop);
          }
          setInterval(() => {
            if (checkbox.checked) {
              let timepassed = played;
              if (endloop >= timepassed - 0.01 && endloop <= timepassed + 0.01) {
                player.seekTo(startloop);
                setPlayed(startloop);
              }
            }
          }, 3);
        });
      }
    }
  };
  
  
  

  const renderLoadButton = (url: string, label: string) => {
    setUrl(url);
  };
  
  // ... other state variables ...

  // Handler for updating the URL state
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  // Handler for loading the video
  const handleLoadVideo = () => {
    // Use the 'url' state variable to access the URL
    // You can perform any additional actions you need here
    console.log('Loading video with URL:', url);
  };

  return (
    <>
      <input
        type="text"
        placeholder="Enter URL"
        value={url}
        onChange={handleUrlChange}
      />
      <button onClick={handleLoadVideo}>Load</button>

      <div>No video loaded</div>

      <div className="middle">
        <ReactPlayer
          ref={videoRef}
          url={url}
          playing={playing}
          playbackRate={playbackRate}
          onPlay={handlePlay}
          onPause={handlePause}
          mirrored={mirrored}
          onSeek={(e) => console.log('onSeek', e)}
          onProgress={handleProgress}
        />
      </div>

      <div id="controls" className="middle">
        <Row>
          <input
            type="range"
            min={0}
            max={0.999999}
            step="any"
            value={played}
            onChange={handleSeekChange}
            id="seeker"
            name="seeker"
          />
        </Row>
        <button onClick={handlePlayPause}>{playing ? 'Pause' : 'Play'}</button>
        Speed: <input id="speed" type="number" step="0.1" min="0.1" max="2" placeholder="1" onChange={handleSpeed} />
        <button onClick={handleMirror}>{mirrored ? 'Unmirror' : 'Mirror'}</button>

        <Nouislider id="loopseeker" range={{ min: 0, max: 0.999999 }} start={[0, 0.999999]} connect onUpdate={handleLoopSeeking} />
        <input type="checkbox" id="loop" value="loop" name="loop" onClick={handleLoopSection}></input>
        <label htmlFor="loop"> Loop </label>
        <br />
      </div>
    </>
  );
}

export default Video;

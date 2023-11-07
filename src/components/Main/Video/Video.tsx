import React, { Component } from "react";
import ReactPlayer from "react-player";
import { useRef, createRef, useState } from 'react';
import 'bootstrap'
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import {Row, Col} from 'react-bootstrap';

function Video() {
  const [url, setUrl] = useState("");
  const [playing, setPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(0);
  const [mirrored, setMirrored] = useState(false);
  const [played, setPlayed] = useState(false);
  const [seeking, setSeeking] = useState(false);
  const [startloop, setStartloop] = useState(0);
  const [endloop, setEndloop] = useState(0);
  const videoRef = useRef(null);

  // load = url => {
  //   this.setState({
  //     url,
  //     played: 0,
  //     loaded: 0
  //   })
  // }

  // create ref as part of the component in order to refer to it in other functions
  // private ref: React.RefObject<ReactPlayer>;
  // private urlInput;
  // constructor(props) {
  //   super(props);
  //   this.ref = createRef();
  //   this.urlInput = "";
  // }


  function handlePlayPause() {
    this.setState({ playing: !this.state.playing })
  }

  function handlePause() {
    console.log('onPause')
    this.setState({ playing: false })
  }

  const handlePlay = () => {
    console.log('onPlay')
    this.setState({ 
      playing: true
     })
  }

  const handleSpeed = e => {
    this.setState({ playbackRate: parseFloat(e.target.value) })
  }

  const handleMirror = () => {
    const videoplayer = useRef();
    console.log('mirror')
    this.setState({mirrored: !this.state.mirrored})
    if (!this.state.mirrored){
      videoplayer.classList.add('flip')
    } else{
      videoplayer.classList.remove('flip')
    }
  }

  const handleSeekChange = e => {
    console.log("seekchange", this.state.played)
    this.setState({ seeking: true })
    // update the progress bar
    this.setState({ played: parseFloat(e.target.value) })
    const player = this.ref.current
    // update the video by going to the correct time
    player.seekTo(parseFloat(e.target.value))
    this.setState({ seeking: false })
  }

  const handleProgress = state => {
    console.log('onProgress', state)
    // We only want to update time slider if we are not currently seeking
    if (!this.state.seeking) {
      this.setState(state)
    }
  }  

  const handleLoopSeeking = (values, handle) => {
    // https://refreshless.com/nouislider/examples/#section-steps-api
    var checkbox = (document.getElementById('loop') as HTMLInputElement)
    if (checkbox.checked){
      checkbox.checked = false
    }

    var value = values[handle];
    const player = this.ref.current
    var start = this.state.startloop
    if (!handle) {
        //console.log('startloop', value);
        // update the video by going to the correct time
        player.seekTo(value)
        this.setState({startloop:value})
        //console.log("test", start)
    } else {
        //console.log('endloop', value);
        player.seekTo(value)
        this.setState({endloop:value})
    }
    
  }

  const handleLoopSection = () => {
    var globalthis = this // referring to the mediacomponent
    
    const player = this.ref.current

    var checkbox = document.querySelector("input[name=loop]");
    checkbox.addEventListener('change', function checkLoop(){
      var thischeckbox = this
      // set it to the beginning the first time
      if (thischeckbox.checked) {
        player.seekTo(globalthis.state.startloop)
        globalthis.setState({played:globalthis.state.startloop})
      }
      setInterval(function innerCheckLoop() {
        //console.log("this", this)
        if (thischeckbox.checked) {
          //console.log("Checkbox is checked..");
          //console.log("endloop", this.state)
          let timepassed = globalthis.state.played
          //console.log("timepassed", timepassed)
          if (globalthis.state.endloop >= timepassed-0.01 && globalthis.state.endloop <= timepassed+0.01) { // if you reach the end, go back to beginning of loop
          //if (endofloop === parseFloat(timepassed.toFixed(2))) {  
            console.log("reached end of loop")    
            player.seekTo(globalthis.state.startloop)
            globalthis.setState({played:globalthis.state.startloop})
          }
      } 
    }, 3); 
    });
  }

  const renderLoadButton = (url, label) => {
    return (
      <button onClick={() => this.load(url)}>
        {label}
      </button>
    )
  }

  return (
    <>
      <input ref={input => { this.urlInput = input }} type='text' placeholder='Enter URL' />
      <button onClick={() => this.setState({ url: this.urlInput.value })}>Load</button>

      <div>No video loaded </div>
      
      <div className="middle">
        <video>
          ref={videoRef}
          url={url}
          playing={playing}
          playbackRate={playbackRate}
          onPlay={this.handlePlay}
          onPause={this.handlePause}
          mirrored={mirrored}
          onSeek={e => console.log('onSeek', e)}
          onProgress={this.handleProgress}
        </video>
      </div>
      

      {/* Controls: Regular and extra are both included here */}
      <div id="controls" className="middle">
        <Row>
        <input
                  type='range' min={0} max={0.999999} step='any'
                  value={played}
                  onChange={this.handleSeekChange}
                  id="seeker"
                  name="seeker"
                />
        </Row>  
        <button onClick={this.handlePlayPause}>{playing ? 'Pause' : 'Play'}</button>
        Speed: <input id="speed" type="number" step="0.1" min="0.1" max="2" placeholder="1" onChange={this.handleSpeed}/>
        <button onClick={this.handleMirror}>{mirrored ? 'Unmirror' : 'Mirror'}</button>
        
        <Nouislider id='loopseeker' range={{ min: 0, max: 0.999999 }} start={[0, 0.999999]} connect onUpdate={this.handleLoopSeeking}/>
        <input type="checkbox" id="loop" value="loop" name="loop" onClick={this.handleLoopSection}></input>
        <label htmlFor="loop"> Loop </label><br></br>
      </div>

    </>
    
  );
}

export default Video;

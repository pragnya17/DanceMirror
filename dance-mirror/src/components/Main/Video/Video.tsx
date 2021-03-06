import React, { Component } from "react";
import ReactPlayer from "react-player";
import 'bootstrap'
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import {Row, Col} from 'react-bootstrap';
//import 'jquery'
//<><script src="//code.jquery.com/jquery-1.10.2.js"></script><script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script></>

class MediaComponent extends Component {
  
  state = { playing:false, playbackRate:1, mirrored:false, played:0, seeking:false, startloop:0, endloop:1}

  // create ref as part of the component in order to refer to it in other functions
  private ref: React.RefObject<ReactPlayer>;
  constructor(props) {
    super(props)
    this.ref = React.createRef()
  }


  handlePlayPause = () => {
    this.setState({ playing: !this.state.playing })
  }

  handlePause = () => {
    console.log('onPause')
    this.setState({ playing: false })
  }

  handlePlay = () => {
    console.log('onPlay')
    this.setState({ 
      playing: true
     })
  }

  handleSpeed = e => {
    this.setState({ playbackRate: parseFloat(e.target.value) })
  }

  handleMirror = () => {
    console.log('mirror')
    this.setState({mirrored: !this.state.mirrored})
    const videoplayer = document.getElementById('videoplayer');
    if (!this.state.mirrored){
      videoplayer.classList.add('flip')
    } else{
      videoplayer.classList.remove('flip')
    }
  }

  handleSeekChange = e => {
    console.log("seekchange", this.state.played)
    this.setState({ seeking: true })
    // update the progress bar
    this.setState({ played: parseFloat(e.target.value) })
    const player = this.ref.current
    // update the video by going to the correct time
    player.seekTo(parseFloat(e.target.value))
    this.setState({ seeking: false })
  }

  handleProgress = state => {
    console.log('onProgress', state)
    // We only want to update time slider if we are not currently seeking
    if (!this.state.seeking) {
      this.setState(state)
    }
  }  

  handleLoopSeeking = (values, handle) => {
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

  handleLoopSection = () => {
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

  render() {
    const { playing, playbackRate, mirrored, played } = this.state
    return (
      <>
        <div id="videoplayer" className="middle">
          <ReactPlayer
            ref={this.ref}
            url='https://www.youtube.com/watch?v=waSeaayuZ-k'
            playing={playing}
            playbackRate={playbackRate}
            onPlay={this.handlePlay}
            onPause={this.handlePause}
            mirrored={mirrored}
            onSeek={e => console.log('onSeek', e)}
            onProgress={this.handleProgress}
            />
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
          Speed: <input id="speed" type="number" onChange={this.handleSpeed}/>
          <button onClick={this.handleMirror}>{mirrored ? 'Unmirror' : 'Mirror'}</button>
          
          <Nouislider id='loopseeker' range={{ min: 0, max: 0.999999 }} start={[0, 0.999999]} connect onUpdate={this.handleLoopSeeking}/>
          <input type="checkbox" id="loop" value="loop" name="loop" onClick={this.handleLoopSection}></input>
          <label htmlFor="loop"> Loop </label><br></br>
        </div>

      </>
      
    );
  }

}

export default MediaComponent;

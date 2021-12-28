//import React from 'react';
// // import {Row, Col} from 'react-bootstrap';
// // import {isMobile} from 'react-device-detect';
// import { ReactVideo } from "reactjs-media";

// interface Props {
//   id: string;
// }

// function Video(props: Props) {
//   return (
//     <div id={props.id}>
//         <ReactVideo src="https://www.youtube.com/watch?v=waSeaayuZ-k"
//                 //primaryColor="red"
//                 // other props
//         />
//     </div>
//   );
// }

// export default Video;

import React, { Component } from "react";
import ReactPlayer from "react-player";
//import $ from 'jquery'
import 'bootstrap'
import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
//import 'jquery'
//<><script src="//code.jquery.com/jquery-1.10.2.js"></script><script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script></>

class MediaComponent extends Component {
  

  private ref: React.RefObject<ReactPlayer>;
  constructor(props) {
    super(props)
    this.ref = React.createRef()
  }

  state = { playing:false, playbackRate:1, mirrored:false, played:0}
  

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

  handleSeekMouseDown = e => {
    this.setState({ seeking: true })
  }

  handleSeekChange = e => {
    this.setState({ played: parseFloat(e.target.value) })
  }

  handleSeekMouseUp = e => {
    this.setState({ seeking: false })
    const player = this.ref.current
    player.seekTo(parseFloat(e.target.value))
  }

  render() {
    const { playing, playbackRate, mirrored, played } = this.state
    return (
      <>
        <div id="videoplayer" className="middle">
          <ReactPlayer
            ref={this.ref}
            url='https://www.youtube.com/embed/E7wJTI-1dvQ'
            playing={playing}
            playbackRate={playbackRate}
            onPlay={this.handlePlay}
            onPause={this.handlePause}
            mirrored={mirrored}
            />
        </div>

        <div id="controls" className="middle">
          <button onClick={this.handlePlayPause}>{playing ? 'Pause' : 'Play'}</button>
          Speed: <input id="speed" type="number" onChange={this.handleSpeed}/>
          <button onClick={this.handleMirror}>{mirrored ? 'Unmirror' : 'Mirror'}</button>
          <input
                    type='range' min={0} max={0.999999} step='any'
                    value={played}
                    onMouseDown={this.handleSeekMouseDown}
                    onChange={this.handleSeekChange}
                    onMouseUp={this.handleSeekMouseUp}
                  />
          <div>
          </div>
        </div>

      </>
      
    );
  }

}

export default MediaComponent;

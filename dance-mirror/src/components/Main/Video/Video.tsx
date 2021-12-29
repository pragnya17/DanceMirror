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
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
//import 'jquery'
//<><script src="//code.jquery.com/jquery-1.10.2.js"></script><script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script></>

class MediaComponent extends Component {
  

  private ref: React.RefObject<ReactPlayer>;
  constructor(props) {
    super(props)
    this.ref = React.createRef()
  }

  state = { playing:false, playbackRate:1, mirrored:false, played:0, seeking:false}


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
  }

  handleProgress = state => {
    console.log('onProgress', state)
    // We only want to update time slider if we are not currently seeking
    if (!this.state.seeking) {
      this.setState(state)
    }
  }

  handleLoopSection = (values, handle) => {
    // https://refreshless.com/nouislider/examples/#section-steps-api
    // var value = values[handle];

    // if (handle) {
    //     console.log('startloop', value);
    //     this.setState({ seeking: true })
    //     this.setState({ played: parseFloat(value) })
    // } else {
    //     console.log('endloop', value);
    //     // while (this.state.played === parseFloat(value)) {
    //     //   this.setState({ played: parseFloat(value) }) // go back to the beginning of the loop
    //     // }
    // }
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
            onSeek={e => console.log('onSeek', e)}
            onProgress={this.handleProgress}
            />
        </div>

        <div id="controls" className="middle">
          <button onClick={this.handlePlayPause}>{playing ? 'Pause' : 'Play'}</button>
          Speed: <input id="speed" type="number" onChange={this.handleSpeed}/>
          <button onClick={this.handleMirror}>{mirrored ? 'Unmirror' : 'Mirror'}</button>
          <input
                    type='range' min={0} max={0.999999} step='any'
                    value={played}
                    onChange={this.handleSeekChange}
                  />
           <Nouislider range={{ min: 0, max: 0.999999 }} start={[0, 0.999999]} connect onUpdate={this.handleLoopSection}/>
          
        </div>

      </>
      
    );
  }

}

export default MediaComponent;

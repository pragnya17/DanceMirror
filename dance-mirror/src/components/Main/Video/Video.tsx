// import React from 'react';
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


class MediaComponent extends Component {
  state = { playing:false }
  
  handlePlayPause = () => {
    this.setState({ playing: !this.state.playing })
  }

  handlePause = () => {
    console.log('onPause')
    this.setState({ playing: false })
  }

  handlePlay = () => {
    console.log('onPlay')
    this.setState({ playing: true })
  }

  render() {
    const { playing } = this.state
    return (
      <><div className="flip">
        <ReactPlayer
          url='https://www.youtube.com/embed/E7wJTI-1dvQ'
          playing={playing}
          onPlay={this.handlePlay}
          onPause={this.handlePause} />


      </div><button onClick={this.handlePlayPause}>{playing ? 'Pause' : 'Play'}</button></>

    );
  }

}

export default MediaComponent;

import React from 'react';
// import {Row, Col} from 'react-bootstrap';
// import {isMobile} from 'react-device-detect';

interface Props {
  id: string;
}

function Video(props: Props) {
  return (
    <div id={props.id}>
        Learn to dance with DanceMirror
    </div>
  );
}

export default Video;

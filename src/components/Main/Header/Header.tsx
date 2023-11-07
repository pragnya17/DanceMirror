import React from 'react';
import {Row, Col, Container} from 'react-bootstrap';
// import {isMobile} from 'react-device-detect';

interface Props {
  id: string;
}

function Header(props: Props) {
  return (
    <div id={props.id}>
      <Container>
        <Row className="justify-content-md-center">
          <Col md="auto">
            <h1>Learn to dance with DanceMirror</h1>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Header;

import React, { useContext } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useCurrentBreakpointName } from 'react-socks';
import * as RBI from 'react-bootstrap-icons';
import { AppContext } from '../../AppContext';

function SoftwareDownloadOption(props) {
  const { downloadName, downloadLink, type } = props;
  const appSettings = useContext(AppContext);
  const { softwareFontSize } = appSettings;

  const breakpoint = useCurrentBreakpointName();
  return (
    <Row>
      <Col>
        <Button
          variant='outline-light'
          style={{ marginTop: '1vh' }}
          size={breakpoint === 'xsmall' ? 'sm' : 'lg'}
          onClick={() => window.open(downloadLink)}
          block
        >
          <Container>
            <Row>
              <Col
                style={{
                  fontSize: softwareFontSize
                }}
              >
                {downloadName}
              </Col>
              <Col>{type.charAt(0).toUpperCase() + type.slice(1)}_x64</Col>
            </Row>
          </Container>
        </Button>
      </Col>
    </Row>
  );
}

export default SoftwareDownloadOption;

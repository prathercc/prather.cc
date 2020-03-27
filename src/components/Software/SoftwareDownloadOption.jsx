import React, { useContext, useState } from 'react';
import { Button, Container, Row, Col, Spinner } from 'react-bootstrap';
import { useCurrentBreakpointName } from 'react-socks';
import * as RBI from 'react-bootstrap-icons';
import { AppContext } from '../../AppContext';
import SoftwareModal from './SoftwareModal/SoftwareModal';

function SoftwareDownloadOption(props) {
  const { downloadName, downloadLink, type } = props;
  const appSettings = useContext(AppContext);
  const { softwareFontSize, iconSizing } = appSettings;
  const [modalOpen, setModalOpen] = useState(false);

  const breakpoint = useCurrentBreakpointName();

  const handleModalOpen = () => {
    setModalOpen(true);
    window.setTimeout(() => {window.open(downloadLink); setModalOpen(false)}, 3000);
  };

  const Icon = () => {
    return <RBI.Download style={{ fontSize: iconSizing }} />;
  };

  return (
    <>
      <Row>
        <Col>
          <Button
            variant='outline-light'
            style={{ marginTop: '1vh' }}
            size={breakpoint === 'xsmall' ? 'sm' : 'lg'}
            onClick={() => handleModalOpen()}
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

      <SoftwareModal
        title=''
        modalOpen={modalOpen}
        handleModalClose={()=>{}}
        titleIcon={<Icon />}
        closable={false}
      >
        <p>Starting download for {downloadName}...</p>
        <Spinner animation='border' />
      </SoftwareModal>
    </>
  );
}

export default SoftwareDownloadOption;

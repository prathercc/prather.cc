import React, { useContext, useState, useRef } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { AppContext } from '../../../AppContext';
import '../Software.css';
import { StandardCard, StandardModal, LinkModal } from '../../Utility/Utility';
import Alarm from 'react-bootstrap-icons/dist/icons/alarm';
import Archive from 'react-bootstrap-icons/dist/icons/archive';
import Bag from 'react-bootstrap-icons/dist/icons/bag';
import { useCurrentBreakpointName } from 'react-socks';

function SoftwareCode(props) {
  const { repoLink } = props;
  const breakpoint = useCurrentBreakpointName();

  const iconSize = breakpoint === 'xsmall' ? '5vw' : breakpoint === 'large' ? '2.5vw' : breakpoint === 'medium' ? '3.5vw' : breakpoint === 'small' ? '4.5vw' : '1.5vw';
  return (
    <Container style={{ marginTop: '2vh' }}>
      <Row>
        <Col>
          <ViewRepo repoLink={repoLink} iconSize={iconSize} />
        </Col>
        <Col>
          <ViewIssues repoLink={repoLink} iconSize={iconSize} />
        </Col>
        <Col>
          <CloneRepository repoLink={repoLink} iconSize={iconSize} />
        </Col>
      </Row>
    </Container>
  );
}

const ViewRepo = ({ style, repoLink, iconSize }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const Icon = () => {
    return <Archive style={{ fontSize: iconSize }} />;
  };
  return (
    <>
      <StandardCard onClick={() => setModalOpen(true)} className='defaultMouseOver' title={<><Icon /> <div>Project Repository</div></>} style={{ ...style, cursor: 'pointer', minHeight: '65px' }} />
      <LinkModal modalOpen={modalOpen} handleModalClose={() => setModalOpen(false)} link={repoLink} />
    </>
  );
}

const ViewIssues = ({ style, repoLink, iconSize }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const Icon = () => {
    return <Alarm style={{ fontSize: iconSize }} />;
  };
  return (
    <>
      <StandardCard onClick={() => setModalOpen(true)} className='defaultMouseOver' title={<><Icon /> <div>Open Issues</div></>} style={{ ...style, cursor: 'pointer', minHeight: '65px' }} />
      <LinkModal modalOpen={modalOpen} handleModalClose={() => setModalOpen(false)} link={`${repoLink}/issues`} />
    </>
  );
}

const CloneRepository = ({ repoLink, style, iconSize }) => {
  const appSettings = useContext(AppContext);
  const { softwareMaintenanceFontSize, softwareFontSize } = appSettings;
  const [modalOpen, setModalOpen] = useState(false);
  const [buttonText, setButtonText] = useState('Copy to Clipboard');
  const [buttonEnabled, setButtonEnabled] = useState(true);
  const textAreaRef = useRef(null);

  const Icon = () => {
    return <Bag style={{ fontSize: iconSize }} />;
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setButtonText('Copy to Clipboard');
    setButtonEnabled(true);
  };

  return (
    <>
      <StandardCard onClick={() => setModalOpen(true)} className='defaultMouseOver' title={<><Icon /> <div>Clone Repository</div></>} style={{ ...style, cursor: 'pointer', minHeight: '65px' }} />
      <StandardModal
        modalOpen={modalOpen}
        handleModalClose={handleModalClose}
      >
        <div style={{ fontSize: softwareFontSize }}>Clone project with Git</div>
        <InputGroup style={{ marginTop: '2vh' }}>
          <FormControl
            readOnly
            style={{
              cursor: 'text',
              textAlign: 'center',
              fontSize: softwareMaintenanceFontSize
            }}
            ref={textAreaRef}
            value={`${repoLink}.git`}
          />
        </InputGroup>
        <Button
          disabled={!buttonEnabled}
          onClick={() => {
            textAreaRef.current.select();
            document.execCommand('copy');
            setButtonText('Copied!');
            setButtonEnabled(false);
          }}
          variant='outline-light'
          style={{
            fontSize: softwareMaintenanceFontSize,
            marginTop: '2vh',
            cursor: buttonEnabled ? 'pointer' : 'default'
          }}
        >
          {buttonText}
        </Button>
      </StandardModal>
    </>
  );
};

export default SoftwareCode;

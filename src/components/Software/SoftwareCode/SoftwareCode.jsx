import React, { useContext, useState, useRef } from 'react';
import {
  Card,
  Container,
  Col,
  Row,
  InputGroup,
  Button,
  FormControl
} from 'react-bootstrap';
import { AppContext } from '../../../AppContext';
import { CloudDownload, Alarm } from 'react-bootstrap-icons';
import './SoftwareCode.css';
import SoftwareModal from '../SoftwareModal/SoftwareModal';
import { useCurrentBreakpointName } from 'react-socks';

function SoftwareCode(props) {
  const appSettings = useContext(AppContext);
  const { fgColorDetail, fgColor } = appSettings;
  const { repoLink } = props;

  return (
    <Card
      style={{
        backgroundColor: fgColorDetail,
        fontSize: 'calc(10px + 2vmin)',
        alignItems: 'center',
        marginTop: '5vh',
        outline: '1px solid gray'
      }}
    >
      <CloneRepository repoLink={repoLink} />
      <IssuesLink repoLink={repoLink} />
    </Card>
  );
}

const IssuesLink = props => {
  const appSettings = useContext(AppContext);
  const { fgColorDetail, fgColor } = appSettings;
  const [activeColor, setActiveColor] = useState(fgColorDetail);
  const [activeClass, setActiveClass] = useState('');
  const { repoLink } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const breakpoint = useCurrentBreakpointName();

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const Icon = () => {
    return (
      <Alarm style={{ fontSize: breakpoint === 'xsmall' ? '10vw' : '5vw' }} />
    );
  };

  return (
    <>
      <Container style={{ fontSize: 'calc(15px + 2vmin)' }}>
        <Row>
          <Col>
            <Card.Header
              style={{ cursor: 'pointer', backgroundColor: activeColor }}
              onMouseEnter={() => {
                setActiveColor(fgColor);
                setActiveClass('Hover-glow');
              }}
              onMouseLeave={() => {
                setActiveColor(fgColorDetail);
                setActiveClass('');
              }}
              className={activeClass}
              onClick={() => setModalOpen(true)}
            >
              <Icon />
              Submit an Issue
            </Card.Header>
          </Col>
        </Row>
      </Container>
      <SoftwareModal
        title='Submit an Issue'
        modalOpen={modalOpen}
        handleModalClose={handleModalClose}
        titleIcon={<Icon />}
      >
        <p>You are about to navigate to: </p>
        <FormControl
          style={{ cursor: 'text' }}
          disabled
          value={`${repoLink}/issues/new`}
        />
        <p style={{ marginTop: '1vh' }}>Are you sure you wish to continue?</p>
        <Button
          onClick={() => {
            handleModalClose();
            window.open(`${repoLink}/issues/new`);
          }}
          variant='dark'
        >
          Yes, Submit a New Issue
        </Button>
      </SoftwareModal>
    </>
  );
};

const CloneRepository = props => {
  const appSettings = useContext(AppContext);
  const { fgColorDetail, fgColor } = appSettings;
  const [activeColor, setActiveColor] = useState(fgColorDetail);
  const [activeClass, setActiveClass] = useState('');
  const { repoLink } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const [buttonText, setButtonText] = useState('Copy to Clipboard');
  const [buttonEnabled, setButtonEnabled] = useState(true);
  const textAreaRef = useRef(null);
  const breakpoint = useCurrentBreakpointName();

  const handleModalClose = () => {
    setModalOpen(false);
    setButtonText('Copy to Clipboard');
    setButtonEnabled(true);
  };

  const Icon = () => {
    return (
      <CloudDownload
        style={{ fontSize: breakpoint === 'xsmall' ? '10vw' : '5vw' }}
      />
    );
  };

  return (
    <>
      <Container style={{ fontSize: 'calc(15px + 2vmin)' }}>
        <Row>
          <Col>
            <Card.Header
              style={{ cursor: 'pointer', backgroundColor: activeColor }}
              onMouseEnter={() => {
                setActiveColor(fgColor);
                setActiveClass('Hover-glow');
              }}
              onMouseLeave={() => {
                setActiveColor(fgColorDetail);
                setActiveClass('');
              }}
              className={activeClass}
              onClick={() => setModalOpen(true)}
            >
              <Icon />
              Clone Repository
            </Card.Header>
          </Col>
        </Row>
      </Container>
      <SoftwareModal
        title='Clone Repository'
        modalOpen={modalOpen}
        handleModalClose={handleModalClose}
        titleIcon={<Icon />}
      >
        Use the link below to clone the project repository using{' '}
        <a
          href='https://git-scm.com/'
          target='_blank'
          rel='noopener noreferrer'
        >
          Git
        </a>
        <InputGroup style={{ marginTop: '2vh' }}>
          <FormControl
            style={{ cursor: 'text' }}
            disabled
            ref={textAreaRef}
            value={`${repoLink}.git`}
          />
          <Button
            visible={false}
            disabled={!buttonEnabled}
            onClick={() => {
              textAreaRef.current.select();
              document.execCommand('copy');
              setButtonText('Copied!');
              setButtonEnabled(false);
            }}
            variant='dark'
          >
            {buttonText}
          </Button>
        </InputGroup>
      </SoftwareModal>
    </>
  );
};

export default SoftwareCode;

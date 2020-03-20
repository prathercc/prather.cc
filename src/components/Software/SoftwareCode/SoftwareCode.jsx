import React, { useContext, useState } from 'react';
import {
  Image,
  Card,
  Accordion,
  Container,
  Col,
  Row,
  Badge,
  InputGroup,
  Button,
  FormControl
} from 'react-bootstrap';
import { Breakpoint } from 'react-socks';
import { AppContext } from '../../../AppContext';
import { CloudDownload } from 'react-bootstrap-icons';
import './SoftwareCode.css';
import SoftwareModal from '../SoftwareModal/SoftwareModal';

function SoftwareCode(props) {
  const appSettings = useContext(AppContext);
  const { fgColorDetail, fgColor } = appSettings;
  const { repoLink } = props;
  const [activeColor, setActiveColor] = useState(fgColorDetail);
  const [activeClass, setActiveClass] = useState('');

  return (
    <Card
      style={{
        backgroundColor: fgColorDetail,
        fontSize: 'calc(10px + 2vmin)',
        alignItems: 'center',
        marginTop: '5vh',
        flexDirection: 'row'
      }}
    >
      <CloneRepository repoLink={repoLink} />
    </Card>
  );
}

const CloneRepository = props => {
  const appSettings = useContext(AppContext);
  const { fgColorDetail, fgColor } = appSettings;
  const [activeColor, setActiveColor] = useState(fgColorDetail);
  const [activeClass, setActiveClass] = useState('');
  const { repoLink } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const [buttonText, setButtonText] = useState('Copy to Clipboard');
  const [buttonEnabled, setButtonEnabled] = useState(true);

  const handleModalClose = () => {
    setModalOpen(false);
    setButtonText('Copy to Clipboard');
    setButtonEnabled(true);
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
              <CloudDownload style={{ color: 'yellow', fontSize: '5vw' }} />
              Clone Repository
            </Card.Header>
          </Col>
        </Row>
      </Container>
      <SoftwareModal
        title='Clone Repository'
        modalOpen={modalOpen}
        handleModalClose={handleModalClose}
        titleIcon={<CloudDownload style={{ color: 'yellow', fontSize: '5vw' }} />}
      >
        Use the link below to clone the project repository using git:
        <InputGroup style={{ marginTop: '2vh' }}>
          <FormControl value={`${repoLink}.git`} />
          <Button
            disabled={!buttonEnabled}
            onClick={() => {
              navigator.clipboard.writeText(`${repoLink}.git`);
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

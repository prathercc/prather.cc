import React, { useContext, useState, useRef } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import Code from 'react-bootstrap-icons/dist/icons/code';
import Envelope from 'react-bootstrap-icons/dist/icons/envelope';
import CloudDownload from 'react-bootstrap-icons/dist/icons/cloud-download';
import { AppContext } from '../../../AppContext';
import '../Software.css';
import SoftwareModal from '../SoftwareModal/SoftwareModal';
import SoftwareLinkModal from '../SoftwareModal/SoftwareLinkModal';
import { DetailCard } from '../../Utility/Utility';

function SoftwareCode(props) {
  const appSettings = useContext(AppContext);
  const { fgColorDetail, iconSizing, softwareFontSize } = appSettings;
  const { repoLink } = props;

  const VisitRepoIcon = () => {
    return <Code style={{ fontSize: iconSizing }} />;
  };
  const ViewOpenIssuesIcon = () => {
    return <Envelope style={{ fontSize: iconSizing }} />;
  };

  return (
    <DetailCard style={{ marginTop: '5vh' }}>
      <SoftwareLinkModal
        style={{ marginTop: '1vh' }}
        link={`${repoLink}`}
        title='View Project Repository'
        icon={<VisitRepoIcon />}
      />
      <SoftwareLinkModal
        link={`${repoLink}/issues`}
        title='View Open Issues'
        icon={<ViewOpenIssuesIcon />}
      />
      <CloneRepository style={{ marginBottom: '1vh' }} repoLink={repoLink} />
    </DetailCard>
  );
}

const CloneRepository = props => {
  const appSettings = useContext(AppContext);
  const {
    fgColorDetail,
    iconSizing,
    softwareMaintenanceFontSize
  } = appSettings;
  const [activeClass, setActiveClass] = useState('');
  const { repoLink } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const [buttonText, setButtonText] = useState('Copy to Clipboard');
  const [buttonEnabled, setButtonEnabled] = useState(true);
  const textAreaRef = useRef(null);

  const handleModalClose = () => {
    setModalOpen(false);
    setButtonText('Copy to Clipboard');
    setButtonEnabled(true);
  };

  const Icon = () => {
    return <CloudDownload style={{ fontSize: iconSizing }} />;
  };

  return (
    <>
      <Container {...props}>
        <Row>
          <Col>
            <Card.Header
              style={{ cursor: 'pointer', backgroundColor: fgColorDetail }}
              onMouseEnter={() => {
                setActiveClass('Hover-glow');
              }}
              onMouseLeave={() => {
                setActiveClass('');
              }}
              className={activeClass}
              onClick={() => setModalOpen(true)}
            >
              <Icon /> Clone Repository
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
      </SoftwareModal>
    </>
  );
};

export default SoftwareCode;

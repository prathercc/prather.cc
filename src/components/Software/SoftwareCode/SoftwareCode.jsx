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
import * as RBI from 'react-bootstrap-icons';
import './SoftwareCode.css';
import SoftwareModal from '../SoftwareModal/SoftwareModal';
import SoftwareLinkModal from '../SoftwareModal/SoftwareLinkModal';

function SoftwareCode(props) {
  const appSettings = useContext(AppContext);
  const { fgColorDetail, iconSizing, softwareFontSize } = appSettings;
  const { repoLink } = props;

  const VisitRepoIcon = () => {
    return <RBI.Code style={{ fontSize: iconSizing }} />;
  };
  const ViewOpenIssuesIcon = () => {
    return <RBI.DocumentText style={{ fontSize: iconSizing }} />;
  };
  const SubmitIssueIcon = () => {
    return <RBI.Envelope style={{ fontSize: iconSizing }} />;
  };

  return (
    <Card
      style={{
        backgroundColor: fgColorDetail,
        fontSize: softwareFontSize,
        alignItems: 'center',
        marginTop: '5vh',
        outline: '1px solid gray'
      }}
    >
      <SoftwareLinkModal
        link={`${repoLink}`}
        title='View Project Repository'
        icon={<VisitRepoIcon />}
      />
      <CloneRepository repoLink={repoLink} />
      <SoftwareLinkModal
        link={`${repoLink}/issues`}
        title='View Open Issues'
        icon={<ViewOpenIssuesIcon />}
      />
      <SoftwareLinkModal
        link={`${repoLink}/issues/new`}
        title='Submit an Issue'
        icon={<SubmitIssueIcon />}
      />
    </Card>
  );
}

const CloneRepository = props => {
  const appSettings = useContext(AppContext);
  const { fgColorDetail, fgColor, iconSizing, softwareMaintenanceFontSize } = appSettings;
  const [activeColor, setActiveColor] = useState(fgColorDetail);
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
    return <RBI.CloudDownload style={{ fontSize: iconSizing }} />;
  };

  return (
    <>
      <Container>
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
            style={{
              cursor: 'text',
              textAlign: 'center',
              fontSize: softwareMaintenanceFontSize
            }}
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
            style={{ fontSize: softwareMaintenanceFontSize }}
          >
            {buttonText}
          </Button>
        </InputGroup>
      </SoftwareModal>
    </>
  );
};

export default SoftwareCode;

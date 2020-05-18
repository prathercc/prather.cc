import React, { useContext, useState, useRef } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import { AppContext } from '../../../AppContext';
import '../Software.css';
import { StandardCard, StandardModal, LinkModal } from '../../Utility/Utility';

function SoftwareCode(props) {
  const { repoLink } = props;
  return (
    <>
      <ViewRepo repoLink={repoLink} />
      <ViewIssues repoLink={repoLink} />
      <CloneRepository repoLink={repoLink} />
    </>
  );
}

const ViewRepo = ({ style, repoLink }) => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <StandardCard onClick={() => setModalOpen(true)} className='defaultMouseOver' title='View Project Repository' style={{ ...style, marginTop: '2vh', cursor: 'pointer' }} />
      <LinkModal modalOpen={modalOpen} handleModalClose={() => setModalOpen(false)} link={repoLink} />
    </>
  );
}

const ViewIssues = ({ style, repoLink }) => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <StandardCard onClick={() => setModalOpen(true)} className='defaultMouseOver' title='View Open Issues' style={{ ...style, marginTop: '0.5vh', cursor: 'pointer' }} />
      <LinkModal modalOpen={modalOpen} handleModalClose={() => setModalOpen(false)} link={`${repoLink}/issues`} />
    </>
  );
}

const CloneRepository = ({ repoLink, style }) => {
  const appSettings = useContext(AppContext);
  const { softwareMaintenanceFontSize, softwareFontSize } = appSettings;
  const [modalOpen, setModalOpen] = useState(false);
  const [buttonText, setButtonText] = useState('Copy to Clipboard');
  const [buttonEnabled, setButtonEnabled] = useState(true);
  const textAreaRef = useRef(null);

  const handleModalClose = () => {
    setModalOpen(false);
    setButtonText('Copy to Clipboard');
    setButtonEnabled(true);
  };

  return (
    <>
      <StandardCard onClick={() => setModalOpen(true)} className='defaultMouseOver' title='Clone Repository' style={{ ...style, marginTop: '0.5vh', cursor: 'pointer' }} />
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

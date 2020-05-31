import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../Software.css';
import { StandardCard, LinkModal, getThemeColor, getIconSizing } from '../../Utility/Utility';
import Alarm from 'react-bootstrap-icons/dist/icons/exclamation-diamond';
import CodeSlash from 'react-bootstrap-icons/dist/icons/code-slash';

function SoftwareCode({ repoLink, style }) {
  return (
    <Container fluid style={{ margin: 0, padding: 0, ...style }}>
      <Row>
        <Col>
          <ViewRepo repoLink={repoLink} />
        </Col>
        <Col>
          <ViewIssues repoLink={repoLink} />
        </Col>
      </Row>
    </Container>
  );
}

const ViewRepo = ({ style, repoLink }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const Icon = () => {
    return <CodeSlash style={{ fontSize: getIconSizing(), color: getThemeColor(0.8) }} />;
  };
  return (
    <>
      <StandardCard onClick={() => setModalOpen(true)} className='defaultImageNudge' title={<><Icon /> <div style={{ paddingTop: '5px' }}>Project Repository</div></>} style={{ ...style, cursor: 'pointer', minHeight: '58px' }} />
      <LinkModal modalOpen={modalOpen} handleModalClose={() => setModalOpen(false)} link={repoLink} />
    </>
  );
}

const ViewIssues = ({ style, repoLink }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const Icon = () => {
    return <Alarm style={{ fontSize: getIconSizing(), color: getThemeColor(0.8) }} />;
  };
  return (
    <>
      <StandardCard onClick={() => setModalOpen(true)} className='defaultImageNudge' title={<><Icon /> <div style={{ paddingTop: '5px' }}>Open Issues</div></>} style={{ ...style, cursor: 'pointer', minHeight: '58px' }} />
      <LinkModal modalOpen={modalOpen} handleModalClose={() => setModalOpen(false)} link={`${repoLink}/issues`} />
    </>
  );
}

export default SoftwareCode;

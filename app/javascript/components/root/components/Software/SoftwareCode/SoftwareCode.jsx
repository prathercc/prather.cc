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

  const iconSize = breakpoint === 'xsmall' ? '7vw' : breakpoint === 'large' ? '4.5vw' : breakpoint === 'medium' ? '5.5vw' : breakpoint === 'small' ? '6.5vw' : '3vw';
  return (
    <Container style={{ marginTop: '2vh' }}>
      <Row>
        <Col>
          <ViewRepo repoLink={repoLink} iconSize={iconSize} />
        </Col>
        <Col>
          <ViewIssues repoLink={repoLink} iconSize={iconSize} />
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
      <StandardCard onClick={() => setModalOpen(true)} className='defaultMouseOver' title={<><Icon /> <div style={{ paddingTop: '5px' }}>Project Repository</div></>} style={{ ...style, cursor: 'pointer', minHeight: '71px' }} />
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
      <StandardCard onClick={() => setModalOpen(true)} className='defaultMouseOver' title={<><Icon /> <div style={{ paddingTop: '5px' }}>Open Issues</div></>} style={{ ...style, cursor: 'pointer', minHeight: '71px' }} />
      <LinkModal modalOpen={modalOpen} handleModalClose={() => setModalOpen(false)} link={`${repoLink}/issues`} />
    </>
  );
}

export default SoftwareCode;

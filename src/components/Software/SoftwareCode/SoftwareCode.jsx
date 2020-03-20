import React, { useContext, useState } from 'react';
import {
  Image,
  Card,
  Accordion,
  Container,
  Col,
  Row,
  Badge
} from 'react-bootstrap';
import { Breakpoint } from 'react-socks';
import { AppContext } from '../../../AppContext';
import { CloudDownload } from 'react-bootstrap-icons';
import './SoftwareCode.css';

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
        marginTop: '5vh'
      }}
    >
      <Card.Body style={{ backgroundColor: activeColor }}>
        <Container style={{ fontSize: 'calc(15px + 2vmin)' }}>
          <CloneRepository repoLink={repoLink} />
        </Container>
      </Card.Body>
    </Card>
  );
}

const CloneRepository = props => {
  const appSettings = useContext(AppContext);
  const { fgColorDetail, fgColor } = appSettings;
  const [activeColor, setActiveColor] = useState(fgColorDetail);
  const [activeClass, setActiveClass] = useState('');
  const { repoLink } = props;
  return (
    <Row>
      <Col
        style={{ cursor: 'pointer' }}
        onMouseEnter={() => {
          setActiveColor(fgColorDetail);
          setActiveClass('Hover-glow');
        }}
        onMouseLeave={() => {
          setActiveColor(fgColorDetail);
          setActiveClass('');
        }}
        className={activeClass}
        onClick={() => window.open(`${repoLink}.git`)} //Have this open modal
      >
        <CloudDownload style={{ color: 'yellow', fontSize: '5vw' }} />
        Clone Repository
      </Col>
    </Row>
  );
};

export default SoftwareCode;

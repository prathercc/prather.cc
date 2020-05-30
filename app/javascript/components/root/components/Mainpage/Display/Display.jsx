import React, { useContext, useState } from 'react';
import './Display.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useCurrentBreakpointName } from 'react-socks';
import pratherccsplatBright from '../../../images/pratherccsplatABS1.png';
import GitHubMark from '../../../images/GitHubMark.png';
import YouTubeMark from '../../../images/YouTubeMark.png';
import { StandardImage, StandardPage, getLogoSizing, LinkModal } from '../../Utility/Utility';
import { AppContext } from '../../../AppContext';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Card from 'react-bootstrap/Card';

function Display() {
  return (
    <>
      <PrathImage />
      <StandardPage title='Quick Links'>
        <Container>
          <Row>
            <Col style={{ padding: '15px' }}>
              <MediaCard logo={GitHubMark} link='https://github.com/prathercc' />
              11 Public Repositories
            </Col>
            <Col style={{ padding: '15px' }}>
              <MediaCard logo={YouTubeMark} link='https://youtube.com/prathercc' />
              0 Videos
            </Col>
          </Row>
        </Container>
      </StandardPage>
    </>
  );
}

const MediaCard = ({ logo, style, link }) => {
  const appSettings = useContext(AppContext);
  const { fontStyle, softwareFontSize, fgColorDetail } = appSettings;
  const Icon = <StandardImage style={{ width: getLogoSizing() }} src={logo} />
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <Jumbotron
        onClick={() => setModalOpen(true)}
        className='defaultImageNudge'
        as={Card}
        style={{
          backgroundColor: fgColorDetail,
          fontFamily: fontStyle,
          fontSize: softwareFontSize,
          padding: '25px',
          width: 'max-content',
          margin: 'auto',
          cursor: 'pointer',
          ...style
        }}>
        <div style={{ width: 'max-content', margin: 'auto' }}>
          {Icon}
        </div>
      </Jumbotron>
      <LinkModal modalOpen={modalOpen} handleModalClose={() => setModalOpen(false)} link={link} />
    </>
  )
}

const PrathImage = () => {
  const breakpoint = useCurrentBreakpointName();
  const widthLogic = breakpoint === 'xlarge' ? '25vw' : breakpoint === 'large' ? '45vw' : breakpoint === 'medium' ? '55vw' : '75vw';

  return (
    <Container className='App-splat-to-mobile' style={{ opacity: .85 }}>
      <Row>
        <Col>
          <img src={pratherccsplatBright} style={{ width: widthLogic, maxWidth: '375px' }} />
        </Col>
      </Row>
    </Container>
  );
};

export default Display;

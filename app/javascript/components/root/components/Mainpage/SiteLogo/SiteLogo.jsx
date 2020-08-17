import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { StandardImage, StandardModal, getThemeColor, StandardButton } from '../../Utility/Utility';

function SiteLogo({ setActiveApplication }) {
  const [modalOpen, setModalOpen] = useState(false);
  const Buttons = () => (
    <Row>
      <Col>
        <StandardButton onClick={() => setModalOpen(false)}>Cancel</StandardButton>
      </Col>
      <Col>
        <StandardButton onClick={() => setActiveApplication('Prather.cc')}>Open</StandardButton>
      </Col>
    </Row>
  );
  return (
    <>
      <Row style={{ filter: 'grayscale(0.2)', opacity: 1, padding: 0, maxWidth: 'max-content', margin: 'auto', marginTop: '3vh' }}>
        <StandardImage
          onClick={() => { setModalOpen(true) }}
          style={{ maxWidth: '45%' }}
          className='defaultImageNudge'
          src='https://i92.servimg.com/u/f92/11/29/62/29/filter20.png'
          toolTip='Prather.cc'
        />
      </Row>
      <StandardModal buttons={<Buttons />} title='Prather.cc' modalOpen={modalOpen} handleModalClose={() => setModalOpen(false)}>
        Open the <span style={{ color: getThemeColor(1) }}>Prather.cc</span> Software Page?
      </StandardModal>
    </>
  );
};

export default SiteLogo;

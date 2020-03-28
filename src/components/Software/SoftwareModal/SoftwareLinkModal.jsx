import React, { useContext, useState } from 'react';
import {
  Card,
  Container,
  Col,
  Row,
  Button,
  FormControl
} from 'react-bootstrap';
import { AppContext } from '../../../AppContext';
import './SoftwareLinkModal.css';
import SoftwareModal from '../SoftwareModal/SoftwareModal';

const SoftwareLinkModal = props => {
  const appSettings = useContext(AppContext);
  const { fgColorDetail, fgColor, softwareMaintenanceFontSize } = appSettings;
  const [activeColor, setActiveColor] = useState(fgColorDetail);
  const [activeClass, setActiveClass] = useState('');
  const { link, title, icon } = props;
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalClose = () => {
    setModalOpen(false);
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
              {icon}
              {title}
            </Card.Header>
          </Col>
        </Row>
      </Container>
      <SoftwareModal
        title={title}
        modalOpen={modalOpen}
        handleModalClose={handleModalClose}
        titleIcon={icon}
      >
        <p>You are about to leave <strong>prather.cc</strong> and navigate to:</p>
        <FormControl
          style={{
            cursor: 'text',
            textAlign: 'center',
            fontSize: softwareMaintenanceFontSize
          }}
          disabled
          value={`${link}`}
        />
        <Button
          onClick={() => {
            handleModalClose();
            window.open(`${link}`);
          }}
          variant='outline-light'
          style={{ fontSize: softwareMaintenanceFontSize, marginTop:'2vh' }}
          
        >
          Continue
        </Button>
      </SoftwareModal>
    </>
  );
};

export default SoftwareLinkModal;

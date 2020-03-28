import React, { useContext } from 'react';
import { Modal } from 'react-bootstrap';
import { AppContext } from '../../../AppContext';

function SoftwareModal(props) {
  const appSettings = useContext(AppContext);
  const {
    fgColorDetail,
    fgColor,
    textColor,
    softwareFontSize,
    softwareMaintenanceFontSize
  } = appSettings;

  const {
    modalOpen,
    title,
    handleModalClose,
    titleIcon,
    closable = true
  } = props;

  return (
    <Modal
      style={{ textAlign: 'center' }}
      centered
      show={modalOpen}
      onHide={() => handleModalClose()}
      size='lg'
    >
      <Modal.Header
        style={{
          backgroundColor: fgColor,
          color: textColor,
          outline: '1px solid gray'
        }}
        closeButton={closable}
      >
        <Modal.Title
          style={{
            fontSize: softwareFontSize
          }}
        >
          {titleIcon}
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{
          backgroundColor: fgColorDetail,
          color: textColor,
          outline: '1px solid gray',
          fontSize: softwareMaintenanceFontSize
        }}
      >
        {props.children}
      </Modal.Body>
    </Modal>
  );
}

export default SoftwareModal;

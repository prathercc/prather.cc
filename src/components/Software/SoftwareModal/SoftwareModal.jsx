import React, { useContext } from 'react';
import { Modal } from 'react-bootstrap';
import { AppContext } from '../../../AppContext';

function SoftwareModal(props) {
  const appSettings = useContext(AppContext);
  const { fgColorDetail, fgColor, textColor } = appSettings;

  const { modalOpen, title, handleModalClose, titleIcon } = props;

  return (
    <Modal
      style={{ textAlign: 'center' }}
      centered
      show={modalOpen}
      onHide={() => handleModalClose()}
    >
      <Modal.Header
        style={{
          backgroundColor: fgColor,
          color: textColor,
          outline: '1px solid gray'
        }}
        closeButton
      >
        <Modal.Title>
          {titleIcon}
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{
          backgroundColor: fgColorDetail,
          color: textColor,
          outline: '1px solid gray'
        }}
      >
        {props.children}
      </Modal.Body>
    </Modal>
  );
}

export default SoftwareModal;

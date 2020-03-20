import React, { useContext, useState } from 'react';
import { Image, Modal } from 'react-bootstrap';
import { Breakpoint } from 'react-socks';
import { AppContext } from '../../../AppContext';
import { CloudDownload } from 'react-bootstrap-icons';

function SoftwareModal(props) {
  const appSettings = useContext(AppContext);
  const { fgColorDetail, fgColor } = appSettings;

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
          color: 'white',
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
          color: 'white',
          outline: '1px solid gray'
        }}
      >
        {props.children}
      </Modal.Body>
    </Modal>
  );
}

export default SoftwareModal;

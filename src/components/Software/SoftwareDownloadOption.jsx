import React from 'react';
import { Dropdown } from 'react-bootstrap';

function SoftwareDownloadOption(props) {
  const { link, name } = props;
  return <Dropdown.Item href={link}>{name}</Dropdown.Item>;
}

export default SoftwareDownloadOption;

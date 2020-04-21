import React from 'react';
import { Image } from 'react-bootstrap';
import pratherccsplatBright from '../../images/pratherccsplatABS1.png';

function Logo(props) {
  const { splatWidth } = props;
  return (
    <Image
      roundedCircle
      src={pratherccsplatBright}
      style={{ width: splatWidth }}
    />
  );
}

export default Logo;

import React from 'react';
import './Logo.css';
import { Image } from 'react-bootstrap';
import pratherccsplatBright from '../../images/pratherccsplatABS1.png';

function Logo(props) {
  const { imageObj } = props;
  const { alwaysFast = false } = imageObj;
  return (
    <Image
      roundedCircle
      className={alwaysFast ? 'App-splat-to-mobile-fast' : 'App-splat-to-mobile'}
      src={pratherccsplatBright}
      style={{ width: imageObj.splatWidth, filter: 'grayscale(100%)' }}
    />
  );
}

export default Logo;

import React, { useState } from 'react';
import './Logo.css';
import { Image } from 'react-bootstrap';
import pratherccsplatBright from '../../images/pratherccsplatABS1.png';

function Logo(props) {
  const { imageObj } = props;
  const [dispClass, setDispClass] = useState('App-splat-to-mobile');
  const { alwaysFast = false } = imageObj;
  return (
    <Image
      roundedCircle
      className={alwaysFast ? 'App-splat-to-mobile-fast' : dispClass}
      src={pratherccsplatBright}
      style={{ width: imageObj.splatWidth, filter: 'grayscale(100%)' }}
      onMouseEnter={() => setDispClass(alwaysFast ? 'App-splat-to-mobile-fast' : 'App-splat-to-mobile-fast')}
      onMouseLeave={() => setDispClass(alwaysFast ? 'App-splat-to-mobile-fast' : 'App-splat-to-mobile')}
    />
  );
}

export default Logo;

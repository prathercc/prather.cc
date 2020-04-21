import React from 'react';
import pratherccsplatBright from '../../images/pratherccsplatABS1.png';
import {SlowImage} from '../Utility/Utility';

function Logo(props) {
  const { splatWidth } = props;
  return (
    <SlowImage
      src={pratherccsplatBright}
      style={{ width: splatWidth }}
    />
  );
}

export default Logo;

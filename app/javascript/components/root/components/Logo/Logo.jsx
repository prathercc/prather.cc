import React from 'react';
import pratherccsplatBright from '../../images/pratherccsplatABS1.png';
import {StandardImage} from '../Utility/Utility';

function Logo(props) {
  const { splatWidth } = props;
  return (
    <StandardImage
      src={pratherccsplatBright}
      style={{ width: splatWidth }}
    />
  );
}

export default Logo;

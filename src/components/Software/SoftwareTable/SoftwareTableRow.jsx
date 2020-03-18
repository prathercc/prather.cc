import React, {useContext, useState} from 'react';
import { Image } from 'react-bootstrap';
import { useCurrentBreakpointName } from 'react-socks';
import { AppContext } from '../../../AppContext';

function SoftwareTableRow(props) {
    const {applicationName, icon} = props;
    const breakpoint = useCurrentBreakpointName();
  return (
    <tr>
      <td> <Image
          rounded
          src={icon}
          style={{ width: breakpoint === 'xsmall' ? '5vw' : breakpoint === 'medium' ? '4vw' : '2vw'}}
        /> {applicationName}</td>
    </tr>
  );
}
export default SoftwareTableRow;

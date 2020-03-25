import React from 'react';
import { Image } from 'react-bootstrap';
import { useCurrentBreakpointName } from 'react-socks';

function SoftwareTableRow(props) {
  const {
    applicationName,
    icon,
    pageLink,
    compatibility = {
      windows: false,
      linux: false,
      mac: false,
      android: false,
      ios: false
    }
  } = props;

  return (
    <tr
      style={{ cursor: 'pointer' }}
      onClick={() => window.open(pageLink, '_self')}
    >
        <td>
          <Icon icon={icon} />
          {applicationName}
        </td>
      <td>
        <p>{compatibility.windows ? 'Windows' : ''}</p>
        <p>{compatibility.linux ? 'Linux' : ''}</p>
        <p>{compatibility.mac ? 'Mac' : ''}</p>
        <p>{compatibility.android ? 'Android' : ''}</p>
        <p>{compatibility.ios ? 'iOS' : ''}</p>
      </td>
    </tr>
  );
}

const Icon = props => {
  const breakpoint = useCurrentBreakpointName();
  const { icon } = props;
  return (
    <>
      {' '}
      <Image
        rounded
        src={icon}
        style={{
          width:
            breakpoint === 'xsmall'
              ? '5vw'
              : breakpoint === 'medium'
              ? '4vw'
              : '2vw'
        }}
      />{' '}
    </>
  );
};

export default SoftwareTableRow;

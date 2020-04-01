import React from 'react';
import { Image, Container, Row, Col, Badge } from 'react-bootstrap';
import { useCurrentBreakpointName } from 'react-socks';

function SoftwareTableRow(props) {
  const {
    applicationName,
    icon,
    pageLink,
    language,
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
      <td>{language}</td>
      <td>
        {compatibility.windows ? <Badge variant='light'>Windows</Badge> : ''}{' '}
        {compatibility.linux ? <Badge variant='warning'>Linux</Badge> : ''}{' '}
        {compatibility.mac ? <Badge variant='danger'>Mac</Badge> : ''}{' '}
        {compatibility.android ? <Badge variant='info'>Android</Badge> : ''}{' '}
        {compatibility.ios ? <Badge variant='success'>iOS</Badge> : ''}
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

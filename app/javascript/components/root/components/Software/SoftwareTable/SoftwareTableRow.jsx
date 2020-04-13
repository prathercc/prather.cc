import React from 'react';
import { Image, Badge, Button } from 'react-bootstrap';
import { useCurrentBreakpointName } from 'react-socks';

function SoftwareTableRow(props) {
  const {
    applicationName,
    icon,
    pageLink,
    language,
    userData,
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
    >
      <td onClick={() => window.open(pageLink, '_self')}>
        <Icon icon={icon} />
        {applicationName}
      </td>
      <td onClick={() => window.open(pageLink, '_self')}>{language}</td>
      <td onClick={() => window.open(pageLink, '_self')}>
        {compatibility.windows ? <Badge variant='light'>Windows</Badge> : ''}{' '}
        {compatibility.linux ? <Badge variant='warning'>Linux</Badge> : ''}{' '}
        {compatibility.mac ? <Badge variant='danger'>Mac</Badge> : ''}{' '}
        {compatibility.android ? <Badge variant='info'>Android</Badge> : ''}{' '}
        {compatibility.ios ? <Badge variant='success'>iOS</Badge> : ''}
      </td>
      {userData ? <td ><Button onClick={() => window.open(`/software/admin/edit/${applicationName}`, '_self')} size='sm' block variant='warning'>Edit</Button></td> : ''}
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

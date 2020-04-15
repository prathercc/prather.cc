import React, { useEffect, useState } from 'react';
import { Table, Button, Spinner, Badge, Image } from 'react-bootstrap';
import SoftwarePage from '../SoftwarePage/SoftwarePage';
import { fetchAllSoftware } from '../../../softwareService';
import { useCurrentBreakpointName } from 'react-socks';
function SoftwareTable(props) {
  const { userData } = props;
  const [software, setSoftware] = useState(null);

  useEffect(() => {
    const loadSoftware = async () => {
      await fetchAllSoftware(setSoftware);
    };
    loadSoftware();
  }, []);

  return (
    <SoftwarePage>
      {software ? (
        <>
          <Table
            striped
            bordered
            responsive
            variant='dark'
            hover
            size='sm'
            style={{ cursor: 'default' }}
          >
            <thead>
              <tr>
                <th>Name</th>
                <th>Language</th>
                <th>Platform(s)</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {software.map((app) => {
                return (
                  <SoftwareSample
                    key={app.id}
                    value={app}
                    userData={userData}
                  />
                );
              })}
            </tbody>
          </Table>
          {userData ? (
            <Button
              block
              variant='warning'
              onClick={() => window.open('/software/admin/new', '_self')}
            >
              Add application
            </Button>
          ) : (
            ''
          )}
        </>
      ) : (
        <Spinner animation='border' />
      )}
    </SoftwarePage>
  );
}

const SoftwareSample = (props) => {
  const { value, userData } = props;
  const breakpoint = useCurrentBreakpointName();
  const compatibility = {
    windows: value.windows,
    linux: value.linux,
    mac: value.mac,
    android: value.android,
    ios: value.ios,
  };

  return (
    <tr style={{ cursor: 'pointer' }}>
      <td onClick={() => window.open(`/software/${value.name}`, '_self')}>
        {' '}
        <Image
          rounded
          src={value.icon_link}
          style={{
            width:
              breakpoint === 'xsmall'
                ? '5vw'
                : breakpoint === 'medium'
                ? '4vw'
                : '2vw',
          }}
        />{' '}
        {value.name}
      </td>
      <td onClick={() => window.open(`/software/${value.name}`, '_self')}>
        {value.languages}
      </td>
      <td onClick={() => window.open(`/software/${value.name}`, '_self')}>
        {compatibility.windows ? <Badge variant='light'>Windows</Badge> : ''}{' '}
        {compatibility.linux ? <Badge variant='warning'>Linux</Badge> : ''}{' '}
        {compatibility.mac ? <Badge variant='danger'>Mac</Badge> : ''}{' '}
        {compatibility.android ? <Badge variant='info'>Android</Badge> : ''}{' '}
        {compatibility.ios ? <Badge variant='success'>iOS</Badge> : ''}
      </td>
      {userData ? (
        <td>
          <Button
            onClick={() =>
              window.open(`/software/admin/edit/${value.name}`, '_self')
            }
            size='sm'
            block
            variant='warning'
          >
            Edit
          </Button>
        </td>
      ) : (
        <td></td>
      )}
    </tr>
  );
};
export default SoftwareTable;

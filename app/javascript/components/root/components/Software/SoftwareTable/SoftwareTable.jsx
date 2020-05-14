import React, { useEffect, useState, useContext } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Badge from 'react-bootstrap/Badge';
import { fetchAllSoftware } from '../../../softwareService';
import { useCurrentBreakpointName } from 'react-socks';
import { StandardImage, StandardCard, StandardPage } from '../../Utility/Utility';
import { AppContext } from '../../../AppContext';

function SoftwareTable(props) {
  const { userData } = props;
  const [software, setSoftware] = useState(null);
  const appSettings = useContext(AppContext);
  const { softwareFontSize, standardCardTitleFontSize } = appSettings;
  useEffect(() => {
    const loadSoftware = async () => {
      await fetchAllSoftware(setSoftware);
    };
    loadSoftware();
  }, []);

  return (
    <StandardPage title='Software Panel'>
      {
        software &&
        <>
          <StandardCard title='Maintained Applications'>
            <CustomTable userData={userData} software={software} legacy={false} />
          </StandardCard>

          <StandardCard title='Legacy Applications' style={{ marginTop: '2vh' }}>
          <CustomTable userData={userData} software={software} legacy={true} />
          </StandardCard>
          {
            userData && <Button
              style={{ fontSize: softwareFontSize }}
              block
              variant='warning'
              onClick={() => window.open('/software/admin/new', '_self')}
            >
              Add application
              </Button>
          }
        </>
      }
      {
        !software && <Spinner animation='border' />
      }
    </StandardPage>
  );
}

const CustomTable = props => {
  const { userData, software, legacy } = props;
  const appSettings = useContext(AppContext);
  const { tableHeaderFontSize } = appSettings;
  return (
    <div style={{ ...props.style, width: '95%' }}>
      <div style={{ fontSize: tableHeaderFontSize, marginBottom: '1vh' }}>
      </div>
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
          {software.filter(app => app.is_legacy === legacy).map((app) => {
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
    </div>
  )
}

const SoftwareSample = (props) => {
  const { value, userData } = props;
  const breakpoint = useCurrentBreakpointName();
  const appSettings = useContext(AppContext);
  const { softwareFontSize } = appSettings;
  const compatibility = {
    windows: value.windows,
    linux: value.linux,
    mac: value.mac,
    android: value.android
  };

  return (
    <tr className='defaultMouseOver' style={{ cursor: 'pointer' }}>
      <td onClick={() => window.open(`/software/${value.name}`, '_self')}>
        <StandardImage
          src={value.icon_link}
          style={{
            width: breakpoint === 'xsmall' ? '5vw'
              : breakpoint === 'medium' ? '4vw' : '2vw'
          }} />
        {value.name}
      </td>
      <td onClick={() => window.open(`/software/${value.name}`, '_self')}>
        {value.languages}
      </td>
      <td onClick={() => window.open(`/software/${value.name}`, '_self')}>
        {compatibility.windows && <Badge variant='light'>Windows</Badge>}{' '}
        {compatibility.linux && <Badge variant='warning'>Linux</Badge>}{' '}
        {compatibility.mac && <Badge variant='info'>Mac</Badge>}{' '}
        {compatibility.android && <Badge variant='danger'>Android</Badge>}{' '}
      </td>
      {userData ? (
        <td>
          <Button
            style={{ fontSize: softwareFontSize }}
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

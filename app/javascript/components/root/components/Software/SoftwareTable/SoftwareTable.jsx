import React, { useEffect, useState, useContext } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Badge from 'react-bootstrap/Badge';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { fetchAllSoftware } from '../../../softwareService';
import { useCurrentBreakpointName } from 'react-socks';
import { StandardImage, StandardCard, StandardPage, getThemeColor } from '../../Utility/Utility';
import { AppContext } from '../../../AppContext';

function SoftwareTable({ userData }) {
  const [software, setSoftware] = useState(null);
  const [filteredSoftware, setFilteredSoftware] = useState([]);
  const [softwareType, setSoftwareType] = useState('Active');
  const appSettings = useContext(AppContext);
  const { softwareFontSize } = appSettings;
  useEffect(() => {
    const loadSoftware = async () => {
      await fetchAllSoftware(setSoftware);
    };
    loadSoftware();
  }, []);

  useEffect(() => {
    const sortActiveSoftware = () => {
      let res = software?.filter(x => x.is_legacy === false);
      setFilteredSoftware(res);
    }
    const sortInactiveSoftware = () => {
      let res = software?.filter(x => x.is_legacy === true);
      setFilteredSoftware(res);
    }
    const sortAllSoftware = () => {
      setFilteredSoftware(software);
    }
    if (softwareType === 'Active') {
      sortActiveSoftware();
    }
    else if (softwareType === 'Inactive') {
      sortInactiveSoftware();
    }
    else {
      sortAllSoftware();
    }
  }, [softwareType, software])

  return (
    <StandardPage title='Software Panel'>
      {
        software &&
        <>
          <SoftwareSwitcher setSoftwareType={setSoftwareType} softwareType={softwareType} />
          <StandardCard style={{ marginTop: '1vh' }} title={`${softwareType} Applications`}>
            <CustomTable software={filteredSoftware} userData={userData} />
          </StandardCard>
        </>
      }
      {
        userData && <Button
          style={{ fontSize: softwareFontSize, marginTop: '1vh' }}
          block
          variant='warning'
          onClick={() => window.open('/software/admin/new', '_self')}
        >
          Add application
              </Button>
      }
      {
        !software && <Spinner animation='border' />
      }
    </StandardPage>
  );
}

const SoftwareSwitcher = ({ setSoftwareType, softwareType }) => {

  return (
    <>
      <Container>
        <Row>
          <Col>
            <StandardCard onClick={() => setSoftwareType('Active')} className='defaultImageNudge' style={{ cursor: 'pointer', border: softwareType === 'Active' && `solid ${getThemeColor(1)} 1px` }}>
              Active
            </StandardCard>
          </Col>
          <Col>
            <StandardCard onClick={() => setSoftwareType('Inactive')} className='defaultImageNudge' style={{ cursor: 'pointer', border: softwareType === 'Inactive' && `solid ${getThemeColor(1)} 1px` }}>
              Inactive
            </StandardCard>
          </Col>
          <Col>
            <StandardCard onClick={() => setSoftwareType('All')} className='defaultImageNudge' style={{ cursor: 'pointer', border: softwareType === 'All' && `solid ${getThemeColor(1)} 1px` }}>
              All
            </StandardCard>
          </Col>
        </Row>
      </Container>
    </>
  )
}

const CustomTable = ({ software, userData, style }) => {
  return (
    <div style={{ ...style, width: '95%' }}>
      <Table
        striped
        bordered
        responsive
        variant='dark'
        hover
        size='sm'
        style={{ cursor: 'default', marginTop: '1vh' }}
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
          {software?.map((app) => {
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

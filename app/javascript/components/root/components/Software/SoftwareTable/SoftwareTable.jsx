import React, { useEffect, useState, useContext } from 'react';
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import { fetchAllSoftware } from '../../../softwareService';
import { useCurrentBreakpointName } from 'react-socks';
import { StandardImage, StandardCard, StandardPage, getThemeColor, StandardCardHeader, StandardButton } from '../../Utility/Utility';
import { AppContext } from '../../../AppContext';
import RecentIcon from 'react-bootstrap-icons/dist/icons/layers';
import AllIcon from 'react-bootstrap-icons/dist/icons/book';

function SoftwareTable({ userData }) {
  const [software, setSoftware] = useState([]);
  const appSettings = useContext(AppContext);
  const { standardCardTitleFontSize } = appSettings;
  useEffect(() => {
    const loadSoftware = async () => {
      await fetchAllSoftware(setSoftware);
    };
    loadSoftware();
  }, []);

  return (
    <StandardPage title='Software Panel'>
      <SoftwareSwitcher>
        <Tab.Pane eventKey='Recent'>
          <div style={{ fontSize: standardCardTitleFontSize, marginTop: '1vh' }}>Recent Software</div>
          <StandardCardHeader />
          <CustomTable userData={userData} software={software.filter(x => x.is_legacy === false)} />
        </Tab.Pane>
        <Tab.Pane eventKey='All'>
          <div style={{ fontSize: standardCardTitleFontSize, marginTop: '1vh' }}>All Software</div>
          <StandardCardHeader />
          <CustomTable userData={userData} software={[...software]} />
        </Tab.Pane>
        {userData && <StandardButton style={{ marginTop: '1vh', minWidth: '100%' }} onClick={() => window.open('/software/admin/new', '_self')}>Add application</StandardButton>}
      </SoftwareSwitcher>

    </StandardPage>
  );
}

const SoftwareSwitcher = ({ children }) => {
  const BlankKeys = { Recent: false, All: false }
  const [activeKey, setActiveKey] = useState({ ...BlankKeys, Recent: true });

  const CustomLink = ({ keyBool, keyText, displayText, icon }) => {
    return (
      <Nav.Link as={'div'} className={keyBool || 'defaultMouseOver'} style={keyBool ? { backgroundColor: getThemeColor(1), color: 'black', cursor: 'pointer' } : { cursor: 'pointer' }} onClick={() => setActiveKey({ ...BlankKeys, [keyText]: true })} eventKey={keyText}>{icon}<div />{displayText}</Nav.Link>
    )
  }

  return (
    <Tab.Container defaultActiveKey={'Recent'}>
      <Row>
        <Col sm={3}>
          <StandardCard>
            <Nav style={{ minWidth: '100%' }} variant='pills' className='flex-column'>
              <Nav.Item>
                <CustomLink icon={<RecentIcon />} keyBool={activeKey.Recent} keyText='Recent' displayText='Recent Software' />
              </Nav.Item>
              <Nav.Item>
                <CustomLink icon={<AllIcon />} keyBool={activeKey.All} keyText='All' displayText='All Software' />
              </Nav.Item>
            </Nav>
          </StandardCard>
        </Col>
        <Col sm={9}>
          <Tab.Content>
            {children}
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  )
}

const CustomTable = ({ software, userData, style }) => {
  const appSettings = useContext(AppContext);
  const { fgColorDetail } = appSettings;

  return (
    <div style={{ ...style, width: '95%', margin: 'auto' }}>
      <Table size='sm' hover style={{ ...style, color: 'white', backgroundColor: fgColorDetail, border: `1px solid ${getThemeColor(0.2)}` }}>
        <thead>
          <tr>
            <th style={{ border: `1px solid ${getThemeColor(0.2)}` }}>Name</th>
            <th style={{ border: `1px solid ${getThemeColor(0.2)}` }}>Language</th>
            <th style={{ border: `1px solid ${getThemeColor(0.2)}` }}>Platform(s)</th>
            <th style={{ border: `1px solid ${getThemeColor(0.2)}` }}>Year</th>
            {userData && <th style={{ border: `1px solid ${getThemeColor(0.2)}` }}></th>}
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
  const compatibility = {
    windows: value.windows,
    linux: value.linux,
    mac: value.mac,
    android: value.android
  };

  return (
    <tr className='defaultMouseOver' style={{ cursor: 'pointer' }}>
      <td style={{ borderTop: `1px solid ${getThemeColor(0.2)}` }} onClick={() => window.open(`/software/${value.name}`, '_self')}>
        <StandardImage
          src={value.icon_link}
          style={{
            width: breakpoint === 'xsmall' ? '5vw'
              : breakpoint === 'medium' ? '4vw' : '2vw'
          }} />
        {value.name}
      </td>
      <td style={{ borderTop: `1px solid ${getThemeColor(0.2)}` }} onClick={() => window.open(`/software/${value.name}`, '_self')}>
        {value.languages}
      </td>
      <td style={{ borderTop: `1px solid ${getThemeColor(0.2)}` }} onClick={() => window.open(`/software/${value.name}`, '_self')}>
        {compatibility.windows && <Badge variant='dark'>Windows</Badge>}{' '}
        {compatibility.linux && <Badge variant='dark'>Linux</Badge>}{' '}
        {compatibility.mac && <Badge variant='dark'>Mac</Badge>}{' '}
        {compatibility.android && <Badge variant='dark'>Android</Badge>}{' '}
      </td>
      <td style={{ borderTop: `1px solid ${getThemeColor(0.2)}` }}>'20</td>
      {userData && <td style={{ borderTop: `1px solid ${getThemeColor(0.2)}` }}><StandardButton style={{ minWidth: '100%' }} onClick={() => window.open(`/software/admin/edit/${value.name}`, '_self')}>Edit</StandardButton></td>}
    </tr>
  );
};
export default SoftwareTable;

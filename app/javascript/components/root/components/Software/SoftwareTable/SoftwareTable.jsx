import React, { useEffect, useState, useContext } from 'react';
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import Form from 'react-bootstrap/Form';
import { fetchAllSoftware, postSoftware, putSoftware, deleteSoftware } from '../../../softwareService';
import { StandardImage, StandardCard, StandardPage, getThemeColor, StandardCardHeader, StandardButton, StandardModal, StandardTextField, StandardCheckBox } from '../../Utility/Utility';
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
          <CustomTable userData={userData} software={software.filter(x => x.is_legacy === false)} setSoftware={setSoftware} />
        </Tab.Pane>
        <Tab.Pane eventKey='All'>
          <div style={{ fontSize: standardCardTitleFontSize, marginTop: '1vh' }}>All Software</div>
          <StandardCardHeader />
          <CustomTable userData={userData} software={[...software]} setSoftware={setSoftware} />
        </Tab.Pane>
        {userData && <EditSoftware setSoftware={setSoftware} />}
      </SoftwareSwitcher>
    </StandardPage>
  );
}

const EditSoftware = ({ software: existingSoftware, setSoftware: setSoftwares }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const blankSoftware = {
    is_legacy: false,
    icon_link: '',
    name: '',
    description: '',
    image_link: '',
    windows: false,
    linux: false,
    mac: false,
    android: false,
    repo_link: '',
    languages: '',
  };
  const [software, setSoftware] = useState(existingSoftware ? existingSoftware : blankSoftware);

  const handleCreateSoftware = async () => {
    await postSoftware(software);
    await fetchAllSoftware(setSoftwares);
    setSoftware(blankSoftware);
    setModalOpen(false);
  };
  const handleEditSoftware = async () => {
    await putSoftware(software);
    await fetchAllSoftware(setSoftwares);
    setModalOpen(false);
  };
  const handleDeleteSoftware = async () => {
    await deleteSoftware(software.id);
    await fetchAllSoftware(setSoftwares);
    setModalOpen(false);
  };

  const ExistingButtons = <Container>
    <Row>
      <Col>
        <StandardButton onClick={() => handleEditSoftware()}>Save</StandardButton>
      </Col>
      <Col>
        <StandardButton onClick={() => handleDeleteSoftware()}>Delete</StandardButton>
      </Col>
    </Row>
  </Container>

  const NewButtons = <StandardButton isActive={software?.name?.length !== 0} onClick={() => handleCreateSoftware()}>Create</StandardButton>

  return (
    <>
      <StandardButton onClick={() => setModalOpen(true)} style={{ minWidth: '100%' }}>{existingSoftware ? 'Edit' : 'Add Application'}</StandardButton>

      <StandardModal buttons={existingSoftware ? ExistingButtons : NewButtons} modalOpen={modalOpen} handleModalClose={() => setModalOpen(false)}>

        <StandardCard style={{ minWidth: '100%' }} title={!existingSoftware ? 'Add Software' : 'Modify Software'}>
          <Form.Group style={{ width: '95%' }}>
            <StandardTextField value={software.name} isActive={!existingSoftware} label='Name' onChange={(e) => setSoftware({ ...software, name: e.target.value })} />
            <StandardTextField value={software.icon_link} label='Icon Image Link' onChange={(e) => setSoftware({ ...software, icon_link: e.target.value })} />
            <StandardTextField value={software.image_link} label='Image Link' onChange={(e) => setSoftware({ ...software, image_link: e.target.value })} />
            <StandardTextField value={software.description} rows={4} label='Description' onChange={(e) => setSoftware({ ...software, description: e.target.value })} />
            <StandardTextField value={software.repo_link} label='Repository Link' onChange={(e) => setSoftware({ ...software, repo_link: e.target.value })} />
            <StandardTextField value={software.languages} label='Languages' onChange={(e) => setSoftware({ ...software, languages: e.target.value })} />
            <StandardCheckBox label='Is this legacy software?' value={software.is_legacy} onChange={() => setSoftware({ ...software, is_legacy: !software.is_legacy })} />
            <StandardCheckBox label='Windows' value={software.windows} onChange={() => setSoftware({ ...software, windows: !software.windows })} />
            <StandardCheckBox label='Linux' value={software.linux} onChange={() => setSoftware({ ...software, linux: !software.linux })} />
            <StandardCheckBox label='Mac' value={software.mac} onChange={() => setSoftware({ ...software, mac: !software.mac })} />
            <StandardCheckBox label='Android' value={software.android} onChange={() => setSoftware({ ...software, android: !software.android })} />
          </Form.Group>
        </StandardCard>

      </StandardModal>
    </>
  )
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

const CustomTable = ({ software, userData, style, setSoftware }) => {
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
                software={app}
                userData={userData}
                setSoftware={setSoftware}
              />
            );
          })}
        </tbody>
      </Table>
    </div>
  )
}

const SoftwareSample = ({ software, userData, setSoftware }) => {
  const compatibility = {
    windows: software.windows,
    linux: software.linux,
    mac: software.mac,
    android: software.android
  };

  return (
    <tr className='defaultMouseOver' style={{ cursor: 'pointer' }}>
      <td style={{ borderTop: `1px solid ${getThemeColor(0.2)}` }} onClick={() => window.open(`/software/${software.name}`, '_self')}>
        <StandardImage src={software.icon_link} style={{ maxWidth: '6%' }} />
        {software.name}
      </td>
      <td style={{ borderTop: `1px solid ${getThemeColor(0.2)}` }} onClick={() => window.open(`/software/${software.name}`, '_self')}>
        {software.languages}
      </td>
      <td style={{ borderTop: `1px solid ${getThemeColor(0.2)}` }} onClick={() => window.open(`/software/${software.name}`, '_self')}>
        {compatibility.windows && <Badge variant='dark'>Windows</Badge>}{' '}
        {compatibility.linux && <Badge variant='dark'>Linux</Badge>}{' '}
        {compatibility.mac && <Badge variant='dark'>Mac</Badge>}{' '}
        {compatibility.android && <Badge variant='dark'>Android</Badge>}{' '}
      </td>
      <td style={{ borderTop: `1px solid ${getThemeColor(0.2)}` }}>'20</td>
      {userData && <td style={{ borderTop: `1px solid ${getThemeColor(0.2)}` }}><EditSoftware setSoftware={setSoftware} software={software} /></td>}


    </tr>
  );
};
export default SoftwareTable;

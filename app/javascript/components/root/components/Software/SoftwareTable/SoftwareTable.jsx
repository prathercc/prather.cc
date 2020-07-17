import React, { useEffect, useState, useContext } from 'react';
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import { fetchAllSoftware, postSoftware, putSoftware, deleteSoftware } from '../../../softwareService';
import { StandardImage, StandardCard, StandardPage, getThemeColor, StandardButton, StandardModal, StandardTextField, StandardCheckBox, getIconSizing } from '../../Utility/Utility';
import { AppContext } from '../../../AppContext';
import Add from 'react-bootstrap-icons/dist/icons/plus-circle';
import Edit from 'react-bootstrap-icons/dist/icons/pencil';

function SoftwareTable({ userData, setActiveApplication }) {
  const [software, setSoftware] = useState([]);
  useEffect(() => {
    const loadSoftware = async () => {
      await fetchAllSoftware(setSoftware);
    };
    loadSoftware();
  }, []);

  return (
    <StandardPage title='Software Panel'>
      <Table size='sm' hover style={{ color: 'white', backgroundColor: 'transparent', marginTop: '1vh' }}>
        <thead>
          <tr>
            <th style={{ border: 'none', backgroundColor: getThemeColor(0.5) }}>Name</th>
            <th style={{ border: 'none', backgroundColor: getThemeColor(0.5) }}>Language</th>
            <th style={{ border: 'none', backgroundColor: getThemeColor(0.5) }}>Platform(s)</th>
            <th style={{ border: 'none', backgroundColor: getThemeColor(0.5) }}>Year</th>
            {userData && <th style={{ border: 'none', backgroundColor: getThemeColor(0.5) }}></th>}
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
                setActiveApplication={setActiveApplication}
              />
            );
          })}
        </tbody>
      </Table>
      {userData && <EditSoftware setSoftware={setSoftware} />}
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
    youtube_link: ''
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
      <StandardButton icon={existingSoftware ? <Edit style={{ fontSize: getIconSizing('small') }} /> : <Add style={{ fontSize: getIconSizing('small') }} />} onClick={() => setModalOpen(true)}>{existingSoftware ? 'Edit' : 'Add Application'}</StandardButton>

      <StandardModal title={`Software Alteration - ${!existingSoftware ? 'Create' : 'Modify'}`} buttons={existingSoftware ? ExistingButtons : NewButtons} modalOpen={modalOpen} handleModalClose={() => setModalOpen(false)}>
        <Form.Group style={{ width: '95%', margin: 'auto' }}>
          <StandardTextField value={software.name} isActive={!existingSoftware} label='Name' onChange={(e) => setSoftware({ ...software, name: e.target.value })} />
          <StandardTextField value={software.icon_link} label='Icon Image Link' onChange={(e) => setSoftware({ ...software, icon_link: e.target.value })} />
          <StandardTextField value={software.image_link} label='Image Link' onChange={(e) => setSoftware({ ...software, image_link: e.target.value })} />
          <StandardTextField value={software.description} rows={4} label='Description' onChange={(e) => setSoftware({ ...software, description: e.target.value })} />
          <StandardTextField value={software.repo_link} label='Repository Link' onChange={(e) => setSoftware({ ...software, repo_link: e.target.value })} />
          <StandardTextField value={software.languages} label='Languages' onChange={(e) => setSoftware({ ...software, languages: e.target.value })} />
          <StandardTextField value={software.youtube_link} label='Youtube Video Identifier' onChange={(e) => setSoftware({ ...software, youtube_link: e.target.value })} />
          <StandardCheckBox label='Is this legacy software?' value={software.is_legacy} onChange={() => setSoftware({ ...software, is_legacy: !software.is_legacy })} />
          <StandardCheckBox label='Windows' value={software.windows} onChange={() => setSoftware({ ...software, windows: !software.windows })} />
          <StandardCheckBox label='Linux' value={software.linux} onChange={() => setSoftware({ ...software, linux: !software.linux })} />
          <StandardCheckBox label='Mac' value={software.mac} onChange={() => setSoftware({ ...software, mac: !software.mac })} />
          <StandardCheckBox label='Android' value={software.android} onChange={() => setSoftware({ ...software, android: !software.android })} />
        </Form.Group>
      </StandardModal>
    </>
  )
}

const SoftwareSample = ({ software, userData, setSoftware, setActiveApplication }) => {
  const compatibility = {
    windows: software.windows,
    linux: software.linux,
    mac: software.mac,
    android: software.android
  };

  const CustomTd = ({ children, style, noOnClick = false }) => {
    return (
      <td style={{ borderTop: `1px solid ${getThemeColor(0.1)}`, verticalAlign: 'middle', ...style }} onClick={() => noOnClick ? () => { } : setActiveApplication(software.name)}>
        {children}
      </td>
    )
  }

  return (
    <tr className='tableMouseOver' style={{ cursor: 'pointer' }}>
      <CustomTd style={{ width: '35%' }}>
        <StandardImage src={software.icon_link} style={{ width: getIconSizing('medium') }} />
        {software.name}
      </CustomTd>
      <CustomTd>{software.languages}</CustomTd>
      <CustomTd>
        {compatibility.windows && <Badge variant='light'>Windows</Badge>}{' '}
        {compatibility.linux && <Badge variant='light'>Linux</Badge>}{' '}
        {compatibility.mac && <Badge variant='light'>Mac</Badge>}{' '}
        {compatibility.android && <Badge variant='light'>Android</Badge>}{' '}
      </CustomTd>
      <CustomTd>2019</CustomTd>
      {userData && <CustomTd noOnClick><EditSoftware setSoftware={setSoftware} software={software} /></CustomTd>}
    </tr>
  );
};
export default SoftwareTable;

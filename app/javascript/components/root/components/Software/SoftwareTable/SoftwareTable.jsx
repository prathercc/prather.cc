import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import { fetchAllSoftware, postSoftware, putSoftware, deleteSoftware } from '../../../softwareService';
import { StandardImage, StandardDatePicker, StandardPage, getThemeColor, StandardButton, StandardModal, StandardTextField, StandardCheckBox, getIconSizing, StandardSpinner, StandardIconButton, StandardTable } from '../../Utility/Utility';
import Add from 'react-bootstrap-icons/dist/icons/file-plus';
import Edit from 'react-bootstrap-icons/dist/icons/pencil';

function SoftwareTable({ userData, setActiveApplication, displayAlert }) {
  const [software, setSoftware] = useState(null);
  useEffect(() => {
    const loadSoftware = async () => {
      const { data } = await fetchAllSoftware();
      setSoftware(data);
    };
    loadSoftware();
  }, []);

  const CustomTh = ({ children, onClick }) => {
    return (
      <th onClick={onClick} style={{ border: 'none', backgroundColor: getThemeColor(0), fontWeight: 'normal', color: getThemeColor(1) }}>
        {children}
      </th>
    );
  };

  return (
    <StandardPage title='Software Panel'>
      <Table size='sm' hover style={{ color: 'white', backgroundColor: 'transparent', marginTop: '1vh' }}>
        <thead>
          <tr>
            <CustomTh>Name</CustomTh>
            <CustomTh>Development Date</CustomTh>
            {userData?.group === 'Administrator' && <CustomTh />}
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
                displayAlert={displayAlert}
              />
            );
          })}
        </tbody>
      </Table>
      <span style={{ marginBottom: '1vh', display: software ? 'none' : '' }}><StandardSpinner /></span>
      {userData?.group === 'Administrator' && <EditSoftware displayAlert={displayAlert} setSoftware={setSoftware} />}
    </StandardPage>
  );
};

const EditSoftware = ({ software: existingSoftware, setSoftware: setSoftwares, displayAlert }) => {
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
    youtube_link: '',
    dev_date: new Date()
  };
  const [software, setSoftware] = useState(existingSoftware ? existingSoftware : blankSoftware);
  const isSubmitDisabled = software.name.length === 0 || software.icon_link.length === 0 || software.description.length === 0 ||
    software.image_link.length === 0 || software.repo_link.length === 0 || software.languages.length === 0

  const handleCreateSoftware = async () => {
    const { data } = await postSoftware(software);
    if (data) {
      const { data } = await fetchAllSoftware();
      setSoftwares(data);
      setSoftware(blankSoftware);
      setModalOpen(false);
      displayAlert('Successfully saved software', true);
    }
    else {
      displayAlert('Network error while saving software', false);
    }
  };
  const handleEditSoftware = async () => {
    const { data } = await putSoftware(software);
    if (data) {
      const { data } = await fetchAllSoftware();
      setSoftwares(data);
      setModalOpen(false);
      displayAlert('Successfully saved software', true);
    }
    else {
      displayAlert('Network error while saving software', false);
    }
  };
  const handleDeleteSoftware = async () => {
    const { data } = await deleteSoftware(software.id);
    if (data) {
      const { data } = await fetchAllSoftware();
      setSoftwares(data);
      setModalOpen(false);
      displayAlert('Successfully deleted software', true);
    }
    else {
      displayAlert('Network error while deleting software', false);
    }
  };

  const ExistingButtons = () => {
    return (
      <Container>
        <Row>
          <Col>
            <StandardButton onClick={() => setModalOpen(false)}>Cancel</StandardButton>
          </Col>
          <Col>
            <StandardButton onClick={handleDeleteSoftware}>Delete</StandardButton>
          </Col>
          <Col>
            <StandardButton disabled={isSubmitDisabled} onClick={handleEditSoftware}>Save</StandardButton>
          </Col>
        </Row>
      </Container>
    );
  };

  const NewButtons = () => {
    return (
      <Row>
        <Col>
          <StandardButton onClick={() => setModalOpen(false)}>Cancel</StandardButton>
        </Col>
        <Col>
          <StandardButton disabled={isSubmitDisabled} onClick={handleCreateSoftware}>Create</StandardButton>
        </Col>
      </Row>
    );
  };

  return (
    <>
      {existingSoftware &&
        <StandardIconButton onClick={() => setModalOpen(true)} toolTip='Edit Software' icon={<Edit />} />
      }
      {!existingSoftware &&
        <StandardIconButton onClick={() => setModalOpen(true)} toolTip='Add Software' icon={<Add />} />
      }
      <StandardModal title={`Software Alteration - ${!existingSoftware ? 'Create' : 'Modify'}`} buttons={existingSoftware ? <ExistingButtons /> : <NewButtons />} modalOpen={modalOpen} handleModalClose={() => setModalOpen(false)}>
        <Form.Group style={{ width: '95%', margin: 'auto' }}>
          <StandardTextField errorMessage='A name is required!' hasError={software.name.length === 0} value={software.name} isActive={!existingSoftware} label='Name' onChange={(e) => setSoftware({ ...software, name: e.target.value })} />
          <StandardTextField errorMessage='An icon link is required!' hasError={software.icon_link.length === 0} value={software.icon_link} label='Icon Image Link' onChange={(e) => setSoftware({ ...software, icon_link: e.target.value })} />
          <StandardTextField errorMessage='An image link is required!' hasError={software.image_link.length === 0} value={software.image_link} label='Image Link' onChange={(e) => setSoftware({ ...software, image_link: e.target.value })} />
          <StandardTextField errorMessage='A description is required!' hasError={software.description.length === 0} value={software.description} rows={4} label='Description' onChange={(e) => setSoftware({ ...software, description: e.target.value })} />
          <StandardTextField errorMessage='A repository link is required!' hasError={software.repo_link.length === 0} value={software.repo_link} label='Repository Link' onChange={(e) => setSoftware({ ...software, repo_link: e.target.value })} />
          <StandardTextField errorMessage='Language(s) are required!' hasError={software.languages.length === 0} value={software.languages} label='Languages' onChange={(e) => setSoftware({ ...software, languages: e.target.value })} />
          <StandardTextField value={software.youtube_link} label='Youtube Video Identifier' onChange={(e) => setSoftware({ ...software, youtube_link: e.target.value })} />
          <Container>
            <Row>
              <Col>
                <StandardDatePicker label='Development Date' date={new Date(software.dev_date)} setDate={(d) => setSoftware({ ...software, dev_date: d })} />
              </Col>
            </Row>
            <Row>
              <Col>
                <StandardCheckBox label='Windows' value={software.windows} onChange={() => setSoftware({ ...software, windows: !software.windows })} />
              </Col>
              <Col>
                <StandardCheckBox label='Linux' value={software.linux} onChange={() => setSoftware({ ...software, linux: !software.linux })} />
              </Col>
            </Row>
            <Row>
              <Col>
                <StandardCheckBox label='Mac' value={software.mac} onChange={() => setSoftware({ ...software, mac: !software.mac })} />
              </Col>
              <Col>
                <StandardCheckBox label='Android' value={software.android} onChange={() => setSoftware({ ...software, android: !software.android })} />
              </Col>
            </Row>
            <Row>
              <Col>
                <StandardCheckBox label='Legacy Application' value={software.is_legacy} onChange={() => setSoftware({ ...software, is_legacy: !software.is_legacy })} />
              </Col>
            </Row>
          </Container>
        </Form.Group>
      </StandardModal>
    </>
  );
};

const SoftwareSample = ({ software, userData, setSoftware, setActiveApplication, displayAlert }) => {
  const CustomTd = ({ children, style, noOnClick = false }) => {
    return (
      <td style={{ borderTop: `1px solid ${getThemeColor(0.1)}`, verticalAlign: 'middle', ...style }} onClick={() => noOnClick ? () => { } : setActiveApplication(software.name)}>
        {children}
      </td>
    );
  };
  const months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const developmentDate = new Date(software.dev_date);
  const dateDisplayString = months[developmentDate.getMonth()] + ' ' + developmentDate.getFullYear();

  return (
    <tr className='tableMouseOver' style={{ cursor: 'pointer' }}>
      <CustomTd style={{ width: '50%' }}>
        <StandardImage noErrorMessage src={software.icon_link} style={{ width: getIconSizing() }} />
        {software.name}
      </CustomTd>
      <CustomTd>{dateDisplayString}</CustomTd>
      {userData?.group === 'Administrator' && <CustomTd noOnClick><EditSoftware displayAlert={displayAlert} setSoftware={setSoftware} software={software} /></CustomTd>}
    </tr>
  );
};

export default SoftwareTable;

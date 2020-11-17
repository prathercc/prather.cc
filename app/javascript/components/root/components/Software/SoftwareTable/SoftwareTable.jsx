import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import { fetchAllSoftware, postSoftware, putSoftware, deleteSoftware } from '../../../softwareService';
import { StandardImage, StandardDatePicker, StandardPage, getThemeColor, StandardButton, StandardModal, StandardTextField, StandardCheckBox, getIconSizing, StandardIconButton, StandardTooltip } from '../../Utility/Utility';
import { MDBIcon } from "mdbreact";
import { Row, Col, Spin } from 'antd';

function SoftwareTable({ userData, setActiveApplication, displayAlert }) {
  const [software, setSoftware] = useState(null);
  const [sortDir, setSortDir] = useState('desc');

  useEffect(() => {
    const loadSoftware = async () => {
      const { data } = await fetchAllSoftware();
      setSoftware(data);
    };
    loadSoftware();
  }, []);

  const CustomTh = ({ children, name, sortable = true }) => {
    const handleSort = async () => {
      if (sortDir === 'desc')
        setSortDir('asc');
      else
        setSortDir('desc');
      const { data } = await fetchAllSoftware(name, sortDir);
      setSoftware(data);
    }
    return (
      <th style={{ border: 'none', backgroundColor: getThemeColor(0), fontWeight: 'normal', color: getThemeColor(1) }}>
        <div onClick={sortable ? handleSort : () => { }} className={sortable ? 'tableHeaderMouseOver' : 'tableHeaderNotSortable'}>{children}</div>
      </th>
    );
  };

  return (
    <StandardPage title='Software Panel'>
      <Table size='sm' hover style={{ color: 'white', backgroundColor: 'transparent', marginTop: '1vh', display: software ? '' : 'none' }}>
        <thead>
          <tr>
            <CustomTh name='name'>Name</CustomTh>
            <CustomTh name='dev_date'>Development Date</CustomTh>
            <CustomTh sortable={false}>Compatibility</CustomTh>
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
      {!software && <Spin style={{ marginTop: '1vh' }} />}
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
      <Row>
        <Col span={8}>
          <StandardButton onClick={() => setModalOpen(false)}>Cancel</StandardButton>
        </Col>
        <Col span={8}>
          <StandardButton onClick={handleDeleteSoftware}>Delete</StandardButton>
        </Col>
        <Col span={8}>
          <StandardButton disabled={isSubmitDisabled} onClick={handleEditSoftware}>Save</StandardButton>
        </Col>
      </Row>
    );
  };

  const NewButtons = () => {
    return (
      <Row>
        <Col span={12}>
          <StandardButton onClick={() => setModalOpen(false)}>Cancel</StandardButton>
        </Col>
        <Col span={12}>
          <StandardButton disabled={isSubmitDisabled} onClick={handleCreateSoftware}>Create</StandardButton>
        </Col>
      </Row>
    );
  };

  return (
    <>
      {existingSoftware &&
        <StandardIconButton onClick={() => setModalOpen(true)} toolTip='Edit Software' icon={<MDBIcon icon="pencil-alt" />} />
      }
      {!existingSoftware &&
        <StandardIconButton onClick={() => setModalOpen(true)} toolTip='Add Software' icon={<MDBIcon icon="plus" />} />
      }
      <StandardModal title={`Software Alteration - ${!existingSoftware ? 'Create' : 'Modify'}`} buttons={existingSoftware ? <ExistingButtons /> : <NewButtons />} modalOpen={modalOpen} handleModalClose={() => setModalOpen(false)}>
        <Form.Group style={{ width: '95%', margin: 'auto' }}>
          <StandardTextField hasError={software.name.length === 0} value={software.name} isActive={!existingSoftware} label='Name' onChange={(e) => setSoftware({ ...software, name: e.target.value })} />
          <StandardTextField hasError={software.icon_link.length === 0} value={software.icon_link} label='Icon Image Link' onChange={(e) => setSoftware({ ...software, icon_link: e.target.value })} />
          <StandardTextField hasError={software.image_link.length === 0} value={software.image_link} label='Image Link' onChange={(e) => setSoftware({ ...software, image_link: e.target.value })} />
          <StandardTextField hasError={software.description.length === 0} value={software.description} rows={4} label='Description' onChange={(e) => setSoftware({ ...software, description: e.target.value })} />
          <StandardTextField hasError={software.repo_link.length === 0} value={software.repo_link} label='Repository Link' onChange={(e) => setSoftware({ ...software, repo_link: e.target.value })} />
          <StandardTextField hasError={software.languages.length === 0} value={software.languages} label='Languages' onChange={(e) => setSoftware({ ...software, languages: e.target.value })} />
          <StandardTextField value={software.youtube_link} label='Youtube Video Identifier' onChange={(e) => setSoftware({ ...software, youtube_link: e.target.value })} />
          <StandardDatePicker label='Development Date' date={new Date(software.dev_date)} setDate={(d) => setSoftware({ ...software, dev_date: d })} />
          <Row>
            <Col span={12}>
              <StandardCheckBox label='Windows' value={software.windows} onChange={() => setSoftware({ ...software, windows: !software.windows })} />
            </Col>
            <Col span={12}>
              <StandardCheckBox label='Linux' value={software.linux} onChange={() => setSoftware({ ...software, linux: !software.linux })} />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <StandardCheckBox label='Mac' value={software.mac} onChange={() => setSoftware({ ...software, mac: !software.mac })} />
            </Col>
            <Col span={12}>
              <StandardCheckBox label='Android' value={software.android} onChange={() => setSoftware({ ...software, android: !software.android })} />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <StandardCheckBox label='Legacy Application' value={software.is_legacy} onChange={() => setSoftware({ ...software, is_legacy: !software.is_legacy })} />
            </Col>
          </Row>
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
  const isWebApplication = !software.windows && !software.linux && !software.mac && !software.android;
  const [imageLoading, setImageLoading] = useState(true);
  const compatibilityStyling = { marginLeft: '3px', marginRight: '3px' };

  return (
    <tr style={{ opacity: imageLoading ? 0 : 1 }} className='tableMouseOver'>
      <CustomTd style={{ width: '50%' }}>
        <StandardImage noLoader onLoaded={() => setImageLoading(false)} noErrorMessage src={software.icon_link} style={{ width: getIconSizing() }} />
        {software.name}
      </CustomTd>
      <CustomTd>{dateDisplayString}</CustomTd>
      <CustomTd>
        {software.windows && <StandardTooltip text='Windows'><MDBIcon style={compatibilityStyling} className='defaultMouseOver' fab icon="windows" /></StandardTooltip>}
        {software.linux && <StandardTooltip text='Linux'><MDBIcon style={compatibilityStyling} className='defaultMouseOver' fab icon="linux" /></StandardTooltip>}
        {software.mac && <StandardTooltip text='Apple'><MDBIcon style={compatibilityStyling} className='defaultMouseOver' fab icon="apple" /></StandardTooltip>}
        {software.android && <StandardTooltip text='Android'><MDBIcon style={compatibilityStyling} className='defaultMouseOver' fab icon="android" /></StandardTooltip>}
        {isWebApplication && <StandardTooltip text='Web Application'><MDBIcon style={compatibilityStyling} className='defaultMouseOver' fab icon="chrome" /></StandardTooltip>}
      </CustomTd>
      {userData?.group === 'Administrator' && <CustomTd noOnClick><EditSoftware displayAlert={displayAlert} setSoftware={setSoftware} software={software} /></CustomTd>}
    </tr>
  );
};

export default SoftwareTable;

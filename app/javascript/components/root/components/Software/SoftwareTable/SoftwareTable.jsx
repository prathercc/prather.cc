import React, { useEffect, useState } from 'react';
import { fetchAllSoftware, postSoftware, putSoftware, deleteSoftware } from '../../../softwareService';
import { StandardPage, StandardButton, StandardModal, StandardIconButton, toggleNotification } from '../../Utility/Utility';
import { Row, Col, Spin, Form, Input, DatePicker, Checkbox, Table } from 'antd';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import moment from 'moment';

function SoftwareTable({ userData, setActiveApplication }) {
  const [software, setSoftware] = useState(null);
  const [softwareIsLoading, setSoftwareIsLoading] = useState(true);

  useEffect(() => {
    const loadSoftware = async () => {
      try {
        const { data } = await fetchAllSoftware();
        setSoftware(data);
      }
      catch (e) {
        console.error('Failed to load software: ', e);
      }
      finally {
        setSoftwareIsLoading(false);
      }
    };
    loadSoftware();
  }, []);

  useEffect(() => {
    const assignCompatibility = async (data) => {
      setSoftwareIsLoading(true);
      const updatedData = data.map((x) => (
        {
          ...x, dev_date_display: `${getSeason(new Date(x.dev_date).getMonth())} ${new Date(x.dev_date).getFullYear()}`,
          adminEdit: <EditSoftware setSoftware={setSoftware} software={x} />
        }
      ));
      setSoftware(updatedData);
      setSoftwareIsLoading(false);
    }

    if (software?.length > 0 && !software[0]?.adminEdit)
      assignCompatibility(software)

  }, software);

  const columns = [{
    title: 'Name', dataIndex: 'name', key: 'name', align: 'center', sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ['descend', 'ascend']
  },
  {
    title: 'Development Date', dataIndex: 'dev_date_display', key: 'dev_date', align: 'center', sorter: (a, b) => new Date(a.dev_date) - new Date(b.dev_date),
    sortDirections: ['descend', 'ascend']
  }];
  const adminColumns = [...columns, { title: 'Actions', dataIndex: 'adminEdit', key: 'adminEdit', align: 'center' }];

  return (
    <StandardPage title='Software Table'>
      <Table style={{ marginTop: '5px', padding: '5px' }} pagination={false} onRow={(record) => { return { onClick: event => { if (event.target.tagName === 'TD') setActiveApplication(record.name); } } }} dataSource={software} columns={userData?.group === 'Administrator' && adminColumns || columns} />
      {softwareIsLoading && <Spin style={{ marginTop: '1vh' }} />}
      {userData?.group === 'Administrator' && <EditSoftware setSoftware={setSoftware} />}
    </StandardPage>
  );
};

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
    youtube_link: '',
    dev_date: new Date()
  };
  const [software, setSoftware] = useState(existingSoftware ? existingSoftware : blankSoftware);
  const isSubmitDisabled = software.name.length === 0 || software.icon_link.length === 0 || software.description.length === 0 ||
    software.repo_link.length === 0 || software.languages.length === 0
  const [form] = Form.useForm();

  const handleCreateSoftware = async () => {
    const { data } = await postSoftware(software);
    if (data) {
      const { data } = await fetchAllSoftware();
      setSoftwares(data);
      setSoftware(blankSoftware);
      form.setFieldsValue(blankSoftware);
      setModalOpen(false);
      toggleNotification('success', 'Success', 'Successfully created application!');
    }
    else {
      toggleNotification('error', 'Failure', 'Failed to create application!');
    }
  };
  const handleEditSoftware = async () => {
    const { data } = await putSoftware(software);
    if (data) {
      const { data } = await fetchAllSoftware();
      setSoftwares(data);
      setModalOpen(false);
      toggleNotification('success', 'Success', 'Successfully saved application!');
    }
    else {
      toggleNotification('error', 'Failure', 'Failed to save application!');
    }
  };
  const handleDeleteSoftware = async () => {
    const { data } = await deleteSoftware(software.id);
    if (data) {
      const { data } = await fetchAllSoftware();
      setSoftwares(data);
      setModalOpen(false);
      toggleNotification('success', 'Success', 'Successfully deleted application!');
    }
    else {
      toggleNotification('error', 'Failure', 'Failed to delete application!');
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
    <div>
      {existingSoftware &&
        <StandardIconButton onClick={() => setModalOpen(true)} toolTip='Edit Software' icon={<EditOutlined />} />
      }
      {!existingSoftware &&
        <StandardIconButton onClick={() => setModalOpen(true)} toolTip='Add Software' icon={<PlusOutlined />} />
      }
      <StandardModal title={`Software Alteration - ${!existingSoftware ? 'Create' : 'Modify'}`} buttons={existingSoftware ? <ExistingButtons /> : <NewButtons />} modalOpen={modalOpen} handleModalClose={() => setModalOpen(false)}>
        <Form initialValues={{ ...software }} onValuesChange={(e) => setSoftware({ ...software, ...e })} form={form} layout='vertical'>
          <Form.Item name='name' label='Name'>
            <Input placeholder='Type a name' />
          </Form.Item>
          <Form.Item name='icon_link' label='Icon Image Link'>
            <Input placeholder='Type a URL' />
          </Form.Item>
          <Form.Item name='description' label='Description'>
            <Input.TextArea rows={4} placeholder='Type a description' />
          </Form.Item>
          <Form.Item name='repo_link' label='Repository Link'>
            <Input placeholder='Type a URL' />
          </Form.Item>
          <Form.Item name='languages' label='Language(s)'>
            <Input placeholder='Type a language' />
          </Form.Item>
          <Form.Item name='youtube_link' label='Youtube Link'>
            <Input placeholder='Type a URL' />
          </Form.Item>
          <Form.Item>
            <DatePicker defaultValue={moment(software.dev_date, 'YYYY-MM-DD')} onChange={(dt, dts) => setSoftware({ ...software, dev_date: dts })} />
          </Form.Item>
          <Row>
            <Col span={6}>
              <Form.Item valuePropName='checked' name='windows'>
                <Checkbox>Windows?</Checkbox>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item valuePropName='checked' name='linux'>
                <Checkbox>Linux?</Checkbox>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item valuePropName='checked' name='mac'>
                <Checkbox>Mac?</Checkbox>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item valuePropName='checked' name='android'>
                <Checkbox>Android?</Checkbox>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item valuePropName='checked' name='is_legacy'>
            <Checkbox>Is Legacy?</Checkbox>
          </Form.Item>
        </Form>
      </StandardModal>
    </div>
  );
};

const getSeason = (month) => {
  const winterArr = [11, 12, 1, 2];
  const springArr = [3, 4];
  const summerArr = [5, 6, 7];
  return winterArr.includes(month) ? 'Winter' : springArr.includes(month) ? 'Spring' : summerArr.includes(month) ? 'Summer' : 'Fall';
}

export default SoftwareTable;

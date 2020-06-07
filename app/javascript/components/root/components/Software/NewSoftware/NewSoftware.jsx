import React, { useState, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { postSoftware, putSoftware, deleteSoftware, fetchSoftware } from '../../../softwareService';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../../AppContext';
import { StandardPage, StandardCard, StandardTextField, StandardCheckBox } from '../../Utility/Utility';

function NewSoftware() {
  let { name } = useParams();
  const appSettings = useContext(AppContext);
  const { softwareFontSize } = appSettings;
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
  const [software, setSoftware] = useState(blankSoftware);

  useEffect(() => {
    const fetch = async () => {
      await fetchSoftware(name, setSoftware);
    };
    if (name) {
      fetch();
    }
  }, []);

  const handleCreateSoftware = async () => {
    await postSoftware(software);
    window.open('/software', '_self');
  };
  const handleEditSoftware = async () => {
    await putSoftware(software);
    window.open('/software', '_self');
  };
  const handleDeleteSoftware = async () => {
    await deleteSoftware(software.id);
    window.open('/software', '_self');
  };
  return (
    <StandardPage title='Software Modification Panel'>
      <StandardCard style={{ minWidth: '100%' }} title={!name ? 'Add Software' : 'Modify Software'}>
        <Form.Group style={{ width: '45%' }}>
          <StandardTextField value={software.name} isActive={!name} label='Name' onChange={(e) => setSoftware({ ...software, name: e.target.value })} />
          <StandardTextField value={software.icon_link} label='Icon Image Link' onChange={(e) => setSoftware({ ...software, icon_link: e.target.value })} />
          <StandardTextField value={software.image_link} label='Image Link' onChange={(e) => setSoftware({ ...software, image_link: e.target.value })} />
          <StandardTextField value={software.description} rows={4} label='Description' onChange={(e) => setSoftware({ ...software, description: e.target.value })} />
          <StandardTextField value={software.repo_link} label='Repository Link' onChange={(e) => setSoftware({ ...software, repo_link: e.target.value })} />
          <StandardTextField value={software.languages} label='Languages' onChange={(e) => setSoftware({ ...software, languages: e.target.value })} />
          <StandardCheckBox label='Is this legacy software?' value={software.is_legacy} onChange={() => setSoftware({ ...software, is_legacy: !software.is_legacy })} />
          <StandardCheckBox label='Windows' value={software.is_legacy} onChange={() => setSoftware({ ...software, windows: !software.windows })} />
          <StandardCheckBox label='Linux' value={software.linux} onChange={() => setSoftware({ ...software, linux: !software.linux })} />
          <StandardCheckBox label='Mac' value={software.mac} onChange={() => setSoftware({ ...software, mac: !software.mac })} />
          <StandardCheckBox label='Android' value={software.android} onChange={() => setSoftware({ ...software, android: !software.android })} />
          {name ? (
            <>
              <Button size='sm' style={{ fontSize: softwareFontSize }} onClick={() => handleEditSoftware()} variant='warning' block>
                Save
          </Button>
              <Button size='sm' style={{ fontSize: softwareFontSize }} onClick={() => handleDeleteSoftware()} variant='danger' block>
                Delete
          </Button>
            </>
          ) : (
              <Button size='sm' style={{ fontSize: softwareFontSize }} disabled={software.name.length === 0} onClick={() => handleCreateSoftware()} variant='warning' block>
                Create
              </Button>
            )}
        </Form.Group>
      </StandardCard>
    </StandardPage>
  );
}

export default NewSoftware;

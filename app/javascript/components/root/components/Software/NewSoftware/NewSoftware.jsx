import React, { useState, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { postSoftware, putSoftware, deleteSoftware, fetchSoftware } from '../../../softwareService';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../../AppContext';
import { StandardPage, StandardCard } from '../../Utility/Utility';

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
    <StandardPage title={!name ? 'Add Software' : 'Modify Software'}>
      <StandardCard title=''>
        <Form.Group style={{ width: '65%' }}>
          <Form.Text>Name</Form.Text>
          <Form.Control
            style={{ textAlign: 'center' }}
            size='sm'
            type='text'
            disabled={name}
            placeholder='Name'
            value={software.name}
            onChange={(e) => setSoftware({ ...software, name: e.target.value })}
          />
          <Form.Text>Icon Image Link</Form.Text>
          <Form.Control
            style={{ textAlign: 'center' }}
            size='sm'
            type='text'
            placeholder='Icon Image Link'
            value={software.icon_link}
            onChange={(e) =>
              setSoftware({ ...software, icon_link: e.target.value })
            }
          />
          <Form.Text>Image Link</Form.Text>
          <Form.Control
            style={{ textAlign: 'center' }}
            size='sm'
            type='text'
            placeholder='Image Link'
            value={software.image_link}
            onChange={(e) =>
              setSoftware({ ...software, image_link: e.target.value })
            }
          />
          <Form.Text>Description</Form.Text>
          <Form.Control
            style={{ textAlign: 'center' }}
            size='sm'
            type='text'
            placeholder='Description (html)'
            as='textarea'
            rows='3'
            value={software.description}
            onChange={(e) =>
              setSoftware({ ...software, description: e.target.value })
            }
          />
          <Form.Text>Repository Link</Form.Text>
          <Form.Control
            style={{ textAlign: 'center' }}
            size='sm'
            type='text'
            placeholder='Repository Link'
            value={software.repo_link}
            onChange={(e) =>
              setSoftware({ ...software, repo_link: e.target.value })
            }
          />
          <Form.Text>Languages</Form.Text>
          <Form.Control
            style={{ textAlign: 'center' }}
            size='sm'
            type='text'
            placeholder='Languages'
            value={software.languages}
            onChange={(e) =>
              setSoftware({ ...software, languages: e.target.value })
            }
          />
          <Form.Check
            type='checkbox'
            label='Is this legacy software?'
            checked={software.is_legacy}
            onChange={() =>
              setSoftware({ ...software, is_legacy: !software.is_legacy })
            }
            style={{ marginBottom: '2vh', marginTop: '1vh' }}
          />
          <strong style={{ marginBottom: '1vh' }}>System Compatibility:</strong>

          <Form.Check
            type='checkbox'
            label='Windows'
            checked={software.windows}
            onChange={() =>
              setSoftware({ ...software, windows: !software.windows })
            }
          />
          <Form.Check
            type='checkbox'
            label='Linux'
            checked={software.linux}
            onChange={() => setSoftware({ ...software, linux: !software.linux })}
          />
          <Form.Check
            type='checkbox'
            label='Mac'
            checked={software.mac}
            onChange={() => setSoftware({ ...software, mac: !software.mac })}
          />
          <Form.Check
            type='checkbox'
            label='Android'
            checked={software.android}
            onChange={() =>
              setSoftware({ ...software, android: !software.android })
            }
            style={{ marginBottom: '2vh' }}
          />
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

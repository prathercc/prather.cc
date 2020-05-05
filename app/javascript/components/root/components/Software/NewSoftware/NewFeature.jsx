import React, { useState, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { postFeature, putFeature, deleteFeature, fetchFeature } from '../../../featureService';
import { fetchSoftware } from '../../../softwareService';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../../AppContext';
import { StandardPage, StandardCard } from '../../Utility/Utility';

function NewFeature() {
  let { id, name } = useParams();
  const appSettings = useContext(AppContext);
  const { softwareFontSize } = appSettings;
  const blankFeature = {
    title: '',
    description: '',
    image_link: '',
    content_description: '',
    application_name: name,
    software_id: ''
  };
  const [feature, setFeature] = useState(blankFeature);
  const [app, setApp] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      await fetchFeature(id, setFeature);
    };
    const fetchApp = async () => {
      await fetchSoftware(name, setApp);
    }
    if (id) {
      fetch();
    }
    if (name) {
      fetchApp();
    }
  }, []);

  useEffect(() => {
    if (app !== null) {
      setFeature({ ...feature, software_id: app.id })
    }
  }, [app])

  const handleCreateFeature = async () => {
    await postFeature(feature);
    window.open(`/software/${feature.application_name}`, '_self');
  };
  const handleEditFeature = async () => {
    await putFeature(feature);
    window.open(`/software/${feature.application_name}`, '_self');
  };
  const handleDeleteFeature = async () => {
    await deleteFeature(feature.id);
    window.open(`/software/${feature.application_name}`, '_self');
  };
  return (
  <StandardPage title={!id ? 'Add Feature' : 'Modify Feature'}>
      <StandardCard title=''>
        <Form.Group style={{ width: '65%' }}>
          <Form.Text>Application Name</Form.Text>
          <Form.Control
            style={{ textAlign: 'center' }}
            size='sm'
            type='text'
            placeholder='Application Name'
            disabled
            value={feature.application_name}
            onChange={(e) =>
              setFeature({ ...feature, application_name: e.target.value })
            }
          />
          <Form.Text>Title</Form.Text>
          <Form.Control
            style={{ textAlign: 'center' }}
            size='sm'
            type='text'
            placeholder='Title'
            value={feature.title}
            onChange={(e) => setFeature({ ...feature, title: e.target.value })}
          />
          <Form.Text>Description</Form.Text>
          <Form.Control
            style={{ textAlign: 'center' }}
            size='sm'
            type='text'
            placeholder='Description'
            as='textarea'
            rows='3'
            value={feature.description}
            onChange={(e) =>
              setFeature({ ...feature, description: e.target.value })
            }
          />
          <Form.Text>Image Link</Form.Text>
          <Form.Control
            style={{ textAlign: 'center' }}
            size='sm'
            type='text'
            placeholder='Image Link'
            value={feature.image_link}
            onChange={(e) =>
              setFeature({ ...feature, image_link: e.target.value })
            }
          />
          <Form.Text>Content Description</Form.Text>
          <Form.Control
            style={{ textAlign: 'center', marginBottom: '1vh' }}
            size='sm'
            type='text'
            as='textarea'
            rows='3'
            placeholder='Content Description'
            value={feature.content_description}
            onChange={(e) =>
              setFeature({ ...feature, content_description: e.target.value })
            }
          />


          {id ? (
            <>
              <Button size='sm' style={{ fontSize: softwareFontSize }} onClick={() => handleEditFeature()} variant='warning' block>
                Save
          </Button>
              <Button size='sm' style={{ fontSize: softwareFontSize }} onClick={() => handleDeleteFeature()} variant='danger' block>
                Delete
          </Button>
            </>
          ) : (
              <Button
                size='sm' style={{ fontSize: softwareFontSize }}
                disabled={feature.title.length === 0}
                onClick={() => handleCreateFeature()}
                variant='warning'
                block
              >
                Create
              </Button>
            )}
          <Button
            onClick={() =>
              window.open(`/software/${feature.application_name}`, '_self')
            }
            variant='light'
            block
          >
            Back
      </Button>
        </Form.Group>
      </StandardCard>
    </StandardPage>
  );
}

export default NewFeature;

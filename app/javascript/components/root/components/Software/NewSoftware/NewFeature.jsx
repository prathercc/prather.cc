import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import SoftwarePage from '../SoftwarePage/SoftwarePage';
import {
  postFeature,
  putFeature,
  deleteFeature,
  fetchFeature,
} from '../../../featureService';
import { fetchSoftware } from '../../../softwareService';
import { useParams } from 'react-router-dom';

function NewFeature() {
  let { id, name } = useParams();
  const blankFeature = {
    title: '',
    description: '',
    image_link: '',
    content_title: '',
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
    console.log(app);
    if (app !== null) {
      setFeature({ ...feature, software_id: app.id })
    }
  }, [app])

  const handleCreateFeature = async () => {
    await postFeature(feature);
    window.open('/software', '_self');
  };
  const handleEditFeature = async () => {
    await putFeature(feature);
    window.open('/software', '_self');
  };
  const handleDeleteFeature = async () => {
    await deleteFeature(feature.id);
    window.open('/software', '_self');
  };
  return (
    <SoftwarePage>
      <Form>
        <Form.Group>
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
          <Form.Text>Content Title</Form.Text>
          <Form.Control
            style={{ textAlign: 'center' }}
            size='sm'
            type='text'
            placeholder='Content Title'
            value={feature.content_title}
            onChange={(e) =>
              setFeature({ ...feature, content_title: e.target.value })
            }
          />
          <Form.Text>Content Description</Form.Text>
          <Form.Control
            style={{ textAlign: 'center' }}
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
        </Form.Group>
      </Form>

      {id ? (
        <>
          <Button onClick={() => handleEditFeature()} variant='warning' block>
            Save
          </Button>
          <Button onClick={() => handleDeleteFeature()} variant='danger' block>
            Delete
          </Button>
        </>
      ) : (
          <Button
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
        variant='danger'
        block
      >
        Back
      </Button>
    </SoftwarePage>
  );
}

export default NewFeature;

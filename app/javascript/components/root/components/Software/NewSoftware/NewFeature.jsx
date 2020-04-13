import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import SoftwarePage from '../SoftwarePage/SoftwarePage';
import {
  postFeature,
  putFeature,
  deleteFeature,
  fetchFeature,
} from '../../../featureService';
import { useParams } from 'react-router-dom';

function NewFeature(props) {
  let { id, name } = useParams();
  const blankFeature = {
    title: '',
    description: '',
    image_link: '',
    content_title: '',
    content_description: '',
    application_name: name,
  };
  const [feature, setFeature] = useState(blankFeature);

  useEffect(() => {
    const fetch = async () => {
      await fetchFeature(id, setFeature);
    };
    if (id) {
      fetch();
    }
  }, []);

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
      <Form.Control
        size='sm'
        type='text'
        placeholder='Application Name'
        disabled
        value={feature.application_name}
        onChange={(e) =>
          setFeature({ ...feature, application_name: e.target.value })
        }
      />
      <Form.Control
        size='sm'
        type='text'
        placeholder='Title'
        value={feature.title}
        onChange={(e) => setFeature({ ...feature, title: e.target.value })}
      />
      <Form.Control
        size='sm'
        type='text'
        placeholder='Description (html)'
        as='textarea'
        rows='3'
        value={feature.description}
        onChange={(e) =>
          setFeature({ ...feature, description: e.target.value })
        }
      />
      <Form.Control
        size='sm'
        type='text'
        placeholder='Image Link'
        value={feature.image_link}
        onChange={(e) => setFeature({ ...feature, image_link: e.target.value })}
      />
      <Form.Control
        size='sm'
        type='text'
        placeholder='Content Title'
        value={feature.content_title}
        onChange={(e) =>
          setFeature({ ...feature, content_title: e.target.value })
        }
      />
      <Form.Control
        size='sm'
        type='text'
        placeholder='Content Description'
        value={feature.content_description}
        onChange={(e) =>
          setFeature({ ...feature, content_description: e.target.value })
        }
      />

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

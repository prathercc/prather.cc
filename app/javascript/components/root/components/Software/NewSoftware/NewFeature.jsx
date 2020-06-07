import React, { useState, useEffect, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import { postFeature, putFeature, deleteFeature, fetchFeature } from '../../../featureService';
import { fetchSoftware } from '../../../softwareService';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../../AppContext';
import { StandardPage, StandardCard, StandardButton, StandardTextField } from '../../Utility/Utility';

function NewFeature() {
  let { id, name } = useParams();
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
    <StandardPage title={'Feature Panel'}>
      <StandardCard title={!id ? 'Add Feature' : 'Modify Feature'} style={{ minWidth: '100%' }}>
        <Form.Group style={{ width: '45%' }}>
          <StandardTextField value={feature.application_name} isActive={false} label='Application Name' onChange={(e) => setFeature({ ...feature, application_name: e.target.value })} />
          <StandardTextField value={feature.title} label='Title' onChange={(e) => setFeature({ ...feature, title: e.target.value })} />
          <StandardTextField rows={2} value={feature.description} label='Description' onChange={(e) => setFeature({ ...feature, description: e.target.value })} />
          <StandardTextField value={feature.image_link} label='Image Link' onChange={(e) => setFeature({ ...feature, image_link: e.target.value })} />
          <StandardTextField rows={8} value={feature.content_description} label='Content Description' onChange={(e) => setFeature({ ...feature, content_description: e.target.value })} />
          {id &&
            <>
              <StandardButton style={{ marginTop: '1vh' }} onClick={() => handleEditFeature()}>Save</StandardButton>
              <StandardButton style={{ marginTop: '1vh' }} onClick={() => handleDeleteFeature()}>Delete</StandardButton>
            </>
          }
          {!id && <StandardButton style={{ marginTop: '1vh' }} isActive={feature.title.length > 0} onClick={() => handleCreateFeature()}>Create</StandardButton>}
          <StandardButton style={{ marginTop: '1vh' }} onClick={() => window.open(`/software/${feature.application_name}`, '_self')}>Back</StandardButton>
        </Form.Group>
      </StandardCard>
    </StandardPage>
  );
}

export default NewFeature;

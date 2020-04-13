import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import SoftwarePage from '../SoftwarePage/SoftwarePage';
import {
  postSoftware,
  putSoftware,
  deleteSoftware,
} from '../../../softwareService';

function NewSoftware(props) {
  const { value } = props;
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
    ios: false,
    repo_link: '',
    languages: '',
  };
  const [software, setSoftware] = useState(value ? value : blankSoftware);

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
    <SoftwarePage>
      <Form.Control
        size='sm'
        type='text'
        placeholder='Name'
        value={software.name}
        onChange={(e) => setSoftware({ ...software, name: e.target.value })}
      />
      <Form.Control
        size='sm'
        type='text'
        placeholder='Icon Image Link'
        value={software.icon_link}
        onChange={(e) =>
          setSoftware({ ...software, icon_link: e.target.value })
        }
      />
      <Form.Control
        size='sm'
        type='text'
        placeholder='Image Link'
        value={software.image_link}
        onChange={(e) =>
          setSoftware({ ...software, image_link: e.target.value })
        }
      />
      <Form.Control
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
      <Form.Control
        size='sm'
        type='text'
        placeholder='Repository Link'
        value={software.repo_link}
        onChange={(e) =>
          setSoftware({ ...software, repo_link: e.target.value })
        }
      />
      <Form.Control
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
      />
      Compatibility:
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
      />
      <Form.Check
        type='checkbox'
        label='iOS'
        checked={software.ios}
        onChange={() => setSoftware({ ...software, ios: !software.ios })}
      />
      {value ? (
          <>
        <Button onClick={()=> handleEditSoftware()} variant='warning' block>
          Edit
        </Button>
        <Button onClick={()=> handleDeleteSoftware()} variant='danger' block>
          Delete
        </Button>
        </>
      ) : (
        <Button onClick={()=> handleCreateSoftware()} variant='warning' block>
          Create
        </Button>
      )}
    </SoftwarePage>
  );
}

export default NewSoftware;
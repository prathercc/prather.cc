import React, { useEffect, useState } from 'react';
import { Table, Button, Spinner } from 'react-bootstrap';
import SoftwarePage from '../SoftwarePage/SoftwarePage';
import { fetchAllSoftware } from '../../../softwareService';
import SoftwareSample from '../SoftwareApplication/SoftwareSample';

function SoftwareTable(props) {
  const { userData } = props;
  const [software, setSoftware] = useState(null);

  useEffect(() => {
    const loadSoftware = async () => {
      await fetchAllSoftware(setSoftware);
    };
    loadSoftware();
  }, []);

  return (
    <SoftwarePage>
      {software ? (
        <>
          <Table
            striped
            bordered
            responsive
            variant='dark'
            hover
            size='sm'
            style={{ cursor: 'default' }}
          >
            <thead>
              <tr>
                <th>Name</th>
                <th>Language</th>
                <th>Platform(s)</th>
                {userData ? <th></th> : ''}
              </tr>
            </thead>
            <tbody>
              {software.map((app) => {
                return <SoftwareSample key={app.id} value={app} userData={userData}/>;
              })}
            </tbody>
          </Table>
          {userData ? (
            <Button
              block
              variant='warning'
              onClick={() => window.open('/software/admin/new', '_self')}
            >
              Add application
            </Button>
          ) : (
            ''
          )}
        </>
      ) : (
        <Spinner animation='border' />
      )}
    </SoftwarePage>
  );
}
export default SoftwareTable;

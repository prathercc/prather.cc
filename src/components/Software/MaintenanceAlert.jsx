import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';
function MaintenanceAlert(props) {
  const { applicationName, maintained = false } = props;
  const [alertOpen, setAlertOpen] = useState(true);
  return (
    <div style={{fontSize:'calc(2px + 2vmin)'}}>
      {maintained ? (
        <Alert
          variant='success'
          dismissible={false}
          onClose={() => setAlertOpen(false)}
          show={alertOpen}
        >
          {`${applicationName} is actively maintained!`}
        </Alert>
      ) : (
        <Alert
          variant='danger'
          dismissible={false}
          onClose={() => setAlertOpen(false)}
          show={alertOpen}
        >
          {`${applicationName} is no longer maintained and will not receive updates!`}
        </Alert>
      )}
    </div>
  );
}

export default MaintenanceAlert;

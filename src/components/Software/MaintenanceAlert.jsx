import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';
function MaintenanceAlert(props) {
  const { applicationName, maintained = false } = props;
  const [alertOpen, setAlertOpen] = useState(true);
  return (
    <>
      {maintained ? (
        <Alert
          variant='success'
          dismissible
          onClose={() => setAlertOpen(false)}
          show={alertOpen}
        >
          {`${applicationName} is actively maintained!`}
        </Alert>
      ) : (
        <Alert
          variant='danger'
          dismissible
          onClose={() => setAlertOpen(false)}
          show={alertOpen}
        >
          {`${applicationName} is no longer maintained and will not receive updates!`}
        </Alert>
      )}
    </>
  );
}

export default MaintenanceAlert;

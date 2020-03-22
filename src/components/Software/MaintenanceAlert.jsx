import React, { useState, useContext } from 'react';
import { Alert } from 'react-bootstrap';
import { AppContext } from '../../AppContext';
function MaintenanceAlert(props) {
  const appSettings = useContext(AppContext);
  const { softwareMaintenanceFontSize } = appSettings;
  const { applicationName, maintained = false } = props;
  const [alertOpen, setAlertOpen] = useState(true);
  return (
    <div style={{ fontSize: softwareMaintenanceFontSize }}>
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

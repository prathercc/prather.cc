import React from 'react';
import SoftwareTableRow from '../SoftwareTable/SoftwareTableRow';

function SoftwareSample(props) {
  const { value, userData } = props;

  const compatibility = {
    windows: value.windows,
    linux: value.linux,
    mac: value.mac,
    android: value.android,
    ios: value.ios,
  };

  return (
    <>
      <SoftwareTableRow
        applicationName={value.name}
        icon={value.icon_link}
        pageLink={`/software/${value.name}`}
        language={value.languages}
        compatibility={{ ...compatibility }}
        userData={userData}
      />
    </>
  );
}

export default SoftwareSample;

import React, { useContext } from 'react';
import { Card, Table, Dropdown, DropdownButton } from 'react-bootstrap';
import { useCurrentBreakpointName } from 'react-socks';
import { AppContext } from '../../AppContext';
import { Check, X } from 'react-bootstrap-icons';

function SoftwareDownloadButton(props) {
  return (
    <DesktopView compatibility={props.compatibility}>
      {props.children}
    </DesktopView>
  );
}

const DesktopView = props => {
  const appSettings = useContext(AppContext);
  const { fgColorDetail } = appSettings;
  const { compatibility } = props;

  return (
    <Card
      style={{
        backgroundColor: fgColorDetail,
        fontSize: 'calc(10px + 2vmin)',
        alignItems: 'center',
        marginTop: '5vh'
      }}
    >
      <Card.Body style={{ fontSize: 'calc(5px + 2vmin)' }}>
        <strong>System Compatibility</strong>
        <CompatibilityTable compatibility={compatibility} />
        <DownloadButton>{props.children}</DownloadButton>
      </Card.Body>
    </Card>
  );
};

const DownloadButton = props => {
  return (
    <DropdownButton title='Download Application' variant='dark' style={{ marginTop: '1vh' }} size='lg'>
      {props.children}
    </DropdownButton>
  );
};

const CompatibilityTable = props => {
  const {
    compatibility = {
      windows: false,
      linux: false,
      mac: false,
      android: false,
      ios: false
    }
  } = props;
  return (
    <Table
      variant='dark'
      striped
      bordered
      hover
      responsive
      style={{ width: '35vw', marginTop: '2vh' }}
    >
      <thead>
        <tr>
          <th>Windows</th>
          <th>Linux</th>
          <th>Mac</th>
          <th>Android</th>
          <th>iOS</th>
        </tr>
      </thead>
      <tbody>
        <CompatiblityResult boolean={compatibility.windows} />
        <CompatiblityResult boolean={compatibility.linux} />
        <CompatiblityResult boolean={compatibility.mac} />
        <CompatiblityResult boolean={compatibility.android} />
        <CompatiblityResult boolean={compatibility.ios} />
      </tbody>
    </Table>
  );
};

const CompatiblityResult = props => {
  const { boolean } = props;
  return (
    <td>
      {boolean ? (
        <Check style={{ color: 'green', fontSize: '5vw' }} />
      ) : (
        <X style={{ color: 'red', fontSize: '5vw' }} />
      )}
    </td>
  );
};

export default SoftwareDownloadButton;

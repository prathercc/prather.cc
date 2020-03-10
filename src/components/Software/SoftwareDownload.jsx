import React, { useContext } from 'react';
import { Card, Table, Dropdown } from 'react-bootstrap';
import { Breakpoint, useCurrentBreakpointName } from 'react-socks';
import { AppContext } from '../../AppContext';
import { Check, X } from 'react-bootstrap-icons';

function SoftwareDownload(props) {
  return (
    <>
      <Breakpoint xlarge down>
        <DesktopView dlObject={props.dlObject} />
      </Breakpoint>
    </>
  );
}

const DesktopView = props => {
  const appSettings = useContext(AppContext);
  const { fgColorDetail } = appSettings;
  const { dlObject } = props;

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
        <CompatibilityTable dlObject={dlObject} />
        <DownloadButton
          windowsObj={dlObject.windowsObj}
          linuxObj={dlObject.linuxObj}
          macObj={dlObject.macObj}
        />
      </Card.Body>
    </Card>
  );
};

const DownloadButton = props => {
  const { windowsObj, linuxObj, macObj } = props;
  const breakpoint = useCurrentBreakpointName();
  return (
    <Dropdown style={{ marginTop: '1vh' }}>
      <Dropdown.Toggle
        size={
          breakpoint === 'xlarge' ? 'lg' : breakpoint === 'large' ? 'lg' : 'md'
        }
        variant='dark'
      >
        Download Application
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item disabled={windowsObj === null} href={windowsObj !== null ? windowsObj.link : '#'}>
          {windowsObj !== null ? windowsObj.downloadName : 'Windows Binary'}
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item disabled={linuxObj === null} href={linuxObj !== null ? linuxObj.link : '#'}>
          {linuxObj !== null ? linuxObj.downloadName : 'Linux DEB'}
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item disabled={macObj === null} href={macObj !== null ? macObj.link : '#'}>
          {macObj !== null ? macObj.downloadName : 'Macintosh DMG'}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

const CompatibilityTable = props => {
  const { dlObject } = props;
  return (
    <Table
      variant='dark'
      striped
      bordered
      hover
      responsive
      style={{ width: '40vw', marginTop: '2vh' }}
    >
      <thead>
        <tr>
          <th>Windows</th>
          <th>Linux</th>
          <th>Mac</th>
        </tr>
      </thead>
      <tbody>
        <td>
          {dlObject.windowsObj !== null ? (
            <Check style={{ color: 'green', fontSize: '5vw' }} />
          ) : (
            <X style={{ color: 'red', fontSize: '5vw' }} />
          )}
        </td>
        <td>
          {dlObject.linuxObj !== null ? (
            <Check style={{ color: 'green', fontSize: '5vw' }} />
          ) : (
            <X style={{ color: 'red', fontSize: '5vw' }} />
          )}
        </td>
        <td>
          {dlObject.macObj !== null ? (
            <Check style={{ color: 'green', fontSize: '5vw' }} />
          ) : (
            <X style={{ color: 'red', fontSize: '5vw' }} />
          )}
        </td>
      </tbody>
    </Table>
  );
};

export default SoftwareDownload;

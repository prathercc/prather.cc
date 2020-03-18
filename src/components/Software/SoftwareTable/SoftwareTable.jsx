import React, { useContext } from 'react';
import { Container, Jumbotron, Table } from 'react-bootstrap';
import { AppContext } from '../../../AppContext';
import { useCurrentBreakpointName } from 'react-socks';
import SoftwarePage from '../SoftwarePage/SoftwarePage';
import ClickServant from '../Applications/ClickServant/ClickServant';
function SoftwareTable(props) {
  const appSettings = useContext(AppContext);
  const { fgColor, fontStyle } = appSettings;
  const breakpoint = useCurrentBreakpointName();
  return (
    <SoftwarePage>
      <Table striped bordered responsive variant='dark' hover style={{cursor:'default', fontSize: 'calc(4px + 2vmin)'}}>
        <thead>
          <tr>
            <th>Application</th>
          </tr>
        </thead>
        <tbody>
          <ClickServant sample={true} />
        </tbody>
      </Table>
    </SoftwarePage>
  );
}
export default SoftwareTable;

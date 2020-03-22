import React from 'react';
import { Table } from 'react-bootstrap';
import SoftwarePage from '../SoftwarePage/SoftwarePage';
import ClickServant from '../Applications/ClickServant/ClickServant';
function SoftwareTable(props) {
  return (
    <SoftwarePage>
      <Table
        striped
        bordered
        responsive
        variant='dark'
        hover
        style={{ cursor: 'default' }}
      >
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

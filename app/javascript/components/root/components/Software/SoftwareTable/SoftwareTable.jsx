import React from 'react';
import { Table } from 'react-bootstrap';
import SoftwarePage from '../SoftwarePage/SoftwarePage';
import ClickServant from '../Applications/ClickServant/ClickServant';
import DroppedFile from '../Applications/DroppedFile/DroppedFile';
function SoftwareTable(props) {
  return (
    <SoftwarePage>
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
          </tr>
        </thead>
        <tbody>
          <ClickServant sample={true} />
          <DroppedFile sample={true} />
        </tbody>
      </Table>
    </SoftwarePage>
  );
}
export default SoftwareTable;

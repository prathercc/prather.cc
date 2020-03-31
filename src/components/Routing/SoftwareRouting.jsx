import React from 'react';
import { BrowserRouter as Route, Switch } from 'react-router-dom';
import ClickServant from '../Software/Applications/ClickServant/ClickServant';
import SoftwareTable from '../Software/SoftwareTable/SoftwareTable';
import DroppedFile from '../Software/Applications/DroppedFile/DroppedFile';

function SoftwareRouting(props) {
  return (
    <Switch>
      <Route exact path='/software'>
        <SoftwareTable />
      </Route>
      <Route exact path='/software/Click-Servant'>
        <ClickServant />
      </Route>
      <Route exact path='/software/DroppedFile'>
        <DroppedFile />
      </Route>
    </Switch>
  );
}
export default SoftwareRouting;

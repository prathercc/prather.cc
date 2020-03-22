import React from 'react';
import { BrowserRouter as Route, Switch } from 'react-router-dom';
import ClickServant from '../Software/Applications/ClickServant/ClickServant';
import SoftwareTable from '../Software/SoftwareTable/SoftwareTable';

function SoftwareRouting(props) {
  return (
    <Switch>
      <Route exact path='/software'>
        <SoftwareTable />
      </Route>
      <Route exact path='/software/Click-Servant'>
        <ClickServant />
      </Route>
    </Switch>
  );
}
export default SoftwareRouting;

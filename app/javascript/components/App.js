import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Root from './root/Root';
import { BreakpointProvider } from 'react-socks';

class App extends React.Component {
  render() {
    return (
      <BreakpointProvider>
        <Root />
      </BreakpointProvider>
    );
  }
}

export default App;

import React, { Component } from 'react';
import {BrowserRouter} from 'react-router-dom'
import Routes from './Routes'

class App extends Component {
  render() {
    return (
      <BrowserRouter basename="/">
        <div>
          <Routes />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;


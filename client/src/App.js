import React, { Component } from 'react';
import {BrowserRouter} from 'react-router-dom'
import Routes from './Routes'
import Signup from './Components/Sign Up/Signup'
class App extends Component {
  render() {
    return (
      <BrowserRouter basename="/">
        <div style={{maxWidth: "50%"}}>
          {/* <Routes /> */}
          <Signup/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;


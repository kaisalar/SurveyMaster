import React, { Component } from 'react';
import {BrowserRouter} from 'react-router-dom'
import Routes from './Routes'
import './App.css'
import NavBar from './Components/UI/NavBar/NavBar'

class App extends Component {
  render() {
    return (
      <BrowserRouter basename="/">
        <div>
            {/* <NavBar/> */}
            <Routes />
          
        </div>
      </BrowserRouter>
    );
  }
}

export default App;


import React, { Component } from "react";
import "./Homepage.css";

class HomePage extends Component {
  componentDidMount() {
    document.body.classList.add("dark")
  }
  componentWillUnmount() { 
    document.body.classList.remove("dark")

  }
  
  render() {
    return (
      <div className="home-page">
        <div className="img" />
        <div className="content">
          <h1>The Master of surveys</h1>
          <h2>build tour survey with No limits for edit, control, design and more</h2>
          <h3>Sign up now to start your jurney</h3>
          <button>Get Started</button>
        </div>
      </div>
    );
  }
}
export default HomePage;

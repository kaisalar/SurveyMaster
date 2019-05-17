import React from 'react';
import styleClass from './SubmitSection.module.css'
import { MDBBtn } from 'mdbreact';

const SubmitSection= props => {
    return(
        <div className="section">
        <div className={styleClass.SubmitContainer}>
        <h2>We Are Almost Done</h2>
          <h4>Just Click The Button To  Submit Your Respone</h4>
          <MDBBtn color="info" onClick={props.ckicked}>SUBMIT</MDBBtn>
        </div>
          
        </div>
    );
}

export default SubmitSection

import React from 'react';
import { MDBInput, MDBBtn } from "mdbreact";
import styleClass from './Choice.module.css'


const Choise = props => {
    return(
        <div className={styleClass.Choice}>
            <MDBInput
          label={props.el}
          value={props.el}
          onKeyPress={event => props.keyPressedHandler(event)}
          onChange={e =>
            props.changeChoiseHandler(e.target.value)
          }
        />
        <MDBBtn color="red" onClick={props.clicked}>Delete</MDBBtn>
        </div>
        
    );
}

export default Choise

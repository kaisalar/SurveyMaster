import React from 'react';
import { MDBInput, } from "mdbreact";

const TextAnswer= props => {
    return(
        <MDBInput type={props.type} label={props.label} disabled/>
    );
}

export default TextAnswer
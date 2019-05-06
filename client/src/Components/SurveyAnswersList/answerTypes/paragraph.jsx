import React from 'react'
import { MDBInput } from "mdbreact";

const TextareaPage = (props) => {

    const onInputChanged = (event)=>  {
        props.change(event.target.value);
    }
    return (
        <MDBInput 
            type="textarea"
            label="write 250 character at least "
            rows="5"
            icon="pencil-alt"
            onChange = {onInputChanged}
        />
    )
}

export default TextareaPage;


import React from 'react'
import { MDBInput } from "mdbreact";

const TextareaPage = (props) => {
  let length = 0;
    const onInputChanged = (event)=>  {
        length+=1;
        props.change({ value: event.target.value });
        if (length < props.content.max)
            props.change({ value: event.target.value })
        else {
            alert("text limit exceeded")
        }
    }
    return (
        <MDBInput
        maxLength={props.content.max}
        type="textarea"
        label="write 250 character at least "
        rows="5"
        icon="pencil-alt"
        onChange = {onInputChanged}
        />
    )
}

export default TextareaPage;


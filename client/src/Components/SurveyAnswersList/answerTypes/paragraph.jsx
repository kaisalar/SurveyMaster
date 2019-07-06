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
    let  content = props.isResponse ? (<MDBInput
        type="textarea"
        label="write 250 character at least "
        rows="5"
        icon="pencil-alt"
        disabled
        value={props.answer.value}
        />) : (<MDBInput
        maxLength={props.content.max}
        type="textarea"
        label="write 250 character at least "
        rows="5"
        icon="pencil-alt"
        onChange = {onInputChanged}
        />)
    return (
        <React.Fragment>
            {content}
        </React.Fragment>
    )
}

export default TextareaPage;


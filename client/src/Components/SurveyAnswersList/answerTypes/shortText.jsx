import { MDBInput } from "mdbreact";
import React from 'react'
import { Content } from "rsuite";

const shortText = (props) => {
    let length = 0;
   const onTextchanged = (event)=>{
       length+=1
       if(length < props.content.max)
       props.change({value:event.target.value})
       else {
           alert("text limit exceeded")
       }
    }
    return(
    <MDBInput maxLength={props.content.max} label="Here you should write your answer" onChange={onTextchanged}/>)}
export default shortText
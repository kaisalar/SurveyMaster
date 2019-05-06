import { MDBInput } from "mdbreact";
import React from 'react'

const shortText = (props) => {
   const onTextchanged = (event)=>{
        props.change({value:event.target.value})
    }
    return(
    <MDBInput label="Here you should write your answer" onChange={onTextchanged}/>)}
export default shortText
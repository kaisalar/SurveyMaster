import { MDBInput } from "mdbreact";
import React from 'react'
import {Alert} from 'rsuite'

const shortText = (props) => {
    let length = 0;
   const onTextchanged = (event)=>{
       length+=1
       if(length < props.content.max)
       props.change({value:event.target.value})
       else {
           Alert.error('text limit exceeded')
       }
    }
    return(
        <div>
            {/* {props.change({ value: event.target.value })} */}
            <MDBInput maxLength={props.content.max} label="Here you should write your answer" onChange={onTextchanged} />)}
        </div>)
}
export default shortText
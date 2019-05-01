import React from "react";
import { MDBInput } from "mdbreact";

const multipleChoise = props => {
  let choices = props.content.choices;
  return (
    <React.Fragment>
      <MDBInput label="Option1" value={choices[0]} onChange={e =>  props.changed(e,0)}/>
      <MDBInput label="Option2" value={choices[1]} onChange={e =>  props.changed(e,1)}/>
      <MDBInput label="Option3" value={choices[2]} onChange={e =>  props.changed(e,2)}/>
      <MDBInput label="Option4" value={choices[3]} onChange={e =>  props.changed(e,3)}/>
    </React.Fragment>  
  );
};

export default multipleChoise;

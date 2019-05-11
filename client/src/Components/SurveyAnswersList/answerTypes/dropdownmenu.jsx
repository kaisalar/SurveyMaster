import React, { Component } from 'react'
import { Dropdown, ButtonToolbar } from 'rsuite'
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";    
import { SelectPicker } from "rsuite";
import { tsImportEqualsDeclaration } from '@babel/types';

class Dropdownmenu extends Component {
 state={
     title:"Pick a choice",
     active:"",
 }
    onItemSelect = (value) => {
    this.setState({ title: value, active: value }, () => this.props.change({ choices:[value]}))
        console.log(value)
        
    }
    componentDidMount() {
    }
    
    render(){
        this.choicesSentences = this.props.content.choices;

        let items = this.choicesSentences.map((c, i) => <Dropdown.Item key={i} onSelect={this.onItemSelect}
            eventKey={this.state.active}>{c}</Dropdown.Item>)
        const {title,active} = this.state;
    //     return (<ButtonToolbar>
    //     <Dropdown style={{height:'auto'}} title={title} activeKey={active}>
    //      {items}
    //     </Dropdown>

    // </ButtonToolbar>)
    let elements=[];
        for (let i = 0; i < this.choicesSentences.length; i++) {
            const element = {
                label:this.choicesSentences[i],
                value:this.choicesSentences[i],
                role:'Master'
            };
            elements.push(element)
        }


    return(
      

        <SelectPicker searchable={false}
            style={{ width: 224 }}
            data={elements}
            onSelect={this.onItemSelect}
>
           </SelectPicker>
            );
        }

    
        }

export default Dropdownmenu;
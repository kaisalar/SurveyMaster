import React, { Component } from 'react'
import { Dropdown, ButtonToolbar } from 'rsuite'

class Dropdownmenu extends Component {
 state={
     title:"Pick a choice",
     active:"",
 }
    onItemSelect = (value) => {
        this.setState({ title: value ,active:value},()=>this.props.change({value:value}))
        
    }
    render(){
        const {title,active} = this.state;
        return (<ButtonToolbar>
        <Dropdown title={title} activeKey={active}>
            <Dropdown.Item eventKey="Item A" onSelect={this.onItemSelect}>Item A</Dropdown.Item>
            <Dropdown.Item eventKey="Item B" onSelect={this.onItemSelect}>Item B</Dropdown.Item>
            <Dropdown.Item eventKey="Item C" onSelect={this.onItemSelect}>Item C</Dropdown.Item>
            <Dropdown.Item eventKey="Item D" onSelect={this.onItemSelect}>Item D</Dropdown.Item>
        </Dropdown>
    </ButtonToolbar>)
        }
};
export default Dropdownmenu;
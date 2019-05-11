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
    componentDidMount() {
    }
    
    render(){
        this.choicesSentences = this.props.content.choices;

        let items = this.choicesSentences.map((c, i) => <Dropdown.Item key={i} onChange={this.onItemSelect}
            value={i + 1}>{c}</Dropdown.Item>)
        const {title,active} = this.state;
        return (<ButtonToolbar>
        <Dropdown title={title} activeKey={active}>
         {items}
        </Dropdown>
    </ButtonToolbar>)
        }
};
export default Dropdownmenu;
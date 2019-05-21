import React, { Component } from 'react'
import { SelectPicker } from "rsuite";

class Dropdownmenu extends Component {
    state = {
        title: "Pick a choice",
        active: "",
    }
    onItemSelect = (value) => {
        this.setState({ title: value, active: value }, () => this.props.change({ choices: [value] }))
        console.log(value)

    }
    componentDidMount() {
    }

    render() {
        this.choicesSentences = this.props.content.choices;


        let elements = [];
        for (let i = 0; i < this.choicesSentences.length; i++) {
            const element = {
                label: this.choicesSentences[i],
                value: this.choicesSentences[i],
                role: 'Master'
            };
            elements.push(element)
        }


        return (


            <SelectPicker searchable={false}
                style={{ width: 224 }}
                data={elements}
                onSelect={this.onItemSelect}
            />
        );
    }


}

export default Dropdownmenu;
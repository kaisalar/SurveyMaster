import React, { Component } from 'react';
import { SelectPicker } from 'rsuite';

class Dropdownmenu extends Component {
    state = {
        title: 'Pick a choice',
        active: '',
    };
    onItemSelect = value => {
        console.log(value);
        this.setState({ title: value, active: value }, () =>
            this.props.change({ choices: [value] })
        );
    };
    componentDidMount() {
        this.props.change({ choices: [] });
    }

    render() {
        this.choicesSentences = this.props.content.choices;

        let elements = [];
        for (let i = 0; i < this.choicesSentences.length; i++) {
            const element = {
                label: this.choicesSentences[i],
                value: this.choicesSentences[i],
            };
            elements.push(element);
        }
        let content = this.props.isResponse ? (
            <SelectPicker
                disabled
                defaultValue={this.props.answer.choices[0]}
                searchable={false}
                style={{ width: 224 }}
                data={elements}
                onSelect={this.onItemSelect}
            />
        ) : (
            <SelectPicker
                searchable={false}
                style={{ width: 224 }}
                data={elements}
                onSelect={this.onItemSelect}
            />
        );

        return <React.Fragment>{content}</React.Fragment>;
    }
}

export default Dropdownmenu;

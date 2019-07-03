import React from 'react';
import './colorpicker.css';
import { MDBIcon } from 'mdbreact';

class colorPicker extends React.Component {
    constructor() {
        super();
        this.colors = [
            '#eb3b5a',
            '#4b6584',
            '#2d98da',
            '#F79F1F',
            '#5758BB',
            '#1B1464',
            '#6F1E51',
            '#26de81',
        ];
    }
    render() {
        let acolors = this.colors.map((_, i) => (
            <span
                key={i}
                style={{ backgroundColor: this.colors[i] }}
                onClick={() => {
                    console.log(this.colors[i]);
                    this.props.clicked(this.colors[i]);
                }}
            />
        ));
        return (
            <div className="floaing-color-picker-container">
                <div className="floating-color-picker">
                    <MDBIcon icon="palette" />
                    {/* <GithubPicker /> */}
                </div>
                <div className="dropup-content">{acolors}</div>
            </div>
        );
    }
}

export default colorPicker;

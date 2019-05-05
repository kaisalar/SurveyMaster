import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';

const styles = {
  
    slider: {
        padding: '22px 0px',
        margin: 'auto',
        width:'60%'
    },
};

class SimpleSlider extends React.Component {
    state = {
        value: 5,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    this.props.change(value)

    };

    render() {
        const { classes } = this.props;
        const { value } = this.state;

        return (
            <div >
                <Typography id="label">{this.state.value}</Typography>
                <Slider
                step={1}
                    classes={{ container: classes.slider }}
                    value={value}
                    aria-labelledby="label"
                    onChange={this.handleChange}
                    onChangeCapture={(event) => this.props.change(event)}
                />
            </div>
        );
    }
}

SimpleSlider.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleSlider);
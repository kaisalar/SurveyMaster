import React, { Component } from 'react';
import Chart from 'react-apexcharts';
import { chartsTypes } from '../../store/actions/types';

import LeftAlign from '../../Components/UI/LeftAlign/LeftAlign';
class ReportElement extends Component {
    constructor(props) {
        super(props);
        console.log('props', this.props.data);
        this.state = {
            // must be from redux
            ...this.props.data,
            options: {
                title: {
                    text: this.props.data.title,
                    align: 'center',
                    margin: 20,
                    offsetY: 20,
                    style: {
                        fontSize: '25px',
                    },
                },
                chart: {
                    id: 'basic-bar',
                },
                xaxis: {
                    categories: this.loadingCatigoureis(this.props.data.content)
                        .keys,
                    // ,["asd", 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
                },
                labels: this.loadingCatigoureis(this.props.data.content).keys,
                endingShape: 'rounded',
            },
            series:
                chartsTypes[this.props.data.answerType] === 'pie'
                    ? this.loadingCatigoureis(this.props.data.content).values
                    : [
                        {
                            name: 'series-1',
                            data: this.loadingCatigoureis(
                                this.props.data.content
                            ).values,
                        },
                    ],
        };
        console.log(this.state);
    }
    loadingCatigoureis = mapOfElements => {
        mapOfElements = { ...mapOfElements };
        const keys = [];
        const values = [];
        for (let key in mapOfElements) {
            keys.push(key);
            values.push(mapOfElements[key]);
        }
        console.log('res', { keys: keys, values: values });
        return {
            keys: keys,
            values: values,
        };
    };
    render() {
        // let titleClass = styleClass.QuestionContainer + ' question-container ';
        return (
            <div className="section">
                <div
                //className={titleClass}
                >
                    <div
                    // className={styleClass.Answer}
                    >
                        <React.Fragment>
                            <LeftAlign>
                                <Chart
                                    options={this.state.options}
                                    series={this.state.series}
                                    // labels={this.labels}
                                    type={chartsTypes[this.state.answerType]}
                                    width="500"
                                />
                            </LeftAlign>
                        </React.Fragment>
                    </div>
                </div>
            </div>
        );
    }
}
export default ReportElement;

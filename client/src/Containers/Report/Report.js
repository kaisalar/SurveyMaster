import React, { Component } from 'react';
import ReportElement from './ReportElement';
import { connect } from 'react-redux';

import Loader from '../../Components/UI/Loader/Loader';
// import ReactFullpage from '@fullpage/react-fullpage';

import { previewReport } from '../../store/actions/ReportAction';
class Report extends Component {
    state = {
        redirect: false,
        dataLoaded: false,
    };
    componentDidMount() {
        console.log(this.state);
        this.props.previewReport(
            this.props.match.params.id,
            this.dataLoadedHandler
        );
    }
    dataLoadedHandler = newVal => {
        this.setState({
            dataLoaded: newVal,
        });
    };
    render() {
        const {
            survey: { title, color },
            answers,
        } = this.props;

        // document.body.style.backgroundColor = color;

        let Content = <Loader />;
        let tooltips = [];
        if (this.state.dataLoaded) {
            let elements = answers.map(answer => {
                tooltips.push(answer.title);
                return <ReportElement key={answer._id} data={answer} />;
            });
            // Content = (
            //     <ReactFullpage
            //         navigation
            //         navigationTooltips={tooltips}
            //         render={() => {
            //             return (
            //                 <ReactFullpage.Wrapper>{elements}</ReactFullpage.Wrapper>
            //             );
            //         }}
            //     />
            // ) ||
            Content = elements;
        }
        let redirect = null;
        return (
            <div
                //className={styles.Newlayout}
                style={{ margin: '25px' }}
            >
                {redirect}
                <div
                    // className={styles.SurveyTitle}
                    style={{ margin: "0  auto" }}
                >
                    <h1>{title}</h1>
                </div>
                {Content}
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        survey: state.Report.survey,
        answers: state.Report.answers,
    };
};
export default connect(
    mapStateToProps,
    { previewReport }
)(Report);

import React, { Component } from 'react';
import axios from '../../../axios-requests';
import SurveyItem from '../../../Components/Survey List item/SurveyItem';
import { MDBRow } from 'mdbreact';
import {connect} from 'react-redux';
import {initSurvey} from '../../../store/actions/answersAction'
class Surveys extends Component {

    state = {
        surveys: []
    }
  
    componentDidMount() {
        this.props.initSurvey();
    }
    deleteItemHandler = (id) => {
     

    }
    render() {
        let surveyList = this.props.surveys.map((survey, i) => {
            return (

                <React.Fragment key={i}>
                    <SurveyItem id={survey._id}
                        date={survey.date}
                        title={survey.title}
                        click={() => this.deleteItemHandler(survey._id)}
                        question={survey.question}
                        answer={survey.answer}
                        pages={survey.pages}

                    />
                    {/* <Route path="/:id" exact component={SurveyReport} /> */}
                </React.Fragment>

            )

        })

        return (
            <MDBRow>
                {surveyList}
            </MDBRow>
        );
    }


}
const mapStatetoProps = state => ({
    surveys : state.fill_items.surveys
})
export default connect(mapStatetoProps,{initSurvey})(Surveys);
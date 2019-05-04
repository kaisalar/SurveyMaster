import React, { Component } from 'react';
import SurveyItem from '../../../Components/Surveys items/SurveyItem';
import { MDBRow } from 'mdbreact';
import {connect} from 'react-redux';
import {initSurvey,deleteSurvey} from '../../../store/actions/viewAction'
class Surveys extends Component {
    
    componentDidMount() {
        this.props.initSurvey();
    }
  
    deleteItemHandler = (id) => {
      this.props.deleteSurvey(id);
      this.setState(this.props.initSurvey());
    }
    render() {
        let surveys = this.props.surveys
        let surveyList = surveys.map((survey, i) => {
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

    surveys : state.viewSurvey.surveys
})
export default connect(mapStatetoProps,{initSurvey,deleteSurvey})(Surveys);
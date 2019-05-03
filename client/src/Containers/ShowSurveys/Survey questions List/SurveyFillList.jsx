import React, { Component } from 'react';
import axios from '../../../axios-requests'
import Question from '../../../Components/SurveyAnswersList/SurveyFill_Item/SurveyFill_item';
import { previewSurvey } from '../../../store/actions/answersAction'
import { connect } from 'react-redux';
import Layout from '../../../Components/Layout/Layout';
import { MDBBtn } from 'mdbreact';
import styles from './SurveyFillList.module.css'
/**************** */
/* using answersAction here  */
/* whole questions for a single survey*/
/************* */
class SurveyFillList extends Component {

    createresponse(survey) {
        this.state.response.surveyId = survey.id;
        this.state.response.answers = [];
        // survey.pages[0].foreach( (v)=>{
        //     answers.push({questionid:v._id,type:v.type,content:{choices:["kmsadlkasd","a;slkd;"]} });
        // })
    }
    componentDidMount() {
        this.props.previewSurvey(this.props.match.params.id);
    }

    submitAnswers = () => {
        let answer = this.state.answer;
        console.log(this.state.answer)
        axios.post('/filling/', answer)
            .then(response => console.log(response))
    }
    getAnswerHandler = (event) => {
        this.setState({ answer: event.target.value })
    }
    render() {
        //    console.log("new State in SurveyFillList.jsx", this.props)

        return (
            <div className={styles.layout}>

                <div>
                    <h1>Title :{this.props.title}</h1>
                    <h6>ID: {this.props.id}</h6>
                    <h5>Date: {this.props.date}</h5>
                </div>
                <div>
                    {this.props.surveyPages.map(page => {

                        console.log('page', page)
                        return page.questions.map((question, i) => {
                            console.log('question', question)
                            return (<Question
                                key={i}
                                id={question._id}
                                description={question.description}
                                title={question.title}
                                answerObjectType={question.type}
                                getAnswer={(event) => this.getAnswerHandler()} />)

                        })
                    })}

                </div>
                <MDBBtn gradient="blue">submit</MDBBtn>
            </div>
        )
    }

}
const mapStateToProps = state => {
    return {
        surveyPages: state.fillSurvey.pages,
        id: state.fillSurvey._id,
        date: state.fillSurvey.date,
        title: state.fillSurvey.title,
    }
}
export default connect(mapStateToProps, { previewSurvey })(SurveyFillList); 
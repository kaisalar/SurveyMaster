import React, { Component } from 'react';
import axios from '../../../axios-requests'
import Question from '../../../Components/SurveyAnswersList/SurveyFill_Item/SurveyFill_item';
import { previewSurvey, postAnswers } from '../../../store/actions/answersAction'
import { connect } from 'react-redux';
import { MDBBtn } from 'mdbreact';
import styles from './SurveyFillList.module.css'
/**************** */
/* using answersAction here  */
/* whole questions for a single survey*/
/************* */
class SurveyFillList extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.previewSurvey(this.props.match.params.id);
    }
    onSubmitHandler = () => {
         
        this.props.postAnswers(this.props.answers, this.props.id)
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
        const { id, title, date, surveyPages } = this.props

        return (
            <div className={styles.layout}>

                <div>
                    <h1>Title :{title}</h1>
                    <h6>ID: {id}</h6>
                    <h5>Date: {date}</h5>
                </div>
                <div>
                    {surveyPages.map(page => {

                        //console.log('page', page)
                        return page.questions.map((question, i) => {
                            console.log('question', question)
                            return (<Question
                                key={i}
                                id={question._id}
                                surveyId={id}
                                number={i + 1}
                                title={question.title}
                                answerObjectType={question.type}
                                                                />)

                        })
                    })}

                </div>
                <MDBBtn gradient="blue" style={{ color: 'White', borderRadius: '5px' }}
                    onClick={this.onSubmitHandler}>submit</MDBBtn>
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
           answers: state.questionAnswer
    }
}
export default connect(mapStateToProps, { previewSurvey, postAnswers})(SurveyFillList); 
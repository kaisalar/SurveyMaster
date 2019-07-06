import React, { Component } from 'react';
import axios from '../../../axios-requests';
import Question from '../../../Components/SurveyAnswersList/SurveyFill_Item/SurveyFill_item';
import {
    previewSurvey,
    postAnswers,
} from '../../../store/actions/answersAction';
import ReactFullpage from '@fullpage/react-fullpage';
import { connect } from 'react-redux';
import Loader from '../../../Components/UI/Loader/Loader';
import styles from './SurveyFillList.module.css';
import './style.css';
import SubmitSection from '../../../Components/SubmitSection/SubmitSection';
import TranslateFloating from '../../../Components/AddQuestionFloating/TranslateFloating';
import { Redirect } from 'react-router-dom';
/**************** */
/* using answersAction here  */
/* whole questions for a single survey*/
/************* */
class SurveyFillList extends Component {
    state = {
        redirect: false,
        lcode: null,
        dataLoaded: false,
    };
    componentDidMount() {
        console.log(this.props);
        this.props.previewSurvey(
            this.props.match.params.id,
            this.dataLoadedHandler,
            this.props.match.params.lcode
        );
    }
    dataLoadedHandler = newVal => {
        this.setState({
            dataLoaded: newVal,
        });
    };
    onSubmitHandler = () => {
        console.log(JSON.stringify(this.props.answers));
        this.props.postAnswers(this.props.answers, this.props.id);
    };
    submitAnswers = () => {
        let answer = this.state.answer;
        axios.post('/filling/', answer).then(response => console.log(response));
    };
    getAnswerHandler = event => {
        this.setState({ answer: event.target.value });
    };
    chooseLanguage = code => {
        // console.log('hello');
        // this.setState({ lcode: code });
        window.location = `/fill/${this.props.id}/${code}`;
        // console.log(code);
        // this.dataLoadedHandler(false);
        // this.props.previewSurvey(
        //     this.props.match.params.id,
        //     this.dataLoadedHandler,
        //     code
        // );
    };
    render() {
        //    console.log("new State in SurveyFillList.jsx", this.props)
        document.body.style.backgroundColor = this.props.color;

        const { id, title, surveyPages } = this.props;
        //console.log(color);
        let Content = <Loader />;
        let tooltips = [];
        if (this.state.dataLoaded) {
            let Qs = surveyPages.map(page => {
                return page.questions.map((question, i) => {
                    tooltips.push(question.title);
                    return (
                        <Question
                            key={i}
                            id={question._id}
                            surveyId={id}
                            number={i + 1}
                            title={question.title}
                            answerObjectType={question.type}
                            content={question.content}
                        />
                    );
                });
            });

            Qs.push(
                <SubmitSection key={Qs.length} ckicked={this.onSubmitHandler} />
            );
            tooltips.push('Submit');
            Content = (
                <ReactFullpage
                    navigation
                    navigationTooltips={tooltips}
                    render={() => {
                        return (
                            <ReactFullpage.Wrapper>{Qs}</ReactFullpage.Wrapper>
                        );
                    }}
                />
            );
        }
        let redirect = null;
        if (this.state.lcode != null) {
            redirect = (
                <Redirect
                    to={{
                        pathname: `/fill/${this.props.id}/${this.state.lcode}`,
                    }}
                />
            );
            this.setState({ lcode: null });
        }
        return (
            <div className={styles.Newlayout}>
                {redirect}
                <div className={styles.SurveyTitle}>
                    <h1>{title}</h1>
                </div>
                <TranslateFloating chooseLanguage={this.chooseLanguage} />
                {Content}
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        surveyPages: state.fillSurvey.pages,
        id: state.fillSurvey._id,
        date: state.fillSurvey.date,
        title: state.fillSurvey.title,
        answers: state.questionAnswer,
        error: state.fillSurvey.error,
        color: state.fillSurvey.color,
    };
};
export default connect(
    mapStateToProps,
    { previewSurvey, postAnswers }
)(SurveyFillList);

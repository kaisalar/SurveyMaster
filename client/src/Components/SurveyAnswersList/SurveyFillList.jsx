import React, { Component } from 'react';
import axios from '../../axios-requests'
import { MDBBtn } from 'mdbreact';
import fill_item from './SurveyFill_Item/SurveyFill_item';
class SurveyFillList extends Component {
    state = {
        info: [],
        response:{}
    }
    createresponse(survey){
        this.state.response.surveyId = survey.id;
        this.state.response.answers = [];
        survey.pages[0].foreach( (v)=>{
            answers.push({questionid:v._id,type:v.type,content:{choices:["kmsadlkasd","a;slkd;"]} });
        })
    }
    componentDidMount() {
        axios.get('/filling/'+this.props.match.params.id)
            .then(response => {
                this.setState({ info: response.data })
                console.log(this.state.info)
            })
        console.log(this.state.answer)
    }

    submitAnswers = () => {
        let answer = this.state.answer;
        console.log(this.state.answer)
         axios.post('/filling/',answer)
          .then(response => console.log(response) )
    }
    getAnswerHandler= (event)=>{
        this.setState({answer:event.target.value})
    }
    render() {

        return (this.state.info.map((item ,i)=>{
            return <fill_item
                                id={item._id}
                                title={item.title}
                                date={item.date}
                                question={item.question}
                                getAnswer={(event)=>this.getAnswerHandler()}/>
        })


    }

}
export default SurveyFillList;
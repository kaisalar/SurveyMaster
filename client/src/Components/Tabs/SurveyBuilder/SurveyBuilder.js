import React, { Component } from "react";
import CreateQuestion from "./CreateQuestion/CreateQuestion";
import Question from "../../Question/Question";
import styleClass from "./SurveyBuilder.module.css";
import {MDBBtn} from 'mdbreact'
import axios from 'axios'
class SurveyBuilder extends Component {
  state = {
    Questions: []
  };

  findQuestionIndex = id => {
    let QuestionID = this.state.Questions.findIndex(p => {
      return p._id === id;
    });
    return QuestionID;
  };

  addNewQuestion = () => {
    let newQuestions = [...this.state.Questions];
    const newQuestion = {
      _id: newQuestions.length + 1,
      type: "Text",
      title: "Untitled Question",
      content: {
        choices: ["","","",""],
      }
    };
    newQuestions.push(newQuestion);
    this.setState({ Questions: newQuestions });
  };
  ChangeLabelHandler = (event, id) => {
    let newQuestions = [...this.state.Questions];
    let QuestionID = this.findQuestionIndex(id);
    newQuestions[QuestionID].title = event.target.value;
    this.setState({ Questions: newQuestions });
  };
  ChangeTypeHandler = (event, id) => {
    let newQuestions = [...this.state.Questions];
    let QuestionID = this.findQuestionIndex(id);
    newQuestions[QuestionID].type = event.target.value;
    this.setState({ Questions: newQuestions });
  };
  changeChoiseHandler = (event, ChoiseID, id) => { 
    let newQuestions = [...this.state.Questions];
    let QuestionID = this.findQuestionIndex(id);
    console.log(event, ChoiseID, id);
    newQuestions[QuestionID].content.choices[ChoiseID] = event.target.value;
    this.setState({ Questions: newQuestions });
  }
  submitSurvey = () = { 

  }
  render() {
    let Questions = this.state.Questions.map(el => (
      <Question
        key={el._id}
        type={el.type}
        typeChanged={event => this.ChangeTypeHandler(event, el._id)}
        title={el.title}
        labelChanged={event => this.ChangeLabelHandler(event, el._id)}
        content = {el.content}
        choiseChanged = {(event, id) => this.changeChoiseHandler(event,id,el._id)}
      />
    ));
    return (
      <div className={styleClass.SurveyBuilder}>
        <CreateQuestion clicked={this.addNewQuestion} />
        {Questions}
        <MDBBtn  gradient="blue" onClick={this.submitSurvey}>Submit</MDBBtn>
      </div>
    );
  }
}

export default SurveyBuilder;

// const ans = new Answer({title:"hello"});
// console.log(ans);
// class question {
//     constructor(props){
//         this.id=props.id;
//         this.title=props.title;
//     }
// }
// class textQuestion extends question{
//     constructor(props){
//         super(props);
//         this.type="Text";
//     }
// }
// class survey {
//     constructor() {
//         this.Questions=[
//             new textQuestion({id:1,title:"how are you"}),
//             new textQuestion({id:2,title:"i love you Do you?"})
//         ]
//     }

//     addNewQuestion = () => {
//         this.Questions.push({id: this.Questions.length + 1, title:"newQuestion"});
//       };
// }

// function createquestion(){
//     let id = question.length;
//     let title = "new queiotion";
//     question.push(new question({id:id,title:title}));
// }
// function updateQuestion(id){
//     let question = questions[id];
//     let newquestion = new question(...question);
//     newquestion.title="";
//     newquestion.type="Text";
//     question[id]=newquestion;
//     return newquestion
// }

import React, { Component } from "react";
import CreateQuestion from "../../Components/CreateQuestion/CreateQuestion";
import Question from "../../Components/Question/Question";
import Layout from "../../Components/Layout/Layout";
import SurveyBuilderWelcome from "../../Components/SurveyBuilderWelcome/SurveyBuilderWelcome";
import {
  AddQuestion,
  SubmitNewSurvey
} from "../../store/actions/BuilderAction";
import styleClass from "./SurveyBuilder.module.css";
import "./SurveyBuilder.css";
import { MDBBtn, MDBRow, MDBCol } from "mdbreact";
import { connect } from "react-redux";

class SurveyBuilder extends Component {
  state = {
    showSideEditor: false,
    focusedQuestion: 0
  };

  showSideEditorHandler = index => {
    this.setState({
      showSideEditor: true,
      focusedQuestion: index
    });
  };
  HideSideEditorHandler = () => {
    this.setState({
      showSideEditor: false
    });
  };

  render() {
    const Qs = this.props.pages[0].questions;
    let Questions = [];
    let sideEditor = null
    // let sideEditor = (
    //   <div>
    //     <div class="menu-wrap">
    //       <nav class="menu">
    //         <div class="icon-list">
    //           <a href="#">
    //             <i class="fa fa-fw fa-star-o" />
    //             <span>Favorites</span>
    //           </a>
    //           <a href="#">
    //             <i class="fa fa-fw fa-bell-o" />
    //             <span>Alerts</span>
    //           </a>
    //           <a href="#">
    //             <i class="fa fa-fw fa-envelope-o" />
    //             <span>Messages</span>
    //           </a>
    //           <a href="#">
    //             <i class="fa fa-fw fa-comment-o" />
    //             <span>Comments</span>
    //           </a>
    //           <a href="#">
    //             <i class="fa fa-fw fa-bar-chart-o" />
    //             <span>Analytics</span>
    //           </a>
    //           <a href="#">
    //             <i class="fa fa-fw fa-newspaper-o" />
    //             <span>Reading List</span>
    //           </a>
    //         </div>
    //       </nav>
    //       <button class="close-button" id="close-button">
    //         Close Menu
    //       </button>
    //     </div>
    //     <button class="menu-button" id="open-button">
    //       Open Menu
    //     </button>
    //   </div>
    // );

    // this.state.showSideEditor ? (
    //   <MDBCol size="3">
    //     <SideEditor
    //       HideSideEditor={this.HideSideEditorHandler}
    //       index={this.state.focusedQuestion}
    //     />
    //   </MDBCol>
    // ) : null;
    let PageContent;
    if (Qs.length > 0) {
      Questions = Qs.map((_, index) => {
        return (
          <Question
            key={index}
            index={index}
            clicked={() => this.showSideEditorHandler(index)}
          />
        );
      });
      PageContent = (
        <React.Fragment>
          <div className={styleClass.SurveyBuilder + " "}>
            <CreateQuestion clicked={this.props.AddQuestion} />
            {Questions}
            <div className={styleClass.CreateQuestion}>
              <MDBBtn
                gradient="blue"
                onClick={() => this.props.SubmitNewSurvey(this.props.create)}
              >
                SUBMIT
              </MDBBtn>
            </div>
          </div>
        </React.Fragment>
      );
    } else {
      PageContent = <SurveyBuilderWelcome clicked={this.props.AddQuestion} />;
    }

    return (
      <MDBRow>
        {sideEditor}
        <MDBCol>
          <Layout sideOpened={/*this.state.showSideEditor*/ false}>
            {PageContent}
          </Layout>
        </MDBCol>
      </MDBRow>
      // <React.Fragment>
      // </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    create: state.createSurvey,
    pages: state.createSurvey.pages
  };
};

export default connect(
  mapStateToProps,
  { AddQuestion, SubmitNewSurvey }
)(SurveyBuilder);

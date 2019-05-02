import React from './node_modules/react'
import { MDBBtn } from './node_modules/mdbreact';
const fill_item = props=>(
    <div>
        <div className="card">
            <div className="card-header">
                <h3>title: {this.state.info.title}</h3>
                <h6>ID: {this.state.info._id}</h6>
                <h5>Date: {this.state.info.date}</h5>
            </div>
            <div className="card-body">
                <blockquote className="blockquote mb-0">
                    <h2><strong>Question: </strong> {this.state.info.question}</h2>
                    <footer className="blockquote-footer">Someone famous in<cite title="Source Title">Source Title</cite></footer>
                </blockquote>
            </div>
        </div>
        <br />

        <div className="form-group">
            <p >Your Answer</p>
            <textarea className="form-control" id="exampleFormControlTextarea3" rows="7"
                value={this.state.answer}
                onChange={(event) => this.setState({ answer: event.target.value })}></textarea>
            <MDBBtn gradient="blue" onClick={this.submitAnswers}>submit</MDBBtn>

        </div>
    </div>
)
export default fill_item;
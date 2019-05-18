import React from 'react';
import { SelectPicker } from "rsuite";
import data from "../Question/QuestionsData";
// import './AddQuestionFloating.css';

const AddQuestionFloating = props => {
  return (
    <div className="floating-select-picker">
      <SelectPicker
        // className={styleClass.SelectInput}
        data={data}
        appearance="subtle"
        groupBy="role"
        // value={Q.type}
        searchable={false}
        cleanable={false}
        // onChange={newVal => this.props.ChangeTypeHandler(index, newVal)}
      />
    </div>
  );
};

export default AddQuestionFloating;

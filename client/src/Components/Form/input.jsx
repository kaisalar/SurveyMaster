import React from "react";
import { Message } from 'rsuite';
const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input {...rest} name={name} id={name} className="form-control" style={{ height: '40px' }} />
      {error &&
        <Message showIcon type="error" description={error} />
      }
    </div>
  );
};

export default Input;

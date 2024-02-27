
import React from 'react';

const EmailDetail = (props) => {
  console.log("DETAIL EMAIL: ", props);
  return (
    <div className="email-detail">
      <h2>{props.email.title}</h2>
      <p>From: {props.email.sender}</p>
      <p>{props.email.content}</p>
      <button onClick={() => props.setSelectedEmail(null)}>Back</button>
    </div>
  );
};

export default EmailDetail;

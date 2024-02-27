import React from 'react';
import Email from './Email';

export default function Emails(props){
  
  const handleEmailClick = (email) => {
    props.setSelectedEmail(email);
  };

  return (
    <ul>
      {props.filteredEmails.map((email, index) => (
        <li key={index} onClick={() => handleEmailClick(email)}>
          <Email email={email} toggleRead={props.toggleRead} toggleStar={props.toggleStar}></Email>
        </li>
      ))}
    </ul>
  );
}

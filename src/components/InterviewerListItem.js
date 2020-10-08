import React from 'react'
import "components/InterviewerListItem.scss";
var classNames = require('classnames');

export default function InterviewerListItem(props) {
  /* Individual Interviewer Component */
  const interviewerListItemClass = classNames({
    'interviewers__item': true, 
    "interviewers__item-image": props.avatar,
    "interviewers__item--selected": props.selected,
    'interviewers__item:hover': true
  });
  
  return (  
    <li 
      className={interviewerListItemClass}
      onClick = {props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
};

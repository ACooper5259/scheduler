import React from 'react'
import "components/InterviewerListItem.scss";
var classNames = require('classnames');

export default function InterviewerListItem(props) {
  
  const interviewerListItemClass = classNames({
    'interviewers__item': true, 
    "interviewers__item-image": props.avatar,
    "interviewers__item--selected": props.selected,
    'interviewers__item:hover': true
  });
  
  return (  
    <li 
      className={interviewerListItemClass}
      onClick = {() => {props.setInterviewer(props.name)}}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.name}
    </li>
  )
}

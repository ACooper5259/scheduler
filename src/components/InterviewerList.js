import React from 'react';
import "components/InterviewerList.scss";
import InterviewerListItem from './InterviewerListItem';
import PropTypes from 'prop-types';

export default function InterviewerList(props) {
  /* Interviewers component for the form */
  const interviewerList = props.interviewers.map (interviewer => {
    return(<InterviewerListItem
      key= {interviewer.id}
      name = {interviewer.name}
      avatar = {interviewer.avatar}
      selected = {interviewer.id === props.interviewer}
      setInterviewer = {(event) => {props.setInterviewer(interviewer.id)}}
      />
    );
  });

  InterviewerList.propTypes = {interviewers: PropTypes.array.isRequired};

  return (
      <section className="interviewers">
        <h4 className="interviewers__header text--light">Interviewer</h4>
        <ul className="interviewers__list">{interviewerList}</ul>
      </section>
  );
};

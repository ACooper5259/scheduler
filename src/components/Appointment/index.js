import React, {Fragment} from 'react'
import "./styles.scss";
import Header from './Header';
import Show from './Show';
import Empty from './Empty';


export default function Appointment(props) {
  const interview = props.interview
  const time = props.time
    return (
      <>
      <Header time={time}>  </Header>
      {interview ? <Show student={interview.student} interviewer={interview.interviewer}/> : <Empty />}
      </>
    )
}

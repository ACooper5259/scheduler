import React, {Fragment} from 'react'
import "./styles.scss";
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import useVisualMode from "../../hooks/useVisualMode"
import Form from './Form';
import InterviewerList from 'components/InterviewerList';
import Status from './Status';
import Confirm from './Confirm';



export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "STATUS";
  const CONFIRM = "CONFIRM";
  const DELETING = "STATUS";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  const interview = props.interview
  console.log (props.interview)
  const time = props.time

  function erase() {
    transition (CONFIRM)
    props.cancelInterview(props.id, interview)
    transition (EMPTY)
  }

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    // console.log(interview)
    props.bookInterview(props.id, interview)
    transition(SHOW)
  }
  
// console.log('appt index props:', props)

    return (
      <>
      <Header time={time}>  </Header>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onDelete = {(id,interview) => erase(id, interview)}
          
        />)}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel = {() => transition (EMPTY)} 
          onSave = {(name, interviewer) => save(name, interviewer)}

        />)}
      {mode === SAVING && (
        <Status
        message = "Saving"
        />
      )}
      {mode === CONFIRM && (
        <Confirm
        message = "This action can not be undone. Confirm delete?"
      />)}
      {mode === DELETING && (
        <Status
        message = "Deleting"
        />
      )}
      </>
    )
}

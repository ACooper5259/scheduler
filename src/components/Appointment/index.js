import React, {Fragment} from 'react'
import "./styles.scss";
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import useVisualMode from "../../hooks/useVisualMode"
import Form from './Form';


export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  const interview = props.interview
  const time = props.time
    return (
      <>
      <Header time={time}>  </Header>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />)}
      {mode === CREATE && (
        <Form
          interviewers={[]}
          onCancel = {() => transition (EMPTY)}

          />)}
      )
      </>
    )
}
import React from 'react'
import "./styles.scss";
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import useVisualMode from "../../hooks/useVisualMode"
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';



export default function Appointment(props) {
  /* Appointment Component */

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETING = "DELETING";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  const interview = props.interview
  const time = props.time
 
  /* Functions */
  function confirm() {
    transition (CONFIRM)
  };
  
  function confirmDelete(){
    transition(DELETING, true)
    props.cancelInterview(props.id)
    .then(()=> {transition(EMPTY)})
    .catch (()=> {transition (ERROR_DELETE, true)})
  };
  
  function edit () {
    transition(EDIT)
  };
  
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id, interview)
    .then (() => {transition(SHOW)})
    .catch (()=> {transition (ERROR_SAVE, true)})
  };

  /* Render */
  return (
    <article data-testid="appointment" className="appointment">
    <Header time={time}>  </Header>
    
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    
    {mode === SHOW && (
      <Show
        student={interview.student}
        interviewer={interview.interviewer}
        onDelete = {() => confirm()}
        onEdit = {() => edit()}
      />
    )}
    
    {mode === CREATE && (
      <Form
        interviewers={props.interviewers}
        onCancel = {() => transition (EMPTY)} 
        onSave = {(name, interviewer) => save(name, interviewer)}
      />
    )}
      
    {mode === EDIT && (
      <Form
        name = {interview.student}
        interviewer={interview.interviewer.id}
        interviewers={props.interviewers}
        onCancel = {() => transition (SHOW)} 
        onSave = {(name, interviewer) => save(name, interviewer)}
      />
    )}
    
    {mode === SAVING && (
      <Status
      message = "Saving"
      />
    )}
    
    {mode === CONFIRM && (
      <Confirm
      message = "This action can not be undone. Confirm delete?"
      onConfirm = {() => confirmDelete()}
      onCancel ={()=>{back(SHOW)}}
      />
    )}
    
    {mode === DELETING && (
      <Status
        message = "Deleting"
      />
    )}

    {mode === ERROR_SAVE && (
      <Error
        message= "Error: your request could not be saved"
        onClose= {()=>{back(EMPTY)}}
      />
    )}

    {mode === ERROR_DELETE && (
      <Error
        message= "Error: your request could not be deleted"
        onClose= {()=>{back(SHOW)}}
      />
    )}

    </article>
  );
};

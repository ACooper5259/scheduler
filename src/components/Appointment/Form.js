import React, {useState} from 'react'
import Button from '../Button'
import InterviewerList from '../InterviewerList'

export default function Form(props) {
  /* Appointment Booking Form */
  const [error, setError] = useState("");
  const [name,setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer ||null);

  /* Functions */
  const reset = () => {
    setName("");
    setInterviewer(null);
  }

  const cancel = () => {
    reset();
    props.onCancel();
  }
 
  function validate () {
    if (name === "") {
      setError("student name cannot be blank")
      return;
    }
    setError("");
    props.onSave(name, interviewer);
  }

  /* Render */
  return (
    
    <main className="appointment__card appointment__card--create">
      
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            onChange = {(event) => setName(event.target.value)}
            value = {name}
            data-testid = "student-name-input"
          />
        </form>

        <section className="appointment__validation">{error}</section>
        
        <InterviewerList 
          interviewers={props.interviewers} interviewer={interviewer} 
          setInterviewer={setInterviewer} />
      </section>
      
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={() => cancel()}>Cancel</Button>
          <Button confirm onClick={() => validate()}>Save</Button>
        </section>
      </section>
    
    </main>
  );
};

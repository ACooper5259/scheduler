import React, {useState, useEffect} from "react";
import axios from 'axios'
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay } from "../helpers/selectors";
import { getInterviewersForDay } from "../helpers/selectors";
import { getInterview } from "../helpers/selectors";


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: {}
    })
    
  useEffect(() => {
    const promiseOne = axios.get('http://localhost:8001/api/days')
    const promiseTwo = axios.get('http://localhost:8001/api/appointments')
    const promiseThree = axios.get('http://localhost:8001/api/interviewers')
    const promises = [promiseOne, promiseTwo, promiseThree]
    
    Promise.all(promises)
    .then ((response) => {
      // console.log (response)
      setState ({...state, days: response[0].data, appointments: response[1].data, interviewers: response[2].data})
    })
    }, [])
    
  function bookInterview(id, interview) {
  console.log("id  and interview are:",id, interview);
}


  const setDay = day => {
    setState({...state, day})
    };
  
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  
  const interviewers = getInterviewersForDay(state, state.day);
  
  
  const appointmentsList = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment 
      key={appointment.id} 
      id ={appointment.id}
      time = {appointment.time}
      interview = {interview}
      interviewers = {interviewers}
      bookInterview = {bookInterview}
      />)
    });
    

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay= {setDay}
          />
        </nav>
        
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        
        {appointmentsList}
        {<Appointment id="last" time="5pm" />}
      </section>
    </main>
    
  );
}



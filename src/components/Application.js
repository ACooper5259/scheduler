import React, {useState, useEffect} from "react";
import axios from 'axios'
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay } from "../helpers/selectors";
import { getInterviewersForDay } from "../helpers/selectors";
import { getInterview } from "../helpers/selectors";
import useApplicationData from "hooks/useApplicationData";


export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview, 
    } = useApplicationData()
    
  
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  
  const interviewers = getInterviewersForDay(state, state.day);
  console.log ('interviewers in app.js', interviewers)
  
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
      cancelInterview = {cancelInterview}
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



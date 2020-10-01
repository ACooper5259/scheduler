import React, {useState, useEffect} from "react";
import axios from 'axios'
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment"

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 3, 
        name: "Mildred Nazir", 
        avatar: "https://i.imgur.com/T2WwVfS.png"
        
      }
    }
  },
  {
    id: 4,
    time: "3pm"
  },
  {
    id: 5,
    time: "4pm"
  }
];


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: []
    // appointments: {}
  })
  
  useEffect(() => {
    axios.get('http://localhost:8001/api/days')
    .then ((response) => {
      console.log (response)
      setDays(response.data)
    })
    // return () => {
    //   cleanup
    // }
  }, [])
  
  
  const appointmentsList = appointments.map(appointment => {
    return ( 
      <>
      <Appointment key={appointment.id} {...appointment} />
      {/* <Appointment id="last" time="5pm" /> */}
      
      </>)

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
            days={days}
            day={day}
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
        
      </section>
    </main>
    
  );
}



import React, {useState, useEffect} from "react";
import axios from 'axios'

export default function useApplicationData() {
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: {},
    spots: 5
  })

  useEffect(() => {
    // API calls to the database
    const promiseOne = axios.get('http://localhost:8001/api/days');
    const promiseTwo = axios.get('http://localhost:8001/api/appointments');
    const promiseThree = axios.get('http://localhost:8001/api/interviewers');
    const promises = [promiseOne, promiseTwo, promiseThree];
    
    Promise.all(promises)
    .then ((response) => {
      setState ({...state, days: response[0].data, appointments: response[1].data, interviewers: response[2].data})
    });
    }, []);

  const setDay = day => {
    setState({...state, day})
  };  
  
  const getDay = (appointmentId) => {
    return state.days.filter(day => day.appointments.includes(appointmentId))[0];
  };

  function bookInterview(id, interview) {
    // update null appointment
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    // update appointments object
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const newDays = reduceSpots(id);
    // PUT Request to update database with new appointment information
    return axios.put('http://localhost:8001/api/appointments/' + id , {interview} )
    .then(() => {
      setState({...state, appointments, days: newDays})
    });
  };
  
  function cancelInterview (id) {
    // update appointment with interview set to null
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    // update the appointments object
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const newDays = increaseSpots(id);
    // Delete Request to set interview to null
    return axios.delete('http://localhost:8001/api/appointments/' + id )
    .then(() => {
      setState({...state, appointments, days: newDays})
    });
  };
  
  
  // reducing spots available 
  function reduceSpots(id) {
    let day = getDay(id);
    let newDay = {
      ...day,
      spots: day.spots - 1
    };
    let newDays = state.days;
    for( let i=0; i < state.days.length; i++){
      if(state.days[i].id === newDay.id){
        newDays.splice(i , 1, newDay)
      }
    };
    return newDays
  };

  // increasing spots available by 1
  function increaseSpots(id) {
    let day = getDay(id);
    let newDay = {
      ...day,
      spots: day.spots + 1
    };
    let newDays = state.days;
    for( let i=0; i < state.days.length; i++){
      if(state.days[i].id === newDay.id){
        newDays.splice(i , 1, newDay)
      }
    };
    return newDays
  };

  return {state, setState, setDay, bookInterview, cancelInterview}
};

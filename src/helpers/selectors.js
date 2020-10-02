
const getAppointmentsForDay = (state, day) => {
  if (!state.days){
    return []
  }
  const filteredDay = state.days.filter (elem => elem.name === day)
  const dayObject = filteredDay[0]
  if (!dayObject) {
    return []
  } 
  return dayObject.appointments.map(appointmentId => {return state.appointments[appointmentId]})
};

const getInterviewersForDay = (state, day) => {
  if (!state.days){
    return []
  }
  const filteredDay = state.days.filter (elem => elem.name === day)
  const dayObject = filteredDay[0]
  if (!dayObject) {
    return []
  } 
  return dayObject.interviewers.map(interviewerId => {return state.interviewers[interviewerId]})
};

const getInterview = (state, interview) => {
  
  // interview = state.appointments
  if (interview === null) {
    return null
  };
  let interviewArr = [];
  interviewArr.push(interview)
  console.log('interviewArr[0]', interviewArr[0])
  console.log('state.interviewers', state.interviewers[interviewArr[0].interviewer])
  return {
    "student": interview.student, 
    "interviewer": state.interviewers[interviewArr[0].interviewer]
  }
}

export {getAppointmentsForDay}
export {getInterviewersForDay}
export {getInterview}
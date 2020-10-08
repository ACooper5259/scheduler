/* Selector functions */

const getAppointmentsForDay = (state, day) => {
  if (!state.days){
    return []
  };
  const filteredDay = state.days.filter (elem => elem.name === day);
  const dayObject = filteredDay[0];
  if (!dayObject) {
    return []
  };
  return dayObject.appointments.map(appointmentId => {return state.appointments[appointmentId]})
};

const getInterviewersForDay = (state, day) => {
  if (!state.days){
    return []
  };
  const filteredDay = state.days.filter (elem => elem.name === day);
  const dayObject = filteredDay[0];
  if (!dayObject) {
    return []
  };
  return dayObject.interviewers.map(interviewersId => {return state.interviewers[interviewersId]})
};

const getInterview = (state, interview) => {
  if (interview === null) {
    return null
  };
  let interviewArr = [];
  interviewArr.push(interview);
  return {
    "student": interview.student, 
    "interviewer": state.interviewers[interviewArr[0].interviewer]
  };
};

export {getAppointmentsForDay};
export {getInterviewersForDay};
export {getInterview};
const getAppointmentsForDay = (state, day) => {
  const days = state.days;
  const filteredDay = days.filter (elem => elem.name === day)
  console.log (filteredDay)
  return filteredDay[0].appointments
};

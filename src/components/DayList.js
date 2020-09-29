import React, {useState} from "react";
import DayListItem from './DayListItem';
var classNames = require('classnames');

export default function DayList(props) {
  const {id, name, spots} = props
  const dayList = days.map (day => {
    return(<DayListItem
      key = {day.id}
      name = {day.name}
      spots = {day.spots}
      selected={day.name === props.day}
      setDay={props.setDay}
      />
    )
  })
  return <ul> dayList{days}</ul>
}

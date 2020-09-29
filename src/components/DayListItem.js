import React, {useState} from "react";
import "components/DayListItem.scss";
var classNames = require('classnames');


export default function DayListItem(props) {

  const dayListItemClass = classNames({
    'day-list__item': true, 
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.full
  });

  const formatSpots = (props) => {
    const remainingSpots = props.spots;
    if (remainingSpots === 0) {
      return 'no spots remaining'
    }
    if (remainingSpots === 1) {
      return '1 spot remaining'
    }
    if (remainingSpots > 1) {
      return remainingSpots+' spots remaining'
    }
  }

const noSpot = (props)

  return (
    <li 
      className={dayListItemClass}
      onClick={() => props.setDay(props.name)}
      >
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{ formatSpots(props)}</h3>
    </li>
  );
}

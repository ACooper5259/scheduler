import React from "react";
import "components/Button.scss";
var classNames = require('classnames');

export default function Button(props) {
   /* Application Button Component */
   const buttonClass = classNames("button", {
      "button--confirm": props.confirm,
      "button--danger": props.danger
    });

  return (
      <button 
         className={buttonClass}
         onClick={props.onClick}
         disbled={props.disabled}
      >
         {props.children}
      </button>
  );
};

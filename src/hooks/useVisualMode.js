import React, {useState} from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  function transition (newMode, replace = false) {
    if (replace) {
      return (mode)
    }
    setHistory(current => [...current, newMode]);
    return setMode(newMode);
  }
  function back(){
    if (history.length > 1) {
      history.pop();
    }
    return setMode(history[history.length-1]);
  }
  return { mode, transition, back };
}





import "./styles.css";
import { useState, useEffect } from "react";

function toMMSS(strNum) {
  var sec_num = parseInt(strNum, 10);
  var minutes = Math.floor(sec_num / 60);
  var seconds = sec_num - minutes * 60;

  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return minutes + ":" + seconds;
}

export default function App() {
  const [time, setTime] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [stop, setStop] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (time > 0 && stop === false) {
        setTime(time - 1);
      }
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [time, stop]);

  return (
    <div className="App">
      <label>
        <input
          type="number"
          value={minutes}
          onChange={(e) => {
            setMinutes(e.target.value);
          }}
        />
        Minutes
      </label>

      <label>
        <input
          type="number"
          value={seconds}
          onChange={(e) => {
            setSeconds(e.target.value);
          }}
        />
        Seconds
      </label>

      <button
        onClick={() => {
          setTime(+minutes * 60 + +seconds);
        }}
      >
        START
      </button>

      <button
        onClick={() => {
          setStop(!stop);
        }}
      >
        PAUSE / RESUME
      </button>

      <button
        onClick={() => {
          setTime(0);
          setMinutes(0);
          setSeconds(0);
        }}
      >
        RESET
      </button>

      <h1 data-testid="running-clock">{toMMSS(time)}</h1>
    </div>
  );
}

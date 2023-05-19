export default function Stopwatch(props) {
  let secStr = addZero(props.times.sec);
  let minStr = addZero(props.times.min);
  let hourStr = addZero(props.times.hour);
  let timeStr = `${hourStr}:${minStr}:${secStr}`;
  let bestSec = addZero(props.best.sec);
  let bestMin = addZero(props.best.min);
  let bestHour = addZero(props.best.hour);
  let bestTimeStr = `${bestHour}:${bestMin}:${bestSec}`;
  let bestIsZero =
    props.best.sec + props.best.min + props.best.hour === 0 ? true : false;
  function addZero(num) {
    return num < 10 ? `0${num}` : `${num}`;
  }

  return (
    <div className="stopwatch">
      <p className="timer">Timer: {timeStr}</p>
      <p className="best-time">
        Best Time: {bestIsZero ? "--:--:--" : bestTimeStr}
      </p>
      {props.isBestTime && <h1 className="new-best">New!</h1>}
    </div>
  );
}

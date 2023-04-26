
export default function Stopwatch(props){
    
    let secStr = addZero(props.times.sec);
    let minStr = addZero(props.times.min);
    let hourStr = addZero(props.times.hour);
    let timeStr = `${hourStr}:${minStr}:${secStr}`;
    let bestSec = addZero(props.times.best.sec);
    let bestMin = addZero(props.times.best.min);
    let bestHour = addZero(props.times.best.hour);
let bestTime = `${bestHour}:${bestMin}:${bestSec}`;

    function addZero(num){
        return num < 10 ? `0${num}`: `${num}`;
    }

    return(
        <div className="stopwatch">
            <p className="timer">Timer: {timeStr}</p>
            <p className="best-time">Best Time: {bestTime}</p>
        </div>
    )
}
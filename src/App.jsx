import { useState } from "react";
import { nanoid } from "nanoid";
import { useEffect } from "react";
import Confetti from "react-confetti";
import Dice from "./components/Dice.jsx";
import Header from "./components/Header.jsx";
import Stopwatch from "./components/Stopwatch.jsx";
import Rolls from "./components/Rolls.jsx";

export default function App() {
  let [timerInterval, setTimerInterval] = useState(null);
  let [dice, setDice] = useState(allNewDice(10));
  let [tenzies, setTenzies] = useState(false);
  let [rolls, setRolls] = useState(0);
  let [times, setTimes] = useState({
    hour: 0,
    min: 0,
    sec: 0,
  });
  let [bestTime, setBestTime] = useState(
    () =>
      JSON.parse(localStorage.getItem("bestTime")) || {
        hour: 0,
        min: 0,
        sec: 0,
      }
  );
  let [isBestTime, setIsBestTime] = useState(false);

  function stopTimer() {
    clearInterval(timerInterval);
    setTimerInterval(null);
    console.log("Timer stopped");
  }

  function startTimer() {
    setTimerInterval(setInterval(timer, 1000));
  }

  function timer() {
    setTimes((prevTimes) => {
      let newSec = prevTimes.sec;
      let newMin = prevTimes.min;
      let newHour = prevTimes.hour;

      newSec++;
      if (newSec >= 60) {
        newSec = 0;
        newMin++;
      }
      if (newMin >= 60) {
        newMin = 0;
        newHour++;
      }
      return { ...prevTimes, sec: newSec, min: newMin, hour: newHour };
    });
  }

  function allNewDice(length) {
    const numberOfDice = length;
    let numberArray = [];
    for (let i = 1; i <= numberOfDice; i++) {
      numberArray.push({
        value: getRandomDiceValue(),
        isLocked: false,
        id: nanoid(),
      });
    }
    return numberArray;
  }

  function getRandomDiceValue() {
    const min = 1;
    const max = 6;
    let randomNum = Math.floor(Math.random() * (max - min + 1) + min);
    return randomNum;
  }

  function handleBtnClick() {
    if (tenzies) {
      setDice(allNewDice(10));
      setTimes({ hour: 0, min: 0, sec: 0 });
      setRolls(0);
      stopTimer();
      setIsBestTime(false);
    } else {
      setRolls((prevRolls) => prevRolls + 1);
      setDice((prevDice) =>
        prevDice.map((die) => {
          return !die.isLocked ? { ...die, value: getRandomDiceValue() } : die;
        })
      );
      if (rolls === 0) {
        startTimer();
        console.log("Timer set");
      }
    }
  }

  function handleDiceClick(id) {
    setDice((prevDice) => {
      return prevDice.map((die) => {
        return die.id === id ? { ...die, isLocked: !die.isLocked } : die;
      });
    });
  }

  useEffect(() => {
    localStorage.setItem("bestTime", JSON.stringify(bestTime));
  }, [bestTime]);

  useEffect(() => {
    setTenzies(dice.every((die) => die.value === dice[0].value));
  }, [dice]);

  useEffect(() => {
    if (tenzies) {
      stopTimer();
      setDice((prevDice) =>
        prevDice.map((die) => {
          return die.isLocked === false ? { ...die, isLocked: true } : die;
        })
      );

      setBestTime((prevBest) => {
        if (prevBest.hour == 0 && prevBest.min == 0 && prevBest.sec == 0) {
          setIsBestTime(true);
          return {
            hour: times.hour,
            min: times.min,
            sec: times.sec,
          };
        }
        if (
          times.hour < prevBest.hour ||
          (times.hour == prevBest.hour && times.min < prevBest.min) ||
          (times.min == prevBest.min && times.sec < prevBest.sec)
        ) {
          setIsBestTime(true);
          return {
            hour: times.hour,
            min: times.min,
            sec: times.sec,
          };
        }
        setIsBestTime(false);
        return prevBest;
      });
    }
  }, [tenzies]);

  let diceElements = dice.map((die) => {
    return (
      <Dice
        handleDiceClick={handleDiceClick}
        isLocked={die.isLocked}
        value={die.value}
        key={die.id}
        id={die.id}
      />
    );
  });

  return (
    <div className="content">
      <main>
        {tenzies && <p className="win">Woo-hoo!</p>}
        {tenzies && (
          <Confetti width={window.innerWidth} height={window.innerHeight} />
        )}
        <Header />
        <div className="dice-container">{diceElements}</div>
        <button onClick={handleBtnClick} className="roll-btn">
          {tenzies ? "Restart" : "Roll"}
        </button>
        <div className="game-stats">
          <Rolls rolls={rolls} />
          <Stopwatch isBestTime={isBestTime} best={bestTime} times={times} />
        </div>
      </main>
    </div>
  );
}

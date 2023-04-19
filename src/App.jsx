import { useState } from 'react'
import Die from './components/Die'
import Header from './components/Header';
import { nanoid } from 'nanoid';
import { useEffect } from 'react';
import Confetti from 'react-confetti'

export default function App() {

  let [dice, setDice] = useState(allNewDice(10));
  let [tenzies, setTenzies] = useState(false);

  let diceElements = dice.map(die=>{
    return( <Die 
      handleDieClick={handleDieClick} 
      isLocked={die.isLocked} 
      value={die.value}
      key={die.id}
      id={die.id}
      />)
  })
 
  function allNewDice(length){
    const numberOfDies = length;
    let numberArray = [];
    for(let i=1; i<=numberOfDies; i++){
      numberArray.push({
        value: getRandomDiceValue(), 
        isLocked : false,
        id: nanoid()
      })
    }
    return numberArray;
  }

  function getRandomDiceValue(){
    const min = 1;
    const max = 6;
    let randomNum=Math.floor(Math.random() * (max - min + 1) + min);
    return randomNum;
  }

  function handleBtnClick(){
    if(tenzies){
      setDice(allNewDice(10))
    }else{
      setDice(prevDice => prevDice.map(die=>{
        return !die.isLocked ? {...die, value: getRandomDiceValue()} : die
    }))
    }
    
  }
  
  useEffect(()=>{
    setTenzies(dice.every((die)=>die.value === dice[0].value))
  }, [dice]);

  useEffect(()=>{
    if(tenzies){
      setDice(prevDice => prevDice.map(die=> {
        return die.isLocked===false ? {...die, isLocked: true} : die}))
    }
  }, [tenzies]);

  function handleDieClick(id){
    setDice(prevDice=>{ 
      return prevDice.map(die=>{
        return (die.id===id ? {...die, isLocked: !die.isLocked} : die)
      })
    })
  }

  return (
    <main>
      {tenzies && <p className='win'>You Won!</p>}
      {tenzies && <Confetti width={window.innerWidth} height={window.innerHeight}/>}
      <Header/>
      <div className='dies-container'>{diceElements}</div>
      <button onClick={handleBtnClick} className='roll-btn'>{tenzies ? "Restart" : "Roll"}</button>
    </main>
  )
}



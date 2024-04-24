import {React, useState, useEffect} from 'react';
import './App.css';

function App() {
  return (
    <div className="App w-full h-screen flex justify-center items-center">
      <div id="header" className='w-1/2 h-1/2 flex flex-col justify-center border-4 border-black'>
        <div className="w-full h-1/6 text-center pt-5">
          <h1 className="text-5xl text-white text-center">25+5 Clock</h1>
        </div>
        <Data /> 
       
      </div>
      

    </div>
  );
}
export default App;

function Data() {
  
  const src = "https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" 
  const audio = new Audio(src);
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timer, setTimer] = useState(1500);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  const resetTimer = () => {
    setBreakLength(5);
    setSessionLength(25);
    setTimer(1500);
    setIsRunning(false);
    setIsBreak(false);
  }

  const startStop = () => {
    setIsRunning(!isRunning);
  }

  const decrementBreak = () => {
    if (breakLength > 1) {
      setBreakLength(breakLength - 1);
    }
  }

  const incrementBreak = () => {
    if (breakLength < 60) {
      setBreakLength(breakLength + 1);
    }
  }

  const decrementSession = () => {
    if (sessionLength > 1) {
      setSessionLength(sessionLength - 1);
      setTimer((sessionLength - 1) * 60);
    }
  }

  const incrementSession = () => { 
    if (sessionLength < 60) {
      setSessionLength(sessionLength + 1);
      setTimer((sessionLength + 1) * 60);
    }
  }
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        if (timer === 0) {
          if (isBreak) {
            resetTimer();
            audio.play()
          } else {
            setTimer(breakLength * 60);
            setIsBreak(!isBreak)
            audio.play();
          }
      
        } else {
          setTimer(timer => timer - 1);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, timer, breakLength]);

  return (
    <div className='w-full h-5/6 pb-5'>
      <div className='w-full h-1/2 flex'>
        <div className="w-1/2 h-full ">
          <h1 className="text-center align-middle pt-20 text-3xl h-1/2 text-white">Break Length</h1>
          <div className="flex justify-center items-center h-1/2">
            <button onClick={decrementBreak} className="mr-4 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-1.5 text-center  mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">-</button>
            <h2 className="text-2xl text-white">{breakLength}</h2>
            <button onClick={incrementBreak} className="ml-4 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-1.5 text-center  mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">+</button>
          </div>
        </div>
        <div className="w-1/2 h-full ">
          <h1 className="text-center align-middle pt-20 text-3xl h-1/2 text-white">Session Length</h1>
          <div className="flex justify-center items-center h-1/2">
            <button onClick={decrementSession} className="mr-4 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-1.5 text-center  mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">-</button>
            <h2 className="text-2xl text-white">{sessionLength}</h2>
            <button onClick={incrementSession} className="ml-4 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-1.5 text-center  mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">+</button>
          </div>
        </div>
      </div>
      <div className="w-full h-1/2 ">
        <div className=" w-1/3 m-auto rounded-lg mb-5 p-5">
        <h1 className='text-white text-center align-middle text-3xl h-1/2'>{isBreak ? "Break:":"Session:"}</h1>
        <h1 className="text-white text-center align-middle text-5xl h-1/2 ">{Math.floor(timer/60)}:{Number(timer%60).toFixed(0).padStart(2, '0')}</h1>
        </div>
        
        <button onClick={startStop} className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-1.5 text-center mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          {isRunning ? "Stop" : "Start"}
        </button>
        <button onClick={resetTimer} className="ml-4 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-1.5 text-center mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Reset
        </button>
      </div>
    </div>
  )



}
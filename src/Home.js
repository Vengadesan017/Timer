import React, { useState, useEffect } from 'react';
import './Home.css';
import beepSound from './race.mp3';

function Home({ handleButtonClick ,h,m,s,times}) {

  return (
    <>
      <div className="add" onClick={() => handleButtonClick(2,h,m,s)}><span>Add</span></div>

      <div className="timers">
        {times.map(timer => (
        <div className="timer" key={timer.id}>
          <span className="time">{timer.h.toString().padStart(2, '0')}:{timer.m.toString().padStart(2, '0')}:{timer.s.toString().padStart(2, '0')}</span>
          <div className="start" onClick={() => handleButtonClick(3,timer.h,timer.m,timer.s)}><span >Start</span></div>
        </div>
        ))}

      </div>
    </>
  );
}

function SetTimer({ handleButtonClick ,h,m,s,times}) {

  const [hours, setHours] = useState('00');
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');
  
  return (
    <>
      <div className="SetTime">
        <input type="number" id="hours" placeholder='00' value={hours} onChange={(e) => setHours(e.target.value)} /> :
        <input type="number" id="minutes" placeholder='00' value={minutes} onChange={(e) => setMinutes(e.target.value)} />:
        <input type="number" id="seconds" placeholder='00' value={seconds} onChange={(e) => setSeconds(e.target.value)} />
      </div>

      <div className="ribbon">
        <div className="cancle" onClick={() => handleButtonClick(1,h,m,s)}><span>Cancel</span></div>
        <div className="set" onClick={() => handleButtonClick(5,hours,minutes,seconds)}><span>Set</span></div>


      </div>
    </>
  );
}

//==================

function StartTimer({ handleButtonClick, h, m, s,times }) {
  const [hh, setHHours] = useState(parseInt(h));
  const [mm, setMMinutes] = useState(parseInt(m));
  const [ss, setSSeconds] = useState(parseInt(s));
  const [stoping, setStoping] = useState(true);
// ===============
  const [beeping, setBeeping] = useState(false); // New state for beep control

  const beep = new Audio(beepSound); // Load the beep sound

  useEffect(() => {
    if (!stoping) return; 

    const intervalId = setInterval(() => {
      if (ss === 0) {
        if (mm === 0) {
          if (hh === 0) {
            clearInterval(intervalId);
            // alert("Count Down Completed...");
            setBeeping(true);
            return;
          } else {
            setHHours(ss => ss - 1);
            setMMinutes(59);
            setSSeconds(59);
          }
        } else {
          setMMinutes(prevMM => prevMM - 1);
          setSSeconds(59);
        }
      } else {
        setSSeconds(ssss => ssss - 1);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [stoping, hh, mm, ss]);

// ================================


  // Handle the beep effect
  useEffect(() => {
    let beepInterval;
    if (beeping) {
      beep.play();
      beepInterval = setInterval(() => {
        beep.currentTime = 0; // Reset the audio
        beep.play(); // Play the beep repeatedly
      }, 5000);
    }

    return () => {
      clearInterval(beepInterval);
      beep.pause(); // Stop the sound when beeping ends
      beep.currentTime = 0; // Reset the audio playback
    };
  }, [beeping]);


//======================
  const restart = () => {
    setHHours(parseInt(h));
    setMMinutes(parseInt(m));
    setSSeconds(parseInt(s));
    if(beeping){
      setBeeping(false);
    }
  };

  const stop = () => {
    setStoping(prevStoping => !prevStoping); // Toggle stopping state
    if(beeping){
      setBeeping(false);
    }

  };

  const calculatePercent = () => {
    const initialSeconds = parseInt(h) * 3600 + parseInt(m) * 60 + parseInt(s);
    const currentSeconds = hh * 3600 + mm * 60 + ss;
    return Math.floor((currentSeconds / initialSeconds) * 100);
  };

  return (
    <div className='main'>
      <div className="outerCircle">
        <div className="circle" style={{ background: `conic-gradient(#ccc ${calculatePercent()}%, 0, #2C2C2C)` }}>
          <span className='percent'>{calculatePercent()}%</span>
        </div>
      </div>

      <div className="TimeCounters">
        <div className="TimeCounter">
          <input type="number" id="hours" value={hh.toString().padStart(2, '0')} placeholder='00' /> :
          <input type="number" id="minutes" value={mm.toString().padStart(2, '0')} placeholder='00' />:
          <input type="number" id="seconds" value={ss.toString().padStart(2, '0')} placeholder='00' />
        </div>
      </div>

      <div className="ribbon">
        <div className="restart" onClick={restart}><span>Restart</span></div>
        <div className="home_icon" onClick={() => handleButtonClick(1, hh, mm, ss)}><span><i className="fa fa-home"></i></span></div>
        <div className="stop" onClick={stop}><span>{stoping ? 'Stop' : 'Resume'}</span></div>
      </div>
    </div>
  );
}

export { Home, SetTimer, StartTimer };

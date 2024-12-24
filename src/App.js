import React, { useState, useEffect } from 'react';
import './App.css';
import {Home,SetTimer,StartTimer} from './Home.js';


function App() {


    const [activeContainer, setActiveContainer] = useState(1);
    const [h, setHours] = useState(0);
    const [m, setMinutes] = useState(0);
    const [s, setSeconds] = useState(0);

    const [times,settimes]=useState([
      { id: 1, h: '00', m: '30', s: '00' },
      { id: 2, h: '00', m: '25', s: '00' },
      { id: 3, h: '00', m: '10', s: '00' },
      { id: 4, h: '00', m: '00', s: '10' },

    ]);


    const handleButtonClick = (containerNumber,h,m,s,timess) => {
      setActiveContainer(containerNumber);
      setHours(h);
      setMinutes(m);
      setSeconds(s);

      if (containerNumber === 5) {
            const new_time={ id: times.length+1, h: parseInt(h, 10), m: parseInt(m, 10), s: parseInt(s, 10) };

             settimes([...times,new_time ]);
            setActiveContainer(1);

      }

    };



   const [currentTime, setCurrentTime] = useState('');

    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };

    useEffect(() => {
      updateTime(); // Initial update
      const intervalId = setInterval(updateTime, 10000);
      return () => clearInterval(intervalId); 
    }, []);




  return (
    <div className="container">
      <div className="center">
          <div className="CurrentTime"><span >{currentTime}</span></div>


        {activeContainer === 1 && <Home handleButtonClick={handleButtonClick} h={h} m={m} s={s} times={times}/>}
        {activeContainer === 2 && <SetTimer handleButtonClick={handleButtonClick} h={h} m={m} s={s} times={times}/>}
        {activeContainer === 3 && <StartTimer handleButtonClick={handleButtonClick} h={h} m={m} s={s} times={times} />}


        
       
      </div>
    </div>

  );
}

export default App;

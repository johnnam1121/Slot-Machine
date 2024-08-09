'use client'
import background from '../public/assets/background.jpg'
import { useState } from 'react';
import JinGrandma from '../public/assets/slotItems/JinGrandma.jpg';
import Group from '../public/assets/slotItems/Group.jpg';
import Hyerim from '../public/assets/slotItems/Hyerim.jpg';
import John from '../public/assets/slotItems/John.jpg';
import Kevin from '../public/assets/slotItems/Kevin.jpg';
import Thao from '../public/assets/slotItems/Thao.jpg';
import Mina from '../public/assets/slotItems/Mina.jpg';
import Jose from '../public/assets/slotItems/Jose.jpg';
import TonyAlex from '../public/assets/slotItems/TonyAlex.jpg';
import JJKevin from '../public/assets/slotItems/JJKevin.jpg';

export default function Home() {
  const [credits, setCredits] = useState(0);
  const [password, setPassword] = useState('');

  const correctPassword = 'Benny';

  const backgroundImageStyle = {
    backgroundImage: `url(${background.src})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    color: 'white',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
  };

  const handleCreditIncrease = () => {
    if (password === correctPassword) {
      setCredits(100);
      setPassword('');
      alert('100 Credits Added!');
    } else {
      alert('Incorrect password. Please try again.');
    }
  }
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleCreditIncrease();
    }
  };

  //slots logic
  const images = [
    { image: Mina, weight: 1 },      // 1/1000
    { image: Thao, weight: 1.26 },      // 1/500
    { image: Group, weight: 1.587 },     // 1/250
    { image: Kevin, weight: 2.154 },     // 1/100
    { image: JinGrandma, weight: 2.371 }, // 1/75
    { image: JJKevin, weight: 2.714 },   // 1/50
    { image: TonyAlex, weight: 3.42 },  // 1/25
    { image: Jose, weight: 4.642 },      // 1/10
    { image: John, weight: 5.848 },      // 1/5
    { image: Hyerim, weight: 7.368 },    // 2/5
  ];

  const [slots, setSlots] = useState([images[0], images[1], images[2]]);
  const [rolling, setRolling] = useState(false);
  const weightedArray = [];

  images.forEach(item => {
    for (let i = 0; i < Math.round(item.weight * 1000); i++) { // Multiply by 1000 for better granularity
      weightedArray.push(item.image);
    }
  });

  const rollSlots = (betSize) => {
    if (credits >= betSize) {
      setCredits(credits - betSize)
      setRolling(true);

      const roll = () => {
        setSlots([
          weightedArray[Math.floor(Math.random() * weightedArray.length)],
          weightedArray[Math.floor(Math.random() * weightedArray.length)],
          weightedArray[Math.floor(Math.random() * weightedArray.length)],
        ]);
      };

      let rollCount = 0;
      const interval = setInterval(() => {
        roll();
        rollCount++;
        if (rollCount > 10) { // Stop rolling after a few cycles
          clearInterval(interval);
          setRolling(false);
          checkMatches();
        }
      }, 100); // Adjust the speed of the roll
    }
    else {
      alert('Not enough credits! Contact the house for more credits!')
    }
  };

  const checkMatches = () => {
    // Check for consecutive matches
    let firstSlot = document.getElementById('slot0')
    let secondSlot = document.getElementById('slot2')
    let thirdSlot = document.getElementById('slot3')

    console.log(firstSlot.src)

    if (firstSlot.src === secondSlot.src && firstSlot.src === thirdSlot.src) {
      console.log('all match!')
    }

  };

  return (
    <div style={backgroundImageStyle}>
      <h1 className='text-4xl font-extrabold mt-20 bg-gray-800 bg-opacity-75 rounded-lg shadow-lg p-5 text-center border-4 border-white'>
        Happy Birthday Hyerim!
      </h1>

      <div className='absolute top-10 left-10 text-center bg-gray-800 bg-opacity-75 rounded-lg shadow-lg p-3'>
        <button
          onClick={handleCreditIncrease}
          className='text-xl font-bold  text-center mt-2'
        >
          Need more credits?
        </button>
        <input
          type='password'
          placeholder='Enter password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDown}
          className='flex text-xl font-bold bg-gray-600 bg-opacity-75 rounded-lg shadow-lg mt-2 p-3 text-center'
        />
      </div>

      <div className='mt-20'>
        <h2 className='text-2xl font-bold bg-gray-800 bg-opacity-75 rounded-lg shadow-lg p-5 text-center '>
          Number of credits: {credits}
        </h2>
      </div>
      <div>
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            {slots.map((slot, index) => (
              <div key={index} className={`slot ${rolling ? 'rolling' : ''}`}>
                <img
                  id={`slot${index}`}
                  src={slot.src}
                  alt={`slot-${index}`}
                  style={{ width: '300px', height: '300px', objectFit: 'cover' }}
                />
              </div>
            ))}
          </div>
          <button onClick={() => rollSlots(1)} disabled={rolling} className="p-3 bg-blue-500 text-white font-bold rounded">
            Spin 1!
          </button>
          <button onClick={() => rollSlots(5)} disabled={rolling} className="p-3 bg-blue-500 text-white font-bold rounded">
            Spin 5!
          </button>
          <button onClick={() => rollSlots(10)} disabled={rolling} className="p-3 bg-blue-500 text-white font-bold rounded">
            Spin 10!
          </button>
          <style jsx>{`
        .slot {
          margin: 0 10px;
          overflow: hidden;
          position: relative;
        }
        .rolling img {
          animation: roll 0.1s infinite linear;
        }
        @keyframes roll {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(0); }
        }
      `}</style>
        </div>
      </div>
    </div>
  )
}

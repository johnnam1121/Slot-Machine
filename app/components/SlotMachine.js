'use client'
import testImage from '../../public/assets/slotItems/Casino.jpg'
import React, { useState, useEffect } from 'react';

export default function SlotMachine() {
  const images = [
    'https://picsum.photos/150?random=1',
    'https://picsum.photos/150?random=2',
    'https://picsum.photos/150?random=3',
    'https://picsum.photos/150?random=4',
    'https://picsum.photos/150?random=5',
    'https://picsum.photos/150?random=6',
    'https://picsum.photos/150?random=7',
    'https://picsum.photos/150?random=8',

  ];

  const [slots, setSlots] = useState([images[0], images[1], images[2]]);
  const [rolling, setRolling] = useState(false);

  const randomizeImages = () => {
    setRolling(true);

    const roll = () => {
      setSlots([
        images[Math.floor(Math.random() * images.length)],
        images[Math.floor(Math.random() * images.length)],
        images[Math.floor(Math.random() * images.length)],
      ]);
    };

    let rollCount = 0;
    const interval = setInterval(() => {
      roll();
      rollCount++;
      if (rollCount > 10) { // Stop rolling after a few cycles
        clearInterval(interval);
        setRolling(false);
      }
    }, 100); // Adjust the speed of the roll

  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        {slots.map((slot, index) => (
          <div key={index} className={`slot ${rolling ? 'rolling' : ''}`}>
            <img
              src={slot}
              alt={`slot-${index}`}
              style={{ width: '150px', height: '150px', objectFit: 'cover' }}
            />
            <img src={testImage} alt='testing' />
          </div>
        ))}
      </div>
      <button onClick={randomizeImages} disabled={rolling} className="p-3 bg-blue-500 text-white font-bold rounded">
        Spin!
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
  );
}

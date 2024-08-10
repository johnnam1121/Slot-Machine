'use client'
import background from '../public/assets/background.jpg'
import { useEffect, useState } from 'react';
import Group from '../public/assets/slotItems/Group.jpg';
import Hyerim from '../public/assets/slotItems/Hyerim.jpg';
import John from '../public/assets/slotItems/John.jpg';
import Kevin from '../public/assets/slotItems/Kevin.jpg';
import Thao from '../public/assets/slotItems/Thao.jpg';
import Mina from '../public/assets/slotItems/Mina.jpg';
import Jose from '../public/assets/slotItems/Jose.jpg';
import TonyAlex from '../public/assets/slotItems/TonyAlex.jpg';
import JJKev from '../public/assets/slotItems/JJKev.jpg';

export default function Home() {
  const [credits, setCredits] = useState(0);
  const [password, setPassword] = useState('');
  const [sounds, setSounds] = useState([]);

  const correctPassword = 'Benny';
  const tempPassword = 'test';

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
    } else if (password === tempPassword) {
      setCredits(1);
      setPassword('');
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
    { image: JJKev, weight: 2.714 },   // 1/50
    { image: TonyAlex, weight: 3.42 },  // 1/25
    { image: Jose, weight: 4.642 },      // 1/10
    { image: John, weight: 5.848 },      // 1/5
    { image: Hyerim, weight: 7.368 },    // 2/5
  ];


  useEffect(() => {
    let rollingAudio;
    let sounds;

    if (typeof window !== 'undefined') {
      // Create Audio objects only in the browser
      rollingAudio = new Audio('/assets/slotSounds/Rolling.wav');
      sounds = [
        new Audio('/assets/slotSounds/Loud.wav'),
        new Audio('/assets/slotSounds/Love.wav'),
        new Audio('/assets/slotSounds/Ohh.wav'),
        new Audio('/assets/slotSounds/Rice.wav'),
        new Audio('/assets/slotSounds/ToxicHyerim.wav'),
        new Audio('/assets/slotSounds/ToxicKevin.wav'),
        new Audio('/assets/slotSounds/What.wav'),
        new Audio('/assets/slotSounds/Genius.wav')
      ];
    }

    // Assign sounds to state or wherever you need them
    setSounds(sounds); // Assuming you want to save the sounds to state
  }, []);

  const [slots, setSlots] = useState([images[0], images[1], images[2]]);
  const [rolling, setRolling] = useState(false);
  const totalWeight = images.reduce((sum, item) => sum + item.weight, 0);

  images.forEach(item => {
    item.normalizedProbability = item.weight / totalWeight;
  });

  const rollSlots = (betSize) => {
    if (credits >= betSize) {
      const rollingAudio = new Audio('/assets/slotSounds/Rolling.wav');
      rollingAudio.volume = 0.5;
      rollingAudio.currentTime = 0;
      rollingAudio.play().then(() => {
        // Play for 2 seconds, then pause
        setTimeout(() => {
          rollingAudio.pause();
          rollingAudio.currentTime = 0; // Reset to start if needed
        }, 3000); // 2000 milliseconds = 2 seconds
      }).catch(error => {
        console.error('Error playing sound:', error);
      });

      setCredits(credits - betSize);
      console.log('current credits', credits);
      setRolling(true);

      const getRandomImage = () => {
        const rand = Math.random();
        let cumulativeProbability = 0;
        for (const item of images) {
          cumulativeProbability += item.normalizedProbability;
          if (rand < cumulativeProbability) {
            return item.image;
          }
        }
        return images[images.length - 1].image; // Fallback to the last image
      };

      const roll = () => {
        setSlots([
          getRandomImage(),
          getRandomImage(),
          getRandomImage(),
        ]);
      };

      let rollCount = 0;
      const interval = setInterval(() => {
        roll();
        rollCount++;
        if (rollCount > 10) { // Stop rolling after a few cycles
          clearInterval(interval);
          setRolling(false);
          setTimeout(() => {
            checkMatches(betSize);
          }, 100); // Adjust the delay as needed
        }
      }, 250); // Adjust the speed of the roll
    } else {
      alert('Not enough credits! Contact the house for more credits!');
    }
  };
  const checkMatches = (betSize) => {
    // Check for consecutive matches
    const firstSlotSrc = document.getElementById('slot0').src;
    const secondSlotSrc = document.getElementById('slot1').src;
    const thirdSlotSrc = document.getElementById('slot2').src;

    // Check if elements are found
    if (!rolling) {
      console.log(firstSlotSrc)
      console.log(secondSlotSrc)
      console.log(thirdSlotSrc)
      // Check for consecutive matches
      if (firstSlotSrc === secondSlotSrc && firstSlotSrc === thirdSlotSrc) {
        console.log('all matches!', firstSlotSrc)
        playRandomSound();
        if (firstSlotSrc.includes('Mina')) {
          setCredits(credits + (betSize * 10000));
        } else if (firstSlotSrc.includes('Thao')) {
          setCredits(credits + (betSize * 8500));
        } else if (firstSlotSrc.includes('Group')) {
          setCredits(credits + (betSize * 7500));
        } else if (firstSlotSrc.includes('Kevin')) {
          setCredits(credits + (betSize * 3000));
        } else if (firstSlotSrc.includes('JJKev')) {
          setCredits(credits + (betSize * 1500));
        } else if (firstSlotSrc.includes('TonyAlex')) {
          setCredits(credits + (betSize * 750));
        } else if (firstSlotSrc.includes('Jose')) {
          setCredits(credits + (betSize * 500));
        } else if (firstSlotSrc.includes('John')) {
          setCredits(credits + (betSize * 250));
        } else if (firstSlotSrc.includes('Hyerim')) {
          setCredits(credits + (betSize * 100));
        }
      }
      else if (firstSlotSrc === secondSlotSrc || firstSlotSrc === thirdSlotSrc) {
        console.log('pair matched!!', firstSlotSrc)
        playRandomSound();
        if (firstSlotSrc.includes('Mina')) {
          setCredits(credits + (betSize * 500));
        } else if (firstSlotSrc.includes('Thao')) {
          setCredits(credits + (betSize * 250));
        } else if (firstSlotSrc.includes('Group')) {
          setCredits(credits + (betSize * 100));
        } else if (firstSlotSrc.includes('Kevin')) {
          setCredits(credits + (betSize * 50));
        } else if (firstSlotSrc.includes('JJKev')) {
          setCredits(credits + (betSize * 25));
        } else if (firstSlotSrc.includes('TonyAlex')) {
          setCredits(credits + (betSize * 10));
        } else if (firstSlotSrc.includes('Jose')) {
          setCredits(credits + (betSize * 5));
        } else if (firstSlotSrc.includes('John')) {
          setCredits(credits + (betSize * 3));
        } else if (firstSlotSrc.includes('Hyerim')) {
          setCredits(credits + (betSize * 2));
        }
      }
      else if (secondSlotSrc === thirdSlotSrc) {
        console.log('pair matched!!', secondSlotSrc)
        playRandomSound();
        if (secondSlotSrc.includes('Mina')) {
          setCredits(credits + (betSize * 500));
        } else if (secondSlotSrc.includes('Thao')) {
          setCredits(credits + (betSize * 250));
        } else if (secondSlotSrc.includes('Group')) {
          setCredits(credits + (betSize * 100));
        } else if (secondSlotSrc.includes('Kevin')) {
          setCredits(credits + (betSize * 50));
        } else if (secondSlotSrc.includes('JJKev')) {
          setCredits(credits + (betSize * 25));
        } else if (secondSlotSrc.includes('TonyAlex')) {
          setCredits(credits + (betSize * 10));
        } else if (secondSlotSrc.includes('Jose')) {
          setCredits(credits + (betSize * 5));
        } else if (secondSlotSrc.includes('John')) {
          setCredits(credits + (betSize * 3));
        } else if (secondSlotSrc.includes('Hyerim')) {
          setCredits(credits + (betSize * 2));
        }
      }
      else {
      }
    } else {
      console.log('One or more slot elements not found.');
    }
  };

  const playRandomSound = () => {
    if (typeof window !== 'undefined') {
      const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
      if (randomSound) {
        randomSound.volume = 1;
        randomSound.currentTime = 0;
        randomSound.play().catch(error => {
          console.error('Error playing sound:', error);
        });
      }
    }
  };

  return (
    <div style={backgroundImageStyle}>
      <h1 className='text-4xl font-extrabold mt-20 bg-gray-800 bg-opacity-75 rounded-lg shadow-lg p-5 text-center border-4 border-white'>
        Happy Birthday Chloe!
      </h1>

      <div className='absolute bottom-10 left-50 text-center bg-gray-800 bg-opacity-75 rounded-lg shadow-lg p-3'>
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
                  style={{ width: '500px', height: '500px', objectFit: 'cover' }}
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


// { image: Mina, weight: 1 },      // 1/1000
// { image: Thao, weight: 1.26 },      // 1/500
// { image: Group, weight: 1.587 },     // 1/250
// { image: Kevin, weight: 2.154 },     // 1/100
// { image: JJKev, weight: 2.714 },   // 1/50
// { image: TonyAlex, weight: 3.42 },  // 1/25
// { image: Jose, weight: 4.642 },      // 1/10
// { image: John, weight: 5.848 },      // 1/5
// { image: Hyerim, weight: 7.368 },    // 2/5    2x - 3x


// const probabilities = {
//   'Mina': 1 / 1000,
//   'Thao': 1 / 500,
//   'Group': 1 / 250,
//   'Kevin': 1 / 100,
//   'JJKev': 1 / 50,
//   'TonyAlex': 1 / 25,
//   'Jose': 1 / 10,
//   'John': 1 / 5,
//   'Hyerim': 2 / 5
// };

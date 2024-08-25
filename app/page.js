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
import Odds from '../public/assets/modalPictures/Odds.jpg';
import Paytable from '../public/assets/modalPictures/Paytable.jpg';
import Angel from '../public/assets/modalPictures/Angel.jpg';
import Image from 'next/image';
import Modal from './components/Modal';

export default function Home() {
  const [credits, setCredits] = useState(0);
  const [password, setPassword] = useState('');
  const [sounds, setSounds] = useState([]);
  const [jackpotSounds, setJackpotSounds] = useState([]);
  const [loseSounds, setLoseSounds] = useState([]);
  const [totalSpins, setTotalSpins] = useState(0);

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
      setCredits(200);
      setPassword('');
      alert('200 Credits Added!');
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

  useEffect(() => {
    let sounds;

    if (typeof window !== 'undefined') {
      // Create Audio objects only in the browser
      sounds = [
        new Audio('/assets/slotSounds/Loud.wav'),
        new Audio('/assets/slotSounds/Love.wav'),
        new Audio('/assets/slotSounds/Ohh.wav'),
        new Audio('/assets/slotSounds/Rice.wav'),
        new Audio('/assets/slotSounds/What.wav'),
        new Audio('/assets/slotSounds/Genius.wav'),
      ];
    }
    sounds.splice(-3);
    // Assign sounds to state or wherever you need them
    setSounds(sounds); // Assuming you want to save the sounds to state
  }, []);

  useEffect(() => {
    let loseSounds;

    if (typeof window !== 'undefined') {
      // Create Audio objects only in the browser
      loseSounds = [
        new Audio('/assets/slotSounds/ToxicHyerim.wav'),
        new Audio('/assets/slotSounds/ToxicKevin.wav'),
        new Audio('/assets/slotSounds/Genius.wav'),
        new Audio('/assets/slotSounds/What.wav'),
      ];
    }
    // Assign sounds to state or wherever you need them
    setLoseSounds(loseSounds); // Assuming you want to save the sounds to state
  }, []);

  useEffect(() => {
    let jackpotSounds;

    if (typeof window !== 'undefined') {
      // Create Audio objects only in the browser
      jackpotSounds = [
        new Audio('/assets/slotSounds/WinningChime.wav'),
        new Audio('/assets/slotSounds/Fanfare.wav'),
        new Audio('/assets/slotSounds/Chime.wav'),
      ];
    }
    sounds.splice(-3);
    // Assign sounds to state or wherever you need them
    setJackpotSounds(jackpotSounds); // Assuming you want to save the sounds to state
  }, []);

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

  const [slots, setSlots] = useState([images[0].image, images[1].image, images[2].image, images[3].image, images[4].image]);
  const [rolling, setRolling] = useState(false);
  const totalWeight = images.reduce((sum, item) => sum + item.weight, 0);

  images.forEach(item => {
    item.normalizedProbability = item.weight / totalWeight;
  });

  const rollSlots = (betSize) => {
    if (credits >= betSize) {
      setTotalSpins(totalSpins + 1);
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
      const adjustedImages = calculateAdjustedWeights();
      const totalWeight = adjustedImages.reduce((sum, item) => sum + item.weight, 0);
      adjustedImages.forEach(item => {
        item.normalizedProbability = item.weight / totalWeight;
      });

      const getRandomImage = () => {
        const rand = Math.random();
        let cumulativeProbability = 0;
        for (const item of images) {
          cumulativeProbability += item.normalizedProbability;
          if (rand < cumulativeProbability) {
            return item.image;
          }
        }
        return adjustedImages[adjustedImages.length - 1].image; // Fallback to the last image
      };

      const roll = () => {
        setSlots([
          getRandomImage(),
          getRandomImage(),
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
    const fourthSlotSrc = document.getElementById('slot3').src;
    const fifthSlotSrc = document.getElementById('slot4').src;

    // Check if elements are found
    if (!rolling) {
      console.log(firstSlotSrc)
      console.log(secondSlotSrc)
      console.log(thirdSlotSrc)
      // Check for consecutive matches

      // all match
      if (firstSlotSrc === secondSlotSrc && firstSlotSrc === thirdSlotSrc && firstSlotSrc === fourthSlotSrc && firstSlotSrc === fifthSlotSrc) {
        console.log('all matches!', firstSlotSrc)
        if (firstSlotSrc.includes('Mina')) {
          playJackpotSound();
          setCredits(credits + (betSize * 5000) - betSize);
        } else {
          playRandomSound();
        }
        if (firstSlotSrc.includes('Thao')) {
          setCredits(credits + (betSize * 3500) - betSize);
          result(betSize * 3500);
        } else if (firstSlotSrc.includes('Group')) {
          setCredits(credits + (betSize * 2500) - betSize);
          result(betSize * 2500);
        } else if (firstSlotSrc.includes('Kevin')) {
          setCredits(credits + (betSize * 2000) - betSize);
          result(betSize * 2000);
        } else if (firstSlotSrc.includes('JJKev')) {
          setCredits(credits + (betSize * 1500) - betSize);
          result(betSize * 1500);
        } else if (firstSlotSrc.includes('TonyAlex')) {
          setCredits(credits + (betSize * 750) - betSize);
          result(betSize * 750);
        } else if (firstSlotSrc.includes('Jose')) {
          setCredits(credits + (betSize * 500) - betSize);
          result(betSize * 500);
        } else if (firstSlotSrc.includes('John')) {
          setCredits(credits + (betSize * 250) - betSize);
          result(betSize * 250);
        } else if (firstSlotSrc.includes('Hyerim')) {
          setCredits(credits + (betSize * 100) - betSize);
          result(betSize * 100);
        }
      }
      // 4 matches
      else if (
        (firstSlotSrc === secondSlotSrc && firstSlotSrc === thirdSlotSrc && firstSlotSrc === fourthSlotSrc) ||
        (firstSlotSrc === secondSlotSrc && firstSlotSrc === thirdSlotSrc && firstSlotSrc === fifthSlotSrc) ||
        (firstSlotSrc === secondSlotSrc && firstSlotSrc === fourthSlotSrc && firstSlotSrc === fifthSlotSrc) ||
        (firstSlotSrc === thirdSlotSrc && firstSlotSrc === fourthSlotSrc && firstSlotSrc === fifthSlotSrc) ||
        (secondSlotSrc === thirdSlotSrc && secondSlotSrc === fourthSlotSrc && secondSlotSrc === fifthSlotSrc)
      ) {
        let matchedSrc;
        if (
          firstSlotSrc === secondSlotSrc &&
          firstSlotSrc === thirdSlotSrc &&
          firstSlotSrc === fourthSlotSrc
        ) {
          matchedSrc = firstSlotSrc;
        } else {
          matchedSrc = secondSlotSrc;
        }

        console.log('Four matches!!', matchedSrc);
        if (matchedSrc.includes('Mina')) {
          playJackpotSound();
          setCredits(credits + (betSize * 750) - betSize);
          result(betSize * 750);
        } else {
          playRandomSound();
        }
        if (matchedSrc.includes('Thao')) {
          setCredits(credits + (betSize * 500) - betSize);
          result(betSize * 500);
        } else if (matchedSrc.includes('Group')) {
          setCredits(credits + (betSize * 300) - betSize);
          result(betSize * 300);
        } else if (matchedSrc.includes('Kevin')) {
          setCredits(credits + (betSize * 200) - betSize);
          result(betSize * 200);
        } else if (matchedSrc.includes('JJKev')) {
          setCredits(credits + (betSize * 125) - betSize);
          result(betSize * 125);
        } else if (matchedSrc.includes('TonyAlex')) {
          setCredits(credits + (betSize * 100) - betSize);
          result(betSize * 100);
        } else if (matchedSrc.includes('Jose')) {
          setCredits(credits + (betSize * 75) - betSize);
          result(betSize * 75);
        } else if (matchedSrc.includes('John')) {
          setCredits(credits + (betSize * 50) - betSize);
          result(betSize * 50);
        } else if (matchedSrc.includes('Hyerim')) {
          setCredits(credits + (betSize * 30) - betSize);
          result(betSize * 30);
        }
      }
      else if (
        (firstSlotSrc === secondSlotSrc && firstSlotSrc === thirdSlotSrc) ||
        (firstSlotSrc === secondSlotSrc && firstSlotSrc === fourthSlotSrc) ||
        (firstSlotSrc === secondSlotSrc && firstSlotSrc === fifthSlotSrc) ||
        (firstSlotSrc === thirdSlotSrc && firstSlotSrc === fourthSlotSrc) ||
        (firstSlotSrc === thirdSlotSrc && firstSlotSrc === fifthSlotSrc) ||
        (firstSlotSrc === fourthSlotSrc && firstSlotSrc === fifthSlotSrc) ||
        (secondSlotSrc === thirdSlotSrc && secondSlotSrc === fourthSlotSrc) ||
        (secondSlotSrc === thirdSlotSrc && secondSlotSrc === fifthSlotSrc) ||
        (secondSlotSrc === fourthSlotSrc && secondSlotSrc === fifthSlotSrc) ||
        (thirdSlotSrc === fourthSlotSrc && thirdSlotSrc === fifthSlotSrc)
      ) {
        let matchedSrc;
        if (
          firstSlotSrc === secondSlotSrc && firstSlotSrc === thirdSlotSrc) {
          matchedSrc = firstSlotSrc;
        } else if (firstSlotSrc === secondSlotSrc && firstSlotSrc === fourthSlotSrc) {
          matchedSrc = firstSlotSrc;
        } else if (firstSlotSrc === secondSlotSrc && firstSlotSrc === fifthSlotSrc) {
          matchedSrc = firstSlotSrc;
        } else if (firstSlotSrc === thirdSlotSrc && firstSlotSrc === fourthSlotSrc) {
          matchedSrc = firstSlotSrc;
        } else if (firstSlotSrc === thirdSlotSrc && firstSlotSrc === fifthSlotSrc) {
          matchedSrc = firstSlotSrc;
        } else if (firstSlotSrc === fourthSlotSrc && firstSlotSrc === fifthSlotSrc) {
          matchedSrc = firstSlotSrc;
        } else if (secondSlotSrc === thirdSlotSrc && secondSlotSrc === fourthSlotSrc) {
          matchedSrc = secondSlotSrc;
        } else if (secondSlotSrc === thirdSlotSrc && secondSlotSrc === fifthSlotSrc) {
          matchedSrc = secondSlotSrc;
        } else if (secondSlotSrc === fourthSlotSrc && secondSlotSrc === fifthSlotSrc) {
          matchedSrc = secondSlotSrc;
        } else if (thirdSlotSrc === fourthSlotSrc && thirdSlotSrc === fifthSlotSrc) {
          matchedSrc = thirdSlotSrc;
        }
        console.log('Three matches!!', matchedSrc);
        if (matchedSrc.includes('Mina')) {
          playJackpotSound();
          setCredits(credits + (betSize * 250) - betSize);
          result(betSize * 250);
        } else {
          playRandomSound();
        }
        if (matchedSrc.includes('Thao')) {
          setCredits(credits + (betSize * 100) - betSize);
          result(betSize * 100);
        } else if (matchedSrc.includes('Group')) {
          setCredits(credits + (betSize * 50) - betSize);
          result(betSize * 50);
        } else if (matchedSrc.includes('Kevin')) {
          setCredits(credits + (betSize * 25) - betSize);
          result(betSize * 25);
        } else if (matchedSrc.includes('JJKev')) {
          setCredits(credits + (betSize * 15) - betSize);
          result(betSize * 15);
        } else if (matchedSrc.includes('TonyAlex')) {
          setCredits(credits + (betSize * 10) - betSize);
          result(betSize * 10);
        } else if (matchedSrc.includes('Jose')) {
          setCredits(credits + (betSize * 5) - betSize);
          result(betSize * 5);
        } else if (matchedSrc.includes('John')) {
          setCredits(credits + (betSize * 3) - betSize);
          result(betSize * 3);
        } else if (matchedSrc.includes('Hyerim')) {
          setCredits(credits + (betSize * 2) - betSize);
          result(betSize * 2);
        }
      }
      else {
        result(null);
        playLoseSound();
      }
    } else {
      console.log('One or more slot elements not found.');
    }
  };
  const calculateAdjustedWeights = () => {
    // Adjust weights based on totalSpins
    const progressiveWeight = (totalSpins / 2000) * 2;
    return images.map(item => {
      if (item.image === Mina) {
        return { ...item, weight: item.weight + progressiveWeight };
      }
      return item;
    });
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
  const playLoseSound = () => {
    if (typeof window !== 'undefined') {
      // if (Math.random() < 0.75) {
      //   return;
      // }
      const loseSound = loseSounds[Math.floor(Math.random() * loseSounds.length)];
      if (loseSound) {
        loseSound.volume = 1;
        loseSound.currentTime = 0;
        loseSound.play().catch(error => {
          console.error('Error playing sound:', error);
        });
      }
    }
  };
  const playJackpotSound = () => {
    if (typeof window !== 'undefined') {
      const firstSound = jackpotSounds[0];
      const secondSound = jackpotSounds[1];
      const thirdSound = jackpotSounds[2];
      if (firstSound && secondSound && thirdSound) {
        firstSound.play().catch(error => {
          console.error('Error playing sound:', error);
        });
        secondSound.play().catch(error => {
          console.error('Error playing sound:', error);
        });
        thirdSound.play().catch(error => {
          console.error('Error playing sound:', error);
        });
      }
      const update = document.getElementById('Result')
      update.innerHTML = "Holy crap you won the jackpot! Go talk to the House."
    }
  };

  const result = (winnings) => {
    const update = document.getElementById('Result')
    if (winnings === null) {
      update.innerHTML = 'Sorry! Try again!'
    } else {
      update.innerHTML = `You won ${winnings} credits!`
    }
  }

  return (
    <div style={backgroundImageStyle}>
      <h1 className='text-2xl font-extrabold mt-5 bg-gray-800 bg-opacity-75 rounded-lg shadow-lg p-5 text-center border-4 border-white'>
        Happy Birthday Chloe!
      </h1>
      {/* need more credits */}
      <div className='absolute top-5 right-5 text-center bg-gray-800 bg-opacity-75 rounded-lg shadow-lg p-3'>
        <button
          onClick={handleCreditIncrease}
          className='text-xl font-bold text-center'
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

      <div className="top-10 left-10 absolute">
        <Modal
          modalTitle='How to play'
          modalText='Give 100 chips to the House to recieve in game credits. Once you have credits, you can play! Decide how many credits you want to bet by clicking the appropriate Bet x button.'
          modalTextTwo='WARNING: Do NOT refresh the page or you will lost ALL your credits. The house is NOT responsible for any loss of credits. Have fun!'
          modalImage={Angel} />
      </div>
      {/* number of credits */}
      <div className='mt-5'>
        <h2 className='text-2xl font-bold bg-gray-800 bg-opacity-75 rounded-lg shadow-lg p-2 text-center '>
          Number of credits: {credits}
        </h2>
      </div>
      {/* slots */}
      <div>
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            {slots.map((slot, index) => (
              <div key={index} className={`slot ${rolling ? 'rolling' : ''}`}>
                <img
                  id={`slot${index}`}
                  src={slot.src}
                  alt={`slot-${index}`}
                  style={{ width: '500px', height: '250px', objectFit: 'cover' }}
                />
              </div>
            ))}
          </div>
          <button
            onClick={() => rollSlots(1)}
            disabled={rolling}
            className="mx-2 p-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-bold rounded shadow-md hover:from-yellow-500 hover:to-yellow-700 transition-colors duration-300">
            Bet 1
          </button>
          <button
            onClick={() => rollSlots(5)}
            disabled={rolling}
            className="mx-2 p-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-bold rounded shadow-md hover:from-yellow-500 hover:to-yellow-700 transition-colors duration-300">
            Bet 5
          </button>
          <button
            onClick={() => rollSlots(10)}
            disabled={rolling}
            className="mx-2 p-3 bg-gradient-to-r from-yellow-300 to-yellow-500 text-white font-bold rounded shadow-md hover:from-yellow-400 hover:to-yellow-600 transition-colors duration-300">
            Bet 10
          </button>
          <button
            onClick={() => rollSlots(50)}
            disabled={rolling}
            className="mx-2 p-3 bg-gradient-to-r from-yellow-300 to-yellow-500 text-white font-bold rounded shadow-md hover:from-yellow-400 hover:to-yellow-600 transition-colors duration-300">
            Bet 50
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
      <div className='flex'>
        <div className="flex items-center justify-center mx-10 text-center">
          <Modal
            modalTitle='Paytable Info'
            modalText='These are the payouts if you get matches. For example, 3 images of Hyerim will get you 5x your bet size'
            modalTextTwo='This slot machine is progressive, meaning there is a jackpot guaranteed once every 5,000 spins!'
            modalImage={Paytable} />
        </div>
        <div>
          <h2 id='Result' className='mb-2 mt-4 text-2xl font-bold bg-gray-800 bg-opacity-75 rounded-lg shadow-lg p-5 text-center '>
            Good Luck!
          </h2>
        </div>
        <div className="flex items-center justify-center mx-10 text-center">
          <Modal
            modalTitle='Slots Odds'
            modalText='These are the odds of hitting specific matches for 10,000 simulations.'
            modalTextTwo=''
            modalImage={Odds} />
        </div>
      </div>
      <div className='mt-5 text-center justify-center'>
        <p className='text-sm opacity-50'>&copy; 2024 John Nam. All rights reserved. | <a href="/privacy.html">Privacy Policy</a> | <a href="terms.html">Terms of Service</a></p>
      </div>
    </div >
  )
}

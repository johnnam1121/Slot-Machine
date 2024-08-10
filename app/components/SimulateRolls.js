// non progressive
// const images = [
//   { name: 'Mina', weight: 1 },      // 1/1000
//   { name: 'Thao', weight: 1.26 },   // 1/500
//   { name: 'Group', weight: 1.587 }, // 1/250
//   { name: 'Kevin', weight: 2.154 }, // 1/100
//   { name: 'JJKev', weight: 2.714 }, // 1/50
//   { name: 'TonyAlex', weight: 3.42 }, // 1/25
//   { name: 'Jose', weight: 4.642 },  // 1/10
//   { name: 'John', weight: 5.848 },  // 1/5
//   { name: 'Hyerim', weight: 7.368 }, // 2/5
// ];

// // Normalize probabilities
// const totalWeight = images.reduce((sum, item) => sum + item.weight, 0);
// images.forEach(item => {
//   item.normalizedProbability = item.weight / totalWeight;
// });

// const getRandomImage = () => {
//   const rand = Math.random();
//   let cumulativeProbability = 0;
//   for (const item of images) {
//     cumulativeProbability += item.normalizedProbability;
//     if (rand < cumulativeProbability) {
//       return item.name;
//     }
//   }
//   return images[images.length - 1].name; // Fallback to the last image
// };

// const simulateRolls = (numRolls) => {
//   const results = {
//     Mina: { total: 0, twoMatch: 0, threeMatch: 0, noMatch: 0 },
//     Thao: { total: 0, twoMatch: 0, threeMatch: 0, noMatch: 0 },
//     Group: { total: 0, twoMatch: 0, threeMatch: 0, noMatch: 0 },
//     Kevin: { total: 0, twoMatch: 0, threeMatch: 0, noMatch: 0 },
//     JJKev: { total: 0, twoMatch: 0, threeMatch: 0, noMatch: 0 },
//     TonyAlex: { total: 0, twoMatch: 0, threeMatch: 0, noMatch: 0 },
//     Jose: { total: 0, twoMatch: 0, threeMatch: 0, noMatch: 0 },
//     John: { total: 0, twoMatch: 0, threeMatch: 0, noMatch: 0 },
//     Hyerim: { total: 0, twoMatch: 0, threeMatch: 0, noMatch: 0 }
//   };

//   for (let i = 0; i < numRolls; i++) {
//     const slots = [
//       getRandomImage(),
//       getRandomImage(),
//       getRandomImage()
//     ];

//     const counts = slots.reduce((countMap, image) => {
//       countMap[image] = (countMap[image] || 0) + 1;
//       return countMap;
//     }, {});

//     const imagesInRoll = Object.keys(counts);
//     imagesInRoll.forEach(image => {
//       const count = counts[image];
//       if (count === 3) {
//         results[image].threeMatch++;
//       } else if (count === 2) {
//         results[image].twoMatch++;
//       } else if (count === 1) {
//         results[image].total++;
//       }
//     });

//     imagesInRoll.forEach(image => {
//       if (counts[image] === 1) {
//         results[image].noMatch++;
//       }
//     });
//   }

//   // Calculate percentages
//   const percentages = {};
//   for (const [image, counts] of Object.entries(results)) {
//     const totalOccurrences = counts.total + counts.twoMatch + counts.threeMatch + counts.noMatch;
//     percentages[image] = {
//       total: totalOccurrences,
//       threeMatch: counts.threeMatch,
//       twoMatch: counts.twoMatch,
//       noMatch: counts.noMatch,
//       totalPercent: (totalOccurrences / numRolls * 100).toFixed(2) + '%',
//       threeMatchPercent: (counts.threeMatch / numRolls * 100).toFixed(5) + '%',
//       twoMatchPercent: (counts.twoMatch / numRolls * 100).toFixed(2) + '%',
//       noMatchPercent: (counts.noMatch / numRolls * 100).toFixed(2) + '%',
//     };
//   }

//   return percentages;
// };

// const numRolls = 1000000;
// const results = simulateRolls(numRolls);

// console.log('Results after', numRolls, 'rolls:');
// for (const [image, counts] of Object.entries(results)) {
//   console.log(`${image}:`);
//   console.log(`  Total occurrences: ${counts.total}`);
//   console.log(`  All three match: ${counts.threeMatch} times (${counts.threeMatchPercent})`);
//   console.log(`  Two match: ${counts.twoMatch} times (${counts.twoMatchPercent})`);
//   console.log(`  No match: ${counts.noMatch} times (${counts.noMatchPercent})`);
// }

// Slot machine setup
// const images = [
//   { image: "Mina", weight: 0.1 },     // 1/1000
//   { image: "Thao", weight: 0.2 },     // 1/500
//   { image: "Group", weight: 0.25 },   // 1/400
//   { image: "Kevin", weight: 0.5 },    // 1/200
//   { image: "JJKev", weight: 1 },      // 1/100
//   { image: "TonyAlex", weight: 2 },   // 1/50
//   { image: "Jose", weight: 3 },       // 1/33
//   { image: "John", weight: 4 },       // 1/25
//   { image: "Hyerim", weight: 5 },     // 1/20
// ];

// // Normalize weights to make them probabilities
// const totalWeight = images.reduce((sum, img) => sum + img.weight, 0);
// const probabilities = images.map(img => ({ ...img, probability: img.weight / totalWeight }));

// // Function to roll a single slot
// function rollSlot() {
//   const rand = Math.random();
//   let cumulative = 0;

//   for (let i = 0; i < probabilities.length; i++) {
//       cumulative += probabilities[i].probability;
//       if (rand < cumulative) {
//           return probabilities[i].image;
//       }
//   }
// }

// // Function to roll all slots
// function rollSlots(numSlots = 5) {
//   return Array.from({ length: numSlots }, () => rollSlot());
// }

// // Function to check matches
// function checkMatches(rolls) {
//   const counts = rolls.reduce((acc, roll) => {
//       acc[roll] = (acc[roll] || 0) + 1;
//       return acc;
//   }, {});

//   const matches = Object.values(counts);
//   return Math.max(...matches);
// }

// // Simulation
// const numSimulations = 100000;
// const matchCounts = { 3: 0, 4: 0, 5: 0 };

// for (let i = 0; i < numSimulations; i++) {
//   const rolls = rollSlots();
//   const maxMatches = checkMatches(rolls);

//   if (maxMatches >= 3) {
//       matchCounts[maxMatches]++;
//   }
// }

// // Output results
// console.log(`Out of ${numSimulations} simulations:`);
// console.log(`3 matches occurred: ${matchCounts[3]} times (${(matchCounts[3] / numSimulations) * 100}%)`);
// console.log(`4 matches occurred: ${matchCounts[4]} times (${(matchCounts[4] / numSimulations) * 100}%)`);
// console.log(`5 matches occurred: ${matchCounts[5]} times (${(matchCounts[5] / numSimulations) * 100}%)`);


// Winnings
// console.log('Paytable\n');
// console.log('All 5 Matches');
// console.log('Minas - 5000x - JACKPOT');
// console.log('Thaos - 3500x - 2nd place Jackpot');
// console.log('Groups - 2500x - 3rd place Jackpot');
// console.log('Kevins - 2000x');
// console.log('JJKevs - 1500x');
// console.log('TonyAlexs - 750x');
// console.log('Joses - 500x');
// console.log('Johns - 250x');
// console.log('Hyerims - 100x\n');

// console.log('4 Matches');
// console.log('Minas - 750x');
// console.log('Thaos - 500x');
// console.log('Groups - 300x');
// console.log('Kevins - 200x');
// console.log('JJKevs - 125x');
// console.log('TonyAlexs - 100x');
// console.log('Joses - 75x');
// console.log('Johns - 50x');
// console.log('Hyerims - 30x\n');

// console.log('3 Matches');
// console.log('Minas - 250x');
// console.log('Thaos - 175x');
// console.log('Groups - 125x');
// console.log('Kevins - 75x');
// console.log('JJKevs - 50x');
// console.log('TonyAlexs - 25x');
// console.log('Joses - 15x');
// console.log('Johns - 10x');
// console.log('Hyerims - 5x\n');

// progressive jackpot test
// const images = [
//   { name: 'Mina', weight: 1 },      // 1/1000
//   { name: 'Thao', weight: 1.26 },      // 1/500
//   { name: 'Group', weight: 1.587 },     // 1/250
//   { name: 'Kevin', weight: 2.154 },     // 1/100
//   { name: 'JJKev', weight: 2.714 },   // 1/50
//   { name: 'TonyAlex', weight: 3.42 },  // 1/25
//   { name: 'Jose', weight: 4.642 },      // 1/10
//   { name: 'John', weight: 5.848 },      // 1/5
//   { name: 'Hyerim', weight: 7.368 },    // 2/5
// ];

// const totalWeight = images.reduce((sum, item) => sum + item.weight, 0);

// images.forEach(item => {
//   item.normalizedProbability = item.weight / totalWeight;
// });

// const getRandomImage = () => {
//   const rand = Math.random();
//   let cumulativeProbability = 0;
//   for (const item of images) {
//     cumulativeProbability += item.normalizedProbability;
//     if (rand < cumulativeProbability) {
//       return item.name;
//     }
//   }
//   return images[images.length - 1].name; // Fallback to the last image
// };

// const calculateAdjustedWeights = (totalSpins) => {
//   const progressiveWeight = (totalSpins / 1000) * 2;
//   return images.map(item => {
//     if (item.name === 'Mina') {
//       return { ...item, weight: item.weight + progressiveWeight };
//     }
//     return item;
//   });
// };

// const simulateSlots = (numSimulations) => {
//   let results = {
//     jackpot: 0,
//     fourMatches: 0,
//     threeMatches: 0,
//     lose: 0,
//   };

//   for (let i = 0; i < numSimulations; i++) {
//     const adjustedImages = calculateAdjustedWeights(i + 1);
//     const totalWeight = adjustedImages.reduce((sum, item) => sum + item.weight, 0);
//     adjustedImages.forEach(item => {
//       item.normalizedProbability = item.weight / totalWeight;
//     });

//     const roll = () => {
//       return [
//         getRandomImage(),
//         getRandomImage(),
//         getRandomImage(),
//         getRandomImage(),
//         getRandomImage(),
//       ];
//     };

//     const slots = roll();
//     const slotCounts = slots.reduce((acc, slot) => {
//       acc[slot] = (acc[slot] || 0) + 1;
//       return acc;
//     }, {});

//     const values = Object.values(slotCounts);
//     const maxMatches = Math.max(...values);

//     if (maxMatches === 5) {
//       results.jackpot++;
//     } else if (maxMatches === 4) {
//       results.fourMatches++;
//     } else if (maxMatches === 3) {
//       results.threeMatches++;
//     } else {
//       results.lose++;
//     }
//   }

//   return results;
// };

// // Run simulation 1000 times
// const simulationResults = simulateSlots(1000);
// console.log(simulationResults);

const images = [
  { image: 'Mina.jpg', weight: 1 },       // 1/1000
  { image: 'Thao.jpg', weight: 1.26 },     // 1/500
  { image: 'Group.jpg', weight: 1.587 },   // 1/250
  { image: 'Kevin.jpg', weight: 2.154 },   // 1/100
  { image: 'JJKev.jpg', weight: 2.714 },   // 1/50
  { image: 'TonyAlex.jpg', weight: 3.42 }, // 1/25
  { image: 'Jose.jpg', weight: 4.642 },    // 1/10
  { image: 'John.jpg', weight: 5.848 },    // 1/5
  { image: 'Hyerim.jpg', weight: 7.368 },  // 2/5
];

// Initialize counts for each image
const counts = images.reduce((acc, item) => {
  acc[item.image] = { total: 0, twoMatch: 0, threeMatch: 0, fourMatch: 0, fiveMatch: 0, noMatch: 0 };
  return acc;
}, {});

// Adjust weights based on totalSpins
const calculateAdjustedWeights = (totalSpins) => {
  const progressiveWeight = (totalSpins / 2000) * 2;
  return images.map(item => {
    if (item.image === 'Mina.jpg') {
      return { ...item, weight: item.weight + progressiveWeight };
    }
    return item;
  });
};

const totalWeight = images.reduce((sum, item) => sum + item.weight, 0);

images.forEach(item => {
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
  return images[images.length - 1].image; // Fallback to the last image
};

const rollSlots = (betSize, totalSpins) => {
  const adjustedImages = calculateAdjustedWeights(totalSpins);
  const totalWeight = adjustedImages.reduce((sum, item) => sum + item.weight, 0);
  adjustedImages.forEach(item => {
    item.normalizedProbability = item.weight / totalWeight;
  });

  const getRandomImageAdjusted = () => {
    const rand = Math.random();
    let cumulativeProbability = 0;
    for (const item of adjustedImages) {
      cumulativeProbability += item.normalizedProbability;
      if (rand < cumulativeProbability) {
        return item.image;
      }
    }
    return adjustedImages[adjustedImages.length - 1].image; // Fallback to the last image
  };

  const slots = [
    getRandomImageAdjusted(),
    getRandomImageAdjusted(),
    getRandomImageAdjusted(),
    getRandomImageAdjusted(),
    getRandomImageAdjusted(),
  ];

  return slots;
};

const checkMatches = (slots, betSize) => {
  const slotCounts = slots.reduce((acc, slot) => {
    acc[slot] = (acc[slot] || 0) + 1;
    return acc;
  }, {});

  Object.keys(slotCounts).forEach(image => {
    const count = slotCounts[image];
    counts[image].total += 1;
    if (count === 5) {
      counts[image].fiveMatch += 1;
    } else if (count === 4) {
      counts[image].fourMatch += 1;
    } else if (count === 3) {
      counts[image].threeMatch += 1;
    } else if (count === 2) {
      counts[image].twoMatch += 1;
    } else if (count === 1) {
      counts[image].noMatch += 1;
    }
  });

  const firstSlotSrc = slots[0];
  const allMatch = slots.every(slot => slot === firstSlotSrc);

  if (allMatch) {
    let payout;
    switch (firstSlotSrc) {
      case 'Mina.jpg':
        payout = betSize * 5000;
        break;
      case 'Thao.jpg':
        payout = betSize * 3500;
        break;
      case 'Group.jpg':
        payout = betSize * 2500;
        break;
      case 'Kevin.jpg':
        payout = betSize * 2000;
        break;
      case 'JJKev.jpg':
        payout = betSize * 1500;
        break;
      case 'TonyAlex.jpg':
        payout = betSize * 750;
        break;
      case 'Jose.jpg':
        payout = betSize * 500;
        break;
      case 'John.jpg':
        payout = betSize * 250;
        break;
      case 'Hyerim.jpg':
        payout = betSize * 100;
        break;
      default:
        payout = 0;
    }
    return payout;
  } else {
    return 0;
  }
};

// Simulate slot machine
const simulateSlots = (numSimulations, betSize) => {
  let totalCredits = 0;
  for (let i = 0; i < numSimulations; i++) {
    const slots = rollSlots(betSize, i);
    const winnings = checkMatches(slots, betSize);
    totalCredits += winnings - betSize; // Subtract the bet size for each spin
  }

  // Display results
  Object.keys(counts).forEach(image => {
    const total = counts[image].total;
    if (total === 0) return; // Avoid division by zero

    const twoMatchPercent = ((counts[image].twoMatch / total) * 100).toFixed(2);
    const threeMatchPercent = ((counts[image].threeMatch / total) * 100).toFixed(2);
    const fourMatchPercent = ((counts[image].fourMatch / total) * 100).toFixed(2);
    const fiveMatchPercent = ((counts[image].fiveMatch / total) * 100).toFixed(2);
    const noMatchPercent = ((counts[image].noMatch / total) * 100).toFixed(2);

    console.log(`${image}:`);
    console.log(`  Total occurrences: ${total}`);
    console.log(`  Five match: ${counts[image].fiveMatch} times (${fiveMatchPercent}%)`);
    console.log(`  Four match: ${counts[image].fourMatch} times (${fourMatchPercent}%)`);
    console.log(`  Three match: ${counts[image].threeMatch} times (${threeMatchPercent}%)`);
    console.log(`  Two match: ${counts[image].twoMatch} times (${twoMatchPercent}%)`);
    console.log(`  No match: ${counts[image].noMatch} times (${noMatchPercent}%)`);
  });

  return totalCredits;
};

const numSimulations = 10000;
const betSize = 1; // Adjust bet size as needed
const totalCredits = simulateSlots(numSimulations, betSize);

console.log(`Total credits after ${numSimulations} simulations: ${totalCredits}`);

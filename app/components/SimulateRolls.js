const images = [
  { name: 'Mina', weight: 1 },      // 1/1000
  { name: 'Thao', weight: 1.26 },      // 1/500
  { name: 'Group', weight: 1.587 },     // 1/250
  { name: 'Kevin', weight: 2.154 },     // 1/100
  { name: 'JJKevin', weight: 2.714 },   // 1/50
  { name: 'TonyAlex', weight: 3.42 },  // 1/25
  { name: 'Jose', weight: 4.642 },      // 1/10
  { name: 'John', weight: 5.848 },      // 1/5
  { name: 'Hyerim', weight: 7.368 },    // 2/5
];

// Normalize the weights
const totalWeight = images.reduce((sum, item) => sum + item.weight, 0);
images.forEach(item => {
  item.normalizedProbability = item.weight / totalWeight;
});

// Function to get a random image based on probabilities
const getRandomImage = () => {
  const rand = Math.random();
  let cumulativeProbability = 0;
  for (const item of images) {
    cumulativeProbability += item.normalizedProbability;
    if (rand < cumulativeProbability) {
      return item.name;
    }
  }
  return images[images.length - 1].name; // Fallback to the last image
};

// Simulate the slot machine
const simulateSlots = (numSimulations) => {
  const results = {
    allThreeMatch: 0,
    twoMatch: 0,
    noMatch: 0,
    counts: images.reduce((acc, image) => {
      acc[image.name] = { total: 0, allThreeMatch: 0, twoMatch: 0, noMatch: 0 };
      return acc;
    }, {})
  };

  for (let i = 0; i < numSimulations; i++) {
    const slots = [getRandomImage(), getRandomImage(), getRandomImage()];

    const counts = {};
    slots.forEach(image => {
      counts[image] = (counts[image] || 0) + 1;
    });

    const firstSlot = slots[0];
    const secondSlot = slots[1];
    const thirdSlot = slots[2];

    if (firstSlot === secondSlot && firstSlot === thirdSlot) {
      results.allThreeMatch++;
      Object.keys(counts).forEach(name => {
        results.counts[name].allThreeMatch++;
        results.counts[name].total += counts[name];
      });
    } else if (firstSlot === secondSlot || secondSlot === thirdSlot || firstSlot === thirdSlot) {
      results.twoMatch++;
      Object.keys(counts).forEach(name => {
        results.counts[name].twoMatch++;
        results.counts[name].total += counts[name];
      });
    } else {
      results.noMatch++;
      Object.keys(counts).forEach(name => {
        results.counts[name].noMatch++;
        results.counts[name].total += counts[name];
      });
    }
  }

  return results;
};

// Run the simulation 1,000,000 times
const numSimulations = 1000000;
const simulationResults = simulateSlots(numSimulations);

console.log(`After ${numSimulations} simulations:`);
console.log(`All three match: ${simulationResults.allThreeMatch} times (${(simulationResults.allThreeMatch / numSimulations * 100).toFixed(2)}%)`);
console.log(`Two match: ${simulationResults.twoMatch} times (${(simulationResults.twoMatch / numSimulations * 100).toFixed(2)}%)`);
console.log(`No match: ${simulationResults.noMatch} times (${(simulationResults.noMatch / numSimulations * 100).toFixed(2)}%)`);

console.log('\nDetailed breakdown of occurrences:');
images.forEach(image => {
  const name = image.name;
  const data = simulationResults.counts[name];
  const totalCount = data.total;
  console.log(`${name}:`);
  console.log(`  Total occurrences: ${totalCount}`);
  console.log(`  All three match: ${data.allThreeMatch} times (${(data.allThreeMatch / numSimulations * 100).toFixed(5)}%)`);
  console.log(`  Two match: ${data.twoMatch} times (${(data.twoMatch / numSimulations * 100).toFixed(2)}%)`);
  console.log(`  No match: ${data.noMatch} times (${(data.noMatch / numSimulations * 100).toFixed(2)}%)`);
  console.log('');
});

const AVAILABLE_BALLS = {
  red: 12,
  green: 13,
  blue: 14
}

// common game extractor
const extractGame = (line) => {
  const match = line.match(/Game (\d+): (.*)/);
  const gameNumber = +match[1];

  const sets = line.split(';');

  const colors = sets.map(set => {
    const regex = /(\d+) (\w+)/g;
    let match;
    const colors = {};

    while ((match = regex.exec(set)) !== null) {
      const color = match[2];
      const amount = match[1];
      colors[color] = (colors[color] ?? 0) + (+amount);
    }

    return colors;
  });

  return {
    gameNumber,
    sets: colors
  }
}

// part1
const isGameValid = (game) => {
  const { sets } = game;

  const isGameValid = sets.every((set) => {
    return Object.entries(set).every(([color, balls]) => {
      return balls <= AVAILABLE_BALLS[color];
    });
  })

  return { gameNumber: game.gameNumber, isGameValid };
}

// part1
const sumValidGames = (acc, curr) => {
  return acc + (curr.isGameValid ? curr.gameNumber : 0);
}

// part2
const countMaximums = (game) => {
  // flatten all sets and count maximums
  return Object.entries(game.sets.reduce((acc, curr) => {
    return Object.entries(curr).reduce((acc, [color, balls]) => {
      acc[color] = Math.max(acc[color] ?? 0, balls);
      return acc;
    }, acc);
  }, {})).reduce((acc, [color, balls]) => {
    acc *= balls;
    return acc;
  }, 1);
}

// sum values
const sum = (acc, curr) => acc + curr;

const output1 =
  require('./input')
    .split("\n")
    .map(extractGame)
    .map(isGameValid)
    .reduce(sumValidGames, 0);

console.log('output1', output1);

const output2 =
  require('./input')
    .split("\n")
    .map(extractGame)
    .map(countMaximums)
    .reduce(sum, 0);

console.log('output2', output2);

// common game extractor
const extractData = (input, line) => {
  // match all numbers from input
  const regex = /(\d+)/g;
  const numbers = [];
  let match;

  while ((match = regex.exec(input)) !== null) {
    numbers.push({
      number: +match[1],
      index: match.index,
      length: match[1].length,
      line
    });
  }

  const symbolRegex = /([^.\d])/g;
  const symbols = [];
  let symbolMatch;

  while ((symbolMatch = symbolRegex.exec(input)) !== null) {
    symbols.push({
      symbol: symbolMatch[1],
      x: symbolMatch.index,
      y: line
    });
  }


  return { numbers, symbols, input };
};

// flatten the output of extractData, so it's easier to loop over
const flatten = (acc, curr) => {
  if (curr['numbers']) {
    acc['numbers'] = (acc['numbers'] ?? []).concat(curr['numbers']);
  }
  if (curr['symbols']) {
    acc['symbols'] = (acc['symbols'] ?? []).concat(curr['symbols']);
  }
  if (curr['input']) {
    acc['input'] = (acc['input'] ?? []).concat(curr['input']);
  }
  return acc;
};

// sum all numbers
const sum = (acc, curr) => acc + curr.number;

// extract numbers adjacent to symbols
const extractAdjacentNumbers = (game) => {
  // for each symbol in game.symbols, extract adjacent numbers even diagonally
  const { symbols, input, numbers } = game;
  const adjacentNumbers = [];

  symbols.forEach((symbol) => {
    const { x, y } = symbol;

    const x1 = x - 1;
    const x2 = x + 1;
    const y1 = y - 1;
    const y2 = y + 1;

    // extract only numbers around this symbol
    for (let y = y1; y <= y2; y++) {
      for (let x = x1; x <= x2; x++) {
        if (x === symbol.x && y === symbol.y) {
          continue;
        }

        // if number, extract full number add to adjacentNumbers
        const character = input[y][x];
        if (/^\d+$/.test(character)) {
          const number = numbers.find((number) => number.index <= x && number.index + number.length >= x && number.line === y);

          // add it to array if not added already
          if (!adjacentNumbers.find((adjacentNumber) =>
            adjacentNumber.number === number.number &&
            adjacentNumber.line === number.line &&
            adjacentNumber.index === number.index)) {
            adjacentNumbers.push(number);
          }
        }
      }
    }
  });

  return adjacentNumbers;
}

// extract "gears", numbers adjacent to "*" symbol
const extractGears = (game) => {
  // for each symbol in game.symbols, extract adjacent numbers even diagonally
  const { symbols, input, numbers } = game;

  return symbols.filter((item) => item.symbol === '*').map((symbol) => {
    const { x, y } = symbol;
    const adjacentNumbers = [];

    const x1 = x - 1;
    const x2 = x + 1;
    const y1 = y - 1;
    const y2 = y + 1;

    // extract only numbers around this symbol
    for (let y = y1; y <= y2; y++) {
      for (let x = x1; x <= x2; x++) {
        if (x === symbol.x && y === symbol.y) {
          continue;
        }

        // if number, extract full number add to adjacentNumbers
        const character = input[y][x];
        if (/^\d+$/.test(character)) {
          const number = numbers.find((number) => number.index <= x && number.index + number.length >= x && number.line === y);

          // add it to array if not added already
          if (!adjacentNumbers.find((adjacentNumber) =>
            adjacentNumber.number === number.number &&
            adjacentNumber.line === number.line &&
            adjacentNumber.index === number.index)) {
            adjacentNumbers.push(number);
          }
        }
      }
    }

    if (adjacentNumbers.length === 2) {
      // console.log('wooo', adjacentNumbers)
      // multiply numbers
      const result = adjacentNumbers.reduce((acc, curr) => acc * curr.number, 1);
      return result;
    } else {
      return 0;
    }
  });
}

const game = require('./input').split("\n").map(extractData).reduce(flatten, {});

const solution1 = extractAdjacentNumbers(game).reduce(sum, 0);
console.log('solution1', solution1);

const solution2 = extractGears(game).reduce((acc, curr) => acc + curr, 0);
console.log('solution2', solution2);

// common extractor
const extractNumbers = (input) => {
  const numArray = input.match(/[0-9]/g);
  return Number(`${numArray[0]}${numArray[numArray.length - 1]}`);
}

// part2 - transform words to numbers
const transformWords = (input) => {
  const letters = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

  for (let i = 0; i < input.length; i++) {
    const sub = input.substring(i);

    for (let j = 0; j < letters.length; j++) {
      if (sub.startsWith(letters[j])) {
        input = input.substring(0, i) + j + input.substring(i + letters[j].length);
      }
    }
  }

  return input;
}

// common sum
const sum = (acc, curr) => acc + curr;

const output1 = require('./input')
  .split("\n")
  .map(extractNumbers)
  .reduce(sum, 0);

console.log('output1', output1)

const output2 = require('./input')
  .split("\n")
  .map(transformWords)
  .map(extractNumbers)
  .reduce(sum, 0);

console.log('output2', output2)

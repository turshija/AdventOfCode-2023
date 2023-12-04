// part1 extraction and counting points
const extractWinnings = (line) => {
  const match = line.match(/Card.+?(\d+): ([\d\s]+) \| ([\d\s]+)/);
  const winningNumbers = match[2].match(/\d+/g).map(Number);
  const myNumbers = match[3].match(/\d+/g).map(Number);
  return myNumbers.filter((number) => winningNumbers.includes(number)).length;
}

// count points
const countPoints = (acc, winnings) => {
  if (winnings === 0) {
    return acc;
  }

  return acc + (2 ** (winnings - 1));
}

const solution1 = require('./input').split("\n").map(extractWinnings).reduce(countPoints, 0);
console.log('solution1', solution1); // 18619


let cards = require('./input').split("\n");

const newCards = cards.map((card) => {
  const winnings = extractWinnings(card);
  return { card, winnings, amount: 1 };
});

for (let i = 0; i < newCards.length; i++) {
  const card = newCards[i];
  if (card.winnings === 0) {
    continue;
  }

  for (let j = 1; j <= card.winnings; j++) {
    const nextCard = newCards[i + j];
    if (nextCard) {
      nextCard.amount += card.amount;
    }
  }
}

const countAmounts = (acc, card) => {
  return acc + card.amount;
}

const solution2 = newCards.reduce(countAmounts, 0);

console.log('solution2', solution2); // 8063216

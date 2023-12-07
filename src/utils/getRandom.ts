const getRandom = (min: number, max: number): number => {
  const minInt = Math.ceil(min);
  const maxInt = Math.floor(max) - Math.ceil(min);

  return Math.floor(Math.random() * maxInt + 1) + minInt;
};
const getRandomFloat = (min: number, max: number): number => {
  const minInt = min;
  const maxInt = max - min;

  return Math.random() * maxInt + minInt;
};

export {getRandom, getRandomFloat};

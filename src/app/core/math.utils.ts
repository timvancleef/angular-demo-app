const randomNumber = (min = 40, max = 300): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export { randomNumber };

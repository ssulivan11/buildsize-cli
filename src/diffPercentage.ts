module.exports = (maxFileSize: number, finalSize: number) => {
  const difference = ((finalSize - maxFileSize) / maxFileSize) * 100;
  const isIncrease = Math.sign(difference) === 1;
  const isEqual = Math.sign(difference) === 0;
  if (isEqual) return '';

  const differenceMsg = `${difference.toFixed(2).replace(/[.]00/, '').replace(/-/, '')}%`;
  return `\n  · ${differenceMsg} ${isIncrease ? 'increase' : 'decrease'}`;
};

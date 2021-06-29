const getCargo = function getCargo({ cargo }) {
  return cargo.filter(({ good }) => (
    good !== 'FUEL'
  )).map(({ good, totalVolume }) => (
    `${good} ${totalVolume}`
  )).join('\n');
};

export default getCargo;

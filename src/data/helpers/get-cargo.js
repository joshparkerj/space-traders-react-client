const getCargo = function getCargo(ship) {
  return ship.cargo.filter((good) => good.good !== 'FUEL').map((good) => `${good.good} ${good.totalVolume}`).join('\n');
};

export default getCargo;

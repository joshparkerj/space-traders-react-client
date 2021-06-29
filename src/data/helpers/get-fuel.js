const getFuel = function getFuel(ship) {
  return ship.cargo.find((good) => good.good === 'FUEL')?.totalVolume || 0;
};

export default getFuel;

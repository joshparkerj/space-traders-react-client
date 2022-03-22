import api from '../api/api';

const fly = function fly({
  ship, destination, setCredits, setMyShips, setMarketLocation,
}, toast) {
  const getSystem = (sym) => sym.match(/^[^-]+/)[0];

  const flyWithWarp = function flyWithWarp({
    ship: fwws,
    destination: fwwd,
    setCredits: fwwsc,
    setMyShips: fwwsms,
    setMarketLocation: fwwsml,
  }, fwwToast) {
    return new Promise((resolve) => {
      const startSys = getSystem(fwws.location);
      const endSys = getSystem(destination);
      const proposedWormhole = `${startSys}-W-${endSys}`;
      const otherSideWormhole = `${endSys}-W-${startSys}`;
      fwwToast.warning(`Trying to fly to ${proposedWormhole}. `
        + 'Only one jump is currently supported.');
      fly({
        ship: fwws,
        destination: proposedWormhole,
        setCredits: fwwsc,
        setMyShips: fwwsms,
        setMarketLocation: fwwsml,
      }, toast)
        .then(() => api.warpJump.attemptAWarpJump({ shipId: ship.id }, toast))
        .then((r) => (
          new Promise((res) => {
            setTimeout(() => res(r), 1000 * (1 + r.flightPlan.timeRemainingInSeconds));
          })))
        .then(() => fly({
          ship: { ...fwws, location: otherSideWormhole },
          destination: fwwd,
          setCredits: fwwsc,
          setMyShips: fwwsms,
          setMarketLocation: fwwsml,
        }, toast))
        .then((r) => resolve(r));
    });
  };

  return new Promise((resolve) => {
    const startSystem = getSystem(ship.location);
    const endSystem = getSystem(destination);
    if (startSystem !== endSystem) {
      flyWithWarp({
        ship, destination, setCredits, setMyShips, setMarketLocation,
      }, toast)
        .then((r) => resolve(r));
    } else {
      api.flightPlans.createFlightPlan({ shipId: ship.id, destination }, toast)
        .then((json) => {
          const { fuelConsumed } = json.flightPlan;
          setTimeout(() => {
            const toastMessage = `Your ship has arrived at ${json.flightPlan.destination}`;
            toast.info(toastMessage);
            api.purchaseOrders.placeANewPurchaseOrder({
              shipId: ship.id, good: 'FUEL', quantity: fuelConsumed, setCredits, setMyShips,
            }, toast)
              .then((fuelPurchase) => {
                const fuelExpenditure = fuelPurchase.order.total;
                setMarketLocation(fuelPurchase.ship.location);
                return { ...json, fuelExpenditure };
              })
              .then((data) => resolve(data));
          }, 1000 * json.flightPlan.timeRemainingInSeconds);
        })
        .catch(() => { }); // TODO: decide whether anything should be done here.
    }
  });
};

export default fly;

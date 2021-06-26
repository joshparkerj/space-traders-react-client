import api from '../api/api';

const fly = function fly({
  shipId, destination, setCredits, setMyShips,
}, toast) {
  return new Promise((resolve) => {
    api.createFlightPlan({ shipId, destination }, toast)
      .then((json) => {
        const { fuelConsumed } = json.flightPlan;
        setTimeout(() => {
          const toastMessage = `Your ship has arrived at ${json.flightPlan.destination}`;
          toast.info(toastMessage);
          api.placeANewPurchaseOrder({
            shipId, good: 'FUEL', quantity: fuelConsumed, setCredits, setMyShips,
          }, toast)
            .then(() => toast.info('auto-refueled'))
            .then(() => resolve());
        }, 1000 * json.flightPlan.timeRemainingInSeconds);
      });
  });
};

export default fly;

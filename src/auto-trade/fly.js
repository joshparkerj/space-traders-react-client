import api from '../api/api';

const fly = function fly({
  shipId, destination, setCredits, setMyShips, setMarketLocation,
}, toast) {
  return new Promise((resolve) => {
    api.flightPlans.createFlightPlan({ shipId, destination }, toast)
      .then((json) => {
        const { fuelConsumed } = json.flightPlan;
        setTimeout(() => {
          const toastMessage = `Your ship has arrived at ${json.flightPlan.destination}`;
          toast.info(toastMessage);
          api.purchaseOrders.placeANewPurchaseOrder({
            shipId, good: 'FUEL', quantity: fuelConsumed, setCredits, setMyShips,
          }, toast)
            .then((fuelPurchase) => {
              const fuelExpenditure = fuelPurchase.order.total;
              setMarketLocation(fuelPurchase.ship.location);
              return { ...json, fuelExpenditure };
            })
            .then((data) => resolve(data));
        }, 1000 * json.flightPlan.timeRemainingInSeconds);
      });
  });
};

export default fly;

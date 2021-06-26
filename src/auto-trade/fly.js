import api from '../api/api';

const fly = function fly({ shipId, destination }, toast) {
  api.createFlightPlan({ shipId, destination }, toast)
    .then((json) => {
      console.log(json);
      console.log(toast);
      setTimeout(() => {
        const toastMessage = `Your ship has arrived at ${json.flightPlan.destination}`;
        toast.info(toastMessage);
        // api.placeANewPurchaseOrder({shipId, 'FUEL', })
      }, 1000 * json.flightPlan.timeRemainingInSeconds);
    });
};

export default fly;

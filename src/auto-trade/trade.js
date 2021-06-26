import api from '../api/api';
import fly from './fly';

const trade = function trade({
  shipId, good, destination, setCredits, setMyShips,
}, toast) {
  return new Promise((resolve) => {
    // buy good
    api.placeANewPurchaseOrder({
      shipId, good, quantity: 25, setCredits, setMyShips,
    }, toast)
      .then(() => (
        api.placeANewPurchaseOrder({
          shipId, good, quantity: 5, setCredits, setMyShips,
        }, toast)
      ))
      // fly to destination
      .then(() => fly({
        shipId, destination, setCredits, setMyShips,
      }, toast))
      // sell good
      .then(() => api.sellTradeGoods({ shipId, good, quantity: 25 }, toast))
      .then(() => api.sellTradeGoods({ shipId, good, quantity: 5 }, toast))
      .then(() => {
        console.log('ready to resolve trade');
        resolve();
      });
  });
};

export default trade;

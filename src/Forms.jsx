import React, { useState } from 'react';
import PropTypes from 'prop-types';

import TakeOutALoan from './forms/TakeOutALoan';
import PurchaseAShip from './forms/PurchaseAShip';
import PlaceANewPurchaseOrder from './forms/PlaceANewPurchaseOrder';
import SellTradeGoods from './forms/SellTradeGoods';
import CreateFlightPlan from './forms/CreateFlightPlan';
import AutoRunStaticRoute from './forms/AutoRunStaticRoute';
import Trade from './forms/Trade';
import PayOffYourLoan from './forms/PayOffYourLoan';
import CheckSystem from './forms/CheckSystem';
import AttemptWarpJump from './forms/AttemptWarpJump';

import api from './api/api';

import fly from './auto-trade/fly';
import staticRoute from './auto-trade/static-route';
import trade from './auto-trade/trade';

const Forms = function Forms({
  goods,
  loanTypes,
  ships,
  myShips,
  loans,
  locations,
  setMarketLocation,
  setLoans,
  setCredits,
  setMyShips,
  toast,
}) {
  const [takeOutALoanValue, setTakeOutALoanValue] = useState('');
  const [purchaseAShipValue, setPurchaseAShipValue] = useState('');
  const [purchaseOrderGoodsValue, setPurchaseOrderGoodsValue] = useState('');
  const [purchaseOrderShipsValue, setPurchaseOrderShipsValue] = useState('');
  const [purchaseOrderQuantityValue, setPurchaseOrderQuantityValue] = useState('0');
  const [sellGoodValue, setSellGoodValue] = useState('');
  const [sellShipValue, setSellShipValue] = useState('');
  const [sellQuantityValue, setSellQuantityValue] = useState('0');
  const [flightPlanShipsValue, setFlightPlanShipsValue] = useState('');
  const [flightPlanDestinationValue, setFlightPlanDestinationValue] = useState('');
  const [staticRouteName, setStaticRouteName] = useState('');
  const [staticRouteShipValue, setStaticRouteShipValue] = useState('');
  const [tradeShipValue, setTradeShipValue] = useState('');
  const [tradeGoodValue, setTradeGoodValue] = useState('');
  const [tradeDestinationValue, setTradeDestinationValue] = useState('');
  const [repayLoanValue, setRepayLoanValue] = useState('');
  const [checkSystemValue, setCheckSystemValue] = useState('');
  const [warpShipValue, setWarpShipValue] = useState('');

  const handleChange = function handleChange(setter) {
    return function changeHandler({ target }) {
      setter(target.value);
    };
  };

  const handleSubmit = function handleSubmit(apiFunc, data) {
    return function submitHandler(event) {
      apiFunc(data, toast);
      event.preventDefault();
    };
  };

  return (
    <section className="forms">
      <h2>forms</h2>
      <TakeOutALoan
        loanTypes={loanTypes.map((e) => e.type)}
        value={takeOutALoanValue}
        handleChange={handleChange(setTakeOutALoanValue)}
        handleSubmit={handleSubmit(
          api.loans.takeOutALoan,
          { type: takeOutALoanValue, setLoans, setCredits },
        )}
      />
      <PurchaseAShip
        {...{ ships }}
        value={purchaseAShipValue}
        handleChange={handleChange(setPurchaseAShipValue)}
        handleSubmit={handleSubmit(
          api.ships.purchaseAShip,
          {
            location: purchaseAShipValue ? purchaseAShipValue.split(' ')[0] : '',
            type: purchaseAShipValue ? purchaseAShipValue.split(' ')[1] : '',
            setMyShips,
            setCredits,
          },
        )}
      />
      <PlaceANewPurchaseOrder
        {...{ goods }}
        ships={myShips}
        goodsValue={purchaseOrderGoodsValue}
        shipsValue={purchaseOrderShipsValue}
        quantityValue={purchaseOrderQuantityValue}
        handleGoodsChange={handleChange(setPurchaseOrderGoodsValue)}
        handleShipChange={handleChange(setPurchaseOrderShipsValue)}
        handleQuantityChange={handleChange(setPurchaseOrderQuantityValue)}
        handleSubmit={handleSubmit(
          api.purchaseOrders.placeANewPurchaseOrder,
          {
            shipId: purchaseOrderShipsValue,
            good: purchaseOrderGoodsValue,
            quantity: purchaseOrderQuantityValue,
            toastSuccess: true,
            setCredits,
            setMyShips,
          },
        )}
      />
      <SellTradeGoods
        {...{ goods }}
        ships={myShips}
        goodsValue={sellGoodValue}
        shipsValue={sellShipValue}
        quantityValue={sellQuantityValue}
        handleGoodsChange={handleChange(setSellGoodValue)}
        handleShipChange={handleChange(setSellShipValue)}
        handleQuantityChange={handleChange(setSellQuantityValue)}
        handleSubmit={handleSubmit(
          api.sellOrders.sellTradeGoods,
          {
            shipId: sellShipValue,
            good: sellGoodValue,
            quantity: sellQuantityValue,
            toastSuccess: true,
            setCredits,
            setMyShips,
          },
        )}
      />
      <CreateFlightPlan
        {...{ locations }}
        ships={myShips}
        shipsValue={flightPlanShipsValue}
        destinationValue={flightPlanDestinationValue}
        handleShipChange={handleChange(setFlightPlanShipsValue)}
        handleDestinationChange={handleChange(setFlightPlanDestinationValue)}
        handleSubmit={handleSubmit(
          fly,
          {
            ship: myShips.find((ship) => ship.id === flightPlanShipsValue),
            destination: flightPlanDestinationValue,
            setCredits,
            setMyShips,
            setMarketLocation,
          },
        )}
      />
      <AutoRunStaticRoute
        ships={myShips}
        value={staticRouteShipValue}
        handleChange={handleChange(setStaticRouteShipValue)}
        nameValue={staticRouteName}
        handleNameChange={handleChange(setStaticRouteName)}
        handleSubmit={handleSubmit(
          staticRoute,
          {
            ship: myShips.find((ship) => ship.id === staticRouteShipValue),
            name: staticRouteName,
            setCredits,
            setMyShips,
            setMarketLocation,
          },
        )}
      />
      <Trade
        {...{ locations, goods }}
        ships={myShips}
        shipValue={tradeShipValue}
        handleShipChange={handleChange(setTradeShipValue)}
        destinationValue={tradeDestinationValue}
        handleDestinationChange={handleChange(setTradeDestinationValue)}
        goodValue={tradeGoodValue}
        handleGoodChange={handleChange(setTradeGoodValue)}
        handleSubmit={handleSubmit(
          trade,
          {
            ship: myShips.find((ship) => ship.id === tradeShipValue),
            good: tradeGoodValue,
            size: tradeGoodValue
              ? goods.find((g) => g.symbol === tradeGoodValue).volumePerUnit
              : 1,
            spaceAvailable: tradeShipValue
              ? myShips.find((ship) => ship.id === tradeShipValue).maxCargo - 20
              : 30,
            loadingSpeed: tradeShipValue
              ? myShips.find((ship) => ship.id === tradeShipValue).loadingSpeed
              : 25,
            destination: tradeDestinationValue,
            setCredits,
            setMyShips,
            setMarketLocation,
          },
        )}
      />
      <PayOffYourLoan
        {...{ loans }}
        value={repayLoanValue}
        handleChange={handleChange(setRepayLoanValue)}
        handleSubmit={handleSubmit(
          api.loans.payOffYourLoan,
          {
            loan: loans.find((loan) => loan.id === repayLoanValue),
          },
        )}
      />
      <CheckSystem
        value={checkSystemValue}
        handleChange={handleChange(setCheckSystemValue)}
        handleSubmit={handleSubmit(
          api.systems.getSystem,
          {
            system: checkSystemValue,
          },
        )}
      />
      <AttemptWarpJump
        ships={myShips}
        value={warpShipValue}
        handleChange={handleChange(setWarpShipValue)}
        handleSubmit={handleSubmit(
          api.warpJump.attemptAWarpJump,
          {
            shipId: warpShipValue,
          },
        )}
      />
    </section>
  );
};

Forms.propTypes = {
  goods: PropTypes.arrayOf(PropTypes.object).isRequired,
  loanTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
  ships: PropTypes.arrayOf(PropTypes.object).isRequired,
  myShips: PropTypes.arrayOf(PropTypes.object).isRequired,
  loans: PropTypes.arrayOf(PropTypes.object).isRequired,
  locations: PropTypes.arrayOf(PropTypes.object).isRequired,
  setMarketLocation: PropTypes.func.isRequired,
  setLoans: PropTypes.func.isRequired,
  setCredits: PropTypes.func.isRequired,
  setMyShips: PropTypes.func.isRequired,
  toast: PropTypes.func.isRequired,
};

export default Forms;

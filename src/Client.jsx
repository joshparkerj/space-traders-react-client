import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import Users from './data/Users';
import Loans from './data/Loans';
import Ships from './data/Ships';
import MyShips from './data/MyShips';
import Market from './data/Market';
import Locations from './data/Locations';

import TakeOutALoan from './forms/TakeOutALoan';
import PurchaseAShip from './forms/PurchaseAShip';
import PlaceANewPurchaseOrder from './forms/PlaceANewPurchaseOrder';
import SellTradeGoods from './forms/SellTradeGoods';
import CreateFlightPlan from './forms/CreateFlightPlan';
import AutoRunStaticRoute from './forms/AutoRunStaticRoute';
import Trade from './forms/Trade';
import PayOffYourLoan from './forms/PayOffYourLoan';

import api from './api/api';

import fly from './auto-trade/fly';
import staticRoute from './auto-trade/static-route';
import trade from './auto-trade/trade';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

function Client() {
  const [users, setUsers] = useState([]);
  const [loanTypes, setLoanTypes] = useState([]);
  const [credits, setCredits] = useState(null);
  const [loans, setLoans] = useState([]);
  const [ships, setShips] = useState([]);
  const [myShips, setMyShips] = useState([]);
  const [goods, setGoods] = useState([]);
  const [marketGoods, setMarketGoods] = useState([]);
  const [locations, setLocations] = useState([]);
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
  const [staticRouteShipValue, setStaticRouteShipValue] = useState('');
  const [tradeShipValue, setTradeShipValue] = useState('');
  const [tradeGoodValue, setTradeGoodValue] = useState('');
  const [tradeDestinationValue, setTradeDestinationValue] = useState('');
  const [repayLoanValue, setRepayLoanValue] = useState('');
  const [gameStatus, setGameStatus] = useState('');
  const [marketLocation, setMarketLocation] = useState('');
  const [currentSystem, setCurrentSystem] = useState('');

  useEffect(() => {
    api.types.getTypesOfLoans(setLoanTypes);
  }, [loans]);

  useEffect(() => {
    api.account.getMyAccount(setUsers);
    api.loans.getMyLoans(setLoans);
    api.systems.getSystemShipListings(setShips);
    api.game.getGameStatus(setGameStatus);
    api.ships.getMyShips(setMyShips);
    api.types.getTypesOfGoods(setGoods);
  }, []);

  useEffect(() => {
    if (myShips[0] && myShips[0].location) {
      const { location } = myShips[0];
      const { system } = location.match(/^(?<system>[^-]*).*$/).groups;
      setCurrentSystem(system);
    }
  }, [myShips]);

  useEffect(() => {
    api.systems.getSystemLocations(currentSystem, setLocations);
  }, [currentSystem]);

  useEffect(() => {
    if (marketLocation) {
      api.locations.getLocationMarketplaces(marketLocation, setMarketGoods);
    }
  }, [marketLocation]);

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
    <div className="App">
      <header className="App-header">
        <ToastContainer />
        <h1>Space Traders React Client</h1>
        <h2>{gameStatus}</h2>
      </header>
      <main>
        <section className="data">
          <div className="credits">
            <span>credits:</span>
            <span>{credits}</span>
          </div>
          <h2>data</h2>
          <Users users={users} />
          {/* <LoanTypes loans={loanTypes} /> */}
          <Loans loans={loans} />
          <Ships ships={ships} />
          <MyShips myShips={myShips} />
          {/* <Goods goods={goods} /> */}
          <Market goods={marketGoods} />
          <Locations locations={locations} />
          {/* <FlightPlans flightPlans={flightPlans} /> */}
        </section>
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
            ships={ships}
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
            goods={goods}
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
                setCredits,
                setMyShips,
              },
            )}
          />
          <SellTradeGoods
            goods={goods}
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
                setCredits,
                setMyShips,
              },
            )}
          />
          <CreateFlightPlan
            ships={myShips}
            shipsValue={flightPlanShipsValue}
            locations={locations}
            destinationValue={flightPlanDestinationValue}
            handleShipChange={handleChange(setFlightPlanShipsValue)}
            handleDestinationChange={handleChange(setFlightPlanDestinationValue)}
            handleSubmit={handleSubmit(
              fly,
              {
                shipId: flightPlanShipsValue,
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
            handleSubmit={handleSubmit(
              staticRoute,
              {
                shipId: staticRouteShipValue,
                setCredits,
                setMyShips,
                setMarketLocation,
              },
            )}
          />
          <Trade
            ships={myShips}
            shipValue={tradeShipValue}
            handleShipChange={handleChange(setTradeShipValue)}
            locations={locations}
            destinationValue={tradeDestinationValue}
            handleDestinationChange={handleChange(setTradeDestinationValue)}
            goods={goods}
            goodValue={tradeGoodValue}
            handleGoodChange={handleChange(setTradeGoodValue)}
            handleSubmit={handleSubmit(
              trade,
              {
                shipId: tradeShipValue,
                good: tradeGoodValue,
                destination: tradeDestinationValue,
                setCredits,
                setMyShips,
                setMarketLocation,
              },
            )}
          />
          <PayOffYourLoan
            loans={loans}
            value={repayLoanValue}
            handleChange={handleChange(setRepayLoanValue)}
            handleSubmit={handleSubmit(
              api.loans.payOffYourLoan,
              {
                loan: loans.find((loan) => loan.id === repayLoanValue),
              },
            )}
          />
        </section>
      </main>
    </div>
  );
}

export default Client;

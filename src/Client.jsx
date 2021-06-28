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
import CheckSystem from './forms/CheckSystem';
import AttemptWarpJump from './forms/AttemptWarpJump';

import api from './api/api';

import fly from './auto-trade/fly';
import staticRoute from './auto-trade/static-route';
import trade from './auto-trade/trade';

import chainPromises from './util/chain-promises';

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
  const [staticRouteName, setStaticRouteName] = useState('');
  const [staticRouteShipValue, setStaticRouteShipValue] = useState('');
  const [tradeShipValue, setTradeShipValue] = useState('');
  const [tradeGoodValue, setTradeGoodValue] = useState('');
  const [tradeDestinationValue, setTradeDestinationValue] = useState('');
  const [repayLoanValue, setRepayLoanValue] = useState('');
  const [checkSystemValue, setCheckSystemValue] = useState('');
  const [warpShipValue, setWarpShipValue] = useState('');
  const [gameStatus, setGameStatus] = useState('');
  const [marketLocation, setMarketLocation] = useState('');
  const [currentSystems, setCurrentSystems] = useState(new Set());

  useEffect(() => {
    api.types.getTypesOfLoans(setLoanTypes);
  }, [loans]);

  useEffect(() => {
    api.account.getMyAccount(setUsers)
      .then(({ user }) => setCredits(user.credits));
    api.loans.getMyLoans(setLoans);
    api.systems.getSystemShipListings(setShips);
    api.game.getGameStatus(setGameStatus);
    api.ships.getMyShips(setMyShips);
    api.types.getTypesOfGoods(setGoods);
  }, []);

  useEffect(() => {
    if (myShips.length > 0) {
      const systems = new Set(myShips.map((ship) => ship.location && ship.location.match(/^(?<system>[^-]*)/).groups.system));
      const sysArray = [...systems].filter((sy) => sy !== undefined);
      if (sysArray.reduce((acc, e) => acc || !currentSystems.has(e), false)) {
        setCurrentSystems(new Set(sysArray));
      }
    }
  }, [myShips]);

  useEffect(() => {
    /*
    Promise.all([...currentSystems].map((sy) => api.systems.getSystemLocations(sy, setLocations)));
    */
    chainPromises([...currentSystems].map((sy) => () => (
      api.systems.getSystemLocations(sy, setLocations)
    )));
  }, [currentSystems]);

  useEffect(() => {
    if (marketLocation) {
      api.locations.getLocationMarketplaces(marketLocation, (newMarketGoods) => {
        const fuel = newMarketGoods.find((good) => good.symbol === 'FUEL');
        const stuff = newMarketGoods.filter((good) => good.symbol !== 'FUEL').sort(({ symbol: a }, { symbol: b }) => (a > b ? 1 : -1));
        if (fuel) {
          setMarketGoods([fuel, ...stuff]);
        } else {
          setMarketGoods(stuff);
        }
      });
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
          <h2>data</h2>
          <Users users={users} credits={credits} />
          <Loans loans={loans} />
          <Ships ships={ships} />
          <MyShips myShips={myShips} />
          <Market goods={marketGoods} />
          <Locations locations={locations} />
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
                toastSuccess: true,
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
                toastSuccess: true,
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
      </main>
    </div>
  );
}

export default Client;

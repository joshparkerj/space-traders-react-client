import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import Users from './data/Users';
import LoanTypes from './data/LoanTypes';
import Loans from './data/Loans';
import Ships from './data/Ships';
import MyShips from './data/MyShips';
import Goods from './data/Goods';
import Market from './data/Market';
import Locations from './data/Locations';
import TakeOutALoan from './forms/TakeOutALoan';
import PurchaseAShip from './forms/PurchaseAShip';
import PlaceANewPurchaseOrder from './forms/PlaceANewPurchaseOrder';

import api from './api/api';

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
  const [gameStatus, setGameStatus] = useState('');

  useEffect(() => {
    api.getTypesOfLoans(setLoanTypes);
  }, [loans]);

  useEffect(() => {
    api.getMyAccount(setUsers);
    api.getMyLoans(setLoans);
    api.getSystemShipListings(setShips);
    api.getGameStatus(setGameStatus);
    api.getMyShips(setMyShips);
    api.getTypesOfGoods(setGoods);
  }, []);

  useEffect(() => {
    if (myShips[0]) {
      api.getLocationMarketplaces(myShips[0].location, setMarketGoods);
      api.getSystemLocations(myShips[0].location.match(/^(?<system>[^-]*).*$/).groups.system, setLocations);
    }
  }, [myShips]);

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
        <div className="credits">
          <span>credits:</span>
          <span>{credits}</span>
        </div>
        <section className="data">
          <h2>data</h2>
          <Users users={users} />
          <LoanTypes loans={loanTypes} />
          <Loans loans={loans} />
          <Ships ships={ships} />
          <MyShips myShips={myShips} />
          <Goods goods={goods} />
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
              api.takeOutALoan,
              { type: takeOutALoanValue, setLoans, setCredits },
            )}
          />
          <PurchaseAShip
            ships={ships}
            value={purchaseAShipValue}
            handleChange={handleChange(setPurchaseAShipValue)}
            handleSubmit={handleSubmit(
              api.purchaseAShip,
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
              api.placeANewPurchaseOrder,
              {
                shipId: purchaseOrderShipsValue,
                good: purchaseOrderGoodsValue,
                quantity: purchaseOrderGoodsValue,
                setCredits,
                setMyShips,
              },
            )}
          />
        </section>
      </main>
    </div>
  );
}

export default Client;

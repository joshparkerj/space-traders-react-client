import React, { useState, useEffect } from 'react';

import token from './space-traders-api-access-token';
import Users from './data/Users';
import LoanTypes from './data/LoanTypes';
import Loans from './data/Loans';
import Ships from './data/Ships';
import MyShips from './data/MyShips';
import Goods from './data/Goods';
import TakeOutALoan from './forms/TakeOutALoan';
import PurchaseAShip from './forms/PurchaseAShip';
import PlaceANewPurchaseOrder from './forms/PlaceANewPurchaseOrder';

import fetchWithRetry from './fetch-with-retry';

import './App.css';

const api = 'https://api.spacetraders.io/';

function Client() {
  const [users, setUsers] = useState([]);
  const [loanTypes, setLoanTypes] = useState([]);
  const [credits, setCredits] = useState(null);
  const [loans, setLoans] = useState([]);
  const [ships, setShips] = useState([]);
  const [myShips, setMyShips] = useState([]);
  const [goods, setGoods] = useState([]);
  const [takeOutALoanValue, setTakeOutALoanValue] = useState('');
  const [purchaseAShipValue, setPurchaseAShipValue] = useState('');
  const [purchaseOrderGoodsValue, setPurchaseOrderGoodsValue] = useState('');
  const [purchaseOrderShipsValue, setPurchaseOrderShipsValue] = useState('');
  const [purchaseOrderQuantityValue, setPurchaseOrderQuantityValue] = useState('0');
  const [gameStatus, setGameStatus] = useState('');

  useEffect(() => {
    const takeOutALoan = function takeOutALoan(type) {
      return () => {
        const fetchAddress = `${api}my/loans?token${token}&type=${type}`;
        const fetchOptions = {
          method: 'POST',
        };
        fetchWithRetry(fetchAddress, fetchOptions)
          .then((r) => r.json())
          .then((jsonResponse) => {
            setLoanTypes((l) => [...l, jsonResponse.loan]);
            setCredits(jsonResponse.credits);
          });
      };
    };

    fetchWithRetry(`${api}types/loans?token=${token}`)
      .then((r) => r.json())
      .then((jsonResponse) => {
        const newLoans = jsonResponse.loans.map((loan) => ({
          ...loan,
          takeOutALoan: takeOutALoan(loan.type),
        }));

        setLoanTypes((l) => (
          [...l, ...newLoans.filter((newLoan) => !l.map((e) => e.type).includes(newLoan.type))]
        ));
      });
  }, [loans]);

  useEffect(() => {
    fetchWithRetry(`${api}my/account?token=${token}`)
      .then((r) => r.json())
      .then(({ user }) => setUsers((u) => {
        if (u.map((e) => e.username).includes(user.username)) {
          return u;
        }

        return [...u, user];
      }));

    fetchWithRetry(`${api}my/loans?token=${token}`)
      .then((r) => r.json())
      .then((loansResponse) => {
        setLoans((l) => [
          ...l,
          ...(loansResponse
            ? loansResponse.loans.filter((newLoan) => !l.map((e) => e.id).includes(newLoan.id))
            : []),
        ]);
      });

    fetchWithRetry(`${api}systems/OE/ship-listings?token=${token}&class=MK-I`)
      .then((r) => r.json())
      .then(({ shipListings }) => {
        const reducedListings = shipListings.reduce((acc, e) => {
          const { purchaseLocations, ...noLoc } = e;
          return [...acc, ...purchaseLocations.map((loc) => ({ ...loc, ...noLoc }))];
        }, []);
        setShips((s) => (
          [
            ...s,
            ...reducedListings.filter((ship) => (
              !s.map((e) => e.type + e.location).includes(ship.type + ship.location)
            )),
          ]
        ));
      });

    fetchWithRetry(`${api}game/status`)
      .then((r) => r.json())
      .then(({ status }) => setGameStatus(status));

    fetchWithRetry(`${api}my/ships?token=${token}`)
      .then((r) => r.json())
      .then((shipsResponse) => setMyShips((s) => [...s, ...shipsResponse.ships]));

    fetchWithRetry(`${api}types/goods?token=${token}`)
      .then((r) => r.json())
      .then((goodsResponse) => setGoods((g) => [...g, ...goodsResponse.goods]));
  }, []);

  const handleChange = function handleChange(setter) {
    return function changeHandler({ target }) {
      setter(target.value);
    };
  };

  const handleSubmit = function handleSubmit(fetchAddress, fetchOptions, jsonHandler) {
    return function submitHandler(event) {
      fetchWithRetry(fetchAddress, fetchOptions)
        .then((r) => r.json())
        .then((json) => jsonHandler(json));
      event.preventDefault();
    };
  };

  return (
    <div className="App">
      <header className="App-header">
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
        </section>
        <section className="forms">
          <h2>forms</h2>
          <TakeOutALoan
            loanTypes={loanTypes.map((e) => e.type)}
            value={takeOutALoanValue}
            handleChange={handleChange(setTakeOutALoanValue)}
            handleSubmit={handleSubmit(
              `${api}my/loans?token=${token}&type=${takeOutALoanValue}`,
              { method: 'POST' },
              (json) => {
                setLoans((l) => [...l, json.loan]);
                setCredits(json.credits);
              },
            )}
          />
          <PurchaseAShip
            ships={ships}
            value={purchaseAShipValue}
            handleChange={handleChange(setPurchaseAShipValue)}
            handleSubmit={handleSubmit(
              `${api}my/ships`
              + `?token=${token}`
              + `&location=${purchaseAShipValue ? purchaseAShipValue.split(' ')[0] : ''}`
              + `&type=${purchaseAShipValue ? purchaseAShipValue.split(' ')[1] : ''}`,
              { method: 'POST' },
              (json) => {
                setMyShips((s) => [...s, json.ship]);
                setCredits(json.user.credits);
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
              `${api}my/purchase-orders`
              + `?token=${token}`
              + `&shipId=${purchaseOrderShipsValue}`
              + `&good=${purchaseOrderGoodsValue}`
              + `&quantity=${purchaseOrderQuantityValue}`,
              { method: 'POST' },
              (json) => {
                setCredits(json.credits);
                const updateMyShips = myShips.map((ship) => {
                  if (ship.id === json.ship.id) {
                    return json.ship;
                  }

                  return ship;
                });

                setMyShips(updateMyShips);
              },
            )}
          />
        </section>
      </main>
    </div>
  );
}

export default Client;

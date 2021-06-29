import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import Forms from './forms/Forms';
import DataSection from './data/DataSection';

import api from './api/api';

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
  const [locations, setLocations] = useState([]);
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
      const systems = new Set(myShips.map((
        (ship) => ship.location && ship.location.match(/^(?<system>[^-]*)/).groups.system
      )));
      const sysArray = [...systems].filter((sy) => sy !== undefined);
      if (sysArray.reduce((acc, e) => acc || !currentSystems.has(e), false)) {
        setCurrentSystems(new Set(sysArray));
      }
    }
  }, [myShips]);

  useEffect(() => {
    chainPromises([...currentSystems].map((sy) => () => (
      api.systems.getSystemLocations(sy, setLocations)
    )));
  }, [currentSystems]);

  return (
    <div className="App">
      <header className="App-header">
        <ToastContainer />
        <h1>Space Traders React Client</h1>
        <h2>{gameStatus}</h2>
      </header>
      <main>
        <DataSection {...{
          users, credits, loans, ships, myShips, locations, marketLocation,
        }}
        />
        <Forms {...{
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
        }}
        />
      </main>
    </div>
  );
}

export default Client;

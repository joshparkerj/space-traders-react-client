import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Users from './Users';
import Loans from './Loans';
import Ships from './Ships';
import MyShips from './MyShips';
import Market from './Market';
import Locations from './Locations';
// import FlightPlans from './FlightPlans';
// import Goods from './Goods';
// import LoanTypes from './LoanTypes';
// import WhereToSell from './WhereToSell';

import api from '../api/api';

const DataSection = function DataSection({
  users, credits, loans, ships, myShips, locations, marketLocation,
}) {
  const [marketGoods, setMarketGoods] = useState([]);

  useEffect(() => {
    if (marketLocation) {
      api.locations.getLocationMarketplaces(marketLocation, (newMarketGoods) => {
        const fuel = newMarketGoods.find((good) => good.symbol === 'FUEL');
        const stuff = newMarketGoods.filter((good) => (
          good.symbol !== 'FUEL'
        )).sort(({ symbol: a }, { symbol: b }) => (
          a > b ? 1 : -1
        ));
        if (fuel) {
          setMarketGoods([fuel, ...stuff]);
        } else {
          setMarketGoods(stuff);
        }
      });
    }
  }, [marketLocation]);

  return (
    <section className="data">
      <h2>data</h2>
      <Users {...{ users, credits }} />
      <Loans {...{ loans }} />
      <Ships {...{ ships }} />
      <MyShips {...{ myShips }} />
      <Market goods={marketGoods} />
      <Locations {...{ locations }} />
      {/* <FlightPlans />
    <Goods />
    <LoanTypes />
    <WhereToSell /> */}
    </section>

  );
};

DataSection.propTypes = {
  // goods: PropTypes.arrayOf(PropTypes.object).isRequired,
  // loanTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
  credits: PropTypes.number,
  marketLocation: PropTypes.string,
  users: PropTypes.arrayOf(PropTypes.object),
  ships: PropTypes.arrayOf(PropTypes.object).isRequired,
  myShips: PropTypes.arrayOf(PropTypes.object).isRequired,
  loans: PropTypes.arrayOf(PropTypes.object).isRequired,
  locations: PropTypes.arrayOf(PropTypes.object).isRequired,
};

DataSection.defaultProps = {
  credits: 0,
  marketLocation: '',
  users: [],
};

export default DataSection;

import React from 'react';
import PropTypes from 'prop-types';

import NewLoan from './NewLoan';
import PurchaseAShip from './PurchaseAShip';
import PlaceANewPurchaseOrder from './PlaceANewPurchaseOrder';
import SellTradeGoods from './SellTradeGoods';
import CreateFlightPlan from './CreateFlightPlan';
import AutoRunStaticRoute from './AutoRunStaticRoute';
import Trade from './Trade';
import PayOffYourLoan from './PayOffYourLoan';
import CheckSystem from './CheckSystem';
import AttemptWarpJump from './AttemptWarpJump';

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
  return (
    <section className="forms">
      <h2>forms</h2>
      <NewLoan {...{ setLoans, setCredits, toast }} loanTypes={loanTypes.map((e) => e.type)} />
      <PurchaseAShip {...{
        ships, setMyShips, setCredits, toast,
      }}
      />
      <PlaceANewPurchaseOrder
        {...{
          goods, myShips, setCredits, setMyShips, toast,
        }}
      />
      <SellTradeGoods
        {...{
          goods, myShips, setCredits, setMyShips, toast,
        }}
      />
      <CreateFlightPlan
        {...{
          myShips, locations, setCredits, setMyShips, setMarketLocation, toast,
        }}
      />
      <AutoRunStaticRoute
        {...{
          myShips, setCredits, setMyShips, setMarketLocation, toast,
        }}
      />
      <Trade
        {...{
          myShips, locations, goods, setCredits, setMyShips, setMarketLocation, toast,
        }}
      />
      <PayOffYourLoan {...{ loans, toast }} />
      <CheckSystem {...{ toast }} />
      <AttemptWarpJump {...{ myShips, toast }} />
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
  setLoans: PropTypes.func.isRequired,
  setMarketLocation: PropTypes.func.isRequired,
  setCredits: PropTypes.func.isRequired,
  setMyShips: PropTypes.func.isRequired,
  toast: PropTypes.func.isRequired,
};

export default Forms;

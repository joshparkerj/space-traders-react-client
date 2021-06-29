import React, { useState } from 'react';
import PropTypes from 'prop-types';

import LabelForSelect from './LabelForSelect';

import trade from '../auto-trade/trade';
import handleChange from './helpers/handle-change';
import handleSubmit from './helpers/handle-submit';

const Trade = function Trade({
  myShips, locations, goods, setCredits, setMyShips, setMarketLocation, toast,
}) {
  const [tradeShip, setTradeShip] = useState('');
  const [tradeGood, setTradeGood] = useState('');
  const [tradeDestination, setTradeDestination] = useState('');

  return (
    <form
      className="trade"
      onSubmit={handleSubmit(
        trade,
        {
          ship: myShips.find((ship) => ship.id === tradeShip),
          good: tradeGood,
          size: tradeGood
            ? goods.find((g) => g.symbol === tradeGood).volumePerUnit
            : 1,
          spaceAvailable: tradeShip
            ? myShips.find((ship) => ship.id === tradeShip).maxCargo - 20
            : 30,
          loadingSpeed: tradeShip
            ? myShips.find((ship) => ship.id === tradeShip).loadingSpeed
            : 25,
          destination: tradeDestination,
          setCredits,
          setMyShips,
          setMarketLocation,
        },
        toast,
      )}
    >
      <h3>trade</h3>
      <LabelForSelect
        id="trade-ship-id"
        name="ship id"
        value={tradeShip}
        handleChange={handleChange(setTradeShip)}
        options={myShips.map((ship) => (
          { optionName: `${ship.manufacturer} at ${ship.location}`, optionValue: ship.id }
        ))}
      />

      <LabelForSelect
        id="trade-destination"
        name="destination"
        value={tradeDestination}
        handleChange={handleChange(setTradeDestination)}
        options={locations.map((location) => (
          { optionName: `${location.symbol} (${location.name})`, optionValue: location.symbol }
        ))}
      />

      <LabelForSelect
        id="trade-good"
        name="good"
        value={tradeGood}
        handleChange={handleChange(setTradeGood)}
        options={goods.map((good) => ({ optionName: good.symbol, optionValue: good.symbol }))}
      />

      <input type="submit" value="Submit" />
    </form>
  );
};

Trade.propTypes = {
  myShips: PropTypes.arrayOf(PropTypes.object),
  locations: PropTypes.arrayOf(PropTypes.object),
  goods: PropTypes.arrayOf(PropTypes.object),
  setMarketLocation: PropTypes.func.isRequired,
  setCredits: PropTypes.func.isRequired,
  setMyShips: PropTypes.func.isRequired,
  toast: PropTypes.func.isRequired,
};

Trade.defaultProps = {
  myShips: [],
  locations: [],
  goods: [],
};

export default Trade;

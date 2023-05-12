import React, { createContext, useContext, useReducer } from 'react';
import processor from '@/processor';

const initialState = {
  calculated: {
    commissions: 0,
    realizedPl: 0
  },
  closedPositions: [],
  openPositions: [],
  transactions: {
    buyAndSell: {},
    dividends: [],
    commissions: [],
    deposits: [],
    withdraws: [],
    unknownRows: []
  },
  productNames: {},
  rawRows: []
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'loadRawRows':
      return {
        ...state,
        rawRows: action.payload,
        currency: action.payload[0].currencySymbol
      };
    case 'loadProcessedData':
      return {
        ...state,
        transactions: action.payload.transactions,
        closedPositions: action.payload.positions.closedPositions,
        openPositions: action.payload.positions.openPositions,
        productNames: action.payload.products,
        calculated: {
          commissions: action.payload.commissions,
          realizedPl: action.payload.positions.realizedPl
        }
      };
    default:
      return state;
  }
};

const StoreContext = createContext(initialState);

const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const processData = () => {
    var processedData = processor.processData(state.rawRows);
    dispatch({ type: 'loadProcessedData', payload: processedData });
  };

  const loadRawRows = (rawRows) => {
    dispatch({ type: 'loadRawRows', payload: rawRows });
  };

  return (
    <StoreContext.Provider value={{ state, loadRawRows, processData }}>
      {children}
    </StoreContext.Provider>
  );
};

const useStore = () => useContext(StoreContext);

export { StoreProvider, useStore };

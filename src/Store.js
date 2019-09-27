import React, { createContext, useReducer } from "react";
import { stat } from "fs";

export const StoreContext = createContext();

const initialState = { multiSelections: [], singleSelection: "" };

const reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_SINGLE_SELECTION":
      return {
        singleSelection: action.payload
      };
    case "ADD_SELECTION":
      let selectionArray = [];
      console.log("state.multiSelections", state.multiSelections);
      if (!state.multiSelections) {
        selectionArray = [action.payload];
      } else {
        selectionArray = [...state.multiSelections, action.payload];
      }
      return {
        ...state,
        multiSelections: selectionArray
      };
    case "REMOVE_SELECTION":
      const newArray = state.multiSelections.filter(
        selection => selection.value !== action.payload.value
      );
      return {
        ...state,
        multiSelections: newArray
      };
  }
};

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={[state, dispatch]}>
      {children}
    </StoreContext.Provider>
  );
};

export default Store;

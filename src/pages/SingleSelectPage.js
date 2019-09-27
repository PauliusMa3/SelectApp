import React, { useContext } from "react";
import ComposedSelectHooks from "../components/ComposedSelectHooks";
import { StoreContext } from "../Store";

const SingleSelectPage = () => {
  const [state, dispatch] = useContext(StoreContext);
  return (
    <div className="page">
      <ComposedSelectHooks singleSelect={true} />
      <p>Currently Selected Option: {state.singleSelection}</p>
    </div>
  );
};

export default SingleSelectPage;

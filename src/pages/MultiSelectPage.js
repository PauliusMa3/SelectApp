import React, { useContext } from "react";
import ComposedSelectHooks from "../components/ComposedSelectHooks";
import { StoreContext } from "../Store";

const MultiSelectPage = () => {
  const [state, dispatch] = useContext(StoreContext);

  return (
    <div className="page">
      <ComposedSelectHooks multiSelect={true} />
      <p>
        Currently Selected Items:{" "}
        {state.multiSelections &&
          state.multiSelections.map((selection, index) => (
            <span> {selection.label} </span>
          ))}
      </p>
    </div>
  );
};

export default MultiSelectPage;

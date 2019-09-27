import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.scss";
import MultiSelectPage from "./pages/MultiSelectPage";
import SingleSelectPage from "./pages/SingleSelectPage";
import Header from "./components/Header";
import Store from "./Store";

function App() {
  return (
    <div className="App">
      <Store>
        <Header />
        <Switch>
          <Route path="/single-select" exact component={SingleSelectPage} />
          <Route path="/multi-select" exact component={MultiSelectPage} />
        </Switch>
      </Store>
    </div>
  );
}

export default App;

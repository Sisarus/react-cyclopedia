import React from "react";
import ReactDOM from "react-dom/client";
import CyclOPediaPage from "./Components/CyclOPediaClassPage";
import Header from "./Components/Layout/Header";
import CyclOPediaFuncPage from "./Components/CyclOPediaClassFuncPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div>
    <Header />
    <div className="row text-white">
      <div className="col-6">
        <span className="h1 text-warning text-center">
          Class Component
        </span>
        <CyclOPediaPage />
      </div>
      <div className="col-6">
        <span className="h1 text-warning text-center">
          Func Component
        </span>
        <CyclOPediaFuncPage />
      </div>
    </div>
  </div>
);

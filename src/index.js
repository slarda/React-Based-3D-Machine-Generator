import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import LeftMenu from "./React/LeftMenu/LeftMenu";
import ReactUp from "./React/ReactUpMenu/ReactUp";
import BottomPanel from "./React/BottomPanel/BottomPanel";

import {
  // BrowserRouter as Router,
  HashRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
ReactDOM.render(
  <div className="root-LeftMenu">
    <LeftMenu />
  </div>,
  document.getElementById("LeftMenu")
);
ReactDOM.render(
  // <Router history={browserHistory}>
  <Router>
    <div>
      <ReactUp />
    </div>
  </Router>,
  document.getElementById("UpMenu")
);
// ReactDOM.render(
//   <div className="root-BottomPanel">
//     <BottomPanel />
//   </div>,
//   document.getElementById("BottomPanel")
// );


addEventListener('load', function() {
  ReactDOM.render(
    <div className="root-BottomPanel">
      <BottomPanel />
    </div>,
    document.getElementById("BottomPanel")
  );
});

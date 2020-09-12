import React from "react";
import logo from "./logo.svg";
import { ItemList, ItemDetail } from "./pages";
import "./App.css";
import {BrowserRouter, Switch, Route, withRouter} from 'react-router-dom'
import { LoginPage } from "./pages/login";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
            <Switch>
                <Route
                    path = "/" exact component={ItemList}
                />
                <Route
                    path = "/item-detail/:id" component={ItemDetail}
                />
                <Route
                    path = "/login" component={LoginPage}
                />
                <Route
                    path = "/register" component={LoginPage}
                />
            </Switch>
        </BrowserRouter>
    </div>
  );
}

export default withRouter(App);

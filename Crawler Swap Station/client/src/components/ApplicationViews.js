import React from "react";
import {Switch, Route, Redirect} from "react-router-dom"  
import Home from "./Home";
import MarketPlace from "./listings/listingList";
import Login from "./Login";
import Register from "./Register";

export default function ApplicationViews({ isLoggedIn }) {
  return (
    <main>
      <Switch>

        <Route path="/" exact>
          {isLoggedIn ? <Home /> : <Redirect to="/login" />}
        </Route>

        <Route path="/marketplace" exact>
          {isLoggedIn ? <MarketPlace /> : <Redirect to="/login" />}
        </Route>
        
        <Route path="/login">
          <Login />
        </Route>

        <Route path="/register">
          <Register />
        </Route>

      </Switch>
    </main>
  );
}

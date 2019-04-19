import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import { Switch } from "react-router";
import HomePage from "./layouts/HomePageLayout/HomePageLayout";
import LoginPage from "./layouts/LoginPageLayout/LoginPageLayout";

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/home" exact component={HomePage} />
      <Route path="/login" exact component={LoginPage} />
      <Route component={HomePage} />
    </Switch>
  </BrowserRouter>
);
export default App;

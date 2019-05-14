import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import { Switch } from "react-router";
import HomePage from "./layouts/HomePageLayout/HomePageLayout";
import LoginPage from "./layouts/LoginPageLayout/LoginPageLayout";
import ManagementPage from "./layouts/UserInfoLayout/UserInfoManagementLayout";

const App = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/home" exact component={HomePage} />
            <Route path="/login" exact component={LoginPage} />
            <Route parth="/userinfo" exact component={ManagementPage} />
            <Route component={HomePage} />
        </Switch>
    </BrowserRouter>
);
export default App;

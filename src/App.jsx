import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import { Switch } from "react-router";
import PrivateRoute from "./components/Route/PrivateApp";
import PublicRoute from "./components/Route/PublicApp";
import HomePage from "./layouts/HomePageLayout/HomePageLayout";
import LoginPage from "./layouts/LoginPageLayout/LoginPageLayout";
import AccessMan from "./layouts/AccessManLayout/accessManLayout";

const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <PublicRoute
                    restricted
                    
                    path="/login"
                    exact
                    component={LoginPage}
                />
                <PrivateRoute
                    
                    path="/accesslog"
                    exact
                    component={AccessMan}
                />
                <PublicRoute
                    restricted={false}
                    path="/home"
                    exact
                    component={HomePage}
                />
                <Route component={HomePage} />
            </Switch>
        </BrowserRouter>
    );
};
export default App;

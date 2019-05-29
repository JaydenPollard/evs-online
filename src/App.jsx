import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import { Switch } from "react-router";
import PrivateRoute from "./components/Route/PrivateApp";
import PublicRoute from "./components/Route/PublicApp";
import HomePage from "./layouts/HomePageLayout/HomePageLayout";
import LoginPage from "./layouts/LoginPageLayout/LoginPageLayout";
import AccessMan from "./layouts/AccessManLayout/accessManLayout";
const App = props => {
    return (
        <BrowserRouter>
            <Switch>
                <PublicRoute
                    {...props}
                    restricted={true}
                    path="/login"
                    exact
                    component={LoginPage}
                />
                <PrivateRoute
                    {...props}
                    path="/accesslog"
                    exact
                    component={AccessMan}
                />
                <PublicRoute
                    {...props}
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

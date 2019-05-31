import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import { Switch } from "react-router";
import {
    MuiThemeProvider,
    createMuiTheme,
    CssBaseline
} from "@material-ui/core";

import * as firebase from "firebase/app";
import AccessMan from "./layouts/AccessManLayout/accessManLayout";
import LoginPage from "./layouts/LoginPageLayout/LoginPageLayout";
import ManagementPage from "./layouts/UserManagementLayout/UserManagementLayout";
import SearchOrders from "./layouts/OrderLayout/SearchOrders/SearchOrders";
import NewOrder from "./layouts/OrderLayout/NewOrder/NewOrder";
import ViewMoviesLayout from "./layouts/MovieLayout/ViewMoviesLayout/ViewMoviesLayout";
import PublicRoute from "./components/Route/PublicApp";
import MovieContentProcessingLayout from "./layouts/MovieLayout/MovieContentProcessingLayout/MovieContentProcessingLayout";
import "firebase/auth";

const theme = createMuiTheme({
    palette: {
        type: "dark"
    }
});

const App = () => {
    const userArr = [];
    firebase.auth.onAuthStateChanged(user => userArr.push(user.uid)); // keep user logged in even when page is refreshed

    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <Switch>
                    <Route path="/home" exact component={ViewMoviesLayout} />
                    <PublicRoute
                        user={userArr}
                        path="/accesslog"
                        exact
                        component={AccessMan}
                    />
                    <Route
                        path="/order/search"
                        exact
                        component={SearchOrders}
                    />
                    <Route path="/order/new" exact component={NewOrder} />
                    <Route path="/login" exact component={LoginPage} />
                    <Route
                        path="/management/users"
                        exact
                        component={ManagementPage}
                    />
                    <Route
                        path="/management/movie"
                        exact
                        component={MovieContentProcessingLayout}
                    />
                    <Route component={ViewMoviesLayout} />
                </Switch>
            </BrowserRouter>
        </MuiThemeProvider>
    );
};
export default App;

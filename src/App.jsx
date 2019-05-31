import React, { useState } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import { Switch } from "react-router";
import {
    MuiThemeProvider,
    createMuiTheme,
    CssBaseline
} from "@material-ui/core";
import * as firebase from "firebase/app";
import RegistrationPage from "./layouts/RegistrationPageLayout/RegistrationPageLayout";
import LoginPage from "./layouts/LoginPageLayout/LoginPageLayout";
import ManagementPage from "./layouts/UserManagementLayout/UserManagementLayout";
import SearchOrders from "./layouts/OrderLayout/SearchOrders/SearchOrders";
import NewOrder from "./layouts/OrderLayout/NewOrder/NewOrder";
import AccessMan from "./layouts/AccessManLayout/accessManLayout";
import ViewMoviesLayout from "./layouts/MovieLayout/ViewMoviesLayout/ViewMoviesLayout";
import PublicRoutes from "./components/Route/PublicApp";
import PrivateRoutes from "./components/Route/PrivateApp";
import MovieContentProcessingLayout from "./layouts/MovieLayout/MovieContentProcessingLayout/MovieContentProcessingLayout";
import "firebase/auth";

const theme = createMuiTheme({
    palette: {
        type: "dark"
    }
});

const App = () => {
    const [userArr, setUserArr] = useState("");
    firebase.auth.onAuthStateChanged(user => {
        setUserArr(user.uid);
    });
    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <Switch>
                    <Route path="/home" exact component={ViewMoviesLayout} />
                    <Route path="/login" exact component={LoginPage} />
                    <Route
                        path="/register"
                        exact
                        component={RegistrationPage}
                    />
                    <Route
                        path="/order/search"
                        exact
                        component={SearchOrders}
                    />
                    <Route path="/order/new" exact component={NewOrder} />
                    <Route
                        path="/accesslog"
                        component={() => <AccessMan user={userArr} />}
                    />

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

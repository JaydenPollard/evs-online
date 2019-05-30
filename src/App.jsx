import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import { Switch } from "react-router";
import {
    MuiThemeProvider,
    createMuiTheme,
    CssBaseline
} from "@material-ui/core";



import AccessMan from "./layouts/AccessManLayout/accessManLayout";

import LoginPage from "./layouts/LoginPageLayout/LoginPageLayout";
import ManagementPage from "./layouts/UserManagementLayout/UserManagementLayout";
import SearchOrders from "./layouts/OrderLayout/SearchOrders/SearchOrders";
import NewOrder from "./layouts/OrderLayout/NewOrder/NewOrder";
import ViewMoviesLayout from "./layouts/MovieLayout/ViewMoviesLayout/ViewMoviesLayout";

import MovieContentProcessingLayout from "./layouts/MovieLayout/MovieContentProcessingLayout/MovieContentProcessingLayout";

const theme = createMuiTheme({
    palette: {
        type: "dark"
    }
});

const App = () => (
    <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
            <Switch>
                <Route path="/home" exact component={ViewMoviesLayout} />
                
                <Route path="/accesslog" exact component={AccessMan} />
                <Route path="/order/search" exact component={SearchOrders} />
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
export default App;

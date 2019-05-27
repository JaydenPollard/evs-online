import React from "react";
import firebase from "firebase";
import { Route, BrowserRouter } from "react-router-dom";
import { Switch } from "react-router";
import {
    MuiThemeProvider,
    createMuiTheme,
    CssBaseline
} from "@material-ui/core";
import LoginPage from "./layouts/LoginPageLayout/LoginPageLayout";
import SearchOrders from "./layouts/OrderPageLayout/SearchOrders";
import NewOrder from "./layouts/OrderPageLayout/NewOrder";
import OrderManagementPage from "./layouts/OrderPageLayout/OrderManagementPage";
import ViewMoviesLayout from "./layouts/MovieLayout/ViewMoviesLayout/ViewMoviesLayout";
import AddMoviesLayout from "./layouts/MovieLayout/MovieContentProcessingLayout/MovieContentProcessingLayout";

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
                <Route path="/login" exact component={LoginPage} />
                <Route
                    path="/management/movie"
                    exact
                    component={AddMoviesLayout}
                />
                <Route component={ViewMoviesLayout} />
                <Route path="/order/search" exact component={SearchOrders} />
                <Route path="/order/new" exact component={NewOrder} />
                <Route
                    path="/management/order"
                    exact
                    component={OrderManagementPage}
                />
            </Switch>
        </BrowserRouter>
    </MuiThemeProvider>
);
export default App;

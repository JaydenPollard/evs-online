import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import { Switch } from "react-router";
import {
    MuiThemeProvider,
    createMuiTheme,
    CssBaseline
} from "@material-ui/core";
import HomePage from "./layouts/HomePageLayout/HomePageLayout";
import LoginPage from "./layouts/LoginPageLayout/LoginPageLayout";
import MovieManagementPage from "./layouts/MovieManagementLayout/MovieManagementLayout";
import AddMoviesLayout from "./layouts/MovieManagementLayout/AddMoviesLayout/AddMoviesLayout";
import SearchMoviesLayout from "./layouts/MovieManagementLayout/SearchMoviesLayout/SearchMoviesLayout";

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
                <Route path="/home" exact component={HomePage} />
                <Route path="/login" exact component={LoginPage} />
                <Route
                    path="/management/movie"
                    exact
                    component={MovieManagementPage}
                />
                <Route
                    path="/management/addmovie"
                    exact
                    component={AddMoviesLayout}
                />
                <Route
                    path="/management/searchmovie"
                    exact
                    component={SearchMoviesLayout}
                />
                <Route component={HomePage} />
            </Switch>
        </BrowserRouter>
    </MuiThemeProvider>
);
export default App;

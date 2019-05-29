import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import { Switch } from "react-router";
import {
    MuiThemeProvider,
    createMuiTheme,
    CssBaseline
} from "@material-ui/core";
import LoginPage from "./layouts/LoginPageLayout/LoginPageLayout";
import ViewMoviesLayout from "./layouts/MovieLayout/ViewMoviesLayout/ViewMoviesLayout";
import AddMoviesLayout from "./layouts/MovieLayout/MovieContentProcessingLayout/MovieContentProcessingLayout";
import RegistrationPage from "./layouts/RegistrationPageLayout/RegistrationPageLayout";

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
                <Route path="/register" exact component={RegistrationPage} />
                <Route component={HomePage} />
            </Switch>
        </BrowserRouter>
    </MuiThemeProvider>
);
export default App;

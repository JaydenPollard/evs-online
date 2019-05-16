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
                <Route component={HomePage} />
            </Switch>
        </BrowserRouter>
    </MuiThemeProvider>
);
export default App;

/* eslint-disable react/jsx-filename-extension */
import "typeface-roboto";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import App from "./App";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#0d47a1"
        },
        secondary: {
            main: "#ff5722"
        },
        type: "dark",
        typography: {
            useNextVariants: true
        }
    }
});

ReactDOM.render(
    <BrowserRouter>
        <MuiThemeProvider theme={theme}>
            <App />
        </MuiThemeProvider>
    </BrowserRouter>,
    document.getElementById("root")
);

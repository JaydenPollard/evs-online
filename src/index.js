/* eslint-disable react/jsx-filename-extension */
import "typeface-roboto";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { firebase } from "./layouts/firebase";

const AppUI = props => {
    return (
        <BrowserRouter>
            <App  />
        </BrowserRouter>
    );
};

firebase.auth().onAuthStateChanged(user => {
    ReactDOM.render(<App user={user} />, document.getElementById("root"));
});

/* eslint-disable react/jsx-filename-extension */
import "typeface-roboto";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import * as firebase from "firebase/app";
import App from "./App";

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

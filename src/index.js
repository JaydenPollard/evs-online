/* eslint-disable react/jsx-filename-extension */
import "typeface-roboto";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import { firebase } from "../src/layouts/firebase";
const AppUI = props => {
    return (
        <BrowserRouter>
            <App {...props} />
        </BrowserRouter>
    );
};

firebase.auth().onAuthStateChanged(user => {
    console.log(user);

    ReactDOM.render(<App user={user} />, document.getElementById("root"));
});

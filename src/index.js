/* eslint-disable react/jsx-filename-extension */
import "typeface-roboto";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import Firebase, { FirebaseContext } from "./components/Firebase";

ReactDOM.render(
    <FirebaseContext.Provider value={new Firebase()}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </FirebaseContext.Provider>,
    document.getElementById("root")
);

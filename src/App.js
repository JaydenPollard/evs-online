import HomePage from "./layouts/pages/HomePage";
import LoginPage from "./layouts/pages/LoginPage";
import React from "react";
import { Route } from "react-router-dom";

const App = () => (
	<div>
		<Route path="/home" exact component={HomePage} />
		<Route path="/login" exact component={LoginPage} />
	</div>
);
export default App;

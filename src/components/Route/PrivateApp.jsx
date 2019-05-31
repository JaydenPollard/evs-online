import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import * as firebase from "firebase/app";

// route for authorised user to access
const PrivateRoutes = ({ user, component: Comp, ...rest }) => {
    return (
        <Route
            {...rest}
            component={props =>
                user == null ? (
                    <Redirect to="/home" />
                ) : (
                    <Comp {...props} user={user} />
                )
            }
        />
    );
};
PrivateRoutes.propTypes = {
    component: PropTypes.func.isRequired,
    user: PropTypes.element.isRequired
};

export default PrivateRoutes;

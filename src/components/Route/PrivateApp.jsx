import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

// route for authorised user to access
const PrivateRoutes = ({ user, component: Comp, ...otherProps }) => {
    return (
        <Route
            {...otherProps}
            component={props =>
                user ? <Comp {...props} user={user} /> : <Redirect to="/home" />
            }
        />
    );
};
PrivateRoutes.propTypes = {
    component: PropTypes.func.isRequired,
    user: PropTypes.element.isRequired
};

export default PrivateRoutes;

import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { isMemberAdmin } from "../../logic/common/firebaseauth.function";

// staff only
const InternalRoutes = ({ user, component: Comp, ...otherProps }) => {
    return (
        <Route
            {...otherProps}
            component={props =>
                user && isMemberAdmin() ? (
                    <Comp {...props} user={user} />
                ) : (
                    <Redirect to="/home" />
                )
            }
        />
    );
};
InternalRoutes.propTypes = {
    component: PropTypes.func.isRequired,
    user: PropTypes.element.isRequired
};

export default InternalRoutes;

import React from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";

// anyone can access this
const PublicRoutes = ({ user, component: Comp, ...rest }) => {
    return (
        <Route
            {...rest}
            component={props => {
                // will be fixed to create public and private route

                return <Comp {...props} user={user} />;
            }}
        />
    );
};
PublicRoutes.propTypes = {
    component: PropTypes.func.isRequired,
    user: PropTypes.element.isRequired
};

export default PublicRoutes;

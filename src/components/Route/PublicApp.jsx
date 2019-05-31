import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";

const PublicRoutes = ({ user, component: Comp, ...rest }) => {
    return (
        <Route
            {...rest}
            component={props => {
                // will be fixed to create public and private route
                // if (user)
                //     return (
                //         <Redirect to="/home" /> )
                // else
                // return (
                //     <Comp {...props} user={user} />)
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

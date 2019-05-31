import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import * as firebase from "firebase/app";
import "firebase/auth";
import { isMemberAdmin } from "../../logic/common/firebaseauth.function";

const InternalRoutes = ({ user, component: Comp, ...rest }) => {
    return (
        <Route
            {...rest}
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

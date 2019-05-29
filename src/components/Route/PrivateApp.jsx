import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as firebase from "firebase/app";
// import {firebase} from '../../layouts/firebase'

const PrivateRoutes = ({component: Comp, ...rest }) => {
  const user =firebase.auth().currentUser; 
  return (
      <Route
          {...rest}
          component={props =>
        (user) ? 
            <Comp {...props}  /> 
        :
            <Redirect to="/home" /> 
      }
      />
  );
};
PrivateRoutes.propTypes={
    component: PropTypes.func.isRequired,
  }

export default PrivateRoutes;
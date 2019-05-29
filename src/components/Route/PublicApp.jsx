import React from 'react';
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom';
import {firebase} from '../../layouts/firebase'
const PublicRoutes = ({ component: Comp, ...rest }) => {
  const user =firebase.auth().currentUser; 
  return (
      <Route
          {...rest}
          component={props => {
          
          if (rest.restricted) 
            if (user)
                return (
                    <Redirect to="/home" /> )
            else 
            return (
                <Comp {...props} user={user} />)
          return (
              <Comp {...props} user={user} />)
          
          } 
      }
      />
  );
};
PublicRoutes.propTypes={
  component: PropTypes.func.isRequired,
}

export default PublicRoutes;
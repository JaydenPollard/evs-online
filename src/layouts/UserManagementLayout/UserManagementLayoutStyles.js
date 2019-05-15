import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

export const userManagementStyles = theme => ({
form: {
  width: "100%", // Fix IE 11 issue.
  marginTop: theme.spacing.unit,
  marginBottom: theme.spacing.unit
},
paper: {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
    .spacing.unit * 3}px`
},
divider: {
  height: theme.spacing.unit / 6,
  backgroundColor: "#8c8c8c",
  width: "80%",
  marginTop: theme.spacing.unit * 2
},
main: {
  width: "80vw",
  display: "block", // Fix IE 11 issue.
  marginLeft: "auto",
  marginRight: "auto",
  paddingTop: "10vh",
  [theme.breakpoints.up("md")]: {
    width: 700
  }
}

});

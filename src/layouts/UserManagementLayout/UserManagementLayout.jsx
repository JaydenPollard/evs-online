import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import {userManagementStyles} from '../UserManagementLayout/UserManagementLayoutStyles';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import withStyles from '@material-ui/core/styles/withStyles';
function OutlinedTextFields(props) {
    const {classes} = props;
    return (
      <main className={classes.main}>
 <Paper className={classes.paper}>
      <form className={classes.form}>
      <FormControl margin="normal" required fullWidth>
        <TextField
          required
          id="outlined-required"
          label="FirstName"
          placeholder="FirstName"
          margin="normal"
          variant="outlined"
        />
        </FormControl>
        <FormControl margin="normal" required fullWidth>
        <TextField
          required
          id="outlined-required"
          label="MemberType"
          placeholder="MemberType"
          margin="normal"
          variant="outlined"
        />
        </FormControl>
        <FormControl margin="normal" required fullWidth>
        <TextField
        required
        hidden
        id="outlined-required"
        label="PhoneNumber"
        placeholder="PhoneNumber"
        margin="normal"
        variant="outlined"
      />
      </FormControl>
      </form>
      </Paper>
      </main>
    );
  }
  console.log("Succeess");
  export default withStyles(userManagementStyles)(OutlinedTextFields);

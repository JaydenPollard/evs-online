import React, {Fragment} from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { userManagementStyles } from '../UserManagementLayout/UserManagementLayoutStyles';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';

function StaffForm(props)
{
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [joinedDate, setJoinedDate] = React.useState("");
  const [add, setAddress] = React.useState("");
  const [type, setType] = React.useState("");
  function handleName(e){
    setName(e.target.value);
  }
  function handleAdd(e){
   setAddress(e.target.value);
  }
  function handlePhone(e){
    setPhone(e.target.value);
  }
  function handleEmail(e){
    setEmail(e.target.value);
  }
  function handleJoinedDate(e){
    setJoinedDate(e.target.value);
  }
  function handleType(e){
    setType(e.target.value);
    
  }
  function print()
  {
      console.log(name, add, email, phone)
      props.Print();
  }
return (
<Paper hidden={false}>
<FormControl margin="normal" required fullWidth>
<TextField
    required
    id="outlined-required"
    label="Full Name"
    placeholder="Full Name"
    margin="normal"
    value = {name}
    onChange={handleName}
  />
</FormControl>
<FormControl margin="normal" required fullWidth>
  <TextField
    required
    id="outlined-required"
    label="Role"
    placeholder="Role"
    margin="normal"
    value = {type}
    onChange={handleType}
  />
</FormControl>
<FormControl margin="normal" required fullWidth >
  <TextField
    required
    hidden
    id="outlined-required"
    label="PhoneNumber"
    placeholder="PhoneNumber"
    margin="normal"
    value = {phone}
    onChange={handlePhone}
  />
 </FormControl>
 <FormControl margin="normal" required fullWidth >
  <TextField
    required
    hidden
    id="outlined-required"
    label="Email"
    placeholder="Email"
    margin="normal"
    value = {email}
    onChange = {handleEmail}
  />
 </FormControl>
 <Button type="submit"
          fullWidth
          variant="contained"
          color="inherit"
          onClick={print}>Add Staff</Button>
</Paper>
);
}
export default StaffForm;
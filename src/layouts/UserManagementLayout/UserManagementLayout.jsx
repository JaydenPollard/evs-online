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
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import StaffForm from './StaffForm';
import CustomerForm from './CustomerForm';
function OutlinedTextFields(props) {
  const { classes, selectedValue } = props;
  const [open, setOpen] = React.useState(false);
  const [disable1, setDisable1] = React.useState(false);
  const [disable2, setDisable2] = React.useState(false);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [joinedDate, setJoinedDate] = React.useState("");
  const [add, setAddress] = React.useState("");
  const [type, setType] = React.useState("");
  const handleSubmit = (evt) => {
    evt.preventDefault();
    alert(`Submitting Name ${name}`)
  }
  function Print(){
    // console.log(name, phone, email, joinedDate, add);
    // firebase.database().ref('users/' + userID).set({
    //   username: name,
    //   email: email,
    //   address: add,
    //   phoneNumber: phone,
    // });
    setOpen(false);
  }
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
  function handleOpen(){  
     setOpen(true);
  }
  function handleClose(){
    setOpen(false);
    console.log(name, phone, email, joinedDate, add);
    
  }
  function handleDisable1()
  {
    setDisable1(true);
    setDisable2(false);
  }
  function handleDisable2()
  {
    setDisable1(false);
    setDisable2(true);
  }
  function wrapFunction()
  {
    handleOpen();
    handleDisable1();
  }
  return (
    <main className={classes.main}>
      <div>  
        <Fab onClick={wrapFunction} color="primary" aria-label="Add">
        <AddIcon /></Fab>
      </div>
      <Dialog onClose={handleClose} open={open} aria-labelledby="form-dialog-title">
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h5">
          Add User
        </Typography>
        <form className={classes.form}>
        <div>
        <Button variant="outlined" onClick={handleDisable1} disabled={disable1} >
        Add Customer
      </Button>
      <Button variant="outlined" onClick={handleDisable2} disabled={disable2} >
        Add Staff
      </Button>
        </div>
          <CustomerForm Print={handleClose}></CustomerForm>
          <StaffForm Print={handleClose} ></StaffForm> 
          </form>
        
      </Paper>
      </Dialog>
    </main>
  );
}
export default withStyles(userManagementStyles)(OutlinedTextFields);

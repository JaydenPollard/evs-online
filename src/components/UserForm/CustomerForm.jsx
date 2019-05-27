import React, {Fragment} from 'react';
import {
    FormControl,
    Grid,
    Input,
    MenuItem,
    TextField,
    Typography
} from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import firebase from "firebase";
import NumberFormat from "react-number-format";

function CustomerForm(props)
{
    const user = props;
    const rootRef = firebase.database()
        .ref()
        .child("Users")
        .child("Customers")
        // .child(user.userId);
    const [name, setName] = React.useState("");
    const [dob, setDoB] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [joinedDate, setJoinedDate] = React.useState("");
    const [memberType, setMemberType] = React.useState("");
    const [phoneNum, setPhoneNum] = React.useState("");
    const [address, setAddress] = React.useState("");
    const memberInput = [
        {
            value: "Standard",
            label: "Standard"
        },
        {
            value: "VIP",
            label: "VIP"
        }
    ];

  function handleName(e){
    setName(e.target.value);
  }
  function handleAddress(e){
    setAddress(e.target.value);
  }
  function handleDoB(e){
      setDoB(e.target.value);
  }
  function handlePhoneNum(e){
    setPhoneNum(e.target.value);
  }
  function handleEmail(e){
    setEmail(e.target.value);
  } 
  function handleJoinedDate(e){
    setJoinedDate(e.target.value);
  }
  function handleMemberType(e){
    setMemberType(e.target.value);
    
  }
  function handleSubmit()
  {
    //  updateFirebse();
    console.log(name, address, phoneNum, memberType, dob, joinedDate)
  }


//   function updateFirebse() {
//     rootRef.child("Address").set(address);
//     rootRef.child("DoB").set(dob);
//     rootRef.child("Email").set(email);
//     rootRef.child("JoinedDate").set(joinedDate);
//     rootRef.child("MemberType").set(memberType);
//     rootRef.child("Name").set(name);
//     rootRef.child("PhoneNum").set(phoneNum);
// }


return (
<Paper>
        <Typography variant = "h5" algin = "center"> Add Customer </Typography>
          <FormControl margin="normal" required fullWidth>
          <Typography >Full Name*: </Typography>
            <TextField
              required
              value = {name}
              onChange={handleName}
            />
          </FormControl>
          <Typography >Date Of Birth: </Typography>
           <FormControl margin="normal" required fullWidth >
            <TextField
              required
              value = {dob}
              onChange={handleDoB}
              type = "date"
            />
           </FormControl>
          <FormControl  margin="normal" required fullWidth>
          <Typography >Address*:  </Typography>
            <TextField
              required
              value = {address}
              onChange={handleAddress}
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth >
          <Typography >Email*:  </Typography>
                <TextField
              required
              value = {email}
              onChange={handleEmail}
            />
           </FormControl>
           <FormControl margin="normal" required>
          <Typography >Phone Number:  </Typography>
          <NumberFormat
                customInput={TextField}
                format="+64 ### ### ###"
                placeholder = "+64"
                value={phoneNum}
                onChange={handlePhoneNum}
                  required
                                />
         </FormControl>
         <Typography>Member Type:</Typography> 
            <FormControl margin="normal" required>
                <TextField
                    select
                    value={memberType}
                    onChange={handleMemberType}
                                    >
                {memberInput.map(option => (
                    <MenuItem
                        key={option.value}
                        value={option.value}
                                            >
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
          </FormControl>

         

           <Typography >Joined Date: </Typography>
           <FormControl margin="normal" required fullWidth >
            <TextField
              required
              value = {joinedDate}
              onChange={handleJoinedDate}
              type = "date"
            />
           </FormControl>
           <Button type="submit"
          fullWidth
          variant="contained"
          color="inherit" 
          onClick={handleSubmit}>Add Customer</Button>
</Paper>
);
}
export default CustomerForm

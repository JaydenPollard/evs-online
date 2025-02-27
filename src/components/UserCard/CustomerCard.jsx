import {
    FormControl,
    Grid,
    Input,
    MenuItem,
    TextField,
    Typography
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import EditIcon from "@material-ui/icons/Edit";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import NumberFormat from "react-number-format";
import * as firebase from "firebase/app";
import "firebase/database";
import InfoSnackbar from "../common/InfoSnackbar";
import { disableCustomer } from "../../logic/user/removeUser.function";

const CustomerCard = props => {
    const user = props;
    const rootRef = firebase.database
        .ref()
        .child("Users")
        .child("Customers")
        .child(user.userId);
    const [name, setName] = useState("");
    const [dob, setDoB] = useState("");
    const [email, setEmail] = useState("");
    const [joinedDate, setJoinedDate] = useState("");
    const [memberType, setMemberType] = useState("");
    const [phoneNum, setPhoneNum] = useState("");
    const [address, setAddress] = useState("");
    const [isActive, setIsActive] = useState();
    const [displaySnackBar, setDisplaySnackbar] = useState(false);
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

    // Individual functions to update each user fields
    const handleNameChange = e => {
        setName(e.target.value);
    };
    const handleAddressChange = e => {
        setAddress(e.target.value);
    };
    const handleDoBChange = e => {
        setDoB(e.target.value);
    };
    const handleEmailChange = e => {
        setEmail(e.target.value);
    };
    const handleMemberTypeChange = e => {
        setMemberType(e.target.value);
    };
    const handlePhoneNumChange = e => {
        setPhoneNum(e.target.value);
    };
    const handleSubmit = e => {
        e.preventDefault();
        updateUser();
    };

    const handleDelete = () => {
        confirmAlert({
            title: "Are you sure?",
            message: `Deleting: ${email}`,
            buttons: [
                {
                    label: "Confirm",
                    onClick: () => {
                        handleRemoveConfirmed();
                    }
                },
                {
                    label: "Cancel",
                    onClick: () => {}
                }
            ]
        });
    };

    const handleRemoveConfirmed = async () => {
        const success = await disableCustomer(user);
        if (success) {
            setDisplaySnackbar(true);
        }
    };

    const updateUser = () => {
        rootRef.child("Address").set(address);
        rootRef.child("DoB").set(dob);
        rootRef.child("Email").set(email);
        rootRef.child("JoinedDate").set(joinedDate);
        rootRef.child("MemberType").set(memberType);
        rootRef.child("Name").set(name);
        rootRef.child("PhoneNum").set(phoneNum);
        rootRef.child("IsActive").set(isActive);
    };

    useEffect(() => {
        // Loops through each user attributes, and fill in corresponding fields
        rootRef.once("value").then(snapshot => {
            snapshot.forEach(attributes => {
                switch (attributes.key) {
                    case "Address":
                        setAddress(attributes.val());
                        break;
                    case "DoB":
                        setDoB(attributes.val());
                        break;
                    case "Email":
                        setEmail(attributes.val());
                        break;
                    case "JoinedDate":
                        setJoinedDate(attributes.val());
                        break;
                    case "MemberType":
                        setMemberType(attributes.val());
                        break;
                    case "Name":
                        setName(attributes.val());
                        break;
                    case "PhoneNum":
                        setPhoneNum(attributes.val());
                        break;
                    case "IsActive":
                        setIsActive(attributes.val());
                        break;
                    default:
                }
            });
        });
    }, []);

    if (isActive === true) {
        return (
            <>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <ValidatorForm
                                autoComplete="off"
                                onSubmit={handleSubmit}
                            >
                                <Grid container spacing={24}>
                                    <Grid item xs={12}>
                                        <Typography>User Basic Info</Typography>
                                        <div>{isActive}</div>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography>Name:</Typography>
                                        <Input
                                            placeholder="Name"
                                            value={name}
                                            onChange={handleNameChange}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography>ID:</Typography>
                                        <Input
                                            placeholder="Name"
                                            value={user.userId}
                                            disabled
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography>DoB:</Typography>
                                        <FormControl>
                                            <TextField
                                                type="date"
                                                value={dob}
                                                onChange={handleDoBChange}
                                                InputLabelProps={{
                                                    shrink: true
                                                }}
                                                required
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography>Email:</Typography>
                                        <TextValidator
                                            name="email"
                                            placeholder="Email"
                                            value={email}
                                            onChange={handleEmailChange}
                                            validators={["isEmail"]}
                                            errorMessages={[
                                                "Email is not valid"
                                            ]}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography>Joined Date:</Typography>
                                        <FormControl>
                                            <TextField
                                                type="date"
                                                value={joinedDate}
                                                disabled
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography>Memeber Type:</Typography>
                                        <FormControl>
                                            <TextField
                                                select
                                                value={memberType}
                                                onChange={
                                                    handleMemberTypeChange
                                                }
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
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography>Phone Number:</Typography>
                                        <NumberFormat
                                            customInput={TextField}
                                            format="+614## ### ###"
                                            placeholder="Phone Number"
                                            value={phoneNum}
                                            onChange={handlePhoneNumChange}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography>Address:</Typography>
                                        <Input
                                            placeholder="Address"
                                            value={address}
                                            onChange={handleAddressChange}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="inherit"
                                        >
                                            Submit Changes
                                            <EditIcon
                                                style={{
                                                    margin: "0 0 5px 5px"
                                                }}
                                            />
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={handleDelete}
                                        >
                                            Delete User
                                            <DeleteIcon
                                                style={{
                                                    margin: "0 0 5px 5px"
                                                }}
                                            />
                                        </Button>
                                    </Grid>
                                </Grid>
                            </ValidatorForm>
                        </CardContent>
                    </Card>
                </Grid>
                <InfoSnackbar
                    open={displaySnackBar}
                    onclose={() => {
                        setDisplaySnackbar(false);
                    }}
                    message="User Removed. Please re-render the page the update"
                />
            </>
        );
    } else return <></>;
};

export default CustomerCard;

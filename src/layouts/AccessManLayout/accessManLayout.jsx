/* eslint-disable func-names */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import { Button, TextField, Typography } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "material-ui-pickers";
import * as firebase from "firebase/app";
import "firebase/database";
import { Link } from "react-router-dom";
import "firebase/auth";
import SearchedBlo from "../../components/LogComponent/SearchedTable";
import HistoryBlo from "../../components/LogComponent/Generaltable";
import AppBar from "../../components/AppBar/AppBar";

function AccessMan(props) {
    const userLogedInID = props;

    const [searchedDate, setSearchedDate] = useState();
    const [shAll, setShAll] = useState(true);

    const uIdRef = firebase.database.ref("AccessLog/");
    const useID = userLogedInID.user;

    let userName;

    // set searched value
    function handleSearch(e) {
        setSearchedDate(e.target.value);
    }
    // return which view will be used
    function checkView(showAll) {
        if (showAll) return <HistoryBlo testid={userLogedInID.user} />;

        return <SearchedBlo searchedDate={searchedDate} testid={useID} />;
    }

    // return userName
    function getUserName() {
        firebase.database
            .ref(`Users/Staffs/${userLogedInID.user}/Name`)
            .once("value")
            .then(function(snapshot) {
                userName = snapshot.val();
            });

        if (userName == null)
            firebase.database
                .ref(`Users/Customers/${userLogedInID.user}/Name`)
                .on("value", function(snapshot) {
                    userName = snapshot.val();
                });
    }
    useEffect(() => {
        uIdRef
            .child(`/${userLogedInID.user}`)
            .once("value")
            .then(snapshot => {
                const temp = snapshot.val();
                const tempLogKey = [];
                const dateRecord = [];
                const timeRecord = [];

                snapshot.forEach(function(childSnapshot) {
                    tempLogKey.push(childSnapshot.key);
                });

                for (let i = 0; i < tempLogKey.length; i += 1) {
                    const k = tempLogKey[i];
                    dateRecord.push(temp[k].date);
                    timeRecord.push(temp[k].time);
                }
            });
    }, []);
    return (
        <div>
            <AppBar user={useID} />
            <div>
                <Grid container justify="center">
                    <Typography variant="h5" component="h5">
                        {" "}
                        Hello, {getUserName()}{" "}
                    </Typography>
                    <Typography variant="h5" component="h4">
                        {" "}
                        This is your access log page{" "}
                    </Typography>
                </Grid>
                <Grid container justify="center">
                    <Grid item xs={2}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <TextField
                                fullWidth
                                type="date"
                                value={searchedDate}
                                onChange={handleSearch}
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                        </MuiPickersUtilsProvider>{" "}
                    </Grid>{" "}
                    <Grid item xs={3}>
                        <button
                            type="submit"
                            onClick={e => {
                                setShAll(false);
                            }}
                        >
                            Search
                        </button>
                    </Grid>
                </Grid>
                <div>{checkView(shAll)}</div>
            </div>
            <div>
                <Button
                    type="submit"
                    onClick={e => {
                        setShAll(true);
                    }}
                >
                    {" "}
                    Show all{" "}
                </Button>
                <Button type="submit">
                    {" "}
                    <Link to="/home"> Home </Link>
                </Button>
            </div>
        </div>
    );
}
AccessMan.propTypes = {
    history: PropTypes.object.isRequired
};
export default AccessMan;

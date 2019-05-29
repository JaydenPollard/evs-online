/* eslint-disable func-names */
import React, { useState, useEffect } from "react";
// import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import { Button, TextField } from "@material-ui/core";
// import { makeStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import {
    MuiPickersUtilsProvider,
    } from "@material-ui/pickers";
    import * as firebase from "firebase/app";
// import { firebase } from "../firebase";
// import {
//     getTime
    
// }  from "../../components/LogComponent/Generaltable";
import SearchedBlo from "../../components/LogComponent/SearchedTable";
import HistoryBlo from "../../components/LogComponent/Generaltable";
import AppBar from "../../components/AppBar/AppBar";

// const useStyles = makeStyles(theme => ({
//     root: {
//         width: "100%",
//         marginTop: theme.spacing(3),
//         overflowX: "auto"
//     },
//     table: {
//         minWidth: 650
//     }
// }));
function AccessMan(props) {
    // const classes = useStyles();
    const [userId, setUserId] = useState([]);
    const [date, setDate] = useState([]);
    const [time, setTime] = useState([]);
    const [headKey, setHeadKey] = useState([]);
    const [searchedDate, setSearchedDate] = useState();
    const [shAll, setShAll] = useState(true);

    // let abc = getTime(headKey, date, time, userId);
    // let def = getSearchResult(headKey, date, time, userId, searchedDate);
    const uIdRef = firebase.database().ref("AccessLog");
    
    let userName;
    const user = firebase.auth().currentUser;
    // handle change of check box
    // function handleCheckBox(event, key) {
    //     const { target } = event;
    //     const checkVal = new Array();
    //     if (target.checked) checkVal.push(key);
    //     else checkVal.splice(checkVal.indexOf(key), 1);
    //     setToBeDeleted(checkVal);
    // }
    // set searched value
    function handleSearch(e) {
        setSearchedDate(e.target.value);
    }
    // return which view will be used
    function checkView(showAll) {
        if (showAll)
            return (
                <HistoryBlo
                    headKey={headKey}
                    date={date}
                    time={time}
                    idKey={userId}
                />
            );

        return (
            <SearchedBlo
                headKey={headKey}
                date={date}
                time={time}
                idKey={userId}
                searchedDate={searchedDate}
            />
        );
    }

    // return userName
    function getUserName() {
        firebase
            .database()
            .ref(`Users/Staffs/${  user.uid  }/Name`)
            .once("value").then(function(snapshot) {
                userName = snapshot.val();
            });
        if (userName == null)
            firebase
                .database()
                .ref(`Users/Customers/${  user.uid  }/Name`)
                .on("value", function(snapshot) {
                    userName = snapshot.val();
                });
    }
    useEffect(() => {
        uIdRef.once("value").then(snapshot => {
            const temp = snapshot.val();
            const logKey = [];
            const dateRecord = [];
            const timeRecord = [];
            const userKey = [];
            snapshot.forEach(function(childSnapshot) {
                logKey.push(childSnapshot.key);
            });

            for (let i = 0; i < logKey.length; i+=1) {
                const k = logKey[i];
                dateRecord.push(temp[k].date);
                timeRecord.push(temp[k].time);
                userKey.push(temp[k].userID);
            }
            setDate(dateRecord);
            setUserId(userKey);
            setHeadKey(logKey);
            setTime(timeRecord);
        });
    }, []);

    return (
        <div>
            <AppBar />
            <div className="history_blocks">
                {getUserName()}
                <h2> Hello, {userName} </h2>
                <h3> This is your access log page </h3>
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
                            {" "}
                            Search{" "}
                        </button>{" "}
                    </Grid>
                </Grid>
                <div>{checkView(shAll)}</div>
            </div>
            <div>
                <Button type="submit" onClick={e => setShAll(true)}>
                    {" "}
                    Show all{" "}
                </Button>

                <Button
                    type="submit"
                    onClick={e => {
                        firebase.auth().signOut();
                    }}
                >
                    {" "}
                    LogOut{" "}
                </Button>
            </div>
        </div>
    );
}

export default AccessMan;

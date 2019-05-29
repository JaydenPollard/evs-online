import React, { useState } from "react";
import moment from "moment";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import { firebase } from "../../layouts/firebase";

// Extracting whole data for the current user
export const getTime = (headKey, date, time, idKey) => {
    const saving = new Array();
    const dateToSearch = new Array();
    const user = firebase.auth().currentUser;

    for (let i = 0; i < headKey.length; i++)
        if (idKey[i] !== undefined && idKey[i] == user.uid) {
            saving.push({
                date: date[i],
                time: time[i],
                id: headKey[i],
                userInfo: user.uid
            });
            dateToSearch.push(date[i]);
        }

    return saving;
};

// method for deleting data based on logID
export function delEntry(deletedArray) {
    const uIdRef = firebase.database().ref("AccessLog/");
    for (let i = 0; i < deletedArray.length; i++)
        uIdRef.child(deletedArray[i]).remove();
}

// export Data of search criteria for render

export const getSearchResult = (headKey, date, time, idKey, searchedDate) => {
    const result = new Array();

    const dateToCompare = moment(searchedDate).format("DD/MM/YYYY");

    for (let i = 0; i < 7; i++)
        if (
            idKey[i] !== undefined &&
            idKey[i] == "C001" &&
            date[i] == dateToCompare
        ) {
            result.push({
                date: date[i],
                time: time[i],
                id: headKey[i],
                userInfo: "C001"
            });
        }

    return result;
};
// data render
export default function HistoryBlo(props) {
    let accLog = props;
    let abc = getTime(accLog.headKey, accLog.date, accLog.time, accLog.idKey);
    const checkVal = [];
    function handleCheckBox(event, key) {
        const target = event.target;

        if (target.checked) checkVal.push(key);
        else if (target.checked == false)
            checkVal.splice(checkVal.indexOf(key), 1);
    }
    return (
        <div>
            <Table>
                <TableHead>
                    {" "}
                    <TableRow>
                        {" "}
                        <TableCell> Date </TableCell>{" "}
                        <TableCell> Time </TableCell>{" "}
                        <TableCell> Log ID</TableCell> <TableCell> </TableCell>{" "}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {abc.map((t, i) => (
                        <TableRow key={i}>
                            <TableCell> {t.date} </TableCell>
                            <TableCell> {t.time} </TableCell>
                            <TableCell>{t.id} </TableCell>
                            <TableCell>
                                {" "}
                                <input
                                    type="checkbox"
                                    onChange={e => handleCheckBox(e, t.id)}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <div>
                {" "}
                <button
                    type="submit"
                    onClick={e => {
                        delEntry(checkVal);
                        setTimeout(function() {
                            window.location.reload();
                        }, 3);
                    }}
                >
                    {" "}
                    Delete
                </button>
            </div>
        </div>
    );
}

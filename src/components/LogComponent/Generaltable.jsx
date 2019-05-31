import React, { useState, useEffect } from "react";
// import moment from "moment";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
// import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import { Checkbox } from "@material-ui/core";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { delEntry, handleClick } from "../LogFunction/SharedFunction";

import EnhanceTableHead from "./HeadTable/Header";
// import { setDate } from "date-fns/esm";
// Extracting whole data for the current user
// export const getTime = (logKey, date, time) => {
//     const saving = [];

//     const user = firebase.auth.currentUser.uid;

//     for (let i = 0; i < logKey.length; i+=1)
//         if (logKey[i] !== undefined) {
//             saving.push({
//                 date: date[i],
//                 time: time[i],
//                 logID: logKey[i],

//             });

//         }

//     return saving;
// };
export const findLogID = (logKeyFind, logKey) => {
    for (let i = 0; i < logKey.length; i += 1)
        if (logKey[i] === logKeyFind) return i;
    return null;
};

// data render
export default function HistoryBlo(props) {
    const accLog = props;
    // const infoSaved = getTime(accLog.logKey, accLog.date, accLog.time);
    const [selected, setSelected] = useState([]);
    const [accessHistory, setAccessHistory] = useState([]);

    const userID = accLog.testid;
    let get = userID.join();
    const rootRef = firebase.database.ref(`AccessLog/${get}/`);
    const copyAccHis = [...accessHistory];
    function handleSelectAllClick(event) {
        if (event.target.checked) {
            const newSelecteds = accessHistory.map(n => n.logID);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    }

    function handleDelete(theSelected) {
        const indexDeleted = [];
        for (let i = 0; i < theSelected.length; i += 1)
            indexDeleted.push(
                accessHistory.findIndex(x => x.logID === theSelected[i])
            );

        indexDeleted.sort(function(a, b) {
            return b - a;
        });
        indexDeleted.forEach(function(index) {
            copyAccHis.splice(index, 1);
        });

        // for (let i = indexDeleted.length -1; i >= 0; i--)
        // copyAccHis.splice(indexDeleted[i],1);

        return copyAccHis;
    }

    const isSelected = name => selected.indexOf(name) !== -1;
    useEffect(() => {
        rootRef.once("value").then(snapshot => {
            const tempLogKey = [];
            const tempHis = [];
            let temp1 = [];
            snapshot.forEach(function(childSnapshot) {
                temp1 = childSnapshot.val();

                childSnapshot.forEach(function(superChild) {
                    tempLogKey.push(superChild.key);
                });
            });

            for (let i = 0; i < tempLogKey.length; i += 1) {
                const k = tempLogKey[i];
                if (temp1[k] !== undefined)
                    tempHis.push({
                        logID: k,
                        date: temp1[k].date,
                        time: temp1[k].time,
                        hidden: temp1[k].hidden
                    });
            }

            setAccessHistory(tempHis);
        });
    }, []);
    return (
        <div>
            <Table>
                <EnhanceTableHead
                    numSelected={selected.length}
                    onSelectAllClick={handleSelectAllClick}
                />

                <TableBody>
                    {accessHistory.map(row => {
                        const isItemSelected = isSelected(row.logID);
                        if (row.hidden === false)
                            return (
                                <TableRow
                                    key={row.logID}
                                    hover
                                    onClick={event =>
                                        setSelected(
                                            handleClick(
                                                event,
                                                row.logID,
                                                selected
                                            )
                                        )
                                    }
                                    role="checkbox"
                                    aria-checked={isItemSelected}
                                    tabIndex={-1}
                                    selected={isItemSelected}
                                >
                                    <TableCell> {row.date} </TableCell>
                                    <TableCell> {row.time} </TableCell>
                                    <TableCell>{row.logID} </TableCell>
                                    <TableCell padding="checkbox">
                                        <Checkbox checked={isItemSelected} />
                                    </TableCell>
                                </TableRow>
                            );
                        return null;
                    })}
                </TableBody>
            </Table>

            <div>
                {" "}
                <button
                    type="submit"
                    onClick={e => {
                        handleDelete(selected);
                        setAccessHistory(copyAccHis);
                        delEntry(selected);
                    }}
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

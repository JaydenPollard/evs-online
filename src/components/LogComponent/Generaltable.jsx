import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import { Checkbox, Button } from "@material-ui/core";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { handleClick } from "../LogFunction/SharedFunction";
import { handleDelete, delEntry } from "../../logic/log/deleteLog";
import EnhanceTableHead from "./HeadTable/Header";

// data render
export default function HistoryBlo(props) {
    const accLog = props;
    const [selected, setSelected] = useState([]);
    const [accessHistory, setAccessHistory] = useState([]);
    const userID = accLog.testid;
    const rootRef = firebase.database.ref(`AccessLog/${userID}`);

    function handleSelectAllClick(event) {
        if (event.target.checked) {
            const newSelecteds = accessHistory.map(n => n.logID);
            setSelected(newSelecteds);
        }
    }
    // check status of checkbox
    const isSelected = name => selected.indexOf(name) !== -1;
    // real time fetching
    useEffect(() => {
        rootRef.on("value", snapshot => {
            const tempLogKey = [];
            const tempHis = [];
            const tempDate = [];
            const tempHidden = [];
            const tempTime = [];
            let temp1 = [];
            snapshot.forEach(function(childSnapshot) {
                temp1 = childSnapshot.val();
                tempLogKey.push(childSnapshot.key);
                tempTime.push(temp1.time);
                tempDate.push(temp1.date);
                tempHidden.push(temp1.hidden);
            });

            for (let i = 0; i < tempLogKey.length; i += 1) {
                const logKey = tempLogKey[i];

                tempHis.push({
                    logID: logKey,
                    date: tempDate[i],
                    time: tempTime[i],
                    hidden: tempHidden[i]
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
                <Button
                    type="submit"
                    onClick={e => {
                        const result = handleDelete(selected, accessHistory);
                        setAccessHistory(result);
                        delEntry(selected);
                    }}
                >
                    Delete
                </Button>
            </div>
        </div>
    );
}

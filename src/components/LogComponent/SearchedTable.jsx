import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import { Checkbox, Button } from "@material-ui/core";
import * as firebase from "firebase/app";
import { delEntry, handleClick } from "../LogFunction/SharedFunction";
import EnhanceTableHead from "./HeadTable/Header";
import { handleDelete } from "../../logic/log/deleteLog";
// data render
export default function SearchedBlo(props) {
    const accLog = props;
    const [accessHistory, setAccessHistory] = useState([]);
    const userID = accLog.testid;
    const rootRef = firebase.database.ref(`AccessLog/${userID}/`);

    const [selected, setSelected] = useState([]);

    function handleSelectAllClick(event) {
        if (event.target.checked) {
            const newSelecteds = accessHistory.map(n => n.logID);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    }

    const isSelected = name => selected.indexOf(name) !== -1;
    useEffect(() => {
        rootRef.once("value").then(snapshot => {
            const tempDate = [];
            const tempTime = [];
            const tempHidden = [];
            const tempLogKey = [];
            const tempHis = [];

            let temp1 = [];
            snapshot.forEach(function(childSnapshot) {
                temp1 = childSnapshot.val();
                tempLogKey.push(childSnapshot.key);
                tempDate.push(temp1.date);
                tempHidden.push(temp1.hidden);
                tempTime.push(temp1.time);
            });

            for (let i = 0; i < tempLogKey.length; i += 1) {
                const k = tempLogKey[i];
                const dateToCompare = moment(accLog.searchedDate).format(
                    "DD/MM/YYYY"
                );
                if (dateToCompare == tempDate[i]) {
                    tempHis.push({
                        logID: k,
                        date: tempDate[i],
                        time: tempTime[i],
                        hidden: tempHidden[i]
                    });
                }
            }

            setAccessHistory(tempHis);
        });
    }, []);
    // return null message when search found nothing
    function checkResultView() {
        if (accessHistory.length !== 0)
            return (
                <Table>
                    <EnhanceTableHead
                        numSelected={selected.length}
                        onSelectAllClick={handleSelectAllClick}
                        rowCount={accessHistory.length}
                    />
                    <TableBody>
                        {accessHistory.map(row => {
                            const isItemSelected = isSelected(row.logID);
                            if (row.hidden === false)
                                return (
                                    <TableRow
                                        key={row.id}
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
                                            <Checkbox
                                                checked={isItemSelected}
                                            />
                                        </TableCell>
                                    </TableRow>
                                );
                            return null;
                        })}
                    </TableBody>
                </Table>
            );
        return (
            <Table>
                <TableBody>
                    {" "}
                    <TableRow align="center">
                        {" "}
                        No available data on your chosen date, pls choose show
                        all or other day{" "}
                    </TableRow>{" "}
                </TableBody>
            </Table>
        );
    }
    return (
        <div>
            {checkResultView()}
            <div>
                <Button
                    type="submit"
                    onClick={e => {
                        const result = handleDelete(selected, accessHistory);
                        setAccessHistory(result);
                        delEntry(selected);
                    }}
                >
                    {" "}
                    Delete
                </Button>
            </div>
        </div>
    );
}

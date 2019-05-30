import React, { useState } from "react";
import moment from "moment";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import { Checkbox } from "@material-ui/core";
import * as firebase from "firebase/app";
import { delEntry, handleClick } from "../LogFunction/SharedFunction";
import EnhanceTableHead from "./HeadTable/Header";

// export Data of search criteria for render
export const getSearchResult = (logKey, date, time, searchedDate) => {
    const result = [];

    const dateToCompare = moment(searchedDate).format("DD/MM/YYYY");
    //   const user = firebase.auth.currentUser.uid;
    for (let i = 0; i < logKey.length; i += 1)
        if (logKey[i] !== undefined && date[i] === dateToCompare) {
            result.push({
                date: date[i],
                time: time[i],
                logID: logKey[i]
            });
        }

    return result;
};
// data render
export default function SearchedBlo(props) {
    const accLog = props;
    const result = getSearchResult(
        accLog.logKey,
        accLog.date,
        accLog.time,
        accLog.searchedDate
    );
    const [selected, setSelected] = useState([]);
    const checkVal = [];
    // handle changes made in check box --> prepapred to change to new Material ui method
    //   function handleCheckBox(event,key) {
    //     const {target} = event;

    //     if (target.checked)
    //           checkVal.push(key);
    //     else
    //        checkVal.splice(checkVal.indexOf(key),1);

    // }
    function handleSelectAllClick(event) {
        if (event.target.checked) {
            const newSelecteds = result.map(n => n.usID);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    }
    const isSelected = name => selected.indexOf(name) !== -1;
    // return null message when search found nothing
    function checkResultView() {
        if (result.length !== 0)
            return (
                <Table>
                    <EnhanceTableHead
                        numSelected={selected.length}
                        onSelectAllClick={handleSelectAllClick}
                        rowCount={accLog.logKey.length}
                    />
                    <TableBody>
                        {result.map(row => {
                            const isItemSelected = isSelected(row.logID);
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
                                        <Checkbox checked={isItemSelected} />
                                    </TableCell>
                                </TableRow>
                            );
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
                <button
                    type="submit"
                    onClick={e => {
                        delEntry(checkVal);
                    }}
                >
                    {" "}
                    Delete
                </button>
            </div>
        </div>
    );
}

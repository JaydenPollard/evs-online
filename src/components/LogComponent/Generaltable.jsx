import React, {useState} from "react";
// import moment from "moment";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
// import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import { Checkbox } from "@material-ui/core";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database"
import {delEntry,  handleClick} from "../LogFunction/SharedFunction";

import EnhanceTableHead from "./HeadTable/Header";
// import { setDate } from "date-fns/esm";
// Extracting whole data for the current user
export const getTime = (logKey, date, time) => {
    const saving = [];
    
    const user = firebase.auth.currentUser.uid;

    for (let i = 0; i < logKey.length; i+=1)
        if (logKey[i] !== undefined) {
            saving.push({
                date: date[i],
                time: time[i],
                logID: logKey[i],
                
            });
           
        }

    return saving;
};
export const findLogID= (logKeyFind,logKey) => {
    for (let i=0; i<logKey.length; i+=1)
        if (logKey[i]===logKeyFind)
        return i;
    return null;
}


// data render
export default function HistoryBlo(props) {
    const accLog = props;
    const infoSaved = getTime(accLog.logKey, accLog.date, accLog.time);
    const [selected,setSelected] = useState([]);
    const checkVal = [];
    const user = firebase.auth.currentUser.uid;
    const rootRef = firebase.database.ref().child(user)
    function handleSelectAllClick(event) {
    
        if (event.target.checked) {
          const newSelecteds = infoSaved.map(n => n.logID);
          setSelected(newSelecteds);
          return;
        }
        setSelected([]);
      }
   
    // below method actually handles checkbox  --> to be moved to sharedFunction
    // function handleClick(event, name) {
    //     const selectedIndex = selected.indexOf(name);
        
    //     let newSelected = [];
    
    //     if (selectedIndex === -1) {
    //       newSelected = newSelected.concat(selected, name);
    //     } else if (selectedIndex === 0) {
    //       newSelected = newSelected.concat(selected.slice(1));
    //     } else if (selectedIndex === selected.length - 1) {
    //       newSelected = newSelected.concat(selected.slice(0, -1));
    //     } else if (selectedIndex > 0) {
    //       newSelected = newSelected.concat(
    //         selected.slice(0, selectedIndex),
    //         selected.slice(selectedIndex + 1),
    //       );
    //     }
    //     return newSelected;
        
       
    // }
    const isSelected = name => selected.indexOf(name) !== -1;
   
    return (
        <div>
            <Table>
                
                <EnhanceTableHead
                    numSelected={selected.length}
                    onSelectAllClick={handleSelectAllClick}
                    rowCount={accLog.logKey.length}
                />
                   
                <TableBody>
                    {infoSaved.map(row => {
                        const isItemSelected = isSelected(row.logID);
                        return (
                            <TableRow 
                                key={row.logID}
                                hover
                                onClick={event => setSelected(handleClick(event, row.logID,selected))}
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

            <div>
                {" "}
               
                <button
                    type="submit"
                    onClick={e => {
                        delEntry(selected);
                       
                        
                    }}
                >
                    
                    Delete
                </button>
            </div>
        </div>
    );
}

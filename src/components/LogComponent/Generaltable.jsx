import React, {useState} from "react";
// import moment from "moment";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
// import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import { Checkbox } from "@material-ui/core";
import * as firebase from "firebase/app";
import "firebase/auth"
import {delEntry,  handleClick} from "../LogFunction/SharedFunction";

import EnhanceTableHead from "./HeadTable/Header";
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


// data render
export default function HistoryBlo(props) {
    const accLog = props;
    const abc = getTime(accLog.logKey, accLog.date, accLog.time);
    const [selected,setSelected] = useState([]);
    const checkVal = [];
    function handleSelectAllClick(event) {
    
        if (event.target.checked) {
          const newSelecteds = abc.map(n => n.usID);
          setSelected(newSelecteds);
          return;
        }
        setSelected([]);
      }
    // function handleCheckBox(event, key) {
    //     const {target} = event;
        
    //     if (target.checked) checkVal.push(key);
    //     else if (target.checked === false)
    //         checkVal.splice(checkVal.indexOf(key), 1);
    // }
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
                    {abc.map(row => {
                        const isItemSelected = isSelected(row.logID);
                        return (
                            <TableRow 
                                key={row.id}
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
                        setTimeout(()=> {
                            window.location.reload();
                        }, 3);
                        
                    }}
                >
                    
                    Delete
                </button>
            </div>
        </div>
    );
}

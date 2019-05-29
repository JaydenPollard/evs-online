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
import {delEntry} from "../LogFunction/SharedFunction";
// import { firebase } from "../../layouts/firebase";
import EnhanceTableHead from "./HeadTable/Header";
// Extracting whole data for the current user
export const getTime = (headKey, date, time, idKey) => {
    const saving = [];
    const dateToSearch = [];
    const user = firebase.auth.currentUser;

    for (let i = 0; i < headKey.length; i+=1)
        if (idKey[i] !== undefined && idKey[i] === user.uid) {
            saving.push({
                date: date[i],
                time: time[i],
                usID: headKey[i],
                
            });
            dateToSearch.push(date[i]);
        }

    return saving;
};

// method for deleting data based on logID
// export function delEntry(deletedArray) {
//     const uIdRef = firebase.database().ref("AccessLog/");
//     for (let i = 0; i < deletedArray.length; i+=1)
//         uIdRef.child(deletedArray[i]).remove();
      
// }

// data render
export default function HistoryBlo(props) {
    const accLog = props;
    const abc = getTime(accLog.headKey, accLog.date, accLog.time, accLog.idKey);
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
    function handleClick(event, name) {
        const selectedIndex = selected.indexOf(name);
        
        let newSelected = [];
    
        if (selectedIndex === -1) {
          newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
          newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
          newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
          newSelected = newSelected.concat(
            selected.slice(0, selectedIndex),
            selected.slice(selectedIndex + 1),
          );
        }
        return newSelected;
        
       
    }
    
    const isSelected = name => selected.indexOf(name) !== -1;

    return (
        <div>
            <Table>
                
                <EnhanceTableHead
                    numSelected={selected.length}
                    onSelectAllClick={handleSelectAllClick}
                    rowCount={accLog.headKey.length}
                />
                   
                <TableBody>
                    {abc.map(row => {
                        const isItemSelected = isSelected(row.usID);
                        return (
                            <TableRow 
                                key={row.id}
                                hover
                                onClick={event => setSelected(handleClick(event, row.usID))}
                                role="checkbox"
                                aria-checked={isItemSelected}
                                tabIndex={-1}
                                selected={isItemSelected}
                            >
                                <TableCell> {row.date} </TableCell>
                                <TableCell> {row.time} </TableCell>
                                <TableCell>{row.usID} </TableCell>
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

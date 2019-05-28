import React, {useState} from 'react';
import moment from 'moment';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import {firebase} from "../../layouts/firebase"

// method for deleting data based on logID
export function delEntry(deletedArray)

{ const abc ="1"
  const uIdRef = firebase.database().ref("AccessLog/");
  for (let i = 0; i < deletedArray.length; i++)
    uIdRef.child(deletedArray[i]).remove();
  
   return abc;
}


// export Data of search criteria for render
export const getSearchResult = (headKey,date,time,idKey,searchedDate) => { 
  const result = new Array();
  const idSearched = new Array(); 
  const dateToCompare = moment(searchedDate).format("DD/MM/YYYY")
  for (let i =0; i < 7; i++)
  if (idKey[i] !== undefined && idKey[i] == "C001" && date[i] == dateToCompare )  
      {  result.push({
        date: date[i],
        time: time[i], 
        id: headKey[i],
        userInfo: "C001" })
        
      }
  
  return result;
    }
// data render 
export default function SearchedBlo (props)  {
  let accLog = props;
  let result = getSearchResult(accLog.headKey,accLog.date,accLog.time,accLog.idKey,accLog.searchedDate);
  const [toBeDeleted,setToBeDeleted]= useState();
  // handle changes made in check box
  function handleCheckBox(event,key) {
    const {target} = event;
    let checkVal = new Array();
    if (target.checked)  
          checkVal.push(key); 
    else 
       checkVal.splice(checkVal.indexOf(key),1); 
    setToBeDeleted(checkVal)
    
} 
// return null message when search found nothing
function checkResultView(){
  if (result.length !== 0) 
    return (
      <Table >
            <TableHead> <TableRow> <TableCell> Date </TableCell> <TableCell> Time </TableCell> <TableCell> Log ID</TableCell> <TableCell> </TableCell> </TableRow>
            </TableHead>
            <TableBody>
                {result.map((t,i) => ( 
                    <TableRow key ={i}> 
                        <TableCell> {t.date} </TableCell> 
                        <TableCell> {t.time} </TableCell> 
                        <TableCell>{t.id} </TableCell>  
                        <TableCell> <input
                            type="checkbox" 
                            onChange={e=>handleCheckBox(e,t.id)} /> </TableCell>   

                    </TableRow>
               ))    }        
            </TableBody> 
        </Table>
  )
  return ( 
      <Table>
          <TableBody> <TableRow align="center"> No available data on your chosen date, pls choose show all or other day </TableRow> </TableBody>
      </Table>
 )
}
  return(   
      <div> 
          {checkResultView()}
      
          <div> 
              
              <button 
                  type="submit" 
                  onClick={e => {delEntry(toBeDeleted);
                                 setTimeout(function(){window.location.reload();},5); }}
              > Delete  
              </button> 
     
          </div> 
      </div>
  );
    
                    
}


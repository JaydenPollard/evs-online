import React from 'react';
import moment from 'moment';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import {delEntry} from "../LogFunction/SharedFunction";
import {firebase} from "../../layouts/firebase";

// method for deleting data based on logID
// export function delEntry(deletedArray)

// { const abc ="1"
//   const uIdRef = firebase.database().ref("AccessLog/");
//   for (let i = 0; i < deletedArray.length; i+=1)
//     uIdRef.child(deletedArray[i]).remove();
  
//    return abc;
// }


// export Data of search criteria for render
export const getSearchResult = (headKey,date,time,idKey,searchedDate) => { 
  const result = [];
  
  const dateToCompare = moment(searchedDate).format("DD/MM/YYYY")
  const user = firebase.auth().currentUser;
  for (let i =0; i < headKey.length; i+=1)
  if (idKey[i] !== undefined && idKey[i] === user.uid  && date[i] === dateToCompare )  
      {  result.push({
        date: date[i],
        time: time[i], 
        usID: headKey[i],
        userInfo: user.uid })
        
      }
  
  return result;
    }
// data render 
export default function SearchedBlo (props)  {
  const accLog = props;
  const result = getSearchResult(accLog.headKey,accLog.date,accLog.time,accLog.idKey,accLog.searchedDate);
  
  const checkVal = [];
  // handle changes made in check box
  function handleCheckBox(event,key) {
    const {target} = event;
    
    if (target.checked)  
          checkVal.push(key); 
    else 
       checkVal.splice(checkVal.indexOf(key),1); 
    
    
} 
// return null message when search found nothing
function checkResultView(){
  if (result.length !== 0) 
    return (
        <Table>
            <TableHead> <TableRow> <TableCell> Date </TableCell> <TableCell> Time </TableCell> <TableCell> Log ID</TableCell> <TableCell /> </TableRow>
            </TableHead>
            <TableBody>
                {result.map((t) => ( 
                    <TableRow key={t.id}> 
                        <TableCell> {t.date} </TableCell> 
                        <TableCell> {t.time} </TableCell> 
                        <TableCell>{t.usID} </TableCell>  
                        <TableCell> <input
                            type="checkbox" 
                            onChange={e=>handleCheckBox(e,t.usID)} 
                        /> 
                        </TableCell>   

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
                  onClick={e => {delEntry(checkVal);
                                 setTimeout(()=> {window.location.reload();},5); }}
              > Delete  
              </button> 
     
          </div> 
      </div>
  );
    
                    
}


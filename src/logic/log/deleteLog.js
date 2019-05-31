import * as firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

export function handleDelete(theSelected, accessHistory) {
    const indexDeleted = [];
    const copyAccHis = [...accessHistory];
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

    return copyAccHis;
}
export function delEntry(deletedArray) {
    const user = firebase.auth.currentUser.uid;
    const uIdRef = firebase.database.ref("AccessLog/").child(user);

    for (let i = 0; i < deletedArray.length; i += 1)
        uIdRef
            .child(deletedArray[i])
            .child("hidden")
            .set(true);
}

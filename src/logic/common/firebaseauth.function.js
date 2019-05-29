import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

export default async function isMemberStaff() {
    const user = await getCurrentUser();
    if (user) {
        const userID = user.uid;
        const rootRef = firebase.database.ref("Users/Staffs");
        const query = rootRef.child(userID);
        return query.once("value").then(function(snapshot) {
            return snapshot.val() !== null;
        });
    }
    return false;
}

export async function getCurrentUser() {
    return firebase.auth.currentUser;
}

import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

/**
 * Checks whether the current user is a staff or a normal customer
 * @returns boolean whether the member is staff or not
 */
export default async function isMemberStaff() {
    const user = await getCurrentUser();
    if (user) {
        const userID = user.uid;
        // Get database reference
        const rootRef = firebase.database.ref("Users/Staffs");
        const query = rootRef.child(userID);
        // Return whether the user exists in the staff table
        return query.once("value").then(function(snapshot) {
            return snapshot.val() !== null;
        });
    }
    return false;
}

export async function isMemberAdmin() {
    const user = await getCurrentUser();
    if (user) {
        const userID = user.uid;
        const rootRef = firebase.database.ref(`Users/Staffs`);
        const query = rootRef.child(userID).child("AccessLevel");
        return query.once("value").then(function(snapshot) {
            return snapshot.val() === "Admin";
        });
    }
    return false;
}

/**
 * Gets the current user from Firebase Auth
 * @returns Returns the current user
 */
export async function getCurrentUser() {
    return firebase.auth.currentUser;
}

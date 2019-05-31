import * as firebase from "firebase/app";
import "firebase/database";

// The following functions does 2 things:
// 1. Create a new authenticated user in our authentication table using email and password passed from Forms
// 2. Create a new instance of user in our firebase live data table with all attributes from user prop
// rootRef is used to determine the correct path to put the new instance in, whether it's Users/Customers or Users/Staffs
export function createNewCustomer(rootRef, user) {
    firebase.auth.createUserWithEmailAndPassword(user.email, user.password);
    firebase.auth.onAuthStateChanged(authUser => {
        const { uid, email } = authUser;
        const newUserRef = rootRef.child(uid);
        return newUserRef.set({
            Name: user.name,
            Address: user.address,
            Email: email,
            MemberType: user.memberType,
            DoB: user.dob,
            JoinedDate: setJoinedDate(),
            Password: user.password,
            PhoneNum: user.phoneNum,
            IsActive: user.isActive
        });
    });
}

export function createNewStaff(rootRef, user) {
    firebase.auth.createUserWithEmailAndPassword(user.email, user.password);
    firebase.auth.onAuthStateChanged(authUser => {
        const { uid, email } = authUser;
        const newUserRef = rootRef.child(uid);
        return newUserRef.set({
            Name: user.name,
            Address: user.address,
            Email: email,
            AccessLevel: user.accessLevel,
            DoB: user.dob,
            JoinedDate: setJoinedDate(),
            Password: user.password,
            PhoneNum: user.phoneNum,
            IsActive: user.isActive
        });
    });
}

const setJoinedDate = () => {
    const placeHolderDate = new Date();
    const formattedDate = `${placeHolderDate.getFullYear()}-${`0${placeHolderDate.getMonth() +
        1}`.slice(-2)}-${`0${placeHolderDate.getDate()}`.slice(-2)}`;
    return formattedDate;
};

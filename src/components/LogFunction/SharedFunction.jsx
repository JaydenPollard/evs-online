// import React from 'react';

import * as firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

export function delEntry(deletedArray) {
    const user = firebase.auth.currentUser.uid;
    const uIdRef = firebase.database.ref("AccessLog/").child(user);

    for (let i = 0; i < deletedArray.length; i += 1)
        uIdRef
            .child(deletedArray[i])
            .child("hidden")
            .set(true);
}
export function handleClick(event, name, selected) {
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
            selected.slice(selectedIndex + 1)
        );
    }
    return newSelected;
}

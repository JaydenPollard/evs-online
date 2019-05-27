import * as firebase from "firebase/app";
import "firebase/database";

async function removeMovie(movieID) {
    const rootRef = firebase.database.ref("Movie");
    const query = rootRef.child(movieID).child("movieHidden");
    return query
        .set(true)
        .then(function() {
            return true;
        })
        .catch(function(error) {
            return false;
        });
}

export default removeMovie;

import * as firebase from "firebase/app";
import "firebase/database";

/**
 * Set the movie status to be hidden on Firebase Database to be seen as "removed".
 * This is required to prevent other functionalities that are dependent on the movie from failing
 * @param movieID The movie id of the movie being "removed"
 * @returns boolean Whether the removal operation was successful
 */
async function removeMovie(movieID) {
    // Get reference to Firebase database
    const rootRef = firebase.database.ref("Movie");
    // Create the query path to the property being modified
    const query = rootRef.child(movieID).child("movieHidden");
    // Run the query and return the operational success status
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

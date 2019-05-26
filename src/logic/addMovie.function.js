import * as firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";
import _ from "lodash";

async function addMovie(movie) {
    const rootRef = firebase.database.ref("Movie");
    const databaseQuery = rootRef.orderByKey().limitToLast(1);
    const addMovieSuccess = await databaseQuery
        .once("child_added")
        .then(async function(snapshot) {
            const newMovieID = `MA${parseInt(snapshot.key.slice(2)) + 1}`;
            const movieImageURL = movie.movieImage.includes("base64")
                ? await uploadMovieImage(newMovieID, movie.movieImage)
                : movie.movieImage;
            movie.movieName = movie.movieName.replace(/\w+/g, _.toLower);
            movie.movieImage = movieImageURL;
            movie.movieReleaseDate = movie.movieReleaseDate.toLocaleDateString(
                "en-au"
            );
            return rootRef
                .child(newMovieID)
                .set(movie)
                .then(function() {
                    //Success
                    return true;
                })
                .catch(function(error) {
                    //Failure
                    return false;
                });
        });
    return addMovieSuccess;
}

async function uploadMovieImage(movieID, movieImage) {
    return new Promise(async function(resolve) {
        const storageRef = firebase.storage.ref();
        // Convert base 64 image to blob so Firebase can handle the image
        const imageBlob = await fetch(movieImage).then(result => result.blob());

        const uploadImage = storageRef
            .child(`MovieImages/${movieID}`)
            .put(imageBlob);
        uploadImage.on(
            "state_changed",
            function(snapshot) {
                // Loading
            },
            function(error) {
                // TODO: Replace this with a proper error handling
                console.log(error);
            },
            function() {
                uploadImage.snapshot.ref.getDownloadURL().then(downloadURL => {
                    resolve(downloadURL);
                });
            }
        );
    });
}

export default addMovie;

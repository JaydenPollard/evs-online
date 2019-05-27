import * as firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";
import { toLowerCaseString } from "../common/utilities.function";

async function setMovie(movie, currentMovieID) {
    console.log(movie.movieReleaseDate);
    const rootRef = firebase.database.ref("Movie");
    return currentMovieID
        ? updateMovie(rootRef, movie, currentMovieID)
        : addMovie(rootRef, movie);
}

async function addMovie(rootRef, movie) {
    const newMovieID = await rootRef.push().getKey();
    const movieImageURL = movie.movieImage.includes("base64")
        ? await uploadMovieImage(newMovieID, movie.movieImage)
        : movie.movieImage;
    movie.movieName = toLowerCaseString(movie.movieName);
    movie.movieImage = movieImageURL;
    movie.movieReleaseDate = movie.movieReleaseDate.toLocaleDateString("en-AU");
    return rootRef
        .child(newMovieID)
        .set(movie)
        .then(function() {
            // Success
            return true;
        })
        .catch(function(error) {
            // Failure
            return false;
        });
}

async function updateMovie(rootRef, movie, currentMovieID) {
    const databaseQuery = rootRef.orderByKey().equalTo(currentMovieID);
    return databaseQuery.once("child_added").then(async function(snapshot) {
        const movieID = currentMovieID;
        const movieImageURL = movie.movieImage.includes("base64")
            ? await uploadMovieImage(movieID, movie.movieImage)
            : movie.movieImage;
        movie.movieName = toLowerCaseString(movie.movieName);
        movie.movieImage = movieImageURL;
        movie.movieReleaseDate = movie.movieReleaseDate.toLocaleDateString(
            "en-AU"
        );
        return rootRef
            .child(movieID)
            .set(movie)
            .then(function() {
                // Success
                return true;
            })
            .catch(function(error) {
                // Failure
                return false;
            });
    });
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
                // Error
            },
            function() {
                uploadImage.snapshot.ref.getDownloadURL().then(downloadURL => {
                    resolve(downloadURL);
                });
            }
        );
    });
}

export default setMovie;

import * as firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";
import {
    formatDateToDateString,
    toLowerCaseString
} from "../common/utilities.function";
/**
 * This function determines whether it should be running a modify or insert a movie query to Firebase Database
 * @param movie The movie object that is being processed
 * @param currentMovieID The movie ID of an existing movie
 * @returns boolean the operational success of adding/modifying movie
 */
async function setMovie(movie, currentMovieID) {
    // Get the database reference
    const rootRef = firebase.database.ref("Movie");
    // Run either update or add movie depending on if the movie id was provided, and return if it's successful or not
    return currentMovieID
        ? updateMovie(rootRef, movie, currentMovieID)
        : addMovie(rootRef, movie);
}
/**
 * Adds the provided movie to Firebase Database
 * @param rootRef The database reference
 * @param movie The movie object that is being added to the database
 * @returns boolean the operational success of the database query
 */
async function addMovie(rootRef, movie) {
    // Get a unique identifier for the new movie
    const newMovieID = await rootRef.push().getKey();
    // Upload the image to Firebase if it's not a URL, otherwise set the image URL to the existing one
    const movieImageURL = movie.movieImage.includes("base64")
        ? await uploadMovieImage(newMovieID, movie.movieImage)
        : movie.movieImage;
    // Convert movie name to lower case for case-insensitive search on Firebase database
    movie.movieName = toLowerCaseString(movie.movieName);
    // Set the movie image URL
    movie.movieImage = movieImageURL;
    movie.movieReleaseDate = formatDateToDateString(movie.movieReleaseDate);
    // Add the movie and return the operation success status
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

/**
 * Updates the existing movie inside Firebase database
 * @param rootRef The database reference
 * @param movie The modified movie
 * @param currentMovieID The existing movie id
 * @returns boolean the operational success of the database query
 */
async function updateMovie(rootRef, movie, currentMovieID) {
    // Get the path of the existing movie
    const databaseQuery = rootRef.orderByKey().equalTo(currentMovieID);
    // Run the query and return the operational success status
    return databaseQuery.once("child_added").then(async function(snapshot) {
        // Upload the image if it does not a URL for the movie image
        const movieImageURL = movie.movieImage.includes("base64")
            ? await uploadMovieImage(currentMovieID, movie.movieImage)
            : movie.movieImage;
        // Convert movie name to lower case for case-insensitive search on Firebase database
        movie.movieName = toLowerCaseString(movie.movieName);
        // Set the movie image URL
        movie.movieImage = movieImageURL;
        movie.movieReleaseDate = formatDateToDateString(movie.movieReleaseDate);
        // Run the query and return the operational success status
        return rootRef
            .child(currentMovieID)
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

/**
 * Upload the image to Firebase storage and get the image URL for it
 * @param movieID The movie id
 * @param movieImage The movie image that needs to be uploaded
 * @returns string the image URL for the uploaded image
 */
async function uploadMovieImage(movieID, movieImage) {
    // Create a new Promise for uploading the image
    return new Promise(async function(resolve) {
        // Get reference to Firebase storage
        const storageRef = firebase.storage.ref();
        // Convert base 64 image to blob so Firebase can handle the image
        const imageBlob = await fetch(movieImage).then(result => result.blob());
        // Run the operation to upload the image
        const uploadImage = storageRef
            .child(`MovieImages/${movieID}`)
            .put(imageBlob);
        // Listen to event changes during the upload process
        uploadImage.on(
            "state_changed",
            function(snapshot) {
                // The image is still being uploaded. This function is required by Firebase
            },
            function(error) {
                // Error
            },
            function() {
                // Get the URL of the uploaded image
                uploadImage.snapshot.ref.getDownloadURL().then(downloadURL => {
                    // Return the image URL
                    resolve(downloadURL);
                });
            }
        );
    });
}

export default setMovie;

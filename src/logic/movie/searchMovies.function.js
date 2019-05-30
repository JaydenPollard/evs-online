import * as firebase from "firebase/app";
import "firebase/database";
import {
    formatStringToDate,
    capitalizeString,
    toLowerCaseString
} from "../common/utilities.function";

/**
 * Searches Firebase database for matching movies according to the user input
 * @param keyword Terms used to match against existing movies
 * @param searchByGenre Determines whether we should search by genre
 * @returns The array of matching movies
 */
async function searchMovies(keyword, searchByGenre) {
    let searchResult = [];
    // Change search terms to lowercase
    const lowerCaseKeyword = toLowerCaseString(keyword);
    // Get database reference
    const rootRef = firebase.database.ref("Movie");
    // Define our search query
    const searchQuery = rootRef
        .orderByChild(searchByGenre ? "movieGenre" : "movieName")
        // Match keywords against movies with the same starting keywords
        .startAt(searchByGenre ? keyword : lowerCaseKeyword)
        // Enables the matching of partial movie names against the keyword
        .endAt(searchByGenre ? keyword : `${lowerCaseKeyword}\uf8ff`);
    // Run the query and update the searchResults array
    await searchQuery.once("value", function(snapshot) {
        // Check if any matches were found
        if (snapshot.val()) {
            // Map each result into a key value pair
            searchResult = Object.keys(snapshot.val()).map(function(key) {
                const movie = snapshot.val()[key];
                movie.movieName = capitalizeString(movie.movieName);
                movie.movieReleaseDate = formatStringToDate(
                    movie.movieReleaseDate
                );
                return [key, movie];
            });
        }
    });
    return searchResult;
}

export default searchMovies;

import * as firebase from "firebase/app";
import "firebase/database";
import {
    formatStringToDate,
    capitalizeString,
    toLowerCaseString
} from "../common/utilities.function";

async function searchMovies(keyword, searchGenre) {
    let searchResult = [];
    const lowerCaseKeyword = toLowerCaseString(keyword);
    const rootRef = firebase.database.ref("Movie");
    const searchQuery = rootRef
        .orderByChild(searchGenre ? "movieGenre" : "movieName")
        .startAt(searchGenre ? keyword : lowerCaseKeyword)
        .endAt(searchGenre ? keyword : `${lowerCaseKeyword}\uf8ff`);
    await searchQuery.once("value", function(snapshot) {
        if (snapshot.val()) {
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

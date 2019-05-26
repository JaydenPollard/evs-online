import * as firebase from "firebase/app";
import "firebase/database";
import _ from "lodash";

async function searchMovies(keyword, searchGenre) {
    let searchResult = [];
    const lowerCaseKeyword = keyword.replace(/\w+/g, _.toLower);
    const rootRef = firebase.database.ref("Movie");
    const searchQuery = rootRef
        .orderByChild(searchGenre ? "movieGenre" : "movieName")
        .startAt(lowerCaseKeyword)
        .endAt(lowerCaseKeyword + "\uf8ff");
    await searchQuery.once("value", function(snapshot) {
        if (snapshot.val()) {
            searchResult = Object.keys(snapshot.val()).map(function(key) {
                return [key, snapshot.val()[key]];
            });
        }
    });
    return searchResult;
}

export default searchMovies;

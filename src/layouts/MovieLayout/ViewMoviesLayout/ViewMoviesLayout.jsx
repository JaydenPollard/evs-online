import * as React from "react";
import { Grid, Typography, Fab } from "@material-ui/core";
import { Link } from "react-router-dom";
import Add from "@material-ui/icons/Add";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import AppBar from "../../../components/AppBar/AppBar";
import SearchMoviesInput from "../../../components/Movie/SearchMoviesInput/SearchMoviesInput";
import SetMovieSuccessDialog from "../../../components/Movie/SetMovieSuccessDialog/SetMovieSuccessDialog";
import { requestSearchCatalogue } from "../../../reducers/search-catalogue/search-catalogue-actions";
import MovieItem from "../../../components/Movie/MovieItem/MovieItem";
import LoadingIndicator from "../../../components/common/LoadingIndicator";
import isMemberStaff from "../../../logic/common/firebaseauth.function";
import { fabStyle } from "./ViewMoviesLayoutStyles";

/**
 * Display the view movies layout for the user
 * @param props Props passed into the component
 * @returns the view
 */
const ViewMoviesLayout = props => {
    const { results, location } = props;
    const { setMovieSuccess } = location;
    const [isStaff, setIsStaff] = React.useState(true);

    // Run this function only once when the view first renders
    React.useEffect(() => {
        // Check if the user is a staff
        async function isUserStaff() {
            setIsStaff(await isMemberStaff());
        }
        // Set to false if failed
        isUserStaff().catch(() => {
            setIsStaff(false);
        });
        // Do not request another database connection if there are results
        if (results.searchResults.length === 0) {
            props.requestSearchCatalogue();
        }
    }, []);

    // Render the view
    return (
        <React.Fragment>
            {/* Display the set movie success dialog if the user was redirected */}
            {setMovieSuccess ? <SetMovieSuccessDialog open /> : null}
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
            >
                <AppBar />
                <Typography
                    variant="h2"
                    style={{ marginTop: 16, marginBottom: 8 }}
                >
                    {/* Display header based on user type */}
                    {isStaff ? "Movie Management" : "Movie Search"}
                </Typography>
                {/* Display a loading indicator or results depending on if the search is loading */}
                {results.isLoading ? (
                    <LoadingIndicator message="Loading..." />
                ) : (
                    <React.Fragment>
                        <Typography variant="subtitle1">
                            {isStaff
                                ? "Search for movies to manage:"
                                : "Search for movies to purchase:"}
                        </Typography>
                        <SearchMoviesInput />
                        {/* Display results or a no results message */}
                        {results.searchResults.length > 0 ? (
                            results.searchResults.map(result => {
                                return (
                                    <Grid
                                        item
                                        key={result[0]}
                                        style={{ margin: 8 }}
                                    >
                                        <MovieItem
                                            movieID={result[0]}
                                            isStaff={isStaff}
                                            movie={result[1]}
                                        />
                                    </Grid>
                                );
                            })
                        ) : (
                            <Typography gutterBottom variant="subtitle1">
                                No results found!
                            </Typography>
                        )}
                    </React.Fragment>
                )}
            </Grid>
            {/* Hide the movie management button if user isn't staff */}
            {isStaff ? (
                <Fab
                    variant="extended"
                    style={fabStyle}
                    component={Link}
                    to={{ pathname: "/management/movie", isStaff }}
                >
                    <Add />
                    Add a Movie
                </Fab>
            ) : null}
        </React.Fragment>
    );
};

/**
 * Map the state to redux
 * @param state the state in Redux
 * @returns {{results}} data related to search
 */
function mapStateToProps(state) {
    return { results: state.searchCatalogueResults };
}
/**
 * Map the dispatch to redux
 * @param dispatch dispatch a Redux Action
 * @returns the action we can dispatch
 */
function mapDispatchToProps(dispatch) {
    return {
        requestSearchCatalogue: () =>
            dispatch(requestSearchCatalogue("", false))
    };
}

// Declare prop types
ViewMoviesLayout.propTypes = {
    location: PropTypes.object,
    results: PropTypes.object.isRequired,
    requestSearchCatalogue: PropTypes.func.isRequired
};

// Connect component to Redux
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewMoviesLayout);

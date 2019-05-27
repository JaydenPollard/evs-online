import * as React from "react";
import { Grid, Typography, Fab } from "@material-ui/core";
import { Link } from "react-router-dom";
import Add from "@material-ui/icons/Add";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import AppBar from "../../../components/AppBar/AppBar";
import SearchMoviesInput from "../../../components/Movie/SearchMoviesInput/SearchMoviesInput";
import AddMovieSuccessDialog from "../../../components/Movie/AddMovieSuccessDialog/AddMovieSuccessDialog";
import OrderMovieSuccessDialog from "../../OrderPageLayout/OrderMovieSuccessDialog";
import { requestSearchCatalogue } from "../../../reducers/search-catalogue/search-catalogue-actions";
import MovieItem from "../../../components/Movie/MovieItem/MovieItem";
import LoadingIndicator from "../../../components/common/LoadingIndicator";

const fabStyle = {
    top: "auto",
    right: 10,
    bottom: 10,
    left: "auto",
    position: "fixed"
};

const ViewMoviesLayout = props => {
    const { results, location } = props;
    const { addMovieSuccess, orderMovieSuccess } = location;
    // TODO: Set this to true until we have a way to get the user type
    const [isStaff, setIsStaff] = React.useState(true);

    React.useEffect(() => {
        if (results.searchResults.length === 0) {
            props.requestSearchCatalogue();
        }
    }, []);

    return (
        <React.Fragment>
            {addMovieSuccess ? <AddMovieSuccessDialog open /> : null}
            {orderMovieSuccess ? <OrderMovieSuccessDialog open /> : null}
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
                    {isStaff ? "Movie Management" : "Movie Search"}
                </Typography>
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
            {isStaff ? (
                <Fab
                    variant="extended"
                    style={fabStyle}
                    component={Link}
                    to="/management/movie"
                >
                    <Add />
                    Add a Movie
                </Fab>
            ) : null}
        </React.Fragment>
    );
};

function mapStateToProps(state) {
    return { results: state.searchCatalogueResults };
}

function mapDispatchToProps(dispatch) {
    return {
        requestSearchCatalogue: () =>
            dispatch(requestSearchCatalogue("", false))
    };
}

ViewMoviesLayout.propTypes = {
    location: PropTypes.object,
    results: PropTypes.object.isRequired,
    requestSearchCatalogue: PropTypes.func.isRequired
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewMoviesLayout);

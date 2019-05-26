import * as React from "react";
import { Grid, Typography, Fab } from "@material-ui/core";
import { Link } from "react-router-dom";
import Add from "@material-ui/icons/Add";
import AppBar from "../../components/AppBar/AppBar";
import SearchMoviesInput from "./SearchMoviesInput/SearchMoviesInput";
import AddMovieSuccessDialog from "./AddMovieSuccessDialog";
import { connect } from "react-redux";
import { requestSearchCatalogue } from "../../reducers/search-catalogue/search-catalogue-actions";
import MovieManagementItem from "../../components/MovieManagement/MovieManagementItem/MovieManagementItem";
import LoadingIndicator from "../../components/common/LoadingIndicator";

const fabStyle = {
    top: "auto",
    right: 10,
    bottom: 10,
    left: "auto",
    position: "fixed"
};

const MovieManagementPage = props => {
    const { results } = props;
    const addMovieSuccess = props.location.addMovieSuccess;
    const [isStaff, setIsStaff] = React.useState(true);

    React.useEffect(() => {
        if (results.searchResults.length === 0) {
            props.requestSearchCatalogue();
        }
    }, []);

    return (
        <React.Fragment>
            {addMovieSuccess ? <AddMovieSuccessDialog open={true} /> : null}
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
                    Movie Management
                </Typography>
                {results.isLoading ? (
                    <LoadingIndicator message="Loading..." />
                ) : (
                    <React.Fragment>
                        <Typography variant="subtitle1">
                            Search for movies to manage:
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
                                        <MovieManagementItem
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
                    to="/management/addmovie"
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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MovieManagementPage);

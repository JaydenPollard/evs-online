import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import MenuIcon from "@material-ui/icons/Menu";
import PropTypes from "prop-types";
import SearchIcon from "@material-ui/icons/Search";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import * as firebase from "firebase/app";
import { appBarStyles } from "./AppBarStyles";
import "firebase/auth"

function SearchAppBar(props) {
    const { classes } = props;
    const user = firebase.auth.currentUser;
    // Check login status to modify app bar
    function loginStatus() {
        if (user == null)
            return (
                <div>
                    <Button variant="contained" color="inherit">
                        <Link to="/login" style={{ textDecoration: "none" }}>
                            Login
                        </Link>
                    </Button>
                </div>
            );

        return (
            <div>
                <Button variant="contained" color="inherit">
                    <Link
                        style={{ textDecoration: "none" }}
                        onClick={e => {
                            firebase.auth.signOut();
                        }}
                        to="/home"
                    >
                        Logout
                    </Link>
                </Button>
            </div>
        );
    }
    return (
        <div className={classes.root}>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <IconButton
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="Open drawer"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        className={classes.title}
                        variant="h4"
                        color="inherit"
                        noWrap
                    >
                        Epic Video Store
                    </Typography>
                    <div className={classes.grow} />
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput
                            }}
                        />
                    </div>
                    {loginStatus()}
                </Toolbar>
            </AppBar>
        </div>
    );
}

SearchAppBar.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(appBarStyles)(SearchAppBar);

import AppBar from "../../components/AppBar";
import PropTypes from "prop-types";
import React from "react";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import Carousel from "../../components/Carousel";

const styles = theme => ({
	background: {
		width: "100%",
		height: "4000px",
		backgroundColor: "#000",
		position: "relative"
	},
	main: {
		width: "100%",
		height: "100%",
		display: "block", // Fix IE 11 issue.
		marginLeft: "auto",
		marginRight: "auto",
		backgroundColor: "#fff",
		fontSize: "14px",
		[theme.breakpoints.up("lg")]: {
			width: 1200
		},
		border: "1px solid #000"
	}
});

function HomePage(props) {
	const { classes } = props;
	return (
		<div className={classes.background}>
			<AppBar />
			<div className={classes.main}>
				
			</div>
		</div>
	);
}

HomePage.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HomePage);

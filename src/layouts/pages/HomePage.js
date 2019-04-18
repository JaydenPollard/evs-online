import AppBar from "../../components/AppBar";
import PropTypes from "prop-types";
import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Image from "../../assests/wolf-temp-hero.jpg";

const styles = theme => ({
	background: {
		width: "100%",
		height: "4000px",
		backgroundColor: "#ccc",
		position: "relative",
		margin: "0",
		padding: "0"
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
		border: "1px solid rgb(255, 0, 0)"
	}
});

function HomePage(props) {
	const { classes } = props;
	return (
		<div className={classes.background}>
			<AppBar />
			<img src={Image} alt="" width="100%" />
			<div className={classes.main} />
		</div>
	);
}

HomePage.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HomePage);

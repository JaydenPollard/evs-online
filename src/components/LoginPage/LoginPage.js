import React from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Image from "../../assests/popcorn-login-background.jpg";


const styles = theme => ({
	background: {
		width: "100vw",
		height: "100vh",
		backgroundImage: `url(${Image})`,
		backgroundPosition: "center",
		backgroundRepeat: "no-repeat",
		backgroundSize: "cover",
		position: "relative"
	},
	main: {
		width: "100%",
		display: "block", // Fix IE 11 issue.
		marginLeft: "auto",
		marginRight: "auto",
		[theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
			width: 400
		},
		paddingTop: "10vh",
		top: "10%"
	},
	paper: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
			.spacing.unit * 3}px`
	},
	avatar: {
		margin: theme.spacing.unit,
		backgroundColor: theme.palette.secondary.main
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing.unit,
		marginBottom: theme.spacing.unit
	},
	submit: {
		marginTop: theme.spacing.unit * 3
	},
	divider: {
		height: theme.spacing.unit/6,
		backgroundColor: "#8c8c8c",
		width: "80%",
		marginTop: theme.spacing.unit*2,
	}
});

function LogIn(props) {
	const { classes } = props;

	return (
		<div className={classes.background}>
			<main className={classes.main}>
				<CssBaseline />
				<Paper className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Log in
					</Typography>
					<form className={classes.form}>
						<FormControl margin="normal" required fullWidth>
							<InputLabel htmlFor="email">Email Address</InputLabel>
							<Input id="email" name="email" autoComplete="email" autoFocus />
						</FormControl>
						<FormControl margin="normal" required fullWidth>
							<InputLabel htmlFor="password">Password</InputLabel>
							<Input
								name="password"
								type="password"
								id="password"
								autoComplete="current-password"
							/>
						</FormControl>
						<FormControlLabel
							control={<Checkbox value="remember" color="primary" />}
							label="Remember me"
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="inherit"
							className={classes.submit}
						>
							Log in
						</Button>
					</form>
					<div className={classes.divider} />
					<form className={classes.form}>

					</form>
				</Paper>
			</main>
		</div>
	);
}

LogIn.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LogIn);

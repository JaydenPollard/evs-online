import Image from "../../assests/popcorn-login-background.jpg";

export const registrationPageLayoutStyles = theme => ({
    background: {
        width: "100%",
        height: "100%",
        backgroundImage: `url(${Image})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
    },
    main: {
        width: "80vw",
        height: "100vw",
        display: "block", // Fix IE 11 issue.
        marginLeft: "auto",
        marginRight: "auto",
        paddingTop: "10vh",
        paddingBottom: "10vh",
        [theme.breakpoints.up("md")]: {
            width: "40%"
        }
    },
    paper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit *
            3}px ${theme.spacing.unit * 3}px`
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
        height: theme.spacing.unit / 6,
        backgroundColor: "#8c8c8c",
        width: "80%",
        marginTop: theme.spacing.unit * 2
    },
    button: {
        margin: "8px"
    },
    returnButton: {
        backgroundColor: "#e5e5e5",
        margin: "8px"
    },
    leftIcon: {
        marginRight: "8px"
    },
    iconSmall: {
        fontSize: 20
    }
});

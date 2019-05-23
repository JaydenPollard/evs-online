export const userInfoManagementStyles = theme => ({
    background: {
        backgroundColor: "#f7fbff",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        position: "relative"
    },
    main: {
        width: "80vw",
        display: "block", // Fix IE 11 issue.
        marginLeft: "auto",
        marginRight: "auto",
        paddingTop: "5vh",
        [theme.breakpoints.up("md")]: {
            width: 768
        }
    },
    divider: {
        height: theme.spacing.unit / 6,
        backgroundColor: "#8c8c8c",
        width: "80%",
        marginTop: theme.spacing.unit * 2
    },
    button: {
        alignSelf: "start",
        backgroundColor: "#e5e5e5",
        borderRadius: "5px",
        padding: "0 5px 4px"
    }
});

export const homePageStyles = theme => ({
  background: {
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

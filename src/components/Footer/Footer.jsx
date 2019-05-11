import React from "react";
import { Typography, Grid } from "@material-ui/core";
import Image from "../../assests/footer.png";

const footerStyle = {
    backgroundColor: "black",
    color: "white",
    marginTop: "auto"
};

const Footer = () => {
    return (
        <Grid item>
            <footer style={footerStyle}>
                {/* placeholder */}
                <img style={{ width: "100%" }} src={Image} />
            </footer>
        </Grid>
    );
};

export default Footer;

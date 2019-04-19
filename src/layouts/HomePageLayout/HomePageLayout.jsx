import PropTypes from "prop-types";
import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "../../components/AppBar/AppBar";
import Image from "../../assests/wolf-temp-hero.jpg";
import { homePageLayoutStyles } from "./HomePageLayoutStyles";
import Footer from "../../components/Footer/Footer";

function HomePageLayout(props) {
  const { classes } = props;
  return (
    <div className={classes.background}>
      <AppBar />
      <img src={Image} alt="" width="100%" />
      {/* <div className={classes.main} /> */}
      <Footer />
    </div>
  );
}

HomePageLayout.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(homePageLayoutStyles)(HomePageLayout);

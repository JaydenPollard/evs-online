import React, { useState } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import { UserManagementStyles } from "./UserManagementLayoutStyles";
import CustomerGrid from "../../components/UserGrid/CustomerGrid";
import StaffGrid from "../../components/UserGrid/StaffGrid";

function UserManagementLayout(props) {
    const { classes } = props;
    const [tabValue, setTabValue] = useState(0);

    function TabContainer(tabProps) {
        return <div>{tabProps.children}</div>;
    }

    function handleChange(event, newValue) {
        setTabValue(newValue);
    }

    return (
        <div className={classes.background}>
            <AppBar position="static">
                <Tabs value={tabValue} onChange={handleChange}>
                    <Tab label="Customer" />
                    <Tab label="Staff" />
                    <Tab label="User Form" />
                </Tabs>
            </AppBar>
            <div className={classes.main}>
                {tabValue === 0 && (
                    <TabContainer>
                        <CustomerGrid />
                    </TabContainer>
                )}
                {tabValue === 1 && (
                    <TabContainer>
                        <StaffGrid />
                    </TabContainer>
                )}
                {/* {value === 2 && <TabContainer>Item Three</TabContainer>} */}
            </div>
        </div>
    );
}

UserManagementLayout.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(UserManagementStyles)(UserManagementLayout);

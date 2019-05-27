import React, { useState } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import ManagementBar from "@material-ui/core/AppBar";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import AppBar from "../../components/AppBar/AppBar";
import { UserManagementStyles } from "./UserManagementLayoutStyles";
import CustomerGrid from "../../components/UserGrid/CustomerGrid";
import StaffGrid from "../../components/UserGrid/StaffGrid";
import CustomerForm from "../../components/UserForm/CustomerForm";
import StaffForm from "../../components/UserForm/StaffForm";

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
            <AppBar />
            <ManagementBar position="static">
                <Tabs value={tabValue} onChange={handleChange} centered>
                    <Tab label="Customer" />
                    <Tab label="Staff" />
                    <Tab label="User Form" />
                    <Tab label="Staff Form" />
                </Tabs>
            </ManagementBar>
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
                {tabValue === 2 && (
                    <TabContainer>
                        <CustomerForm />
                    </TabContainer>
                )}
                {tabValue === 3 && (
                    <TabContainer>
                        <StaffForm />
                    </TabContainer>
                )}
            </div>
        </div>
    );
}

UserManagementLayout.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(UserManagementStyles)(UserManagementLayout);

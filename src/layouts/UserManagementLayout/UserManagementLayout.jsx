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
import { isMemberAdmin } from "../../logic/common/firebaseauth.function";

const UserManagementLayout = props => {
    const { classes } = props;
    const [tabValue, setTabValue] = useState(0);
    // TODO: Use auth to recognise user
    const [isAdmin, setIsAdmin] = React.useState(false);

    React.useEffect(() => {
        async function isUserAdmin() {
            setIsAdmin(await isMemberAdmin());
        }
        isUserAdmin().catch(() => {
            setIsAdmin(false);
        })
    }, []);

    const TabContainer = tabProps => {
        return <div>{tabProps.children}</div>;
    };

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const getTabs = () => {
        if (isAdmin) {
            return (
                <>
                    <ManagementBar position="static">
                        <Tabs value={tabValue} onChange={handleChange} centered>
                            <Tab label="All Customers" />
                            <Tab label="Customer Form" />
                            <Tab label="All Staffs" />
                            <Tab label="Staff Form" />
                        </Tabs>
                    </ManagementBar>
                </>
            );
        }
        return (
            <>
                <ManagementBar position="static">
                    <Tabs value={tabValue} onChange={handleChange} centered>
                        <Tab label="All Customers" />
                        <Tab label="Customer Form" />
                    </Tabs>
                </ManagementBar>
            </>
        );
    };

    return (
        <div className={classes.background}>
            <AppBar />
            {getTabs()}
            <div className={classes.main}>
                {tabValue === 0 && (
                    <TabContainer>
                        <CustomerGrid />
                    </TabContainer>
                )}
                {tabValue === 1 && (
                    <TabContainer>
                        <CustomerForm />
                    </TabContainer>
                )}
                {tabValue === 2 && (
                    <TabContainer>
                        <StaffGrid />
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
};

UserManagementLayout.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(UserManagementStyles)(UserManagementLayout);

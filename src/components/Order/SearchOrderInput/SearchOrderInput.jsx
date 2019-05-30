import React, { useState, useEffect } from "react";
import { Grid, Button } from "@material-ui/core";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import CustomDatePicker from "../../common/CustomDatePicker";
import { requestOrdersRetrieval } from "../../../reducers/order-retrieval/order-retrieval-actions";
import order from "../../../models/movie";

/**
 * Renders the search options for an order search
 * @param props The props being passed into the component
 * @returns a view
 */
const SearchOrderInput = props => {
    const [searchOrder, setSearchOrder] = useState(order);

    //Function that handles when search button is selected
    function handleSearch(e) {
        e.preventDefault();
        props.requestOrdersRetrieval(searchOrder.OrderDate);
    }

    //Renders the search input item
    return (
        <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={8}
        >
            <Grid item>
                <CustomDatePicker
                    id="OrderDate"
                    name="OrderDate"
                    label="Search Order By Date"
                    setDate={setSearchOrder}
                    value={searchOrder.OrderDate}
                />
            </Grid>
            <Grid item>
                <Button
                    type="submit"
                    variant="contained"
                    onClick={handleSearch}
                >
                    Search Orders
                </Button>
            </Grid>
        </Grid>
    );
};

/**
 * Maps dispatch to redux
 * @param dispatch dispatch redux action
 * @returns an action to be dispatched
 */
function mapDispatchToProps(dispatch) {
    return {
        requestOrdersRetrieval: searchDate =>
            dispatch(requestOrdersRetrieval(searchDate))
    };
}

SearchOrderInput.propTypes = {
    requestOrdersRetrieval: PropTypes.func
};

SearchOrderInput.defaultProps = {
    requestOrdersRetrieval: () => {}
};

//Connects searchinput to redux
export default connect(
    null,
    mapDispatchToProps
)(SearchOrderInput);

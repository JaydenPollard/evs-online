import React, { useState } from "react";
import { Grid, Button } from "@material-ui/core";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import CustomDatePicker from "../../components/common/CustomDatePicker";
import { requestOrdersRetrieval } from "../../reducers/order-retrieval/order-retrieval-actions";
import order from "../../models/movie";

const SearchOrderInput = props => {
    const [searchOrder, setSearchOrder] = useState(order);

    function handleSearch(e) {
        e.preventDefault();
        props.requestOrdersRetrieval(searchOrder.OrderDate);
    }

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

export default connect(
    null,
    mapDispatchToProps
)(SearchOrderInput);

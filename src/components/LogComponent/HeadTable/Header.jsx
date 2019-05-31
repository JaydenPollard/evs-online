import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import PropTypes from "prop-types";
// import { makeStyles } from '@material-ui/core/styles';
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

function EnhancedTableHead(props) {
    const { onSelectAllClick, numSelected, rowCount } = props;

    return (
        <TableHead>
            <TableRow fullwidth="true">
                {" "}
                <TableCell> Date </TableCell> <TableCell> Time </TableCell>{" "}
                <TableCell> Log ID</TableCell>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={
                            numSelected > 0 && numSelected < rowCount
                        }
                        checked={numSelected === rowCount}
                        onChange={onSelectAllClick}
                    />
                </TableCell>
            </TableRow>
        </TableHead>
    );
}
EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,

    onSelectAllClick: PropTypes.func.isRequired,

    rowCount: PropTypes.number.isRequired
};

export default EnhancedTableHead;

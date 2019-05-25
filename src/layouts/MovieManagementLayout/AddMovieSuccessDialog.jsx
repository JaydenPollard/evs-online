import * as React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContentText,
    DialogContent
} from "@material-ui/core";

const AddMovieSuccessDialogStyle = {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: "fit-content"
};

const AddMovieSuccessDialog = props => {
    const [open, setOpen] = React.useState(props.open);

    function handleClose() {
        setOpen(false);
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="sm"
            style={AddMovieSuccessDialogStyle}
        >
            <DialogTitle>Success!</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    You have successfully added the movie to the movie list!
                </DialogContentText>
            </DialogContent>
        </Dialog>
    );
};

export default AddMovieSuccessDialog;

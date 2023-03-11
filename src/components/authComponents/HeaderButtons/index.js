import React from "react";
import { Box, Button } from "@mui/material";
import { connect } from "react-redux";
import { Modal } from "@mui/material";
import { logoutUser } from "../../../actions";

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        position: "absolute",
        top: `${top}%`,
        left: `${left}%`,
        width: "50%",
        transform: `translate(-${top}%, -${left}%)`,
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '7px'
    };
}

const HeaderButtons = (props) => {
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const body = (

        <Box style={modalStyle}>
            <h2 id="simple-modal-title">You sure?</h2>
            <p id="simple-modal-description">Are you sure you want to log out?</p>
            <Button
                className=".logoutButton"
                onClick={() => {
                    props.logoutUser();
                    handleClose();
                }}
            >
                Sure, Logout
            </Button>
            <Button color="inherit" onClick={handleClose}>
                Cancel
            </Button>
        </Box>
    );
    if (props.auth.id) {
        return (
            <React.Fragment>
                <Button color="inherit" onClick={handleOpen}>
                    Logout
                </Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    className=".paper"
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    {body}
                </Modal>
            </React.Fragment>
        );
    } else {
        return <React.Fragment />;
    }
};
const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    };
};
export default connect(mapStateToProps, { logoutUser })(HeaderButtons);

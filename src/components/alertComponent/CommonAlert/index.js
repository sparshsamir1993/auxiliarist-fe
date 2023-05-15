import React from "react";
import { Alert } from "@mui/material";
import { connect } from "react-redux";
import { Field } from "redux-form";
import "./index.scss"


const CommonAlert = (props) => {
    const { showAlert, type, content } = props;
    if (!showAlert) {
        return null;
    }
    return (
        <Alert className="mainAlert" severity={type}>
            {content}
        </Alert>
    );
};

const mapStateToProps = (state) => {
    return {
        showAlert: state.error.showAlert,
        type: state.error?.error.type,
        content: state.error?.error.content,
    };
};

export default connect(mapStateToProps)(CommonAlert);

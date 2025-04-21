import React from "react";
import {
    Container,
    Grid,
    Typography,
    Divider,
    Card,
    Button,
} from "@mui/material";
import { Save } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";


let CreateServices = (props) => {
    const history = useNavigate();
    return (
        <Container maxWidth="lg" sx={{ mt: 2 }}>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Typography variant="h4">Create Service</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <form onSubmit={props.handleSubmit}>

                        </form>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
}

function mapStateToProps(state) {
    return {
        auth: state.auth,
    };
}

CreateServices = connect(mapStateToProps, {})(CreateServices);

CreateServices = reduxForm({
    form: "CreateServicesForm",
    enableReinitialize: true,
    validate: (values) => {
        const errors = {};
        if (!values.serviceName) {
            errors.serviceName = "Required";
        }
        if (!values.serviceDescription) {
            errors.serviceDescription = "Required";
        }
        return errors;
    },
})(CreateServices);

export default CreateServices;
import React from "react";
import PaperUtil from "../../../utilComponents/PaperUtil";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Card, Container, Divider, Grid, Typography } from "@mui/material";
import { Field, reduxForm } from "redux-form";
import { FormField } from "../../../authComponents/FormField";
import {
    updateUserPassword,
    showLoading,
    hideLoading
} from "../../../../actions";
import { connect } from "react-redux";
import { Save } from "@mui/icons-material";

let location;

let ProfileResetPassword = (props) => {

    const history = useNavigate();
    location = useLocation();
    if (!props.auth?.email) {
        history("/user/profile");
    }
    const changeUserPassword = async (values, dispatch) => {
        let data = {
            currentPassword: values.currentPassword,
            newPassword: values.newPassword,
            id: props.auth?.id
        };
        props.showLoading();
        await props.updateUserPassword(data, history);
        props.hideLoading();
    };
    const { handleSubmit, pristine, reset, submitting, auth } = props;
    // const required = value => (value ? undefined : 'Required');
    return (
        <Container maxWidth="lg" className="pt24" >
            <Card className="user-edit-container" component={PaperUtil} raised={true}>
                <Typography variant="h4" className="cardHeadingStyle">
                    Change password
                </Typography>
                <form
                    onSubmit={handleSubmit(changeUserPassword)}
                    className="mt25"
                >
                    <Divider />
                    <Grid className="mt25" container spacing={4}>
                        <Grid item xs={6} className="itemStyle">
                            <Typography variant="h5">Current password</Typography>
                        </Grid>
                        <Grid item xs={6} className={"itemStyle"}>
                            <Field
                                key="currentPassword"
                                type="password"
                                name="currentPassword"
                                validate={[validate]}
                                component={FormField} />
                        </Grid>
                    </Grid>
                    <Divider />
                    <Grid className="mt25" container spacing={4}>
                        <Grid item xs={6} className="itemStyle">
                            <Typography variant="h5">New password</Typography>
                        </Grid>
                        <Grid item xs={6} className={"itemStyle"}>
                            <Field
                                key="newPassword"
                                type="password"
                                name="newPassword"
                                validate={validate}
                                component={FormField} />
                        </Grid>
                    </Grid>
                    <Divider />
                    <Grid container>
                        <Grid item xs={3} className={"itemStyle"}>
                            <Button
                                aria-label="Save"
                                type="submit"
                                disabled={pristine || submitting}
                                className=".primaryButton"
                            >
                                <span> Save &nbsp;</span>
                                <Save />
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Card>
        </Container>
    );
}

// Validation function for the form fields
const validate = value => (value ? undefined : 'This field is required');

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

ProfileResetPassword = reduxForm({
    form: "userProfileEdit",
    validate
})(ProfileResetPassword);

ProfileResetPassword = connect(mapStateToProps, {
    updateUserPassword,
    showLoading,
    hideLoading
})(ProfileResetPassword);


export default ProfileResetPassword;
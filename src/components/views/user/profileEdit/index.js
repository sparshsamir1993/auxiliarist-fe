import React from "react";
import { connect } from "react-redux";
import PaperUtil from "../../../utilComponents/PaperUtil";
import { Button, Card, Container, Divider, Grid, Typography } from "@mui/material";
import { Field, reduxForm } from "redux-form";
import {
    updateUser,
    showLoading,
    hideLoading
} from "../../../../actions";
import { useLocation, useNavigate } from "react-router-dom";
import RoleSelect from "../../../adminComponents/RoleSelect";
import { ADMIN_ROLE, USER_ROLE } from "../../../../constants";
import { Save } from "@mui/icons-material";
import { FormField } from "../../../authComponents/FormField";
let location;

let ProfileEdit = (props) => {
    const history = useNavigate();
    location = useLocation();
    if (!props.auth?.email) {
        history("/user/profile");
    }
    const changeUserDetails = async (values, dispatch) => {
        let data = {
            firstName: values.firstName ? values.firstName : props.auth.firstName,
            lastName: values.lastName ? values.lastName : props.auth.lastName,
            id: props.auth?.id
        };
        props.showLoading();
        await props.updateUser(data, history);
        props.hideLoading();
    };
    const { handleSubmit, pristine, reset, submitting, auth } = props;
    return (
        <Container maxWidth="lg" className="pt24" >
            <Card className="user-edit-container" component={PaperUtil} raised={true}>
                <Typography variant="h4" className="cardHeadingStyle">
                    User Details
                </Typography>
                <form
                    onSubmit={handleSubmit(changeUserDetails)}
                    className="mt25"
                >
                    <Grid container spacing={4}>
                        <Grid item xs={6} className="itemStyle">
                            <Typography variant="h5">Email</Typography>
                        </Grid>
                        <Grid item xs={6} className="itemStyle">
                            <Typography variant="h5">{auth?.email}</Typography>
                        </Grid>
                    </Grid>
                    <Divider />
                    <Grid className="mt25" container spacing={4}>
                        <Grid item xs={6} className="itemStyle">
                            <Typography variant="h5">First Name</Typography>
                        </Grid>
                        <Grid item xs={6} className={"itemStyle"}>
                            <Field
                                key="firstName"
                                type="firstName"
                                name="firstName"
                                placeholder={auth?.firstName ? auth.firstName : ""}
                                component={FormField} />
                        </Grid>
                    </Grid>
                    <Divider />
                    <Grid className="mt25" container spacing={4}>
                        <Grid item xs={6} className="itemStyle">
                            <Typography variant="h5">Last Name</Typography>
                        </Grid>
                        <Grid item xs={6} className={"itemStyle"}>
                            <Field
                                key="lastName"
                                type="lastName"
                                name="lastName"
                                placeholder={auth?.lastName ? auth.lastName : ""}
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
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

ProfileEdit = reduxForm({
    form: "userProfileEdit",
    enableReinitialize: true
})(ProfileEdit);

ProfileEdit = connect(mapStateToProps, {
    updateUser,
    showLoading,
    hideLoading
})(ProfileEdit);


export default ProfileEdit;
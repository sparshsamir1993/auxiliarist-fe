import React, { useEffect, useLayoutEffect } from "react";
import {
    Container,
    Grid,
    Typography,
    Divider,
    IconButton,
    Card,
    Button,
} from "@mui/material";
import { Save } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { Field, reduxForm, change } from "redux-form";
import RoleSelect from "../../../../adminComponents/RoleSelect";
import {
    USER_ROLE,
    ADMIN_ROLE
} from "../../../../../constants";
import {
    updateUserRole,
    showLoading,
    hideLoadings
} from "../../../../../actions";
import { connect } from "react-redux";
import MaterialAutoSelect from "../../../../utilComponents/MaterialAutoComplete";
import "./index.scss";
import PaperUtil from "../../../../utilComponents/PaperUtil";
let location;

const validate = (values, props) => {
    const errors = {};
    if (!values["role"] && !props.location?.state.role) {
        errors["role"] = "Required";
    }
    return errors;
};

let UserEdit = (props) => {
    const history = useNavigate();
    const [isHAdmin, setURole] = React.useState(false);
    location = useLocation();
    if (!location?.state?.email) {
        history("/admin/users");
    }
    const changeUserRole = async (values, dispatch) => {
        let data = {
            role: values.role ? values.role : location?.state?.role,
            id: location?.state.id
        };
        props.showLoading();
        await props.updateUserRole(data, props.history);
        props.hideLoading();
    };

    const { handleSubmit, pristine, reset, submitting } = props;
    return (
        <Container maxWidth="lg" className="mt100" >
            <Card className="user-edit-container" component={PaperUtil} raised={true}>
                <Typography variant="h4" className="cardHeadingStyle">
                    User Details
                </Typography>
                <form
                    onSubmit={handleSubmit(changeUserRole)}
                    className="mt25"
                >
                    <Grid container spacing={4}>
                        <Grid item xs={6} className="itemStyle">
                            <Typography variant="h5">Email</Typography>
                        </Grid>
                        <Grid item xs={6} className="itemStyle">
                            <Typography variant="h5">{location?.state?.email}</Typography>
                        </Grid>
                    </Grid>
                    <Divider />
                    <Grid className="mt25" container spacing={4}>
                        <Grid item xs={6} className="itemStyle">
                            <Typography variant="h5">Name</Typography>
                        </Grid>
                        <Grid item xs={6} className={"itemStyle"}>
                            <Typography variant="h5">
                                {location?.state?.name
                                    ? location.state.name
                                    : "Not Set"}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Divider />
                    <Grid container className="mt25" spacing={4}>
                        <Grid item xs={6} className={"itemStyle"}>
                            <Typography variant="h5">Role</Typography>
                        </Grid>
                        <Grid item xs={6} className={"itemStyle"}>
                            <Field
                                name="role"
                                component={RoleSelect}
                                {...{
                                    initialValue: props.initialValues ? props.initialValues : "",
                                }}
                            >
                                <option value="" />
                                <option value={USER_ROLE}>{USER_ROLE}</option>
                                <option value={ADMIN_ROLE}>{ADMIN_ROLE}</option>
                            </Field>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={3} className={"itemStyle"}>
                            <Button
                                aria-label="Save"
                                type="submit"
                                disabled={pristine || submitting}
                                className=".primaryButton"
                            >
                                <Save />
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Card>
        </Container>
    );
};

const mapStateToProps = (state, props) => {
    let iVal;
    iVal = state.form?.adminUserRole?.values?.role;
    if (!iVal) {
        iVal = location?.state.role;
    }

    return {
        initialValues: { role: iVal },
        selectedRole: iVal,
    };
};

UserEdit = connect(mapStateToProps, {
    updateUserRole,
    showLoading,
})(UserEdit);

UserEdit = reduxForm({
    form: "adminUserRole",
    validate,
    enableReinitialize: true,
})(UserEdit);

export default UserEdit;

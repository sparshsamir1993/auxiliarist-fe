import { Button, Container, Grid, Paper } from "@mui/material";
import React from "react";
import { connect } from "react-redux";
import {
    getUser,
    getUserList,
    showLoading,
    hideLoading,
} from "../../../../actions";
import styled from "@emotion/styled";
import { Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Profile = (props) => {
    const history = useNavigate();
    if (!props.auth?.email) {
        history("/");
    }
    return (
        <Container className="pt24">
            <Grid container spacing={3} rowSpacing={1}>
                <Grid item container spacing={3} xs={6}>
                    <Grid item xs={6}>
                        First Name
                    </Grid>
                    <Grid item xs={6}>
                        {props.auth?.firstName ? props.auth.firstName : "NOT SET"}
                    </Grid>
                    <Grid item xs={6}>
                        Last Name
                    </Grid>
                    <Grid item xs={6}>
                        {props.auth?.lastName ? props.auth.lastName : "NOT SET"}
                    </Grid>
                    <Grid item xs={6}>
                        Email
                    </Grid>
                    <Grid item xs={6}>
                        {props.auth?.email ? props.auth.email : "NOT SET"}
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="outlined" onClick={() => history("/user/profile/edit")}><Edit /> Edit</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="outlined" onClick={() => history("/user/profile/resetpassword")}><Edit /> Change Password</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    };
};


export default connect(mapStateToProps)(Profile);
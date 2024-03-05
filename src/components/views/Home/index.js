import React, { useEffect, useState } from "react";
import { Button, Grid, Typography } from "@mui/material";

import LoginForm from "../../authComponents/LoginForm";
import SignUpForm from "../../authComponents/SignUpForm";
import clsx from "clsx";
import "./index.scss";
import { API_BASE_URL } from "../../../constants";
import { checkAndUpdateTokens } from "../../../utils";

const Home = () => {
    const logo = require("../../../assets/img/logo.png");
    const [isLogin, setAuthState] = useState(true);
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const user = urlParams.get('user');

        if (user) {
            let userData = JSON.parse(decodeURIComponent(user));
            const token = checkAndUpdateTokens(userData.token, userData.refreshToken);

        }

    }, []);

    return (
        <Grid container spacing={0} className="container">
            <Grid item xs={6} className="rightArea">
                <div className="actionArea">
                    {isLogin && <LoginForm />}
                    {!isLogin && <SignUpForm />}
                    <Typography
                        variant="subtitle1"
                        className={clsx("mt25", "raleway")}
                        onClick={() => setAuthState(!isLogin)}
                    >
                        {isLogin
                            ? "New User? Create an account."
                            : "Already got an Accout? Log in."}
                    </Typography>
                </div>
            </Grid>
            <Grid item xs={6} className="leftArea">
                <div className="actionArea">
                    <Button
                        className="action-child"
                        type="submit"
                        variant="outlined"
                        href={`${API_BASE_URL}/user/auth/google`}
                    >
                        Google Login
                    </Button>
                    <Button
                        className="action-child"
                        type="submit"
                        variant="outlined"
                    >
                        Facebook Login
                    </Button>
                </div>
            </Grid>
        </Grid>
    );
};

export default Home;

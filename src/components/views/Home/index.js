import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";

import LoginForm from "../../authComponents/LoginForm";
import SignUpForm from "../../authComponents/SignUpForm";
import clsx from "clsx";
import "./index.scss";

const Home = () => {
    const logo = require("../../../assets/img/logo.png");
    const [isLogin, setAuthState] = useState(true);

    return (
        <Grid container spacing={0} className="container">
            <Grid item xs={8} className="rightArea">
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
        </Grid>
    );
};

export default Home;

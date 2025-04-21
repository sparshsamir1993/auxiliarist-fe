import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import { useTheme } from "@mui/material";
import { Drawer } from "@mui/material";
import { CssBaseline } from "@mui/material";
import { AppBar } from "@mui/material";
import { Toolbar } from "@mui/material";
import { List } from "@mui/material";
import { Typography } from "@mui/material";
import { Divider } from "@mui/material";
import { IconButton } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { ChevronLeft } from "@mui/icons-material";
import { ChevronRight } from "@mui/icons-material";
import { ListItem } from "@mui/material";
import { ListItemIcon } from "@mui/material";
import { ListItemText } from "@mui/material";
import { Inbox } from "@mui/icons-material";
import { Link } from "react-router-dom";
import RouterSwitch from "../RouterSwitch";
import Loader from "../loader/Loader";
import HeaderButtons from "../authComponents/HeaderButtons";
import { connect } from "react-redux";
import CommonAlert from "../alertComponent/CommonAlert";
import { ADMIN_ROLE, PROVIDER_ROLE, USER_ROLE } from "../../constants";
import { showLoading, hideLoading, getUser } from "../../actions";
import { checkAndUpdateTokens } from "../../utils";
import "../../styles/main.scss"
import "./index.scss"

const Header = (props) => {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        if (open) {
            setOpen(false);
        }
    };
    useEffect(() => {
        const storedToken = window.sessionStorage.getItem("token");
        const storedRefreshToken = window.sessionStorage.getItem("refreshToken");
        let tokens;
        if (storedToken && storedRefreshToken) {
            tokens = checkAndUpdateTokens(storedToken, storedRefreshToken);
            if (!props.auth.id) {
                props.showLoading();
                props.getUser(tokens);
                props.hideLoading();
            }
        }
    }, []);

    const adminLinks = () => {
        if (props.auth.role === ADMIN_ROLE) {
            return (
                <React.Fragment>
                    <Typography variant="h6" align="center" className="mt10">
                        Admin Links
                    </Typography>
                    <List>
                        <ListItem button key={"User List"} onClick={handleDrawerClose}>
                            <Link to="/admin/users" className="nav-link">
                                <ListItemIcon>
                                    <Inbox />
                                </ListItemIcon>
                                <ListItemText primary={"User List"} />
                            </Link>
                        </ListItem>
                    </List>
                    <Divider />
                </React.Fragment>
            );
        } else {
            return null;
        }
    };

    const userLinks = () => {
        if (props.auth.role === USER_ROLE) {
            return (
                <React.Fragment>
                    <Typography variant="h6" align="center" className="mt10">
                        User Links
                    </Typography>
                    <List>
                        <ListItem button key={"User List"} onClick={handleDrawerClose}>
                            <Link to="/user/profile" className="nav-link">
                                <ListItemIcon>
                                    <Inbox />
                                </ListItemIcon>
                                <ListItemText primary={"Profile"} />
                            </Link>
                        </ListItem>
                    </List>
                    <Divider />
                </React.Fragment>
            );
        } else {
            return null;
        }
    }

    const providerLinks = () => {
        if (props.auth.role === PROVIDER_ROLE) {
            return (
                <React.Fragment>
                    <Typography variant="h6" align="center" className="mt10">
                        Provider Links
                    </Typography>
                    <List>
                        <ListItem button key={"Provider List"} onClick={handleDrawerClose}>
                            <Link to="/provider/services" className="nav-link">
                                <ListItemIcon>
                                    <Inbox />
                                </ListItemIcon>
                                <ListItemText primary={"Services"} />
                            </Link>
                        </ListItem>
                    </List>
                    <Divider />
                </React.Fragment>
            );
        }
    }

    const authLinks = () => {
        return (
            <React.Fragment>
                <List>
                    <ListItem button key={"Dashboard"} onClick={handleDrawerClose}>
                        <Link to="/" className="nav-link">
                            <ListItemIcon>
                                <Inbox />
                            </ListItemIcon>
                            <ListItemText primary={"Dashboard"} />
                        </Link>
                    </ListItem>
                </List>
                <Divider />
                {adminLinks()}
                {userLinks()}
                {providerLinks()}
            </React.Fragment>
        );
    };

    const unAuthLinks = () => {
        return (
            <List>
                <ListItem button key={"Home"}>
                    <Link to="/" className="nav-link">
                        <ListItemIcon>
                            <Inbox />
                        </ListItemIcon>
                        <ListItemText primary={"Home"} />
                    </Link>
                </ListItem>
                <ListItem button key={"Login"}>
                    <Link to="/" className="nav-link">
                        <ListItemIcon>
                            <Inbox />
                        </ListItemIcon>
                        <ListItemText primary={"Login"} />
                    </Link>
                </ListItem>
                <ListItem button key={"Register"}>
                    <Link to="/" className="nav-link">
                        <ListItemIcon>
                            <Inbox />
                        </ListItemIcon>
                        <ListItemText primary={"Register"} />
                    </Link>
                </ListItem>
            </List>
        );
    };

    return (
        <div onClick={handleDrawerClose}>
            <Loader />
            <div className="root">
                <CommonAlert />
                <CssBaseline />
                <AppBar
                    position="fixed"
                    className="appBar"
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            className={clsx("menuButton", open && "hide")}
                            size="large">
                            <Menu />
                        </IconButton>
                        <Typography variant="h5" className="title" noWrap>
                            Auxiliarist
                            {props.auth.role == ADMIN_ROLE && <span>Admin Panel</span>}
                        </Typography>
                        <HeaderButtons />
                    </Toolbar>
                </AppBar>
                <Drawer
                    className="drawer"
                    variant="persistent"
                    anchor="left"
                    open={open}
                    classes={{
                        paper: "drawerPaper",
                    }}
                >
                    <div className="drawerHeader">
                        <IconButton onClick={handleDrawerClose} size="large">
                            {theme.direction === "ltr" ? (
                                <ChevronLeft />
                            ) : (
                                <ChevronRight />
                            )}
                        </IconButton>
                    </div>
                    <Divider />

                    {props.auth.id && authLinks()}
                    {!props.auth.id && unAuthLinks()}
                </Drawer>
            </div>
            <RouterSwitch />
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    };
};

export default connect(mapStateToProps, { showLoading, hideLoading, getUser })(
    Header
);

import React from "react";
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
import StyledLink from "@mui/material";
import { ListItemIcon } from "@mui/material";
import { ListItemText } from "@mui/material";
import { Inbox } from "@mui/icons-material";
import MailIcon from "@mui/material";
import { Link } from "react-router-dom";
import RouterSwitch from "../RouterSwitch";
import Loader from "../loader/Loader";
import { Button } from "@mui/material";
// import HeaderButtons from "./authComponents/HeaderButtons";
import { connect } from "react-redux";
// import ErrorAlert from "./alertComponent/CommonAlert";
import { ADMIN_ROLE } from "../../constants";
import { showLoading, hideLoading, getUser } from "../../actions";
import { checkAndUpdateTokens } from "../../utils";
import "../../styles/main.scss"

const Header = (props) => {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
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
    const adminLinks = () => {
        if (props.auth.role === ADMIN_ROLE) {
            return (
                <React.Fragment>
                    <Typography variant="h6" align="center" className=".mt10">
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
                        <ListItem button key={"Question List"} onClick={handleDrawerClose}>
                            <Link to="/admin/questions" className="nav-link">
                                <ListItemIcon>
                                    <Inbox />
                                </ListItemIcon>
                                <ListItemText primary={"Question List"} />
                            </Link>
                        </ListItem>
                        <ListItem button key={"Hospital List"} onClick={handleDrawerClose}>
                            <Link to="/admin/hospitals" className="nav-link">
                                <ListItemIcon>
                                    <Inbox />
                                </ListItemIcon>
                                <ListItemText primary={"Hospital List"} />
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
        <div>
            <Loader />
            <div className=".root">
                {/* <ErrorAlert /> */}
                <CssBaseline />
                <AppBar
                    position="fixed"
                    className=".appBar"
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            className={clsx(".menuButton", open && ".hide")}
                            size="large">
                            <Menu />
                        </IconButton>
                        <Typography variant="h5" className=".title" noWrap>
                            Covid Fighter -{" "}
                            {props.auth.role == ADMIN_ROLE && <span>Admin Panel</span>}
                        </Typography>
                        {/* <HeaderButtons /> */}
                    </Toolbar>
                </AppBar>
                <Drawer
                    className=".drawer"
                    variant="persistent"
                    anchor="left"
                    open={open}
                    classes={{
                        paper: ".drawerPaper",
                    }}
                >
                    <div className=".drawerHeader">
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

import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@mui/material";
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
import RouterSwitch from "./RouterSwitch";
import Loader from "./loader/Loader";
import { Button } from "@mui/material";
import HeaderButtons from "./authComponents/HeaderButtons";
import { connect } from "react-redux";
import ErrorAlert from "./alertComponent/CommonAlert";
import { ADMIN_ROLE } from "../constants";
import { showLoading, hideLoading, getUser } from "../actions";
import { checkAndUpdateTokens } from "../utils";
import { mainStyles } from "../styles/styles";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: "green",
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

const Header = (props) => {
  const classes = useStyles();
  const appStyle = mainStyles();
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
          <Typography variant="h6" align="center" className={appStyle.mt10}>
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
          {/* <ListItem button key={"Home"} onClick={handleDrawerClose}>
            <Link to="/" className="nav-link">
              <ListItemIcon>
                <Inbox />
              </ListItemIcon>
              <ListItemText primary={"Home"} />
            </Link>
          </ListItem> */}
          <ListItem button key={"Dashboard"} onClick={handleDrawerClose}>
            <Link to="/" className="nav-link">
              <ListItemIcon>
                <Inbox />
              </ListItemIcon>
              <ListItemText primary={"Dashboard"} />
            </Link>
          </ListItem>
          {/* <ListItem button key={"Profile"} onClick={handleDrawerClose}>
            <Link to="/" className="nav-link">
              <ListItemIcon>
                <Inbox />
              </ListItemIcon>
              <ListItemText primary={"Profile"} />
            </Link>
          </ListItem> */}
        </List>
        <Divider />
        {adminLinks()}
        {/* <List>
          <ListItem button key={"Logout"} onClick={handleDrawerClose}>
            <Link to="/" className="nav-link">
              <ListItemIcon>
                <Inbox />
              </ListItemIcon>
              <ListItemText primary={"Logout"} />
            </Link>
          </ListItem>
        </List> */}
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
      <div className={classes.root}>
        <ErrorAlert />
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
              size="large">
              <Menu />
            </IconButton>
            <Typography variant="h5" className={classes.title} noWrap>
              Covid Fighter -{" "}
              {props.auth.role == ADMIN_ROLE && <span>Admin Panel</span>}
            </Typography>
            <HeaderButtons />
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
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

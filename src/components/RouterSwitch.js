import React from "react";
import Home from "./views/Home";
import { connect } from "react-redux";
import Dashboard from "./views/Dashboard";
import { checkAndUpdateTokens } from "../utils";
import { getUser, showLoading, hideLoading } from "../actions";
import UserList from "./views/admin/user/UserList";
import UserEdit from "./views/admin/user/UserEdit";
const { BrowserRouter, Route, Switch } = require("react-router-dom");
const { default: Header } = require("./Header");
const RouterSwitch = (props) => {
  return (
    <div className="container">
      <Switch>
        <Route exact path="/" component={props.auth.id ? Dashboard : Home} />
        <Route exact path="/admin/users" component={UserList} />
        <Route exact path="/admin/users/edit" component={UserEdit} />
      </Switch>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};
export default connect(mapStateToProps, { getUser, showLoading, hideLoading })(
  RouterSwitch
);

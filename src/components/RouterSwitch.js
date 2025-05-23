import React from "react";
import Home from "./views/Home";
import { connect } from "react-redux";
import Dashboard from "./views/Dashboard";
import { checkAndUpdateTokens } from "../utils";
import { getUser, showLoading, hideLoading } from "../actions";
import UserList from "./views/admin/user/UserList";
import UserEdit from "./views/admin/user/UserEdit";
import Profile from "./views/user/profile";
import ProfileEdit from "./views/user/profileEdit";
import ProfileResetPassword from "./views/user/profileResetPassword";
import CreateServices from "./views/Provider/CreateServices";
import ProviderServices from "./views/Provider/ProviderServices";
const { BrowserRouter, Route, Routes } = require("react-router-dom");

const RouterSwitch = (props) => {
  const storedUser = JSON.parse(window.sessionStorage.getItem("user"));
  return (
    <div className="container">

      <Routes>

        <Route exact path="/" element={props.auth.id || storedUser ? <Dashboard /> : <Home />} />
        <Route exact path="/admin/users" element={<UserList />} />
        <Route exact path="/admin/users/edit" element={<UserEdit />} />
        <Route exact path="/user/profile" element={<Profile />} />
        <Route exact path="/user/profile/edit" element={<ProfileEdit />} />
        <Route exact path="/user/profile/resetpassword" element={<ProfileResetPassword />} />
        <Route exact path="/provider/services" element={<ProviderServices />} />
        <Route exact path="/provider/services/create" element={<CreateServices />} />
      </Routes>

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

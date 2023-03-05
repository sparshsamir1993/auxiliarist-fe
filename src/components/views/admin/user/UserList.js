import React, { useEffect, useState, useLayoutEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ADMIN_ROLE } from "../../../../constants";
import {
  getUser,
  getUserList,
  showLoading,
  hideLoading,
} from "../../../../actions";
import { checkStoredTokens } from "../../../../utils";
import { Container } from "@mui/material";
import { mainStyles } from "../../../../styles/styles";
const UserList = (props) => {
  const appStyles = mainStyles();
  const history = useNavigate();
  const [adminUserList, changeAdminUserList] = useState([]);
  if (!props.auth.id) {
    props.showLoading();
  }
  useEffect(() => {
    if (props.adminUserList.length > 1) {
      changeAdminUserList([...props.adminUserList]);
    }
    if (props.auth.id && props.auth.role !== ADMIN_ROLE) {
      history.replace("/");
    }
  }, [props.adminUserList]);

  useLayoutEffect(() => {
    const checkUser = async () => {
      props.showLoading();
      await props.getUserList(props.history);
      props.hideLoading();
    };
    checkUser();
  }, []);

  const tableColumns = [
    { title: "Id", field: "id" },
    { title: "Email", field: "email" },
    { title: "Name", field: "name" },
    { title: "Role", field: "role" },
  ];
  let userFields = [];

  const userListData = async () => { };

  return (
    <Container maxWidth="lg">
      <div className={appStyles.mt100}>
        // TODO
      </div>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    adminUserList: state.adminUserList,
  };
};

export default connect(mapStateToProps, {
  getUser,
  getUserList,
  showLoading,
  hideLoading,
})(UserList);

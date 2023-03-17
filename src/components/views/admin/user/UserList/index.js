import React, { useEffect, useState, useLayoutEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ADMIN_ROLE } from "../../../../../constants";
import {
    getUser,
    getUserList,
    showLoading,
    hideLoading,
} from "../../../../../actions";
import { checkStoredTokens } from "../../../../../utils";
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Edit } from "@mui/icons-material";
import PaperUtil from "../../../../utilComponents/PaperUtil";
import "./index.scss";

const UserList = (props) => {
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

    const createRowData = () => {
        const rowFormat = (id, firstName, lastName, email, role) => {
            return { id, firstName, lastName, email, role }
        }

        console.log(props);
        return Array.isArray(props.adminUserList) && props.adminUserList.length && props.adminUserList.map(user => {
            return rowFormat(user.id, user.firstName, user.lastName, user.email, user.role);
        })
    }


    return (
        <Container maxWidth="lg" className="user-list">
            <TableContainer component={PaperUtil} >
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Role</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array.isArray(createRowData()) && createRowData().map(row => (
                            <TableRow key={row.id}>
                                <TableCell component="th">
                                    {row.id}
                                </TableCell>
                                <TableCell component="th">
                                    {row.firstName}
                                </TableCell>
                                <TableCell component="th">
                                    {row.lastName}
                                </TableCell>
                                <TableCell component="th">
                                    {row.email}
                                </TableCell>
                                <TableCell component="th">
                                    {row.role}
                                </TableCell>
                                <TableCell>
                                    <Edit onClick={() => history("/admin/users/edit", { state: row })} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
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

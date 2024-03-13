import React, { Component, useEffect, useLayoutEffect } from "react";
import { Container, Grid, Typography } from "@mui/material";
import {
  logoutUser,
  getAdminDashboardMetrics,
} from "../../actions";
import { connect } from "react-redux";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Line,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
} from "recharts";
import { ADMIN_ROLE, USER_ROLE } from "../../constants";


const Dashboard = (props) => {

  useLayoutEffect(() => {
    const getAdminData = async () => {
      console.log(props);
      if (props.auth?.role) {
        let { role } = props.auth;
        console.log(role)
        if (role === ADMIN_ROLE) {
          console.log(role)
          await props.getAdminDashboardMetrics();
        }
      }
    }
    getAdminData();
  }, [props.auth])


  return (
    <Container maxWidth="lg">
      {props.auth.role == ADMIN_ROLE && (
        <Grid container spacing={3}>
          <Grid item lg={6} sm={12}>
            <ResponsiveContainer
              width="100%"
              height="100%"
              aspect={4.0 / 3.0}
            >
              <LineChart
                width={730}
                height={400}
                data={props.usersToMonthMetrics}
                margin={{ top: 50, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="Number of users"
                  stroke="#8884d8"
                />
              </LineChart>
            </ResponsiveContainer>
          </Grid>
          <Grid item lg={6} sm={12}>
            <ResponsiveContainer
              width="100%"
              height="100%"
              aspect={4.0 / 3.0}
            >
              <LineChart
                width={730}
                height={400}
                data={props.allAppointmentsToMonthMetrics}
                margin={{ top: 50, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="Number of appointments"
                  stroke="#8884d8"
                />
              </LineChart>
            </ResponsiveContainer>
          </Grid>
        </Grid>
      )}
      {props.auth.role == USER_ROLE && (
        <Typography
          variant="h4"
          style={{ paddingTop: "16px", fontFamily: "Raleway" }}
        >
          <Grid container>
            <div className="user-welcome">
              Welcome
            </div>
          </Grid>
        </Typography>
      )}
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    usersToMonthMetrics: state?.adminMetrics?.usersToMonth,
  };
};
export default connect(mapStateToProps, {
  logoutUser,
  getAdminDashboardMetrics,
})(Dashboard);

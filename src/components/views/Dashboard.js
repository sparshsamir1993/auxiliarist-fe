import React, { Component } from "react";
import { Button, Container, Grid, Typography } from "@mui/material";
import {
  logoutUser,
  getHospitalAdminDashboardMetrics,
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
import { HOSPITAL_ADMIN_ROLE, ADMIN_ROLE, USER_ROLE } from "../../constants";


class Dashboard extends Component {
  constructor(props) {
    super(props);
    console.log(props.auth);
    this.state = {};
  }

  async componentDidMount() {
    console.log(this.props);
    if (this.props.auth?.role) {
      let { role } = this.props.auth;
      if (role === ADMIN_ROLE) {
        await this.props.getAdminDashboardMetrics();
        console.log(this.props.usersToMonthMetrics);
      }
    }
  }

  render() {
    return (
      <Container maxWidth="lg">
        {this.props.auth.role == ADMIN_ROLE && (
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <ResponsiveContainer
                width="100%"
                height="100%"
                aspect={4.0 / 3.0}
              >
                <LineChart
                  width={730}
                  height={400}
                  data={this.props.usersToMonthMetrics}
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
            <Grid item xs={6}>
              <ResponsiveContainer
                width="100%"
                height="100%"
                aspect={4.0 / 3.0}
              >
                <LineChart
                  width={730}
                  height={400}
                  data={this.props.allAppointmentsToMonthMetrics}
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
        {this.props.auth.role == USER_ROLE && (
          <Typography
            variant="h4"
            style={{ marginTop: "100px", fontFamily: "Raleway" }}
          >
            Users can just use our mobile app. Sorry.
          </Typography>
        )}
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    appointmentToMonthMetrics: state.hospitalAdmin?.metrics?.appointmentToMonth,
    appointmentToStatusMetrics:
      state.hospitalAdmin?.metrics?.appointmentToStatus,
    usersToMonthMetrics: state?.adminMetrics?.usersToMonth,
    allAppointmentsToMonthMetrics: state?.adminMetrics?.appointmentToMonth,
  };
};
export default connect(mapStateToProps, {
  logoutUser,
  getHospitalAdminDashboardMetrics,
  getAdminDashboardMetrics,
})(Dashboard);

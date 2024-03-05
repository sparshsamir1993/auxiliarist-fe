import React, { Component } from "react";
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


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    console.log(this.props);
    if (this.props.auth?.role) {
      let { role } = this.props.auth;
      if (role === ADMIN_ROLE) {
        await this.props.getAdminDashboardMetrics();
      }
    }
  }

  render() {
    return (
      <Container maxWidth="lg">
        {this.props.auth.role == ADMIN_ROLE && (
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
            <Grid item lg={6} sm={12}>
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

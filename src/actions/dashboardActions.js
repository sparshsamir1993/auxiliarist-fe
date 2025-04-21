import axios from "axios";
import { API_BASE_URL } from "../constants";
import { checkResponseAuthHeaders, getHeaderConfigWithTokens } from "../utils";
import { showAlert } from "./alertActions";
import {
  FETCH_HADMIN_APPOINTMENT_TO_MONTH_METRICS,
  FETCH_HADMIN_APPOINTMENT_TO_STATUS_METRICS,
  FETCH_ADMIN_USERS_TO_MONTH_METRICS,
  FETCH_ADMIN_APPOINTMENTS_TO_MONTH_METRICS,
} from "../constants/reducerConstants";
import { usersToMonthGraphData } from "../utils/adminMetricsUtil";
const BASE_URL = `${API_BASE_URL}`;



export const getAdminDashboardMetrics = (values, history) => async (
  dispatch
) => {
  await getUsersMetrics(dispatch, history);
};

const getUsersMetrics = async (dispatch, history) => {
  try {
    let config = getHeaderConfigWithTokens();
    if (config) {
      let userMetrics = await axios.get(
        `${BASE_URL}/admin/metrics/users`,
        config
      );
      let graphData = usersToMonthGraphData(userMetrics.data);
      let tokens = checkResponseAuthHeaders(userMetrics.headers);
      if (!tokens) {
        dispatch(showAlert({ type: "error", content: "Error with tokens" }));
        history.replace("/");
      }
      dispatch({
        type: FETCH_ADMIN_USERS_TO_MONTH_METRICS,
        payload: graphData,
      });
    } else {
      history.replace("/");
    }
  } catch (err) {
    console.log(err);
  }
};


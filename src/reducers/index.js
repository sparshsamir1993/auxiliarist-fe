import { combineReducers } from "redux";
import authReducer from "./authReducer";
import loadingReducer from "./loadingReducer";
import alertReducer from "./alertReducer";
import adminUserReducer from "./admin/userReducer";
import adminUsersToMonthAppointmentMetricsReducer from "./admin/metrics/usersToMonthMetricsReducer";
import serviceCategoryReducer from "./providers/serviceCategoriesReducer";

var formReducer = require("redux-form").reducer;

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  loading: loadingReducer,
  error: alertReducer,
  adminUserList: adminUserReducer,
  adminMetrics: combineReducers({
    usersToMonth: adminUsersToMonthAppointmentMetricsReducer
  }),
  provider: combineReducers({
    serviceCategories: serviceCategoryReducer
  })
});

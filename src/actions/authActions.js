import axios from "axios";
import { API_BASE_URL } from "../constants";
import { checkAndUpdateTokens, checkStoredTokens } from "../utils";
import { showAlert } from "./alertActions";
import { FETCH_HADMIN_HOSPITAL } from "../constants/reducerConstants";
import _ from "lodash";
const BASE_URL = `${API_BASE_URL}/user`;

export const loginUser = (body, history) => async (dispatch) => {
  try {
    const user = await axios.post(`${BASE_URL}/login`, body);
    let { token, refreshToken } = user.data;
    let tokens = checkAndUpdateTokens(token, refreshToken);
    dispatch(await getUser(tokens, history));
    dispatch(
      showAlert({ type: "success", content: "Signed in Successfully !!" })
    );
  } catch (err) {
    if (
      err.response &&
      (err.response.status === 403 || err.response.status === 401)
    ) {
      dispatch(showAlert({ type: "error", content: err.response.data }));
    }
  }
};

export const registerUser = (body, history) => async (dispatch) => {
  let { email, password } = body;
  try {
    const user = await axios.post(`${BASE_URL}/signup`, { email, password });
    if (user.status === 200) {
      dispatch(
        showAlert({ type: "success", content: "Registered successfully" })
      );
      window.location.reload();
    }
  } catch (err) {
    if (err.response?.status) {
      if (err.response.status === 403) {
        dispatch(showAlert({ type: "error", content: "User already present" }));
      }
    }
  }
};

export const getUser = (tokens) => async (dispatch) => {
  let config = {
    headers: {
      authorization: `Bearer ${tokens.token}`,
      "refresh-token": tokens.refreshToken,
    },
  };
  try {
    const user = await axios.get(`${BASE_URL}/get`, config);
    let token = user.headers.token;
    let refreshToken = user.headers["refresh-token"];
    checkAndUpdateTokens(token, refreshToken);
    if (_.get(user, "data")) {
      window.sessionStorage.setItem("user", JSON.stringify(user.data));
    }
    dispatch({ type: "FETCH_USER", payload: user.data });
  } catch (err) {
    console.log(err);
    logoutUser()(dispatch);
    dispatch({ type: "FETCH_USER", payload: null });
  }
};

export const logoutUser = () => (dispatch) => {
  const tokens = checkStoredTokens();
  if (tokens) {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("refreshToken");
    sessionStorage.removeItem("user");
  }
  dispatch(showAlert({ type: "error", content: "Logged Out !!" }));
  dispatch({ type: "FETCH_USER", payload: {} });
  window.location.replace("/");
};

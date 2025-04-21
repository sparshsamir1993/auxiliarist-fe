import axios from "axios";
import { API_BASE_URL } from "../../constants";
import {
    getHeaderConfigWithTokens,
    checkResponseAuthHeaders,
} from "../../utils";
import { showAlert } from "../alertActions";
const BASE_URL = `${API_BASE_URL}/user`;

export const updateUser = (values, history) => async (dispatch) => {
    try {
        let config = getHeaderConfigWithTokens();
        if (config) {
            const user = await axios.patch(`${BASE_URL}/update`, values, config);
            let tokens = checkResponseAuthHeaders(user.headers);
            if (user.data) {
                dispatch({ type: "FETCH_USER", payload: user.data });
                dispatch(showAlert({ type: "success", content: "User Updated !" }));
                history(-1);
            } else {
                dispatch(showAlert({ type: "error", content: "User Not found" }));
            }
        } else {
            history("/");
        }
    } catch (err) {
        console.log(err);
    }
};

export const updateUserPassword = (values, history) => async (dispatch) => {
    try {
        let config = getHeaderConfigWithTokens();
        if (config) {
            const user = await axios.patch(`${BASE_URL}/update/password`, values, config);
            let tokens = checkResponseAuthHeaders(user.headers);
            if (user.data) {
                dispatch({ type: "FETCH_USER", payload: user.data });
                dispatch(showAlert({ type: "success", content: "Password Updated !" }));
                history(-1);
            } else {
                dispatch(showAlert({ type: "error", content: "User Not found" }));
            }
        } else {
            history("/");
        }
    } catch (err) {
        console.log(err);
        dispatch(showAlert({ type: "error", content: "User Not found" }));
    }
}

import axios from "axios";
import { API_BASE_URL } from "../../constants";
import {
    getHeaderConfigWithTokens,
    checkResponseAuthHeaders,
} from "../../utils";
import { showAlert } from "../alertActions";
const BASE_URL = `${API_BASE_URL}/provider`;

export const addProviderServiceCategory = (values, history) => async (dispatch) => {
    const url = `${BASE_URL}/categories/create`;
    const config = getHeaderConfigWithTokens();
    try {
        const response = await axios.post(url, values, config);
        checkResponseAuthHeaders(response, dispatch);
        if (response.status === 200) {
            dispatch(showAlert({ type: "success", content: "Service category added successfully" }));
        }
    } catch (error) {
        console.error("Error adding service category:", error);
        dispatch(showAlert({ content: "Failed to add service category", type: "error" }));
    }
}

export const getServiceProviderCategories = (userId) => async (dispatch) => {
    const url = `${BASE_URL}/categories/${userId}`;
    const config = getHeaderConfigWithTokens();
    try {
        const response = await axios.get(url, config);
        dispatch({ type: "FETCH_SERVICE_CATEGORIES", payload: response.data });
        checkResponseAuthHeaders(response, dispatch);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error("Error fetching service provider categories:", error);
    }
}

export const deleteServiceCategory = (categoryId) => async (dispatch) => {
    const url = `${BASE_URL}/categories/${categoryId}`;
    const config = getHeaderConfigWithTokens();
    try {
        const response = await axios.delete(url, config);
        checkResponseAuthHeaders(response, dispatch);
        if (response.status === 200) {
            dispatch(showAlert({ type: "success", content: "Service category deleted successfully" }));
            return response.data;
        }
    } catch (error) {
        console.error("Error deleting service category:", error);
        dispatch(showAlert({ content: "Failed to delete service category", type: "error" }));
    }
}
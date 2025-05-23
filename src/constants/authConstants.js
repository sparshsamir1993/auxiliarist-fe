export const ADMIN_ROLE = "ADMIN";
export const USER_ROLE = "USER";
export const PROVIDER_ROLE = "PROVIDER";
let API_BASE_URL;
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  API_BASE_URL = "http://localhost:5050/api/v1";
} else {
  API_BASE_URL = "";
}

export { API_BASE_URL };

import { Navigate } from "react-router-dom";

export const isUserExist = () => !!sessionStorage.getItem("current-user");
export const getCurrentUser = () => JSON.parse(sessionStorage.getItem("current-user") || "null");

export default function Auth({ children }) {
  return isUserExist() ? children : <Navigate to="/login" />;
}

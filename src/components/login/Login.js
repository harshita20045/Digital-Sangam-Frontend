import axios from "axios";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import EndPoint from "../../apis/EndPoint";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate, useLocation } from "react-router-dom";

function Login() {
  let navigate = useNavigate();
  const location = useLocation();
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  let handleSubmit = async (event) => {
    try {
      event.preventDefault();
      if (state.email && state.password) {
        setIsLoading(true);
        let response = await axios.post(EndPoint.SIGN_IN, state);
        console.log(response.data.user);
        sessionStorage.setItem(
          "current-user",
          JSON.stringify(response.data.user)
        );
        toast.success(response.data.message);
        const redirectTo = location.state?.from || "/";
        navigate(redirectTo);
      } else {
        toast.error("Please Enter Email and Password");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error);
    }
  };
  return (
    <>
      <ToastContainer />
      <div className="container d-flex justify-content-center align-items-center vh-100">
        {isLoading ? (
          <CircularProgress />
        ) : (
          <div className="col-md-5 col-sm-10 col-12 rounded-4">
            <div className="text-center mb-3">
              <div
                style={{
                  height: "60px",
                  width: "60px",
                  backgroundColor: "#f64100",
                  color: "white",
                  fontSize: "32px",
                  fontWeight: "600",
                  borderRadius: "20px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                DS
              </div>
              <h3 className="mt-3 fw-bold">Welcome to DigitalSangam</h3>
              <p className="text-muted small">
                Join our cultural heritage community
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="py-5 px-5"
              style={{ border: "1px solid #d7d6d6ff", borderRadius: "30px" }}
            >
              <h4 className="text-center mb-3">Login</h4>
              <div className="mb-3">
                <label className="form-label fw-semibold">Email</label>
                <input
                  onChange={(event) => {
                    setState({ ...state, email: event.target.value });
                  }}
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Password</label>
                <input
                  onChange={(event) => {
                    setState({ ...state, password: event.target.value });
                  }}
                  type="password"
                  className="form-control"
                  placeholder="Enter your password"
                />
              </div>

              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <input type="checkbox" id="remember" />
                  <label htmlFor="remember" className="ms-1 small">
                    Remember me
                  </label>
                </div>
                <a
                  href="#"
                  style={{ color: "black" }}
                  className="text-decoration-none small "
                >
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                style={{ backgroundColor: "#f64100" }}
                className="btn btn-primary w-100"
              >
                Sign In
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}

export default Login;

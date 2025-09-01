import axios from "axios";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import EndPoint from "../../apis/EndPoint";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";

function Login() {
  let navigate = useNavigate();

  const [state, setState] = useState({
    email: "",
    password: "",
    remember: false, 
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);


  const validate = () => {
    let newErrors = {};

    if (!state.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(state.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!state.password) {
      newErrors.password = "Password is required";
    } else if (state.password.length < 4) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  let handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) return;

    try {
      setIsLoading(true);
      let response = await axios.post(EndPoint.SIGN_IN, state, {
        withCredentials: true,
      });

      console.log(response.data.user);

      if (state.remember) {
        localStorage.setItem("current-user", JSON.stringify(response.data.user));
      } else {
        sessionStorage.setItem(
          "current-user",
          JSON.stringify(response.data.user)
        );
      }

      toast.success(response.data.message);
      navigate(-1);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.error || "Something went wrong");
    } finally {
      setIsLoading(false);
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
            <button
              className="btn btn-link position-absolute"
              style={{
                top: 20,
                left: 20,
                textDecoration: "none",
                color: "#dc2626",
                fontWeight: "500",
              }}
              onClick={() => navigate(-1)}
            >
              &larr; Back
            </button>
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
                  onChange={(event) =>
                    setState({ ...state, email: event.target.value })
                  }
                  value={state.email}
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <small className="text-danger">{errors.email}</small>
                )}
              </div>

              {/* Password */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Password</label>
                <input
                  onChange={(event) =>
                    setState({ ...state, password: event.target.value })
                  }
                  value={state.password}
                  type="password"
                  className="form-control"
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <small className="text-danger">{errors.password}</small>
                )}
              </div>

              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <input
                    type="checkbox"
                    id="remember"
                    checked={state.remember}
                    onChange={(e) =>
                      setState({ ...state, remember: e.target.checked })
                    }
                  />
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

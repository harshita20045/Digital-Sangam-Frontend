import axios from "axios";
import { useEffect, useState } from "react";
import EndPoint from "../../apis/EndPoint";
import CircularProgress from '@mui/material/CircularProgress';
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();

  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const [verify, setVerify] = useState(true);
  useEffect(() => {
    if (!verify) {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [verify, navigate]);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setIsLoading(true);
      let response = await axios.post(EndPoint.SIGN_UP, state);

      setVerify(false);
      console.log(response.data);

      setState({
        name: "",
        email: "",
        password: "",
        contact: "",
      });
      setIsLoading(false)
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container d-flex justify-content-center mt-4 align-items-center vh-100">
      {isLoading?(<CircularProgress />):(
      <div className="col-md-5 col-sm-10 col-12 rounded-4">
        <div className="text-center mb-3">
          <div
            style={{
              height: "60px",
              width: "60px",
              background: "linear-gradient(to right, #f97316, #dc2626)",
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
        {verify ? (
          <form
            className="py-5 px-5"
            onSubmit={handleSubmit}
            style={{ border: "1px solid #d7d6d6ff", borderRadius: "30px" }}
          >
            <h4 className="text-center mb-3">Create Account</h4>
            <div className="mb-3">
              <label className="form-label fw-semibold">Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your name"
                onChange={(event) =>
                  setState({ ...state, name: event.target.value })
                }
              />{" "}
            </div>{" "}
            <div className="mb-3">
              <label className="form-label fw-semibold">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                onChange={(event) =>
                  setState({ ...state, email: event.target.value })
                }
              />{" "}
            </div>{" "}
            <div className="mb-3">
              <label className="form-label fw-semibold">Phone Number</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your phone number"
                onChange={(event) =>
                  setState({ ...state, contact: event.target.value })
                }
              />{" "}
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password"
                onChange={(event) =>
                  setState({ ...state, password: event.target.value })
                }
              />
            </div>
            <Link className="my-2 text-center" to="/login" style={{color:"black"}}>Do You have Account Already ?</Link>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <input type="checkbox" id="remember" />
                <label htmlFor="remember" className="ms-1 small">
                  I agree to the Terms of Service and Privacy Policy
                </label>
              </div>
            </div>
            <button
              type="submit"
              style={{
                background: "linear-gradient(to right, #f97316, #dc2626)",
              }}
              className="btn btn-primary w-100"
            >
              Sign up
            </button>
          </form>
        ) : (
          <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2>✅ Please verify your email</h2>
            <p>We’ve sent a verification link to your email address.</p>
            <p>Redirecting you to login page...</p>
          </div>
        )}
      </div>)}
    </div>
  );
}

export default SignUp;

import "./AdminLogin.css";
import { useState } from "react";
import axios from "axios";
import { toast,ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import EndPoint from "../../apis/EndPoint";


function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("All fields are required");
    }

    try {
      const response = await axios.post(
        `${EndPoint.SIGN_IN}`,
        { email, password },
        { withCredentials: true }
      );

      const user = response.data?.user;

      if (user?.role !== "admin") {
        return toast.error("Access denied! You are not an admin.");
      }

      toast.success("Admin login successful");

      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 1000);
    } catch (error) {
      const msg = error.response?.data?.error || "Login failed";
      toast.error(msg);
    }
  };

  return (<>
    <ToastContainer/>
    <div className="login-wrapper d-flex align-items-center justify-content-center">
      <div className="login-card p-4 shadow rounded">
        <div className="text-center mb-4">
          <div className="icon-circle mb-2">
            <i className="bi bi-people-fill fs-2 text-white">DS</i>
          </div>
          <h4>Admin Login</h4>
          <p className="text-muted">Access the content moderation dashboard</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Email Address</label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-envelope"></i>
              </span>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-4">
            <label>Password</label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-lock"></i>
              </span>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <button className="btn btn-primary w-100" type="submit">
            Sign In
          </button>
        </form>

        <p className="text-center mt-3 text-muted small">
          Secure admin access for content moderation
        </p>
      </div>
    </div>
    </>
  );
}

export default AdminLogin;

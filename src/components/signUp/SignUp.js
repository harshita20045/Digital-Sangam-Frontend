import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import EndPoint from "../../apis/EndPoint";
import { toast, ToastContainer } from "react-toastify";

function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [verify, setVerify] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  
  useEffect(() => {
    if (!verify) {
      const timer = setTimeout(() => navigate("/login"), 1000);
      return () => clearTimeout(timer);
    }
  }, [verify, navigate]);

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        return value.trim() ? "" : "Name is required";
      case "email":
        if (!value.trim()) return "Email is required";
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? ""
          : "Invalid email format";
      case "contact":
        if (!value.trim()) return "Phone number is required";
        return /^\d{10}$/.test(value) ? "" : "Phone number must be 10 digits";
      case "password":
        if (!value.trim()) return "Password is required";
        return value.length < 6
          ? "Password must be at least 6 characters"
          : "";
      default:
        return "";
    }
  };

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const validateForm = () => {
    let newErrors = {};
    Object.keys(formData).forEach((key) => {
      newErrors[key] = validateField(key, formData[key]);
    });
    setErrors(newErrors);

    return Object.values(newErrors).every((msg) => msg === "");
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setIsLoading(true);
     let user = await axios.get(`${EndPoint.GET_USER_BY_EMAIL}/${formData.email}`);

      if(user){
        toast.error("User Already Exist ")
      }
      let res = await axios.post(EndPoint.SIGN_UP, formData);
      console.log(res.data);
      setVerify(false);
      setFormData({ name: "", email: "", contact: "", password: "" });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (

    <>
    <ToastContainer/>
    <div className="container d-flex justify-content-center align-items-center vh-100 mt-5">
      
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

      {isLoading ? (
        <CircularProgress />
      ) : (
        <div className="col-md-5 col-sm-10 col-12 rounded-4">
          {/* Header */}
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

              {/* Name */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Name</label>
                <input
                  type="text"
                  name="name"
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                />
                <small className="text-danger">{errors.name}</small>
              </div>

              {/* Email */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Email</label>
                <input
                  type="email"
                  name="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <small className="text-danger">{errors.email}</small>
              </div>

              {/* Phone */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Phone Number</label>
                <input
                  type="text"
                  name="contact"
                  className={`form-control ${
                    errors.contact ? "is-invalid" : ""
                  }`}
                  placeholder="Enter your phone number"
                  value={formData.contact}
                  onChange={handleChange}
                />
                <small className="text-danger">{errors.contact}</small>
              </div>

              {/* Password with eye toggle */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Password</label>
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className={`form-control ${
                      errors.password ? "is-invalid" : ""
                    }`}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <span
                    className="input-group-text"
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                <small className="text-danger">{errors.password}</small>
              </div>

              <Link
                className="my-2 text-center d-block"
                to="/login"
                style={{ color: "black" }}
              >
                Do you already have an account?
              </Link>

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
                className="btn btn-primary w-100"
                style={{
                  background: "linear-gradient(to right, #f97316, #dc2626)",
                }}
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
        </div>
      )}
    </div>
     </>
  );
}

export default SignUp;

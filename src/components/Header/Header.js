import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/logoHeader.png";
import { isUserExist, getCurrentUser } from "../auth/Auth";
import LogoutIcon from "@mui/icons-material/Logout";
import Tooltip from "@mui/material/Tooltip";
import EndPoint, { BASE_URL } from "../../apis/EndPoint";
import axios from "axios";
import ArticleIcon from "@mui/icons-material/Article";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";

function Header() {
  let navigate = useNavigate();
  let user = getCurrentUser();
  console.log(user?.profile?.profileImage)

  const handleLogOut = async () => {
    try {
      await axios.get(EndPoint.LOG_OUT, { withCredentials: true });
      sessionStorage.clear();
      localStorage.removeItem("token");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="navbar navbar-expand-lg navbar-light bg-white shadow-sm p-3 mb-2 rounded"
      style={{ position: "sticky", top: "0", zIndex: "100" }}
    >
      
      <Link to="/" className="navbar-brand d-flex align-items-center">
        <img src={logo} alt="Logo" style={{ width: "180px", height: "auto" }} />
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
        <ul className="navbar-nav gap-4">
          {["Home", "About", "Explore Dialects", "Articles", "Contact", "Help"].map((item, i) => (
            <li key={i} className="nav-item">
              <Link
                className="nav-link fw-medium text-dark"
                style={{ fontSize: "14px" }}
                to={item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "-")}`}
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </div>


      {!isUserExist() ? (
        <div className="d-flex gap-2">
          <Link className="btn btn-dark btn-sm fw-semibold" to="/login">
            Login
          </Link>
          <Link className="btn btn-dark btn-sm fw-semibold" to="/sign-up">
            Sign Up
          </Link>
        </div>
      ) : (
        <div className="d-flex align-items-center gap-3">
          <Link className="d-flex align-items-center text-dark fw-semibold" to="/my-articles" style={{ textDecoration: "none",fontSize:"14px" }}>
            <ArticleIcon style={{ color: "#f64100", marginRight: "4px" }} />
            My Articles
          </Link>
          <Link className="d-flex align-items-center text-dark fw-semibold" to="/my-dialects" style={{ textDecoration: "none"  ,fontSize:"14px" }}>
            <RecordVoiceOverIcon style={{ color: "#f64100", marginRight: "4px" }} />
            My Dialects
          </Link>
          <Link to="/profile" className="d-flex align-items-center  text-dark fw-semibold" style={{ textDecoration: "none" , fontSize:"14px" }}>
            <img
              src={
                user?.profile?.profileImage
                  ? `${BASE_URL}/profile/${user?.profile?.profileImage}`
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCHU5JIkqfD2z1KMc4c1nW4zdArnxBM3cCcQ&s"
              }
              alt="profile"
              className="rounded-circle me-2"
              style={{ height: "30px", width: "30px", objectFit: "cover"}}
            />
            Profile
          </Link>
          <Tooltip title="Log Out">
            <LogoutIcon
              style={{ height: "28px", width: "28px", color: "#f64100", cursor: "pointer" }}
              onClick={handleLogOut}
            />
          </Tooltip>
        </div>
      )}
    </div>
  );
}

export default Header;

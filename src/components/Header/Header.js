import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/logoHeader.png";
import { isUserExist, getCurrentUser } from "../auth/Auth";
import LogoutIcon from "@mui/icons-material/Logout";
import Tooltip from "@mui/material/Tooltip";
import { BASE_URL } from "../../apis/EndPoint";

function Header() {
  let navigate = useNavigate();
  let user = getCurrentUser();
  //  console.log(user.profile.profileImage)
  const handleLogOut = async () => {
    sessionStorage.setItem("current-user", "");
    sessionStorage.clear();
    navigate("/");
  };
  return (
    <>
      <div className="navbar navbar-expand-lg navbar-light bg-white shadow-sm p-3 mb-2 rounded d-flex justify-content-evenly align-items-center ">
        <img
          src={logo}
          alt="Logo"
          className="navbar-brand  ml-5"
          style={{ width: "200px", height: "auto" }}
        />
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse ml-5" id="navbarNav">
          <ul
            className="navbar-nav ml-5 d-flex justify-content-center align-items-center gap-4"
            style={{ color: "#000000" }}
          >
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-dark" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/dialects">
                Explore Dialects
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/articles">
                Articles
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/contact">
                Contact
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/help">
                Help
              </Link>
            </li>
          </ul>
        </div>
        {!isUserExist() && (
          <div className="d-flex gap-3">
            <Link
              className="btn btn-dark ml-2 fw-semibold text-center"
              style={{ height: "35px", fontSize: "15px" }}
              to="/login"
            >
              Login
            </Link>

            <Link
              className="btn btn-dark ml-2 fw-semibold"
              style={{ height: "35px", fontSize: "15px" }}
              to="/sign-up"
            >
              Sign Up
            </Link>
          </div>
        )}
        {isUserExist() && (
          <div className="d-flex gap-2">
            <Link
              className="fw-semibold fs-6 me-4"
              style={{
                color: "black",
                textDecoration: "none",
                marginTop: "3px",
              }}
              to="/my-articles"
            >
              My Articles
            </Link>{" "}
            <Link
              className="fw-semibold fs-6 me-4"
              style={{
                color: "black",
                textDecoration: "none",
                marginTop: "3px",
              }}
              to="/my-dialects"
            >
              My dialects
            </Link>
            <img
              src={
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCHU5JIkqfD2z1KMc4c1nW4zdArnxBM3cCcQ&s" ||
                user.profile.profileImage
              }
              style={{ borderRadius: "50%", height: "30px", width: "30px" }}
            />
            <Link
              className="fw-semibold fs-6 me-4"
              style={{
                color: "black",
                textDecoration: "none",
                marginTop: "3px",
              }}
              to="/profile"
            >
              Profile
            </Link>
          </div>
        )}
        {isUserExist() && (
          <Tooltip title="Log Out">
            <LogoutIcon
              style={{ height: "30px", width: "30px" }}
              onClick={handleLogOut}
            />
          </Tooltip>
        )}
      </div>
    </>
  );
}

export default Header;

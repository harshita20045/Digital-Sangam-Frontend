import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaCheckCircle,
  FaMapMarkerAlt,
  FaPhone,
  FaGlobe,
  FaLinkedin,
  FaFacebook,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { getCurrentUser } from "../auth/Auth";
import { BASE_URL } from "../../apis/EndPoint";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function Profile() {
  const user = getCurrentUser();
  const navigate = useNavigate();
  const [savedData, setSavedData] = useState(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("current-user");
    if (stored) {
      setSavedData(JSON.parse(stored));
    }
  }, []);

  const profile = savedData?.profile || user?.profile || {};
  const {
    name = user?.name,
    email = user?.email,
    isVerified = user?.isVerified,
    contact = user?.contact,
    address = profile.address || "",
    city = profile.city || "",
    state = profile.state || "",
    country = profile.country || "",
    dob = profile.dob || "",
    bio = profile.bio || "",
    designation = profile.designation || "",
    linkedin = profile.socialLinks?.linkedin || "",
    facebook = profile.socialLinks?.facebook || "",
    twitter = profile.socialLinks?.twitter || "",
    instagram = profile.socialLinks?.instagram || "",
    website = profile.socialLinks?.website || "",
    profileImage = profile.profileImage || "",
  } = savedData || user || {};

  const location = [address, city, state, country].filter(Boolean).join(", ");

  const createdAt = user?.createdAt;
  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "";

  const handleEdit = () => {
    navigate("/edit-profile");
  };

  const hasContactInfo = email || contact || location || website;
  const hasAboutInfo = bio || designation || dob;
  const hasSocialLinks = linkedin || facebook || twitter || instagram;

  return (
    <>
      <Header />
      <div className="container py-5">
        <div className="card shadow-sm border-0 rounded-4">
          <div
            className="rounded-top"
            style={{
              background: "linear-gradient(to right, #ff4e00, #ec9f05)",
              height: "120px",
            }}
          ></div>

          <div className="card-body text-center mt-n5">
            <img
              src={
                profileImage
                  ? `${BASE_URL}/profile/${profileImage}`
                  : "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"
              }
              alt="User"
              className="rounded-circle border border-3 border-white"
              style={{ width: "100px", height: "100px", marginTop: "-50px" }}
            />

            <h4 className="mt-3 fw-bold">
              {name || "N/A"}{" "}
              {isVerified && (
                <FaCheckCircle color="green" size={18} title="Verified" />
              )}
            </h4>
            <p className="text-muted mb-1">
              <small>
                {email && `${email} · `} {location && `${location} · `}
                {formattedDate && `Joined ${formattedDate}`}
              </small>
            </p>
            {bio && <p className="text-secondary small mb-3">{bio}</p>}
            <button
              onClick={handleEdit}
              className="btn btn-sm btn-outline-danger"
              style={{ borderRadius: "20px" }}
            >
              Edit Profile
            </button>
          </div>

          <div className="card-body pt-0 px-4">
            <div className="row g-4">
              {/* Contact Section */}
              {hasContactInfo && (
                <div className="col-lg-4 col-md-6">
                  <div className="card border-0 rounded-4 h-100 p-3 shadow-sm">
                    <h6 className="mb-3 fw-bold">
                      <FaPhone className="me-2 text-primary" /> Contact Information
                    </h6>
                    <ul className="list-unstyled mb-0">
                      {email && (
                        <li className="d-flex align-items-center mb-2">
                          <MdEmail className="me-2 text-warning fs-5" />
                          <span className="small text-muted">{email}</span>
                        </li>
                      )}
                      {contact && (
                        <li className="d-flex align-items-center mb-2">
                          <FaPhone className="me-2 text-primary fs-5" />
                          <span className="small text-muted">{contact}</span>
                        </li>
                      )}
                      {location && (
                        <li className="d-flex align-items-center mb-2">
                          <FaMapMarkerAlt className="me-2 text-success fs-5" />
                          <span className="small text-muted">{location}</span>
                        </li>
                      )}
                      {website && (
                        <li className="d-flex align-items-center mb-2">
                          <FaGlobe className="me-2 text-info fs-5" />
                          <Link
                            to={website}
                            target="_blank"
                            rel="noreferrer"
                            className="small text-muted text-decoration-none"
                          >
                            {website}
                          </Link>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              )}

              {/* About Section */}
              {hasAboutInfo && (
                <div className="col-lg-4 col-md-6">
                  <div className="card border-0 rounded-4 h-100 p-3 shadow-sm">
                    <h6 className="mb-3 fw-bold">
                      <FaCheckCircle className="me-2 text-success" /> About Me
                    </h6>
                    <ul className="list-unstyled mb-0">
                      {bio && (
                        <li className="mb-2">
                          <span className="fw-semibold small">Bio: </span>
                          <span className="small text-muted">{bio}</span>
                        </li>
                      )}
                      {designation && (
                        <li className="mb-2">
                          <span className="fw-semibold small">Designation: </span>
                          <span className="small text-muted">{designation}</span>
                        </li>
                      )}
                      {dob && (
                        <li className="mb-2">
                          <span className="fw-semibold small">Date of Birth: </span>
                          <span className="small text-muted">{dob}</span>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              )}

              {/* Social Section */}
              {hasSocialLinks && (
                <div className="col-lg-4 col-md-6">
                  <div className="card border-0 rounded-4 h-100 p-3 shadow-sm">
                    <h6 className="mb-3 fw-bold">
                      <FaGlobe className="me-2 text-info" /> Social Links
                    </h6>
                    <ul className="list-unstyled mb-0">
                      {linkedin && (
                        <li className="d-flex align-items-center mb-2">
                          <FaLinkedin className="me-2 text-info fs-5" />
                          <Link
                            to={linkedin}
                            target="_blank"
                            rel="noreferrer"
                            className="small text-muted text-decoration-none"
                          >
                            {linkedin}
                          </Link>
                        </li>
                      )}
                      {facebook && (
                        <li className="d-flex align-items-center mb-2">
                          <FaFacebook className="me-2 text-primary fs-5" />
                          <Link
                            to={facebook}
                            target="_blank"
                            rel="noreferrer"
                            className="small text-muted text-decoration-none"
                          >
                            {facebook}
                          </Link>
                        </li>
                      )}
                      {twitter && (
                        <li className="d-flex align-items-center mb-2">
                          <FaTwitter className="me-2 text-primary fs-5" />
                          <Link
                            to={twitter}
                            target="_blank"
                            rel="noreferrer"
                            className="small text-muted text-decoration-none"
                          >
                            {twitter}
                          </Link>
                        </li>
                      )}
                      {instagram && (
                        <li className="d-flex align-items-center mb-2">
                          <FaInstagram className="me-2 text-danger fs-5" />
                          <Link
                            to={instagram}
                            target="_blank"
                            rel="noreferrer"
                            className="small text-muted text-decoration-none"
                          >
                            {instagram}
                          </Link>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
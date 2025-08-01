import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import {
  FaCheckCircle,
  FaMapMarkerAlt,
  FaPhone,
  FaGlobe,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { getCurrentUser } from "../auth/Auth";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../apis/EndPoint";
import { useEffect, useState } from "react";

function Profile() {
  const user = getCurrentUser();
  const navigate = useNavigate();

  const [savedData, setSavedData] = useState({});

  useEffect(() => {
    const stored = sessionStorage.getItem("profileData");
    if (stored) {
      setSavedData(JSON.parse(stored));
    }
  }, []);

  const {
    name = user?.name,
    email = user?.email,
    isVerified = user?.isVerified,
    contact = user?.contact,
    address = "",
    city = "",
    state = "",
    country = "",
    dob = "",
    bio = user?.profile?.bio || "",
    designation = "",
    linkedin = "",
    facebook = "",
    twitter = "",
    instagram = "",
  } = savedData;

  const profileImage = user?.profile?.profileImage;
  const location =
    user?.profile?.location || [address, city, state, country].filter(Boolean).join(", ");

  const website = user?.profile?.website;
  const createdAt = user?.createdAt;

  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleString("en-US", {
        month: "long",
        year: "numeric",
      })
    : null;

  const handleEdit = (event) => {
    event.preventDefault();
    navigate("/edit-profile");
  };

  return (
    <>
      <Header />

      <div className="container py-5">
        <div className="card shadow-sm border-0 mb-4 rounded-4">
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
              style={{ width: "100px",height:"100px", marginTop: "-50px" }}
            />

            {name && (
              <h4 className="mt-3 fw-bold">
                {name}{" "}
                {isVerified && (
                  <FaCheckCircle color="green" size={18} title="Verified" />
                )}
              </h4>
            )}
            <p className="text-muted mb-1">
              {email && `${email} · `} {location && `${location} · `}
              {formattedDate && `Joined ${formattedDate}`}
            </p>
            {bio && <p className="text-secondary small mb-3">{bio}</p>}
            <div className="d-flex justify-content-center gap-2 mb-3">
              <button
                onClick={handleEdit}
                className="btn btn-sm btn-outline-danger"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-4 p-3 h-100">
              <h6>📞 Contact Information</h6>
              <div className="small text-muted mt-3">
                {email && (
                  <p>
                    <MdEmail className="me-2 text-warning" /> {email}
                  </p>
                )}
                {contact && (
                  <p>
                    <FaPhone className="me-2 text-primary" /> {contact}
                  </p>
                )}
                {location && (
                  <p>
                    <FaMapMarkerAlt className="me-2 text-success" /> {location}
                  </p>
                )}
                {website && (
                  <p>
                    <FaGlobe className="me-2 text-info" />
                    <a
                      href={website}
                      target="_blank"
                      rel="noreferrer"
                      className="text-decoration-none"
                    >
                      {website}
                    </a>
                  </p>
                )}
              </div>
            </div>
          </div>

          {(bio || designation || dob) && (
            <div className="col-md-4">
              <div className="card border-0 shadow-sm rounded-4 p-3 h-100">
                <h6>👤 About Me</h6>
                {bio && <p className="small text-muted mt-3">Bio: {bio}</p>}
                {designation && <p className="small text-muted">Designation: {designation}</p>}
                {dob && <p className="small text-muted">DOB: {dob}</p>}
              </div>
            </div>
          )}

          {(linkedin || facebook || twitter || instagram) && (
            <div className="col-md-4">
              <div className="card border-0 shadow-sm rounded-4 p-3 h-100">
                <h6>🔗 Social Links</h6>
                <ul className="small mt-3 list-unstyled">
                  {linkedin && <li>LinkedIn: {linkedin}</li>}
                  {facebook && <li>Facebook: {facebook}</li>}
                  {twitter && <li>Twitter: {twitter}</li>}
                  {instagram && <li>Instagram: {instagram}</li>}
                </ul>
              </div>
            </div>
          )}
          
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Profile;

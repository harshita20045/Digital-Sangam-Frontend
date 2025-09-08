import { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaCamera,
  FaEdit,
} from "react-icons/fa";
import { getCurrentUser } from "../auth/Auth";
import EndPoint, { BASE_URL } from "../../apis/EndPoint";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoArrowBackCircleOutline } from "react-icons/io5";

function EditProfile() {
  const user = getCurrentUser();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    contact: user?.contact || "",
    address: user?.profile?.address || "",
    city: user?.profile?.city || "",
    state: user?.profile?.state || "",
    country: user?.profile?.country || "",
    dob: user?.profile?.dob || "",
    bio: user?.profile?.bio || "",
    designation: user?.profile?.designation || "",
    linkedin: user?.profile?.socialLinks?.linkedin || "",
    facebook: user?.profile?.socialLinks?.facebook || "",
    twitter: user?.profile?.socialLinks?.twitter || "",
    instagram: user?.profile?.socialLinks?.instagram || "",
  });

  const [profileImage, setProfileImage] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImage = (event) => {
    if (event.target.files) setProfileImage(event.target.files[0]);
    else setProfileImage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();

      form.append("name", formData.name);
      form.append("contact", formData.contact);
      form.append("address", formData.address);

      form.append("country", formData.country);
      form.append("dob", formData.dob);
      form.append("bio", formData.bio);
      form.append("designation", formData.designation);
      form.append("linkedin", formData.linkedin);
      form.append("facebook", formData.facebook);
      form.append("twitter", formData.twitter);
      form.append("instagram", formData.instagram);

      if (profileImage) {
        form.append("profileImage", profileImage);
      }

      const token = sessionStorage.getItem("token");

      const res = await axios.patch(
        `${EndPoint.CREATE_PROFILE}/${user.id}`,
        form,
        {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Profile updated successfully");

      sessionStorage.setItem("current-user", JSON.stringify(res.data.user));

      navigate("/profile");
    } catch (err) {
      console.error(
        "Error updating profile:",
        err.response?.data || err.message
      );
      alert("Profile update failed");
    }
  };

  return (
    <div
      className="edit-profile-page"
      style={{
        background: "linear-gradient(to right, #f97316, #dc2626)",
        minHeight: "100vh",
        padding: "2rem 1rem",
      }}
    >
      <button className="btn btn-outline-light" onClick={() => navigate(-1)}>
        {" "}
        <IoArrowBackCircleOutline size={22} /> Back
      </button>
      <div className="container d-flex justify-content-center">
        <div
          className="card p-4 shadow-lg rounded-4 w-100"
          style={{ maxWidth: "900px" }}
        >
          <h3 className="text-center text-danger fw-bold">Edit Profile</h3>
          <p className="text-center text-muted mb-4">
            Update your personal information and preferences
          </p>

          <div className="text-center mb-4">
            <label
              htmlFor="profileImg"
              className="position-relative d-inline-block"
            >
              <img
                src={
                  user?.profile?.profileImage
                    ? `${BASE_URL}/profile/${user.profile.profileImage}`
                    : "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"
                }
                alt="Profile"
                className="rounded-circle shadow"
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  border: "3px solid white",
                }}
              />
              <span
                className="position-absolute bottom-0 end-0 bg-danger text-white rounded-circle p-2"
                style={{ transform: "translate(20%, 20%)", cursor: "pointer" }}
              >
                <FaCamera />
              </span>
            </label>
            <input
              type="file"
              id="profileImg"
              accept="image/*"
              name="profileImage"
              style={{ display: "none" }}
              onChange={handleImage}
            />
            <div className="text-muted mt-2">
              Tap the camera icon to upload a new photo
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-12 col-md-6">
                <div className="input-group">
                  <span className="input-group-text bg-light">
                    <FaUser />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    readOnly
                    placeholder="Full Name"
                  />
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="input-group">
                  <span className="input-group-text bg-light">
                    <FaEnvelope />
                  </span>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    readOnly
                    placeholder="Email"
                  />
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className="input-group">
                  <span className="input-group-text bg-light">
                    <FaPhone />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Phone Number"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="col-12 col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12 col-md-6">
                <input
                  type="date"
                  className="form-control"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                />
              </div>
              <div className="col-12 col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Designation"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12">
                <div className="input-group">
                  <span className="input-group-text bg-light">
                    <FaEdit />
                  </span>
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Bio / About Me"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>

              {["linkedin", "facebook", "twitter", "instagram"].map(
                (platform) => (
                  <div className="col-12 col-md-6" key={platform}>
                    <input
                      type="text"
                      className="form-control"
                      placeholder={`${
                        platform.charAt(0).toUpperCase() + platform.slice(1)
                      } URL`}
                      name={platform}
                      value={formData[platform]}
                      onChange={handleChange}
                    />
                  </div>
                )
              )}
            </div>

            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-4 gap-3">
              <button
                type="submit"
                className="btn btn-danger px-4 rounded-pill w-100 w-md-auto"
              >
                Save Changes
              </button>
              <button
                type="reset"
                className="btn btn-outline-secondary px-4 rounded-pill w-100 w-md-auto"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;

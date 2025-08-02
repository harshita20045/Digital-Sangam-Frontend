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

function EditProfile() {
  let user=getCurrentUser()
  const [formData, setFormData] = useState({
    name: "",

    contact: "",
    address: "",
    city: "",
    state: "",
    country: "",
    dob: "",
    bio: "",
    designation: "",
    linkedin: "",
    facebook: "",
    twitter: "",
    instagram: "",
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
  };
const handleSubmit = async (e) => {
  e.preventDefault(); // prevent default form submission

  try {
    let user = getCurrentUser();
    let form = new FormData();

    for (const key in formData) {
      form.append(key, formData[key]);
    }

    if (profileImage) {
      form.append("profileImage", profileImage);
    }

    const response = await axios.patch(
      EndPoint.CREATE_PROFILE + `/${user._id}`,
      form,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );


    sessionStorage.setItem("current-user", JSON.stringify(form));
    console.log("Profile updated:", response.data);
  } catch (err) {
    console.error("Error updating profile:", err);
  }
};


  return (
    <div
      className="edit-profile-page"
      style={{
        background: "linear-gradient(to right, #f97316, #dc2626)",
        minHeight: "100vh",
      }}
    >
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div
          className="card p-4 shadow-lg rounded-4"
          style={{ width: "100%", maxWidth: "700px" }}
        >
          <h3 className="text-center text-danger mb-2 fw-bold">Edit Profile</h3>
          <p className="text-center text-muted mb-4">
            Update your personal information and preferences
          </p>

          <div className="text-center position-relative mb-4">
            <label
              htmlFor="profileImage"
              className="position-relative"
              style={{ cursor: "pointer" }}
            >
            
              <img
               src={
                               user?.profile?.profileImage
                                 ? `${BASE_URL}/profile/${user.profile.profileImage}`
                                 : "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"
                             }
                alt="Profile"
                className="rounded-circle shadow"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
              <span
                className="position-absolute bottom-0 end-0 bg-danger text-white rounded-circle p-2"
                style={{ transform: "translate(20%, 20%)" }}
              >
                <FaCamera />
              </span>
            </label>
            <input
              type="file"
              id="profileImg"
              accept="image/*"
              className="ml-5"
              onChange={handleImage}
            />
            <div className="text-muted mt-2">
              Click the camera icon to upload a new photo
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <div className="input-group">
                  <span className="input-group-text bg-light">
                    <FaUser />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="col-md-6">
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
                  />
                </div>
              </div>

              <div className="col-md-6">
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

              <div className="col-md-6">
                <div className="input-group">
                  <span className="input-group-text bg-light">
                    <FaLock />
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Change Password"
                  />
                </div>
              </div>

              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="State"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <input
                  type="date"
                  className="form-control"
                  placeholder="Date of Birth"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
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

              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="LinkedIn URL"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Facebook URL"
                  name="facebook"
                  value={formData.facebook}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Twitter URL"
                  name="twitter"
                  value={formData.twitter}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Instagram URL"
                  name="instagram"
                  value={formData.instagram}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center mt-4">
              <button
                type="submit"
                className="btn btn-danger px-4 rounded-pill"
              >
                Save Changes
              </button>
              <button
                type="reset"
                className="btn btn-outline-secondary px-4 rounded-pill"
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
